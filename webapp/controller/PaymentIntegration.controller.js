sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("VIR.controller.PaymentIntegration", {
		onInit: function () {

			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
			
		},

        onPressPay: function () {
			sap.m.MessageToast.show("Payment Completed Successfully");
			this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "");
			this.getView().getModel("VIRGlobalModel").setProperty("/CartItemVisble", true);
			this.getView().getModel("VIRGlobalModel").setProperty("/MainIcontabbarVisible", false);


			this.getView().getModel("VIRGlobalModel").setProperty("/Bay", "");
			// this.getView().getModel("VIRGlobalModel").setProperty("/PlateNo", "");
			this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileUpdated", true);
			this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileNotUpdated", false);
			this.getView().getModel("SearchViewModel").setProperty("/Btnenable", true);
			this.getView().getModel("SearchViewModel").setProperty("/FieldsEditable", false);
			this.getView().getModel("SearchViewModel").setProperty("/PaybtnVisible", false);
			this.getView().getModel("VIRGlobalModel").setProperty("/unRegplateno", "");

			var aserviceItems = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
			var aAccessoriesItems = this.getView().getModel("SearchViewModel").getProperty("/Accessories");
			var aVehicleTestItems = this.getView().getModel("SearchViewModel").getProperty("/VehicleTest");
			var aPermitItems = this.getView().getModel("SearchViewModel").getProperty("/Permit");
			var aOthers = this.getView().getModel("SearchViewModel").getProperty("/Others");
			var Clubarray = [];
			Clubarray = Clubarray.concat(aAccessoriesItems, aVehicleTestItems, aPermitItems, aOthers);
			var arrItems = this.getView().getModel("VIRGlobalModel").getData().ServiceItems;
			for (var j = 0; j < arrItems.length; j++) {
				if (arrItems[j].ServiceName === "UAE Standards Service - Fresh Test" || arrItems[j].ServiceName === "Tire Test - Fresh Test") {
					arrItems[j].MahaHide = "X";
				}
				arrItems[j].MahaIn = "X";
				arrItems[j].MahaOut = "";
				arrItems[j].MahaVisible = "X";
				arrItems[j].Visual = "";
			}
			this.getView().getModel("VIRGlobalModel").refresh();
			this.getView().getModel("SearchViewModel").refresh();
			this.CartFrag.close();

		},
        onBtnPressCancel: function () {
			const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("GenerateReq", {}, true);
		},
	});

});