sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/UIComponent"
], function(Controller, MessageBox, UIComponent) {
	"use strict";

	return Controller.extend("VIR.controller.ComprehensiveTest", {
		onAfterRendering: function() {
			this._ModelInitialLoad();
			this.loadCompData();
		},
		_ModelInitialLoad: function() {
			var currdate = new Date();
			var DateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd-MM-yyyy"
			});
			currdate = DateFormat.format(currdate);
			var oData = {
				"TableData": [],
				"ServiceRequirements": [{
					"Text1": "22 - Vehicle tested as private Car Comprehensive Test",
					"Text2": "22- اختبار المركبة كفحص شامل للسيارات الخاصة"
				}, {
					"Text1": "16 - Vehicle tested as Customer Request",
					"Text2": "تم اختبار السيارة حسب طلب العميل"
				}],
				"Body": [{
					"Text1": "Roof",
					"notPainted": false,
					"Painted": false,
					"text3": "Visual",
					"text4": "مرئي",
					"Text2": "سَطح"
				}, {
					"Text1": "Front Doors",
					"notPainted": false,
					"Painted": false,
					"text3": "Visual",
					"text4": "مرئي",
					"Text2": "الأبواب الأمامية"
				}, {
					"Text1": "Rear Doors",
					"notPainted": false,
					"Painted": false,
					"text3": "Visual",
					"text4": "مرئي",
					"Text2": "الأبواب الأمامية"
				}, {
					"Text1": "Floor",
					"notPainted": false,
					"Painted": false,
					"text3": "Visual",
					"text4": "مرئي",
					"Text2": "أرضية"
				}, {
					"Text1": "Front Bumper",
					"notPainted": false,
					"Painted": false,
					"text3": "Visual",
					"text4": "مرئي",
					"Text2": "المصد الأمامي"
				}, {
					"Text1": "Rear Bumper",
					"notPainted": false,
					"Painted": false,
					"text3": "Visual",
					"text4": "مرئي",
					"Text2": "المصد الأمامي"
				}],
				"Engine": [{
					"Text1": "1 -The vehicle engine conformable to factory measurements",
					"NotAccepted": false,
					"Accepted": false,
					"Yes": false,
					"No": false,
					"Text2": "1- أن يكون محرك المركبة مطابقاً للقياسات المصنعية"
				}, {
					"Text1": "2 - The engine swapped",
					"NotAccepted": false,
					"Accepted": false,
					"Yes": false,
					"No": false,
					"Text2": "2- تبديل المحرك"
				}, {
					"Text1": "3-There turbine chargers (turbo + super)",
					"NotAccepted": false,
					"Accepted": false,
					"Yes": false,
					"No": false,
					"Text2": "3-يوجد شواحن توربينية (تربو + سوبر)"
				}, {
					"Text1": "4- The air filter & its accessories original from factory",
					"NotAccepted": false,
					"Accepted": false,
					"Yes": false,
					"No": false,
					"Text2": "4- فلتر الهواء وملحقاتهالملحقات اصلية منمصنع"
				}, {
					"Text1": "5- The ECU has been modified (programmed)",
					"NotAccepted": false,
					"Accepted": false,
					"Yes": false,
					"No": false,
					"Text2": "5- كانت وحدة التحكم الإلكترونيةمعدلة (مبرمجة)"
				}],
				"Tyres": [{
					"Text1": "1 - The tire size conforms to(road traffic)",
					"NotAccepted": false,
					"Accepted": false,
					"Yes": false,
					"No": false,
					"Text2": "1- مقاس الإطار مطابق لـ(حركة المرور)"
				}, {
					"Text1": "2- The tire type conforms to(road traffic)",
					"NotAccepted": false,
					"Accepted": false,
					"Yes": false,
					"No": false,
					"Text2": "2- نوع الإطار مطابق لـ(حركة المرور على الطرق)"
				}, {
					"Text1": "3 - Tires Condition & is validity conforms to (road traffic)",
					"NotAccepted": false,
					"Accepted": false,
					"Yes": false,
					"No": false,
					"Text2": "3- حالة الإطارات وصلاحيتها مطابقة لـ (حركة المرور)"
				}],
				"CurrDate": currdate

			};

			var MasterViewModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(MasterViewModel, "ComprehensiveTestmodel");

		},
		loadCompData: function() {
			var Tabledata = [];
			var Compdata = [];
			this.getView().getModel("ZSB_LANEANPR_V2").read("/CompData", {
				success: function(oData, oResponse) {
					// this.getView().getModel("VIRGlobalModel").setProperty("/TableData", oData.results);
					oData.results.sort((a, b) => {
						return a.test_type - b.test_type;
					});
					for (var K = 0; K < oData.results.length; K++) {
						var headerObj = {
							"HeaderText1": oData.results[K].test_type_text,
							"HeaderText2": oData.results[K].test_subtype_text,
							"HeaderText3": oData.results[K].method,
							"HeaderText4": oData.results[K].result_label1,
							"HeaderText5": oData.results[K].result_label2,
							"HeaderText6": "مرئي",
							"HeaderText7": "",
							"HeaderType": oData.results[K].test_type,
							"HeaderSubType": oData.results[K].test_subtype,
							"result_label1Value": false,
							"result_label2Value": false,
							"Header": ""
						};
						Compdata.push(headerObj);
					}
					var TypeCount = 0;
					// var compdata = oData.results;
					var aDups = [];
					var aWithoutDup = Compdata.filter(function(el) {
						// If it is not a duplicate, return true
						if (aDups.indexOf(el.HeaderType) == -1) {
							aDups.push(el.HeaderType);
							return true;
						}
						return false;
					});
					for (var i = 0; i < aWithoutDup.length; i++) {
						var filterdata = Compdata.filter(function(e) {
							return e.HeaderType === aWithoutDup[i].HeaderType;
						});
						Tabledata = Tabledata.concat(filterdata);
						if (aWithoutDup[i + 1]) {
							var headerObj = {
								"HeaderText2": aWithoutDup[i + 1].HeaderText1,
								"HeaderText3": "Examination Method",
								"HeaderText4": aWithoutDup[i + 1].HeaderText4,
								"HeaderText5": aWithoutDup[i + 1].HeaderText5,
								"HeaderText6": "طريقة الفحص",
								"HeaderText7": "",
								"Header": "X"
							};
							Tabledata.push(headerObj);
						} else {
							break;
						}
					}
					this.getView().getModel("ComprehensiveTestmodel").setProperty("/Body", Tabledata);
					this.getView().getModel("ComprehensiveTestmodel").setProperty("/TableHeaderText1", aWithoutDup[0].HeaderText1);

				}.bind(this),
				error: function(oError) {
					MessageBox.error(oError.message);
				}
			});
		},
		onSaveComprehensive: function() {
			var SOItems = this.getView().getModel("VIRGlobalModel").getProperty("/ServiceItems");
			var CurrItem = this.getView().getModel("VIRGlobalModel").getProperty("/CurrItemNo");
			var index = SOItems.findIndex(E => E.Item === CurrItem);
			SOItems[index].Highlight = "Success";
			if (SOItems.length - 1 !== index) {
				SOItems[index + 1].Highlight = "Information";
				CurrItem = parseInt(CurrItem) + 10;
			}

			this.getView().getModel("VIRGlobalModel").setProperty("/CurrItemNo", CurrItem.toString());
			this.getView().getModel("VIRGlobalModel").setProperty("/ServiceItems", SOItems);
			var that = this;
			sap.m.MessageToast.show("Data saved Successfully");
			var oRouter = UIComponent.getRouterFor(this);
			this.intervalHandle = setTimeout(function() {
				oRouter.navTo("InspectionTemp", false);
				that.getView().getModel("VIRGlobalModel").setProperty("/Comprehensivetest", "Print Comprehensive Test");

			}, 300);
		},
		onExit: function() {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("InspectionTemp", false);
		},
	});

});