current_group = null

function showContent(content) {
  $('.text').hide();
  $('#' + content + 'div').show();
}

function sendChatMessage() {
  let message = $("#chat-send-message").val();
  $("#chat-send-message").val("");

  $("#chat-message-container").append(message)
}


const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');

  burger.addEventListener('click', ()=>{
    nav.classList.toggle('nav-active');
  });
}

const groupSlide = () => {
  const burger = document.querySelector('.burgerGroups');
  const groups = document.querySelector('.groups');

  burger.addEventListener('click', ()=>{
    groups.classList.toggle('groups-active');
  });
}


function displayGroups(groups) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  selected_group = 0

  if (urlParams.has("group_id"))
    selected_group = urlParams.get("group_id")

  groups.forEach((g, i) => {
    console.log(selected_group)
    console.log(i)
    if (selected_group == i)
      current_group = g

    $("#group-selector").append(`
      <a  href="group.html?group_id=${i}" class="group-box ${selected_group == i ? "group-selected": ""}">
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

  $("#group-name").text(current_group.name)
}

document.addEventListener("DOMContentLoaded", () => {
  navSlide();
  groupSlide();

  $.getJSON("../assets/groups.json", function (json) {
    displayGroups(json)
  });

  $("ul.buttonGroup").click(function (event) {
    var item= $("li", this)
    .removeClass("selected")
    .filter(event.target);
    item.addClass("selected");
    showContent(item.attr('id'));
  });

});
