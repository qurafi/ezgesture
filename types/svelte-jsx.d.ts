/// <reference path="../lib/interfaces.ts" />

declare namespace svelte.JSX {
    type EventHandler<
        E extends Event = Event,
        T extends EventTarget = HTMLElement
    > = (event: E & { currentTarget: EventTarget & T }) => any;

    interface HTMLProps<T extends EventTarget> {
        onezgdragstart?: EventHandler<EZGDragEvent, T>;
        onezgdragmove?: EventHandler<EZGDragEvent, T>;
        onezgdragstop?: EventHandler<EZGDragEvent, T>;
        onezgpinchstart?: EventHandler<EZGPinchStartEvent, T>;
        onezgpinchmove?: EventHandler<EZGPinchMoveEvent, T>;
        onezgpinchend?: EventHandler<EZGPinchEndEvent, T>;
        onezglongpress?: EventHandler<EZGLongPressEvent, T>;
    }
}
