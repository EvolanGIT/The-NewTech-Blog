$(document).ready(function(){
  $(".modal").addClass("is-active");

  $("#closeBtn").click(function() {
  $(".modal").removeClass("is-active");
});

  $("#modalBtn").click(function() {
  $(".modal").addClass("is-active");
});
});

