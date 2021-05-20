(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.EZG = global.EZG || {}));
}(this, (function (exports) { 'use strict';

    function dispatchCustomEvent(name, elm, detail, cancelable) {
        if (cancelable === void 0) { cancelable = true; }
        return !elm.dispatchEvent(new CustomEvent("ezg" + name, { detail: detail, cancelable: cancelable }));
    }

    function enableLongPressEvents(elm, opt) {
        if (opt === void 0) { opt = {}; }
        function onPointerDown(e) {
            var timeout = setTimeout(function () {
                dispatchCustomEvent("longpress", elm, {
                    originalEvent: e,
                });
            }, opt.duration || 700);
            function onPointerUp() {
                clearTimeout(timeout);
            }
            var options = { once: true };
            elm.addEventListener("touchend", onPointerUp, options);
            elm.addEventListener("mouseup", onPointerUp, options);
        }
        elm.addEventListener("touchstart", onPointerDown, true);
        elm.addEventListener("mousedown", onPointerDown, true);
    }

    exports.enableLongPressEvents = enableLongPressEvents;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=longpress.js.map
