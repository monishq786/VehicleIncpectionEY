sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function(Controller, UIComponent) {
	"use strict";

	return Controller.extend("VIR.controller.CreateCustomer", {

		onInit: function() {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
		},
		handleRouteMatched: function(oEvent) {
			if (oEvent.getParameter("name") === "CreateCustomer") {
				this._ModelInitialLoad();
			}
		},

		// onAfterRendering: function() {
		// 	this._ModelInitialLoad();
		// },
		onreset: function() {
			this._ModelInitialLoad();
		},
		_ModelInitialLoad: function() {

			var oData = {
				"HeaderCustomerNo": "",
				"CustomerName": "",
				"HeaderEmail": "",
				"HeaderMobileNo": "",
				"HeaderEmirates": "",
				"pincode": "",
				"Address": "",
				"MObileNo": "",
				"SR": "",
				"MOPType": "",
				"SearchFieldEditable": true,
				"SavebtnVisible": true,
				"PaybtnVisible": false,
				"PrintbtnVisible": false,
				"TotalAmount": "173.25",
				"VatAmount": "8.25",
				"Chassisno": "",
				"Engineno": "",
				"Manufacturer": "",
				"Country": "",
				"Model": "",
				"Kind": "",
				"Type": "",
				"BodyColor": "",
				"GearType": "",
				"FuelType": "",
				"SteeringSide": "",
				"WeightKind": "",
				"InitRegyear": null,
				"RegExpYear": null,
				"PlateType": "",
				"MFGYear": null,
				"HP": "",
				"Axles": "",
				"Cylinders": "",
				"Wheels": "",
				"Doors": "",
				"Passengers": "",
				"EmptyWeight": "",
				"FullWeight": "",
				"mileage": "",
				"CubicCapacity": "",
				"PlateNum": "",
				"ServiceItems": [],
				"CV_Model": "",
				"CV_Manufacturer": "",
				"PlateCategoryF4": [{
					"Category": "Public"
				}, {
					"Category": "Private"
				}, {
					"Category": "Classic"
				}, {
					"Category": "Police"
				}, {
					"Category": "Other"
				}],
				"ManufacturerF4": [{
					"Manufacturer": "BMW"
				}, {
					"Manufacturer": "AUDI"
				}, {
					"Manufacturer": "BENZ"
				}, {
					"Manufacturer": "Ferrari"
				}, {
					"Manufacturer": "Other"
				}],
				"ModelF4": [{
					"Model": "X1",
					"Manufacturer": "BMW"
				}, {
					"Model": "X5",
					"Manufacturer": "BMW"
				}, {
					"Model": "Series 3",
					"Manufacturer": "BMW"
				}, {
					"Model": "A4",
					"Manufacturer": "AUDI"
				}, {
					"Model": "A6",
					"Manufacturer": "AUDI"
				}, {
					"Model": "Q5",
					"Manufacturer": "AUDI"
				}, {
					"Model": "E-Class",
					"Manufacturer": "BENZ"
				}, {
					"Model": "Benz GLE",
					"Manufacturer": "BENZ"
				}, {
					"Model": "Other",
					"Manufacturer": "BENZ"
				}, {
					"Model": "F8",
					"Manufacturer": "Ferrari"
				}, {
					"Model": "GTC4",
					"Manufacturer": "Ferrari"
				}, {
					"Model": "Other",
					"Manufacturer": "Ferrari"
				}, {
					"Model": "Other",
					"Manufacturer": "Other"
				}],
				"CountryF4": [{
					"Country": "Abu Dhabi"
				}, {
					"Country": "Dubai"
				}, {
					"Country": "Sharjah"
				}, {
					"Country": "Umm Al Quwain"
				}, {
					"Country": "Ras Al Khaimah"
				}, {
					"Country": "Fujairah"
				}, {
					"Country": "Others"
				}],
				"KindF4": [{
					"Kind": "Sedan"
				}, {
					"Kind": "SUV"
				}],
				"TypeF4": [{
					"Type": "Light Vehicle"
				}, {
					"Type": "Heavy Vehicle"
				}],
				"BodyColorF4": [{
					"Color": "White"
				}, {
					"Color": "Black"
				}, {
					"Color": "Gray"
				}, {
					"Color": "Silver"
				}, {
					"Color": "Blue"
				}, {
					"Color": "Red"
				}, {
					"Color": "Green"
				}, {
					"Color": "Brown"
				}, {
					"Color": "Orange"
				}, {
					"Color": "Yellow"
				}, {
					"Color": "Gold"
				}, {
					"Color": "Purple"
				}],
				"FueltypeF4": [{
					"Type": "Petrol"
				}, {
					"Type": "Deisel"
				}],
				"GearTypeF4": [{
					"Gear": "Automatic"
				}, {
					"Gear": "Manual"
				}],
				"PlatetypeF4": [{
					"Category": "Public"
				}, {
					"Category": "Private"
				}, {
					"Category": "Classic"
				}, {
					"Category": "Police"
				}, {
					"Category": "Other"
				}]

			};

			var MasterViewModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(MasterViewModel, "CreateCustomerModel");

		},
		openCountryF4: function() {
			if (!this.CountryF4Frag) {
				this.CountryF4Frag = sap.ui.xmlfragment("VIR.fragment.CountryF4", this);
				this.getView().addDependent(this.CountryF4Frag);
			}
			this.CountryF4Frag.open();
		},
		openManufacturerF4: function() {
			if (!this.ManufactureF4Frag) {
				this.ManufactureF4Frag = sap.ui.xmlfragment("VIR.fragment.ManfacturerF4", this);
				this.getView().addDependent(this.ManufactureF4Frag);
			}
			this.ManufactureF4Frag.open();
		},
		openModelF4: function() {
			if (!this.ModelF4Frag) {
				this.ModelF4Frag = sap.ui.xmlfragment("VIR.fragment.ModelF4", this);
				this.getView().addDependent(this.ModelF4Frag);
			}
			this.ModelF4Frag.open();
		},
		openColorF4: function() {
			if (!this.ColorF4Frag) {
				this.ColorF4Frag = sap.ui.xmlfragment("VIR.fragment.ColorF4", this);
				this.getView().addDependent(this.ColorF4Frag);
			}
			this.ColorF4Frag.open();
		},
		onManfacturerConfirm: function(oEvent) {
			var oModel = this.getView().getModel("CreateCustomerModel");
			oModel.setProperty("/CV_Model", "");

			oModel.getData().CV_Manufacturer = oEvent.getParameter("selectedItem").getBindingContext("CreateCustomerModel").getObject().Manufacturer;
			oEvent.getSource().getBinding("items").filter([]);

			var ModelF4Set = oModel.getProperty("/ModelF4");
			var aManufactureModel = [];

			aManufactureModel = ModelF4Set.filter(function(e) {
				return e.Manufacturer === oModel.getData().CV_Manufacturer;
			});
			oModel.setProperty("/ModelF4", aManufactureModel);
			oModel.refresh();
		},
		onCountryconfirm: function(oEvent) {
			var vCountry = oEvent.getParameter("selectedItem").getBindingContext("CreateCustomerModel").getObject().Country;
			this.getView().getModel("CreateCustomerModel").setProperty("/Country", vCountry);
			oEvent.getSource().getBinding("items").filter([]);
		},
		onModelConfirm: function(oEvent) {
			var vmodel = oEvent.getParameter("selectedItem").getBindingContext("CreateCustomerModel").getObject().Model;
			this.getView().getModel("CreateCustomerModel").setProperty("/CV_Model", vmodel);
			oEvent.getSource().getBinding("items").filter([]);
		},
		onColoronfirm: function(oEvent) {
			var vcolor = oEvent.getParameter("selectedItem").getBindingContext("CreateCustomerModel").getObject().Color;
			this.getView().getModel("CreateCustomerModel").setProperty("/BodyColor", vcolor);
			oEvent.getSource().getBinding("items").filter([]);
		},
		onExit: function() {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("View1", false);
		},
		onPressCreateVehicle: function() {
			var Modeldata = this.getView().getModel("CreateCustomerModel").getData();

			if (Modeldata.Chassisno && Modeldata.Engineno && Modeldata.CV_Manufacturer && Modeldata.CV_Model && Modeldata.PlateType &&
				Modeldata.Kind) {
				sap.m.MessageToast.show("Vehicle Created Successfully");
				this.getView().getModel("VIRGlobalModel").setProperty("/PlateNo", Modeldata.PlateNo);
				this.getView().getModel("VIRGlobalModel").setProperty("/HeaderCustomerNo", "10033281");
				this.getView().getModel("VIRGlobalModel").setProperty("/CustomerName", "Ahmed Asad");
				this.getView().getModel("VIRGlobalModel").setProperty("/MObileNo", "508200365");
				var oRouter = UIComponent.getRouterFor(this);
				this.intervalHandle = setTimeout(function() {
					oRouter.navTo("GenerateReq", false);
				}, 2000);
			} else {
				sap.m.MessageToast.show("Please Fill Chassisno, Engineno, Manufacturer, Model, PlateType, Kind");
			}
		},
	});

});