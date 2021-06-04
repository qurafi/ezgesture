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

type EZGPinchEndDetail = EZGPinchBaseDetail;

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

type EZGDragEvent = CustomEvent<EZGDragEventDetail>;

type EZGPinchStartEvent = CustomEvent<EZGPinchStartDetail>;
type EZGPinchMoveEvent = CustomEvent<EZGPinchMoveDetail>;
type EZGPinchEndEvent = CustomEvent<EZGPinchEndDetail>;

type EZGLongPressEvent = CustomEvent<EZGLongPressDetail>;
