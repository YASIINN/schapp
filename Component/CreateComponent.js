CreateComponent = {
    showBusyIndicator: function (_this, createId, iDelay) {
        iDelay = iDelay == null ? 0 : iDelay;
        if (createId) {
            var multiInput = sap.ui.getCore().byId(createId);
            if (_this) {
                multiInput = _this.getView().byId(createId);
            }
            multiInput.setBusyIndicatorDelay(iDelay);
            multiInput.setBusy(true);
        } else sap.ui.core.BusyIndicator.show(iDelay);
    },
    hideBusyIndicator: function (_this, createId) {
        if (createId) {
            var multiInput = sap.ui.getCore().byId(createId);
            if (_this) {
                multiInput = _this.getView().byId(createId);
            }
            multiInput.setBusy(false);
        } else sap.ui.core.BusyIndicator.hide();
    },
    tablaPaginator: function (_this, createId, modelname, pagename, sllength) {
        if (createId) {
            var table = sap.ui.getCore().byId(createId);
            if (_this) {
                table = _this.getView().byId(
                    createId)
            }
            var oLength = oModel.getProperty("/" + modelname).length;
            var oActual = oLength / sllength;
            var oCalculation = (oActual % 1 == 0);
            if (oCalculation == true) {
                var oValue = oActual;
            } else {
                var oValue = parseInt(oActual) + 1;
            }
            oModel.setProperty("/oRows", oModel.getProperty("/" + modelname).slice(0, sllength));
            table.bindRows("/oRows");
            if (sap.ui.getCore().byId('pa') != undefined) {
                sap.ui.getCore().byId('pa').destroy();
            }
            var oPaginator = new sap.ui.commons.Paginator("pa", {
                numberOfPages: oValue,
                page: function (oEvent) {
                    var oValue = oEvent;
                    var oTargetPage = oEvent.getParameter("targetPage");
                    var oTargetValue = oTargetPage * sllength;
                    var oSourceValue = oTargetValue - sllength;
                    var oModel = sap.ui.getCore().getModel();
                    var oTotalData = oModel.getProperty("/" + modelname);
                    var oSelectedData = oTotalData.slice(oSourceValue, oTargetValue);
                    oModel.setProperty("/oRows", oSelectedData);
                    table.clearSelection();
                }
            }).addStyleClass("paginatorStyle");
            _this.getView().byId(pagename).addItem(oPaginator)
        }
    },
    validateemail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
}