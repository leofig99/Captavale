<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="ProspectoEdit.aspx.cs" Inherits="Captavale.ProspectoEdit" %>
<asp:Content ID="Content1" ClientIDMode="Static" ContentPlaceHolderID="styles" runat="server">
    <link href="Content/css/select2.css" rel="stylesheet" />
    <link href="Content/datepicker.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ClientIDMode="Static" ContentPlaceHolderID="body" runat="server">
    <div class="form-group">
        <form class="formsave">
            <div class="form-block same-group">

                <div class="col-lg-12">
                    <h2 id="h2Titulo">Nuevo Prospecto</h2>
                </div>

                <div class="col-lg-4">
                    <div>
                        <label>Nombre(s) <span class="required"></span></label>
                        <input type="text" id="txtNombre" name="txtNombre" class="form-control" maxlength="100" required />
                    </div>

                </div>

                <div class="col-lg-4">
                    <div>
                        <label>Apellido paterno <span class="required"></span></label>
                        <input type="text" id="txtApellidoP" name="txtApellidoP" class="form-control" maxlength="100" required />
                    </div>


                </div>

                <div class="col-lg-4">
                    <div>
                        <label>Apellido materno</label>
                        <input type="text" id="txtApellidoM" name="txtApellidoM" class="form-control" maxlength="100"/>
                    </div>
                </div>
                                <div class="col-lg-4">
                    <div>
                        <label>Telefono <span class="required"></span></label>
                        <input type="text" id="txtTelefono" name="txtTelefono" class="form-control" maxlength="10" required/>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div>
                        <label>RFC <span class="required"></span></label>
                        <input type="text" id="txtRFC" name="txtRFC" class="form-control" maxlength="20" required/>
                    </div>
                </div>
                <hr class="breakline" />
                <h3>Domicilio <span class="required"></span></h3>
                <div class="col-lg-4">
                    <div>
                        <label>Calle <span class="required"></span></label>
                        <input type="text" id="txtCalle" name="txtCalle" class="form-control" maxlength="100" required/>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div>
                        <label>Número <span class="required"></span></label>
                        <input type="text" id="txtNumero" name="txtNumero" class="form-control" maxlength="20" required/>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div>
                        <label>Colonia <span class="required"></span></label>
                        <input type="text" id="txtColonia" name="txtColonia" class="form-control" maxlength="100" required/>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div>
                        <label>Código Postal <span class="required"></span></label>
                        <input type="number" id="txtCp" name="txtCp" class="form-control" max="99999" required/>
                    </div>
                </div>
                <hr class="breakline" />
                <div class="col-lg-6" id="divObservaciones" style="display:none">
                    <div>
                        <label>Observaciones</label>
                        <textarea type="text" id="txtObservaciones" name="txtObservaciones" class="form-control" maxlength="1000" rows="4"></textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div>
                        <label>Documentos</label>
                        <input type="file" id="fileDocumentos" name="fileDocumentos" class="form-control" multiple/>
                    </div>
                </div>
                
                <div class="col-log-6" ><ul id="divDocs"></ul></div>
            </div>
        </form>
    </div>

    <div class="actions-group col-lg-12">
        <button type="button" class="btn btn-success" id="btnEnviar"><span class="glyphicon glyphicon-ok"></span>Enviar</button>
        <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" id="btnEvaluar"><span class="glyphicon"></span>Evaluar</button>
        <button type="button" class="btn btn-primary" id="btnLimpiar"><span class="glyphicon glyphicon-file"></span>Limpiar controles</button>
        <button type="button" class="btn btn-info" id="btnRegresar"><span class="glyphicon glyphicon-arrow-left"></span>Ir al listado</button>
    </div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Rechazar o Aceptar</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>

      </div>
      <div class="row modal-body">
                   <div class="col-lg-12">
                    <div>
                        <label>Observaciones</label>
                        <textarea type="text" id="txtObservacionesModal" name="txtObservacionesModal" class="form-control" maxlength="1000" rows="4"></textarea>
                    </div>
                </div>

      </div>
      <div class="row modal-footer">
        <button type="button" id="btnRechazar" class="btn btn-danger">Rechazar</button>
        <button type="button" id="btnAceptar" class="btn btn-success">Aceptar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>
</asp:Content>

<asp:Content ID="Content3" ClientIDMode="Static" ContentPlaceHolderID="scripts" runat="server">
    <script src="Scripts/autoNumeric-1.9.25.min.js"></script>
    <script src="Scripts/select2.min.js"></script>
    <script src="Scripts/select2_locale_es.js"></script>
    <script src="Scripts/jquery.validate.min.js"></script>
    <script src="Scripts/messages_es.min.js"></script>
    <script src="Scripts/ScriptForm/ProspectoEdit.js?v=1.01"></script>
</asp:Content>
