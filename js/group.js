current_group = null

loaded_groups = null

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function showContent(content) {
  $('.text').hide();
  $('#' + content + 'div').show();
}

msg_id = 0

function sendChatMessage() {
  let message = $("#chat-send-message").val();
  $("#chat-send-message").val("");

  $("#chat-message-container").append("<p class='sendChatMessage'>" + message + "</p>")

  if (msg_id == 0) {
    setTimeout(function(){ receiveChatMessage("Thank you! 😊"); }, 3000);
  }

  msg_id++
}

function receiveChatMessage(msg) {
  $("#chat-message-container").append("<p class='receivedChatMessage'>" + msg +"</p>")
}

function checkTodo(element) {
  element.children[0].checked = !element.children[0].checked
}

function chatKeyDown(event) {
  if (event.keyCode == 13)
    sendChatMessage()
}

function searchQueryChanged(event) {
  if (loaded_groups === null)
    return;
  
  query = $("#sidebarSearch").val().toLowerCase()
  filtered_groups = loaded_groups.filter(group => group.name.toLowerCase().includes(query))

  was_filtered =  loaded_groups.length != filtered_groups.length

  displayGroups(filtered_groups, was_filtered)
}

const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');

  burger.addEventListener('click', ()=>{
    nav.classList.toggle('nav-active');
  });
}

function displayGroups(groups, filtered) {


  selected_group = 0

  if (urlParams.has("group_id"))
    selected_group = urlParams.get("group_id")
  
  if (filtered)
    selected_group = -1

  $("#group-selector").empty()
  
  groups.forEach((g, i) => {

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

  $.getJSON("../assets/groups.json", function (json) {
    loaded_groups = json
    displayGroups(loaded_groups, false)
  });

  $("#chat-send-message").keydown(chatKeyDown)

  $("ul.buttonGroup").click(function (event) {
    var item = $("li", this)
      .removeClass("selected")
      .filter(event.target);
    item.addClass("selected");
    showContent(item.attr('id'));
  });
  


  if (urlParams.has("group_id") && urlParams.get("group_id") == 0)
    receiveChatMessage("Hey, can someone help me solve assignment 1? 😅")


  $("#sidebarSearch").on("input", searchQueryChanged);
})
