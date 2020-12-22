let groups = [
  {
    "name": "Stadtpuff",
    "members": "Leonard, Marvin, Jansan, Til, Andre",
    "icon": "../assets/image.jpeg"
  },
  {
    "name": "?????",
    "members": "Nils, Ruwen, Kalobi, Ilkay, Kafe",
    "icon": "../assets/group2.jpeg"
  },
  {
    "name": "Group XY",
    "members": "Lea, Nele, Gerry",
    "icon": "../assets/group3.jpeg"
  }
]

current_group = null

$("ul.buttonGroup").click(function (event) {
    var item= $("li", this)
    .removeClass("selected")
    .filter(event.target);
    item.addClass("selected");
    showContent(item.attr('id'));
});

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




document.addEventListener("DOMContentLoaded", () => {
  navSlide();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  selected_group = -1

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
  
});