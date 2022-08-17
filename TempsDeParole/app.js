'use strict';

//liaison entre mes éléments du front (id) et mes fonctions
//"g_" car mes variables sont globales
//On ne peux pas avoir plusieurs fois le même ID donc on utilise les classes
var g_chronoGlobal = document.getElementsByClassName("chronoGlobal");
var g_chronos      = document.getElementsByClassName("chrono");
var g_btnStart     = document.getElementsByClassName("chronoStart");
var g_btnHalt      = document.getElementsByClassName("chronoHalt");
var g_btnReset     = document.getElementsByClassName("chronoReset");

var g_dtStart      = undefined;
var g_dtHalt       = undefined;

var g_timeout;
var g_permaTimeout;

var g_bIsStop      = true;

var g_arrAnimateurs = [
   {
      id              : 0,
      name            : "David",
      diffTimeSpokenMs: 0,
      timeSpokenMs    : 0,
      btnStart        : undefined,
      btnHalt         : undefined,
      btnReset        : undefined,
      chrono          : undefined,
   },
   {
      id              : 1,
      name            : "Bernard",
      diffTimeSpokenMs: 0,
      timeSpokenMs    : 0,
      btnStart        : undefined,
      btnHalt         : undefined,
      btnReset        : undefined,
      chrono          : undefined,
   }
];

var g_arrGlobalTimer = {
      globalTimeSpokenMs : 0,
      chronoGlobal       : undefined,
   };

var g_arrLastIndexPush = { index: 0 }

// Créer une nouvelle date et appel la fonction startTimer
const start = function (index) {
   if (g_bIsStop == true) {
      g_bIsStop = false;
      if (g_dtStart == undefined) {
         g_dtStart = new Date();
      };
      startTimer(index);
      permaTimer();
   }
   g_arrLastIndexPush.index = index
};


// Met sur pose le timer
const halt = function (index) {

   if (index != g_arrLastIndexPush.index) {
      return;
   }

   if (g_bIsStop == false) {
      g_bIsStop = true;
      clearTimeout(g_timeout);
   }
   if (g_dtStart) {
      var dtNow     = new Date;
      let iDiffMs   = dtNow - g_dtStart;
      var animateur = g_arrAnimateurs[index];
      animateur.diffTimeSpokenMs += iDiffMs;
      g_dtStart = undefined;
      animateur.btnStart.textContent = "Reprendre"
   }
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
   var dtNow       = new Date;
   let iDiffMs     = dtNow - g_dtStart;
   var animateur   = g_arrAnimateurs[index];

   //Appel la fonction zeroPad pour afficher les heures, minutes, secondes sous forme 2 digits
   animateur.chrono.textContent = displayTime(iDiffMs + animateur.diffTimeSpokenMs);
   animateur.timeSpokenMs = (iDiffMs + animateur.diffTimeSpokenMs);

   g_timeout = setTimeout(startTimer.bind(null, index), 1000);
}

const permaTimer = function () {

   var globalTimer = g_arrGlobalTimer;

   globalTimer.chronoGlobal.global.textContent = displayTime(g_arrAnimateurs[0].timeSpokenMs + g_arrAnimateurs[1].timeSpokenMs);

   g_permaTimeout = setTimeout(permaTimer, 1000);
};

//Repasse mon timer à 0
const reset = function (index) {
   var animateur                    = g_arrAnimateurs[index];
   g_dtHalt                         = undefined;
   g_dtStart                        = undefined;
   animateur.diffTimeSpokenMs       = 0;
   animateur.timeSpokenMs           = 0;
   animateur.chrono.textContent     = displayTime(0);
   animateur.btnStart.textContent   = "Commencer" ;

   g_bIsStop                        = true;
   clearTimeout(g_timeout);
}

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
}

for (var i = 0; i < g_btnHalt.length; i++) {
   (function () {
      var index = i;
      g_btnHalt[index].addEventListener("click", function () {
         halt(index);
      });
      g_arrAnimateurs[index].btnHalt = g_btnHalt[index];
   }()); // immediate invocation
}

for (var i = 0; i < g_btnReset.length; i++) {
   (function () {
      var index = i;
      g_btnReset[index].addEventListener("click", function () {
         reset(index);
      });
      g_arrAnimateurs[index].btnReset = g_btnReset[index];
   }()); // immediate invocation
}

for (var i = 0; i < g_chronos.length; i++) {
   (function () {
      var index = i;
      g_arrAnimateurs[index].chrono = g_chronos[index];
   }()); // immediate invocation
}

(function () {
   g_arrGlobalTimer.chronoGlobal = g_chronoGlobal;
  }()); // immediate invocation

const displayTime = function (iDiffMs) {
   let iTotalSeconds = Math.floor(iDiffMs / 1000); // 3923
   let iHours = Math.floor(iTotalSeconds / 3600); // 1 => 1 heure + 323 sec
   iTotalSeconds = iTotalSeconds - (iHours * 3600); //323 = 3923 - (1H*3600);
   let iMinutes = Math.floor(iTotalSeconds / 60); //5 => 5 mlinutes et 23 sec
   let iSeconds = iTotalSeconds - (iMinutes * 60); //23 = ???

   //Appel la fonction zeroPad pour afficher les heures, minutes, secondes sous forme 2 digits
   return zeroPad(iHours, 2) + ":" + zeroPad(iMinutes, 2) + ":" + zeroPad(iSeconds, 2);
}
