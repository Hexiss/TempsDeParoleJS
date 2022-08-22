using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TempsDeParole
{
   public partial class Users : System.Web.UI.Page
   {

      public string m_strAnimateurs { get; set; }
      public string name { get; set; }
      public string timeSpokenMs { get; set; }
      public int id { get; private set; }

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
      public static int saveUser(string name, int diffTimeSpokenMs, int timeSpokenMs)
      {
         using (var db = new TempsDeParoleEntities())
            {
            DataTable dt = new DataTable();
            dt.Columns.Add("name");
            dt.Columns.Add("diffTimeSpokenMs");
            dt.Columns.Add("timeSpokenMs");
            DataRow row = dt.NewRow();
            row["name"] = name;
            row["diffTimeSpokenMs"] = diffTimeSpokenMs;
            row["timeSpokenMs"] = timeSpokenMs;

            dt.Rows.Add(row);
         }
      }
   }
}
