sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("VIR.controller.Payment", {
		onInit: function() {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
		},
		handleRouteMatched: function(oEvent) {
			if (oEvent.getParameter("name") === "Payment") {
				this._ModelInitialLoad();
			}
		},
		_ModelInitialLoad: function() {
			var currdate = new Date();
			var DateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd/MM/yyyy"
			});
			currdate = DateFormat.format(currdate);
			var oData = {
				"InpPlateNo": "",
				"InpOrderNo": "",
				"ReqId": "",
				"Site": "",
				"ReqType": "",
				"Purpose": "",
				"Queue": "",
				"Lane": "",
				"PlateNo": "",
				"Source": "",
				"Platec": "",
				"VehicleKind": "",
				"ReqDate": null,
				"Noofretest": "",
				"Feerule": "",
				"Feepaid": "",
				"Totalfee": "",
				"Status": "",
				"ClosingDate": null,
				"Entereddate": null,
				"Enteredby": "",
				"Shortclosedon": null,
				"Shortclosedby": "",
				"Remarks": "",
				"PendingReq": [{
					"ReqNo": "339532839",
					"ReqDate": currdate,
					"Plateno": "88329",
					"PlateColor": "55",
					"Kind": "Private",
					"Source": "ABU DHABI",
					"Paymenttype": "Success",
					"TotalAmt": "In-Progress",
					"Lane": "1",
					"Amout": "125",
					"Customer": "Mohammed Anzar"
				}, {
					"ReqNo": "311900929",
					"ReqDate": currdate,
					"Plateno": "82261",
					"PlateColor": "12",
					"Kind": "Private",
					"Source": "ABU DHABI",
					"Paymenttype": "Success",
					"TotalAmt": "In-Progress",
					"Lane": "3",
					"Amout": "185",
					"Customer": "Shoail Khan"
				}, {
					"ReqNo": "351092849",
					"ReqDate": currdate,
					"Plateno": "42145",
					"PlateColor": "1",
					"Kind": "Private",
					"Source": "ABU DHABI",
					"Paymenttype": "Success",
					"TotalAmt": "In-Progress",
					"Lane": "1",
					"Amout": "169",
					"Customer": "Shoib Akthar"
				}, {
					"ReqNo": "323412346",
					"ReqDate": currdate,
					"Plateno": "66542",
					"PlateColor": "7",
					"Kind": "Private",
					"Source": "ABU DHABI",
					"Paymenttype": "Success",
					"TotalAmt": "In-Progress",
					"Lane": "3",
					"Amout": "87",
					"Customer": "Mohammed Irfan"
				}, {
					"ReqNo": "344532460",
					"ReqDate": currdate,
					"Plateno": "44125",
					"PlateColor": "A",
					"Kind": "Private",
					"Source": "DUBAI",
					"Paymenttype": "Success",
					"TotalAmt": "In-Progress",
					"Lane": "2",
					"Amout": "120",
					"Customer": "Mohammed Hafiz"
				}, {
					"ReqNo": "356267267",
					"ReqDate": currdate,
					"Plateno": "54367",
					"PlateColor": "27",
					"Kind": "Private",
					"Source": "ABU DHABI",
					"Paymenttype": "Pending",
					"TotalAmt": "In-Progress",
					"Lane": "1",
					"Amout": "130",
					"Customer": "Shahid Khan"
				}, {
					"ReqNo": "341224678",
					"ReqDate": currdate,
					"Plateno": "33246",
					"PlateColor": "5",
					"Kind": "Private",
					"Source": "ABU DHABI",
					"Paymenttype": "Pending",
					"TotalAmt": "In-Progress",
					"Lane": "2",
					"Amout": "145",
					"Customer": "Mustaf"
				}],

			};

			var MasterViewModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(MasterViewModel, "PaymentModel");

		},
	

	});

});