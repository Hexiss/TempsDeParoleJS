using System;
using System.Linq;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI.WebControls;

namespace TempsDeParole
{
   public partial class Management : System.Web.UI.Page
   {
      public string m_strAnimateurs { get; set; }

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
      public static int addAnimateur(string name, int diffTimeSpokenMs, int timeSpokenMs)
      {
         try
         {
            int status = 0;

            using (var db = new TempsDeParoleEntities())
            {
               var animateur = new Animateurs()
               {
                  name = name,
                  diffTimeSpokenMs = diffTimeSpokenMs,
                  timeSpokenMs = timeSpokenMs,
               };
               db.Animateurs.Add(animateur);
               db.SaveChanges();
            }
            return status;
         }
         catch
         {
            return -1;
         }
      }

      [WebMethod]
      public static int removeAnimateur(int id)
      {
         try
         {
            int status = 0;

            using (var db = new TempsDeParoleEntities())
            {
               var animateur = db.Animateurs.Find(id);
               db.Animateurs.Remove(animateur);
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
