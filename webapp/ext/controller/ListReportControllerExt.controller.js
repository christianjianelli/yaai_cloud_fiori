sap.ui.define([
	"sap/ui/core/mvc/ControllerExtension",
	"travel/ext/controller/Chat"
], function (ControllerExtension, Chat) {
	'use strict';

	return ControllerExtension.extend('travel.ext.controller.MyControllerExtension', {

		getAppContext: function () {

			let sContext = "";

			const aContext = this.base.getExtensionAPI().getSelectedContexts();
			
			for (const element of aContext) {

				sContext = sContext + "Travel Info" + 
				            "\n Travel Id: " + element.getProperty("TravelID") + 
							"\n Description:" + element.getProperty("Description") + 
							"\n Customer Id: " + element.getProperty("CustomerID") + 
							"\n Customer Name: " + element.getProperty("CustomerFirstName") + " " + element.getProperty("CustomerLastName") +
							"\n Customer Email: " + element.getProperty("CustomerEmail") + 
							"\n Begin Date:" + element.getProperty("BeginDate") +
							"\n Booking Fee:" + element.getProperty("BookingFee") + 
							"\n Total Price:" + element.getProperty("TotalPrice") + 
							"\n Currency:" + element.getProperty("CurrencyCode") + 
							"\n\n";
			}

			console.log(sContext);

			return sContext;
						
		},

		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf travel.ext.controller.MyControllerExtension
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				//var oModel = this.base.getExtensionAPI().getModel();
			},

			onAfterRendering: function() {
				Chat.setContextProvider(this.getAppContext.bind(this));
				Chat.setChatHTMLContent(this.getView());
			}
		}
	});
});
