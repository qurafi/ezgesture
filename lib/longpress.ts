import { dispatchCustomEvent } from "./shared";

interface Options {
    duration?: number;
}

export function enableLongPressEvents(elm: Element, opt: Options = {}) {
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
