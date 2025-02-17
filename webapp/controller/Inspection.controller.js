sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/m/MessageBox"
], function (Controller, UIComponent, MessageBox) {
	"use strict";

	return Controller.extend("VIR.controller.Inspection", {
		onInit: function () {

			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
		},
		onAfterRendering: function () {
			// this.loadSVG();
		},
		handleRouteMatched: function (oEvent) {
			if (oEvent.getParameter("name") === "Inspection") {
				this._ModelInitialLoad();
				// var imagepath = this.getView().getModel("imageModel").getData().path;
				// $.ajax({
				// 	// url: "assets/Carinspection.svg",
				// 	url: imagepath + "/image/CarExterior.svg",
				// 	async: true,
				// 	success: data => {
				// 		const content = new XMLSerializer().serializeToString(data);
				// 		this.getView().byId("idSvgContainer").setContent(content);

				// 	}
				// });
				var SOItems = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
				var InspItemsarr = this.getView().getModel("VIRGlobalModel").getProperty("/InspItems");
				var CurrItem = this.getView().getModel("VIRGlobalModel").getProperty("/CurrItemNo");
				var index = SOItems.findIndex(E => E.Item === CurrItem);
				var Highlight = InspItemsarr.filter(function (e) {
					return e.Highlight !== "";
				});
				if (index !== -1) {


					if (SOItems[index].ServiceName === "Comprehensive Test") {
						this.getView().getModel("SearchViewModel").setProperty("/ESMABtnVisible", false);
						this.getView().getModel("SearchViewModel").setProperty("/ComprehensivetestbtnVisible", true);
					} else if (SOItems[index].ServiceName === "ESMA with Reg") {
						this.getView().getModel("SearchViewModel").setProperty("/ComprehensivetestbtnVisible", false);
						this.getView().getModel("SearchViewModel").setProperty("/ESMABtnVisible", true);
					}
					if (SOItems.length === 1) {
						this.getView().getModel("SearchViewModel").setProperty("/nextEnable", false);
					}
					this.getView().getModel("SearchViewModel").setProperty("/ServiceItem", InspItemsarr[index].Item);
					this.getView().getModel("SearchViewModel").setProperty("/Servicename", InspItemsarr[index].ServiceName);

					if (InspItemsarr[index].ServiceName === "Traffic Test") {
						this.getView().getModel("VIRGlobalModel").setProperty("/VisualVisible", false);
					} else {
						this.getView().getModel("VIRGlobalModel").setProperty("/VisualVisible", true);
					}
				}

				if (Highlight.length === 0) {
					var itemno = InspItemsarr[0].Item;
					var servicename = InspItemsarr[0].ServiceName;
					this.getView().getModel("SearchViewModel").setProperty("/ServiceItem", itemno);
					this.getView().getModel("SearchViewModel").setProperty("/Servicename", servicename);
					if (servicename === "Traffic Test") {
						this.getView().getModel("VIRGlobalModel").setProperty("/VisualVisible", false);
					} else {
						this.getView().getModel("VIRGlobalModel").setProperty("/VisualVisible", true);
					}
				}



			}
		},
		onPressSave: function () {

			this.onPressclear();
			var SOItems = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
			var CurrItem = this.getView().getModel("VIRGlobalModel").getProperty("/CurrItemNo");
			var index = SOItems.findIndex(E => E.Item === CurrItem);
			SOItems[index].Highlight = "Success";
			if (SOItems.length - 1 !== index) {
				SOItems[index + 1].Highlight = "Information";
				CurrItem = parseInt(CurrItem) + 10;
			}
			var Servicename = SOItems[index].ServiceName;

			this.getView().getModel("VIRGlobalModel").setProperty("/ServiceItems", SOItems);
			this.getView().getModel("VIRGlobalModel").setProperty("/CurrItemNo", CurrItem.toString());
			sap.m.MessageToast.show(Servicename + " data Saved Successfully");
			if (SOItems.length - 1 !== index) {
				if (SOItems[index + 1].ServiceName === "Traffic Test") {
					var oRouter = UIComponent.getRouterFor(this);
					this.intervalHandle = setTimeout(function () {
						oRouter.navTo("TrafficTest", false);
					}, 2000);
					this.getView().getModel("VIRGlobalModel").setProperty("/VisualVisible", false);
				} else if (SOItems[index + 1].ServiceName === "Comprehensive Test") {
					this.getView().getModel("SearchViewModel").setProperty("/ESMABtnVisible", false);
					this.getView().getModel("SearchViewModel").setProperty("/ComprehensivetestbtnVisible", true);
					this.getView().getModel("VIRGlobalModel").setProperty("/VisualVisible", true);
				} else if (SOItems[index + 1].ServiceName === "ESMA with Reg") {
					this.getView().getModel("SearchViewModel").setProperty("/ComprehensivetestbtnVisible", false);
					this.getView().getModel("SearchViewModel").setProperty("/ESMABtnVisible", true);
					this.getView().getModel("VIRGlobalModel").setProperty("/VisualVisible", true);
				}
				this.getView().getModel("SearchViewModel").setProperty("/ServiceItem", SOItems[index + 1].Item);
				this.getView().getModel("SearchViewModel").setProperty("/Servicename", SOItems[index + 1].ServiceName);
			}
		},
		navtopt2: function () {
			var navCon = this.byId("id_VItempnavCon");
			navCon.to(this.byId("pt2"), "fade");
		},
		navtopt1: function () {
			var navCon = this.byId("id_VItempnavCon");
			navCon.to(this.byId("pt1"), "fade");
			this.getView().getModel("SearchViewModel").setProperty("/ServiceTestLayoutVisible", true);
		},
		loadSVG: function () {
			var imagepath = this.getView().getModel("imageModel").getData().path;
			$.ajax({
				// url: "assets/Carinspection.svg",
				url: imagepath + "/image/CarExterior.svg",
				async: true,
				success: data => {
					const content = new XMLSerializer().serializeToString(data);
					this.getView().byId("idSvgContainer").setContent(content);
					this.RenderSVG();
				}
			});
		},
		RenderSVG: function () {
			const aPaths = this.getView().byId("idSvgContainer").$().find("path");
			// check elements are already in the DOM
			if (!aPaths.length) return

			// register onclick event for the elements
			aPaths.bind("click", this._handlePathClick.bind(this));
		},
		_handlePathClick(oEvent) {

			// get clicked path
			const oPath = $(oEvent.target);
			const sCountry = oPath.attr("id");
			const sDescription = oPath.attr("aria-label");
			const activeElements = document.querySelectorAll('.maplink.active');
			activeElements.forEach(el => el.classList.remove('active'));

			let pathElement = oEvent.currentTarget.className.baseVal;
			if (pathElement.indexOf("maplink") >= 0) {
				oEvent.currentTarget.classList.add('active');
			}
			var sidelist = this.getView().getModel("SearchViewModel").getProperty("/SideList");
			if (sCountry) {
				sidelist.push({
					"Parts": sCountry
				});
			}
			var aDups = [];
			var aWithoutDup = sidelist.filter(function (el) {
				// If it is not a duplicate, return true
				if (aDups.indexOf(el.Parts) == -1) {
					aDups.push(el.Parts);
					return true;
				}
				return false;
			});
			this.getView().getModel("SearchViewModel").setProperty("/SideList", aWithoutDup);
			this.getView().getModel("SearchViewModel").setProperty("/BtnEnabled", true);
			// toggle selected style class
			// oPath.toggleClass("selected");

			// if it is in the selected list, remove it
			// else, add it to the list
			// const aSelected = this.getView().getModel("selected").getProperty("/");

			// this.getView().getModel("selected").setProperty("/",
			// 	aSelected.some(item => item.description === sDescription) ?
			// 	aSelected.filter(item => item.description !== sDescription) :
			// 	aSelected.concat({
			// 		countryId: sCountry,
			// 		description: sDescription
			// 	}))
		},

		onSvgContainerRendered(oEvent) {

			// get all path elements inside the svg
			const aPaths = oEvent.getSource().$().find("path");

			// check elements are already in the DOM
			if (!aPaths.length) return

			// register onclick event for the elements
			aPaths.bind("click", this._handlePathClick.bind(this));
		},
		onPressclear: function () {
			// this._ModelInitialLoad();
			this.getView().getModel("SearchViewModel").setProperty("/SideList", []);
			// this.loadSVG();
			var activeElements = document.querySelectorAll('.maplink.active');
			activeElements.forEach(el => el.classList.remove('active'));
		},
		handleNav: function (evt) {
			var navCon = this.byId("id_VInavCon");
			var target = evt.getSource().data("target");
			if (target) {
				// var animation = this.byId("animationSelect").getSelectedKey();
				navCon.to(this.byId(target), "fade");
			} else {
				navCon.back();
			}
		},
		onpressNext: function () {
			this.getView().getModel("SearchViewModel").setProperty("/PreviousEnable", true);
			var SOItems = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
			var CurrItem = this.getView().getModel("VIRGlobalModel").getProperty("/CurrItemNo");
			var index = SOItems.findIndex(E => E.Item === CurrItem);


			if (SOItems.length - 1 !== index) {
				var service = SOItems[index + 1].ServiceName;
				SOItems[index + 1].Highlight = "Information";
				CurrItem = parseInt(CurrItem) + 10;
			}
			SOItems[index].Highlight = "Success";

			this.getView().getModel("VIRGlobalModel").setProperty("/CurrItemNo", CurrItem.toString());
			if (service === "Traffic Test") {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("TrafficTest", false);
			} else if (service === "Comprehensive Test") {
				this.getView().getModel("SearchViewModel").setProperty("/ComprehensivetestbtnVisible", true);
			} else if (service === "ESMA with Reg") {
				this.getView().getModel("SearchViewModel").setProperty("/ESMABtnVisible", true);
			}
			this.getView().getModel("VIRGlobalModel").setProperty("/ServiceItems", SOItems);
		},
		_ModelInitialLoad: function () {
			var imagepath = this.getView().getModel("imageModel").getData().path;
			var oData = {
				"SideContent": false,
				"CurrItemNo": "10",
				"LightsVisible": false,
				"DefaultVisible": true,
				"Currlist": "",
				"NewSearchFieldEditable": false,
				"PermitColorEditable": false,
				"PermitVehKindEditable": false,
				"PermitFuelTypeEditable": false,
				"PreviousEnable": false,
				"PendingReq": [],
				"BtnEnabled": false,
				"ESMABtnVisible": false,
				"ComprehensivetestbtnVisible": false,
				"InteriorSideList": [],
				"SideList": [],
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
				"Interiorlist": [{
					"Interior": "Lights",
					"Highlight": "None",
				}, {
					"Interior": "Steering and Suspension System",
					"Highlight": "None",
				}, {
					"Interior": "Brake System",
					"Highlight": "None",
				}, {
					"Interior": "Tires and Rims",
					"Highlight": "None",
				}, {
					"Interior": "Body",
					"Highlight": "None",
				}, {
					"Interior": "Windows and Mirrors",
					"Highlight": "None",
				}, {
					"Interior": "General Items",
					"Highlight": "None",
				}, {
					"Interior": "Taxi and General Transportations",
					"Highlight": "None",
				}, {
					"Interior": "Specifications and Mensurmenst",
					"Highlight": "None",
				}, {
					"Interior": "Comments",
					"Highlight": "None",
				}, {
					"Interior": "Vehicle Transfer",
					"Highlight": "None",
				}, {
					"Interior": "Chassis",
					"Highlight": "None",
				}, {
					"Interior": "Attachments",
					"Highlight": "None",
				}, {
					"Interior": "Exhaust",
					"Highlight": "None",
				}],
				"LightList": [{
					"Material": "Repair Front Lights(Low)",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false,
					"Highlight": "None",
				}, {
					"Material": "Repair Front Lights(High)",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false,
					"Highlight": "None",
				}, {
					"Material": "Repair Rear Lights",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false,
					"Highlight": "None",
				}, {
					"Material": "Repair Signal Lights",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false,
					"Highlight": "None",
				}, {
					"Material": "Repair Brake Lights",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false,
					"Highlight": "None",
				}, {
					"Material": "Repair Reverse Lights",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false,
					"Highlight": "None",
				}, {
					"Material": "Fix Lights Properly",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false,
					"Highlight": "None",
				}, {
					"Material": "Remove Fog Lights",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false,
					"Highlight": "None"
				}],
				"BrakeList": [{
					"Material": "Repair/Adjust Brake",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false
				}, {
					"Material": "Repair Brake Booster",
					"Selected": false,
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false
				}, {
					"Material": "Repair Brake Hose",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false
				}, {
					"Material": "Repair Brake Piping",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false
				}, {
					"Material": "Repair or Replace Master Cylinder",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false
				}, {
					"Material": "Repair	wheel cylinder oil leak",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false
				}],
				"AttachmentList": [{
					"Material": "Chassis measurement report attached",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false
				}, {
					"Material": "Wheel Alignment report attached",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false
				}, {
					"Material": "Attachment product label Certificate",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false
				}, {
					"Material": "Agency certificate attached",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false
				}, {
					"Material": "Attach Civil Defense Permit",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false
				}, {
					"Material": "Attach Trans AD Permit",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false
				}, {
					"Material": "Vehicle according to GCC spec-attached",
					"Selected": false,
					"LocationDefectArray": [],
					"SubComments": "",
					"Visible": false
				}],
				"VIStatus": [{
					"Location": "Front Left",
					"Highlight": "None"
				}, {
					"Location": "Front Center",
					"Highlight": "None"
				}, {
					"Location": "Front Right",
					"Highlight": "None"
				}, {
					"Location": "Center Left",
					"Highlight": "None"
				}, {
					"Location": "Center",
					"Highlight": "None"
				}, {
					"Location": "Center Right",
					"Highlight": "None"
				}, {
					"Location": "Rear Left",
					"Highlight": "None"
				}, {
					"Location": "Rear Center",
					"Highlight": "None"
				}, {
					"Location": "Rear Right",
					"Highlight": "None"
				}],
				"VIStatusFrontLeft": [{
					"Location": "Front Left",
					"Highlight": "None"
				}],
				"VIStatusCenterLeft": [{
					"Location": "Center Left",
					"Highlight": "None"
				}],
				"VIStatusRearLeft": [{
					"Location": "Rear Left",
					"Highlight": "None"
				}],
				"VIStatusFrontCenter": [{
					"Location": "Front Center",
					"Highlight": "None"
				}],
				"VIStatusCenter": [{
					"Location": "Center",
					"Highlight": "None"
				}],
				"VIStatusRearCenter": [{
					"Location": "Rear Center",
					"Highlight": "None"
				}],
				"VIStatusFrontRight": [{
					"Location": "Front Right",
					"Highlight": "None"
				}],
				"VIStatusCenterRight": [{
					"Location": "Center Right",
					"Highlight": "None"
				}],
				"VIStatusRearRight": [{
					"Location": "Rear Right",
					"Highlight": "None"
				}],
				"NewMaterialList": [

					{
						"Material": "Lights",
						"MaterialName": "Lube Change",
						"MaterialType": "SER",
						"UOM": "L",
						"NetPrice": "49.00",
						"TaxPrice": "1.50",
						"Total": "50.50",
						"Stock": "25",
						"ConsignmentStock": "125",
						"Highlight": "None",
						"Type": "Active",
						"LPG": "",
						"image": imagepath + "/image/insplights.png"
					}, {
						"Material": "Attachments",
						"MaterialName": "Repair & Services",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "99.00",
						"TaxPrice": "2.50",
						"Stock": "250",
						"ConsignmentStock": "27",
						"Highlight": "None",
						"Type": "Active",
						"LPG": "",
						"image": imagepath + "/image/Inspattachment.png"
					}, {
						"Material": "Brake System",
						"MaterialName": "Tire Change",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "29.00",
						"TaxPrice": "1.50",
						"Stock": "200",
						"ConsignmentStock": "20",
						"Highlight": "None",
						"Type": "Active",
						"LPG": "",
						"image": imagepath + "/image/inspbrakes.png"
					}, {
						"Material": "Check AC Coolant",
						"MaterialName": "Voyager Gold",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "29.00",
						"TaxPrice": "1.50",
						"Stock": "70",
						"ConsignmentStock": "20",
						"Highlight": "None",
						"Type": "Active",
						"LPG": "",
						"image": imagepath + "/image/inspac.png"
					}, {
						"Material": "Brake Fluid Check",
						"MaterialName": "Repair Oil Leak",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "24.00",
						"TaxPrice": "1.50",
						"Stock": "100",
						"ConsignmentStock": "10",
						"Highlight": "None",
						"Type": "Active",
						"LPG": "",
						"image": imagepath + "/image/inspfluid.png"
					}, {
						"Material": "Repair Oil Leak",
						"MaterialName": "Remove Extra Seat",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "20.00",
						"TaxPrice": "1.50",
						"Stock": "100",
						"ConsignmentStock": "25",
						"Highlight": "None",
						"Type": "Active",
						"LPG": "",
						"image": imagepath + "/image/inspoilleak.png"
					}, {
						"Material": "Remove Extra Seat",
						"MaterialName": "Grease",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "10.00",
						"TaxPrice": "1.50",
						"Stock": "100",
						"ConsignmentStock": "55",
						"Highlight": "None",
						"Type": "Active",
						"LPG": "",
						"image": imagepath + "/image/inspseat.png"
					}, {
						"Material": "Repair Clutch",
						"MaterialName": "Brake Fluid Check",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "25.00",
						"TaxPrice": "1.50",
						"Stock": "100",
						"ConsignmentStock": "75",
						"Highlight": "None",
						"Type": "Active",
						"LPG": "",
						"image": imagepath + "/image/inspclutch.png"
					},

					{
						"Material": "Repair Horn",
						"MaterialName": "Engine Oil",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "55.00",
						"TaxPrice": "1.50",
						"Stock": "120",
						"ConsignmentStock": "50",
						"Highlight": "None",
						"Type": "Active",
						"LPG": "",
						"image": imagepath + "/image/insphorn.png"
					}, {
						"Material": "Refill Fire Extinguisher",
						"MaterialName": "Windshield Washer",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "25.00",
						"TaxPrice": "1.50",
						"Stock": "120",
						"ConsignmentStock": "30",
						"Highlight": "None",
						"Type": "Active",
						"LPG": "",
						"image": imagepath + "/image/inspfire.png"
					}
				],

				"ServiceTestLayoutVisible" : true
			};

			var MasterViewModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(MasterViewModel, "SearchViewModel");

		},
		onSwitchpress: function (oEvent) {
			if (oEvent.getSource().getState() === true) {
				var obj = oEvent.getSource().getBindingContext("SearchViewModel").getObject();
				if (obj.Interior === "Lights") {
					var arrLightList = this.getView().getModel("SearchViewModel").getProperty("/LightList");
					this.getView().getModel("SearchViewModel").setProperty("/InteriorSideList", arrLightList);
					// this.getView().getModel("SearchViewModel").setProperty("/LightsVisible", true);
					// this.getView().getModel("SearchViewModel").setProperty("/DefaultVisible", false);
				} else if (obj.Interior === "Attachments") {
					var arrAttachmentList = this.getView().getModel("SearchViewModel").getProperty("/AttachmentList");
					this.getView().getModel("SearchViewModel").setProperty("/InteriorSideList", arrAttachmentList);
				} else if (obj.Interior === "Brake System") {
					var arrBrakeList = this.getView().getModel("SearchViewModel").getProperty("/BrakeList");
					this.getView().getModel("SearchViewModel").setProperty("/InteriorSideList", arrBrakeList);
				} else {
					this.getView().getModel("SearchViewModel").setProperty("/InteriorSideList", []);
				}

				this.getView().getModel("SearchViewModel").setProperty("/Currlist", obj.Interior);
			} else {
				this.getView().getModel("SearchViewModel").setProperty("/InteriorSideList", []);
				var obj = oEvent.getSource().getBindingContext("SearchViewModel").getObject();

				this.getView().getModel("SearchViewModel").setProperty("/Currlist", "");

				if (obj.Interior === "Lights") {
					var arrLightList = this.getView().getModel("SearchViewModel").getProperty("/LightList");

					for (var i = 0; i < arrLightList.length; i++) {
						arrLightList[i].Selected = false;
						arrLightList[i].SubComments = "";
						arrLightList[i].LocationDefectArray = [];
						arrLightList[i].Visible = false;
					}
					this.getView().getModel("SearchViewModel").setProperty("/LightList", arrLightList);
				} else if (obj.Interior === "Attachments") {
					var arrAttachmentList = this.getView().getModel("SearchViewModel").getProperty("/AttachmentList");

					for (var i = 0; i < arrAttachmentList.length; i++) {
						arrAttachmentList[i].Selected = false;
						arrAttachmentList[i].SubComments = "";
						arrAttachmentList[i].LocationDefectArray = [];
						arrAttachmentList[i].Visible = false;
					}
					this.getView().getModel("SearchViewModel").setProperty("/AttachmentList", arrAttachmentList);
				} else if (obj.Interior === "Brake System") {
					var arrBrakeList = this.getView().getModel("SearchViewModel").getProperty("/BrakeList");
					for (var i = 0; i < arrBrakeList.length; i++) {
						arrBrakeList[i].Selected = false;
						arrBrakeList[i].SubComments = "";
						arrBrakeList[i].LocationDefectArray = [];
						arrBrakeList[i].Visible = false;
					}
					this.getView().getModel("SearchViewModel").setProperty("/BrakeList", arrBrakeList);
				} else {

				}
			}
		},
		handleInterirorPress: function (oEvent) {
			var obj = oEvent.getSource().getBindingContext("SearchViewModel").getObject();
			if (obj.Interior === "Lights") {
				var arrLightList = this.getView().getModel("SearchViewModel").getProperty("/LightList");
				this.getView().getModel("SearchViewModel").setProperty("/InteriorSideList", arrLightList);
			} else if (obj.Interior === "Attachments") {
				var arrAttachmentList = this.getView().getModel("SearchViewModel").getProperty("/AttachmentList");
				this.getView().getModel("SearchViewModel").setProperty("/InteriorSideList", arrAttachmentList);
			} else if (obj.Interior === "Brake System") {
				var arrBrakeList = this.getView().getModel("SearchViewModel").getProperty("/BrakeList");
				this.getView().getModel("SearchViewModel").setProperty("/InteriorSideList", arrBrakeList);
			}
			oEvent.getSource().getBindingContext("SearchViewModel").getObject().State = true;
			this.getView().getModel("SearchViewModel").setProperty("/Currlist", obj.Interior);
			this.getView().getModel("SearchViewModel").refresh();
		},
		onExit: function () {

			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("GenerateReq", false);

		},
		onPressCompretest: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("ComprehensiveTest", false);
		},
		onPressESMA: function () {
			if (!this.VIESMAFrag) {
				this.VIESMAFrag = sap.ui.xmlfragment("VIR.fragment.ESMAConditions", this);
				this.getView().addDependent(this.VIESMAFrag);
			}
			this.VIESMAFrag.open();
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
							var SOItems = that.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
							var CurrItem = that.getView().getModel("VIRGlobalModel").getProperty("/CurrItemNo");
							var index = SOItems.findIndex(E => E.Item === CurrItem);
							SOItems[index].Highlight = "Success";
							if (SOItems.length - 1 !== index) {
								SOItems[index + 1].Highlight = "Information";
								CurrItem = parseInt(CurrItem) + 10;
							}
							var Servicename = SOItems[index].ServiceName;

							that.getView().getModel("VIRGlobalModel").setProperty("/ServiceItems", SOItems);
							that.getView().getModel("VIRGlobalModel").setProperty("/CurrItemNo", CurrItem.toString());
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
			this.VIESMAFrag.close();
		},
		onselectList: function (oEvent) {
			var servicename = oEvent.getSource().getBindingContext("VIRGlobalModel").getObject().ServiceName;
			var item = oEvent.getSource().getBindingContext("VIRGlobalModel").getObject().Item;
			this.getView().getModel("SearchViewModel").setProperty("/ServiceItem", item);
			this.getView().getModel("SearchViewModel").setProperty("/Servicename", servicename);
			var navCon = this.byId("id_VInavCon");
			navCon.to(this.byId("p1"), "fade");
			if (servicename === "Traffic Test") {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("TrafficTest", false);
				this.getView().getModel("VIRGlobalModel").setProperty("/VisualVisible", false);
			} else if (servicename === "Comprehensive Test") {
				this.getView().getModel("SearchViewModel").setProperty("/ESMABtnVisible", false);
				this.getView().getModel("SearchViewModel").setProperty("/ComprehensivetestbtnVisible", true);
				this.getView().getModel("VIRGlobalModel").setProperty("/VisualVisible", true);
			} else if (servicename === "ESMA with Reg") {
				this.getView().getModel("SearchViewModel").setProperty("/ComprehensivetestbtnVisible", false);
				this.getView().getModel("SearchViewModel").setProperty("/ESMABtnVisible", true);
				this.getView().getModel("VIRGlobalModel").setProperty("/VisualVisible", true);
			} else if (servicename.includes("Change")) {
				this.onPressAdpolice();
				var navCon = this.byId("id_VInavCon");
				navCon.to(this.byId("p3"), "fade");
				if (servicename === "Change Color") {
					this.getView().getModel("SearchViewModel").setProperty("/PermitColorEditable", true);
				} else if (servicename === "Change Fuel Type") {
					this.getView().getModel("SearchViewModel").setProperty("/PermitFuelTypeEditable", true);
				} else if (servicename === "Change Vehicle Kind") {
					this.getView().getModel("SearchViewModel").setProperty("/PermitVehKindEditable", true);
				}
				this.getView().getModel("VIRGlobalModel").setProperty("/VisualVisible", true);
			} else {
				this.getView().getModel("VIRGlobalModel").setProperty("/VisualVisible", true);
			}
		},
		onPressAdpolice: function () {

			this.getView().getModel("SearchViewModel").setProperty("/Chassisno", "JTEBU25J9959041");
			this.getView().getModel("VIRGlobalModel").setProperty("/Chassisno", "JTEBU25J9959041");
			this.getView().getModel("SearchViewModel").setProperty("/Engineno", "1GR5709102");
			this.getView().getModel("VIRGlobalModel").setProperty("/Engineno", "1GR5709102");
			this.getView().getModel("SearchViewModel").setProperty("/Country", "Germany");
			this.getView().getModel("VIRGlobalModel").setProperty("/Country", "Germany");
			this.getView().getModel("SearchViewModel").setProperty("/Manufacturer", "BMW");
			this.getView().getModel("VIRGlobalModel").setProperty("/Manufacturer", "BMW");
			this.getView().getModel("SearchViewModel").setProperty("/Model", "X5");
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
			this.getView().getModel("SearchViewModel").setProperty("/CustomerName", "Mohammed Azar");
			this.getView().getModel("VIRGlobalModel").setProperty("/CustomerName", "Mohammed Azar");
			var mail = "mohammedazar@gmail.com";
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
			// this.getView().getModel("SearchViewModel").setProperty("/HeaderEmail", "mohammedazar@gmail.com");
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

		},
		onDeleteParts: function (oEvent) {

			var Path = oEvent.getSource().getBindingContext("SearchViewModel").getPath();
			var vIndex = parseInt(Path.substring(Path.lastIndexOf('/') + 1));
			var oModel = this.getView().getModel("SearchViewModel");
			MessageBox.confirm(
				"Are you sure want to Delete?", {
				icon: MessageBox.Icon.CONFIRM,
				title: "Confirmation",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === "YES") {
						var data = oModel.getProperty("/SideList");
						data.splice(vIndex, 1);
						oModel.setProperty("/SideList", data);
					} else if (oAction === "NO") { }
				}.bind(this)
			});

		},
		onOpenComments: function () {
			if (!this.VICommentsFrag) {
				this.VICommentsFrag = sap.ui.xmlfragment("VIR.fragment.Comment", this);
				this.getView().addDependent(this.VICommentsFrag);
			}
			this.VICommentsFrag.open();
		},
		onCloseComments: function () {
			this.VICommentsFrag.close();
		},
		onpresssaveconf: function () {
			sap.m.MessageToast.show("Vehicle Details Updated Successfully.");
		},
		onListSelect: function (oEvent) {
			if (oEvent.getSource().getSelected() === true) {
				if (!this.VIStatusFrag) {
					this.VIStatusFrag = sap.ui.xmlfragment("VIR.fragment.VIStatus", this);
					this.getView().addDependent(this.VIStatusFrag);
				}
				this.VIStatusFrag.open();


				var currObj = oEvent.getSource().getBindingContext("SearchViewModel").getObject();
				var path = oEvent.getSource().getBindingContext("SearchViewModel").getPath().split("/")[2]
				this.object = parseInt(path);
				this.object1 = currObj;

				// var VIStatusItems = this.getView().getModel("SearchViewModel").getProperty("/VIStatus");

				var VIFLArr = this.getView().getModel("SearchViewModel").getData().VIStatusFrontLeft;
				var VICFArr = this.getView().getModel("SearchViewModel").getData().VIStatusCenterLeft;
				var VIRLArr = this.getView().getModel("SearchViewModel").getData().VIStatusRearLeft;
				var VIFCArr = this.getView().getModel("SearchViewModel").getData().VIStatusFrontCenter;
				var VICArr = this.getView().getModel("SearchViewModel").getData().VIStatusCenter;
				var VIRCArr = this.getView().getModel("SearchViewModel").getData().VIStatusRearCenter;
				var VIFRArr = this.getView().getModel("SearchViewModel").getData().VIStatusFrontRight;
				var VICRArr = this.getView().getModel("SearchViewModel").getData().VIStatusCenterRight;
				var VIRRArr = this.getView().getModel("SearchViewModel").getData().VIStatusRearRight;
				var Clubarray = [];
				Clubarray = Clubarray.concat(VIFLArr, VICFArr, VIRLArr, VIFCArr, VICArr, VIRCArr, VIFRArr, VICRArr, VIRRArr);

				for (var a = 0; a < Clubarray.length; a++) {
					Clubarray[a].Highlight = "None";
				}
				if (currObj.LocationDefectArray.length !== 0) {
					for (var i = 0; i < currObj.LocationDefectArray.length; i++) {
						for (var j = 0; j < Clubarray.length; j++) {
							if (Clubarray[j].Location === currObj.LocationDefectArray[i].Location) {
								Clubarray[j].Highlight = "Information";
							}
						}
					}
				}

				this.getView().getModel("SearchViewModel").refresh();
			}
		},
		onCloseVIStatusf4: function () {
			this.VIStatusFrag.close();
			var lightsarr = this.getView().getModel("SearchViewModel").getProperty("/LightList");
			this.object = "";
		},
		onPress1: function (oEvent) {
			var ListObject = oEvent.getSource().getBindingContext("SearchViewModel").getObject();
			if (ListObject.Highlight === "None") {
				this.getView().getModel("SearchViewModel").setProperty("/ServiceTestLayoutVisible", false);
				
				// var arrMaterialf4 = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
				// var selectedmaterial = arrMaterialf4.filter(function (e) {
				// 	return e.Material === ListObject.Material;
				// });
				// if (selectedmaterial.length === 0) {
				oEvent.getSource().getBindingContext("SearchViewModel").getObject().Highlight = "Information";

				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].removeStyleClass(
					"cl_materialbluetxt");
				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].addStyleClass(
					"cl_materialwhiteTXT");
				/*Location*/
				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].addStyleClass("cl_whiteTXT");


				oEvent.getSource().removeStyleClass("cl_whitematetialgridlist");
				oEvent.getSource().addStyleClass("cl_bluematerialgridlist");
				// } else {
				// 	sap.m.MessageToast.show("This material is already selected");
				// }
				if (ListObject.Interior === "Lights") {
					var arrLightList = this.getView().getModel("SearchViewModel").getProperty("/LightList");
					this.getView().getModel("SearchViewModel").setProperty("/InteriorSideList", arrLightList);
					// this.getView().getModel("SearchViewModel").setProperty("/LightsVisible", true);
					// this.getView().getModel("SearchViewModel").setProperty("/DefaultVisible", false);
				} else if (ListObject.Interior === "Attachments") {
					var arrAttachmentList = this.getView().getModel("SearchViewModel").getProperty("/AttachmentList");
					this.getView().getModel("SearchViewModel").setProperty("/InteriorSideList", arrAttachmentList);
				} else if (ListObject.Interior === "Brake System") {
					var arrBrakeList = this.getView().getModel("SearchViewModel").getProperty("/BrakeList");
					this.getView().getModel("SearchViewModel").setProperty("/InteriorSideList", arrBrakeList);
				} else {
					this.getView().getModel("SearchViewModel").setProperty("/InteriorSideList", []);
				}
				var navCon = this.byId("id_VItempnavCon");
				navCon.to(this.byId("pt2"), "fade");

			} else {
				this.getView().getModel("SearchViewModel").setProperty("/ServiceTestLayoutVisible", true);
				

				oEvent.getSource().getBindingContext("SearchViewModel").getObject().Highlight = "None";

				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].removeStyleClass(
					"cl_materialwhiteTXT");
				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].addStyleClass("cl_materialbluetxt");

				/*Location*/
				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].removeStyleClass("cl_whiteTXT");


				oEvent.getSource().removeStyleClass("cl_bluematerialgridlist");
				oEvent.getSource().addStyleClass("cl_whitematetialgridlist");

			}
			this.getView().getModel("SearchViewModel").refresh();
		},
		onPress2: function (oEvent) {
			var ListObject = oEvent.getSource().getBindingContext("SearchViewModel").getObject();
			if (ListObject.Highlight === "None") {
				// var arrMaterialf4 = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
				// var selectedmaterial = arrMaterialf4.filter(function (e) {
				// 	return e.Material === ListObject.Material;
				// });
				// if (selectedmaterial.length === 0) {
				oEvent.getSource().getBindingContext("SearchViewModel").getObject().Highlight = "Information";

				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].removeStyleClass(
					"cl_materialbluetxt");
				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].addStyleClass(
					"cl_materialwhiteTXT");
				/*Location*/
				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].addStyleClass("cl_whiteTXT");


				oEvent.getSource().removeStyleClass("cl_whitematetialgridlist");
				oEvent.getSource().addStyleClass("cl_bluematerialgridlist");
				// } else {
				// 	sap.m.MessageToast.show("This material is already selected");
				// }


				var navCon = this.byId("id_VItempnavCon");
				navCon.to(this.byId("pt3"), "fade");

			} else {

				oEvent.getSource().getBindingContext("SearchViewModel").getObject().Highlight = "None";

				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].removeStyleClass(
					"cl_materialwhiteTXT");
				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].addStyleClass("cl_materialbluetxt");

				/*Location*/
				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].removeStyleClass("cl_whiteTXT");


				oEvent.getSource().removeStyleClass("cl_bluematerialgridlist");
				oEvent.getSource().addStyleClass("cl_whitematetialgridlist");

			}
			this.getView().getModel("SearchViewModel").refresh();
		},
		onPressLocation: function (oEvent) {

			var ListObject = oEvent.getSource().getBindingContext("SearchViewModel").getObject();
			if (ListObject.Highlight === "None") {

				oEvent.getSource().getBindingContext("SearchViewModel").getObject().Highlight = "Information";

				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].removeStyleClass(
					"cl_materialbluetxt");
				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].addStyleClass(
					"cl_materialwhiteTXT");
				/*Location*/
				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].addStyleClass("cl_whiteTXT");


				oEvent.getSource().removeStyleClass("cl_whitematetialgridlist");
				oEvent.getSource().addStyleClass("cl_bluematerialgridlist");
				// var navCon = this.byId("id_VItempnavCon");
				// navCon.to(this.byId("pt3"), "fade");
				this.getView().getModel("SearchViewModel").setProperty("/BtnEnabled", true);

			} else {

				oEvent.getSource().getBindingContext("SearchViewModel").getObject().Highlight = "None";

				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].removeStyleClass(
					"cl_materialwhiteTXT");
				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].addStyleClass("cl_materialbluetxt");

				/*Location*/
				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].removeStyleClass("cl_whiteTXT");


				oEvent.getSource().removeStyleClass("cl_bluematerialgridlist");
				oEvent.getSource().addStyleClass("cl_whitematetialgridlist");

			}
			this.getView().getModel("SearchViewModel").refresh();
		},
		onpresssaveVIstatus: function () {
			// var VIStatusLocation = this.getView().getModel("SearchViewModel").getData().VIStatus;
			var Clubarray = [];
			var VIFLArr = this.getView().getModel("SearchViewModel").getData().VIStatusFrontLeft;
			var VICFArr = this.getView().getModel("SearchViewModel").getData().VIStatusCenterLeft;
			var VIRLArr = this.getView().getModel("SearchViewModel").getData().VIStatusRearLeft;
			var VIFCArr = this.getView().getModel("SearchViewModel").getData().VIStatusFrontCenter;
			var VICArr = this.getView().getModel("SearchViewModel").getData().VIStatusCenter;
			var VIRCArr = this.getView().getModel("SearchViewModel").getData().VIStatusRearCenter;
			var VIFRArr = this.getView().getModel("SearchViewModel").getData().VIStatusFrontRight;
			var VICRArr = this.getView().getModel("SearchViewModel").getData().VIStatusCenterRight;
			var VIRRArr = this.getView().getModel("SearchViewModel").getData().VIStatusRearRight;
			Clubarray = Clubarray.concat(VIFLArr, VICFArr, VIRLArr, VIFCArr, VICArr, VIRCArr, VIFRArr, VICRArr, VIRRArr);
			var arrselected = Clubarray.filter(function (e) {
				return e.Highlight === "Information";
			});
			if (arrselected.length !== 0) {
				// this.object.LocationDefectArray = arrselected;
				var currlist = this.getView().getModel("SearchViewModel").getProperty("/Currlist");
				if (currlist === "Lights") {
					var lightsarr = this.getView().getModel("SearchViewModel").getProperty("/LightList");
					lightsarr[this.object].LocationDefectArray = arrselected;
					this.getView().getModel("SearchViewModel").setProperty("/LightList", lightsarr);
				} else if (currlist === "Brake System") {
					var BrakeListarr = this.getView().getModel("SearchViewModel").getProperty("/BrakeList");
					BrakeListarr[this.object].LocationDefectArray = arrselected;
					this.getView().getModel("SearchViewModel").setProperty("/BrakeList", BrakeListarr);
				} else if (currlist === "Attachments") {
					var arrAttachmentList = this.getView().getModel("SearchViewModel").getProperty("/AttachmentList");
					arrAttachmentList[this.object].LocationDefectArray = arrselected;
					this.getView().getModel("SearchViewModel").setProperty("/AttachmentList", arrAttachmentList);
				}
				this.object1.Visible = true;
				this.VIStatusFrag.close();
				this.getView().getModel("SearchViewModel").refresh();
				this.getView().getModel("SearchViewModel").setProperty("/BtnEnabled", true);
			} else {
				sap.m.MessageToast.show("Please Select the location of the Defect");
			}

		},
		onOpenDefects: function (oEvent) {
			if (!this.VIStatusFrag) {
				this.VIStatusFrag = sap.ui.xmlfragment("VIR.fragment.VIStatus", this);
				this.getView().addDependent(this.VIStatusFrag);
			}
			this.VIStatusFrag.open();



			var currObj = oEvent.getSource().getBindingContext("SearchViewModel").getObject();
			var path = oEvent.getSource().getBindingContext("SearchViewModel").getPath().split("/")[2];
			this.object = parseInt(path);
			var temp = currObj.LocationDefectArray;
			// var VIStatusItems = this.getView().getModel("SearchViewModel").getProperty("/VIStatus");

			var VIFLArr = this.getView().getModel("SearchViewModel").getData().VIStatusFrontLeft;
			var VICFArr = this.getView().getModel("SearchViewModel").getData().VIStatusCenterLeft;
			var VIRLArr = this.getView().getModel("SearchViewModel").getData().VIStatusRearLeft;
			var VIFCArr = this.getView().getModel("SearchViewModel").getData().VIStatusFrontCenter;
			var VICArr = this.getView().getModel("SearchViewModel").getData().VIStatusCenter;
			var VIRCArr = this.getView().getModel("SearchViewModel").getData().VIStatusRearCenter;
			var VIFRArr = this.getView().getModel("SearchViewModel").getData().VIStatusFrontRight;
			var VICRArr = this.getView().getModel("SearchViewModel").getData().VIStatusCenterRight;
			var VIRRArr = this.getView().getModel("SearchViewModel").getData().VIStatusRearRight;
			var Clubarray = [];
			Clubarray = Clubarray.concat(VIFLArr, VICFArr, VIRLArr, VIFCArr, VICArr, VIRCArr, VIFRArr, VICRArr, VIRRArr);

			for (var a = 0; a < Clubarray.length; a++) {
				Clubarray[a].Highlight = "None";
			}
			if (currObj.LocationDefectArray.length !== 0) {
				for (var i = 0; i < currObj.LocationDefectArray.length; i++) {
					for (var j = 0; j < Clubarray.length; j++) {
						if (Clubarray[j].Location === currObj.LocationDefectArray[i].Location) {
							Clubarray[j].Highlight = "Information";
						}
					}
				}
			}

			this.getView().getModel("SearchViewModel").refresh();
		}

	});

});