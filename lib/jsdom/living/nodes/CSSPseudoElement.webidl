// https://drafts.csswg.org/css-pseudo-4/#csspseudoelement
[Exposed=Window]
interface CSSPseudoElement : EventTarget {
    readonly attribute CSSOMString type;
    readonly attribute Element element;

    // TODO remove
    // workaround for broken nwsapi resolvers
    readonly attribute DOMString nodeName;
    DOMString? getAttribute(DOMString qualifiedName);
    boolean hasAttribute(DOMString qualifiedName);
};
