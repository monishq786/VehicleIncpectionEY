sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/UIComponent",
	'sap/ui/core/Fragment'
], function (Controller, MessageBox, UIComponent, Fragment) {
	"use strict";

	return Controller.extend("VIR.controller.PendingRequest", {
		onAfterRendering: function () {
			this._ModelInitialLoad();

		},
		_ModelInitialLoad: function () {
			var currdate = new Date();
			var DateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd/MM/yyyy"
			});
			currdate = DateFormat.format(currdate);
			var oData = {
				"SideContent": false,
				"CurrDate": currdate,
				"Remarks": "",
				"Lane1": [],
				"Lane2": [],
				"Lane3": [],
				"Status": [{
					"Item": "10",
					"Service": "Re-New -Fresh Test",
					"Visual": "X",
					"MahaIn": "X",
					"MahaOut": "",
					"NotApplicable":"",
					"Src":"{imageModel>/path}/image/MahaS.png"

				},
				{
					"Item": "20",
					"Service": "Transfer from Public to Private -Fresh Test",
					"Visual": "X",
					"MahaIn": "X",
					"MahaOut": "",
					"NotApplicable":"",
					"Src":"{imageModel>/path}/image/MahaS.png"

				},{
					"Item": "30",
					"Service": "Traffic Test",
					"Visual": "",
					"MahaIn": "",
					"MahaOut": "",
					"NotApplicable":"",
					"Src":"{imageModel>/path}/image/MahaS.png"

				},{
					"Item": "40",
					"Service": "FIREX-FEX 1KG Powder",
					"Visual": "",
					"MahaIn": "",
					"MahaOut": "",
					"NotApplicable":"X"

				}],
				"PendingReq": [{
					"ReqNo": "339532839",
					"ReqDate": currdate,
					"Plateno": "88329",
					"PlateColor": "55",
					"Kind": "Private",
					"Source": "ABU DHABI",
					"Paymenttype": "Yes",
					"TotalAmt": "In-Progress",
					"Lane": "1",
					"Amout": "125",
					"Customer": "Mohammed Anzar",
					"TrafficTest": "X",
					"Tstatus": "Completed",
					"ComprehensiveTest": "",
					"CStatus": "",
					"Esma": "",
					"EStatus": ""
				}, {
					"ReqNo": "311900929",
					"ReqDate": currdate,
					"Plateno": "82261",
					"PlateColor": "12",
					"Kind": "Private",
					"Source": "ABU DHABI",
					"Paymenttype": "No",
					"TotalAmt": "In-Progress",
					"Lane": "3",
					"Amout": "185",
					"Customer": "Shoail Khan",
					"TrafficTest": "X",
					"Tstatus": "Completed",
					"ComprehensiveTest": "X",
					"CStatus": "Pending",
					"Esma": "",
					"EStatus": ""
				}, {
					"ReqNo": "351092849",
					"ReqDate": currdate,
					"Plateno": "42145",
					"PlateColor": "1",
					"Kind": "Private",
					"Source": "ABU DHABI",
					"Paymenttype": "Yes",
					"TotalAmt": "In-Progress",
					"Lane": "1",
					"Amout": "169",
					"Customer": "Shoib Akthar",
					"TrafficTest": "X",
					"Tstatus": "Completed",
					"ComprehensiveTest": "X",
					"CStatus": "Pending",
					"Esma": "X",
					"EStatus": "Completed"
				}, {
					"ReqNo": "323412346",
					"ReqDate": currdate,
					"Plateno": "65542",
					"PlateColor": "7",
					"Kind": "Private",
					"Source": "ABU DHABI",
					"Paymenttype": "No",
					"TotalAmt": "In-Progress",
					"Lane": "3",
					"Amout": "87",
					"Customer": "Mohammed Irfan",
					"TrafficTest": "",
					"Tstatus": "",
					"ComprehensiveTest": "",
					"CStatus": "",
					"Esma": "",
					"EStatus": ""
				}, {
					"ReqNo": "344532460",
					"ReqDate": currdate,
					"Plateno": "44125",
					"PlateColor": "A",
					"Kind": "Private",
					"Source": "DUBAI",
					"Paymenttype": "No",
					"TotalAmt": "In-Progress",
					"Lane": "2",
					"Amout": "120",
					"Customer": "Mohammed Hafiz",
					"TrafficTest": "",
					"Tstatus": "",
					"ComprehensiveTest": "",
					"CStatus": "",
					"Esma": "",
					"EStatus": ""
				}, {
					"ReqNo": "356267267",
					"ReqDate": currdate,
					"Plateno": "54367",
					"PlateColor": "27",
					"Kind": "Private",
					"Source": "ABU DHABI",
					"Paymenttype": "No",
					"TotalAmt": "In-Progress",
					"Lane": "1",
					"Amout": "130",
					"Customer": "Shahid Khan",
					"TrafficTest": "",
					"Tstatus": "",
					"ComprehensiveTest": "",
					"CStatus": "",
					"Esma": "",
					"EStatus": ""
				}, {
					"ReqNo": "341224678",
					"ReqDate": currdate,
					"Plateno": "33246",
					"PlateColor": "5",
					"Kind": "Private",
					"Source": "ABU DHABI",
					"Paymenttype": "No",
					"TotalAmt": "In-Progress",
					"Lane": "2",
					"Amout": "145",
					"Customer": "Mustaf",
					"TrafficTest": "",
					"Tstatus": "",
					"ComprehensiveTest": "",
					"CStatus": "",
					"Esma": "",
					"EStatus": ""
				}],
				"SideList": [],
				"LightList": [{
					"Material": "Repair Front Lights(Low)"
				}, {
					"Material": "Repair Front Lights(High)"
				}, {
					"Material": "Repair Rear Lights"
				}, {
					"Material": "Repair Signal Lights"
				}, {
					"Material": "Repair Brake Lights"
				}, {
					"Material": "Repair Reverse Lights"
				}, {
					"Material": "Fix Lights Properly"
				}, {
					"Material": "Remove Fog Lights"
				}],
				"BrakeList": [{
					"Material": "Repair/Adjust Brake"
				}, {
					"Material": "Repair Brake Booster"
				}, {
					"Material": "Repair Brake Hose"
				}, {
					"Material": "Repair Brake Piping"
				}, {
					"Material": "Repair or Replace Master Cylinder"
				}, {
					"Material": "Repair	wheel cylinder oil leak"
				}],
				"AttachmentList": [{
					"Material": "Chassis measurement report attached"
				}, {
					"Material": "Wheel Alignment report attached"
				}, {
					"Material": "Attachment product label Certificate"
				}, {
					"Material": "Agency certificate attached"
				}, {
					"Material": "Attach Civil Defense Permit"
				}, {
					"Material": "Attach Trans AD Permit"
				}, {
					"Material": "Vehicle according to GCC spec-attached"
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
						"LPG": ""
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
						"LPG": ""
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
						"LPG": ""
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
						"LPG": ""
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
						"LPG": ""
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
						"LPG": ""
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
						"LPG": ""
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
						"LPG": ""
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
						"LPG": ""
					}, {
						"Material": "Re-Fill Fire Extinguisher",
						"MaterialName": "Windshield Washer",
						"MaterialType": "SER",
						"UOM": "EA",
						"NetPrice": "25.00",
						"TaxPrice": "1.50",
						"Stock": "120",
						"ConsignmentStock": "30",
						"Highlight": "None",
						"Type": "Active",
						"LPG": ""
					}
				]
			};

			var MasterViewModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(MasterViewModel, "SearchViewModel");


			this._getLane();

		},

		_getLane: function () {
			var aPendingReq = this.getView().getModel("SearchViewModel").getProperty("/PendingReq");
			var aLane1 = [];
			var aLane2 = [];
			var aLane3 = [];

			aLane1 = aPendingReq.filter(function (e) {
				return e.Lane === "1";
			});
			this.getView().getModel("SearchViewModel").setProperty("/Lane1", aLane1);

			aLane2 = aPendingReq.filter(function (e) {
				return e.Lane === "2";
			});
			this.getView().getModel("SearchViewModel").setProperty("/Lane2", aLane2);

			aLane3 = aPendingReq.filter(function (e) {
				return e.Lane === "3";
			});
			this.getView().getModel("SearchViewModel").setProperty("/Lane3", aLane3);
			this.getView().getModel("SearchViewModel").refresh();
		},

		onCloseCart: function () {

			MessageBox.confirm(
				"Are you sure want to close?", {
				icon: sap.m.MessageBox.Icon.CONFIRM,
				title: "Confirmation",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === "YES") {
						this.PhyinspFrag.close();
					}
				}.bind(this)
			});
		},
		onPressGo: function () {
			var arr = [{
				"ReqNo": "339532839",
				"ReqDate": "29/03/2024",
				"Plateno": "88329",
				"PlateColor": "Tenth Category",
				"Kind": "Private",
				"Source": "ABU DHABI",
				"Paymenttype": "PaymentModel",
				"TotalAmt": "In-Progress"
			}, {
				"ReqNo": "382950922",
				"ReqDate": "15/04/2024",
				"Plateno": "33157",
				"PlateColor": "Tenth Category",
				"Kind": "Private",
				"Source": "ABU DHABI",
				"Paymenttype": "Success",
				"TotalAmt": "Success"
			}, {
				"ReqNo": "311900929",
				"ReqDate": "10/05/2024",
				"Plateno": "82261",
				"PlateColor": "Tenth Category",
				"Kind": "Private",
				"Source": "ABU DHABI",
				"Paymenttype": "No",
				"TotalAmt": "In-Progress"
			}, {
				"ReqNo": "351092849",
				"ReqDate": "07/06/2024",
				"Plateno": "42145",
				"PlateColor": "Tenth Category",
				"Kind": "Private",
				"Source": "ABU DHABI",
				"Paymenttype": "Success",
				"TotalAmt": "In-Progress"
			}, {
				"ReqNo": "323412346",
				"ReqDate": "04/03/2024",
				"Plateno": "66542",
				"PlateColor": "Tenth Category",
				"Kind": "Private",
				"Source": "ABU DHABI",
				"Paymenttype": "No",
				"TotalAmt": "In-Progress"
			}];
			this.getView().getModel("SearchViewModel").setProperty("/PendingReq", arr);
		},
		onPressReset: function () {
			this._ModelInitialLoad();
		},
		onPressPhyInsp: function (oEvent) {
			var obj = oEvent.getSource().getBindingContext("SearchViewModel").getObject();
			var plateno = obj.Plateno;
			this.getView().getModel("VIRGlobalModel").setProperty("/CurrentInspection", plateno);
			this.getView().getModel("VIRGlobalModel").setProperty("/CurrentOrder", obj.ReqNo);
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("Inspection", false);
			// var ReqArr = this.getView().getModel("SearchViewModel").getProperty("/NewMaterialList");
			// for (var i = 0; i < ReqArr.length; i++) {
			// 	ReqArr[i].Highlight = "None";
			// }
			// this.getView().getModel("SearchViewModel").refresh();
			// if (!this.PhyinspFrag) {
			// 	this.PhyinspFrag = sap.ui.xmlfragment("VIR.fragment.Inspection", this);
			// 	this.getView().addDependent(this.PhyinspFrag);
			// }
			// this.PhyinspFrag.open();
		},
		onPressShortClose: function (oEvent) {
			if (!this.ShortcloseFrag) {
				this.ShortcloseFrag = sap.ui.xmlfragment("VIR.fragment.Shortclose", this);
				this.getView().addDependent(this.ShortcloseFrag);
			}
			this.ShortcloseFrag.open();
			var obj = oEvent.getSource().getBindingContext("SearchViewModel").getObject();
			var plateno = obj.Plateno;
			this.getView().getModel("SearchViewModel").setProperty("/PlateNo", plateno);
			this.getView().getModel("SearchViewModel").setProperty("/Source", obj.Source);
			this.getView().getModel("SearchViewModel").setProperty("/Platec", obj.PlateColor);
			this.getView().getModel("SearchViewModel").setProperty("/VehicleKind", "PRIVATE");
			this.getView().getModel("SearchViewModel").setProperty("/Feepaid", obj.Amout);
			this.getView().getModel("SearchViewModel").setProperty("/Customer", obj.Customer);
		},
		onPressShortClosetest: function () {
			var vRemarks = this.getView().getModel("SearchViewModel").getProperty("/Remarks");

			if (vRemarks) {
				var pendingorderarr = this.getView().getModel("SearchViewModel").getProperty("/PendingReq");
				var plateno = this.getView().getModel("SearchViewModel").getProperty("/PlateNo");

				var index = pendingorderarr.findIndex(E => E.Plateno === plateno);
				pendingorderarr.splice(index, 1);
				this.getView().getModel("SearchViewModel").setProperty("/PendingReq", pendingorderarr);
				this.ShortcloseFrag.close();
			} else {
				sap.m.MessageToast.show("Please provide remarks to short close");
			}
		},
		onCloseShortclose: function () {
			this.ShortcloseFrag.close();
		},
		onPress1: function (oEvent) {
			var ListObject = oEvent.getSource().getBindingContext("SearchViewModel").getObject();

			if (ListObject.Highlight === "None") {
				// var arrMaterialf4 = this.getView().getModel("SearchViewModel").getProperty("/SelectedMaterialNav");
				// var selectedmaterial = arrMaterialf4.filter(function(e) {
				// 	return e.Material === ListObject.Material;
				// });
				// if (selectedmaterial.length === 0) {
				oEvent.getSource().getBindingContext("SearchViewModel").getObject().Highlight = "Information";

				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].removeStyleClass(
				// 	"cl_materialbluetxt");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].addStyleClass(
				// 	"cl_materialwhiteTXT");
				/*Material*/
				var Material = oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[1].getText();
				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[1].addStyleClass("cl_whiteTXT");
				/*Material Name*/
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[1].getItems()[0].addStyleClass("cl_whiteTXT");
				// /*Stocks */
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[2].getItems()[0].addStyleClass("cl_whiteTXT");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[2].getItems()[1].addStyleClass("cl_whiteTXT");

				oEvent.getSource().removeStyleClass("cl_whitematetialgridlist");
				oEvent.getSource().addStyleClass("cl_bluematerialgridlist");

				this.getView().getModel("SearchViewModel").setProperty("/SideContent", true);
				if (Material === "Lights") {
					var arrLightList = this.getView().getModel("SearchViewModel").getProperty("/LightList");
					this.getView().getModel("SearchViewModel").setProperty("/SideList", arrLightList);
				} else if (Material === "Attachments") {
					var arrAttachmentList = this.getView().getModel("SearchViewModel").getProperty("/AttachmentList");
					this.getView().getModel("SearchViewModel").setProperty("/SideList", arrAttachmentList);
				} else if (Material === "Brake System") {
					var arrBrakeList = this.getView().getModel("SearchViewModel").getProperty("/BrakeList");
					this.getView().getModel("SearchViewModel").setProperty("/SideList", arrBrakeList);
				}

				// } else {
				// 	sap.m.MessageToast.show("This material is already selected");
				// }

			} else {

				oEvent.getSource().getBindingContext("SearchViewModel").getObject().Highlight = "None";

				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].removeStyleClass(
				// 	"cl_materialwhiteTXT");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[0].addStyleClass("cl_materialbluetxt");

				/*Material*/
				oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[0].getItems()[1].removeStyleClass("cl_whiteTXT");
				/*Material Name*/
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[1].getItems()[0].removeStyleClass("cl_whiteTXT");
				// /*Stocks */
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[2].getItems()[0].removeStyleClass("cl_whiteTXT");
				// oEvent.getSource().getContent()[0].getItems()[0].getItems()[0].getItems()[2].getItems()[1].removeStyleClass("cl_whiteTXT");

				oEvent.getSource().removeStyleClass("cl_bluematerialgridlist");
				oEvent.getSource().addStyleClass("cl_whitematetialgridlist");
				// var list = this.getView().getModel("SearchViewModel").getProperty("/NewMaterialList");
				// var selectedlist = list.filter(function(e) {
				// 	return e.Highlight === "Information";
				// });
				// if (selectedlist.length === 0) {
				this.getView().getModel("SearchViewModel").setProperty("/SideContent", false);
				// } else {
				// 	this.getView().getModel("SearchViewModel").setProperty("/SideContent", true);
				// }

			}
			this.getView().getModel("SearchViewModel").refresh();
		},
		onPresspass: function () {
			var ReqArr = this.getView().getModel("SearchViewModel").getProperty("/PendingReq");
			var plateno = this.getView().getModel("SearchViewModel").getProperty("/CurrentInspection");
			for (var i = 0; i < ReqArr.length; i++) {
				if (ReqArr[i].Plateno === plateno) {
					ReqArr[i].TotalAmt = "Success";
				}
			}
			this.getView().getModel("SearchViewModel").refresh();
			this.PhyinspFrag.close();
		},
		onPressFail: function () {
			var ReqArr = this.getView().getModel("SearchViewModel").getProperty("/PendingReq");
			var plateno = this.getView().getModel("SearchViewModel").getProperty("/CurrentInspection");
			for (var i = 0; i < ReqArr.length; i++) {
				if (ReqArr[i].Plateno === plateno) {
					ReqArr[i].TotalAmt = "Fail";
				}
			}
			this.getView().getModel("SearchViewModel").refresh();
			this.PhyinspFrag.close();
		},
		onpressteststatus: function (oEvent) {
			var obj = oEvent.getSource().getBindingContext("SearchViewModel").getObject();
			this.getView().getModel("SearchViewModel").setProperty("/CurrTstatus", obj.Tstatus);
			this.getView().getModel("SearchViewModel").setProperty("/CurrCstatus", obj.CStatus);
			this.getView().getModel("SearchViewModel").setProperty("/CurrEstatus", obj.EStatus);
			this.getView().getModel("SearchViewModel").setProperty("/CurrTVisible", obj.TrafficTest);
			this.getView().getModel("SearchViewModel").setProperty("/CurrCVisible", obj.ComprehensiveTest);
			this.getView().getModel("SearchViewModel").setProperty("/CurrEVisible", obj.Esma);

			if (obj.Tstatus === "Completed") {
				this.getView().getModel("SearchViewModel").setProperty("/CurrTstate", "Success");
			} else if (obj.Tstatus === "Pending") {
				this.getView().getModel("SearchViewModel").setProperty("/CurrTstate", "Warning");
			}
			if (obj.CStatus === "Completed") {
				this.getView().getModel("SearchViewModel").setProperty("/CurrCstate", "Success");
			} else if (obj.CStatus === "Pending") {
				this.getView().getModel("SearchViewModel").setProperty("/CurrCstate", "Warning");
			}
			if (obj.EStatus === "Completed") {
				this.getView().getModel("SearchViewModel").setProperty("/CurrEstate", "Success");
			} else if (obj.EStatus === "Pending") {
				this.getView().getModel("SearchViewModel").setProperty("/CurrEstate", "Warning");
			}
			var oButton = oEvent.getSource();
			if (!this.PrevorderPopover) {
				Fragment.load({
					name: "VIR.fragment.TestStatus",
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
		onPressServiceTest: function (oEvent) {
			var obj = oEvent.getSource().getBindingContext("SearchViewModel").getObject();
			this.getView().getModel("VIRGlobalModel").setProperty("/CustomerName", obj.Customer);
			this.getView().getModel("VIRGlobalModel").setProperty("/PlateNo", obj.Plateno);
			var ServiceItems = [];
			if (obj.TrafficTest) {
				ServiceItems = [{
					"Material": "2700000290",
					"ServiceName": "Traffic Test",
					"Price": "130",
					"VATPer": "5",
					"VAT": "6.50",
					"TotalAmount": "136.50",
					"VisualTest": "X",
					"Item": "10"
				}];
			}
			if (obj.TrafficTest && obj.ComprehensiveTest) {
				ServiceItems = [{
					"Material": "2700000290",
					"ServiceName": "Traffic Test",
					"Price": "130",
					"VATPer": "5",
					"VAT": "6.50",
					"TotalAmount": "136.50",
					"VisualTest": "X",
					"Item": "10"
				}, {
					"Material": "2700000065",
					"ServiceName": "Comprehensive Test",
					"Price": "160",
					"VATPer": "5",
					"VAT": "8.00",
					"TotalAmount": "168.00",
					"VisualTest": "X",
					"Item": "20"
				}];
			}
			if (obj.TrafficTest && obj.ComprehensiveTest && obj.Esma) {
				ServiceItems = [{
					"Material": "2700000290",
					"ServiceName": "Traffic Test",
					"Price": "130",
					"VATPer": "5",
					"VAT": "6.50",
					"TotalAmount": "136.50",
					"VisualTest": "X",
					"Item": "10"
				}, {
					"Material": "2700000065",
					"ServiceName": "Comprehensive Test",
					"Price": "160",
					"VATPer": "5",
					"VAT": "8.00",
					"TotalAmount": "168.00",
					"VisualTest": "X",
					"Item": "20"
				}, {
					"Material": "2700000063",
					"ServiceName": "ESMA Test",
					"Price": "250",
					"VATPer": "5",
					"VAT": "12.50",
					"TotalAmount": "262.50",
					"VisualTest": "X",
					"Item": "30"
				}];
			}
			if (!obj.TrafficTest && !obj.ComprehensiveTest && !obj.Esma) {
				ServiceItems = [{
					"Material": "2700000290",
					"ServiceName": "Re-New",
					"Price": "50",
					"VATPer": "5",
					"VAT": "2.5",
					"TotalAmount": "52.5",
					"VisualTest": "X",
					"Item": "10"
				}];
			}
			this.getView().getModel("VIRGlobalModel").setProperty("/ServiceItems", ServiceItems);
			this.getView().getModel("VIRGlobalModel").setProperty("/Purpose", "Traffic Test");
			this.getView().getModel("VIRGlobalModel").setProperty("/SR", obj.ReqNo);
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("GenerateReq", false);

		},
		onpressstatus: function (oEvent) {
			var oButton = oEvent.getSource();
			if (!this.StatusPopover) {
				Fragment.load({
					name: "VIR.fragment.Status",
					controller: this
				}).then(function (oPopover) {
					this.StatusPopover = oPopover;
					this.getView().addDependent(this.StatusPopover);
					this.StatusPopover.openBy(oButton);
				}.bind(this));
			} else {
				this.StatusPopover.openBy(oButton);
			}
		}

	});

});