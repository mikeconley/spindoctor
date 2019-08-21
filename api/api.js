const { classes: Cc, interfaces: Ci, utils: Cu } = Components;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

XPCOMUtils.defineLazyModuleGetter(this, "ExtensionCommon",
                                  "resource://gre/modules/ExtensionCommon.jsm");

this.tabswitcher = class extends ExtensionAPI {
  getAPI(context) {
    const { windowManager } = context.extension;

    let EventManager = ExtensionCommon.EventManager;

    return {
      tabswitcher: {
        onSpinner: new EventManager({
          context,
          name: "tabswitcher-onspinner",
          register: fire => {

            let observer = (subject, topic, data) => {
              fire.async();
            }

            Services.obs.addObserver(observer, "tabswitch-spinner");

            return () => {
              Services.obs.removeObserver(observer, "tabswitch-spinner");
            }
          }
        }).api()
      }
    };
  }
}
