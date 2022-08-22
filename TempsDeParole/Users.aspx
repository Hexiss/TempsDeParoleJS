<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeFile="Users.aspx.cs" Inherits="TempsDeParole.Users" %>

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
            <input type="number" class="form-control inputTimeSpoken" id="timespoken" placeholder="Temps parlé">
         </div>
         <button type="submit" class="btn btn-primary userAdd" id="Save">Enregistrer</button>
      </form>
   </div>

   <script src="./JS/users.js" charset="utf-8"></script>
   <script src="http://ajax.microsoft.com/ajax/jquery/jquery-1.4.2.js" type="text/javascript"></script>
</asp:Content>
