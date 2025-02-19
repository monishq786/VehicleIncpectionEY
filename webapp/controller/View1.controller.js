sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/m/MessageBox",
], function (Controller, UIComponent, MessageBox) {
	"use strict";

	return Controller.extend("VIR.controller.View1", {
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
		},
		handleRouteMatched: function (oEvent) {
			if (oEvent.getParameter("name") === "View1") {

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
		onAfterRendering: function () {
			this._ModelInitialLoad();
		},

		onPressSearch: function () {
			// var oHashChanger = sap.ui.core.routing.HashChanger.getInstance();
			// var sHash = oHashChanger.getHash();
			// sap.m.MessageToast.show(sHash);
			// Modify the hash to remove unnecessary parameters
			// if (sHash.includes("?")) {
			// 	var sCleanHash = sHash.split("?")[1];
			// 	// Remove the parameters
			// 	oHashChanger.replaceHash(sCleanHash);
			// 	// Replace the URL
			// }
			this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "");
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("Search", false);
			this.getView().getModel("VIRGlobalModel").setProperty("/Expanded", false);
		},
		onPressESMA: function () {
			this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "ESMA Test");
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("Inspection", false);
			this.getView().getModel("VIRGlobalModel").setProperty("/Expanded", false);
		},
		onPressFresh: function () {
			// this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "2-Fresh");
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("ComprehensiveTest", false);
		},
		onPressrenew: function () {
			this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "3 Re-New");
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("Search", false);
		},
		onpressPendingReq: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("PendingRequest", false);
			this.getView().getModel("VIRGlobalModel").setProperty("/Expanded", false);
		},
		onPressRetest: function () {
			this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "Re-Test");
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("Search", false);
			this.getView().getModel("VIRGlobalModel").setProperty("/Expanded", false);
			// if (!this.RetestFrag) {
			// 	this.RetestFrag = sap.ui.xmlfragment("VIR.fragment.Retest1", this);
			// 	this.getView().addDependent(this.RetestFrag);
			// }
			// var that = this;
			// var oRouter = UIComponent.getRouterFor(this);
			// this.intervalHandle = setTimeout(function() {
			// 	that.RetestFrag.open();
			// }, 500);
		},
		_ModelInitialLoad: function () {

			var oData = {
				"OrderList": [{
					"OrderNo": "1100432462",
					"Status": "Open"
				}, {
					"OrderNo": "1590932328",
					"Status": "Open"
				}, {
					"OrderNo": "1690872320",
					"Status": "Open"
				}, {
					"OrderNo": "1123743267",
					"Status": "Open"
				}, {
					"OrderNo": "18738433423",
					"Status": "Open"
				}],
				"Chartdata": [{
					"Service": "Fresh Test",
					"Count": "0"
				}, {
					"Service": "Permit Test",
					"Count": "1"
				}, {
					"Service": "Re-Test",
					"Count": "2"
				}, {
					"Service": "Re-New",
					"Count": "4"
				}, {
					"Service": "Safety Items",
					"Count": "2"
				}]
			};
			var MasterViewModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(MasterViewModel, "MasterViewModel");


			var oData1 = {
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
					"Country": "UAE"
				}, {
					"Country": "Qatar"
				}, {
					"Country": "Saudi Arabia"
				}, {
					"Country": "India"
				}, {
					"Country": "UK"
				}, {
					"Country": "Germany"
				}, {
					"Country": "US"
				}, {
					"Country": "France"
				}, {
					"Country": "Kuwait"
				}, {
					"Country": "China"
				}, {
					"Country": "Oman"
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

			var customermodel = new sap.ui.model.json.JSONModel(oData1);
			this.getView().setModel(customermodel, "CreateCustomerModel");

			var oData = {
				"Retest": [],
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
				"SearchFieldEditable": false,
				"NewSearchFieldEditable": true,
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
				"NewChassisno": "",
				"NewEngineno": "",
				"NewManufacturer": "",
				"NewCountry": "",
				"NewModel": "",
				"NewKind": "",
				"NewType": "",
				"NewBodyColor": "",
				"NewGearType": "",
				"NewFuelType": "",
				"NewSteeringSide": "",
				"NewWeightKind": "",
				"NewInitRegyear": null,
				"NewRegExpYear": null,
				"NewPlateType": "",
				"NewMFGYear": null,
				"NewHP": "",
				"NewAxles": "",
				"NewCylinders": "",
				"NewWheels": "",
				"NewDoors": "",
				"NewPassengers": "",
				"NewEmptyWeight": "",
				"NewFullWeight": "",
				"Newmileage": "",
				"NewCubicCapacity": "",
				"PlateNum": "",
				"ServiceItems": [],
				"MOPF4": [{
					"MOP": "Card"
				}, {
					"MOP": "Cash"
				}, {
					"MOP": "ADNOC Wallet"
				}],
				"Accessories": [{
					"Material": "2700000001",
					"ServiceName": "Perfect-Wiper Blade AlphaRide 22",
					"Price": "20",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "49",
					"QtyInd": "X",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000002",
					"ServiceName": "Perfect-Wiper Blade AlphaRide 24",
					"Price": "25",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "69",
					"QtyInd": "X",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000003",
					"ServiceName": "OBS Revive Pump 120ml",
					"Price": "40",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "70",
					"QtyInd": "X",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000004",
					"ServiceName": "OBS Typr-Pressure Gauge",
					"Price": "60",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "7",
					"QtyInd": "X",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000005",
					"ServiceName": "OBS Engine Foam",
					"Price": "37",
					"VATPer": "5",
					"VAT": "8.25",
					"QtyInd": "X",
					"Stock": "23",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000006",
					"ServiceName": "OBS Car Mat",
					"Price": "55",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "48",
					"QtyInd": "X",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000007",
					"ServiceName": "Wind Sheild Washer",
					"Price": "30",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "X",
					"TotalAmount": "173.25"

				}],
				"VehicleTest": [{
					"Material": "2700000056",
					"ServiceName": "Tire Test",
					"Price": "100",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "49",
					"QtyInd": "",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000057",
					"ServiceName": "New Registration",
					"Price": "140",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "69",
					"QtyInd": "",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000058",
					"ServiceName": "Transfer from Public to Private",
					"Price": "450",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "70",
					"QtyInd": "",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000059",
					"ServiceName": "Transfer from Private to Public",
					"Price": "450",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "7",
					"QtyInd": "",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000060",
					"ServiceName": "UAE Standard with Veh.Reg.",
					"Price": "250",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "23",
					"QtyInd": "",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000061",
					"ServiceName": "Speed Limit and GPS Test",
					"Price": "170",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "48",
					"QtyInd": "",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000062",
					"ServiceName": "Transfer to Other Emirates Mobile Station",
					"Price": "300",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25"

				}],
				"Permit": [{
					"Material": "2700000120",
					"ServiceName": "Tire Test",
					"Price": "100",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "49",
					"QtyInd": "",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000121",
					"ServiceName": "Change Info Permit",
					"Price": "60",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "69",
					"QtyInd": "",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000122",
					"ServiceName": "Change Color",
					"Price": "40",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "70",
					"QtyInd": "",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000123",
					"ServiceName": "Change Color and Repair",
					"Price": "160",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "7",
					"QtyInd": "",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000124",
					"ServiceName": "Change Chassis",
					"Price": "50",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "23",
					"QtyInd": "",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000125",
					"ServiceName": "Change Vehicle Kind",
					"Price": "120",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "48",
					"QtyInd": "",
					"TotalAmount": "173.25"

				}, {
					"Material": "2700000126",
					"ServiceName": "Change Number Embossing",
					"Price": "130",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25"

				}],
				"Others": [{
					"Material": "2700000221",
					"ServiceName": "Re Print",
					"Price": "100",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "49",
					"QtyInd": "",
					"TotalAmount": "173.25"

				}],
				"MaterialF4": [{
					"Material": "Air Freshner",
					"Price": "40",
					"VATPer": "5",
					"VAT": "2",
					"TotalAmount": "42"
				}, {
					"Material": "Wiper Blade",
					"Price": "25",
					"VATPer": "5",
					"VAT": "1.25",
					"TotalAmount": "26.25"
				}, {
					"Material": "Door Mat",
					"Price": "30",
					"VATPer": "5",
					"VAT": "1.5",
					"TotalAmount": "31.5"
				}, {
					"Material": "Car Pillow",
					"Price": "35",
					"VATPer": "5",
					"VAT": "1.75",
					"TotalAmount": "36.75"
				}, {
					"Material": "Phone Holder",
					"Price": "50",
					"VATPer": "5",
					"VAT": "1.75",
					"TotalAmount": "36.75"
				}, {
					"Material": "Fire Extinguisher",
					"Price": "90",
					"VATPer": "5",
					"VAT": "4.5",
					"TotalAmount": "94.5"
				}, {
					"Material": "First Aid Kit",
					"Price": "120",
					"VATPer": "5",
					"VAT": "6",
					"TotalAmount": "126"
				}, {
					"Material": "FIREX-FEX Powder 2Kg",
					"Price": "185",
					"VATPer": "5",
					"VAT": "9.25",
					"TotalAmount": "194.25"
				}, {
					"Material": "FIREX-FEX CO2 2Kg",
					"Price": "120",
					"VATPer": "5",
					"VAT": "6",
					"TotalAmount": "126"
				}],
				"Purpose": [{
					"Purpose": "Re-New"
				}, {
					"Purpose": "Fresh Test"
				}, {
					"Purpose": "ESMA Test"
				}, {
					"Purpose": "Traffic Test"
				}, {
					"Purpose": "Comprehensive Test"
				}, {
					"Purpose": "Re-Test"
				}, {
					"Purpose": "Permit"
				}, {
					"Purpose": "Safety Items"
				}]

			};

			var MasterViewModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(MasterViewModel, "SearchViewModel");



			// var vizframechart = this.getView().byId("id_Chart2");
			// vizframechart.setVizProperties({
			// 	plotArea: {
			// 		colorPalette: [
			// 			"#002e6d"
			// 		],
			// 		dataLabel: {
			// 			style: {
			// 				color: "#002e6d",
			// 				fontFamily: "ADNOC Sans Regular",
			// 				fontSize: "12px"
			// 			}
			// 		}
			// 	},
			// 	legend: {
			// 		label: {
			// 			style: {
			// 				color: "#002e6d",
			// 				fontFamily: "ADNOC Sans Regular",
			// 				fontSize: "12px"
			// 			}
			// 		}
			// 	},
			// 	title: {
			// 		style: {
			// 			color: "#002e6d",
			// 			fontFamily: "ADNOC Sans Regular",
			// 			fontSize: "16px"

			// 		}
			// 	},
			// 	categoryAxis: {
			// 		label: {
			// 			style: {
			// 				color: "#002e6d",
			// 				fontFamily: "ADNOC Sans Regular",
			// 				fontSize: "12px"
			// 			}
			// 		},
			// 		title: {
			// 			visible: "false"
			// 				// style: {
			// 				// 	color: "#12b89b"
			// 				// }
			// 		}
			// 	},
			// 	valueAxis: {
			// 		label: {
			// 			style: {
			// 				color: "#002e6d",
			// 				fontFamily: "ADNOC Sans Regular",
			// 				fontSize: "12px"
			// 			}
			// 		},
			// 		title: {
			// 			visible: "false"
			// 				// style: {
			// 				// 	color: "#12b89b"
			// 				// }
			// 		}
			// 	}
			// });

		},


		onPressReNew: function (oEvent) {
			if (!this.QuickSearch) {
				this.QuickSearch = sap.ui.xmlfragment("VIR.fragment.QuickSearch", this);
				this.getView().addDependent(this.QuickSearch);
			}
			this.QuickSearch.open();
			this.getView().getModel("SearchViewModel").setProperty("/Safetyvisible", false);
			this.getView().getModel("SearchViewModel").setProperty("/Normalisible", true);
			var stext = oEvent.getSource().getContent()[0].getItems()[1].getContent()[0].getText();
			this.getView().getModel("VIRGlobalModel").setProperty("/CurrTest", stext);
			// if (stext === "Fresh Test") {
			// 	this.getView().getModel("VIRGlobalModel").setProperty("/CurrTest", stext);
			// } else if (stext === "Permit") {
			// 	this.getView().getModel("VIRGlobalModel").setProperty("/CurrTest", stext);
			// }

		},
		onPressSafety: function (oEvent) {
			if (!this.QuickSearch) {
				this.QuickSearch = sap.ui.xmlfragment("VIR.fragment.QuickSearch", this);
				this.getView().addDependent(this.QuickSearch);
			}
			this.QuickSearch.open();
			var stext = oEvent.getSource().getContent()[0].getItems()[1].getContent()[0].getText();
			this.getView().getModel("VIRGlobalModel").setProperty("/CurrTest", stext);
			this.getView().getModel("SearchViewModel").setProperty("/Safetyvisible", true);
			this.getView().getModel("SearchViewModel").setProperty("/Normalisible", false);
		},
		onPressCloseReNew: function () {

			this.QuickSearch.close();
		},
		onPressInspection:function(){
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("Home", false);
			this.getView().getModel("VIRGlobalModel").setProperty("/Expanded", false);
		},
		onPressAdpolice: function () {

			var vPlateNum = this.getView().getModel("VIRGlobalModel").getProperty("/PlateNo");
			if (vPlateNum) {

				this.getView().getModel("SearchViewModel").setProperty("/Chassisno", "JTEBU25J9959041");
				this.getView().getModel("SearchViewModel").setProperty("/Engineno", "1GR5709102");
				this.getView().getModel("SearchViewModel").setProperty("/Country", "Germany");
				this.getView().getModel("SearchViewModel").setProperty("/Manufacturer", "BMW");
				this.getView().getModel("SearchViewModel").setProperty("/Model", "X5");
				this.getView().getModel("SearchViewModel").setProperty("/Kind", "SUV");
				this.getView().getModel("SearchViewModel").setProperty("/Type", "Light Vehicle");
				this.getView().getModel("VIRGlobalModel").setProperty("/Type", "Light Vehicle");
				this.getView().getModel("SearchViewModel").setProperty("/BodyColor", "White");
				this.getView().getModel("SearchViewModel").setProperty("/GearType", "Automatic");
				this.getView().getModel("VIRGlobalModel").setProperty("/GearType", "Automatic");
				this.getView().getModel("SearchViewModel").setProperty("/FuelType", "Petrol");
				this.getView().getModel("VIRGlobalModel").setProperty("/FuelType", "Petrol");
				this.getView().getModel("SearchViewModel").setProperty("/SteeringSide", "Right");
				this.getView().getModel("VIRGlobalModel").setProperty("/SteeringSide", "Right");
				this.getView().getModel("VIRGlobalModel").setProperty("/WeightKind", "K");
				this.getView().getModel("SearchViewModel").setProperty("/WeightKind", "K");
				this.getView().getModel("SearchViewModel").setProperty("/InitRegyear", "12/01/2020");
				this.getView().getModel("SearchViewModel").setProperty("/RegExpYear", "01/05/2025");
				this.getView().getModel("VIRGlobalModel").setProperty("/InitRegyear", "12/01/2020");
				this.getView().getModel("VIRGlobalModel").setProperty("/RegExpYear", "01/05/2025");
				this.getView().getModel("SearchViewModel").setProperty("/PlateType", "Private");
				this.getView().getModel("SearchViewModel").setProperty("/MFGYear", "2024");
				this.getView().getModel("VIRGlobalModel").setProperty("/MFGYear", "2024");
				this.getView().getModel("VIRGlobalModel").setProperty("/HP", "1800");
				this.getView().getModel("SearchViewModel").setProperty("/HP", "1800");
				this.getView().getModel("VIRGlobalModel").setProperty("/Axles", "3");
				this.getView().getModel("SearchViewModel").setProperty("/Axles", "3");
				this.getView().getModel("SearchViewModel").setProperty("/Cylinders", "4");
				this.getView().getModel("VIRGlobalModel").setProperty("/Cylinders", "4");
				this.getView().getModel("SearchViewModel").setProperty("/Wheels", "4");
				this.getView().getModel("SearchViewModel").setProperty("/Doors", "4");
				this.getView().getModel("VIRGlobalModel").setProperty("/Doors", "4");
				this.getView().getModel("VIRGlobalModel").setProperty("/Passengers", "4");
				this.getView().getModel("SearchViewModel").setProperty("/Passengers", "4");
				this.getView().getModel("SearchViewModel").setProperty("/EmptyWeight", "1000");
				this.getView().getModel("VIRGlobalModel").setProperty("/EmptyWeight", "1000");
				this.getView().getModel("SearchViewModel").setProperty("/FullWeight", "1500");
				this.getView().getModel("VIRGlobalModel").setProperty("/FullWeight", "1500");
				this.getView().getModel("SearchViewModel").setProperty("/mileage", "18");
				this.getView().getModel("VIRGlobalModel").setProperty("/mileage", "18097");
				this.getView().getModel("SearchViewModel").setProperty("/CubicCapacity", "1400");
				this.getView().getModel("VIRGlobalModel").setProperty("/CubicCapacity", "1400");
				this.getView().getModel("SearchViewModel").setProperty("/HeaderCustomerNo", "10033281");
				this.getView().getModel("VIRGlobalModel").setProperty("/HeaderCustomerNo", "10033281");
				this.getView().getModel("SearchViewModel").setProperty("/CustomerName", "Ahmed Asad");
				this.getView().getModel("VIRGlobalModel").setProperty("/CustomerName", "Ahmed Asad");

				var mail = "ahmedasad@gmail.com";
				var firststring = mail.split("@")[0];
				var firststringlength = firststring.length;
				firststring = firststring.replace(firststring.substring(1, firststringlength - 1), "******");
				var secndstring = mail.split("@")[1];
				var index = secndstring.indexOf(".");
				secndstring = secndstring.replace(secndstring.substring(0, index), "***");
				var finalstring = firststring + "@" + secndstring;
				this.getView().getModel("SearchViewModel").setProperty("/HeaderEmail", finalstring);
				var phone = "+971 508200365";
				phone = phone.replace(phone.substring(5, 11), "******");

				this.getView().getModel("SearchViewModel").setProperty("/HeaderMobileNo", phone);
				// this.getView().getModel("SearchViewModel").setProperty("/HeaderMobileNo", "+971 508200365");
				this.getView().getModel("SearchViewModel").setProperty("/MObileNo", phone);
				this.getView().getModel("VIRGlobalModel").setProperty("/MObileNo", phone);
				this.getView().getModel("SearchViewModel").setProperty("/HeaderEmirates", "Abu Dhabi");
				this.getView().getModel("SearchViewModel").setProperty("/pincode", "100023");
				this.getView().getModel("SearchViewModel").setProperty("/Address", "Corniche Road Abu Dhabi");

				this.getView().getModel("VIRGlobalModel").setProperty("/Chassisno", "JTEBU25J9959041");
				this.getView().getModel("VIRGlobalModel").setProperty("/Engineno", "1GR5709102");
				this.getView().getModel("VIRGlobalModel").setProperty("/Country", "Germany");
				this.getView().getModel("VIRGlobalModel").setProperty("/Manufacturer", "BMW");
				this.getView().getModel("VIRGlobalModel").setProperty("/Kind", "SUV");
				this.getView().getModel("VIRGlobalModel").setProperty("/BodyColor", "White");
				this.getView().getModel("VIRGlobalModel").setProperty("/MFGYear", "2024")
				this.getView().getModel("VIRGlobalModel").setProperty("/PlSource", "ABU DHABHI-PRIVATE")

				//
				this.getView().getModel("SearchViewModel").setProperty("/NewChassisno", "JTEBU25J9959041");
				this.getView().getModel("SearchViewModel").setProperty("/NewEngineno", "1GR5709102");
				this.getView().getModel("SearchViewModel").setProperty("/NewCountry", "Germany");
				this.getView().getModel("SearchViewModel").setProperty("/NewManufacturer", "BMW");
				this.getView().getModel("SearchViewModel").setProperty("/NewModel", "X5");
				this.getView().getModel("SearchViewModel").setProperty("/NewKind", "SUV");
				this.getView().getModel("SearchViewModel").setProperty("/NewType", "Light Vehicle");
				this.getView().getModel("SearchViewModel").setProperty("/NewBodyColor", "White");
				this.getView().getModel("SearchViewModel").setProperty("/NewGearType", "Automatic");
				this.getView().getModel("SearchViewModel").setProperty("/NewFuelType", "Petrol");
				this.getView().getModel("SearchViewModel").setProperty("/NewSteeringSide", "Right");
				this.getView().getModel("SearchViewModel").setProperty("/NewWeightKind", "K");
				this.getView().getModel("SearchViewModel").setProperty("/NewInitRegyear", "12/01/2020");
				this.getView().getModel("SearchViewModel").setProperty("/NewRegExpYear", "01/05/2025");
				this.getView().getModel("SearchViewModel").setProperty("/NewPlateType", "Private");
				this.getView().getModel("SearchViewModel").setProperty("/NewMFGYear", "2024");
				this.getView().getModel("SearchViewModel").setProperty("/NewHP", "1800");
				this.getView().getModel("SearchViewModel").setProperty("/NewAxles", "3");
				this.getView().getModel("SearchViewModel").setProperty("/NewCylinders", "4");
				this.getView().getModel("SearchViewModel").setProperty("/NewWheels", "4");
				this.getView().getModel("SearchViewModel").setProperty("/NewDoors", "4");
				this.getView().getModel("SearchViewModel").setProperty("/NewPassengers", "4");
				this.getView().getModel("SearchViewModel").setProperty("/NewEmptyWeight", "1000");
				this.getView().getModel("SearchViewModel").setProperty("/NewFullWeight", "1500");
				this.getView().getModel("SearchViewModel").setProperty("/Newmileage", "18");
				this.getView().getModel("SearchViewModel").setProperty("/NewCubicCapacity", "1400");
				var inpplateno = this.getView().getModel("VIRGlobalModel").getProperty("/unRegplateno");
				this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "Re-New");
				var Purpose = this.getView().getModel("VIRGlobalModel").getProperty("/Purpose");
				if (!inpplateno && !Purpose) {
					if (!this.PurposeFrag) {
						this.PurposeFrag = sap.ui.xmlfragment("VIR.fragment.Purpose", this);
						this.getView().addDependent(this.PurposeFrag);
					}
					this.PurposeFrag.open();
				} else if (inpplateno) {
					// this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "ESMA Test");
					// var oRouter = UIComponent.getRouterFor(this);
					// oRouter.navTo("GenerateReq", false);
					// this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileUpdated", false);
					// this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileNotUpdated", true);
				} else if (Purpose) {
					// var oRouter = UIComponent.getRouterFor(this);
					// oRouter.navTo("GenerateReq", false);
					this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileUpdated", false);
					this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileNotUpdated", true);
				}
				this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileUpdated", false);
				this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileNotUpdated", true);
			} else {
				sap.m.MessageToast.show("Please enter Plate Number.");
				// var url = "ntent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end";
				// var url = "www.google.com";
				// window.location.href=url;
				// const url = "intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end";
				// window.location.replace(url);
			}
		},
		onPressProceed: function () {

			var chassis = this.getView().getModel("SearchViewModel").getProperty("/Chassisno");
			if (chassis) {
				this.QuickSearch.close();
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("GenerateReq", false);
				this.getView().getModel("VIRGlobalModel").setProperty("/Expanded", false);
			} else {
				sap.m.MessageToast.show("Please search the Customer");
			}

		},
		onPressReset: function () {
			sap.m.MessageBox.confirm(
				"Are you sure want to Reset?", {
				icon: sap.m.MessageBox.Icon.CONFIRM,
				title: "Reset",
				class: "sapUiSizeCompact",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === "YES") {
						this._ModelInitialLoad();
						this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "");
						this.getView().getModel("VIRGlobalModel").setProperty("/PlateNo", "");
						this.getView().getModel("VIRGlobalModel").setProperty("/Bay", "");
						this.getView().getModel("VIRGlobalModel").setProperty("/Platecolor", "");
					}
				}.bind(this)
			});

		},

		navigateToList:function(){
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("VIR.controller.List", true);
		}


	});
});