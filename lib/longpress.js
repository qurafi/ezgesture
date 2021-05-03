import { dispatchCustomEvent } from "./shared";

export function enableLongPressEvents(elm, opt = {}) {
    function onPointerDown(e) {
        const timeout = setTimeout(() => {
            dispatchCustomEvent("longpress", elm, {
                originalEvent: e,
            });
        }, opt.duration || 700);

        function onPointerUp() {
            clearTimeout(timeout);
        }

        const options = { once: true };
        elm.addEventListener("touchend", onPointerUp, options);
        elm.addEventListener("mouseup", onPointerUp, options);
    }
    elm.addEventListener("touchstart", onPointerDown, true);
    elm.addEventListener("mousedown", onPointerDown, true);
}
