function createDisplay() {
    var messageDialog = $(".saving");

    if (messageDialog.length == 0) {
        $("#content").append("<div class='saving' style='display:none;'><strong>Guardando...</strong></div>");
    }
}

function showProcessing(message) {

    createDisplay();

    var saving = $(".saving");

    if (message != undefined) {
        saving.find("strong").text(message);
    }

    saving.fadeIn(200);
}

function createAlert() {
    var messageAlert = $(".alert");

    if (messageAlert.length == 0) {
        $("#content").append("<div class='alert'><strong></strong></div>");
    }
}

function hideProcessing() {
    $(".saving").fadeOut(200);
}

function showAlert(alert) {
    alert.fadeIn(3000).fadeOut(2000);
}

function successMessage(message) {

    createAlert();

    var alert = $(".alert");

    if (message == undefined) {
        message = "Información guardada con éxito";
    }

    if (alert.hasClass("alert-danger"))
        alert.removeClass("alert-danger");

    if (alert.hasClass("alert-warning"))
        alert.removeClass("alert-warning");

    alert.find("strong").text(message);

    alert.addClass("alert-success");

    hideProcessing();
    showAlert(alert);
}

function errorMessage(message) {

    createAlert();

    var alert = $(".alert");

    if (alert.hasClass("alert-success"))
        alert.removeClass("alert-success");

    if (alert.hasClass("alert-warning"))
        alert.removeClass("alert-warning");

    alert.addClass("alert-danger");

    alert.find("strong").text(message);

    showAlert(alert);
}

function warningMessage(message) {

    createAlert();

    var alert = $(".alert");

    if (alert.hasClass("alert-success"))
        alert.removeClass("alert-success");
    
    if(alert.hasClass("alert-danger"))
        alert.removeClass("alert-danger");

    alert.addClass("alert-warning");

    alert.find("strong").text(message);

    showAlert(alert);
}