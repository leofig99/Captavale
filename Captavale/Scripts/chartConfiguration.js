function ConfiguraChart(data, categoryField, valueField, chartControl) {

    var chart

    // SERIAL CHART
    chart = new AmCharts.AmSerialChart();
    chart.dataProvider = data;
    chart.categoryField = categoryField;
    chart.startDuration = 1;

    // AXES
    // category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.labelRotation = 90;
    categoryAxis.gridPosition = "start";

    // value
    // in case you don't want to change default settings of value axis,
    // you don't need to create it, as one value axis is created automatically.

    // GRAPH
    for (var item in valueField) {
        var graph = new AmCharts.AmGraph();
        graph.valueField = valueField[item];
        graph.title = valueField[item];
        graph.balloonText = "[[category]]: <b>$[[value]]</b>";
        graph.type = "column";
        graph.lineAlpha = 0;
        graph.fillAlphas = 0.8;
        graph.integersOnly = false;
        chart.addGraph(graph);
    }

    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.integersOnly = false;
    chart.numberFormatter = { precision: 2, decimalSeparator: ".", thousandsSeparator: "," };
    chart.addValueAxis(valueAxis);

    // CURSOR
    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorAlpha = 0;
    chartCursor.zoomable = false;
    chartCursor.categoryBalloonEnabled = false;
    chart.addChartCursor(chartCursor);

    // LEGEND
    var legend = new AmCharts.AmLegend();
    legend.valueWidth = 90;
    legend.autoMargins = false;
    legend.periodValueText = "$[[value.sum]]";
    chart.addLegend(legend);

    chart.creditsPosition = "top-right";

    chart.write(chartControl);
}

function ConfiguraChart2(data, categoryField, valueField, chartControl) {

    var chart

    // SERIAL CHART
    chart = new AmCharts.AmSerialChart();
    chart.dataProvider = data;
    chart.categoryField = categoryField;
    chart.startDuration = 1;

    // AXES
    // category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.labelRotation = 90;
    categoryAxis.gridPosition = "start";

    // value
    // in case you don't want to change default settings of value axis,
    // you don't need to create it, as one value axis is created automatically.

    // GRAPH
    for (var item in valueField) {
        var graph = new AmCharts.AmGraph();
        graph.valueField = valueField[item];
        graph.title = valueField[item];
        graph.balloonText = "[[category]]: <b>[[value]]</b>";
        graph.type = "column";
        graph.lineAlpha = 0;
        graph.fillAlphas = 0.8;
        graph.integersOnly = false;
        chart.addGraph(graph);
    }

    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.integersOnly = false;
    chart.numberFormatter = { decimalSeparator: ".", thousandsSeparator: "," };
    chart.addValueAxis(valueAxis);

    // CURSOR
    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorAlpha = 0;
    chartCursor.zoomable = false;
    chartCursor.categoryBalloonEnabled = false;
    chart.addChartCursor(chartCursor);

    // LEGEND
    var legend = new AmCharts.AmLegend();
    legend.valueWidth = 90;
    legend.autoMargins = false;
    legend.periodValueText = "[[value.sum]]";
    chart.addLegend(legend);

    chart.creditsPosition = "top-right";

    chart.write(chartControl);
}

var chart;

function ConfiguraChart3(data, categoryField, valueField, chartControl, moneda) {

    // SERIAL CHART
    chart = new AmCharts.AmSerialChart();
    chart.dataProvider = data;
    chart.type = "serial";
    chart.categoryField = categoryField;
    chart.startDuration = 1;
    chart.marginRight = 80;
    chart.autoMarginOffset = 20;
    chart.marginTop = 7;

    // AXES
    // category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.labelRotation = 45;
    categoryAxis.gridPosition = "start";

    // value
    // in case you don't want to change default settings of value axis,
    // you don't need to create it, as one value axis is created automatically.

    // GRAPH
    for (var item in valueField) {
        var graph = new AmCharts.AmGraph();
        graph.valueField = valueField[item];
        graph.title = valueField[item];
        graph.balloonText = "[[category]]: <b>" + (moneda != undefined && moneda ? "$" : "")  + "[[value]]</b>";
        graph.bullet = "round";
        graph.bulletBorderAlpha = 1,
        graph.hideBulletsCount = 50,
        graph.colorField = "red",
        //graph.lineAlpha = 1;
        //graph.fillAlphas = 0.2;
        graph.integersOnly = false;
        chart.addGraph(graph);
    }

    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.integersOnly = false;
    valueAxis.axisAlpha = 0.2;
    valueAxis.dashLength = 1,
    valueAxis.position = "left";

    chart.numberFormatter = { precision: (moneda != undefined && moneda ? 2 : 0), decimalSeparator: ".", thousandsSeparator: "," };
    chart.addValueAxis(valueAxis);

    // CURSOR
    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorAlpha = 0;
    chartCursor.valueLineAlpha = 0.2;
    //chartCursor.zoomable = false;
    //chartCursor.categoryBalloonEnabled = false;
    chart.addChartCursor(chartCursor);

    // LEGEND
    var legend = new AmCharts.AmLegend();
    legend.valueWidth = 90;
    legend.autoMargins = false;
    legend.periodValueText = (moneda != undefined && moneda ? "$" : "") + "[[value.sum]]";
    legend.clickLabel = handleClick;
    legend.clickMarker = handleClick;
    chart.addLegend(legend);

    chart.creditsPosition = "top-right";    
    chart.write(chartControl);
}

function handleClick(item) {
    //alert(item);
}

function handleClick2(item) {
    if (item.dataItem.pulled) {
        CargarOfertas(item.dataItem.title);
    }
}

function handleClick3(item) {
    if (item.dataItem.pulled) {
        CargarTemas(item.dataItem.title);
    }
}

function ConfiguraChart4(data, categoryField, valueField, chartControl, tipo) {

    var chart = AmCharts.makeChart(chartControl, {
        "type": "pie",
        "theme": "chalk",
        "depth3D": 17,
        "angle": 15,
        "dataProvider": data,
        "valueField": valueField,
        "titleField": categoryField,
        "startEffect": "easeInSine",
        "startRadius": "100%",
        "balloon": {
            "fixedPosition": true
        },
        "export": {
            "enabled": true
        }
    });

    if (tipo == "oferta") {
        chart.addListener("clickSlice", handleClick3);
    }
    else if(tipo == "categoria") {
        chart.addListener("clickSlice", handleClick2);
    }
}