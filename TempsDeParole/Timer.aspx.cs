using System;
using System.Data;
using System.Data.OleDb;
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
      public static int saveData(int id, int diffTimeSpokenMs, int timeSpokenMs)
      {
         try
         {
            int status = 0;

            using (var db = new TempsDeParoleEntities())
            {
               var animateur = db.Animateurs.Find(id);
               animateur.diffTimeSpokenMs = diffTimeSpokenMs;
               animateur.timeSpokenMs = timeSpokenMs;
               db.SaveChanges();
            }
            return status;
         }
         catch
         {
            return -1;
         }
      }

   }
}

