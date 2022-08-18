<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeFile="Users.aspx.cs" Inherits="TempsDeParole.Users" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
   <body class="container">
      <h1>Nouvelle utilisateur</h1>
<form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Nom</label>
      <input type="text" class="form-control" id="name" placeholder="Nom">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Date de naissance</label>
      <input type="date" class="form-control" id="birth_date">
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Enregistrer</button>
</form>
   </body>
</asp:Content>
