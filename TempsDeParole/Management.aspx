<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeFile="Management.aspx.cs" Inherits="TempsDeParole.Management" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <div class="container">
      <form>
         <div class="form-group">
            <label>Nom</label>
            <input type="text" class="form-control inputName" id="name" placeholder="Nom de l'animateur">
         </div>
         <div class="form-group">
            <label>Temps parlé</label>
            <input type="number" class="form-control inputTimeSpoken" value="0" id="timespoken" placeholder="Temps parlé (ms)">
         </div>
         <button type="submit" class="btn btn-primary addAnimateur" id="save">Enregistrer</button>
      </form>

      <div>
         <table id="table" class="table table-sm">
            <thead>
               <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Temps parlé (ms)</th>
                  <th scope="col">Actions</th>
               </tr>
            </thead>
            <tbody>
               <tr id="numberOfRow">
                  <th id="idFromDB">...</th>
                  <td id="nameFromDB">...</td>
                  <td id="timeSpokenMsFromDB">...</td>
                  <td><button id="remove" class="removeAnimateur" value="" style="background-color:white; border:none;"> <img src="https://img.icons8.com/material-rounded/24/000000/delete-forever.png"/></button></td>
               </tr>
            </tbody>
         </table>
      </div>

   </div>

   <script>
      function GetAnimateursFromServer() {
         return <%= m_strAnimateurs%>;
      }
   </script>
   <script src="./JS/users.js" charset="utf-8"></script>
   <script src="http://ajax.microsoft.com/ajax/jquery/jquery-1.4.2.js" type="text/javascript"></script>
</asp:Content>
