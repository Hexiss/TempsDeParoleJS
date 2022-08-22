'use strict';

var g_btnSave = document.getElementsByClassName("userAdd");
var g_InputName = document.getElementsByClassName("inputName");
var g_InputTimeSpoken = document.getElementsByClassName("inputTimeSpoken");

function addUser() {

   var name = $('#name').val();
   var diffTimeSpokenMs = $('#timespoken').val();
   var timeSpokenMs = $('#timespoken').val();

   $.ajax({
      type: "POST",
      url: "Users.aspx/saveUser",
      data: JSON.stringify(name, diffTimeSpokenMs, timeSpokenMs),
      contentType: "application/json; charset=utf-8",
      datatype: "json",
      async: "true",
      success: function (response) {
         $(".errMsg ul").remove();
      },
      error: function (response) {
         alert(response.status + ' ' + response.statusText);
      }
   });
}


for (var i = 0; i < g_btnSave.length; i++) {
   (function () {
      var index = i;
      g_btnSave[index].addEventListener("click", function () {
         addUser(index);
      });
   }()); // immediate invocation
}