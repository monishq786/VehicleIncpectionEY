sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";

	return Controller.extend("VIR.controller.MainmenuView", {
		onpressopenpayment: function () {
			if (!this.PaymentFrag) {
				this.PaymentFrag = sap.ui.xmlfragment("VIR.fragment.PaymentMode", this);
				this.getView().addDependent(this.PaymentFrag);
			}
			this.PaymentFrag.open();
		},


		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf VIR.view.MainmenuView
		 */
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
			this.onPressBanner();
		},
		handleRouteMatched: function (oEvent) {
			if (oEvent.getParameter("name") === "MainmenuView") {
				var oStartupParameters = this.getOwnerComponent().getComponentData().startupParameters;
				if (oStartupParameters && oStartupParameters.message && oStartupParameters.orderid) {
					var globalModel = this.getView().getModel("VIRGlobalModel").getData();
					globalModel.SR = oStartupParameters.orderid[0];
					globalModel.Authcode = oStartupParameters.authcode[0];
					globalModel.Status = oStartupParameters.status[0];
					globalModel.TransactionMessage = oStartupParameters.message[0];
					this.getView().getModel("VIRGlobalModel").refresh();
					var oRouter = UIComponent.getRouterFor(this);
					oRouter.navTo("PaymentDetails", false);
				}
			}
		},
		onPressmainHome: function () {
			// var sPreviousHash = History.getInstance().getPreviousHash();
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			oCrossAppNavigator.toExternal({
				target: {
					shellHash: "#Shell-home"
				}
			});
			var oRenderer = sap.ushell.Container.getRenderer("fiori2");
			oRenderer.setHeaderVisibility(true, false);
		},
		onPressBanner: function (oEvent) {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("View1", false);
			var oToolPage = this.byId("id_VIRtoolPage");
			oToolPage.setSideExpanded(true);

		},
		onPressSearch: function (oEvent) {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("Search", false);
			var oToolPage = this.byId("id_VIRtoolPage");
			oToolPage.setSideExpanded(false);
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf VIR.view.MainmenuView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf VIR.view.MainmenuView
		 */
		onAfterRendering: function () {
			// var oToolPage = this.byId("id_VIRtoolPage");
			// oToolPage.setSideExpanded(false);

		},

		onSideNavButtonPress: function () {
			var oToolPage = this.byId("id_VIRtoolPage");
			// var bSideExpanded = oToolPage.getSideExpanded();
			// this._setToggleButtonTooltip(bSideExpanded);
			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},

		_setToggleButtonTooltip: function (bLarge) {
			var oToggleButton = this.byId('sideNavigationToggleButton');
			if (bLarge) {
				oToggleButton.setTooltip('Large Size Navigation');
			} else {
				oToggleButton.setTooltip('Small Size Navigation');
			}
		},
		onPressPendingReq: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("PendingRequest", false);
			var oToolPage = this.byId("id_VIRtoolPage");
			oToolPage.setSideExpanded(false);
		},
		onPressPayment: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("Payment", false);
			var oToolPage = this.byId("id_VIRtoolPage");
			oToolPage.setSideExpanded(false);
		},



		onPressNewHome: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("Home", false);
		}




	});

});