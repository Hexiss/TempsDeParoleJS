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
         <button type="submit" id="save" class="btn btn-primary">Enregistrer</button>
      </form>

      <table border="0" cellpadding="0" cellspacing="0">
         <tr>
            <td>Username:</td>
            <td>
               <asp:TextBox ID="txtUsername" runat="server" Text="" /></td>
         </tr>
         <tr>
            <td>Password:</td>
            <td>
               <asp:TextBox ID="txtPassword" runat="server" TextMode="Password" /></td>
         </tr>
         <tr>
            <td></td>
            <td>
               <asp:Button ID="btnSave" Text="Save" runat="server" /></td>
         </tr>
      </table>
      <hr />
      <asp:GridView ID="gvUsers" runat="server" AutoGenerateColumns="false">
         <Columns>
            <asp:BoundField DataField="Username" HeaderText="Username" />
            <asp:BoundField DataField="Password" HeaderText="Password" />
         </Columns>
      </asp:GridView>

      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
      <script type="text/javascript" src="https://cdn.jsdelivr.net/json2/0.1/json2.js"></script>
      <script type="text/javascript">
         $(function () {
            $("[id*=btnSave]").bind("click", function () {
               var user = {};
               user.Username = $("[id*=txtUsername]").val();
               user.Password = $("[id*=txtPassword]").val();
               $.ajax({
                  type: "POST",
                  url: "Default.aspx/SaveUser",
                  data: '{user: ' + JSON.stringify(user) + '}',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (response) {
                     alert("User has been added successfully.");
                     window.location.reload();
                  }
               });
               return false;
            });
         });
      </script>
   </body>
</asp:Content>
