using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TempsDeParole
{
   public partial class Users : System.Web.UI.Page
   {
      public string Username { get; set; }
      public string Password { get; set; }

      protected void Page_Load(object sender, EventArgs e)
      {
         if (!this.IsPostBack)
         {
            string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
            using (SqlConnection con = new SqlConnection(constr))
            {
               using (SqlDataAdapter sda = new SqlDataAdapter("SELECT * FROM Users", con))
               {
                  DataTable dt = new DataTable();
                  sda.Fill(dt);
                  gvUsers.DataSource = dt;
                  gvUsers.DataBind();
               }
            }
         }
      }
      [WebMethod]
      public static void SaveUser(Users user)
      {
         string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
         using (SqlConnection con = new SqlConnection(constr))
         {
            using (SqlCommand cmd = new SqlCommand("INSERT INTO Users VALUES(@Username, @Password)"))
            {
               cmd.CommandType = CommandType.Text;
               cmd.Parameters.AddWithValue("@Username", user.Username);
               cmd.Parameters.AddWithValue("@Password", user.Password);
               cmd.Connection = con;
               con.Open();
               cmd.ExecuteNonQuery();
               con.Close();
            }
         }
      }
   }



}