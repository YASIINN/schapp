sap.ui.define(['sap/ui/core/mvc/Controller'], function (Controller) {
    "use strict";
    var PageController = Controller.extend("schapp.Application.Project.ProjectRouter", {
        onInit: function (oEvent) {
            var _this = this
            _this.getView().setModel(oModel);
            UseronLogin.onLogin().then(function (res) {
                Servertime.getY().then(function (res) {
                    if (res != new Date().toLocaleDateString().split(".")[2]) {
                        sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                    }else{
                        _this.projectonCreated();
                    }
                })
            })
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Project/ProjectOnLesson").attachPatternMatched(_this.onBeforeShow, _this);
            oRouter.getRoute("Project/ProjectOnCreated").attachPatternMatched(_this.onBeforeShow, _this);
            oRouter.getRoute("Project/ProjectUp").attachPatternMatched(_this.onBeforeShow, _this);
            _this.getView().addEventDelegate({
                onBeforeShow: jQuery.proxy(function (evt) {
                    _this.onBeforeShow(_this);
                }, _this)
            });
        },
        onBeforeShow: function (argument) {
            var _this = this
            _this.projectonCreated();
            var selectView = _this.getOwnerComponent().getRouter();
            selectView = selectView._oRouter._prevMatchedRequest
            selectView = selectView.split("?")[0];
            var IconTabFilter = _this.getView().byId("projtab");
            IconTabFilter.setSelectedKey(selectView);
        },
        projectonCreated: function () {
            var _this = this
            var filter = window.location.hash.split("?")[1].split("=")[1];
            if (filter.trim() != "") {
                var data = {
                    SN:"ProjectOnLesson",
                    "MN": "GETU",
                    where: "pjid=?",
                    param: filter,
                }
                Servertime.getY().then(function (res) {
                    if (res != new Date().toLocaleDateString().split(".")[2]) {
                        sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                    }
                    else {
                        ProjectonLesson.ProjectonLessonReq(data).then(function (res) {
                            if (res == "None") {
                                CreateComponent.hideBusyIndicator();
                            } else {
                                res.forEach(element => {
                                    if (element.uid == oModel.oData.UserModel[0].uid) {
                                        _this.byId("pjupid").setVisible(true);
                                    } else {
                                        _this.byId("pjupid").setVisible(false);
                                    }
                                });
                                CreateComponent.hideBusyIndicator();
                            }
                        })
                    }
                })
            } else {
                sap.m.MessageToast.show("Hatalı Parametre")
            }
        },
        ProjectRouterEvent: function (oEvent) {
            var _this = this
            var key = oEvent.getSource().getSelectedKey();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(_this);
            oRouter.navTo(key, {
                param: window.location.hash.split("?")[1]
            })
        },
        onClose: function (argument) {
            UseronLogin.outLogin();
            window.location.reload();
        },
        onGoHome: function (argument) {
            var _this = this
            _this.getOwnerComponent().getRouter().navTo("Dashboard/Home");
        },
    });
    return PageController;
});