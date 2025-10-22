sap.ui.define([
    "travel/ext/controller/Chat"
], function(Chat) {
    'use strict';

    return {
        /**
         * Generated event handler.
         *
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         * @param aSelectedContexts the selected contexts of the table rows.
         */
        chat: function(oContext, aSelectedContexts) {
            Chat.onToggleChat();
        }
    };
});
