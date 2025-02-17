sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/UIComponent"
], function (Controller, MessageBox, UIComponent) {
	"use strict";

	return Controller.extend("VIR.controller.Search", {
		onPressGenerateRequest: function () {
			//
			// if (!this.GENReqFrag) {
			// 	this.GENReqFrag = sap.ui.xmlfragment("VIR.fragment.GenerateRequest", this);
			// 	this.getView().addDependent(this.GENReqFrag);
			// }
			// this.GENReqFrag.open();

			// var arr = [{
			// 	"Material": "2700000290",
			// 	"ServiceName": "Re-New",
			// 	"Price": "165",
			// 	"VATPer": "5",
			// 	"VAT": "8.25",
			// 	"TotalAmount": "173.25"

			// }];

			// this.getView().getModel("SearchViewModel").setProperty("/ServiceItems", arr);
			// this.getView().getModel("SearchViewModel").setProperty("/SavebtnVisible", true);
			// this.getView().getModel("SearchViewModel").setProperty("/PaybtnVisible", false);
			// this.getView().getModel("SearchViewModel").setProperty("/PrintbtnVisible", false);
			// this.getView().getModel("SearchViewModel").setProperty("/SR", "");
			// // this.getView().getModel("SearchViewModel").setProperty("/MObileNo", "");
			// this.getView().getModel("SearchViewModel").setProperty("/MOPType", "");
			var Purpose = this.getView().getModel("VIRGlobalModel").getProperty("/Purpose");
			if (Purpose) {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("GenerateReq", false);
				this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileUpdated", false);
				this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileNotUpdated", true);
			} else {
				sap.m.MessageToast.show("Please Select Purpose");
			}

		},
		onPressCreateCustomer: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("CreateCustomer", false);
		},
		onpressgetesma: function () {
			var inpplateno = this.getView().getModel("VIRGlobalModel").getProperty("/unRegplateno");
			if (inpplateno) {
				this.getView().getModel("VIRGlobalModel").setProperty("/PlateNo", "60001");
				this.UnregisterFrag.close();
				this.onPressAdpolice();
				var arrServiceItems = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
				arrServiceItems = [{
					"Material": "2700000292",
					"ServiceName": "UAE Standards",
					"Price": "330",
					"VATPer": "0",
					"VAT": "0",
					"TotalAmount": "330"
				}, {
					"Material": "2700000296",
					"ServiceName": "UAE Standard with Vehicle Reg",
					"Price": "165",
					"VATPer": "0",
					"VAT": "0",
					"TotalAmount": "165"
				}];
				this.getView().getModel("VIRGlobalModel").setProperty("/ServiceItems", arrServiceItems);
			} else {
				sap.m.MessageToast.show("Please enter Certificate Number");
			}
		},
		onConfirmMaterial: function (oEvent) {
			var MaterialObj = oEvent.getParameter("selectedItem").getBindingContext("SearchViewModel").getObject();
			var ServiceItemsarr = this.getView().getModel("SearchViewModel").getProperty("/ServiceItems");
			var obj = {
				"ServiceName": MaterialObj.Material,
				"Price": MaterialObj.Price,
				"VATPer": MaterialObj.VATPer,
				"VAT": MaterialObj.VAT,
				"TotalAmount": MaterialObj.TotalAmount
			};
			ServiceItemsarr.push(obj);

			this.getView().getModel("SearchViewModel").setProperty("/ServiceItems", ServiceItemsarr);
			var sum = ServiceItemsarr.map(o => o.TotalAmount).reduce((a, c) => {
				return parseFloat(a) + parseFloat(c)
			});
			var vat = ServiceItemsarr.map(o => o.VAT).reduce((a, c) => {
				return parseFloat(a) + parseFloat(c)
			});
			this.getView().getModel("SearchViewModel").setProperty("/VatAmount", parseFloat(vat).toFixed(2));
			this.getView().getModel("SearchViewModel").setProperty("/TotalAmount", parseFloat(sum).toFixed(2));

		},
		onDeleteItems: function (oEvent) {
			var Path = oEvent.getSource().getBindingContext("SearchViewModel").getPath();
			var vIndex = parseInt(Path.substring(Path.lastIndexOf('/') + 1));
			var oModel = this.getView().getModel("SearchViewModel");
			sap.m.MessageBox.confirm(
				"Are you sure want to Delete?", {
				icon: sap.m.MessageBox.Icon.CONFIRM,
				title: "Confirmation",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === "YES") {
						var data = oModel.getProperty("/ServiceItems");
						data.splice(vIndex, 1);

						oModel.setProperty("/ServiceItems", data);
						if (data.length !== 0) {
							var sum = data.map(o => o.TotalAmount).reduce((a, c) => {
								return parseFloat(a) + parseFloat(c)
							});
							var vat = data.map(o => o.VAT).reduce((a, c) => {
								return parseFloat(a) + parseFloat(c)
							});
							this.getView().getModel("SearchViewModel").setProperty("/VatAmount", parseFloat(vat).toFixed(2));
							this.getView().getModel("SearchViewModel").setProperty("/TotalAmount", parseFloat(sum).toFixed(2));
						} else {
							this.getView().getModel("SearchViewModel").setProperty("/TotalAmount", "0.00");
							this.getView().getModel("SearchViewModel").setProperty("/VatAmount", "0.00");

						}

					} else if (oAction === "NO") { }
				}.bind(this)
			});

		},
		onCloseCart: function () {

			sap.m.MessageBox.confirm(
				"Are you sure want to close?", {
				icon: sap.m.MessageBox.Icon.CONFIRM,
				title: "Confirmation",
				class: "sapUiSizeCompact",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === "YES") {
						this.GENReqFrag.close();
					}
				}.bind(this)
			});
		},
		onPressPay: function () {
			// sap.m.MessageBox.success(
			// 	"Order No: 39921047 generated Successfully.", {
			// 		icon: sap.m.MessageBox.Icon.CONFIRM,
			// 		title: "Success",
			// 		actions: [sap.m.MessageBox.Action.OK, "Print"],
			// 		class: "sapUiSizeCompact",
			// 		onClose: function(oAction) {
			// 			if (oAction === "OK") {
			// 				this.PaymentFrag.close();
			// 				var oRouter = UIComponent.getRouterFor(this);
			// 				oRouter.navTo("View1", false);
			// 			}
			// 		}.bind(this)
			// 	});

			sap.m.MessageToast.show("Payment Completed Successfully");

			// var oRouter = UIComponent.getRouterFor(this);
			// oRouter.navTo("Search", false);
			this.GENReqFrag.close();
			this._ModelInitialLoad();
			this.getView().getModel("SearchViewModel").setProperty("/Purpose", "");
			this.getView().getModel("SearchViewModel").setProperty("/Bay", "");

		},
		onPressSave: function () {

			var vMObileNo = this.getView().getModel("SearchViewModel").getProperty("/MObileNo");
			var vMOPType = this.getView().getModel("SearchViewModel").getProperty("/MOPType");
			if (vMObileNo &&
				vMOPType) {
				sap.m.MessageBox.success(
					"Order No: 39921047 generated Successfully.", {
					icon: sap.m.MessageBox.Icon.CONFIRM,
					title: "Success",
					class: "sapUiSizeCompact",
					actions: ["Print", "Close"],
					onClose: function (oAction) {

					}.bind(this)
				});

				// sap.m.MessageToast.show("Request ID: 39921047 generated Successfully.");
				this.getView().getModel("SearchViewModel").setProperty("/SR", "39921047");
				this.getView().getModel("SearchViewModel").setProperty("/SavebtnVisible", false);
				this.getView().getModel("SearchViewModel").setProperty("/PaybtnVisible", true);
				this.getView().getModel("SearchViewModel").setProperty("/PrintbtnVisible", true);
			} else {
				sap.m.MessageToast.show("Please Enter Customer Mob No and MOP Type.");
			}
			// this.GENReqFrag.close();
			// if (!this.PaymentFrag) {
			// 	this.PaymentFrag = sap.ui.xmlfragment("VIR.fragment.Payment", this);
			// 	this.getView().addDependent(this.PaymentFrag);
			// }
			// this.PaymentFrag.open();
		},
		onExit: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("View1", false);
		},
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
			var that = this;
			var intervalId = window.setInterval(function () {
				// id = id + 1;
				// sap.m.MessageToast.show("Test" + " " + id);

				// if (id === 7) {
				// 	clearInterval(intervalId);
				// }
				that.onpressAnpr();
			}, 6000);
			this.fncountdown(5);
		},
		handleRouteMatched: function (oEvent) {
			var pupose = this.getView().getModel("VIRGlobalModel").getProperty("/Purpose");
			if (oEvent.getParameter("name") === "Search") {
				this._ModelInitialLoad();
				this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "");
				this.getView().getModel("VIRGlobalModel").setProperty("/PlateNo", "");
				// this.getView().getModel("VIRGlobalModel").setProperty("/Bay", "");
				this.getView().getModel("VIRGlobalModel").setProperty("/Platecolor", "");
				if (pupose === "Re-Test") {
					if (!this.RetestFrag) {
						this.RetestFrag = sap.ui.xmlfragment("VIR.fragment.Retest1", this);
						this.getView().addDependent(this.RetestFrag);
					}
					this.RetestFrag.open();
				} else if (pupose === "ESMA Test") {
					if (!this.UnregisterFrag) {
						this.UnregisterFrag = sap.ui.xmlfragment("VIR.fragment.Unregister", this);
						this.getView().addDependent(this.UnregisterFrag);
					}
					this.UnregisterFrag.open();
				}
			}
		},
		// onAfterRendering: function() {
		// 	this._ModelInitialLoad();
		// },
		_ModelInitialLoad: function () {

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

		},
		onPressAdpolice: function () {

			var vPlateNum = this.getView().getModel("VIRGlobalModel").getProperty("/PlateNo");
			if (vPlateNum) {

				this.getView().getModel("SearchViewModel").setProperty("/Chassisno", "JTEBU25J9959041");
				this.getView().getModel("VIRGlobalModel").setProperty("/Chassisno", "JTEBU25J9959041");
				this.getView().getModel("SearchViewModel").setProperty("/Engineno", "1GR5709102");
				this.getView().getModel("VIRGlobalModel").setProperty("/Engineno", "1GR5709102");
				this.getView().getModel("SearchViewModel").setProperty("/Country", "Germany");
				this.getView().getModel("VIRGlobalModel").setProperty("/Country", "Germany");
				this.getView().getModel("SearchViewModel").setProperty("/Manufacturer", "Toyota");
				this.getView().getModel("VIRGlobalModel").setProperty("/Manufacturer", "Toyota");
				this.getView().getModel("SearchViewModel").setProperty("/Model", "Fortuner");
				this.getView().getModel("VIRGlobalModel").setProperty("/Model", "Fortuner");
				this.getView().getModel("SearchViewModel").setProperty("/Kind", "SUV");
				this.getView().getModel("VIRGlobalModel").setProperty("/Kind", "SUV");
				this.getView().getModel("SearchViewModel").setProperty("/Type", "Light Vehicle");
				this.getView().getModel("VIRGlobalModel").setProperty("/Type", "Light Vehicle");
				this.getView().getModel("SearchViewModel").setProperty("/BodyColor", "White");
				this.getView().getModel("VIRGlobalModel").setProperty("/BodyColor", "White");
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
				this.getView().getModel("VIRGlobalModel").setProperty("/PlateType", "Private");
				this.getView().getModel("SearchViewModel").setProperty("/MFGYear", "2024");
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
				this.getView().getModel("VIRGlobalModel").setProperty("/Manufacturer", "Fortuner");
				this.getView().getModel("VIRGlobalModel").setProperty("/Kind", "SUV");
				this.getView().getModel("VIRGlobalModel").setProperty("/BodyColor", "White");
				this.getView().getModel("VIRGlobalModel").setProperty("/MFGYear", "2024")
				this.getView().getModel("VIRGlobalModel").setProperty("/PlSource", "ABU DHABHI-PRIVATE")

				//
				this.getView().getModel("SearchViewModel").setProperty("/NewChassisno", "JTEBU25J9959041");
				this.getView().getModel("SearchViewModel").setProperty("/NewEngineno", "1GR5709102");
				this.getView().getModel("SearchViewModel").setProperty("/NewCountry", "Germany");
				this.getView().getModel("SearchViewModel").setProperty("/NewManufacturer", "Fortuner");
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
				var Purpose = this.getView().getModel("VIRGlobalModel").getProperty("/Purpose");
				if (!inpplateno && !Purpose) {
					if (!this.PurposeFrag) {
						this.PurposeFrag = sap.ui.xmlfragment("VIR.fragment.Purpose", this);
						this.getView().addDependent(this.PurposeFrag);
					}
					this.PurposeFrag.open();
				} else if (inpplateno) {
					this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "ESMA Test");
					var oRouter = UIComponent.getRouterFor(this);
					oRouter.navTo("GenerateReq", false);
					this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileUpdated", false);
					this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileNotUpdated", true);
				} else if (Purpose) {
					var oRouter = UIComponent.getRouterFor(this);
					oRouter.navTo("GenerateReq", false);
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
		onChangePurpose: function (oEvent) {
			var Purpose = oEvent.getSource().getSelectedKey();
			var arrServiceItems = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
			if (Purpose === "Re-New") {
				this.getView().getModel("SearchViewModel").setProperty("/mainpurpose", "1 - Full Test");
				this.getView().getModel("SearchViewModel").setProperty("/Source", "1 - Abu Dhabi");
				this.getView().getModel("SearchViewModel").setProperty("/Queue", "1");
				this.getView().getModel("SearchViewModel").setProperty("/Lane", "1");
				this.getView().getModel("SearchViewModel").setProperty("/4Wheel", "Yes");
			} else {

			}
			arrServiceItems = [];
			this.getView().getModel("VIRGlobalModel").setProperty("/ServiceItems", arrServiceItems);

		},
		onOpenMaterialF4: function () {
			if (!this.MaterialFrag) {
				this.MaterialFrag = sap.ui.xmlfragment("VIR.fragment.Material", this);
				this.getView().addDependent(this.MaterialFrag);
			}
			this.MaterialFrag.open();
			var AccessoriesItems = sap.ui.getCore().byId("id_AccessoriesF4").getSelectedItems();
			var VehicleItems = sap.ui.getCore().byId("id_VehicletestF4").getSelectedItems();
			var PermitItems = sap.ui.getCore().byId("id_PermitF4").getSelectedItems();
			var OtherItems = sap.ui.getCore().byId("id_OtherF4").getSelectedItems();

			for (var a = 0; a < AccessoriesItems.length; a++) {
				AccessoriesItems[a].setSelected(false);
			}
			for (var b = 0; b < VehicleItems.length; b++) {
				VehicleItems[b].setSelected(false);
			}
			for (var c = 0; c < PermitItems.length; c++) {
				PermitItems[c].setSelected(false);
			}
			for (var d = 0; d < OtherItems.length; d++) {
				OtherItems[d].setSelected(false);
			}
		},
		onSelectUnregister: function () {
			if (!this.UnregisterFrag) {
				this.UnregisterFrag = sap.ui.xmlfragment("VIR.fragment.Unregister", this);
				this.getView().addDependent(this.UnregisterFrag);
			}
			this.UnregisterFrag.open();
			this.getView().getModel("VIRGlobalModel").setProperty("/unRegplateno", "");
		},
		onCloseUnregister: function () {
			this.UnregisterFrag.close();
			this.getView().getModel("SearchViewModel").setProperty("/Unregister", false);
		},
		onpressAnpr: function () {
			var vPlateNo = this.getView().getModel("VIRGlobalModel").getProperty("/PlateNo");
			this.getView().getModel("ZSB_LANEANPR_V2").read("/LaneANPR", {

				success: function (oData, oResponse) {
					if (vPlateNo === "") {
						this.getView().getModel("VIRGlobalModel").setProperty("/PlateNo", oData.results[0].Platenum);
						this.getView().getModel("VIRGlobalModel").setProperty("/Bay", oData.results[0].Lane);
						this.getView().getModel("VIRGlobalModel").setProperty("/Platecolor", oData.results[0].Platecolor);
					}
					this.fncountdown(5);
				}.bind(this),
				error: function (oError) {
					// MessageBox.error(oError.message);
				}
			});
		},
		onClosematerialf4: function () {
			this.MaterialFrag.close();
		},
		onPressSeletMaterial: function () {
			var AccessoriesItems = sap.ui.getCore().byId("id_AccessoriesF4").getSelectedItems();
			var VehicleItems = sap.ui.getCore().byId("id_VehicletestF4").getSelectedItems();
			var PermitItems = sap.ui.getCore().byId("id_PermitF4").getSelectedItems();
			var OtherItems = sap.ui.getCore().byId("id_OtherF4").getSelectedItems();
			var ClubItems = [];
			ClubItems = AccessoriesItems.concat(VehicleItems, PermitItems, OtherItems);
			var ServiceItemsarr = this.getView().getModel("SearchViewModel").getProperty("/ServiceItems");
			if (ClubItems.length === 0) {
				sap.m.MessageToast.show("Please select atleast one material.");
			} else {
				for (var i = 0; i < ClubItems.length; i++) {
					var quantity = 1;
					var price = parseFloat(ClubItems[i].getBindingContext("SearchViewModel").getObject().Price);
					var vat = price * 0.05;
					var Total = parseFloat(price) + parseFloat(vat);

					var obj = {
						"Material": ClubItems[i].getBindingContext("SearchViewModel").getObject().Material,
						"ServiceName": ClubItems[i].getBindingContext("SearchViewModel").getObject().ServiceName,
						"Qty": quantity,
						"QtyInd": ClubItems[i].getBindingContext("SearchViewModel").getObject().QtyInd,
						"Price": ClubItems[i].getBindingContext("SearchViewModel").getObject().Price,
						"VATPer": ClubItems[i].getBindingContext("SearchViewModel").getObject().VATPer,
						"VAT": parseFloat(vat).toFixed(2),
						"TotalAmount": parseFloat(Total).toFixed(2),
					};
					ServiceItemsarr.push(obj);
				}
				this.getView().getModel("SearchViewModel").setProperty("/ServiceItems", ServiceItemsarr);
				var sum = ServiceItemsarr.map(o => o.TotalAmount).reduce((a, c) => {
					return parseFloat(a) + parseFloat(c)
				});
				var vat = ServiceItemsarr.map(o => o.VAT).reduce((a, c) => {
					return parseFloat(a) + parseFloat(c)
				});
				this.getView().getModel("SearchViewModel").setProperty("/VatAmount", parseFloat(vat).toFixed(2));
				this.getView().getModel("SearchViewModel").setProperty("/TotalAmount", parseFloat(sum).toFixed(2));
				this.MaterialFrag.close();
			}
		},
		onPressChange: function () {
			if (!this.ChangeinfoFrag) {
				this.ChangeinfoFrag = sap.ui.xmlfragment("VIR.fragment.ChangeInfo", this);
				this.getView().addDependent(this.ChangeinfoFrag);
			}
			this.ChangeinfoFrag.open();
		},
		onCloseChangeinfof4: function () {
			this.ChangeinfoFrag.close();
		},
		openCountryF4: function () {
			if (!this.CountryF4Frag) {
				this.CountryF4Frag = sap.ui.xmlfragment("VIR.fragment.CountryF4", this);
				this.getView().addDependent(this.CountryF4Frag);
			}
			this.CountryF4Frag.open();
		},
		openManufacturerF4: function () {
			if (!this.ManufactureF4Frag) {
				this.ManufactureF4Frag = sap.ui.xmlfragment("VIR.fragment.ManfacturerF4", this);
				this.getView().addDependent(this.ManufactureF4Frag);
			}
			this.ManufactureF4Frag.open();
		},
		openModelF4: function () {
			if (!this.ModelF4Frag) {
				this.ModelF4Frag = sap.ui.xmlfragment("VIR.fragment.ModelF4", this);
				this.getView().addDependent(this.ModelF4Frag);
			}
			this.ModelF4Frag.open();
		},
		openColorF4: function () {
			if (!this.ColorF4Frag) {
				this.ColorF4Frag = sap.ui.xmlfragment("VIR.fragment.ColorF4", this);
				this.getView().addDependent(this.ColorF4Frag);
			}
			this.ColorF4Frag.open();
		},
		onManfacturerConfirm: function (oEvent) {
			var oModel = this.getView().getModel("CreateCustomerModel");
			oModel.setProperty("/CV_Model", "");
			var manuf = oEvent.getParameter("selectedItem").getBindingContext("CreateCustomerModel").getObject().Manufacturer;
			// oModel.getData().CV_Manufacturer = manuf;
			oEvent.getSource().getBinding("items").filter([]);

			var ModelF4Set = oModel.getProperty("/ModelF4");
			var aManufactureModel = [];

			aManufactureModel = ModelF4Set.filter(function (e) {
				return e.Manufacturer === manuf;
			});
			oModel.setProperty("/ModelF4", aManufactureModel);
			this.getView().getModel("SearchViewModel").setProperty("/NewManufacturer", manuf);
			oModel.refresh();
		},
		onCountryconfirm: function (oEvent) {
			var vCountry = oEvent.getParameter("selectedItem").getBindingContext("CreateCustomerModel").getObject().Country;
			this.getView().getModel("SearchViewModel").setProperty("/NewCountry", vCountry);
			oEvent.getSource().getBinding("items").filter([]);
		},
		onModelConfirm: function (oEvent) {
			var vmodel = oEvent.getParameter("selectedItem").getBindingContext("CreateCustomerModel").getObject().Model;
			this.getView().getModel("SearchViewModel").setProperty("/NewModel", vmodel);
			oEvent.getSource().getBinding("items").filter([]);
		},
		onColoronfirm: function (oEvent) {
			var vcolor = oEvent.getParameter("selectedItem").getBindingContext("CreateCustomerModel").getObject().Color;
			this.getView().getModel("SearchViewModel").setProperty("/NewBodyColor", vcolor);
			oEvent.getSource().getBinding("items").filter([]);
		},
		onpressretest1: function () {
			if (!this.RetestFrag) {
				this.RetestFrag = sap.ui.xmlfragment("VIR.fragment.Retest1", this);
				this.getView().addDependent(this.RetestFrag);
			}
			this.RetestFrag.open();

			var platenum = this.getView().getModel("VIRGlobalModel").getProperty("/PlateNo");
			this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "Re-Test");
			// var currdate = new Date();
			if (platenum === "") {
				this.getView().getModel("VIRGlobalModel").setProperty("/Retest", []);
			} else if (platenum === "72819") {
				// var Freshtestdat = currdate.setDate(currdate.getDate() - 18);
				// var DateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				// 	pattern: "dd-MM-yyyy"
				// });
				// Freshtestdat = DateFormat.format(Freshtestdat);
				var arr = [{
					"OrderNo": "302434253",
					"OrderDate": "07/07/2024",
					"Plateno": "72819",
					"PlateC": "Seventh Category",
					"Source": "ABU DHABHI",
					"Kind": "Private"
				}];
				this.getView().getModel("VIRGlobalModel").setProperty("/Retest", arr);
			} else if (platenum === "12121") {

				// var Freshtestdat = currdate - 40;
				// var DateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				// 	pattern: "dd-MM-yyyy"
				// });
				// var Retest1dat = currdate - 15;
				// Freshtestdat = DateFormat.format(Freshtestdat);
				// Retest1dat = DateFormat.format(Retest1dat);
				var arr = [{
					"OrderNo": "302434253",
					"OrderDate": "10/06/2024",
					"Plateno": "12121",
					"PlateC": "Seventh Category",
					"Source": "ABU DHABHI",
					"Kind": "Private",
					"Service": "Re-New"
				}, {
					"OrderNo": "302422940",
					"OrderDate": "04/07/2024",
					"Plateno": "12121",
					"PlateC": "Seventh Category",
					"Source": "ABU DHABHI",
					"Kind": "Private",
					"Service": "Re Test1"
				}];
				this.getView().getModel("VIRGlobalModel").setProperty("/Retest", arr);
			} else if (platenum === "21212") {
				var arr = [{
					"OrderNo": "302434253",
					"OrderDate": "15/05/2024",
					"Plateno": "21212",
					"PlateC": "Seventh Category",
					"Source": "ABU DHABHI",
					"Kind": "Private",
					"Service": "Re-New"
				}, {
					"OrderNo": "302422940",
					"OrderDate": "04/06/2024",
					"Plateno": "21212",
					"PlateC": "Seventh Category",
					"Source": "ABU DHABHI",
					"Kind": "Private",
					"Service": "Re Test1"
				}, {
					"OrderNo": "342145678",
					"OrderDate": "08/07/2024",
					"Plateno": "21212",
					"PlateC": "Seventh Category",
					"Source": "ABU DHABHI",
					"Kind": "Private",
					"Service": "Re Test2"
				}];
				this.getView().getModel("VIRGlobalModel").setProperty("/Retest", arr);
			}
		},
		onCloseRetest: function () {
			this.RetestFrag.close();
		},
		onpressSearch: function () {
			var platenum = this.getView().getModel("SearchViewModel").getProperty("/RetestPlatenum");
			if (platenum) {
				var arr = [{
					"OrderNo": "302434253",
					"OrderDate": "07/07/2024",
					"Plateno": platenum,
					"PlateC": "Seventh Category",
					"Source": "ABU DHABHI",
					"Kind": "Private",
					"Service": "Re-New"
				}];
				this.getView().getModel("VIRGlobalModel").setProperty("/Retest", arr);
				this.getView().getModel("VIRGlobalModel").setProperty("/PlateNo", platenum);
			} else {
				sap.m.MessageToast.show("Please enter Plate no");
			}
		},
		onpresstoRetest: function () {
			var platenum = this.getView().getModel("VIRGlobalModel").getProperty("/PlateNo");
			if (platenum) {
				var retestarr = this.getView().getModel("VIRGlobalModel").getProperty("/Retest");
				// this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "Re-New");
				if (retestarr.length <= 2) {
					if (this.RetestFrag) {
						this.RetestFrag.close();
					}
					var arrServiceItems = [{
						"Material": "2700000291",
						"ServiceName": "Re-Test",
						"Price": "165",
						"VATPer": "5",
						"VAT": "8.25",
						"TotalAmount": "173.25"
					}];
					this.getView().getModel("VIRGlobalModel").setProperty("/ServiceItems", arrServiceItems);
					var oRouter = UIComponent.getRouterFor(this);
					oRouter.navTo("GenerateReq", false);
					this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileUpdated", false);
					this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileNotUpdated", true);
					this.getView().getModel("VIRGlobalModel").setProperty("/HeaderCustomerNo", "10033281");
					this.getView().getModel("VIRGlobalModel").setProperty("/CustomerName", "Ahmed Asad");
					var phone = "+971 508200365";
					phone = phone.replace(phone.substring(5, 11), "******");
					this.getView().getModel("VIRGlobalModel").setProperty("/MObileNo", phone);
					var prevorder = "";
					for (var i = 0; i < retestarr.length; i++) {
						if (prevorder) {
							prevorder = prevorder + " -> " + retestarr[i].OrderNo;
						} else {
							prevorder = retestarr[i].OrderNo;
						}
					}
					this.getView().getModel("VIRGlobalModel").setProperty("/PrevOrder", prevorder);
				} else {
					sap.m.MessageToast.show("Only 2 Restests are allowed. Please enter Fresh Test");
				}
			} else {
				sap.m.MessageToast.show("Please Search with Plate no to proceed.");
			}

		},
		onConfirmpurpose: function (oEvent) {
			var PurposeObj = oEvent.getSource().getTitle();
			this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", PurposeObj);
			var arrServiceItems = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
			if (PurposeObj === "ESMA Test") {
				arrServiceItems = [];
			} else if (PurposeObj === "Permit" || PurposeObj === "Safety Items") {
				arrServiceItems = [];
			} else {
				arrServiceItems = [];
			}

			this.getView().getModel("VIRGlobalModel").setProperty("/ServiceItems", arrServiceItems);
			this.PurposeFrag.close();
			if (PurposeObj !== "Re-Test") {
				// var oRouter = UIComponent.getRouterFor(this);
				// oRouter.navTo("GenerateReq", false);
			} else {
				var platenum = this.getView().getModel("VIRGlobalModel").getProperty("/PlateNo");

				if (platenum === "") {
					this.getView().getModel("VIRGlobalModel").setProperty("/Retest", []);
				} else if (platenum === "72819") {
					var arr = [{
						"OrderNo": "302434253",
						"OrderDate": "07/07/2024",
						"Plateno": "72819",
						"PlateC": "Seventh Category",
						"Source": "ABU DHABHI",
						"Kind": "Private"
					}];
					this.getView().getModel("VIRGlobalModel").setProperty("/Retest", arr);
				} else if (platenum === "12121") {
					var arr = [{
						"OrderNo": "302434253",
						"OrderDate": "10/06/2024",
						"Plateno": "12121",
						"PlateC": "Seventh Category",
						"Source": "ABU DHABHI",
						"Kind": "Private",
						"Service": "Re-New"
					}, {
						"OrderNo": "302422940",
						"OrderDate": "04/07/2024",
						"Plateno": "12121",
						"PlateC": "Seventh Category",
						"Source": "ABU DHABHI",
						"Kind": "Private",
						"Service": "Re Test1"
					}];
					this.getView().getModel("VIRGlobalModel").setProperty("/Retest", arr);
				} else if (platenum === "21212") {
					var arr = [{
						"OrderNo": "302434253",
						"OrderDate": "15/05/2024",
						"Plateno": "21212",
						"PlateC": "Seventh Category",
						"Source": "ABU DHABHI",
						"Kind": "Private",
						"Service": "Re-New"
					}, {
						"OrderNo": "302422940",
						"OrderDate": "04/06/2024",
						"Plateno": "21212",
						"PlateC": "Seventh Category",
						"Source": "ABU DHABHI",
						"Kind": "Private",
						"Service": "Re Test1"
					}, {
						"OrderNo": "342145678",
						"OrderDate": "08/07/2024",
						"Plateno": "21212",
						"PlateC": "Seventh Category",
						"Source": "ABU DHABHI",
						"Kind": "Private",
						"Service": "Re Test2"
					}];
					this.getView().getModel("VIRGlobalModel").setProperty("/Retest", arr);
				}
				this.onpresstoRetest();
			}
		},
		onClosePurpose: function () {
			this.PurposeFrag.close();
		},
		fncountdown: function (seconds) {
			var that = this;
			// var model = ;
			var intervalId = window.setInterval(function () {
				that.getView().getModel("VIRGlobalModel").setProperty("/secs", seconds);
				seconds--;
				if (seconds === 0) {
					clearInterval(intervalId);
					// that.getView().getModel("VIRGlobalModel").setProperty("/secs", "0");
				}
			}, 1000);

		},
		onPressProceed: function () {
			var Purpose = this.getView().getModel("VIRGlobalModel").getProperty("/Purpose");
			var inpplateno = this.getView().getModel("VIRGlobalModel").getProperty("/PlateNo");
			var Chassisno = this.getView().getModel("VIRGlobalModel").getProperty("/Chassisno");
			if (Purpose && inpplateno) {
				if (Chassisno) {
					var oRouter = UIComponent.getRouterFor(this);
					oRouter.navTo("GenerateReq", false);
					this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileUpdated", false);
					this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileNotUpdated", true);
				} else {
					sap.m.MessageToast.show("Please fetch Vehicle Details");
				}
			} else {
				if (!inpplateno && !Purpose) {
					sap.m.MessageToast.show("Please provide Plate No and Purpose");
				} else if (inpplateno && !Purpose) {
					sap.m.MessageToast.show("Please provide Purpose");
				} else if (!inpplateno && Purpose) {
					sap.m.MessageToast.show("Please provide Plate No");
				}

			}

		},

	});

});