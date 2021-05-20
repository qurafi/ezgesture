(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.EZG = {}));
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
    var defaults$1 = {
        threshold: 0,
    };
    var options$1 = new WeakMap();
    function enableDragEvents(elm, opt) {
        if (opt === void 0) { opt = defaults$1; }
        elm.addEventListener("touchstart", onPointerDown, true);
        elm.addEventListener("mousedown", onPointerDown, true);
        options$1.set(elm, opt);
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
            var opt = options$1.get(activeDraggedElement);
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

    var startTouches;
    var lastTouches;
    var activeElement;
    var checkPinch;
    var lastDist;
    var lastOffset;
    var lastAngle;
    var defaults = {
        distanceThreshold: 0,
        angleThreshold: 0,
    };
    var options = new WeakMap();
    function enablePinchEvents(elm, opt) {
        if (opt === void 0) { opt = defaults; }
        options.set(elm, opt);
        elm.addEventListener("touchstart", onTouchStart);
    }
    function onTouchStart(e) {
        startTouches = e.touches;
        checkPinch = true;
        e.currentTarget.addEventListener("touchmove", onTouchMove);
    }
    function onTouchMove(e) {
        e.preventDefault();
        if (e.touches.length != 2)
            return;
        var props = calculatePinchProps(e.touches);
        if (checkPinch) {
            pinchStartHandler(e, props);
        }
        else {
            pinchMoveHandler(e, props);
        }
    }
    function pinchStartHandler(e, _a) {
        var dist = _a.dist, angle = _a.angle;
        if (startTouches.length != 2)
            return;
        var _b = calculatePinchProps(startTouches), startDist = _b.dist, startAngle = _b.angle;
        var _c = options.get(e.currentTarget), distanceThreshold = _c.distanceThreshold, angleThreshold = _c.angleThreshold;
        var dd = Math.abs(dist - startDist);
        var da = Math.abs(angle - startAngle);
        if (dd >= distanceThreshold && da >= angleThreshold) {
            var isCancelled = dispatchCustomEvent("pinchstart", e.currentTarget, {
                startTouches: startTouches,
                originalEvent: e,
            });
            if (isCancelled) {
                e.currentTarget.removeEventListener("touchmove", onTouchMove);
                return;
            }
            activeElement = e.currentTarget;
            lastDist = startDist;
            lastAngle = startAngle;
            lastOffset = 0;
            checkPinch = false;
            document.addEventListener("touchend", onTouchEnd);
        }
    }
    function pinchMoveHandler(e, props) {
        var angle = props.angle, offset = props.offset, dist = props.dist;
        var isCancelled = dispatchPinchEvent("move", e.currentTarget, __assign(__assign({}, props), { originalEvent: e, touches: e.touches }));
        // will stop counting lastDist/Offset when cancelled
        if (isCancelled)
            return;
        lastDist = dist;
        lastAngle = angle;
        lastOffset = offset;
    }
    function calculatePinchProps(touches) {
        var p1 = touches[0], p2 = touches[1];
        var dx = p1.clientX - p2.clientX;
        var dy = p1.clientY - p2.clientY;
        var dist = Math.hypot(dx, dy);
        var offset = dist - lastDist;
        var angle = Math.atan2(dy, dx);
        var da = angle - lastAngle;
        var midX = (p1.clientX + p2.clientX) / 2;
        var midY = (p1.clientY + p2.clientY) / 2;
        var dir = Math.sign(dist - (lastDist || dist));
        return { dx: dx, dy: dy, da: da, dist: dist, angle: angle, offset: offset, midX: midX, midY: midY, dir: dir };
    }
    function onTouchEnd(e) {
        if (!checkPinch && activeElement) {
            dispatchPinchEvent("end", activeElement, null, false);
            activeElement = undefined;
        }
    }
    function dispatchPinchEvent(ev, elm, detail, cancelable) {
        if (cancelable === void 0) { cancelable = true; }
        detail = __assign(__assign({}, detail), { startTouches: startTouches,
            lastTouches: lastTouches,
            lastOffset: lastOffset,
            lastDist: lastDist,
            lastAngle: lastAngle });
        return dispatchCustomEvent("pinch" + ev, elm, detail, cancelable);
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

    exports.enableDragEvents = enableDragEvents;
    exports.enableLongPressEvents = enableLongPressEvents;
    exports.enablePinchEvents = enablePinchEvents;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
