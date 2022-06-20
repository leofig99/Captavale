using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using Entities.DTO;
using Newtonsoft.Json;

namespace Captavale
{
    public partial class ProspectoEdit : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string Enviar(ProspectoDTO item, List<string> documentos)
        {
            var classProspecto = new Prospectos();

            var message = "";

            try
            {
                classProspecto.Enviar(item,documentos);
            }
            catch (Exception ex)
            {
                message = "Ocurrió un error, intente de nuevo";
            }

            return JsonConvert.SerializeObject(message);
        }

        [WebMethod]
        public static string GuardarDocumentos(HttpPostedFileBase[] archivos)
        {
            var message = "";
            return JsonConvert.SerializeObject(message);
        }

    }
}