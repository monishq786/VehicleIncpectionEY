sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("VIR.controller.PaymentDetails", {

		onPressNavtoPaymentapp: function() {

			sap.m.MessageToast.show("Navigating to payment app");
			var SO_Number = "39921047";
			var MyCartTotal = "100";

			var aParameters = {
				Saleorder: "",
				Invoice: "",
				MOPType: "",
				CardNo: "",
				Authcode: "",
				TransactionMessage: ""
			};

			// Convert the array to a string (typically JSON)
			var myaParameters = JSON.stringify(aParameters);

			// let currentUrl = 'com.sap.mobile.start://navigation?resolve-type=ibn#ZCarwash-create?sap-ui-app-id-hint=scf100dt_35A045CDF1638F1A638036BF48335FC3&/Services/' + myaParameters;

			let currentUrl =
				'com.sap.mobile.start://navigation?resolve-type=ibn#ZVIR-create?sap-ui-app-id-hint=scf100dt_9AAD77A434D547DC0AB610252A876DD5';

			// URL encode it
			let encodedReturnUrl = encodeURIComponent(currentUrl);

			// JSON object with data
			var jsonData = {
				trxnType: "SALE",
				amount: MyCartTotal,
				mode: "card",
				trxnID: SO_Number
			};

			// Convert JSON object to string
			var jsonString = JSON.stringify(jsonData);

			// Encode the JSON string to be URL-safe
			var encodedJsonString = encodeURIComponent(jsonString);

			// Construct the custom URI with encoded JSON data
			//var uri = "adnoc://pay.com/card?data=" + encodedJsonString;
			// Construct the custom URI with encoded JSON data and returnUrl

			console.log(encodedReturnUrl);

			var uri = "adnoc://pay.com/card?data=" + encodedJsonString + "&returnUrl=" + encodedReturnUrl;
			window.location.href = uri;

			/*Setting Flag*/
			// this.getView().getModel("oGlobalModel").setProperty("/PaymentDetailFlag", "X");

		},
		onPressSaveDetails: function() {
			sap.m.MessageToast.show("Payment Details Saved Successfully");
			// var oHashChanger = sap.ui.core.routing.HashChanger.getInstance();
			// var sHash = oHashChanger.getHash();
			// sap.m.MessageBox.success(sHash);
			// if (sHash.includes("?")) {
			// 	var sCleanHash = sHash.split("?")[1];
			// 	// Remove the parameters
			// 	oHashChanger.replaceHash(sCleanHash);
			// 	// Replace the URL
			// }
			var url = window.location.href;

			var index = url.indexOf("#ZVIR-create");
			var viewstrlen = 12;
			finalindex = viewstrlen + index;
			var spliturl = url.substring(0, finalindex);
			window.location.replace(spliturl);
			// // this.getView().getModel("oGlobalModel").setProperty("/PaymentDetailFlag", "");
			// // MessageToast.show("Payment Details Saved Successfully");
			// var oRouter = UIComponent.getRouterFor(this);
			// sap.m.MessageBox.success(
			// 	"Payment Details Saved Successfully", {
			// 		icon: sap.m.MessageBox.Icon.CONFIRM,
			// 		title: "Confirmation",
			// 		actions: [sap.m.MessageBox.Action.OK],
			// 		onClose: function(oAction) {
			// 			if (oAction === "OK") {
			// 				// oRouter.navTo("Home", false);
			// 				// window.location.replace(
			// 				// 	'com.sap.mobile.start://navigation?resolve-type=ibn#ZCarwash-create?sap-ui-app-id-hint=scf100dt_35A045CDF1638F1A638036BF48335FC3'
			// 				// )

			// 				// Deep link to open SAP Mobile Start with a specific intent
			// 				var mobileStartUrl =
			// 					"com.sap.mobile.start://navigation?resolve-type=ibn#ZVIR-create?sap-ui-app-id-hint=scf100dt_9AAD77A434D547DC0AB610252A876DD5";

			// 				// Redirect to the URL scheme (this will open the SAP Mobile Start app)
			// 				window.location.replace(mobileStartUrl);

			// 			}
			// 		}
			// 	});
		},

	});

});