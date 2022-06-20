using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Entities.DTO
{
    public class ProspectoDTO: Prospecto
    {
        public string NombreArchivo { get; set; }
        public List<DocumentoProspecto> Documentos { get; set; }
    }
}