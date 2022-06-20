function ajaxRequest(options) {

    this._type = options.type;
    this._url = options.url;

    if (options.data != undefined) {
        this._data = options.data
    }

    var handler = this._url.indexOf("ashx") != -1;

    var ajaxRequestObject;

    if (this._data === undefined) {
        ajaxRequestObject = $.ajax({
            type: this._type,
            url: this._url,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    }
    else {
        ajaxRequestObject = $.ajax({
            type: this._type,
            url: this._url,
            data: this._data,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    }

    ajaxRequestObject.done(function (data) {
        if (options.method != undefined) {
            setTimeout(function () {
                var method = options.method;

                var datos;

                if (handler) {
                    datos = data;
                }
                else {
                    datos = $.parseJSON(data.d);
                }

                method(datos, options.parameters);

                if (options.unblockMessage != undefined && options.unblockMessage) {
                    hideProcessing();
                }

                if (options.showMessageDialog !== undefined && options.showMessageDialog) {
                    showProcessing(options.message);
                }
            }, 300);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        hideProcessing();
        errorMessage(textStatus);
    });
};

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    var paramReturn;

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            paramReturn = sParameterName[1];
            break;
        }
    }

    return paramReturn;
}

(function ($) {
    $.fn.serializeAll = function () {
        var data = $(this).serializeArray();

        $(':disabled[name]', this).each(function () {
            data.push({ name: this.name, value: $(this).val() });
        });

        return data;
    }
})(jQuery);

function SettingPager(numberPage, rowPager) {

    numberPage = parseInt(numberPage);

    var numPages = 5;

    var halfPages = Math.ceil(numPages / 2);

    var lastPage = numberPage <= halfPages ? numPages : numberPage + halfPages;

    if (rowPager < lastPage) {
        lastPage = rowPager;
    }

    var firstPage = lastPage - numPages + 1;

    if (firstPage <= 0) {
        firstPage = 1;
    }

    var pagination = $("ul.pagination");

    pagination.empty();

    var append = "";

    append += '<li class="previous" title="Primera página">' + (numberPage == 1 ? '<span>' : '<a href="#" page=1>') + '<i class="fa fa-angle-double-left"></i>' + (numberPage == 1 ? '</span>' : '</a>') + '</li>';

    append += '<li class="previous" title="Página anterior">' + (numberPage == 1 ? '<span>' : '<a href="#" page=' + (numberPage - 1) + '>') + '<i class="fa fa-angle-left"></i>' + (numberPage == 1 ? '</span>' : '</a>') + '</li>';

    for (var i = firstPage; i <= lastPage; i++) {
        append += "<li title='Página " + i + "' " + (numberPage == i ? "class='active'" : "") + ">" + (numberPage == i ? "<span>" : "<a href='#' page=" + i + ">") + i + (numberPage == i ? "</span>" : "</a>") + "</li>";
    }

    append += '<li class="next" title="Página siguiente">' + (numberPage == rowPager || lastPage <= firstPage ? '<span>' : '<a href="#" page=' + (numberPage + 1) + '>') + '<i class="fa fa-angle-right"></i>' + (numberPage == rowPager ? '</span>' : '</a>') + '</li>';

    append += '<li class="next" title="Última página">' + (lastPage == rowPager || lastPage <= 1 ? '<span>' : '<a href="#" page=' + rowPager + '>') + '<i class="fa fa-angle-double-right"></i>' + (lastPage == rowPager ? '</span>' : '</a>') + '</li>';

    pagination.append(append);
}

$(".required").attr("title", "Campo requerido");

function LoadSelects(selectObject, arrayObject, required, idExtraName, idValueName, idTextName, defaultValueText) {

    if (!Array.isArray(arrayObject))
        return;

    if (idValueName == undefined) {
        idValueName = "Codigo";
    }

    if (idTextName == undefined) {
        idTextName = "Nombre";
    }

    var append = "<option value=''>" + (defaultValueText == undefined ? "SELECCIONE..." : defaultValueText) + "</option>";

    for (var i = 0; i < arrayObject.length; i++) {
        var arrayItem = arrayObject[i];

        append += "<option " + (idExtraName == undefined || idExtraName.length == 0 ? "" : (idExtraName + "='" + arrayItem[idExtraName])) + " value=" + arrayItem[idValueName] + ">" + arrayItem[idTextName] + "</option>";
    }

    return selectObject.append(append);
};

function ClearMessages() {
    $(".select2-choice.error").removeClass("error");
    $("section.messageerror").addClass("hide");
    $(".form-control.error").removeClass("error");
}

$("input").on("mouseup", function (e) {
    e.preventDefault();
});

$("input").on("focus", function () {
    $(this).select();
});