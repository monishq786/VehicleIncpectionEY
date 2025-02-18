sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	'sap/ui/core/Fragment'
], function (Controller, UIComponent, Fragment) {
	"use strict";

	return Controller.extend("VIR.controller.GenerateReq", {
		onInit: function () {

			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
			
		},
		handleRouteMatched: function (oEvent) {
			if (oEvent.getParameter("name") === "GenerateReq") {
				// var ServiceItemsarr = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");

				// if (ServiceItemsarr.length !== 0) {
				// 	var sum = ServiceItemsarr.map(o => o.TotalAmount).reduce((a, c) => {
				// 		return parseFloat(a) + parseFloat(c)
				// 	});
				// 	var vat = ServiceItemsarr.map(o => o.VAT).reduce((a, c) => {
				// 		return parseFloat(a) + parseFloat(c)
				// 	});
				// 	var that = this;
				// 	this.intervalHandle = setTimeout(function () {
				// 		that.getView().getModel("SearchViewModel").setProperty("/VatAmount", parseFloat(vat).toFixed(2));
				// 		that.getView().getModel("SearchViewModel").setProperty("/TotalAmount", parseFloat(sum).toFixed(2));
				// 	}, 300);
				// } else {
				// 	this.getView().getModel("SearchViewModel").setProperty("/VatAmount", "0.00");
				// 	this.getView().getModel("SearchViewModel").setProperty("/TotalAmount", "0.00");
				// }
				// var SR = this.getView().getModel("VIRGlobalModel").getProperty("/SR");
				// var ESMAflag = "";
				// var trafficflag = "";
				// var Compreflag = "";
				// if (SR) {
				// 	for (var i = 0; i < ServiceItemsarr.length; i++) {
				// 		if (ServiceItemsarr[i].ServiceName === "ESMA Test") {
				// 			ESMAflag = "X";
				// 		} else if (ServiceItemsarr[i].ServiceName === "Traffic Test") {
				// 			trafficflag = "X";
				// 		} else if (ServiceItemsarr[i].ServiceName === "Comprehensive Test") {
				// 			Compreflag = "X";
				// 		}

				// 	}
				// 	if (ESMAflag) {
				// 		this.getView().getModel("SearchViewModel").setProperty("/ESMABtnVisible", true);
				// 	}
				// 	if (trafficflag) {
				// 		this.getView().getModel("SearchViewModel").setProperty("/TraffictestbtnVisible", true);
				// 	}
				// 	if (Compreflag) {
				// 		this.getView().getModel("SearchViewModel").setProperty("/ComprehensivetestbtnVisible", true);
				// 	}
				// 	this.getView().getModel("SearchViewModel").setProperty("/SavebtnVisible", false);
				// 	this.getView().getModel("SearchViewModel").setProperty("/PrintbtnVisible", true);
				// 	this.getView().getModel("SearchViewModel").setProperty("/PaybtnVisible", true);
				// 	this.getView().getModel("VIRGlobalModel").setProperty("/SecMobileNo", "504325156");
				// }

				// var vPurpose = this.getView().getModel("VIRGlobalModel").getProperty("/Purpose");
				// if (vPurpose === "Permit" || vPurpose === "Safety Items") {

				// 	if (!this.MaterialFrag) {
				// 		this.MaterialFrag = sap.ui.xmlfragment("VIR.fragment.Material", this);
				// 		this.getView().addDependent(this.MaterialFrag);
				// 	}
				// 	this.MaterialFrag.open();
				// 	if (vPurpose === "Permit") {
				// 		sap.ui.getCore().byId("id_MaterialIcontabbar").setSelectedKey("Permit");
				// 	} else {
				// 		sap.ui.getCore().byId("id_MaterialIcontabbar").setSelectedKey("Accessories");
				// 	}
				// }

				var test = this.getView().getModel("VIRGlobalModel").getProperty("/CurrTest");
				if (test === "Permit") {
					this.getView().getModel("SearchViewModel").setProperty("/FreshTestTabVisible", false);
					this.getView().getModel("SearchViewModel").setProperty("/PermitIconTabVisible", true);
				} else if (test === "Safety Items" || test === "Safety Test") {
					this.getView().getModel("SearchViewModel").setProperty("/FreshTestTabVisible", false);
					this.getView().getModel("SearchViewModel").setProperty("/PermitIconTabVisible", false);
				}
				else if (test === "Fresh Test") {
					this.getView().getModel("SearchViewModel").setProperty("/PermitIconTabVisible", false);
					this.getView().getModel("SearchViewModel").setProperty("/FreshTestTabVisible", true);
				} else {
					this.getView().getModel("SearchViewModel").setProperty("/PermitIconTabVisible", false);
					this.getView().getModel("SearchViewModel").setProperty("/FreshTestTabVisible", true);
				}
			}

		},
		onAfterRendering: function () {
			this._ModelInitialLoad();
		},
		_ModelInitialLoad: function () {
			var oData = {
				"CouponNo": "",
				"CouponAmount": "0",
				"CardAmount": "0",
				"Authcode": "",
				"CashAmount": "0",
				"Loyaltyamount": "0",
				"ChangeInfoBtnVisible": true,
				"Btnenable": false,
				"PermitBtnVisible": false,
				"ESMABtnVisible": false,
				"ESMAPrintBtnVisible": false,
				"PermitColorEditable": false,
				"PermitVehKindEditable": false,
				"PermitFuelTypeEditable": false,

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
				"NewSearchFieldEditable": false,
				"SavebtnVisible": true,
				"PaybtnVisible": false,
				"PrintbtnVisible": false,
				"TraffictestbtnVisible": false,
				"ComprehensivetestbtnVisible": false,
				"IDTypes": [{
					"Type": "Emirates ID"
				}, {
					"Type": "Driver's License"
				}],
				"CertType": [{
					"Type": "Clearance Certificate"
				}, {
					"Type": "Custom"
				}, {
					"Type": "Possesion of Written-off"
				}, {
					"Type": "Transfer"
				}],
				"CertificateItems": [],
				"IdInfoItems": [],
				"ESMATypeF4": [{
					"Type": "Custom"
				}, {
					"Type": "Import"
				}, {
					"Type": "Export"
				}],
				"ESMASourceF4": [{
					"Source": "ABU DHABI"
				}, {
					"Source": "DUBAI"
				}, {
					"Source": "SHARJAH"
				}, {
					"Source": "AJMAN"
				}, {
					"Source": "Umm Al Quwain"
				}, {
					"Source": "Ras Al Khaimah"
				}, {
					"Source": "Fujairah"
				}],
				"ESMAConditionList": [{
					"Selected": false,
					"ConditionText": "Chassis durability and wheel alignment and ball joint",
					"Code": "100001",
					"ArabicTest": "متانة الهيكل ومحاذاة العجلات والمفاصل الكروية"
				}, {
					"Selected": false,
					"ConditionText": "Radiator and air filter compatible with the region's weather",
					"Code": "100002",
					"ArabicTest": "الرادياتير وفلتر الهواء متوافقان مع طقس المنطقة"
				}, {
					"Selected": false,
					"ConditionText": "All lights, signals and horn in working order",
					"Code": "100003",
					"ArabicTest": "جميع الأضواء والإشارات والبوق تعمل بشكل جيد"
				}, {
					"Selected": false,
					"ConditionText": "Exhaust aases within the allowable limits for used vehicles",
					"Code": "100004",
					"ArabicTest": "عوادم السيارات ضمن الحدود المسموح بها للمركبات المستعملة"
				}, {
					"Selected": false,
					"ConditionText": "Suspension system and shock absorbers",
					"Code": "100005",
					"ArabicTest": "نظام التعليق وامتصاص الصدمات"
				}, {
					"Selected": false,
					"ConditionText": "Battery and location safety",
					"Code": "100006",
					"ArabicTest": "سلامة البطارية والموقع"
				}, {
					"Selected": false,
					"ConditionText": "Engine's safety and compatibility to local fuel",
					"Code": "100007",
					"ArabicTest": "سلامة المحرك وتوافقه مع الوقود المحلي"
				}, {
					"Selected": false,
					"ConditionText": "Safety and ease of seat adjustment",
					"Code": "100008",
					"ArabicTest": "السلامة وسهولة تعديل المقعد"
				}, {
					"Selected": false,
					"ConditionText": "Steering system travel safety",
					"Code": "100009",
					"ArabicTest": "نظام التوجيه سلامة السفر"
				}, {
					"Selected": false,
					"ConditionText": "Left hand steering wheel",
					"Code": "100010",
					"ArabicTest": "عجلة القيادة اليسرى"
				}, {
					"Selected": false,
					"ConditionText": "Fire extinguisher available",
					"Code": "100011",
					"ArabicTest": "طفاية حريق متوفرة"
				}],
				"TotalAmount": "52.5",
				"VatAmount": "2.5",
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
				"ServiceItems": [{
					"Material": "2700000290",
					"ServiceName": "Re-New",
					"Price": "50",
					"VATPer": "5",
					"VAT": "2.5",
					"TotalAmount": "52.5"

				}],
				"MOPF4": [{
					"MOP": "Card"
				}, {
					"MOP": "Cash"
				}, {
					"MOP": "ADNOC Wallet"
				}],
				"Accessories": [{
					"Material": "2700000001",
					"ServiceName": "Sticker 3rd Party",
					"Price": "9.52",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "49",
					"QtyInd": "X",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000002",
					"ServiceName": "FIREX-FEX 1KG Powder",
					"Price": "52.38",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "69",
					"QtyInd": "X",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000003",
					"ServiceName": "FIREX-FEX 2KG Powder",
					"Price": "66.67",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "70",
					"QtyInd": "X",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000004",
					"ServiceName": "FIREX-FEX 3KG Powder",
					"Price": "80.95",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "7",
					"QtyInd": "X",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000005",
					"ServiceName": "FIREX-FEX 4KG Powder",
					"Price": "104.76",
					"VATPer": "5",
					"VAT": "8.25",
					"QtyInd": "X",
					"Stock": "23",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000006",
					"ServiceName": "FIREX-FEX 6KG Powder",
					"Price": "123.81",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "48",
					"QtyInd": "X",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000007",
					"ServiceName": "FIREX-Safety Items Bag",
					"Price": "176.19",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "X",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000008",
					"ServiceName": "PERFECT-BOSCH WIPER Blade ECO 14",
					"Price": "114.29",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "X",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000009",
					"ServiceName": "PERFECT-BOSCH WIPER Blade ECO 16",
					"Price": "200",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "X",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000010",
					"ServiceName": "PERFECT-BOSCH WIPER Blade ECO 18",
					"Price": "190.48",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "X",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000011",
					"ServiceName": "OBS-Car Mat",
					"Price": "219.05",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "X",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000012",
					"ServiceName": "OBS-Ceramic Treatment",
					"Price": "333.33",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "X",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}],
				"VehicleTest": [{
					"Material": "2700000056",
					"ServiceName": "New Registration - Fresh Test",
					"ArabicText": "تسجيل جديد-اختبار جديد",
					"Price": "150",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "49",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": "",

				}, {
					"Material": "2700000057",
					"ServiceName": "Re-New - Fresh Test",
					"ArabicText": "إعادة اختبار جديد-جديد",
					"Price": "120",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "69",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": "",

				}, {
					"Material": "2700000058",
					"ServiceName": "Transfer to Other Emirates - Fresh Test",
					"ArabicText": "التحويل إلى الإمارات الأخرى - اختبار جديد",
					"Price": "170",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "70",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": "",

				}, {
					"Material": "2700000059",
					"ServiceName": "Transfer from Private to Public",
					"ArabicText": "التحويل من الخاص إلى العام",
					"Price": "450",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "7",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": "",

				}, {
					"Material": "2700000060",
					"ServiceName": "UAE Standards Service - Fresh Test",
					"ArabicText": "خدمة معايير دولة الإمارات العربية المتحدة – اختبار جديد",
					"Price": "330",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "23",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": "",

				}, {
					"Material": "2700000061",
					"ServiceName": "Export - Fresh Test",
					"ArabicText": "تصدير -اختبار جديد",
					"Price": "100",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "48",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": "",

				}, {
					"Material": "2700000062",
					"ServiceName": "Transfer from Private to Public - Fresh Test",
					"ArabicText": "التحويل من الخاص إلى العام - اختبار جديد",
					"Price": "160",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": "",

				}, {
					"Material": "2700000068",
					"ServiceName": "Transfer from Public to Private - Fresh Test",
					"ArabicText": "التحويل من العام إلى الخاص - اختبار جديد",
					"Price": "195",
					"VATPer": "5",
					"VAT": "8.5",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "178.55",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": "",

				}, {
					"Material": "2700000091",
					"ServiceName": "Tire Test - Fresh Test",
					"ArabicText": "اختبار الإطارات - اختبار جديد",
					"Price": "95",
					"VATPer": "5",
					"VAT": "8.5",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "178.55",
					"Maha": "",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": "",


				}, {
					"Material": "2700000064",
					"ServiceName": "Engine Change Test - Fresh Test",
					"ArabicText": "اختبار تغيير المحرك - اختبار جديد",
					"Price": "325",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": "",

				}, {
					"Material": "2700000065",
					"ServiceName": "Advertisement Stickers Test - Fresh Test",
					"ArabicText": "تسجيل جديد-اختبار جديد",
					"Price": "40",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": "",

				}, {
					"Material": "2700000066",
					"ServiceName": "People with Det. Test - Fresh Test",
					"ArabicText": "اختبار ملصقات الإعلانات - اختبار جديد",
					"Price": "150",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": "",

				}, {
					"Material": "2700000067",
					"ServiceName": "Colour change Test - Fresh Test",
					"ArabicText": "اختبار ملصقات الإعلانات - اختبار جديد",
					"Price": "135",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": "",

				}, {
					"Material": "2700000068",
					"ServiceName": "Vehicle Technical Evaluation - Fresh Test",
					"ArabicText": "اختبار ملصقات الإعلانات - اختبار جديد",
					"Price": "190",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": ""
				}, {
					"Material": "2700000069",
					"ServiceName": "Change Info - Fresh Test",
					"ArabicText": "اختبار ملصقات الإعلانات - اختبار جديد",
					"Price": "160",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": ""
				}, {
					"Material": "270000070",
					"ServiceName": "Install Plate Sport Number - Fresh Test",
					"ArabicText": "اختبار ملصقات الإعلانات - اختبار جديد",
					"Price": "170",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": ""
				}, {
					"Material": "270000071",
					"ServiceName": "Trailer & Semi-Trailer Test - Fresh Test",
					"ArabicText": "اختبار ملصقات الإعلانات - اختبار جديد",
					"Price": "100",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": ""
				}, {
					"Material": "270000073",
					"ServiceName": "Traffic Test - Fresh Test",
					"ArabicText": "اختبار ملصقات الإعلانات - اختبار جديد",
					"Price": "140",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": ""
				}, {
					"Material": "270000075",
					"ServiceName": "Engine Change Test-Out Center  - Fresh Test",
					"ArabicText": "اختبار ملصقات الإعلانات - اختبار جديد",
					"Price": "195",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": ""
				}, {
					"Material": "270000076",
					"ServiceName": "Advertisement Stickers Test-Out Center  - Fresh Test",
					"ArabicText": "اختبار ملصقات الإعلانات - اختبار جديد",
					"Price": "125",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": ""
				}, {
					"Material": "270000078",
					"ServiceName": "Colour change Test-Out Center  - Fresh Test",
					"ArabicText": "اختبار ملصقات الإعلانات - اختبار جديد",
					"Price": "115",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": ""
				}, {
					"Material": "270000079",
					"ServiceName": "Change Info-Out Center  - Fresh Test",
					"ArabicText": "اختبار ملصقات الإعلانات - اختبار جديد",
					"Price": "105",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": ""
				}, {
					"Material": "270000080",
					"ServiceName": "Install Plate Sport Number-Out Center  - Fresh Test",
					"ArabicText": "اختبار ملصقات الإعلانات - اختبار جديد",
					"Price": "80",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": ""
				}, {
					"Material": "270000088",
					"ServiceName": "Comprehensive Test - Fresh Test",
					"ArabicText": "اختبار ملصقات الإعلانات - اختبار جديد",
					"Price": "590",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": ""
				}, {
					"Material": "270000100",
					"ServiceName": "Re-New-Premium service  - Fresh Test",
					"ArabicText": "اختبار ملصقات الإعلانات - اختبار جديد",
					"Price": "600",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Maha": "X",
					"Highlight": "None",
					"Type": "Active",
					"MahaIn": "",
					"MahaOut": ""
				}],
				"Permit": [{
					"Material": "2700000120",
					"ServiceName": "RePrint",
					"Price": "40",
					"VATPer": "5",
					"VAT": "2",
					"Stock": "49",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000121",
					"ServiceName": "Change Info Permit",
					"Price": "40",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "69",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000122",
					"ServiceName": "Change Color",
					"Price": "40",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "70",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000123",
					"ServiceName": "Change Color and Repair",
					"Price": "40",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "7",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000124",
					"ServiceName": "Re Embossed Chassis Number",
					"Price": "50",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "23",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000125",
					"ServiceName": "Change Vehicle Kind",
					"Price": "40",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "48",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000126",
					"ServiceName": "Change Chassis",
					"Price": "40",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000127",
					"ServiceName": "Replace Body",
					"Price": "40",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000128",
					"ServiceName": "Change Info Permit-Out Center",
					"Price": "100",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000129",
					"ServiceName": "Change Color-Out Center",
					"Price": "100",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000130",
					"ServiceName": "Change Color and Repair-Out Center",
					"Price": "100",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}, {
					"Material": "2700000131",
					"ServiceName": "Re Embossed Chassis Number-out Center",
					"Price": "100",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "25",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

				}],
				"Others": [{
					"Material": "2700000232",
					"ServiceName": "Re Print",
					"Price": "100",
					"VATPer": "5",
					"VAT": "8.25",
					"Stock": "49",
					"QtyInd": "",
					"TotalAmount": "173.25",
					"Highlight": "None",
					"Type": "Active"

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
					"Purpose": "Re-Test"
				}, {
					"Purpose": "Permit"
				}, {
					"Purpose": "Short Close Service"
				}, {
					"Purpose": "Safety Items"
				}]

			};

			var MasterViewModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(MasterViewModel, "SearchViewModel");
			var test = this.getView().getModel("VIRGlobalModel").getProperty("/CurrTest");
			if (test === "Permit") {
				this.getView().getModel("SearchViewModel").setProperty("/FreshTestTabVisible", false);
				this.getView().getModel("SearchViewModel").setProperty("/PermitIconTabVisible", true);
			} else if (test === "Safety Items" || test === "Safety Test") {
				this.getView().getModel("SearchViewModel").setProperty("/FreshTestTabVisible", false);
				this.getView().getModel("SearchViewModel").setProperty("/PermitIconTabVisible", false);
			}
			else if (test === "Fresh Test") {
				this.getView().getModel("SearchViewModel").setProperty("/PermitIconTabVisible", false);
				this.getView().getModel("SearchViewModel").setProperty("/FreshTestTabVisible", true);
			} else {
				this.getView().getModel("SearchViewModel").setProperty("/PermitIconTabVisible", false);
				this.getView().getModel("SearchViewModel").setProperty("/FreshTestTabVisible", true);
			}
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
			var that = this;
			var ServiceItemsarr = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
			if (ServiceItemsarr.length !== 0) {
				var sum = ServiceItemsarr.map(o => o.TotalAmount).reduce((a, c) => {
					return parseFloat(a) + parseFloat(c)
				});
				var vat = ServiceItemsarr.map(o => o.VAT).reduce((a, c) => {
					return parseFloat(a) + parseFloat(c)
				});
				this.intervalHandle = setTimeout(function () {
					that.getView().getModel("SearchViewModel").setProperty("/VatAmount", parseFloat(vat).toFixed(2));
					that.getView().getModel("SearchViewModel").setProperty("/TotalAmount", parseFloat(sum).toFixed(2));
				}, 300);
			} else {
				this.getView().getModel("SearchViewModel").setProperty("/VatAmount", "0.00");
				this.getView().getModel("SearchViewModel").setProperty("/TotalAmount", "0.00");
			}
			var oData2 = {
				"File": [],
				"visible": true
			};
			var oModel = new sap.ui.model.json.JSONModel(oData2);
			this.getView().setModel(oModel, "AttachmentModel");

		},
		onPressTraffic: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("TrafficTest", false);
		},
		onOpenMaterialF4: function () {
			if (!this.MaterialFrag) {
				this.MaterialFrag = sap.ui.xmlfragment("VIR.fragment.Material", this);
				this.getView().addDependent(this.MaterialFrag);
			}
			this.MaterialFrag.open();
			var AccessoriesItems = this.getView().getModel("SearchViewModel").getProperty("/Accessories");
			var VehicleItems = this.getView().getModel("SearchViewModel").getProperty("/VehicleTest");
			var PermitItems = this.getView().getModel("SearchViewModel").getProperty("/Permit");
			var OtherItems = this.getView().getModel("SearchViewModel").getProperty("/Others");

			for (var a = 0; a < AccessoriesItems.length; a++) {
				AccessoriesItems[a].Highlight = "None";
			}
			this.getView().getModel("SearchViewModel").setProperty("/Accessories", AccessoriesItems);
			for (var b = 0; b < VehicleItems.length; b++) {
				VehicleItems[b].Highlight = "None";
			}
			this.getView().getModel("SearchViewModel").setProperty("/VehicleTest", VehicleItems);
			for (var c = 0; c < PermitItems.length; c++) {
				PermitItems[c].Highlight = "None";
			}
			this.getView().getModel("SearchViewModel").setProperty("/Permit", PermitItems);
			for (var d = 0; d < OtherItems.length; d++) {
				OtherItems[d].Highlight = "None";
			}
			this.getView().getModel("SearchViewModel").setProperty("/Others", OtherItems);
		},
		onPressSelectMaterial: function () {
			var AccessoriesItems = this.getView().getModel("SearchViewModel").getProperty("/Accessories");
			var VehicleItems = this.getView().getModel("SearchViewModel").getProperty("/VehicleTest");
			var PermitItems = this.getView().getModel("SearchViewModel").getProperty("/Permit");
			var OtherItems = this.getView().getModel("SearchViewModel").getProperty("/Others");
			var ClubItems = [];
			var ESMAflag = "";
			var trafficflag = "";
			var Compreflag = "";
			VehicleItems = VehicleItems.filter(function (e) {
				return e.Highlight === "Information";
			});
			AccessoriesItems = AccessoriesItems.filter(function (e) {
				return e.Highlight === "Information";
			});
			PermitItems = PermitItems.filter(function (e) {
				return e.Highlight === "Information";
			});
			OtherItems = OtherItems.filter(function (e) {
				return e.Highlight === "Information";
			});
			ClubItems = AccessoriesItems.concat(VehicleItems, PermitItems, OtherItems);
			var ServiceItemsarr = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
			var vPurpose = this.getView().getModel("VIRGlobalModel").getProperty("/Purpose");
			if (ClubItems.length === 0) {
				sap.m.MessageToast.show("Please select atleast one material.");
			} else {
				for (var i = 0; i < ClubItems.length; i++) {
					var quantity = 1;
					var price = parseFloat(ClubItems[i].Price);
					var vat = price * 0.05;
					var Total = parseFloat(price) + parseFloat(vat);
					if (ServiceItemsarr.length !== 0) {
						var itemno = ServiceItemsarr[ServiceItemsarr.length - 1].Item;
						itemno = parseInt(itemno) + 10;
					} else {
						itemno = "10";
					}
					var servicename = ClubItems[i].ServiceName;
					var visual = "";
					if (servicename === "Traffic Test" || servicename === "UAE Standard with Veh.Reg." || servicename === "ESMA with Reg" || servicename === "ESMA without Reg" || servicename === "Comprehensive Test") {
						visual = "X";
					}
					var obj = {
						"Material": ClubItems[i].Material,
						"ServiceName": ClubItems[i].ServiceName,
						"Qty": quantity,
						"QtyInd": ClubItems[i].QtyInd,
						"Price": ClubItems[i].Price,
						"VATPer": ClubItems[i].VATPer,
						"VAT": parseFloat(vat).toFixed(2),
						"TotalAmount": parseFloat(Total).toFixed(2),
						"MAHA": ClubItems[i].Maha,
						"Item": itemno.toString(),
						"VisualTest": visual
					};
					ServiceItemsarr.push(obj);
					if (ClubItems[i].ServiceName === "ESMA Test") {
						ESMAflag = "X";
					} else if (ClubItems[i].ServiceName === "Traffic Test") {
						trafficflag = "X";
					} else if (ClubItems[i].ServiceName === "Comprehensive Test") {
						Compreflag = "X";
					} else if (ClubItems[i].ServiceName === "Change Color") {
						this.getView().getModel("SearchViewModel").setProperty("/PermitColorEditable", true);
					} else if (ClubItems[i].ServiceName === "Change Fuel Type") {
						this.getView().getModel("SearchViewModel").setProperty("/PermitFuelTypeEditable", true);
					} else if (ClubItems[i].ServiceName === "Change Vehicle Kind") {
						this.getView().getModel("SearchViewModel").setProperty("/PermitVehKindEditable", true);
					}
				}
				this.getView().getModel("VIRGlobalModel").setProperty("/ServiceItems", ServiceItemsarr);

				if (vPurpose === "Permit") {
					this.getView().getModel("SearchViewModel").setProperty("/ChangeInfoBtnVisible", false);
					this.getView().getModel("SearchViewModel").setProperty("/PermitBtnVisible", true);
				}
				var sum = ServiceItemsarr.map(o => o.TotalAmount).reduce((a, c) => {
					return parseFloat(a) + parseFloat(c)
				});
				var vat = ServiceItemsarr.map(o => o.VAT).reduce((a, c) => {
					return parseFloat(a) + parseFloat(c)
				});
				if (ESMAflag) {
					this.getView().getModel("SearchViewModel").setProperty("/ESMABtnVisible", true);
				}
				if (trafficflag) {
					this.getView().getModel("SearchViewModel").setProperty("/TraffictestbtnVisible", true);
				}
				if (Compreflag) {
					this.getView().getModel("SearchViewModel").setProperty("/ComprehensivetestbtnVisible", true);
				}
				this.getView().getModel("SearchViewModel").setProperty("/VatAmount", parseFloat(vat).toFixed(2));
				this.getView().getModel("SearchViewModel").setProperty("/TotalAmount", parseFloat(sum).toFixed(2));
				this.MaterialFrag.close();
			}
		},
		onDeleteItems: function (oEvent) {
			var Path = oEvent.getSource().getBindingContext("VIRGlobalModel").getPath();
			var vIndex = parseInt(Path.substring(Path.lastIndexOf('/') + 1));
			var oModel = this.getView().getModel("VIRGlobalModel");
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
		onpresESMAssave: function () {
			var arrEsmaconditions = this.getView().getModel("SearchViewModel").getProperty("/ESMAConditionList");
			var selectedConditions = arrEsmaconditions.filter(function (e) {
				return e.Selected === true;
			});
			if (selectedConditions.length !== 0) {
				sap.m.MessageToast.show("Data saved successfully");
			} else {
				sap.m.MessageToast.show("Please Select the ESMA check list.");
			}

		},
		onPressSave: function () {

			sap.m.MessageBox.confirm(
				"Do you want to add Accessories?", {
				icon: sap.m.MessageBox.Icon.CONFIRM,
				title: "Confirmation",
				class: "sapUiSizeCompact",
				actions: ["Yes", "No"],
				onClose: function (oAction) {
					if (oAction === "Yes") {
						this.onpressScanMaterial();
					} else {
						var vPurpose = this.getView().getModel("VIRGlobalModel").getProperty("/Purpose");
						var vMObileNo = this.getView().getModel("VIRGlobalModel").getProperty("/SR");

						this.getView().getModel("SearchViewModel").setProperty("/SR", "39921047");
						this.getView().getModel("VIRGlobalModel").setProperty("/SR", "39921047");
						this.getView().getModel("SearchViewModel").setProperty("/SavebtnVisible", false);
						this.getView().getModel("SearchViewModel").setProperty("/PaybtnVisible", true);
						this.getView().getModel("SearchViewModel").setProperty("/PrintbtnVisible", true);

						this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileUpdated", true);
						this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileNotUpdated", false);
						if (vMObileNo) {
							if (vPurpose === "Permit") {
								sap.m.MessageToast.show("Service Id: 39921047 Generated Successfully.");
								this.onpressPermit();
							} else {
								sap.m.MessageToast.show("Service Id: 39921047 Generated Successfully.");

							}
						}
						this.getView().getModel("VIRGlobalModel").setProperty("/unRegplateno", "");

						var aserviceItems = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
						var aAccessoriesItems = this.getView().getModel("SearchViewModel").getProperty("/Accessories");
						var aVehicleTestItems = this.getView().getModel("SearchViewModel").getProperty("/VehicleTest");
						var aPermitItems = this.getView().getModel("SearchViewModel").getProperty("/Permit");
						var aOthers = this.getView().getModel("SearchViewModel").getProperty("/Others");
						var Clubarray = [];
						Clubarray = Clubarray.concat(aAccessoriesItems, aVehicleTestItems, aPermitItems, aOthers);

						for (var j = 0; j < Clubarray.length; j++) {
							Clubarray[j].Type = "Inactive";

						}
						this.getView().getModel("SearchViewModel").refresh();
						var that = this;
						this.intervalHandle = setTimeout(function () {
							that.onBtnPressPaymentProcess();
							//sap.ui.getCore().byId("id_carticontabbar").setSelectedKey("Payment");
						}, 300);
					}
				}.bind(this)
			});




			// } else {
			// 	sap.m.MessageToast.show("Please Enter Customer Mob No.");

			// }
			// this.GENReqFrag.close();
			// if (!this.PaymentFrag) {
			// 	this.PaymentFrag = sap.ui.xmlfragment("VIR.fragment.Payment", this);
			// 	this.getView().addDependent(this.PaymentFrag);
			// }
			// this.PaymentFrag.open();
		},
		onPressChange: function () {
			if (!this.ChangeinfoFrag) {
				this.ChangeinfoFrag = sap.ui.xmlfragment("ChangeFileUpload", "VIR.fragment.ChangeInfo", this);
				this.getView().addDependent(this.ChangeinfoFrag);
			}
			this.ChangeinfoFrag.open();
			var purpose = this.getView().getModel("VIRGlobalModel").getProperty("/Purpose");
			if (purpose === "ESMA Test") {
				// this.getView().getModel("SearchViewModel").setProperty("/ESMABtnVisible", true);
			} else if (purpose === "Permit") {
				var arrItems = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
				for (var i = 0; i < arrItems.length; i++) {
					if (arrItems[i].ServiceName === "Change Color") {
						this.getView().getModel("SearchViewModel").setProperty("/PermitColorEditable", true);
					} else if (arrItems[i].ServiceName === "Change Fuel Type") {
						this.getView().getModel("SearchViewModel").setProperty("/PermitFuelTypeEditable", true);
					} else if (arrItems[i].ServiceName === "Change Vehicle Kind") {
						this.getView().getModel("SearchViewModel").setProperty("/PermitVehKindEditable", true);
					}
				}
				this.getView().getModel("SearchViewModel").setProperty("/ChangeInfoBtnVisible", false);
				this.getView().getModel("SearchViewModel").setProperty("/PermitBtnVisible", true);
			}

			this.onPressAdpolice();
		},
		onPressESMA: function () {
			if (!this.ESMAFrag) {
				this.ESMAFrag = sap.ui.xmlfragment("VIR.fragment.ESMAConditions", this);
				this.getView().addDependent(this.ESMAFrag);
			}
			this.ESMAFrag.open();
		},
		onpresssaveapprove: function () {
			var arrEsmaconditions = this.getView().getModel("SearchViewModel").getProperty("/ESMAConditionList");
			var selectedConditions = arrEsmaconditions.filter(function (e) {
				return e.Selected === true;
			});
			if (selectedConditions.length !== 0) {
				var that = this;
				sap.m.MessageBox.confirm(
					"Are you sure want to Save and Approve?", {
					icon: sap.m.MessageBox.Icon.CONFIRM,
					title: "Confirmation",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (oAction) {
						if (oAction === "YES") {
							// that.ESMAFrag.close();
							sap.m.MessageToast.show("Approved Successfully");
							that.getView().getModel("SearchViewModel").setProperty("/ESMAPrintBtnVisible", true);
							that.getView().getModel("VIRGlobalModel").setProperty("/Esmatest", "Print ESMA Test");
						} else if (oAction === "NO") {

						}
					}.bind(this)
				});
			} else {
				sap.m.MessageToast.show("Please Select the ESMA check list.");
			}
		},
		onpressclear: function () {
			var arrEsmaconditions = this.getView().getModel("SearchViewModel").getProperty("/ESMAConditionList");
			for (var i = 0; i < arrEsmaconditions.length; i++) {
				arrEsmaconditions[i].Selected = false;
			}
			this.getView().getModel("SearchViewModel").setProperty("/ESMAConditionList", arrEsmaconditions);
			this.getView().getModel("SearchViewModel").setProperty("/ESMAPrintBtnVisible", false);
		},
		onCloseESMAconditions: function () {
			this.ESMAFrag.close();
		},
		onCloseChangeinfof4: function () {
			this.ChangeinfoFrag.close();
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
			// this.PaymentFrag.close();
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
			// for (var j = 0; j < Clubarray.length; j++) {
			// 	Clubarray[j].Type = "Inactive";
			// 	if (Clubarray[j].Highlight === "Information") {
			// 		Clubarray[j].MahaIn = "X";
			// 		Clubarray[j].MahaOut = "";
			// 		Clubarray[j].MahaVisible = "X";
			// 		Clubarray[j].Visual = "";
			// 	}
			// }
			this.getView().getModel("SearchViewModel").refresh();
			this.CartFrag.close();

		},
		onPressAdpolice: function () {

			this.getView().getModel("SearchViewModel").setProperty("/Chassisno", "JTEBU25J9959041");
			this.getView().getModel("VIRGlobalModel").setProperty("/Chassisno", "JTEBU25J9959041");
			this.getView().getModel("SearchViewModel").setProperty("/Engineno", "1GR5709102");
			this.getView().getModel("VIRGlobalModel").setProperty("/Engineno", "1GR5709102");
			this.getView().getModel("SearchViewModel").setProperty("/Country", "Germany");
			this.getView().getModel("VIRGlobalModel").setProperty("/Country", "Germany");
			this.getView().getModel("SearchViewModel").setProperty("/Manufacturer", "Toyota");
			this.getView().getModel("VIRGlobalModel").setProperty("/Manufacturer", "Toyota");
			this.getView().getModel("SearchViewModel").setProperty("/Model", "Fortuner");
			this.getView().getModel("SearchViewModel").setProperty("/Kind", "SUV");
			this.getView().getModel("VIRGlobalModel").setProperty("/Kind", "SUV");
			this.getView().getModel("SearchViewModel").setProperty("/Type", "Light Vehicle");
			this.getView().getModel("SearchViewModel").setProperty("/BodyColor", "White");
			this.getView().getModel("VIRGlobalModel").setProperty("/BodyColor", "White");
			this.getView().getModel("SearchViewModel").setProperty("/GearType", "Automatic");
			this.getView().getModel("SearchViewModel").setProperty("/FuelType", "Petrol");
			this.getView().getModel("SearchViewModel").setProperty("/FuelType", "Petrol");
			this.getView().getModel("SearchViewModel").setProperty("/SteeringSide", "Right");
			this.getView().getModel("SearchViewModel").setProperty("/WeightKind", "K");
			this.getView().getModel("SearchViewModel").setProperty("/InitRegyear", "12/01/2020");
			this.getView().getModel("SearchViewModel").setProperty("/RegExpYear", "01/05/2025");
			this.getView().getModel("SearchViewModel").setProperty("/PlateType", "Private");
			this.getView().getModel("SearchViewModel").setProperty("/MFGYear", "2024");
			this.getView().getModel("VIRGlobalModel").setProperty("/MFGYear", "2024");
			this.getView().getModel("SearchViewModel").setProperty("/HP", "1800");
			this.getView().getModel("SearchViewModel").setProperty("/Axles", "3");
			this.getView().getModel("SearchViewModel").setProperty("/Cylinders", "4");
			this.getView().getModel("SearchViewModel").setProperty("/Wheels", "4");
			this.getView().getModel("SearchViewModel").setProperty("/Doors", "4");
			this.getView().getModel("SearchViewModel").setProperty("/Passengers", "4");
			this.getView().getModel("SearchViewModel").setProperty("/Passengers", "4");
			this.getView().getModel("SearchViewModel").setProperty("/EmptyWeight", "1000");
			this.getView().getModel("SearchViewModel").setProperty("/FullWeight", "1500");
			this.getView().getModel("SearchViewModel").setProperty("/mileage", "18");
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
			// this.getView().getModel("SearchViewModel").setProperty("/HeaderEmail", "ahmedasad@gmail.com");
			this.getView().getModel("SearchViewModel").setProperty("/HeaderMobileNo", phone);
			this.getView().getModel("SearchViewModel").setProperty("/MObileNo", phone);
			this.getView().getModel("VIRGlobalModel").setProperty("/MObileNo", phone);
			this.getView().getModel("SearchViewModel").setProperty("/HeaderEmirates", "Abu Dhabi");
			this.getView().getModel("SearchViewModel").setProperty("/pincode", "100023");
			this.getView().getModel("SearchViewModel").setProperty("/Address", "Corniche Road Abu Dhabi");

			//
			this.getView().getModel("SearchViewModel").setProperty("/NewChassisno", "JTEBU25J9959041");
			this.getView().getModel("SearchViewModel").setProperty("/NewEngineno", "1GR5709102");
			this.getView().getModel("SearchViewModel").setProperty("/NewCountry", "Germany");
			this.getView().getModel("SearchViewModel").setProperty("/NewManufacturer", "Toyota");
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

		},
		onPressTrafficTest: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("TrafficTest", false);
		},
		onPressCompretest: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("ComprehensiveTest", false);
		},
		onClosematerialf4: function () {
			this.MaterialFrag.close();
		},
		onPressprevorders: function (oEvent) {
			var oButton = oEvent.getSource();
			if (!this.PrevorderPopover) {
				Fragment.load({
					name: "VIR.fragment.PrevOrders",
					controller: this
				}).then(function (oPopover) {
					this.PrevorderPopover = oPopover;
					this.getView().addDependent(this.PrevorderPopover);
					this.PrevorderPopover.openBy(oButton);
				}.bind(this));
			} else {
				this.PrevorderPopover.openBy(oButton);
			}
		},
		onExit: function () {
			this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "");
			this.getView().getModel("VIRGlobalModel").setProperty("/SecMobileNo", "");
			this.getView().getModel("VIRGlobalModel").setProperty("/unRegplateno", "");
			this._ModelInitialLoad();
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("Home", false);

		},
		onpresssaveconf: function () {
			var oRouter = UIComponent.getRouterFor(this);
			var vPurpose = this.getView().getModel("VIRGlobalModel").getProperty("/Purpose");
			if (vPurpose === "Traffic Test") {
				sap.m.MessageBox.confirm(
					"Traffic Test has been enabled." + "\n" + "Do you want to Proceed?", {
					icon: sap.m.MessageBox.Icon.CONFIRM,
					title: "Confirmation",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (oAction) {
						if (oAction === "YES") {
							oRouter.navTo("TrafficTest", false);

						} else if (oAction === "NO") {
							// oRouter.navTo("Search", false);
							var that = this;
							this.intervalHandle = setTimeout(function () {
								that.ChangeinfoFrag.close();
							}, 300);
						}
					}.bind(this)
				});
			} else {
				sap.m.MessageToast.show("Vehicle Details Updated Successfully.");
				var that = this;
				this.intervalHandle = setTimeout(function () {
					that.ChangeinfoFrag.close();
				}, 300);
			}
			this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileUpdated", true);
			this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileNotUpdated", false);

		},
		openColorF4: function () {
			if (!this.ColorF4Frag) {
				this.ColorF4Frag = sap.ui.xmlfragment("VIR.fragment.ColorF4", this);
				this.getView().addDependent(this.ColorF4Frag);
			}
			this.ColorF4Frag.open();
		},
		onColoronfirm: function (oEvent) {
			var vcolor = oEvent.getParameter("selectedItem").getBindingContext("CreateCustomerModel").getObject().Color;
			this.getView().getModel("SearchViewModel").setProperty("/NewBodyColor", vcolor);
			oEvent.getSource().getBinding("items").filter([]);
		},
		onpressPermitsaveapprove: function () {
			sap.m.MessageToast.show("Data Saved Successfully.");
			var that = this;
			this.intervalHandle = setTimeout(function () {
				that.ChangeinfoFrag.close();
			}, 300);
			this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileUpdated", true);
			this.getView().getModel("VIRGlobalModel").setProperty("/MahaFileNotUpdated", false);
		},
		onpressVisualTest: function () {

			var oModel = this.getView().getModel("VIRGlobalModel").getData();
			var serviceitems = oModel.ServiceItems;
			var filteritems = []
			filteritems = serviceitems.filter(function (e) {
				return e.VisualTest === "X";
			});
			filteritems[0].Highlight = "Information";
			this.getView().getModel("VIRGlobalModel").setProperty("/InspItems", filteritems);
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("InspectionTemp", false);
		},
		onpressPhyinsp: function (oEvent) {
			var saleorder = this.getView().getModel("VIRGlobalModel").getProperty("/SR");
			var obj = oEvent.getSource().getBindingContext("VIRGlobalModel").getObject();
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("InspectionTemp", {
				"SR": saleorder,
				"Material": obj.Material,
				"Desc": obj.ServiceName,
				"Item": obj.Item
			});
		},
		onFileUploaderChange: function () {
			var oModel = this.getView().getModel("AttachmentModel");
			var aAttachment = oModel.getProperty("/File");
			var sFileuploader = sap.ui.core.Fragment.byId("ChangeFileUpload", "id_VIUploadCollection");
			var sFilename = sFileuploader.getValue(); // gives both name and type
			if (sFilename !== "") { //attachment 
				var sfile = jQuery.sap.domById(sFileuploader.getId() + "-fu").files[0]; //provide entire file info
				var vFinalfilename = sFilename.replace(/(\.[^/.]+)+$/, ""); // File Name
				var sFileext = sFilename.slice((sFilename.lastIndexOf(".") - 1 >>> 0) + 2); // File Extension
				// var sFileExt = sFileext.substring(0, 3);
				var sFinalFileExt = sFileext.toUpperCase();
				var that = this;
				// var filesize = sfile.size;
				// var size = filesize / 1000000;
				// size = parseInt(size);
				var Compress = "";
				if (sFinalFileExt === "DOCX") {
					sFinalFileExt = "DOC";
				} else if (sFinalFileExt === "XLS") {
					sFinalFileExt = "XLSX";
				} else if (sFinalFileExt === "PNG" || sFinalFileExt === "JPEG" || sFinalFileExt === "JPG") {
					Compress = "X";
					this.getView().getModel("AttachmentModel").setProperty("/visible", true);
				}
				if (sfile) {
					var reader = new FileReader();
					reader.onload = function (readerEvt) {
						var sBinaryString = readerEvt.target.result;
						var sBase64 = btoa(sBinaryString);
						sFileuploader.setValue();
						if (Compress === "X") {
							that.onAddImage(sfile, vFinalfilename, sFinalFileExt);
						} else {
							var FileObject = {
								"Filename": sFilename,
								"Xstring": sBase64,
								"FileObject": sfile,
								"FileType": sFinalFileExt,
								"Name": vFinalfilename + "." + sFinalFileExt
							};
							if (aAttachment.length < 10) {
								aAttachment.push(FileObject);
								that.getView().getModel("AttachmentModel").setProperty("/File", aAttachment);
							} else {
								MessageToast.show("Please Upload only 10 Attachments");
							}
						}
						// oModel.refresh(true);
					};
				}
				reader.readAsBinaryString(sfile);
			} else { }

		},
		deleteUploadedFile: function (oEvent) {
			var Model = this.getView().getModel("AttachmentModel");
			var FileName = oEvent.getParameter("listItem").getBindingContext("AttachmentModel").getProperty().Filename;
			var Path = oEvent.getParameter('listItem').getBindingContext("AttachmentModel").getPath();
			var Model = oEvent.getSource().getModel("AttachmentModel");
			var vIndex = parseInt(Path.substring(Path.lastIndexOf('/') + 1));
			var that = this;
			sap.m.MessageBox.confirm(
				"Are you Sure want to Delete Attachment?", {
				icon: sap.m.MessageBox.Icon.CONFIRM,
				title: "Confirm",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === "YES") {
						var FileArray = Model.getProperty("/File");
						FileArray.splice(vIndex, 1);
						Model.setProperty("/File", FileArray);
					} else if (oAction === "YES") { }
				}
			});

		},

		onpressOpenpaymentFrag: function () {
			if (!this.PaymentFrag) {
				this.PaymentFrag = sap.ui.xmlfragment("VIR.fragment.PaymentMode", this);
				this.getView().addDependent(this.PaymentFrag);
			}
			this.PaymentFrag.open();
			this.getView().getModel("SearchViewModel").setProperty("/CashAmount", "0");
			this.getView().getModel("SearchViewModel").setProperty("/CardAmount", "0");
			this.getView().getModel("SearchViewModel").setProperty("/Loyaltyamount", "0");
			this.getView().getModel("SearchViewModel").setProperty("/CouponAmount", "0");
		},
		onClosepaymentmode: function () {
			this.PaymentFrag.close();
		},
		onPressNavtoPaymentapp: function () {

			sap.m.MessageToast.show("Navigating to payment app");
			var SO_Number = this.getView().getModel("VIRGlobalModel").getProperty("/SR");
			var MyCartTotal = this.getView().getModel("SearchViewModel").getProperty("/TotalAmount");

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
		onpressPermit: function () {
			var SR = this.getView().getModel("VIRGlobalModel").getProperty("/SR");
			if (SR) {
				if (!this.PermitFrag) {
					this.PermitFrag = sap.ui.xmlfragment("VIR.fragment.Permit", this);
					this.getView().addDependent(this.PermitFrag);
				}
				this.PermitFrag.open();
				this.onPressAdpolice();
			} else {
				sap.m.MessageToast.show("Please Generate Service Request to proceed.");
			}
		},
		onClosePermit: function () {
			this.PermitFrag.close();
		},
		onpressaddcertitems: function () {
			var ceritems = this.getView().getModel("SearchViewModel").getProperty("/CertificateItems");
			ceritems.push({
				certtype: "",
				certno: "",
				certdate: null
			});
			this.getView().getModel("SearchViewModel").setProperty("/CertificateItems", ceritems);
		},
		onpressdeletecertitems: function (oEvent) {
			// var Path = oEvent.getSource().getBindingContext("SearchViewModel").getPath();
			// var vIndex = parseInt(Path.substring(Path.lastIndexOf('/') + 1));
			var oModel = this.getView().getModel("SearchViewModel");
			var data = oModel.getProperty("/CertificateItems");
			data.splice(0, 1);
			oModel.setProperty("/CertificateItems", data);
		},
		onpressdeleteiditems: function () {
			var oModel = this.getView().getModel("SearchViewModel");
			var data = oModel.getProperty("/IdInfoItems");
			data.splice(0, 1);
			oModel.setProperty("/IdInfoItems", data);
		},
		onpressaddIdInfo: function () {
			var ceritems = this.getView().getModel("SearchViewModel").getProperty("/IdInfoItems");
			ceritems.push({
				Idtype: "",
				Idno: "",
				Iddate: null,
				Idname: ""
			});
			this.getView().getModel("SearchViewModel").setProperty("/IdInfoItems", ceritems);

		},
		onExpandCash: function (oEvent) {
			var expan = oEvent.getSource().getExpanded();
			if (expan) {
				// this.getView().getModel("SaleOrderModel").setProperty("/Cash_CheckBoxSeleted", true);
				var oModel = this.getView().getModel("SearchViewModel").getData();
				var cashamt = oModel.CashAmount;
				var cardamt = oModel.CardAmount;
				var Lamt = oModel.Loyaltyamount;
				var couponamt = oModel.CouponAmount;
				if (!cashamt) {
					cashamt = "0";
				}
				if (!Lamt) {
					Lamt = "0";
				}
				if (!cardamt) {
					cardamt = "0";
				}
				if (!couponamt) {
					couponamt = "0";
				}
				var moptotal = parseFloat(cardamt) + parseFloat(Lamt) + parseFloat(couponamt);
				var soamt = oModel.TotalAmount;
				var amt = parseFloat(soamt) - parseFloat(moptotal);
				this.getView().getModel("SearchViewModel").setProperty("/CashAmount", amt);
			} else {
				// this.getView().getModel("SaleOrderModel").setProperty("/Cash_CheckBoxSeleted", false);
			}

		},

		onPressCashSelect: function (oEvent) {
			var Seleted = oEvent.getSource().getSelected();
			if (Seleted) {
				var oModel = this.getView().getModel("SearchViewModel").getData();
				var cashamt = oModel.CashAmount;
				var cardamt = oModel.CardAmount;
				var Lamt = oModel.Loyaltyamount;
				var couponamt = oModel.CouponAmount;
				if (!cashamt) {
					cashamt = "0";
				}
				if (!Lamt) {
					Lamt = "0";
				}
				if (!cardamt) {
					cardamt = "0";
				}
				if (!couponamt) {
					couponamt = "0";
				}
				var moptotal = parseFloat(cardamt) + parseFloat(Lamt) + parseFloat(couponamt);
				var soamt = oModel.TotalAmount;
				var amt = parseFloat(soamt) - parseFloat(moptotal);
				this.getView().getModel("SearchViewModel").setProperty("/CashAmount", amt);

			} else {

				// reset amount 
				this.getView().getModel("SearchViewModel").setProperty("/Cashamount", "0");
				this.getView().getModel("SearchViewModel").refresh()
			}

		},


		onchangeamount: function (oEvent) {
			var oModel = this.getView().getModel("SearchViewModel").getData();
			var cashamt = oModel.CashAmount;
			var cardamt = oModel.CardAmount;
			var Lamt = oModel.Loyaltyamount;
			var couponamt = oModel.CouponAmount;
			if (!cashamt) {
				cashamt = "0";
			}
			if (!Lamt) {
				Lamt = "0";
			}
			if (!cardamt) {
				cardamt = "0";
			}
			if (!couponamt) {
				couponamt = "0";
			}
			var moptotal = parseFloat(cashamt) + parseFloat(cardamt) + parseFloat(couponamt) + parseFloat(Lamt);
			var soamt = oModel.TotalAmount;
			// var amt = parseFloat(soamt) - parseFloat(moptotal);
			if (parseFloat(moptotal) > parseFloat(soamt)) {
				sap.m.MessageToast.show("MOP amount is not matching with total amount");
				// this.getView().getModel("SaleOrderModel").setProperty("/Loyaltyamount", "");
				oEvent.getSource().setValue("");
			} else {
				// this.getView().getModel("SaleOrderModel").setProperty("/Loyaltyamount", amt);
			}
		},

		onExpandCard: function (oEvent) {
			var expan = oEvent.getSource().getExpanded();
			if (expan) {
				// this.getView().getModel("SearchViewModel").setProperty("/Card_CheckBoxSeleted", true);
				var oModel = this.getView().getModel("SearchViewModel").getData();
				var cashamt = oModel.CashAmount;
				var cardamt = oModel.CardAmount;
				var Lamt = oModel.Loyaltyamount;
				var couponamt = oModel.CouponAmount;
				if (!cashamt) {
					cashamt = "0";
				}
				if (!Lamt) {
					Lamt = "0";
				}
				if (!cardamt) {
					cardamt = "0";
				}
				if (!couponamt) {
					couponamt = "0";
				}
				var moptotal = parseFloat(cashamt) + parseFloat(Lamt) + parseFloat(couponamt);
				var soamt = oModel.TotalAmount;
				var amt = parseFloat(soamt) - parseFloat(moptotal);
				this.getView().getModel("SearchViewModel").setProperty("/CardAmount", amt);
			} else {
				// this.getView().getModel("SearchViewModel").setProperty("/Card_CheckBoxSeleted", false);
			}
		},

		onExpandLoyalty: function (oEvent) {
			var expan = oEvent.getSource().getExpanded();
			if (expan) {
				// this.getView().getModel("SearchViewModel").setProperty("/Loyalty_CheckBoxSeleted", true);
				var oModel = this.getView().getModel("SearchViewModel").getData();
				var cashamt = oModel.CashAmount;
				var cardamt = oModel.CardAmount;
				var Lamt = oModel.Loyaltyamount;
				var couponamt = oModel.CouponAmount;
				if (!cashamt) {
					cashamt = "0";
				}
				if (!Lamt) {
					Lamt = "0";
				}
				if (!cardamt) {
					cardamt = "0";
				}
				if (!couponamt) {
					couponamt = "0";
				}
				var moptotal = parseFloat(cashamt) + parseFloat(cardamt) + parseFloat(couponamt);
				var soamt = oModel.TotalAmount;
				var amt = parseFloat(soamt) - parseFloat(moptotal);
				this.getView().getModel("SearchViewModel").setProperty("/Loyaltyamount", amt);
			} else {
				// this.getView().getModel("SearchViewModel").setProperty("/Loyalty_CheckBoxSeleted", false);
			}
		},

		onExpandCoupons: function (oEvent) {
			var expan = oEvent.getSource().getExpanded();
			if (expan) {
				// this.getView().getModel("SearchViewModel").setProperty("/Coupons_CheckBoxSeleted", true);
				var oModel = this.getView().getModel("SearchViewModel").getData();
				var cashamt = oModel.CashAmount;
				var cardamt = oModel.CardAmount;
				var Lamt = oModel.Loyaltyamount;
				var couponamt = oModel.CouponAmount;
				if (!cashamt) {
					cashamt = "0";
				}
				if (!Lamt) {
					Lamt = "0";
				}
				if (!cardamt) {
					cardamt = "0";
				}
				if (!couponamt) {
					couponamt = "0";
				}
				var moptotal = parseFloat(cashamt) + parseFloat(cardamt) + parseFloat(Lamt);
				var soamt = oModel.TotalAmount;
				var amt = parseFloat(soamt) - parseFloat(moptotal);
				this.getView().getModel("SearchViewModel").setProperty("/CouponAmount", amt);
			} else {
				// this.getView().getModel("SearchViewModel").setProperty("/Coupons_CheckBoxSeleted", false);
			}
		},

		onPress1: function (oEvent) {
			var ListObject = oEvent.getSource().getBindingContext("SearchViewModel").getObject();
			var arrMaterialf4 = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
			var selectedmaterial = arrMaterialf4.filter(function (e) {
				return e.Material === ListObject.Material;
			});
			if (ListObject.Highlight === "None") {

				if (selectedmaterial.length === 0) {
					oEvent.getSource().getBindingContext("SearchViewModel").getObject().Highlight = "Information";

					// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].removeStyleClass(
					// 	"cl_materialbluetxt");
					// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].addStyleClass(
					// 	"cl_materialwhiteTXT");
					/*Material*/
					// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[1].addStyleClass("cl_whiteTXT");
					/*Material Name*/
					// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[1].getItems()[0].addStyleClass("cl_whiteTXT");
					/*Stocks */
					// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[2].getItems()[0].addStyleClass("cl_whiteTXT");
					// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[2].getItems()[1].addStyleClass("cl_whiteTXT");

					oEvent.getSource().removeStyleClass("cl_Materialgridlist");
					oEvent.getSource().addStyleClass("cl_bordergridlist");
					var price = ListObject.Price;
					var vat = parseFloat(price) * 0.05;
					var total = parseFloat(vat) + parseFloat(price);
					var qty = "";
					if (ListObject.QtyInd) {
						qty = "1";
					}
					var item = "";
					if (arrMaterialf4.length === 0) {
						item = "10";
					} else {
						item = parseInt(arrMaterialf4[arrMaterialf4.length - 1].Item) + 10;
					}
					var obj =
					{
						"Material": ListObject.Material,
						"ServiceName": ListObject.ServiceName,
						"Price": ListObject.Price,
						"VATPer": "5",
						"VAT": vat,
						"TotalAmount": parseFloat(total).toFixed(2),
						"VisualTest": "X",
						"QtyInd": ListObject.QtyInd,
						"Qty": qty,
						"Item": item.toString()
					};
					arrMaterialf4.push(obj);
					this.getView().getModel("VIRGlobalModel").setProperty("/ServiceItems", arrMaterialf4);
					this.getView().getModel("VIRGlobalModel").setProperty("/MyCartCount", arrMaterialf4.length);


					if (arrMaterialf4.length !== 0) {
						var sum = arrMaterialf4.map(o => o.TotalAmount).reduce((a, c) => {
							return parseFloat(a) + parseFloat(c)
						});
						var vat = arrMaterialf4.map(o => o.VAT).reduce((a, c) => {
							return parseFloat(a) + parseFloat(c)
						});
						var that = this;
						this.intervalHandle = setTimeout(function () {
							that.getView().getModel("SearchViewModel").setProperty("/VatAmount", parseFloat(vat).toFixed(2));
							that.getView().getModel("SearchViewModel").setProperty("/TotalAmount", parseFloat(sum).toFixed(2));
						}, 300);
					} else {
						this.getView().getModel("SearchViewModel").setProperty("/VatAmount", "0.00");
						this.getView().getModel("SearchViewModel").setProperty("/TotalAmount", "0.00");
					}

				} else {
					sap.m.MessageToast.show("This material is already selected");
				}

			} else {

				oEvent.getSource().getBindingContext("SearchViewModel").getObject().Highlight = "None";

				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].removeStyleClass(
				// 	"cl_materialwhiteTXT");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].addStyleClass("cl_materialbluetxt");

				/*Material*/
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[1].removeStyleClass("cl_whiteTXT");
				/*Material Name*/
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[1].getItems()[0].removeStyleClass("cl_whiteTXT");
				/*Stocks */
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[2].getItems()[0].removeStyleClass("cl_whiteTXT");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[2].getItems()[1].removeStyleClass("cl_whiteTXT");

				oEvent.getSource().removeStyleClass("cl_bordergridlist");
				oEvent.getSource().addStyleClass("cl_Materialgridlist");
				var index = arrMaterialf4.findIndex(E => E.Material === ListObject.Material);
				arrMaterialf4.splice(index, 1);
				this.getView().getModel("VIRGlobalModel").setProperty("/ServiceItems", arrMaterialf4);
				this.getView().getModel("VIRGlobalModel").setProperty("/MyCartCount", arrMaterialf4.length);
				if (arrMaterialf4.length !== 0) {
					var sum = arrMaterialf4.map(o => o.TotalAmount).reduce((a, c) => {
						return parseFloat(a) + parseFloat(c)
					});
					var vat = arrMaterialf4.map(o => o.VAT).reduce((a, c) => {
						return parseFloat(a) + parseFloat(c)
					});
					var that = this;
					this.intervalHandle = setTimeout(function () {
						that.getView().getModel("SearchViewModel").setProperty("/VatAmount", parseFloat(vat).toFixed(2));
						that.getView().getModel("SearchViewModel").setProperty("/TotalAmount", parseFloat(sum).toFixed(2));
					}, 300);
				} else {
					this.getView().getModel("SearchViewModel").setProperty("/VatAmount", "0.00");
					this.getView().getModel("SearchViewModel").setProperty("/TotalAmount", "0.00");
				}
				// oEvent.getSource().addStyleClass("cl_whitematetialgridlist");

			}
			this.getView().getModel("SearchViewModel").refresh();
		},
		onPressCart: function () {
			if (!this.CartFrag) {
				this.CartFrag = sap.ui.xmlfragment("VIR.fragment.Cart", this);
				this.getView().addDependent(this.CartFrag);
			}
			this.CartFrag.open();
		},
		onBtnPressPaymentProcess: function () {
			const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("PaymentIntegration", {}, true);
			// if (!this.CartFrag) {
			// 	this.CartFrag = sap.ui.xmlfragment("VIR.fragment.Cart", this);
			// 	this.getView().addDependent(this.CartFrag);
			// }
			// this.CartFrag.open();
		},

		onPressClose: function () {
			this.CartFrag.close();
		},

		onPressShowVehicleInfo: function () {
			// if (!this.ShowVehicleInfo) {
			// 	this.ShowVehicleInfo = sap.ui.xmlfragment("VIR.fragment.VehicleInfo", this);
			// 	this.getView().addDependent(this.ShowVehicleInfo);
			// }
			// this.ShowVehicleInfo.open();
			this.onPressAdpolice();
			if (!this.ShowVehicleInfo) {
				this.ShowVehicleInfo = sap.ui.xmlfragment("VIR.fragment.VehicleDetails", this);
				this.getView().addDependent(this.ShowVehicleInfo);
			}
			this.ShowVehicleInfo.open();
		},

		onPressCloseVehicle: function () {
			this.ShowVehicleInfo.close();
		},
		onselectcartitem: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("InspectionTemp", false);
		},
		onpressScanMaterial: function () {
			if (!this.MaterialScan) {
				this.MaterialScan = sap.ui.xmlfragment("VIR.fragment.MaterialScan", this);
				this.getView().addDependent(this.MaterialScan);
			}
			this.MaterialScan.open();
			this.getView().getModel("VIRGlobalModel").setProperty("/MaterialNum", "");
		},
		onPressCloseMaterialScan: function () {
			this.MaterialScan.close();
			this.getView().getModel("VIRGlobalModel").setProperty("/MaterialNum", "");
		},
		onScanSuccess: function (oEvent) {
			if (oEvent.getParameter("cancelled")) {
				MessageToast.show("Scan cancelled", { duration: 1000 });
			} else {
				if (oEvent.getParameter("text")) {
					var scannedvalue = oEvent.getParameter("text");
					this.getView().getModel("VIRGlobalModel").setProperty("/MaterialNum", scannedvalue);
					this.highlightMaterial(scannedvalue);
				} else {
					oScanResultText.setText('');
				}
			}
		},
		onScanError: function (oEvent) {
			MessageToast.show("Scan failed: " + oEvent, { duration: 1000 });
		},
		highlightMaterial: function (scannedvalue) {
			var arrAccessories = this.getView().getModel("SearchViewModel").getProperty("/Accessories");
			for (var i = 0; i < arrAccessories.length; i++) {
				if (arrAccessories[i].Material === scannedvalue) {
					arrAccessories[i].Highlight = "Information";
				}
			}
			this.getView().getModel("SearchViewModel").refresh();
			this.MaterialScan.close();
			this.getView().getModel("VIRGlobalModel").setProperty("/MaterialNum", "");
			this.getView().byId("id_MaterialIcontabbar").setSelectedKey("Accessories");

			// var arrMaterialf4 = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
			// var selectedmaterial = arrMaterialf4.filter(function (e) {
			// 	return e.Material === ListObject.Material;
			// });


			// if (selectedmaterial.length === 0) {
				
			// 	var price = ListObject.Price;
			// 	var vat = parseFloat(price) * 0.05;
			// 	var total = parseFloat(vat) + parseFloat(price);
			// 	var qty = "";
			// 	if (ListObject.QtyInd) {
			// 		qty = "1";
			// 	}
			// 	var item = "";
			// 	if (arrMaterialf4.length === 0) {
			// 		item = "10";
			// 	} else {
			// 		item = parseInt(arrMaterialf4[arrMaterialf4.length - 1].Item) + 10;
			// 	}
			// 	var obj =
			// 	{
			// 		"Material": ListObject.Material,
			// 		"ServiceName": ListObject.ServiceName,
			// 		"Price": ListObject.Price,
			// 		"VATPer": "5",
			// 		"VAT": vat,
			// 		"TotalAmount": parseFloat(total).toFixed(2),
			// 		"VisualTest": "X",
			// 		"QtyInd": ListObject.QtyInd,
			// 		"Qty": qty,
			// 		"Item": item.toString()
			// 	};
			// 	arrMaterialf4.push(obj);
			// 	this.getView().getModel("VIRGlobalModel").setProperty("/ServiceItems", arrMaterialf4);
			// 	this.getView().getModel("VIRGlobalModel").setProperty("/MyCartCount", arrMaterialf4.length);


			// 	if (arrMaterialf4.length !== 0) {
			// 		var sum = arrMaterialf4.map(o => o.TotalAmount).reduce((a, c) => {
			// 			return parseFloat(a) + parseFloat(c)
			// 		});
			// 		var vat = arrMaterialf4.map(o => o.VAT).reduce((a, c) => {
			// 			return parseFloat(a) + parseFloat(c)
			// 		});
			// 		var that = this;
			// 		this.intervalHandle = setTimeout(function () {
			// 			that.getView().getModel("SearchViewModel").setProperty("/VatAmount", parseFloat(vat).toFixed(2));
			// 			that.getView().getModel("SearchViewModel").setProperty("/TotalAmount", parseFloat(sum).toFixed(2));
			// 		}, 300);
			// 	} else {
			// 		this.getView().getModel("SearchViewModel").setProperty("/VatAmount", "0.00");
			// 		this.getView().getModel("SearchViewModel").setProperty("/TotalAmount", "0.00");
			// 	}

			// } else {
			// 	sap.m.MessageToast.show("This material is already selected");
			// }
		}





	});

});