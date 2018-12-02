jQuery.sap.require("schapp.Application.Dashboard.ProjectSelect.FileUpload.fileupload");
var TFolderDialog = ""
var TFolder = {
    open: function (fuid) {
        /*
        if (TFolderDialog) {
            TFolderDialog.open(fuid);
            return
        }*/
        TFolder.getData(fuid).then(function (res) {
            if (res) {
                var TFolderDialog = new sap.m.Dialog(
                    {
                        stretch: true,
                        modal: true,
                        stretchOnPhone: true,
                        showCloseButton: true,
                        horizontalScrolling: false,
                        verticalScrolling: false,
                    }).addStyleClass("dialogHasFooter sapUiNoMargin sapUiNoContentPadding sapUiSizeCompact")
                var bar = new sap.m.Bar({});
                bar.addContentMiddle(new sap.m.HBox({
                    alignItems: sap.m.FlexAlignItems.Center,
                    justifyContent: sap.m.FlexJustifyContent.Stretch,
                    items: [
                        new sap.m.Text(
                            {
                                text: "ÖĞRENCİ TRANSKRİPT DOSYASI",
                                width: "150px"
                            }).addStyleClass("sapUiSmallMarginBegin")
                    ]
                }).addStyleClass("sapUiNoMargin"))
                bar.addContentRight(
                    new sap.m.Button({
                        icon: "sap-icon://sys-cancel",
                        text: "Kapat",
                        type: "Transparent",
                        press: function () {
                            TFolderDialog.close();
                            oModel.setProperty("/Source", [])
                        }
                    }).addStyleClass("sapUiNoMargin"))
                var FolderArea = new sap.m.HBox({
                    width: "100%",
                    height: "100%",
                    alignItems: sap.m.FlexAlignItems.Stretch,
                    justifyContent: sap.m.FlexJustifyContent.Start,
                    items: [
                        new sap.ui.core.HTML({
                            preferDOM: true,
                            content:
                                "<iframe width='1250px' height='800px'  target='_top' src='" + oModel.oData.Source + "'> </iframe>"
                        })
                    ]
                })
                TFolderDialog.addContent(FolderArea);
                TFolderDialog.setCustomHeader(bar);
                TFolderDialog.open();
                TFolder.getData(fuid);
            }
        })

    },
    getData: function (fuid) {
        CreateComponent.showBusyIndicator();
        var deferred = new Promise(function (resolve, reject) {
            file.addfile({
                MN: "GETF",
                SN: "UploadPdf",
                where: "tfname=?",
                param: fuid
            }).then(function (res) {
                if (res.length) {
                    resolve(true);
                    oModel.setProperty("/Source", res)
                    CreateComponent.hideBusyIndicator();
                }
            })
        })
        return deferred
    }
};
