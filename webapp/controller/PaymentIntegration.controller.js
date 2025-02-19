sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("VIR.controller.PaymentIntegration", {
		onInit: function () {

			// this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// this._oRouter.attachRouteMatched(this.handleRouteMatched, this);

		},

		onAfterRendering: function () {
			this._ModelInitialLoad();
		},

		//handleRouteMatched: function (oEvent) {
		// 	var name = oEvent.getParameter("arguments").Total;
		// 	var age = oEvent.getParameter("arguments").Vat;
		// 	console.log(name, age);

		// },

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
				"PaybtnVisible": true,
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
		onExit: function () {
			this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "");
			this.getView().getModel("VIRGlobalModel").setProperty("/SecMobileNo", "");
			this.getView().getModel("VIRGlobalModel").setProperty("/unRegplateno", "");
			this._ModelInitialLoad();
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("Home", false);

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
			//this.getView().getModel("SearchViewModel").setProperty("/Btnenable", true);
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
			this.onBtnPressCancel();

		},
		onBtnPressCancel: function () {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("GenerateReq", {}, true);
		},
	});

});