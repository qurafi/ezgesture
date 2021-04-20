let startTouches;
let lastTouches;

let activeElement;
let checkPinch;

let lastDist;
let lastOffset;
let lastAngle;

const defaults = {
    distanceThreshold: 0,
    angleThreshold: 0,
};

const options = new WeakMap();

export function enablePinchEvents(elm, opt = defaults) {
    options.set(elm, opt);
    elm.addEventListener("touchstart", onTouchStart);
}

function onTouchStart(e) {
    startTouches = e.touches;
    checkPinch = true;
    e.currentTarget.addEventListener("touchmove", onTouchMove);
}

function onTouchMove(e) {
    if (e.touches.length != 2) return;

    const props = calculatePinchProps(e.touches);

    if (checkPinch) {
        pinchStartHandler(e, props);
    } else {
        pinchMoveHandler(e, props);
    }
}

function pinchStartHandler(e, { dist, angle }) {
    if (startTouches.length != 2) return;
    const { dist: startDist, angle: startAngle } = calculatePinchProps(
        startTouches
    );

    const { distanceThreshold, angleThreshold } = options.get(e.currentTarget);

    const dd = Math.abs(dist - startDist);
    const da = Math.abs(angle - startAngle);

    if (dd >= distanceThreshold && da >= angleThreshold) {
        const isCancelled = dispatchCustomEvent("pinchstart", e.currentTarget, {
            startTouches,
            originalEvent: e,
        });

        if (isCancelled) {
            return elm.removeEventListener("touchmove", onTouchMove);
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
    const { angle, offset, dist } = props;
    const isCancelled = dispatchPinchEvent("move", e.currentTarget, {
        ...props,
        originalEvent: e,
        touches: e.touches,
    });

    // will stop counting lastDist/Offset when cancelled
    if (isCancelled) return;

    lastDist = dist;
    lastAngle = angle;
    lastOffset = offset;
}

function calculatePinchProps(touches) {
    const [p1, p2] = touches;

    const dx = p1.clientX - p2.clientX;
    const dy = p1.clientY - p2.clientY;

    const dist = Math.hypot(dx, dy);
    const offset = dist - lastDist;

    const angle = Math.atan2(dy, dx);
    const da = angle - lastAngle;

    const midX = (p1.clientX + p2.clientX) / 2;
    const midY = (p1.clientY + p2.clientY) / 2;

    const dir = Math.sign(dist - (lastDist || dist));

    return { dx, dy, da, dist, angle, offset, midX, midY, dir };
}

function onTouchEnd(e) {
    if (!checkPinch && activeElement) {
        dispatchPinchEvent("end", activeElement, null, false);
        activeElement = undefined;
    }
}

function dispatchPinchEvent(ev, elm, detail, cancelable) {
    detail = {
        ...detail,
        startTouches,
        lastTouches,
        lastOffset,
        lastDist,
        lastAngle,
    };
    return dispatchCustomEvent(`pinch${ev}`, elm, detail, cancelable);
}

function dispatchCustomEvent(name, elm, detail, cancelable = true) {
    return !elm.dispatchEvent(
        new CustomEvent(`ezg${name}`, { detail, cancelable })
    );
}
