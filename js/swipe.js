function setupCards() {
  var findaContainer = document.querySelector('.finda-container');
  var allCards = document.querySelectorAll('.finda-card');
  var nope = document.getElementById('nope');
  var love = document.getElementById('love');

  function initCards(card, index) {
    var newCards = document.querySelectorAll('.finda-card:not(.removed)');

    newCards.forEach(function (card, index) {
      card.style.zIndex = allCards.length - index;
      card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
      card.style.opacity = (10 - index) / 10;
    });
    
    findaContainer.classList.add('loaded');
  }

  initCards();
  
  allCards.forEach(function (el) {
    var hammertime = new Hammer(el);
  
    hammertime.on('pan', function (event) {
      el.classList.add('moving');
    });
  
    hammertime.on('pan', function (event) {
      if (event.deltaX === 0) return;
      if (event.center.x === 0 && event.center.y === 0) return;
  
      findaContainer.classList.toggle('finda_love', event.deltaX > 0);
      findaContainer.classList.toggle('finda_nope', event.deltaX < 0);
  
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;
  
      event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
    });
  
    hammertime.on('panend', function (event) {
      el.classList.remove('moving');
      findaContainer.classList.remove('finda_love');
      findaContainer.classList.remove('finda_nope');
  
      var moveOutWidth = document.body.clientWidth;
      var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
  
      event.target.classList.toggle('removed', !keep);
  
      if (keep) {
        event.target.style.transform = '';
      } else {
        var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
        var toX = event.deltaX > 0 ? endX : -endX;
        var endY = Math.abs(event.velocityY) * moveOutWidth;
        var toY = event.deltaY > 0 ? endY : -endY;
        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;
  
        event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
        initCards();
      }
    });
  });
  

  function createButtonListener(love) {
    return function (event) {
      var cards = document.querySelectorAll('.finda-card:not(.removed)');
      var moveOutWidth = document.body.clientWidth * 1.5;

      if (!cards.length) return false;

      var card = cards[0];

      card.classList.add('removed');

      if (love) {
        card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
      } else {
        card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
      }

      initCards();

      event.preventDefault();
    };
  }

  var nopeListener = createButtonListener(false);
  var loveListener = createButtonListener(true);

  nope.addEventListener('click', nopeListener);
  love.addEventListener('click', loveListener);
}

function displayCards(groups) {
  groups.forEach((g, i) => {
    $("#cards-container").append(`
      <div class="finda-card">
        <img src="${g.image}">
        <h3>${g.name}</h3>
        <p>Fach: ${g.subject}</p>
        <p>Beschreibung: ${g.description}</p>
      </div>
    `)
  })
}

document.addEventListener("DOMContentLoaded", () => {
  $.getJSON("../assets/discovery-groups.json", function (json) {
    displayCards(json)
    setupCards();
  });

  $.getJSON("../assets/groups.json", function (json) {
    displayGroups(json)
  });
});

function displayGroups(groups) {
  groups.forEach((g, i) => {
    $("#group-selector").append(`
      <a  href="group.html?group_id=${i}" class="group-box"> 
        <div class="circle">
          <img src="${g.icon}">
        </div>
        <div class="group">
          <p class="groupname">${g.name}</p>
          <p class="members">${g.members}</p>
        </div>
      </a>
    `)
  })
}