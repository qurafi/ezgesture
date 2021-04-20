let activeDraggedElement;
let startX, startY;
let lastX, lastY;
let checkDragPos;

const defaults = {
    threshold: 0,
};

const options = new WeakMap();

export function enableDragEvents(elm, opt = defaults) {
    elm.addEventListener("touchstart", onPointerDown, true);
    elm.addEventListener("mousedown", onPointerDown, true);
    options.set(elm, opt);
}

// create dummy mouse event object to get mouse related properties like e.clientX e.clientY, e.altKey, etc..
const MOUSE_EVENT_PROPS = Object.keys(
    Object.getPrototypeOf(new MouseEvent(""))
);

const TOUCH_EVENT_PROPS = ["changedTouches", "touches", "targetTouches"];

function getPointerPosition(e) {
    if (e.changedTouches) e = e.changedTouches[0];
    return [e.clientX, e.clientY];
}

function onPointerDown(e) {
    activeDraggedElement = e.currentTarget;
    checkDragPos = true;

    [startX, startY] = getPointerPosition(e);

    addOrRemoveEvents();
}

function onPointerMove(e) {
    if (!activeDraggedElement) return;

    const [x, y] = getPointerPosition(e);

    if (checkDragPos) {
        const opt = options.get(activeDraggedElement);

        if (Math.hypot(x - startX, y - startY) < opt.threshold) return;

        checkDragPos = false;
        [lastX, lastY] = [x, y];

        if (!dispatchDragEvent("ezgdragstart", e)) {
            removeDragEvents();
        }
    } else if (dispatchDragEvent("ezgdragmove", e)) {
        [lastX, lastY] = [x, y];
    }
}

function getDragPositions(e) {
    const [clientX, clientY] = getPointerPosition(e);
    return {
        startX,
        startY,
        lastX,
        lastY,

        //current mouse position
        clientX,
        clientY,

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
        dispatchDragEvent("ezgdragstop", e, false);
    }

    removeDragEvents();
}

function addOrRemoveEvents(remove) {
    const fn = remove ? "removeEventListener" : "addEventListener";
    document[fn]("mouseup", onPointerUp);
    document[fn]("touchend", onPointerUp);
    document[fn]("mousemove", onPointerMove);
    document[fn]("touchmove", onPointerMove);
}

function dispatchDragEvent(name, e, cancelable = true) {
    return dispatchCustomEvent(name, activeDraggedElement, {
        detail: {
            ...getDragPositions(e),
            originalEvent: e,
        },
        cancelable,
    });
}

function dispatchCustomEvent(name, elm, data) {
    return elm.dispatchEvent(new CustomEvent(name, data));
}
