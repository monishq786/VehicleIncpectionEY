jQuery.sap.declare("VIR.model.formatter");
VIR.model.formatter = {
	GridListBorder: function (v1) {
		var that = this;
		if (v1 === "Information") {
			that.removeStyleClass("cl_Materialgridlist");
			that.addStyleClass("cl_bordergridlist");
		} else {
			that.removeStyleClass("cl_bordergridlist");
			that.addStyleClass("cl_Materialgridlist");
		}
	},
	MaterialSelectionRemove: function (v1) {
		var that = this;
		if (v1 === "Information") {
			that.removeStyleClass("cl_whitematetialgridlist");
			that.addStyleClass("cl_bluematerialgridlist");
		} else {
			that.removeStyleClass("cl_bluematerialgridlist");
			that.addStyleClass("cl_whitematetialgridlist");
		}
	},
	MaterialSelectionText: function (v1, v2) {
		var that = this;
		if (v2 === "Information") {
			that.removeStyleClass("cl_blueTXT");
			that.addStyleClass("cl_whiteTXT");
		} else {
			that.removeStyleClass("cl_whiteTXT");
			that.addStyleClass("cl_blueTXT");
		}
		return v1;
	},
	Tabletext: function (v1, v2) {
		var that = this;
		if (v2 === "X") {
			that.removeStyleClass("cl_blackTXT");
			that.addStyleClass("cl_whiteTXT");
		} else {
			that.removeStyleClass("cl_whiteTXT");
			that.addStyleClass("cl_blackTXT");
		}
		return v1;
	},
	State: function (v1) {
		var that = this;
		if (v1 === "Yes") {
			that.addStyleClass("cl_objAttri1Success");
		} else if (v1 === "No") {
			that.addStyleClass("cl_objAttri1error");
		}
		return v1;
	},
	Tstate: function (v1) {
		var that = this;
		if (v1 === "Completed") {
			that.addStyleClass("CL_successobj");
			return "Success";

		} else if (v1 === "Pending") {
			that.addStyleClass("CL_warningobj");
			return "Warning";

		}
	},
	status: function (v1) {
		var that = this;
		if (v1 === "Success") {
			that.addStyleClass("CL_successobj");
			return "Success";
		} else if (v1 === "Pending") {
			that.addStyleClass("CL_warningobj");
			return "Warning";
		}
	},
	statusicon: function (v1) {
		if (v1 === "Success") {
			return "sap-icon://sys-enter-2";
		} else if (v1 === "Pending") {
			return "sap-icon://alert";
		}
	},
	textcolor: function (v1) {
		var that = this;
		if (v1 === "Success") {
			that.addStyleClass("cl_greentext");
		} else if (v1 === "Pending") {
			that.addStyleClass("cl_redtext");
		} else if (v1 === "In-Progress") {
			that.addStyleClass("cl_blueTXT");
		}
		return v1;
	}
};