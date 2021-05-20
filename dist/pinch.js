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

    exports.enablePinchEvents = enablePinchEvents;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pinch.js.map
