using DAL;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace BLL
{
    public class Prospectos
    {
        public void Enviar(ProspectoDTO item, List<string> documentos)
        {
            var isNew = false;

            using (var r = new Repository<Prospecto>())
            {
                var itemSave = r.Retrieve(x => x.Codigo.Equals(item.Codigo));

                isNew = itemSave == null;

                if (isNew)
                {
                    itemSave = new Prospecto();
                }
                itemSave.Nombre = item.Nombre;
                itemSave.ApellidoPaterno = item.ApellidoPaterno;
                itemSave.ApellidoMaterno = item.ApellidoMaterno;
                itemSave.Calle = item.Calle;
                itemSave.Numero = item.Numero;
                itemSave.Colonia = item.Colonia;
                itemSave.CodigoPostal = item.CodigoPostal;
                itemSave.Telefono = item.Telefono;
                itemSave.RFC = item.RFC;
                itemSave.Estatus = item.Estatus; //1.-Enviado, 2.-Aceptado, 3.-Rechazado
                itemSave.Observaciones = item.Observaciones;
                if (isNew)
                {
                    foreach (var doc in documentos)
                    {
                        itemSave.DocumentoProspecto.Add(new DocumentoProspecto { Archivo = doc });
                    }
                }
                    if (isNew)
                    {
                        r.Create(itemSave);
                    }
                    else
                    {
                        r.Update(itemSave, x => x.First(y => y.Codigo.Equals(itemSave.Codigo)));
                    }
                

            }

        }
        public List<ProspectoDTO> Filter(Expression<Func<Prospecto, ProspectoDTO>> select)
        {
            var result = new List<ProspectoDTO>();

            using (var r = new Repository<Prospecto>())
            {
                result = r.Filter(select);
            }

            return result;
        }
        public List<DocumentoProspectoDTO> Filter(Expression<Func<DocumentoProspecto, DocumentoProspectoDTO>> select)
        {
            var result = new List<DocumentoProspectoDTO>();

            using (var r = new Repository<DocumentoProspecto>())
            {
                result = r.Filter(select);
            }

            return result;
        }
        public ProspectoDTO obtenerPorCodigo(int codigo, Expression<Func<Prospecto, ProspectoDTO>> select)
        {
            ProspectoDTO result = null;

            using (var r = new Repository<Prospecto>())
            {
                result = r.Retrieve(x => x.Codigo == codigo, select);
            }

            return result;
        }
    }
}
