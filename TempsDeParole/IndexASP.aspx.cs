using System;
using System.Linq;
using System.Web.Script.Serialization;
using System.Web.UI.WebControls;


namespace TempsDeParole
{
   public partial class IndexASP : System.Web.UI.Page
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

      public void submit ()
      {

      }
   }
}