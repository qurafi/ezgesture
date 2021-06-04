"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchCustomEvent = void 0;
function dispatchCustomEvent(name, elm, detail, cancelable) {
    if (cancelable === void 0) { cancelable = true; }
    return !elm.dispatchEvent(new CustomEvent("ezg" + name, { detail: detail, cancelable: cancelable }));
}
exports.dispatchCustomEvent = dispatchCustomEvent;
