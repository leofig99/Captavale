using BLL;
using Entities.DTO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace Captavale.Handlers
{
    /// <summary>
    /// Summary description for oProspectoHandler
    /// </summary>
    public class ProspectoHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request["method"];
            if (method == "ObtenerProspecto")
            {
                ObtenerProspecto(context);
            }
            if (method == "ObtenerProspectos")
            {
                ObtenerProspectos(context);
            }
        }

        private void ObtenerProspectos(HttpContext context)
        {
            var classProspectos = new Prospectos();

            var Prospectos = classProspectos.Filter(x => new ProspectoDTO
            {
                Codigo = x.Codigo,
                Nombre = x.Nombre,
                ApellidoPaterno = x.ApellidoPaterno,
                ApellidoMaterno = x.ApellidoMaterno,
                Estatus = x.Estatus,
            });

            context.Response.ContentType = "application/json";
            context.Response.Write(JsonConvert.SerializeObject(new
            {
                Prospectos
            }));
        }
        
        private void ObtenerProspecto(HttpContext context)
        {
            var request = context.Request;
            int codigo = 0;
            int.TryParse(request["args[codigo]"], out codigo);

            if (codigo == 0)
            {
                context.Response.ContentType = "application/json";
                context.Response.Write(JsonConvert.SerializeObject(""));
                return;
            }else
            {
                var classProspectos = new Prospectos();

                var item = classProspectos.obtenerPorCodigo(codigo, x =>
                   new ProspectoDTO
                   {
                       Codigo = x.Codigo,
                       Nombre = x.Nombre,
                       ApellidoPaterno = x.ApellidoPaterno,
                       ApellidoMaterno = x.ApellidoMaterno,
                       Calle = x.Calle,
                       Numero = x.Numero,
                       Colonia = x.Colonia,
                       CodigoPostal = x.CodigoPostal,
                       Telefono = x.Telefono,
                       RFC = x.RFC,
                       Observaciones = x.Observaciones,
                       Estatus = x.Estatus
                   }) ;

                var docs = classProspectos.Filter(x => new DocumentoProspectoDTO { Codigo = x.Codigo, CodigoProspecto = x.CodigoProspecto, Archivo = x.Archivo }).Where(x => x.CodigoProspecto == item.Codigo);
                var linksImagenes = new List<string>();

                var urlBase = request.Url.GetLeftPart(UriPartial.Authority) + request.ApplicationPath;

                if (urlBase.Substring(urlBase.Length - 1) != "/")
                {
                    urlBase += "/";
                }

                var ruta = "DocumentosTMP/" + item.Nombre + item.ApellidoPaterno;

                var directory = HttpContext.Current.Server.MapPath("~/" + ruta);

                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }

                if (Directory.Exists(directory))
                {
                    foreach(var doc in docs)
                    {
                        linksImagenes.Add(urlBase + ruta + "/" + doc.Archivo);

                    }



                }
                context.Response.ContentType = "application/json";
                context.Response.Write(JsonConvert.SerializeObject(
                    new
                    {
                        item.Codigo,
                        item.Nombre,
                        item.ApellidoPaterno,
                        item.ApellidoMaterno,
                        item.Calle,
                        item.Numero,
                        item.Colonia,
                        item.CodigoPostal,
                        item.Telefono,
                        item.RFC,
                        item.Observaciones,
                        item.Estatus,
                        linksImagenes
                    }
                    ));
            }

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