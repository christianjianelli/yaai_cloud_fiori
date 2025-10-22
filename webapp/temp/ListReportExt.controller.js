sap.ui.define([
    "bpfe/ext/controller/Chat"
], function(Chat) {
    'use strict';

    return {
        openAIChat: function(oEvent) {
            Chat.onToggleChat();
        },
        
        onAfterRendering: function() {
            Chat.setChatHTMLContent(this.getView());
        }
    };
});