<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeFile="Timer.aspx.cs" Inherits="TempsDeParole.Timer" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <html xmlns="http://www.w3.org/1999/xhtml">
   <body>
      <div style="text-align: center;" class="container">
         <div class="border border-primary rounded" style="padding-bottom: 15px;">
            <div>
               <h1>GLOBAL TIMER</h1>
            </div>
            <div style="font-size: 50px;" class="chronoGlobal" id="global">00:00:00 </div>
            <button class="btn btn-danger btn-sm chronoResetAll" id="resetAll">Reset All</button>
         </div>

         <div style="display: inline-flex; padding-top: 20px;">
            <div style="padding-right: 20px;">
               <div class="border border-primary rounded" style="padding-bottom: 10px;">
                  <h2 class="chronoDisplay" id="ChronoName">...</h2>
                  <div style="font-size: 50px;" class="chrono" id="chrono">00:00:00</div>
                  <div class="buttons">
                     <button class="btn btn-primary chronoStart" id="start">Commencer</button>
                     <button class="btn btn-primary chronoHalt" id="halt" onclick="update()">Pause</button>
                     <button class="btn btn-primary chronoReset" id="reset">Réinitialiser</button>
                  </div>
               </div>
            </div>

            <div class="border border-primary rounded" style="padding-bottom: 10px; width: AUTO;">
               <h2 class="chronoDisplay" id="ChronoName1">...</h2>
               <div style="font-size: 50px;" class="chrono" id="chrono2">00:00:00</div>
               <div class="buttons">
                  <button class="btn btn-primary chronoStart" id="start2">Commencer</button>
                  <button class="btn btn-primary chronoHalt" id="halt2">Pause</button>
                  <button class="btn btn-primary chronoReset" id="reset2">Réinitialiser</button>
               </div>
            </div>
         </div>
      </div>

      <script>
         function GetAnimateursFromServer() {
            return <%= m_strAnimateurs%>;
         }
      </script>
      <script src="./JS/timer.js" charset="utf-8"></script>
      <script src="http://ajax.microsoft.com/ajax/jquery/jquery-1.4.2.js" type="text/javascript"></script>  
   </body>
   </html>
</asp:Content>
