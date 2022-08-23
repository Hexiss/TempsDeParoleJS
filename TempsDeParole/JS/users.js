'use strict';

var g_btnSave = document.getElementsByClassName("addAnimateur");
var g_inputName = document.getElementsByClassName("inputName");
var g_inputTimeSpoken = document.getElementsByClassName("inputTimeSpoken");
var g_btnRemove = document.getElementsByClassName("removeAnimateur");

var g_arrAnimateurs = GetAnimateursFromServer();

var g_arrIndexValue = []

for (i = 0; i < g_arrAnimateurs.length; i++) {
   let elem = document.getElementById("numberOfRow");
   let clone = elem.cloneNode(i);
   document.getElementById("idFromDB").innerHTML = g_arrAnimateurs[i].id;
   document.getElementById("nameFromDB").innerHTML = g_arrAnimateurs[i].name;
   document.getElementById("timeSpokenMsFromDB").innerHTML = g_arrAnimateurs[i].timeSpokenMs;
   g_btnRemove.value = g_arrAnimateurs[i].id;
   g_arrIndexValue.push(g_arrAnimateurs[i].id)
   elem.after(clone);
}

function addAnimateur() {

   var obj = new Object();
   obj.name = $('#name').val();
   obj.diffTimeSpokenMs = $('#timespoken').val();
   obj.timeSpokenMs = $('#timespoken').val();
   console.log(obj)

   $.ajax({
      type: "POST",
      url: "Management.aspx/addAnimateur",
      data: JSON.stringify(obj),
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

function removeAnimateur(id) {
   var obj = new Object();
   obj.id = id

   $.ajax({
      type: "POST",
      url: "Management.aspx/removeAnimateur",
      data: JSON.stringify(obj),
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
         addAnimateur(index);
      });
   }()); // immediate invocation
}

for (var i = 0; i < g_btnRemove.length; i++) {
   (function () {
      var index = i;
      g_btnRemove[index].addEventListener("click", function () {
         removeAnimateur(g_arrIndexValue[index]); 
         location.reload();

      });
   }()); // immediate invocation
}