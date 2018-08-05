/*:
 * @plugindesc This plugin allows you to delete the message for next required exp in Status Window.
 * @author biud436
 */
/*:ko
 * @plugindesc 상태창에서 다음 레벨까지 문구를 삭제합니다.
 * @author biud436
 */
 
(function() {
  
  Window_Status.prototype.drawExpInfo = function(x, y) {
      var lineHeight = this.lineHeight();
      var expTotal = TextManager.expTotal.format(TextManager.exp);
      var value1 = this._actor.currentExp();
      if (this._actor.isMaxLevel()) {
          value1 = '-------';
      }
      this.changeTextColor(this.systemColor());
      this.drawText(expTotal, x, y + lineHeight * 0, 270);
      this.resetTextColor();
      this.drawText(value1, x, y + lineHeight * 1, 270, 'right');
  };
    
})();