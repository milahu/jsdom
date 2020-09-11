"use strict";
const { mixin } = require("../../utils");
const MouseEvent = require("../generated/MouseEvent");
const EventTargetImpl = require("../events/EventTarget-impl").implementation;
const GlobalEventHandlersImpl = require("./GlobalEventHandlers-impl").implementation;
const { isDisabled } = require("../helpers/form-controls");
const { fireAnEvent } = require("../helpers/events");
const { asciiLowercase } = require("../helpers/strings");
const { domSymbolTree } = require("../helpers/internal-constants");

class CSSPseudoElementImpl extends EventTargetImpl {
  constructor(globalObject, args, privateData) {
    super(globalObject, args, privateData);

    domSymbolTree.initialize(this);

    this._ownerDocument = privateData.parentElement._ownerDocument;

    this._childNodesList = null;
    this._childrenList = null;
    this._version = 0;
    this._memoizedQueries = {};
    this._registeredObserverList = [];
    this._referencedRanges = new Set();


    // CSSPseudoElement
    // TODO
    // workaround for nwsapi resolver functions
    // who expect (!(e.nodeType == 1))
    // for pseudo elements
    this.nodeType = -1;

    this._pseudoId = privateData.pseudoId;
    this._parentElement = privateData.parentElement;
  }

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements#Index_of_standard_pseudo-elements
  static _pseudoIdList = [
    'after',
    'backdrop',
    'before',
    'cue',
    'cue-region',
    'first-letter',
    'first-line',
    'grammar-error',
    'marker',
    //'part()',
    'placeholder',
    'selection',
    //'slotted()',
    'spelling-error',
  ];

  get element() {
    return this._parentElement;
  }
  get type() {
    return '::'+this._pseudoId;
  }

  // TODO remove
  // workaround for broken nwsapi resolvers
  // who test these attributes/functions
  get nodeName() {
    return this._parentElement.nodeName;
  }
  getAttribute(qualifiedName) {
    return '';
  }
  hasAttribute(qualifiedName) {
    return false;
  }

}

// TODO?
//mixin(CSSPseudoElementImpl.prototype, GlobalEventHandlersImpl.prototype);

module.exports = {
  implementation: CSSPseudoElementImpl
};
