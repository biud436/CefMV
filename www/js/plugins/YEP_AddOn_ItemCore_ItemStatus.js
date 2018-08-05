/*:
 * YEP_AddOn_ItemCore_ItemStatus.js
 * @plugindesc YEP_AddOn_ItemCore_ItemStatus
 * @author biud436, Yanfly
 *
 * @param Color
 * @desc RGB
 * @default rgb(187, 72, 72)
 */

(function() {

  var parameters = PluginManager.parameters('YEP_AddOn_ItemCore_ItemStatus');
  var new_color = parameters['Color'];

  if(!!Imported.YEP_ItemCore) {
    Window_ItemStatus.prototype.drawDarkRect = function(dx, dy, dw, dh) {
        var color = new_color;
        this.changePaintOpacity(false);
        this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
        this.changePaintOpacity(true);
    };
  }
})();
