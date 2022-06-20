(function () {
    var e = window.AmCharts; e.AmRectangularChart = e.Class({
        inherits: e.AmCoordinateChart, construct: function (a) {
            e.AmRectangularChart.base.construct.call(this, a); this.theme = a; this.createEvents("zoomed", "changed"); this.marginRight = this.marginBottom = this.marginTop = this.marginLeft = 20; this.depth3D = this.angle = 0; this.plotAreaFillColors = "#FFFFFF"; this.plotAreaFillAlphas = 0; this.plotAreaBorderColor = "#000000"; this.plotAreaBorderAlpha = 0; this.maxZoomFactor = 20; this.zoomOutButtonImageSize = 19; this.zoomOutButtonImage =
            "lens"; this.zoomOutText = "Show all"; this.zoomOutButtonColor = "#e5e5e5"; this.zoomOutButtonAlpha = 0; this.zoomOutButtonRollOverAlpha = 1; this.zoomOutButtonPadding = 8; this.trendLines = []; this.autoMargins = !0; this.marginsUpdated = !1; this.autoMarginOffset = 10; e.applyTheme(this, a, "AmRectangularChart")
        }, initChart: function () {
            e.AmRectangularChart.base.initChart.call(this); this.updateDxy(); !this.marginsUpdated && this.autoMargins && (this.resetMargins(), this.drawGraphs = !1); this.processScrollbars(); this.updateMargins(); this.updatePlotArea();
            this.updateScrollbars(); this.updateTrendLines(); this.updateChartCursor(); this.updateValueAxes(); this.scrollbarOnly || this.updateGraphs()
        }, drawChart: function () { e.AmRectangularChart.base.drawChart.call(this); this.drawPlotArea(); if (e.ifArray(this.chartData)) { var a = this.chartCursor; a && a.draw() } }, resetMargins: function () {
            var a = {}, b; if ("xy" == this.type) {
                var c = this.xAxes, d = this.yAxes; for (b = 0; b < c.length; b++) { var g = c[b]; g.ignoreAxisWidth || (g.setOrientation(!0), g.fixAxisPosition(), a[g.position] = !0) } for (b = 0; b <
                d.length; b++) c = d[b], c.ignoreAxisWidth || (c.setOrientation(!1), c.fixAxisPosition(), a[c.position] = !0)
            } else { d = this.valueAxes; for (b = 0; b < d.length; b++) c = d[b], c.ignoreAxisWidth || (c.setOrientation(this.rotate), c.fixAxisPosition(), a[c.position] = !0); (b = this.categoryAxis) && !b.ignoreAxisWidth && (b.setOrientation(!this.rotate), b.fixAxisPosition(), b.fixAxisPosition(), a[b.position] = !0) } a.left && (this.marginLeft = 0); a.right && (this.marginRight = 0); a.top && (this.marginTop = 0); a.bottom && (this.marginBottom = 0); this.fixMargins =
            a
        }, measureMargins: function () {
            var a = this.valueAxes, b, c = this.autoMarginOffset, d = this.fixMargins, g = this.realWidth, h = this.realHeight, f = c, e = c, k = g; b = h; var m; for (m = 0; m < a.length; m++) a[m].handleSynchronization(), b = this.getAxisBounds(a[m], f, k, e, b), f = Math.round(b.l), k = Math.round(b.r), e = Math.round(b.t), b = Math.round(b.b); if (a = this.categoryAxis) b = this.getAxisBounds(a, f, k, e, b), f = Math.round(b.l), k = Math.round(b.r), e = Math.round(b.t), b = Math.round(b.b); d.left && f < c && (this.marginLeft = Math.round(-f + c), !isNaN(this.minMarginLeft) &&
            this.marginLeft < this.minMarginLeft && (this.marginLeft = this.minMarginLeft)); d.right && k >= g - c && (this.marginRight = Math.round(k - g + c), !isNaN(this.minMarginRight) && this.marginRight < this.minMarginRight && (this.marginRight = this.minMarginRight)); d.top && e < c + this.titleHeight && (this.marginTop = Math.round(this.marginTop - e + c + this.titleHeight), !isNaN(this.minMarginTop) && this.marginTop < this.minMarginTop && (this.marginTop = this.minMarginTop)); d.bottom && b > h - c && (this.marginBottom = Math.round(this.marginBottom + b - h + c), !isNaN(this.minMarginBottom) &&
            this.marginBottom < this.minMarginBottom && (this.marginBottom = this.minMarginBottom)); this.initChart()
        }, getAxisBounds: function (a, b, c, d, g) { if (!a.ignoreAxisWidth) { var h = a.labelsSet, f = a.tickLength; a.inside && (f = 0); if (h) switch (h = a.getBBox(), a.position) { case "top": a = h.y; d > a && (d = a); break; case "bottom": a = h.y + h.height; g < a && (g = a); break; case "right": a = h.x + h.width + f + 3; c < a && (c = a); break; case "left": a = h.x - f, b > a && (b = a) } } return { l: b, t: d, r: c, b: g } }, drawZoomOutButton: function () {
            var a = this; if (!a.zbSet) {
                var b = a.container.set();
                a.zoomButtonSet.push(b); var c = a.color, d = a.fontSize, g = a.zoomOutButtonImageSize, h = a.zoomOutButtonImage.replace(/\.[a-z]*$/i, ""), f = e.lang.zoomOutText || a.zoomOutText, l = a.zoomOutButtonColor, k = a.zoomOutButtonAlpha, m = a.zoomOutButtonFontSize, p = a.zoomOutButtonPadding; isNaN(m) || (d = m); (m = a.zoomOutButtonFontColor) && (c = m); var m = a.zoomOutButton, n; m && (m.fontSize && (d = m.fontSize), m.color && (c = m.color), m.backgroundColor && (l = m.backgroundColor), isNaN(m.backgroundAlpha) || (a.zoomOutButtonRollOverAlpha = m.backgroundAlpha));
                var r = m = 0; void 0 !== a.pathToImages && h && (n = a.container.image(a.pathToImages + h + a.extension, 0, 0, g, g), e.setCN(a, n, "zoom-out-image"), b.push(n), n = n.getBBox(), m = n.width + 5); void 0 !== f && (c = e.text(a.container, f, c, a.fontFamily, d, "start"), e.setCN(a, c, "zoom-out-label"), d = c.getBBox(), r = n ? n.height / 2 - 3 : d.height / 2, c.translate(m, r), b.push(c)); n = b.getBBox(); c = 1; e.isModern || (c = 0); l = e.rect(a.container, n.width + 2 * p + 5, n.height + 2 * p - 2, l, 1, 1, l, c); l.setAttr("opacity", k); l.translate(-p, -p); e.setCN(a, l, "zoom-out-bg"); b.push(l);
                l.toBack(); a.zbBG = l; n = l.getBBox(); b.translate(a.marginLeftReal + a.plotAreaWidth - n.width + p, a.marginTopReal + p); b.hide(); b.mouseover(function () { a.rollOverZB() }).mouseout(function () { a.rollOutZB() }).click(function () { a.clickZB() }).touchstart(function () { a.rollOverZB() }).touchend(function () { a.rollOutZB(); a.clickZB() }); for (k = 0; k < b.length; k++) b[k].attr({ cursor: "pointer" }); void 0 !== a.zoomOutButtonTabIndex && (b.setAttr("tabindex", a.zoomOutButtonTabIndex), b.setAttr("role", "menuitem"), b.keyup(function (b) {
                    13 == b.keyCode &&
                    a.clickZB()
                })); a.zbSet = b
            }
        }, rollOverZB: function () { this.rolledOverZB = !0; this.zbBG.setAttr("opacity", this.zoomOutButtonRollOverAlpha) }, rollOutZB: function () { this.rolledOverZB = !1; this.zbBG.setAttr("opacity", this.zoomOutButtonAlpha) }, clickZB: function () { this.rolledOverZB = !1; this.zoomOut() }, zoomOut: function () { this.zoomOutValueAxes() }, drawPlotArea: function () {
            var a = this.dx, b = this.dy, c = this.marginLeftReal, d = this.marginTopReal, g = this.plotAreaWidth - 1, h = this.plotAreaHeight - 1, f = this.plotAreaFillColors, l = this.plotAreaFillAlphas,
            k = this.plotAreaBorderColor, m = this.plotAreaBorderAlpha; "object" == typeof l && (l = l[0]); f = e.polygon(this.container, [0, g, g, 0, 0], [0, 0, h, h, 0], f, l, 1, k, m, this.plotAreaGradientAngle); e.setCN(this, f, "plot-area"); f.translate(c + a, d + b); this.set.push(f); 0 !== a && 0 !== b && (f = this.plotAreaFillColors, "object" == typeof f && (f = f[0]), f = e.adjustLuminosity(f, -.15), g = e.polygon(this.container, [0, a, g + a, g, 0], [0, b, b, 0, 0], f, l, 1, k, m), e.setCN(this, g, "plot-area-bottom"), g.translate(c, d + h), this.set.push(g), a = e.polygon(this.container, [0,
            0, a, a, 0], [0, h, h + b, b, 0], f, l, 1, k, m), e.setCN(this, a, "plot-area-left"), a.translate(c, d), this.set.push(a)); (c = this.bbset) && this.scrollbarOnly && c.remove()
        }, updatePlotArea: function () {
            var a = this.updateWidth(), b = this.updateHeight(), c = this.container; this.realWidth = a; this.realWidth = b; c && this.container.setSize(a, b); var c = this.marginLeftReal, d = this.marginTopReal, a = a - c - this.marginRightReal - this.dx, b = b - d - this.marginBottomReal; 1 > a && (a = 1); 1 > b && (b = 1); this.plotAreaWidth = Math.round(a); this.plotAreaHeight = Math.round(b);
            this.plotBalloonsSet.translate(c, d)
        }, updateDxy: function () { this.dx = Math.round(this.depth3D * Math.cos(this.angle * Math.PI / 180)); this.dy = Math.round(-this.depth3D * Math.sin(this.angle * Math.PI / 180)); this.d3x = Math.round(this.columnSpacing3D * Math.cos(this.angle * Math.PI / 180)); this.d3y = Math.round(-this.columnSpacing3D * Math.sin(this.angle * Math.PI / 180)) }, updateMargins: function () {
            var a = this.getTitleHeight(); this.titleHeight = a; this.marginTopReal = this.marginTop - this.dy; this.fixMargins && !this.fixMargins.top && (this.marginTopReal +=
            a); this.marginBottomReal = this.marginBottom; this.marginLeftReal = this.marginLeft; this.marginRightReal = this.marginRight
        }, updateValueAxes: function () { var a = this.valueAxes, b; for (b = 0; b < a.length; b++) { var c = a[b]; this.setAxisRenderers(c); this.updateObjectSize(c) } }, setAxisRenderers: function (a) { a.axisRenderer = e.RecAxis; a.guideFillRenderer = e.RecFill; a.axisItemRenderer = e.RecItem; a.marginsChanged = !0 }, updateGraphs: function () { var a = this.graphs, b; for (b = 0; b < a.length; b++) { var c = a[b]; c.index = b; c.rotate = this.rotate; this.updateObjectSize(c) } },
        updateObjectSize: function (a) { a.width = this.plotAreaWidth - 1; a.height = this.plotAreaHeight - 1; a.x = this.marginLeftReal; a.y = this.marginTopReal; a.dx = this.dx; a.dy = this.dy }, updateChartCursor: function () { var a = this.chartCursor; a && (a = e.processObject(a, e.ChartCursor, this.theme), this.updateObjectSize(a), this.addChartCursor(a), a.chart = this) }, processScrollbars: function () { var a = this.chartScrollbar; a && (a = e.processObject(a, e.ChartScrollbar, this.theme), this.addChartScrollbar(a)) }, updateScrollbars: function () { }, removeChartCursor: function () {
            e.callMethod("destroy",
            [this.chartCursor]); this.chartCursor = null
        }, zoomTrendLines: function () { var a = this.trendLines, b; for (b = 0; b < a.length; b++) { var c = a[b]; c.valueAxis.recalculateToPercents ? c.set && c.set.hide() : (c.x = this.marginLeftReal, c.y = this.marginTopReal, c.draw()) } }, handleCursorValueZoom: function () { }, addTrendLine: function (a) { this.trendLines.push(a) }, zoomOutValueAxes: function () { for (var a = this.valueAxes, b = 0; b < a.length; b++) a[b].zoomOut() }, removeTrendLine: function (a) {
            var b = this.trendLines, c; for (c = b.length - 1; 0 <= c; c--) b[c] == a &&
            b.splice(c, 1)
        }, adjustMargins: function (a, b) { var c = a.position, d = a.scrollbarHeight + a.offset; a.enabled && ("top" == c ? b ? this.marginLeftReal += d : this.marginTopReal += d : b ? this.marginRightReal += d : this.marginBottomReal += d) }, getScrollbarPosition: function (a, b, c) { var d = "bottom", g = "top"; a.oppositeAxis || (g = d, d = "top"); a.position = b ? "bottom" == c || "left" == c ? d : g : "top" == c || "right" == c ? d : g }, updateChartScrollbar: function (a, b) {
            if (a) {
                a.rotate = b; var c = this.marginTopReal, d = this.marginLeftReal, g = a.scrollbarHeight, h = this.dx, f = this.dy,
                e = a.offset; "top" == a.position ? b ? (a.y = c, a.x = d - g - e) : (a.y = c - g + f - e, a.x = d + h) : b ? (a.y = c + f, a.x = d + this.plotAreaWidth + h + e) : (a.y = c + this.plotAreaHeight + e, a.x = this.marginLeftReal)
            }
        }, showZB: function (a) { var b = this.zbSet; a && (b = this.zoomOutText, "" !== b && b && this.drawZoomOutButton()); if (b = this.zbSet) this.zoomButtonSet.push(b), a ? b.show() : b.hide(), this.rollOutZB() }, handleReleaseOutside: function (a) { e.AmRectangularChart.base.handleReleaseOutside.call(this, a); (a = this.chartCursor) && a.handleReleaseOutside && a.handleReleaseOutside() },
        handleMouseDown: function (a) { e.AmRectangularChart.base.handleMouseDown.call(this, a); var b = this.chartCursor; b && b.handleMouseDown && !this.rolledOverZB && b.handleMouseDown(a) }, update: function () { e.AmRectangularChart.base.update.call(this); this.chartCursor && this.chartCursor.update && this.chartCursor.update() }, handleScrollbarValueZoom: function (a) { this.relativeZoomValueAxes(a.target.valueAxes, a.relativeStart, a.relativeEnd); this.zoomAxesAndGraphs() }, zoomValueScrollbar: function (a) {
            if (a && a.enabled) {
                var b = a.valueAxes[0],
                c = b.relativeStart, d = b.relativeEnd; b.reversed && (d = 1 - c, c = 1 - b.relativeEnd); a.percentZoom(c, d)
            }
        }, zoomAxesAndGraphs: function () { if (!this.scrollbarOnly) { var a = this.valueAxes, b; for (b = 0; b < a.length; b++) a[b].zoom(this.start, this.end); a = this.graphs; for (b = 0; b < a.length; b++) a[b].zoom(this.start, this.end); (b = this.chartCursor) && b.clearSelection(); this.zoomTrendLines() } }, handleValueAxisZoomReal: function (a, b) { var c = a.relativeStart, d = a.relativeEnd; if (c > d) var g = c, c = d, d = g; this.relativeZoomValueAxes(b, c, d); this.updateAfterValueZoom() },
        updateAfterValueZoom: function () { this.zoomAxesAndGraphs(); this.zoomScrollbar() }, relativeZoomValueAxes: function (a, b, c) { b = e.fitToBounds(b, 0, 1); c = e.fitToBounds(c, 0, 1); if (b > c) { var d = b; b = c; c = d } var d = 1 / this.maxZoomFactor, g = e.getDecimals(d) + 4; c - b < d && (c = b + (c - b) / 2, b = c - d / 2, c += d / 2); b = e.roundTo(b, g); c = e.roundTo(c, g); d = !1; if (a) { for (g = 0; g < a.length; g++) { var h = a[g].zoomToRelativeValues(b, c, !0); h && (d = h) } this.showZB() } return d }, addChartCursor: function (a) {
            e.callMethod("destroy", [this.chartCursor]); a && (this.listenTo(a,
            "moved", this.handleCursorMove), this.listenTo(a, "zoomed", this.handleCursorZoom), this.listenTo(a, "zoomStarted", this.handleCursorZoomStarted), this.listenTo(a, "panning", this.handleCursorPanning), this.listenTo(a, "onHideCursor", this.handleCursorHide)); this.chartCursor = a
        }, handleCursorChange: function () { }, handleCursorMove: function (a) { var b, c = this.valueAxes; for (b = 0; b < c.length; b++) a.panning || c[b].showBalloon(a.x, a.y) }, handleCursorZoom: function (a) {
            if (this.skipZoomed) this.skipZoomed = !1; else {
                var b = this.startX0,
                c = this.endX0, d = this.endY0, g = this.startY0, h = a.startX, f = a.endX, e = a.startY, k = a.endY; this.startX0 = this.endX0 = this.startY0 = this.endY0 = NaN; this.handleCursorZoomReal(b + h * (c - b), b + f * (c - b), g + e * (d - g), g + k * (d - g), a)
            }
        }, handleCursorHide: function () { var a, b = this.valueAxes; for (a = 0; a < b.length; a++) b[a].hideBalloon(); b = this.graphs; for (a = 0; a < b.length; a++) b[a].hideBalloonReal() }
    })
})(); (function () {
    var e = window.AmCharts; e.AmSerialChart = e.Class({
        inherits: e.AmRectangularChart, construct: function (a) { this.type = "serial"; e.AmSerialChart.base.construct.call(this, a); this.cname = "AmSerialChart"; this.theme = a; this.columnSpacing = 5; this.columnSpacing3D = 0; this.columnWidth = .8; var b = new e.CategoryAxis(a); b.chart = this; this.categoryAxis = b; this.zoomOutOnDataUpdate = !0; this.mouseWheelZoomEnabled = this.mouseWheelScrollEnabled = this.rotate = this.skipZoom = !1; this.minSelectedTime = 0; e.applyTheme(this, a, this.cname) },
        initChart: function () { e.AmSerialChart.base.initChart.call(this); this.updateCategoryAxis(this.categoryAxis, this.rotate, "categoryAxis"); if (this.dataChanged) this.parseData(); else this.onDataUpdated(); this.drawGraphs = !0 }, onDataUpdated: function () {
            var a = this.countColumns(), b = this.chartData, c = this.graphs, d; for (d = 0; d < c.length; d++) { var g = c[d]; g.data = b; g.columnCount = a } 0 < b.length && (this.firstTime = this.getStartTime(b[0].time), this.lastTime = this.getEndTime(b[b.length - 1].time)); this.drawChart(); this.autoMargins &&
            !this.marginsUpdated ? (this.marginsUpdated = !0, this.measureMargins()) : this.dispDUpd()
        }, syncGrid: function () {
            if (this.synchronizeGrid) {
                var a = this.valueAxes, b, c; if (0 < a.length) {
                    var d = 0; for (c = 0; c < a.length; c++) b = a[c], d < b.gridCountReal && (d = b.gridCountReal); var g = !1; for (c = 0; c < a.length; c++) if (b = a[c], b.gridCountReal < d) { var h = g = (d - b.gridCountReal) / 2, f = g; 0 !== g - Math.round(g) && (h -= .5, f += .5); b.minimum = b.min - h * b.step; b.maximum = b.max + f * b.step; b.setStep = b.step; g = !0 } g && this.updateAfterValueZoom(); for (c = 0; c < a.length; c++) b =
                    a[c], b.minimum = NaN, b.maximum = NaN, b.setStep = NaN
                }
            }
        }, handleWheelReal: function (a, b) {
            if (!this.wheelBusy) {
                var c = this.categoryAxis, d = c.parseDates, g = c.minDuration(), h = 1, f = 1; this.mouseWheelZoomEnabled ? b || (h = -1) : b && (h = -1); var e = this.chartCursor; if (e) { var k = e.mouseX, e = e.mouseY; h != f && (k = this.rotate ? e / this.plotAreaHeight : k / this.plotAreaWidth, h *= k, f *= 1 - k); k = .05 * (this.end - this.start); d && (k = .05 * (this.endTime - this.startTime) / g); 1 > k && (k = 1); h *= k; f *= k; if (!d || c.equalSpacing) h = Math.round(h), f = Math.round(f) } e = this.chartData.length;
                c = this.lastTime; k = this.firstTime; 0 > a ? d ? (e = this.endTime - this.startTime, d = this.startTime + h * g, g = this.endTime + f * g, 0 < f && 0 < h && g >= c && (g = c, d = c - e), this.zoomToDates(new Date(d), new Date(g))) : (0 < f && 0 < h && this.end >= e - 1 && (h = f = 0), d = this.start + h, g = this.end + f, this.zoomToIndexes(d, g)) : d ? (e = this.endTime - this.startTime, d = this.startTime - h * g, g = this.endTime - f * g, 0 < f && 0 < h && d <= k && (d = k, g = k + e), this.zoomToDates(new Date(d), new Date(g))) : (0 < f && 0 < h && 1 > this.start && (h = f = 0), d = this.start - h, g = this.end - f, this.zoomToIndexes(d, g))
            }
        }, validateData: function (a) {
            this.marginsUpdated =
            !1; this.zoomOutOnDataUpdate && !a && (this.endTime = this.end = this.startTime = this.start = NaN); e.AmSerialChart.base.validateData.call(this)
        }, drawChart: function () {
            if (0 < this.realWidth && 0 < this.realHeight) {
                e.AmSerialChart.base.drawChart.call(this); var a = this.chartData; if (e.ifArray(a)) {
                    var b = this.chartScrollbar; !b || !this.marginsUpdated && this.autoMargins || b.draw(); (b = this.valueScrollbar) && b.draw(); var a = a.length - 1, c, b = this.categoryAxis; if (b.parseDates && !b.equalSpacing) {
                        if (b = this.startTime, c = this.endTime, isNaN(b) ||
                        isNaN(c)) b = this.firstTime, c = this.lastTime
                    } else if (b = this.start, c = this.end, isNaN(b) || isNaN(c)) b = 0, c = a; this.endTime = this.startTime = this.end = this.start = void 0; this.zoom(b, c)
                }
            } else this.cleanChart()
        }, cleanChart: function () { e.callMethod("destroy", [this.valueAxes, this.graphs, this.categoryAxis, this.chartScrollbar, this.chartCursor, this.valueScrollbar]) }, updateCategoryAxis: function (a, b, c) { a.chart = this; a.id = c; a.rotate = b; a.setOrientation(!this.rotate); a.init(); this.setAxisRenderers(a); this.updateObjectSize(a) },
        updateValueAxes: function () { e.AmSerialChart.base.updateValueAxes.call(this); var a = this.valueAxes, b; for (b = 0; b < a.length; b++) { var c = a[b], d = this.rotate; c.rotate = d; c.setOrientation(d); d = this.categoryAxis; if (!d.startOnAxis || d.parseDates) c.expandMinMax = !0 } }, getStartTime: function (a) { var b = this.categoryAxis; return e.resetDateToMin(new Date(a), b.minPeriod, 1, b.firstDayOfWeek).getTime() }, getEndTime: function (a) {
            var b = e.extractPeriod(this.categoryAxis.minPeriod); return e.changeDate(new Date(a), b.period, b.count,
            !0).getTime() - 1
        }, updateMargins: function () { e.AmSerialChart.base.updateMargins.call(this); var a = this.chartScrollbar; a && (this.getScrollbarPosition(a, this.rotate, this.categoryAxis.position), this.adjustMargins(a, this.rotate)); if (a = this.valueScrollbar) this.getScrollbarPosition(a, !this.rotate, this.valueAxes[0].position), this.adjustMargins(a, !this.rotate) }, updateScrollbars: function () {
            e.AmSerialChart.base.updateScrollbars.call(this); this.updateChartScrollbar(this.chartScrollbar, this.rotate); this.updateChartScrollbar(this.valueScrollbar,
            !this.rotate)
        }, zoom: function (a, b) { var c = this.categoryAxis; c.parseDates && !c.equalSpacing ? this.timeZoom(a, b) : this.indexZoom(a, b); isNaN(a) && this.zoomOutValueAxes(); (c = this.chartCursor) && (c.pan || c.hideCursorReal()); this.updateLegendValues() }, timeZoom: function (a, b) {
            var c = this.maxSelectedTime; isNaN(c) || (b != this.endTime && b - a > c && (a = b - c), a != this.startTime && b - a > c && (b = a + c)); var d = this.minSelectedTime; if (0 < d && b - a < d) { var g = Math.round(a + (b - a) / 2), d = Math.round(d / 2); a = g - d; b = g + d } d = this.chartData; g = this.categoryAxis;
            if (e.ifArray(d) && (a != this.startTime || b != this.endTime)) {
                var h = g.minDuration(), f = this.firstTime, l = this.lastTime; a || (a = f, isNaN(c) || (a = l - c)); b || (b = l); a > l && (a = l); b < f && (b = f); a < f && (a = f); b > l && (b = l); b < a && (b = a + h); b - a < h / 5 && (b < l ? b = a + h / 5 : a = b - h / 5); this.startTime = a; this.endTime = b; c = d.length - 1; h = this.getClosestIndex(d, "time", a, !0, 0, c); d = this.getClosestIndex(d, "time", b, !1, h, c); g.timeZoom(a, b); g.zoom(h, d); this.start = e.fitToBounds(h, 0, c); this.end = e.fitToBounds(d, 0, c); this.zoomAxesAndGraphs(); this.zoomScrollbar(); this.fixCursor();
                this.showZB(); this.syncGrid(); this.updateColumnsDepth(); this.dispatchTimeZoomEvent()
            }
        }, showZB: function () { var a, b = this.categoryAxis; b && b.parseDates && !b.equalSpacing && (this.startTime > this.firstTime && (a = !0), this.endTime < this.lastTime && (a = !0)); 0 < this.start && (a = !0); this.end < this.chartData.length - 1 && (a = !0); if (b = this.valueAxes) b = b[0], 0 !== b.relativeStart && (a = !0), 1 != b.relativeEnd && (a = !0); e.AmSerialChart.base.showZB.call(this, a) }, updateAfterValueZoom: function () {
            e.AmSerialChart.base.updateAfterValueZoom.call(this);
            this.updateColumnsDepth()
        }, indexZoom: function (a, b) {
            var c = this.maxSelectedSeries; isNaN(c) || (b != this.end && b - a > c && (a = b - c), a != this.start && b - a > c && (b = a + c)); if (a != this.start || b != this.end) {
                var d = this.chartData.length - 1; isNaN(a) && (a = 0, isNaN(c) || (a = d - c)); isNaN(b) && (b = d); b < a && (b = a); b > d && (b = d); a > d && (a = d - 1); 0 > a && (a = 0); this.start = a; this.end = b; this.categoryAxis.zoom(a, b); this.zoomAxesAndGraphs(); this.zoomScrollbar(); this.fixCursor(); 0 !== a || b != this.chartData.length - 1 ? this.showZB(!0) : this.showZB(!1); this.syncGrid();
                this.updateColumnsDepth(); this.dispatchIndexZoomEvent()
            }
        }, updateGraphs: function () { e.AmSerialChart.base.updateGraphs.call(this); var a = this.graphs, b; for (b = 0; b < a.length; b++) { var c = a[b]; c.columnWidthReal = this.columnWidth; c.categoryAxis = this.categoryAxis; e.isString(c.fillToGraph) && (c.fillToGraph = this.graphsById[c.fillToGraph]) } }, zoomAxesAndGraphs: function () { e.AmSerialChart.base.zoomAxesAndGraphs.call(this); this.updateColumnsDepth() }, updateColumnsDepth: function () {
            if (0 !== this.depth3D || 0 !== this.angle) {
                var a,
                b = this.graphs, c; this.columnsArray = []; for (a = 0; a < b.length; a++) { c = b[a]; var d = c.columnsArray; if (d) { var g; for (g = 0; g < d.length; g++) this.columnsArray.push(d[g]) } } this.columnsArray.sort(this.compareDepth); if (0 < this.columnsArray.length) { b = this.columnsSet; d = this.container.set(); this.columnSet.push(d); for (a = 0; a < this.columnsArray.length; a++) d.push(this.columnsArray[a].column.set); c && d.translate(c.x, c.y); this.columnsSet = d; e.remove(b) }
            }
        }, compareDepth: function (a, b) { return a.depth > b.depth ? 1 : -1 }, zoomScrollbar: function () {
            var a =
            this.chartScrollbar, b = this.categoryAxis; if (a) { if (!this.zoomedByScrollbar) { var c = a.dragger; c && c.stop() } this.zoomedByScrollbar = !1; b.parseDates && !b.equalSpacing ? a.timeZoom(this.startTime, this.endTime) : a.zoom(this.start, this.end) } this.zoomValueScrollbar(this.valueScrollbar)
        }, updateTrendLines: function () {
            var a = this.trendLines, b; for (b = 0; b < a.length; b++) {
                var c = a[b], c = e.processObject(c, e.TrendLine, this.theme); a[b] = c; c.chart = this; c.id || (c.id = "trendLineAuto" + b + "_" + (new Date).getTime()); e.isString(c.valueAxis) &&
                (c.valueAxis = this.getValueAxisById(c.valueAxis)); c.valueAxis || (c.valueAxis = this.valueAxes[0]); c.categoryAxis = this.categoryAxis
            }
        }, countColumns: function () {
            var a = 0, b = this.valueAxes.length, c = this.graphs.length, d, g, e = !1, f, l; for (l = 0; l < b; l++) {
                g = this.valueAxes[l]; var k = g.stackType; if ("100%" == k || "regular" == k) for (e = !1, f = 0; f < c; f++) d = this.graphs[f], d.tcc = 1, d.valueAxis == g && "column" == d.type && (!e && d.stackable && (a++, e = !0), (!d.stackable && d.clustered || d.newStack) && a++, d.columnIndex = a - 1, d.clustered || (d.columnIndex =
                0)); if ("none" == k || "3d" == k) { e = !1; for (f = 0; f < c; f++) d = this.graphs[f], d.valueAxis == g && "column" == d.type && (d.clustered ? (d.tcc = 1, d.newStack && (a = 0), d.hidden || (d.columnIndex = a, a++)) : d.hidden || (e = !0, d.tcc = 1, d.columnIndex = 0)); e && 0 === a && (a = 1) } if ("3d" == k) { g = 1; for (l = 0; l < c; l++) d = this.graphs[l], d.newStack && g++, d.depthCount = g, d.tcc = a; a = g }
            } return a
        }, parseData: function () { e.AmSerialChart.base.parseData.call(this); this.parseSerialData(this.dataProvider) }, getCategoryIndexByValue: function (a) {
            var b = this.chartData, c; for (c =
            0; c < b.length; c++) if (b[c].category == a) return c
        }, handleScrollbarZoom: function (a) { this.zoomedByScrollbar = !0; this.zoom(a.start, a.end) }, dispatchTimeZoomEvent: function () {
            if (this.drawGraphs && (this.prevStartTime != this.startTime || this.prevEndTime != this.endTime)) {
                var a = { type: "zoomed" }; a.startDate = new Date(this.startTime); a.endDate = new Date(this.endTime); a.startIndex = this.start; a.endIndex = this.end; this.startIndex = this.start; this.endIndex = this.end; this.startDate = a.startDate; this.endDate = a.endDate; this.prevStartTime =
                this.startTime; this.prevEndTime = this.endTime; var b = this.categoryAxis, c = e.extractPeriod(b.minPeriod).period, b = b.dateFormatsObject[c]; a.startValue = e.formatDate(a.startDate, b, this); a.endValue = e.formatDate(a.endDate, b, this); a.chart = this; a.target = this; this.fire(a)
            }
        }, dispatchIndexZoomEvent: function () {
            if (this.drawGraphs && (this.prevStartIndex != this.start || this.prevEndIndex != this.end)) {
                this.startIndex = this.start; this.endIndex = this.end; var a = this.chartData; if (e.ifArray(a) && !isNaN(this.start) && !isNaN(this.end)) {
                    var b =
                    { chart: this, target: this, type: "zoomed" }; b.startIndex = this.start; b.endIndex = this.end; b.startValue = a[this.start].category; b.endValue = a[this.end].category; this.categoryAxis.parseDates && (this.startTime = a[this.start].time, this.endTime = a[this.end].time, b.startDate = new Date(this.startTime), b.endDate = new Date(this.endTime)); this.prevStartIndex = this.start; this.prevEndIndex = this.end; this.fire(b)
                }
            }
        }, updateLegendValues: function () { this.legend && this.legend.updateValues() }, getClosestIndex: function (a, b, c, d, g, e) {
            0 >
            g && (g = 0); e > a.length - 1 && (e = a.length - 1); var f = g + Math.round((e - g) / 2), l = a[f][b]; return c == l ? f : 1 >= e - g ? d ? g : Math.abs(a[g][b] - c) < Math.abs(a[e][b] - c) ? g : e : c == l ? f : c < l ? this.getClosestIndex(a, b, c, d, g, f) : this.getClosestIndex(a, b, c, d, f, e)
        }, zoomToIndexes: function (a, b) { var c = this.chartData; if (c) { var d = c.length; 0 < d && (0 > a && (a = 0), b > d - 1 && (b = d - 1), d = this.categoryAxis, d.parseDates && !d.equalSpacing ? this.zoom(c[a].time, this.getEndTime(c[b].time)) : this.zoom(a, b)) } }, zoomToDates: function (a, b) {
            var c = this.chartData; if (c) if (this.categoryAxis.equalSpacing) {
                var d =
                this.getClosestIndex(c, "time", a.getTime(), !0, 0, c.length); b = e.resetDateToMin(b, this.categoryAxis.minPeriod, 1); c = this.getClosestIndex(c, "time", b.getTime(), !1, 0, c.length); this.zoom(d, c)
            } else this.zoom(a.getTime(), b.getTime())
        }, zoomToCategoryValues: function (a, b) { this.chartData && this.zoom(this.getCategoryIndexByValue(a), this.getCategoryIndexByValue(b)) }, formatPeriodString: function (a, b) {
            if (b) {
                var c = ["value", "open", "low", "high", "close"], d = "value open low high close average sum count".split(" "), g = b.valueAxis,
                h = this.chartData, f = b.numberFormatter; f || (f = this.nf); for (var l = 0; l < c.length; l++) {
                    for (var k = c[l], m = 0, p = 0, n, r, w, y, u, q = 0, E = 0, v, t, x, B, A, G = this.start; G <= this.end; G++) {
                        var D = h[G]; if (D) {
                            var C = D.axes[g.id].graphs[b.id]; if (C) {
                                if (C.values) {
                                    var z = C.values[k], D = D.x.categoryAxis; if (this.rotate) { if (0 > D || D > C.graph.height) z = NaN } else if (0 > D || D > C.graph.width) z = NaN; if (!isNaN(z)) {
                                        isNaN(n) && (n = z); r = z; if (isNaN(w) || w > z) w = z; if (isNaN(y) || y < z) y = z; u = e.getDecimals(m); D = e.getDecimals(z); m += z; m = e.roundTo(m, Math.max(u, D)); p++; u =
                                        m / p
                                    }
                                } if (C.percents && (C = C.percents[k], !isNaN(C))) { isNaN(v) && (v = C); t = C; if (isNaN(x) || x > C) x = C; if (isNaN(B) || B < C) B = C; A = e.getDecimals(q); z = e.getDecimals(C); q += C; q = e.roundTo(q, Math.max(A, z)); E++; A = q / E }
                            }
                        }
                    } q = { open: v, close: t, high: B, low: x, average: A, sum: q, count: E }; a = e.formatValue(a, { open: n, close: r, high: y, low: w, average: u, sum: m, count: p }, d, f, k + "\\.", this.usePrefixes, this.prefixesOfSmallNumbers, this.prefixesOfBigNumbers); a = e.formatValue(a, q, d, this.pf, "percents\\." + k + "\\.")
                }
            } return a = e.cleanFromEmpty(a)
        }, formatString: function (a,
        b, c) {
            if (b) {
                var d = b.graph; if (void 0 !== a) {
                    if (-1 != a.indexOf("[[category]]")) { var g = b.serialDataItem.category; if (this.categoryAxis.parseDates) { var h = this.balloonDateFormat, f = this.chartCursor; f && f.categoryBalloonDateFormat && (h = f.categoryBalloonDateFormat); h = e.formatDate(g, h, this); -1 != h.indexOf("fff") && (h = e.formatMilliseconds(h, g)); g = h } a = a.replace(/\[\[category\]\]/g, String(g)) } g = d.numberFormatter; g || (g = this.nf); h = b.graph.valueAxis; (f = h.duration) && !isNaN(b.values.value) && (f = e.formatDuration(b.values.value,
                    f, "", h.durationUnits, h.maxInterval, g), a = a.replace(RegExp("\\[\\[value\\]\\]", "g"), f)); "date" == h.type && (h = e.formatDate(new Date(b.values.value), d.dateFormat, this), f = RegExp("\\[\\[value\\]\\]", "g"), a = a.replace(f, h), h = e.formatDate(new Date(b.values.open), d.dateFormat, this), f = RegExp("\\[\\[open\\]\\]", "g"), a = a.replace(f, h)); d = "value open low high close total".split(" "); h = this.pf; a = e.formatValue(a, b.percents, d, h, "percents\\."); a = e.formatValue(a, b.values, d, g, "", this.usePrefixes, this.prefixesOfSmallNumbers,
                    this.prefixesOfBigNumbers); a = e.formatValue(a, b.values, ["percents"], h); -1 != a.indexOf("[[") && (a = e.formatDataContextValue(a, b.dataContext)); -1 != a.indexOf("[[") && b.graph.customData && (a = e.formatDataContextValue(a, b.graph.customData)); a = e.AmSerialChart.base.formatString.call(this, a, b, c)
                } return a
            }
        }, updateChartCursor: function () {
            e.AmSerialChart.base.updateChartCursor.call(this); var a = this.chartCursor, b = this.categoryAxis; if (a) {
                var c = a.categoryBalloonAlpha, d = a.categoryBalloonColor, g = a.color; void 0 === d && (d = a.cursorColor);
                var h = a.valueZoomable, f = a.zoomable, l = a.valueLineEnabled; this.rotate ? (a.vLineEnabled = l, a.hZoomEnabled = h, a.vZoomEnabled = f) : (a.hLineEnabled = l, a.vZoomEnabled = h, a.hZoomEnabled = f); if (a.valueLineBalloonEnabled) for (l = 0; l < this.valueAxes.length; l++) h = this.valueAxes[l], (f = h.balloon) || (f = {}), f = e.extend(f, this.balloon, !0), f.fillColor = d, f.balloonColor = d, f.fillAlpha = c, f.borderColor = d, f.color = g, h.balloon = f; else for (f = 0; f < this.valueAxes.length; f++) h = this.valueAxes[f], h.balloon && (h.balloon = null); b && (b.balloonTextFunction =
                a.categoryBalloonFunction, a.categoryLineAxis = b, b.balloonText = a.categoryBalloonText, a.categoryBalloonEnabled && ((f = b.balloon) || (f = {}), f = e.extend(f, this.balloon, !0), f.fillColor = d, f.balloonColor = d, f.fillAlpha = c, f.borderColor = d, f.color = g, b.balloon = f), b.balloon && (b.balloon.enabled = a.categoryBalloonEnabled))
            }
        }, addChartScrollbar: function (a) {
            e.callMethod("destroy", [this.chartScrollbar]); a && (a.chart = this, this.listenTo(a, "zoomed", this.handleScrollbarZoom)); this.rotate ? void 0 === a.width && (a.width = a.scrollbarHeight) :
            void 0 === a.height && (a.height = a.scrollbarHeight); a.gridAxis = this.categoryAxis; this.chartScrollbar = a
        }, addValueScrollbar: function (a) { e.callMethod("destroy", [this.valueScrollbar]); a && (a.chart = this, this.listenTo(a, "zoomed", this.handleScrollbarValueZoom), this.listenTo(a, "zoomStarted", this.handleCursorZoomStarted)); var b = a.scrollbarHeight; this.rotate ? void 0 === a.height && (a.height = b) : void 0 === a.width && (a.width = b); a.gridAxis || (a.gridAxis = this.valueAxes[0]); a.valueAxes = this.valueAxes; this.valueScrollbar = a },
        removeChartScrollbar: function () { e.callMethod("destroy", [this.chartScrollbar]); this.chartScrollbar = null }, removeValueScrollbar: function () { e.callMethod("destroy", [this.valueScrollbar]); this.valueScrollbar = null }, handleReleaseOutside: function (a) { e.AmSerialChart.base.handleReleaseOutside.call(this, a); e.callMethod("handleReleaseOutside", [this.chartScrollbar, this.valueScrollbar]) }, update: function () {
            e.AmSerialChart.base.update.call(this); this.chartScrollbar && this.chartScrollbar.update && this.chartScrollbar.update();
            this.valueScrollbar && this.valueScrollbar.update && this.valueScrollbar.update()
        }, processScrollbars: function () { e.AmSerialChart.base.processScrollbars.call(this); var a = this.valueScrollbar; a && (a = e.processObject(a, e.ChartScrollbar, this.theme), a.id = "valueScrollbar", this.addValueScrollbar(a)) }, handleValueAxisZoom: function (a) { this.handleValueAxisZoomReal(a, this.valueAxes) }, zoomOut: function () { e.AmSerialChart.base.zoomOut.call(this); this.zoom(); this.syncGrid() }, getNextItem: function (a) {
            var b = a.index, c = this.chartData,
            d = a.graph; if (b + 1 < c.length) for (b += 1; b < c.length; b++) if (a = c[b]) if (a = a.axes[d.valueAxis.id].graphs[d.id], !isNaN(a.y)) return a
        }, handleCursorZoomReal: function (a, b, c, d, e) {
            var h = e.target, f, l; this.rotate ? (isNaN(a) || isNaN(b) || this.relativeZoomValueAxes(this.valueAxes, a, b) && this.updateAfterValueZoom(), h.vZoomEnabled && (f = e.start, l = e.end)) : (isNaN(c) || isNaN(d) || this.relativeZoomValueAxes(this.valueAxes, c, d) && this.updateAfterValueZoom(), h.hZoomEnabled && (f = e.start, l = e.end)); isNaN(f) || isNaN(l) || (a = this.categoryAxis,
            a.parseDates && !a.equalSpacing ? this.zoomToDates(new Date(f), new Date(l)) : this.zoomToIndexes(f, l))
        }, handleCursorZoomStarted: function () { var a = this.valueAxes; if (a) { var a = a[0], b = a.relativeStart, c = a.relativeEnd; a.reversed && (b = 1 - a.relativeEnd, c = 1 - a.relativeStart); this.rotate ? (this.startX0 = b, this.endX0 = c) : (this.startY0 = b, this.endY0 = c) } this.categoryAxis && (this.start0 = this.start, this.end0 = this.end, this.startTime0 = this.startTime, this.endTime0 = this.endTime) }, fixCursor: function () {
            this.chartCursor && this.chartCursor.fixPosition();
            this.prevCursorItem = null
        }, handleCursorMove: function (a) {
            e.AmSerialChart.base.handleCursorMove.call(this, a); var b = a.target, c = this.categoryAxis; if (a.panning) this.handleCursorHide(a); else if (this.chartData && !b.isHidden) {
                var d = this.graphs; if (d) {
                    var g; g = c.xToIndex(this.rotate ? a.y : a.x); if (g = this.chartData[g]) {
                        var h, f, l, k; if (b.oneBalloonOnly && b.valueBalloonsEnabled) {
                            var m = Infinity; for (h = 0; h < d.length; h++) if (f = d[h], f.balloon.enabled && f.showBalloon && !f.hidden) {
                                l = f.valueAxis.id; l = g.axes[l].graphs[f.id]; l = l.y;
                                "top" == f.showBalloonAt && (l = 0); "bottom" == f.showBalloonAt && (l = this.height); var p = b.mouseX, n = b.mouseY; l = this.rotate ? Math.abs(p - l) : Math.abs(n - l); l < m && (m = l, k = f)
                            } b.mostCloseGraph = k
                        } if (this.prevCursorItem != g || k != this.prevMostCloseGraph) {
                            m = []; for (h = 0; h < d.length; h++) f = d[h], l = f.valueAxis.id, l = g.axes[l].graphs[f.id], b.showNextAvailable && isNaN(l.y) && (l = this.getNextItem(l)), k && f != k ? (f.showGraphBalloon(l, b.pointer, !1, b.graphBulletSize, b.graphBulletAlpha), f.balloon.hide(0)) : b.valueBalloonsEnabled ? (f.balloon.showBullet =
                            b.bulletsEnabled, f.balloon.bulletSize = b.bulletSize / 2, a.hideBalloons || (f.showGraphBalloon(l, b.pointer, !1, b.graphBulletSize, b.graphBulletAlpha), f.balloon.set && m.push({ balloon: f.balloon, y: f.balloon.pointToY }))) : (f.currentDataItem = l, f.resizeBullet(l, b.graphBulletSize, b.graphBulletAlpha)); b.avoidBalloonOverlapping && this.arrangeBalloons(m); this.prevCursorItem = g
                        } this.prevMostCloseGraph = k
                    }
                } c.showBalloon(a.x, a.y, b.categoryBalloonDateFormat, a.skip); this.updateLegendValues()
            }
        }, handleCursorHide: function (a) {
            e.AmSerialChart.base.handleCursorHide.call(this,
            a); a = this.categoryAxis; this.prevCursorItem = null; this.updateLegendValues(); a && a.hideBalloon(); a = this.graphs; var b; for (b = 0; b < a.length; b++) a[b].currentDataItem = null
        }, handleCursorPanning: function (a) {
            var b = a.target, c, d = a.deltaX, g = a.deltaY, h = a.delta2X, f = a.delta2Y; a = !1; if (this.rotate) { isNaN(h) && (h = d, a = !0); var l = this.endX0; c = this.startX0; var k = l - c, l = l - k * h, m = k; a || (m = 0); a = e.fitToBounds(c - k * d, 0, 1 - m) } else isNaN(f) && (f = g, a = !0), l = this.endY0, c = this.startY0, k = l - c, l += k * g, m = k, a || (m = 0), a = e.fitToBounds(c + k * f, 0, 1 - m);
            c = e.fitToBounds(l, m, 1); var p; b.valueZoomable && (p = this.relativeZoomValueAxes(this.valueAxes, a, c)); var n; c = this.categoryAxis; this.rotate && (d = g, h = f); a = !1; isNaN(h) && (h = d, a = !0); if (b.zoomable && (0 < Math.abs(d) || 0 < Math.abs(h))) if (c.parseDates && !c.equalSpacing) {
                if (f = this.startTime0, g = this.endTime0, c = g - f, h *= c, k = this.firstTime, l = this.lastTime, m = c, a || (m = 0), a = Math.round(e.fitToBounds(f - c * d, k, l - m)), h = Math.round(e.fitToBounds(g - h, k + m, l)), this.startTime != a || this.endTime != h) n = {
                    chart: this, target: b, type: "zoomed", start: a,
                    end: h
                }, this.skipZoomed = !0, b.fire(n), this.zoom(a, h), n = !0
            } else if (f = this.start0, g = this.end0, c = g - f, d = Math.round(c * d), h = Math.round(c * h), k = this.chartData.length - 1, a || (c = 0), a = e.fitToBounds(f - d, 0, k - c), c = e.fitToBounds(g - h, c, k), this.start != a || this.end != c) this.skipZoomed = !0, b.fire({ chart: this, target: b, type: "zoomed", start: a, end: c }), this.zoom(a, c), n = !0; !n && p && this.updateAfterValueZoom()
        }, arrangeBalloons: function (a) {
            var b = this.plotAreaHeight; a.sort(this.compareY); var c, d, e, h = this.plotAreaWidth, f = a.length; for (c =
            0; c < f; c++) d = a[c].balloon, d.setBounds(0, 0, h, b), d.restorePrevious(), d.draw(), b = d.yPos - 3; a.reverse(); for (c = 0; c < f; c++) { d = a[c].balloon; var b = d.bottom, l = d.bottom - d.yPos; 0 < c && b - l < e + 3 && (d.setBounds(0, e + 3, h, e + l + 3), d.restorePrevious(), d.draw()); d.set && d.set.show(); e = d.bottom }
        }, compareY: function (a, b) { return a.y < b.y ? 1 : -1 }
    })
})(); (function () {
    var e = window.AmCharts; e.Cuboid = e.Class({
        construct: function (a, b, c, d, e, h, f, l, k, m, p, n, r, w, y, u, q) { this.set = a.set(); this.container = a; this.h = Math.round(c); this.w = Math.round(b); this.dx = d; this.dy = e; this.colors = h; this.alpha = f; this.bwidth = l; this.bcolor = k; this.balpha = m; this.dashLength = w; this.topRadius = u; this.pattern = y; this.rotate = r; this.bcn = q; r ? 0 > b && 0 === p && (p = 180) : 0 > c && 270 == p && (p = 90); this.gradientRotation = p; 0 === d && 0 === e && (this.cornerRadius = n); this.draw() }, draw: function () {
            var a = this.set; a.clear();
            var b = this.container, c = b.chart, d = this.w, g = this.h, h = this.dx, f = this.dy, l = this.colors, k = this.alpha, m = this.bwidth, p = this.bcolor, n = this.balpha, r = this.gradientRotation, w = this.cornerRadius, y = this.dashLength, u = this.pattern, q = this.topRadius, E = this.bcn, v = l, t = l; "object" == typeof l && (v = l[0], t = l[l.length - 1]); var x, B, A, G, D, C, z, L, M, Q = k; u && (k = 0); var F, H, I, J, K = this.rotate; if (0 < Math.abs(h) || 0 < Math.abs(f)) if (isNaN(q)) z = t, t = e.adjustLuminosity(v, -.2), t = e.adjustLuminosity(v, -.2), x = e.polygon(b, [0, h, d + h, d, 0], [0, f, f, 0, 0],
            t, k, 1, p, 0, r), 0 < n && (M = e.line(b, [0, h, d + h], [0, f, f], p, n, m, y)), B = e.polygon(b, [0, 0, d, d, 0], [0, g, g, 0, 0], t, k, 1, p, 0, r), B.translate(h, f), 0 < n && (A = e.line(b, [h, h], [f, f + g], p, n, m, y)), G = e.polygon(b, [0, 0, h, h, 0], [0, g, g + f, f, 0], t, k, 1, p, 0, r), D = e.polygon(b, [d, d, d + h, d + h, d], [0, g, g + f, f, 0], t, k, 1, p, 0, r), 0 < n && (C = e.line(b, [d, d + h, d + h, d], [0, f, g + f, g], p, n, m, y)), t = e.adjustLuminosity(z, .2), z = e.polygon(b, [0, h, d + h, d, 0], [g, g + f, g + f, g, g], t, k, 1, p, 0, r), 0 < n && (L = e.line(b, [0, h, d + h], [g, g + f, g + f], p, n, m, y)); else {
                var N, O, P; K ? (N = g / 2, t = h / 2, P = g / 2, O =
                d + h / 2, H = Math.abs(g / 2), F = Math.abs(h / 2)) : (t = d / 2, N = f / 2, O = d / 2, P = g + f / 2 + 1, F = Math.abs(d / 2), H = Math.abs(f / 2)); I = F * q; J = H * q; .1 < F && .1 < F && (x = e.circle(b, F, v, k, m, p, n, !1, H), x.translate(t, N)); .1 < I && .1 < I && (z = e.circle(b, I, e.adjustLuminosity(v, .5), k, m, p, n, !1, J), z.translate(O, P))
            } k = Q; 1 > Math.abs(g) && (g = 0); 1 > Math.abs(d) && (d = 0); !isNaN(q) && (0 < Math.abs(h) || 0 < Math.abs(f)) ? (l = [v], l = { fill: l, stroke: p, "stroke-width": m, "stroke-opacity": n, "fill-opacity": k }, K ? (k = "M0,0 L" + d + "," + (g / 2 - g / 2 * q), m = " B", 0 < d && (m = " A"), e.VML ? (k += m + Math.round(d -
            I) + "," + Math.round(g / 2 - J) + "," + Math.round(d + I) + "," + Math.round(g / 2 + J) + "," + d + ",0," + d + "," + g, k = k + (" L0," + g) + (m + Math.round(-F) + "," + Math.round(g / 2 - H) + "," + Math.round(F) + "," + Math.round(g / 2 + H) + ",0," + g + ",0,0")) : (k += "A" + I + "," + J + ",0,0,0," + d + "," + (g - g / 2 * (1 - q)) + "L0," + g, k += "A" + F + "," + H + ",0,0,1,0,0"), F = 90) : (m = d / 2 - d / 2 * q, k = "M0,0 L" + m + "," + g, e.VML ? (k = "M0,0 L" + m + "," + g, m = " B", 0 > g && (m = " A"), k += m + Math.round(d / 2 - I) + "," + Math.round(g - J) + "," + Math.round(d / 2 + I) + "," + Math.round(g + J) + ",0," + g + "," + d + "," + g, k += " L" + d + ",0", k += m + Math.round(d /
            2 + F) + "," + Math.round(H) + "," + Math.round(d / 2 - F) + "," + Math.round(-H) + "," + d + ",0,0,0") : (k += "A" + I + "," + J + ",0,0,0," + (d - d / 2 * (1 - q)) + "," + g + "L" + d + ",0", k += "A" + F + "," + H + ",0,0,1,0,0"), F = 180), b = b.path(k).attr(l), b.gradient("linearGradient", [v, e.adjustLuminosity(v, -.3), e.adjustLuminosity(v, -.3), v], F), K ? b.translate(h / 2, 0) : b.translate(0, f / 2)) : b = 0 === g ? e.line(b, [0, d], [0, 0], p, n, m, y) : 0 === d ? e.line(b, [0, 0], [0, g], p, n, m, y) : 0 < w ? e.rect(b, d, g, l, k, m, p, n, w, r, y) : e.polygon(b, [0, 0, d, d, 0], [0, g, g, 0, 0], l, k, m, p, n, r, !1, y); d = isNaN(q) ? 0 > g ? [x,
            M, B, A, G, D, C, z, L, b] : [z, L, B, A, G, D, x, M, C, b] : K ? 0 < d ? [x, b, z] : [z, b, x] : 0 > g ? [x, b, z] : [z, b, x]; e.setCN(c, b, E + "front"); e.setCN(c, B, E + "back"); e.setCN(c, z, E + "top"); e.setCN(c, x, E + "bottom"); e.setCN(c, G, E + "left"); e.setCN(c, D, E + "right"); for (x = 0; x < d.length; x++) if (B = d[x]) a.push(B), e.setCN(c, B, E + "element"); u && b.pattern(u, NaN, c.path)
        }, width: function (a) { isNaN(a) && (a = 0); this.w = Math.round(a); this.draw() }, height: function (a) { isNaN(a) && (a = 0); this.h = Math.round(a); this.draw() }, animateHeight: function (a, b) {
            var c = this; c.animationFinished =
            !1; c.easing = b; c.totalFrames = a * e.updateRate; c.rh = c.h; c.frame = 0; c.height(1); setTimeout(function () { c.updateHeight.call(c) }, 1E3 / e.updateRate)
        }, updateHeight: function () { var a = this; a.frame++; var b = a.totalFrames; a.frame <= b ? (b = a.easing(0, a.frame, 1, a.rh - 1, b), a.height(b), window.requestAnimationFrame ? window.requestAnimationFrame(function () { a.updateHeight.call(a) }) : setTimeout(function () { a.updateHeight.call(a) }, 1E3 / e.updateRate)) : (a.height(a.rh), a.animationFinished = !0) }, animateWidth: function (a, b) {
            var c = this; c.animationFinished =
            !1; c.easing = b; c.totalFrames = a * e.updateRate; c.rw = c.w; c.frame = 0; c.width(1); setTimeout(function () { c.updateWidth.call(c) }, 1E3 / e.updateRate)
        }, updateWidth: function () { var a = this; a.frame++; var b = a.totalFrames; a.frame <= b ? (b = a.easing(0, a.frame, 1, a.rw - 1, b), a.width(b), window.requestAnimationFrame ? window.requestAnimationFrame(function () { a.updateWidth.call(a) }) : setTimeout(function () { a.updateWidth.call(a) }, 1E3 / e.updateRate)) : (a.width(a.rw), a.animationFinished = !0) }
    })
})(); (function () {
    var e = window.AmCharts; e.CategoryAxis = e.Class({
        inherits: e.AxisBase, construct: function (a) { this.cname = "CategoryAxis"; e.CategoryAxis.base.construct.call(this, a); this.minPeriod = "DD"; this.equalSpacing = this.parseDates = !1; this.position = "bottom"; this.startOnAxis = !1; this.gridPosition = "middle"; this.safeDistance = 30; this.stickBalloonToCategory = !1; e.applyTheme(this, a, this.cname) }, draw: function () {
            e.CategoryAxis.base.draw.call(this); this.generateDFObject(); var a = this.chart.chartData; this.data = a; this.labelRotationR =
            this.labelRotation; this.type = null; if (e.ifArray(a)) {
                var b, c = this.chart; "scrollbar" != this.id ? (e.setCN(c, this.set, "category-axis"), e.setCN(c, this.labelsSet, "category-axis"), e.setCN(c, this.axisLine.axisSet, "category-axis")) : this.bcn = this.id + "-"; var d = this.start, g = this.labelFrequency, h = 0, f = this.end - d + 1, l = this.gridCountR, k = this.showFirstLabel, m = this.showLastLabel, p, n = "", n = e.extractPeriod(this.minPeriod), r = e.getPeriodDuration(n.period, n.count), w, y, u, q, E = this.rotate; p = this.firstDayOfWeek; var v = this.boldPeriodBeginning;
                b = e.resetDateToMin(new Date(a[a.length - 1].time + 1.05 * r), this.minPeriod, 1, p).getTime(); this.firstTime = c.firstTime; var t; this.endTime > b && (this.endTime = b); q = this.minorGridEnabled; y = this.gridAlpha; var x = 0, B = 0; if (this.widthField) for (b = this.start; b <= this.end; b++) if (t = this.data[b]) { var A = Number(this.data[b].dataContext[this.widthField]); isNaN(A) || (x += A, t.widthValue = A) } if (this.parseDates && !this.equalSpacing) this.lastTime = a[a.length - 1].time, this.maxTime = e.resetDateToMin(new Date(this.lastTime + 1.05 * r), this.minPeriod,
                1, p).getTime(), this.timeDifference = this.endTime - this.startTime, this.parseDatesDraw(); else if (!this.parseDates) {
                    if (this.cellWidth = this.getStepWidth(f), f < l && (l = f), h += this.start, this.stepWidth = this.getStepWidth(f), 0 < l) for (v = Math.floor(f / l), r = this.chooseMinorFrequency(v), f = h, f / 2 == Math.round(f / 2) && f--, 0 > f && (f = 0), l = 0, this.widthField && (f = this.start), this.end - f + 1 >= this.autoRotateCount && (this.labelRotationR = this.autoRotateAngle), b = f; b <= this.end + 2; b++) {
                        p = !1; 0 <= b && b < this.data.length ? (w = this.data[b], n = w.category,
                        p = w.forceShow) : n = ""; if (q && !isNaN(r)) if (b / r == Math.round(b / r) || p) b / v == Math.round(b / v) || p || (this.gridAlpha = this.minorGridAlpha, n = void 0); else continue; else if (b / v != Math.round(b / v) && !p) continue; f = this.getCoordinate(b - h); u = 0; "start" == this.gridPosition && (f -= this.cellWidth / 2, u = this.cellWidth / 2); p = !0; a = u; "start" == this.tickPosition && (a = 0, p = !1, u = 0); if (b == d && !k || b == this.end && !m) n = void 0; Math.round(l / g) != l / g && (n = void 0); l++; A = this.cellWidth; E && (A = NaN, this.ignoreAxisWidth || !c.autoMargins) && (A = "right" == this.position ?
                        c.marginRight : c.marginLeft, A -= this.tickLength + 10); this.labelFunction && w && (n = this.labelFunction(n, w, this)); n = e.fixBrakes(n); t = !1; this.boldLabels && (t = !0); b > this.end && "start" == this.tickPosition && (n = " "); this.rotate && this.inside && (u -= 2); isNaN(w.widthValue) || (w.percentWidthValue = w.widthValue / x * 100, A = this.rotate ? this.height * w.widthValue / x : this.width * w.widthValue / x, f = B, B += A, u = A / 2); u = new this.axisItemRenderer(this, f, n, p, A, u, void 0, t, a, !1, w.labelColor, w.className); u.serialDataItem = w; this.pushAxisItem(u); this.gridAlpha =
                        y
                    }
                } else if (this.parseDates && this.equalSpacing) {
                    h = this.start; this.startTime = this.data[this.start].time; this.endTime = this.data[this.end].time; this.timeDifference = this.endTime - this.startTime; b = this.choosePeriod(0); g = b.period; w = b.count; b = e.getPeriodDuration(g, w); b < r && (g = n.period, w = n.count, b = r); y = g; "WW" == y && (y = "DD"); this.currentDateFormat = this.dateFormatsObject[y]; this.stepWidth = this.getStepWidth(f); l = Math.ceil(this.timeDifference / b) + 1; n = e.resetDateToMin(new Date(this.startTime - b), g, w, p).getTime(); this.cellWidth =
                    this.getStepWidth(f); f = Math.round(n / b); d = -1; f / 2 == Math.round(f / 2) && (d = -2, n -= b); f = this.start; f / 2 == Math.round(f / 2) && f--; 0 > f && (f = 0); B = this.end + 2; B >= this.data.length && (B = this.data.length); a = !1; a = !k; this.previousPos = -1E3; 20 < this.labelRotationR && (this.safeDistance = 5); A = f; if (this.data[f].time != e.resetDateToMin(new Date(this.data[f].time), g, w, p).getTime()) { t = 0; var G = n; for (b = f; b < B; b++) r = this.data[b].time, this.checkPeriodChange(g, w, r, G) && (t++, 2 <= t && (A = b, b = B), G = r) } q && 1 < w && (r = this.chooseMinorFrequency(w), e.getPeriodDuration(g,
                    r)); if (0 < this.gridCountR) for (b = f; b < B; b++) if (r = this.data[b].time, this.checkPeriodChange(g, w, r, n) && b >= A) {
                        f = this.getCoordinate(b - this.start); q = !1; this.nextPeriod[y] && (q = this.checkPeriodChange(this.nextPeriod[y], 1, r, n, y)) && e.resetDateToMin(new Date(r), this.nextPeriod[y], 1, p).getTime() != r && (q = !1); t = !1; q && this.markPeriodChange ? (q = this.dateFormatsObject[this.nextPeriod[y]], t = !0) : q = this.dateFormatsObject[y]; n = e.formatDate(new Date(r), q, c); if (b == d && !k || b == l && !m) n = " "; a ? a = !1 : (v || (t = !1), f - this.previousPos > this.safeDistance *
                        Math.cos(this.labelRotationR * Math.PI / 180) && (this.labelFunction && (n = this.labelFunction(n, new Date(r), this, g, w, u)), this.boldLabels && (t = !0), u = new this.axisItemRenderer(this, f, n, void 0, void 0, void 0, void 0, t), q = u.graphics(), this.pushAxisItem(u), q = q.getBBox().width, e.isModern || (q -= f), this.previousPos = f + q)); u = n = r
                    }
                } for (b = k = 0; b < this.data.length; b++) if (t = this.data[b]) this.parseDates && !this.equalSpacing ? (m = t.time, d = this.cellWidth, "MM" == this.minPeriod && (d = 864E5 * e.daysInMonth(new Date(m)) * this.stepWidth, t.cellWidth =
                d), m = Math.round((m - this.startTime) * this.stepWidth + d / 2)) : m = this.getCoordinate(b - h), t.x[this.id] = m; if (this.widthField) for (b = this.start; b <= this.end; b++) t = this.data[b], d = t.widthValue, t.percentWidthValue = d / x * 100, this.rotate ? (m = this.height * d / x / 2 + k, k = this.height * d / x + k) : (m = this.width * d / x / 2 + k, k = this.width * d / x + k), t.x[this.id] = m; x = this.guides.length; for (b = 0; b < x; b++) if (k = this.guides[b], p = v = v = q = d = NaN, m = k.above, k.toCategory && (v = c.getCategoryIndexByValue(k.toCategory), isNaN(v) || (d = this.getCoordinate(v - h), k.expand &&
                (d += this.cellWidth / 2), u = new this.axisItemRenderer(this, d, "", !0, NaN, NaN, k), this.pushAxisItem(u, m))), k.category && (p = c.getCategoryIndexByValue(k.category), isNaN(p) || (q = this.getCoordinate(p - h), k.expand && (q -= this.cellWidth / 2), v = (d - q) / 2, u = new this.axisItemRenderer(this, q, k.label, !0, NaN, v, k), this.pushAxisItem(u, m))), p = c.dataDateFormat, k.toDate && (!p || k.toDate instanceof Date || (k.toDate = k.toDate.toString() + " |"), k.toDate = e.getDate(k.toDate, p), this.equalSpacing ? (v = c.getClosestIndex(this.data, "time", k.toDate.getTime(),
                !1, 0, this.data.length - 1), isNaN(v) || (d = this.getCoordinate(v - h))) : d = (k.toDate.getTime() - this.startTime) * this.stepWidth, u = new this.axisItemRenderer(this, d, "", !0, NaN, NaN, k), this.pushAxisItem(u, m)), k.date && (!p || k.date instanceof Date || (k.date = k.date.toString() + " |"), k.date = e.getDate(k.date, p), this.equalSpacing ? (p = c.getClosestIndex(this.data, "time", k.date.getTime(), !1, 0, this.data.length - 1), isNaN(p) || (q = this.getCoordinate(p - h))) : q = (k.date.getTime() - this.startTime) * this.stepWidth, v = (d - q) / 2, p = !0, k.toDate &&
                (p = !1), u = "H" == this.orientation ? new this.axisItemRenderer(this, q, k.label, p, 2 * v, NaN, k) : new this.axisItemRenderer(this, q, k.label, !1, NaN, v, k), this.pushAxisItem(u, m)), 0 < d || 0 < q) { p = !1; if (this.rotate) { if (d < this.height || q < this.height) p = !0 } else if (d < this.width || q < this.width) p = !0; p && (d = new this.guideFillRenderer(this, q, d, k), q = d.graphics(), this.pushAxisItem(d, m), k.graphics = q, q.index = b, k.balloonText && this.addEventListeners(q, k)) } if (c = c.chartCursor) E ? c.fixHeight(this.cellWidth) : (c.fixWidth(this.cellWidth), c.fullWidth &&
                this.balloon && (this.balloon.minWidth = this.cellWidth)); this.previousHeight = D
            } this.axisCreated = !0; this.set.translate(this.x, this.y); this.labelsSet.translate(this.x, this.y); this.labelsSet.show(); this.positionTitle(); (E = this.axisLine.set) && E.toFront(); var D = this.getBBox().height; 2 < D - this.previousHeight && this.autoWrap && !this.parseDates && (this.axisCreated = this.chart.marginsUpdated = !1)
        }, xToIndex: function (a) {
            var b = this.data, c = this.chart, d = c.rotate, g = this.stepWidth, h; if (this.parseDates && !this.equalSpacing) a =
            this.startTime + Math.round(a / g) - this.minDuration() / 2, h = c.getClosestIndex(b, "time", a, !1, this.start, this.end + 1); else if (this.widthField) for (c = Infinity, g = this.start; g <= this.end; g++) { var f = this.data[g]; f && (f = Math.abs(f.x[this.id] - a), f < c && (c = f, h = g)) } else this.startOnAxis || (a -= g / 2), h = this.start + Math.round(a / g); h = e.fitToBounds(h, 0, b.length - 1); var l; b[h] && (l = b[h].x[this.id]); d ? l > this.height + 1 && h-- : l > this.width + 1 && h--; 0 > l && h++; return h = e.fitToBounds(h, 0, b.length - 1)
        }, dateToCoordinate: function (a) {
            return this.parseDates &&
            !this.equalSpacing ? (a.getTime() - this.startTime) * this.stepWidth : this.parseDates && this.equalSpacing ? (a = this.chart.getClosestIndex(this.data, "time", a.getTime(), !1, 0, this.data.length - 1), this.getCoordinate(a - this.start)) : NaN
        }, categoryToCoordinate: function (a) { if (this.chart) { if (this.parseDates) return this.dateToCoordinate(new Date(a)); a = this.chart.getCategoryIndexByValue(a); if (!isNaN(a)) return this.getCoordinate(a - this.start) } else return NaN }, coordinateToDate: function (a) {
            return this.equalSpacing ? (a = this.xToIndex(a),
            new Date(this.data[a].time)) : new Date(this.startTime + a / this.stepWidth)
        }, coordinateToValue: function (a) { a = this.xToIndex(a); if (a = this.data[a]) return this.parseDates ? a.time : a.category }, getCoordinate: function (a) { a *= this.stepWidth; this.startOnAxis || (a += this.stepWidth / 2); return Math.round(a) }, formatValue: function (a, b) { b || (b = this.currentDateFormat); this.parseDates && (a = e.formatDate(new Date(a), b, this.chart)); return a }, showBalloonAt: function (a) {
            a = this.parseDates ? this.dateToCoordinate(new Date(a)) : this.categoryToCoordinate(a);
            return this.adjustBalloonCoordinate(a)
        }, formatBalloonText: function (a, b, c) {
            var d = "", g = "", h = this.chart, f = this.data[b]; if (f) if (this.parseDates) d = e.formatDate(f.category, c, h), b = e.changeDate(new Date(f.category), this.minPeriod, 1), g = e.formatDate(b, c, h), -1 != d.indexOf("fff") && (d = e.formatMilliseconds(d, f.category), g = e.formatMilliseconds(g, b)); else { var l; this.data[b + 1] && (l = this.data[b + 1]); d = e.fixNewLines(f.category); l && (g = e.fixNewLines(l.category)) } a = a.replace(/\[\[category\]\]/g, String(d)); return a = a.replace(/\[\[toCategory\]\]/g,
            String(g))
        }, adjustBalloonCoordinate: function (a, b) {
            var c = this.xToIndex(a), d = this.chart.chartCursor; if (this.stickBalloonToCategory) { var e = this.data[c]; e && (a = e.x[this.id]); this.stickBalloonToStart && (a -= this.cellWidth / 2); var h = 0; if (d) { var f = d.limitToGraph; if (f) { var l = f.valueAxis.id; f.hidden || (h = e.axes[l].graphs[f.id].y) } this.rotate ? ("left" == this.position ? (f && (h -= d.width), 0 < h && (h = 0)) : 0 > h && (h = 0), d.fixHLine(a, h)) : ("top" == this.position ? (f && (h -= d.height), 0 < h && (h = 0)) : 0 > h && (h = 0), d.fixVLine(a, h)) } } d && !b && (d.setIndex(c),
            this.parseDates && d.setTimestamp(this.coordinateToDate(a).getTime())); return a
        }
    })
})();
