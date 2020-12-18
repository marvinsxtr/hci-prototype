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

const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');

  burger.addEventListener('click', ()=>{
    nav.classList.toggle('nav-active');
  });
}

navSlide();
