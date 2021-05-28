window.addEventListener("load", function () {
  var newUser = document.getElementById("createuser");
  var editCurrentUser = document.getElementById("your-profile");

  if (newUser || editCurrentUser) {
    document.querySelector(".pw-weak").remove();
  }
});
