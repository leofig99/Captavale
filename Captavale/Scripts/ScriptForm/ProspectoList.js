$(document).ready(function () {
    FillTable();
});

function FillTable() {

    showProcessing("Cargando...");

    var param = {
        type: "GET",
        url: "../Handlers/ProspectoHandler.ashx",
        data: { method: "ObtenerProspectos" },
        method: function (data) {

            var append = "";

            for (var i = 0; i < data.Prospectos.length; i++) {
                var item = data.Prospectos[i];

                append +=

                    "<tr id='" + item.Codigo + "'>" +
                    "<td>" + item.Nombre + "</td>" +
                    "<td>" + item.ApellidoPaterno + "</td>" +
                    "<td>" + item.ApellidoMaterno + "</td>" +
                    "<td>" + (item.Estatus==1?"Enviado":item.Estatus==2?"Aceptado":"Rechazado") + "</td>" +
                    "<td class='text-center'><a href='ProspectoEdit.aspx?id=" + item.Codigo + "&tipo=1' class='btn'><span class='glyphicon glyphicon-cog'></span></a></td>" +
                    "<td class='text-center'><a href='ProspectoEdit.aspx?id=" + item.Codigo + "&tipo=2' class='btn'><span class='glyphicon glyphicon-cog'></span></a></td>" +
                    "</tr>";
            }
            $("tbody").empty().append(append);
            $('.table').DataTable({
                "language": {
                    "url": "../Scripts/Spanish.json"
                }
            });
        },
        unblockMessage: true
    };

    ajaxRequest(param);
}
