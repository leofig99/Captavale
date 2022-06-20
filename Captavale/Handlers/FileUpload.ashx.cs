using Newtonsoft.Json;
using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace Captavale.Handlers
{
    /// <summary>
    /// Summary description for FileUpload
    /// </summary>
    public class FileUpload : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            var error = string.Empty;

            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                // Get the uploaded image from the Files collection
                var httpPostedFile = HttpContext.Current.Request.Files["UploadedPdf"];
                var token = HttpContext.Current.Request.Form["token"];

                if (httpPostedFile != null)
                {
                    var file = httpPostedFile.FileName;

                    var extension = Path.GetExtension(file).ToLower();

                    if (extension != ".pdf")
                    {
                        error = "Formato de archivo incorrecto, verifique que sea PDF";
                    }

                    var folderPath = HttpContext.Current.Server.MapPath("~/DocumentosTMP/" + token);

                    if (!Directory.Exists(folderPath))
                    {
                        Directory.CreateDirectory(folderPath);
                    }

                    // Get the complete file path
                    var fileSavePath = Path.Combine(folderPath, file);

                    // Save the uploaded file to "UploadedFiles" folder
                    httpPostedFile.SaveAs(fileSavePath);
                }
            }

            context.Response.ContentType = "application/json";
            context.Response.Write(JsonConvert.SerializeObject(error));
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}