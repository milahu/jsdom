"use strict";
const cssstyle = require("cssstyle");

class ElementCSSInlineStyle {
  _initElementCSSInlineStyle() {
    this._settingCssText = false;
    this._computedStyle = null;
    this._style = new cssstyle.CSSStyleDeclaration(newCssText => {
      if (!this._settingCssText) {
        this._settingCssText = true;
        this.setAttributeNS(null, "style", newCssText);
        this._settingCssText = false;
      }
      if (this._computedStyle) {
        this._updateComputedStyle();
      }
    });
  }
  get style() {
    return this._style;
  }
  set style(value) {
    this._style.cssText = value;
  }

  _updateComputedStyle() {
    // merge default style and custom style
    Object.assign(
      this._computedStyle._values,
      this._defaultStyle,
      this._style._values
    );
    const keys = Object.keys(this._computedStyle._values);
    this._computedStyle._length = keys.length;
    // computed priorities are always empty
    this._computedStyle._importants =
      keys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
  }

  _getComputedStyle(defaultStyle = null) {
    if (!this._computedStyle) {
      if (defaultStyle) {
        // init computed style
        this._defaultStyle = defaultStyle;
        this._computedStyle = new cssstyle.CSSStyleDeclaration();
        this._updateComputedStyle();
      } else {
        // tell caller we need default style
        return null;
      }
    }
    return this._computedStyle;
  }
}

module.exports = {
  implementation: ElementCSSInlineStyle
};
