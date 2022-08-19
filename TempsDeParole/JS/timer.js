'use strict';

//liaison entre mes éléments du front (id) et mes fonctions
//"g_" car mes variables sont globales
//On ne peux pas avoir plusieurs fois le même ID donc on utilise les classes
var g_chronoGlobal = document.getElementsByClassName("chronoGlobal");
var g_chronos      = document.getElementsByClassName("chrono");
var g_btnResetAll  = document.getElementsByClassName("chronoResetAll");
var g_btnStart     = document.getElementsByClassName("chronoStart");
var g_btnHalt      = document.getElementsByClassName("chronoHalt");
var g_btnReset     = document.getElementsByClassName("chronoReset");
var g_chronoName   = document.getElementsByClassName("chronoDisplay");

var g_dtStart      = undefined;
var g_dtHalt       = undefined;

var g_timeout;
var g_permaTimeout;

var g_bIsStop = true;

var g_arrGlobalTimer = { chronoGlobal : undefined };

// g_arrAnimateurs = table ou mes animateurs et temps de paroles sont stockés
// GetAnimateursFromServer(); = liaison entre le back c# et la bdd
var g_arrAnimateurs = GetAnimateursFromServer();

// Tableau qui permet de donner une valeur récupérable n'importe ou à mes indexs locals
var g_arrLastIndexPush = { indexValue: 0 };


// Créer une nouvelle date et appel la fonction startTimer
const start = function (index) {
   if (g_bIsStop == true) {
      g_bIsStop = false;
      if (g_dtStart == undefined) {
         g_dtStart = new Date();
      };
      startTimer(index);
      permaTimer();
   };
   
   // Si le timer 1 est route bloque le bouton pause du timer 2 et inversement
   if (index == 0) {
      var animateur                  = g_arrAnimateurs;
      animateur[1].btnHalt.disabled  = true;
      animateur[0].btnHalt.disabled  = false;
      animateur[1].btnStart.disabled = true;
      animateur[0].btnStart.disabled = false;
      
   } else {
      var animateur                  = g_arrAnimateurs;
      animateur[0].btnHalt.disabled  = true;
      animateur[1].btnHalt.disabled  = false;
      animateur[0].btnStart.disabled = true;
      animateur[1].btnStart.disabled = false;
   };

   checkBtnState();
   g_arrLastIndexPush.indexValue = index;
};

// Met sur pose le timer
const halt = function (index) {

   // Si le timer 1 est en marche et que j'appuie sur le btn pause du timer 2 je sors de la boucle et donc je ne fais rien
   if (index != g_arrLastIndexPush.indexValue) {
      return;
   };

   if (g_bIsStop == false) {
      g_bIsStop = true;
      clearTimeout(g_timeout);
   };
   if (g_dtStart) {
      var dtNow     = new Date;
      let iDiffMs   = dtNow - g_dtStart;
      var animateur = g_arrAnimateurs[index];
      animateur.diffTimeSpokenMs += iDiffMs;
      g_dtStart = undefined;
      animateur.btnStart.textContent = "Reprendre"
   };

   var animateur = g_arrAnimateurs;
   if (animateur[1].btnStart.disabled == true) {
      animateur[1].btnStart.disabled = false;
   };

   if (animateur[0].btnStart.disabled == true) {
      animateur[0].btnStart.disabled = false;
   };
   checkBtnState();
};

const zeroPad = (num, places) => {
   const numZeroes = places - num.toString().length + 1;
   if (numZeroes > 0) {
      return Array(+numZeroes).join("0") + num;
   }
   return num
};

const startTimer = function (index) {
   if (g_bIsStop == true)
      return;
   var dtNow     = new Date;
   let iDiffMs   = dtNow - g_dtStart;
   var animateur = g_arrAnimateurs[index];

   //Appel la fonction zeroPad pour afficher les heures, minutes, secondes sous forme 2 digits

   animateur.timeSpokenMs = (iDiffMs + animateur.diffTimeSpokenMs);

   animateur.chrono.textContent = displayTime(animateur.timeSpokenMs);

   g_timeout = setTimeout(startTimer.bind(null, index), 1000);
};

// Lance un timeout qui ne se clear jamais pour mettre à jour le timer global
const permaTimer = function () {
   refreshGlobalTimer()
   g_permaTimeout = setTimeout(permaTimer, 1000);
};

//Repasse les valeurs de mon timer à 0
const reset = function (index) {
   var animateur                  = g_arrAnimateurs[index];
   g_dtHalt                       = undefined;
   g_dtStart                      = undefined;
   animateur.diffTimeSpokenMs     = 0;
   animateur.timeSpokenMs         = 0;
   animateur.chrono.textContent   = displayTime(0);
   animateur.btnStart.textContent = "Commencer";
   g_bIsStop                      = true;
   clearTimeout(g_timeout);
   refreshGlobalTimer();
};

//Remet toutes les valeurs de tous les timers à 0
const resetAll = function () {
   for (var i = 0; i < g_arrAnimateurs.length; i++) {
      var animateur                               = g_arrAnimateurs[i];
      var globalTimer                             = g_arrGlobalTimer.chronoGlobal.global;
      animateur.btnStart.disabled                 = false;
      animateur.btnHalt.disabled                  = false;
      animateur.chrono.textContent                = displayTime(0);
      globalTimer.textContent                     = displayTime(0);
      animateur.btnStart.textContent              = "Commencer";
      animateur.diffTimeSpokenMs                  = 0;
      animateur.timeSpokenMs                      = 0;
      g_bIsStop                                   = true;
      clearTimeout(g_timeout);
   };
};

// Permet de prendre les milliseconds et les convertire en heure, minutes, secondes
const displayTime = function (iDiffMs) {
   let iTotalSeconds = Math.floor(iDiffMs / 1000);
   let iHours        = Math.floor(iTotalSeconds / 3600); 
   iTotalSeconds     = iTotalSeconds - (iHours * 3600); 
   let iMinutes      = Math.floor(iTotalSeconds / 60); 
   let iSeconds      = iTotalSeconds - (iMinutes * 60); 

   //Appel la fonction zeroPad pour afficher les heures, minutes, secondes sous forme 2 digits
   return zeroPad(iHours, 2) + ":" + zeroPad(iMinutes, 2) + ":" + zeroPad(iSeconds, 2);
};

//On recupère l'index de document.getElementsByClassName("chronoStart")
//car coté HTML il y'a plusieurs bouttons avec la même classe
//et on ajoute un addEventListener qui trigger la fonction start()
for (var i = 0; i < g_btnStart.length; i++) {
   (function () {
      var index = i;
      g_btnStart[index].addEventListener("click", function () {
         start(index);
      });
      g_arrAnimateurs[index].btnStart = g_btnStart[index];
   }()); // immediate invocation
};

for (var i = 0; i < g_btnHalt.length; i++) {
   (function () {
      var index = i;
      g_btnHalt[index].addEventListener("click", function () {
         halt(index);
      });
      g_arrAnimateurs[index].btnHalt = g_btnHalt[index];
   }()); // immediate invocation
};

for (var i = 0; i < g_btnReset.length; i++) {
   (function () {
      var index = i;
      g_btnReset[index].addEventListener("click", function () {
         reset(index);
      });
      g_arrAnimateurs[index].btnReset = g_btnReset[index];
   }()); // immediate invocation
};

for (var i = 0; i < g_chronos.length; i++) {
   (function () {
      var index = i;
      g_arrAnimateurs[index].chrono = g_chronos[index];
      var animateur = g_arrAnimateurs[index];
      animateur.chrono.textContent = displayTime(animateur.diffTimeSpokenMs);
   }()); // immediate invocation
};

(function () {
   g_arrGlobalTimer.chronoGlobal = g_chronoGlobal;
   var globalTimer = g_arrGlobalTimer.chronoGlobal.global;
   globalTimer.textContent = displayTime(g_arrAnimateurs[0].timeSpokenMs + g_arrAnimateurs[1].timeSpokenMs);
}()); // immediate invocation


for (var i = 0; i < g_btnResetAll.length; i++) {
   (function () {
      var index = i;
      g_btnResetAll[index].addEventListener("click", function () {
         resetAll();
      });
      g_arrGlobalTimer.chronoResetAll = g_btnResetAll;
   }()); // immediate invocation*
};

for (var i = 0; i < g_chronoName.length; i++) {
   (function () {
      var index = i;
      g_arrAnimateurs[index].chronoName = g_chronoName[index];
      var animateur = g_arrAnimateurs[index];
      animateur.chronoName.textContent = animateur.name;
   }()); // immediate invocation
};

//Garde l'affichage de l'heure global à jour
function refreshGlobalTimer () {
   var globalTimer = g_arrGlobalTimer.chronoGlobal.global;
   globalTimer.textContent = displayTime(g_arrAnimateurs[0].timeSpokenMs + g_arrAnimateurs[1].timeSpokenMs);
};

//Si les boutons pause et start sont lock alors affiche un tooltip
function checkBtnState() {
   for (i = 0; i < g_arrAnimateurs.length; i++) {
      var animateur = g_arrAnimateurs[i];

      if (animateur.btnStart.disabled == true) {
         animateur.btnStart.title = "Un timer est déjà en cours";
      } else {
         animateur.btnStart.title = "";
      };

      if (animateur.btnHalt.disabled == true) {
         animateur.btnHalt.title = "Un timer est déjà en cours";
      } else {
         animateur.btnHalt.title = "";
      };
   };
};