sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/m/MessageBox"
], function(Controller, UIComponent, MessageBox) {
	"use strict";

	return Controller.extend("VIR.controller.TrafficTest", {

		onAfterRendering: function() {
			this._ModelInitialLoad();
		},
		_ModelInitialLoad: function() {
			var currdate = new Date();
			var DateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd-MM-yyyy"
			});
			currdate = DateFormat.format(currdate);
			var oData = {
				"ServiceRequirements": [{
					"Text1": "1 - Original letter from traffic department is verified",
					"Text2": "1- يتم التحقق من أصل الرسالة من إدارة المرور"
				}, {
					"Text1": "2 - The vehicle Information Letter is conformable",
					"Text2": "2- أن تكون رسالة معلومات المركبة مطابقة"
				}, {
					"Text1": "3 - Make sure of chassis number",
					"Text2": "3- التأكد من رقم الهيكل"
				}],
				"Body": [{
					"Text1": "1 - Make sure of vehicle level safety (body)",
					"NotAccepted": false,
					"Accepted": false,
					"Yes": false,
					"No": false,
					"Text2": "1- التأكد من مستوى المركبةالسلامة (الجسم)"
				}, {
					"Text1": "2 - The vehicle been raised from front & back",
					"NotAccepted": false,
					"Accepted": false,
					"Yes": false,
					"No": false,
					"Text2": "2- رفع المركبة من الأمام والخلف"
				}, {
					"Text1": "3 - The vehicle been raisedfrom front only",
					"NotAccepted": false,
					"Accepted": false,
					"Yes": false,
					"No": false,
					"Text2": "3- رفع المركبة من الأمام فقط"
				}, {
					"Text1": "4 - The vehicle been raised from back only",
					"NotAccepted": false,
					"Accepted": false,
					"Yes": false,
					"No": false,
					"Text2": "4- رفع المركبة من الخلف فقط"
				}, {
					"Text1": "5 - The vehicle been lowed from front only",
					"NotAccepted": false,
					"Accepted": false,
					"Yes": false,
					"No": false,
					"Text2": "5- إنزال المركبة من الأمام فقط"
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
				"CurrDate": currdate,
				"PrintbtnVisible": false

			};

			var MasterViewModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(MasterViewModel, "Traffictestmodel");

		},
		onSelectNotAccepted: function(oEvent) {
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().NotAccepted = true;
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().Accepted = false;
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().No = true;
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().Yes = false;
			this.getView().getModel("Traffictestmodel").refresh();
		},
		onSelectAccepted: function(oEvent) {
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().Accepted = true;
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().NotAccepted = false;
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().No = false;
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().Yes = true;
			this.getView().getModel("Traffictestmodel").refresh();

		},
		onSelectYes: function(oEvent) {
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().Yes = true;
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().No = false;
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().Accepted = true;
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().NotAccepted = false;
			this.getView().getModel("Traffictestmodel").refresh();
		},
		onSelectNo: function(oEvent) {
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().No = true;
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().Yes = false;
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().NotAccepted = true;
			oEvent.getSource().getBindingContext("Traffictestmodel").getObject().Accepted = false;
			this.getView().getModel("Traffictestmodel").refresh();
		},
		onExit: function() {
			
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("InspectionTemp", false);
		},
		onSubmit: function() {
			sap.m.MessageBox.success("Submitted Successfully");
		},
		onPressApprove: function() {
			MessageBox.confirm(
				"Are you sure want to Approve?", {
					icon: sap.m.MessageBox.Icon.CONFIRM,
					title: "Confirmation",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {
						if (oAction === "YES") {
							this.getView().getModel("Traffictestmodel").setProperty("/PrintbtnVisible", true);
							this.getView().getModel("VIRGlobalModel").setProperty("/Traffictest", "Print Traffic Test");
							var SOItems = this.getView().getModel("VIRGlobalModel").getProperty("/InspItems");
							var CurrItem = this.getView().getModel("VIRGlobalModel").getProperty("/CurrItemNo");
							var index = SOItems.findIndex(E => E.Item === CurrItem);
							SOItems[index].Highlight = "Success";
							if (SOItems.length - 1 !== index) {
								SOItems[index + 1].Highlight = "Information";
								CurrItem = parseInt(CurrItem) + 10;
							}
				
							this.getView().getModel("VIRGlobalModel").setProperty("/CurrItemNo", CurrItem.toString());
							this.getView().getModel("VIRGlobalModel").setProperty("/ServiceItems", SOItems);
						} else if (oAction === "NO") {}
					}.bind(this)
				});
		}

	});

});