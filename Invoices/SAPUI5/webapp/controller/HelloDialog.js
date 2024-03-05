// @ts-nocheck
sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
],
/**
 * @param {typeof sap.ui.base.ManagedObject} ManagedObject
 * @param {typeof sap.ui.core.Fragment} Fragment
 */
function (ManagedObject, Fragment) {
    "use strict"

    return ManagedObject.extend("logaligroup.SAPUI5.controller.HelloDialog", {

        constructor: function(oView){
            this._oView = oView;
        },

        exit: function(){
            delete this.oView;
        },

        open: function() {
            const oView = this._oView;

            // Create dialog lazily
            if (!oView.byId("HelloDialog")){

                let oFragmentController = {
                    onCloseDialog : function () {
                    oView.byId("HelloDialog").close();
                    }
                }

                // Load async XML fragment
                Fragment.load({
                    id : oView.getId(),
                    name : "logaligroup.SAPUI5.view.HelloDialog",
                    controller : oFragmentController
                }).then(function(oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            }else {
                oView.byId("HelloDialog").open();
            }
        }
    });
});