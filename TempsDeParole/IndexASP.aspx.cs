using System;
using System.Linq;
using System.Web.UI.WebControls;

namespace TempsDeParole
{
   public partial class IndexASP : System.Web.UI.Page
   {
      protected void Page_Load(object sender, EventArgs e)
      {

      }

      private void ListAnimateurs()
      {

         using (var db = new TempsDeParoleEntities())
         {
            var list = db.Animateurs.ToList();

         }
      }
   }
}