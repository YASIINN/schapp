sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("schapp.Application.Dashboard.Home.controller.Home",{onInit:function(){var e=this;e.getView().setModel(oModel),sap.ui.core.UIComponent.getRouterFor(this).getRoute("Dashboard/Home").attachPatternMatched(e.onBeforeShow,e)},onBeforeShow:function(){UseronLogin.onLogin().then(function(e){Servertime.getY().then(function(e){e!=(new Date).toLocaleDateString().split(".")[2]&&sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")})})}})});