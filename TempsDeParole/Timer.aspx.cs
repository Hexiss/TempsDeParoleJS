using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI.WebControls;


namespace TempsDeParole
{
   public partial class Timer : System.Web.UI.Page
   {

      public string m_strAnimateurs { get; set; }
      public string name { get; set; }
      public string timeSpokenMs { get; set; }

      protected void Page_Load(object sender, EventArgs e)
      {
         //LM: appelé à chaque postback de la page

         m_strAnimateurs = ListAnimateursInJson();

      }

      private string ListAnimateursInJson()
      {
         string strAnimateursJSON = "";
         using (var db = new TempsDeParoleEntities())
         {
            var list = db.Animateurs.ToList();
            var js = new JavaScriptSerializer();
            strAnimateursJSON = js.Serialize(list);
         }
         return strAnimateursJSON;
      }

      [WebMethod]
      public void AddEmployee(Timer emp)
      {
         string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
         using (SqlConnection con = new SqlConnection(CS))
         {
            SqlCommand cmd = new SqlCommand("spAddNewEmployee", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter()
            {
               Value = emp.m_strAnimateurs
            });
            con.Open();
            cmd.ExecuteNonQuery();
         }
      }
   }
}
      /*
      private void UpdateAnimateur(int test)
      {
         using (var connection = new SqlConnection("connectionString"))
         {
            connection.Open();
            var sql = "INSERT INTO Animateurs(timeSpokenMs) VALUES(@test)";
            using (var cmd = new SqlCommand(sql, connection))
            {
               cmd.Parameters.AddWithValue("@test", test);
               cmd.ExecuteNonQuery();
            }
         }
            SqlConnection cnn = new SqlConnection(ConfigurationSettings.AppSettings["CnnStr"]);
            cnn.Open();
            SqlCommand cmd = new SqlCommand("UPDATE users Set timeSpokenMs=" + test , cnn);
            cmd.ExecuteNonQuery();
         }

*/

