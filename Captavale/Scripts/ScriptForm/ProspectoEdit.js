var id = 0;
var tipo = 0;
var documentos = [];
$(document).ready(function () {
    $(".formsave").validate({
        highlight: function (element) {
            jQuery(element).closest('.form-control').addClass('error');
        },
        success: function (element) {
            jQuery(element).closest('.form-control').removeClass('error');
        },
        onfocusout: false,
        invalidHandler: function (form, validator) {
            var error = validator.numberOfInvalids();

            if (error) {
                validator.errorList[0].element.focus();
            }
        },
        ignore: 'input[type=hidden]'
    });

    id = parseInt(GetURLParameter("id"));
    tipo = parseInt(GetURLParameter("tipo"));

    //1.-Visualiza, 2.- Evaluar
    switch (tipo) {
        case 1: $("#h2Titulo").html("Visualizando Prospecto"); $("#btnEvaluar").hide(); $("#btnEnviar").hide(); $("#btnLimpiar").hide();
            break;
        case 2: $("#h2Titulo").html("Evaluando Prospecto"); $("#btnEvaluar").show(); $("#btnEnviar").hide(); $("#btnLimpiar").hide();
            break;
        default: $("#h2Titulo").html("Nuevo Prospecto"); $("#btnEvaluar").hide(); $("#btnEnviar").show(); $("#btnLimpiar").show();
            break;
    }
    if (isNaN(id)) {
        id = 0;
        $("divObservaciones").hide();
        $("btnLimpiar").show();
        $("#btnEnviar").show();
        $("#h2Titulo").html("Nuevo Prospecto");
        return false;
    }
    if (id == 0) {
        id = 0;
        hideProcessing();
        $("#divObservaciones").hide();
        $("#btnLimpiar").show();
        $("#btnEnviar").show();
        $("#h2Titulo").html("Nuevo Prospecto");
        return false;
    }
    var param = {
        type: "GET",
        url: "Handlers/ProspectoHandler.ashx",
        data: { method: "ObtenerProspecto", args: { codigo: id } },
        method: function (data) {
            $("input, textarea").attr("disabled", true);
            if (data.Estatus == 3) {//1.-enviado, 2.-aceptado, 3.-rechazado
                $("#divObservaciones").show();
                $("#btnLimpiar").hide();
                $("#btnEnviar").hide();
            }
            $("#txtNombre").val(data.Nombre);
            $("#txtApellidoP").val(data.ApellidoPaterno);
            $("#txtApellidoM").val(data.ApellidoMaterno);
            $("#txtCalle").val(data.Calle);
            $("#txtNumero").val(data.Numero);
            $("#txtColonia").val(data.Colonia);
            $("#txtCp").val(data.CodigoPostal);
            $("#txtTelefono").val(data.Telefono);
            $("#txtRFC").val(data.RFC);
            $("#txtObservaciones").val(data.Observaciones);
            if (data.linksImagenes.length > 0) {
                for (var i = 0; i < data.linksImagenes.length; i++) {
                    $("#divDocs").append("<li><a target='_blank' href=" + data.linksImagenes[i]+">Archivo "+(i)+"</a></li>")
                }
                
            }
        },
        unblockMessage: true
    };

    ajaxRequest(param);
});

$("#btnEnviar").on("click", function () {

    
    if (!$(".formsave").valid()) {
        warningMessage("Información incompleta");
        return;
    }
    
   documentos = [];
    showProcessing("Guardando...");
    var item = {
        Nombre: $("#txtNombre").val(),
        ApellidoPaterno: $("#txtApellidoP").val(),
        ApellidoMaterno: $("#txtApellidoM").val(),
        Calle: $("#txtCalle").val(),
        Numero: $("#txtNumero").val(),
        Colonia: $("#txtColonia").val(),
        CodigoPostal: $("#txtCp").val(),
        Telefono: $("#txtTelefono").val(),
        RFC: $("#txtRFC").val(),
        Estatus: 1,
    };
    var totaldocs = $("#fileDocumentos").get(0).files.length
    

    var tokenFileImg;

    tokenFileImg = Math.floor(Math.random() * (999999 - 10000)) + 10000;
    
    for (var i = 0; i < totaldocs; i++) {
        var formData = new FormData();
        formData.append("token", item.Nombre + item.ApellidoPaterno);
        formData.append("UploadedPdf", $("#fileDocumentos").get(0).files[i]);

        $.ajax(
            {
                url: "../Handlers/FileUpload.ashx",
                type: 'POST',
                async: false,
                complete: function (data) {

                    if (data.length > 0) {
                        errorMessage(data);
                        return false;
                    }
                    
                    documentos.push($("#fileDocumentos").get(0).files[i].name);
                        hideProcessing();
                },
                error: function (e) {
                    hideProcessing();
                    errorMessage("Ocurrió un error al subir el archivo, intente de nuevo");
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            });
    }
    

    
    var param = {
        type: "POST",
        url: "ProspectoEdit.aspx/Enviar",
        async:false,
        data: "{ item:" + JSON.stringify(item) + ", documentos:"+JSON.stringify(documentos)+"}",

        method: function (data) {

            if (data.message != undefined && data.message.length > 0) {
                hideProcessing();
                errorMessage(data.message);
                return false;
            }

            LimpiarControles();

            successMessage();
        }
    };

    ajaxRequest(param);
});

$("#btnLimpiar").on("click", function () {
    LimpiarControles();
});
$("#btnRegresar").on("click", function () {
    window.location.replace("ProspectoList.aspx");
});
function LimpiarControles() {
    $("input").val("");
    id = 0;
    $(".form-control.error").removeClass("error");
    $(".error").css("display", "none");
    $(".message .error").css("display", "none");
}

$("#btnAceptar").on("click", function () {
    showProcessing("Guardando...");

    var item = {
        Codigo: id,
        Nombre: $("#txtNombre").val(),
        ApellidoPaterno: $("#txtApellidoP").val(),
        ApellidoMaterno: $("#txtApellidoM").val(),
        Calle: $("#txtCalle").val(),
        Numero: $("#txtNumero").val(),
        Colonia: $("#txtColonia").val(),
        CodigoPostal: $("#txtCp").val(),
        Telefono: $("#txtTelefono").val(),
        RFC: $("#txtRFC").val(),
        Observaciones:$("txtObservacionesModal").val(),
        Estatus:2
    };

    var param = {
        type: "POST",
        url: "ProspectoEdit.aspx/Enviar",
        data: "{ item:" + JSON.stringify(item) + ",documentos:"+JSON.stringify(documentos)+" }",

        method: function (data) {

            if (data.message != undefined && data.message.length > 0) {
                hideProcessing();
                errorMessage(data.message);
                return false;
            }

            $("#exampleModal").modal("hide");
            successMessage();
        }
    };

    ajaxRequest(param);
});

$("#btnRechazar").on("click", function () {
    if ($("#txtObservacionesModal").val() == "") {
        warningMessage("Capturar motivo de rechazo");
        return false;
    }
    showProcessing("Guardando...");
    
    var item = {
        Codigo: id,
        Nombre: $("#txtNombre").val(),
        ApellidoPaterno: $("#txtApellidoP").val(),
        ApellidoMaterno: $("#txtApellidoM").val(),
        Calle: $("#txtCalle").val(),
        Numero: $("#txtNumero").val(),
        Colonia: $("#txtColonia").val(),
        CodigoPostal: $("#txtCp").val(),
        Telefono: $("#txtTelefono").val(),
        RFC: $("#txtRFC").val(),
        Observaciones: $("#txtObservacionesModal").val(),
        Estatus:3
    };

    var param = {
        type: "POST",
        url: "ProspectoEdit.aspx/Enviar",
        data: "{ item:" + JSON.stringify(item) + ", documentos:" + JSON.stringify(documentos) +"}",

        method: function (data) {

            if (data.message != undefined && data.message.length > 0) {
                hideProcessing();
                errorMessage(data.message);
                return false;
            }

            $("#exampleModal").modal("hide");
            successMessage();
        }
    };

    ajaxRequest(param);
});

$("#btnEvaluar").on("click", function () {
    $("#txtObservacionesModal").attr("disabled", false);
});