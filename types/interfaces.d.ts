interface EZGDragEventDetail {
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    clientX: number;
    clientY: number;
    offsetX: number;
    offsetY: number;
    movementX: number;
    movementY: number;
    originalEvent: MouseEvent | TouchEvent;
}
interface EZGPinchBaseDetail {
    startTouches: TouchList;
    lastTouches: TouchList;
    lastOffset: number;
    lastDist: number;
    lastAngle: number;
    originalEvent: TouchEvent;
}
declare type EZGPinchEndDetail = EZGPinchBaseDetail;
interface EZGPinchStartDetail {
    startTouches: TouchEvent;
    originalEvent: TouchEvent;
}
interface EZGPinchMoveDetail extends EZGPinchBaseDetail {
    dx: number;
    dy: number;
    da: number;
    dist: number;
    angle: number;
    offset: number;
    midX: number;
    midY: number;
    dir: number;
    touches: TouchList;
}
interface EZGLongPressDetail {
    originalEvent: MouseEvent | TouchEvent;
}
declare type EZGDragEvent = CustomEvent<EZGDragEventDetail>;
declare type EZGPinchStartEvent = CustomEvent<EZGPinchStartDetail>;
declare type EZGPinchMoveEvent = CustomEvent<EZGPinchMoveDetail>;
declare type EZGPinchEndEvent = CustomEvent<EZGPinchEndDetail>;
declare type EZGLongPressEvent = CustomEvent<EZGLongPressDetail>;
