<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="IndexASP.aspx.cs" Inherits="TempsDeParole.IndexASP" %>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    
   <div style="text-align:center;" class="container">
      <div class="border border-primary rounded" style="padding-bottom:15px;">
         <div style="font-size: 50px;" class="chronoGlobal" id="global"> 00:00:00 </div>
         <div>
            <h1>GLOBAL TIMER</h1>
         </div>
      </div>

      <div style="display: inline-flex; padding-top:20px; ">
         <div style="padding-right:20px;">
            <div class="border border-primary rounded" style="padding-bottom:10px; ">
               <h2>David</h2>
               <div style="font-size: 50px;"  class="chrono" id="chrono"> 00:00:00 </div>
               <div class="buttons">
                  <button class="btn btn-primary chronoStart" id="start">Commencer</button>
                  <button class="btn btn-primary chronoHalt" id="halt">Pause</button>
                  <button class="btn btn-primary chronoReset" id="reset">Réinitialiser</button>
               </div>
            </div>
         </div>

            <div class="border border-primary rounded" style="padding-bottom:10px; width: AUTO;">
               <h2>Bernard</h2>
               <div style="font-size: 50px;" class="chrono" id="chrono2"> 00:00:00 </div>
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
   <script src="./app.js"></script>
</body>
</html>
