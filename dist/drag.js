(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.EZG = global.EZG || {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function dispatchCustomEvent(name, elm, detail, cancelable) {
        if (cancelable === void 0) { cancelable = true; }
        return !elm.dispatchEvent(new CustomEvent("ezg" + name, { detail: detail, cancelable: cancelable }));
    }

    var activeDraggedElement;
    var startX, startY;
    var lastX, lastY;
    var checkDragPos;
    var defaults = {
        threshold: 0,
    };
    var options = new WeakMap();
    function enableDragEvents(elm, opt) {
        if (opt === void 0) { opt = defaults; }
        elm.addEventListener("touchstart", onPointerDown, true);
        elm.addEventListener("mousedown", onPointerDown, true);
        options.set(elm, opt);
    }
    function getPointerPosition(e) {
        if (e.changedTouches)
            e = e.changedTouches[0];
        return [e.clientX, e.clientY];
    }
    function onPointerDown(e) {
        var _a;
        activeDraggedElement = e.currentTarget;
        checkDragPos = true;
        _a = getPointerPosition(e), startX = _a[0], startY = _a[1];
        addOrRemoveEvents();
    }
    function onPointerMove(e) {
        var _a, _b;
        e.preventDefault();
        if (!activeDraggedElement)
            return;
        var _c = getPointerPosition(e), x = _c[0], y = _c[1];
        if (checkDragPos) {
            var opt = options.get(activeDraggedElement);
            if (Math.hypot(x - startX, y - startY) < opt.threshold)
                return;
            checkDragPos = false;
            _a = [x, y], lastX = _a[0], lastY = _a[1];
            if (!dispatchDragEvent("dragstart", e)) {
                removeDragEvents();
            }
        }
        else if (dispatchDragEvent("dragmove", e)) {
            _b = [x, y], lastX = _b[0], lastY = _b[1];
        }
    }
    function getDragPositions(e) {
        var _a = getPointerPosition(e), clientX = _a[0], clientY = _a[1];
        return {
            startX: startX,
            startY: startY,
            lastX: lastX,
            lastY: lastY,
            //current mouse position
            clientX: clientX,
            clientY: clientY,
            // mouse delta from initial drag position
            offsetX: clientX - startX,
            offsetY: clientY - startY,
            // mouse delta from last drag position
            movementX: clientX - lastX,
            movementY: clientY - lastY,
        };
    }
    function removeDragEvents() {
        activeDraggedElement = undefined;
        addOrRemoveEvents(true);
    }
    function onPointerUp(e) {
        if (activeDraggedElement && !checkDragPos) {
            dispatchDragEvent("dragstop", e, false);
        }
        removeDragEvents();
    }
    function addOrRemoveEvents(remove) {
        if (remove === void 0) { remove = false; }
        var fn = remove ? "removeEventListener" : "addEventListener";
        document[fn]("mouseup", onPointerUp);
        document[fn]("touchend", onPointerUp);
        document[fn]("mousemove", onPointerMove);
        document[fn]("touchmove", onPointerMove);
    }
    function dispatchDragEvent(name, e, cancelable) {
        if (cancelable === void 0) { cancelable = true; }
        return !dispatchCustomEvent(name, activeDraggedElement, __assign(__assign({}, getDragPositions(e)), { originalEvent: e }), cancelable);
    }

    exports.enableDragEvents = enableDragEvents;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=drag.js.map
