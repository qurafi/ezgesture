let movingTouches;
let pinchDistance;
let pinchAngle = 0;
let centerX, centerY;
let direction;

function onPinchStart(e) {
    //
    console.log("started");
}

function onPinchMove(e) {
    const { dist, touches, midX, midY, da, dir } = e.detail;

    movingTouches = touches;

    console.log("move");

    pinchDistance = dist;

    pinchAngle += da * 2; // human wrist will break :D

    direction = dir;

    centerX = midX;
    centerY = midY;
}

function onPinchEnd() {
    movingTouches = undefined;
}

function initPinchEvents(elem) {
    EZG.enablePinchEvents(elem);
    elem.addEventListener("ezgpinchstart", onPinchStart);
    elem.addEventListener("ezgpinchmove", onPinchMove);
    elem.addEventListener("ezgpinchend", onPinchEnd);
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight / 2);
    initPinchEvents(drawingContext.canvas);
}

function getRelativePos(x, y) {
    let canvas = drawingContext.canvas;
    return [x - canvas.offsetLeft, y - canvas.offsetTop];
}

function getRelativeTPos(t) {
    return getRelativePos(t.clientX, t.clientY);
}

function drawTouch(t) {
    const [x, y] = getRelativeTPos(t);
    circle(x, y, 35);
}

function draw() {
    background(0);

    fill(255);
    textSize(18);
    textAlign(LEFT, TOP);
    if (movingTouches) {
        const [p1, p2] = movingTouches;
        drawTouch(p1);
        drawTouch(p2);

        const [x1, y1] = getRelativeTPos(p1);
        const [x2, y2] = getRelativeTPos(p2);

        const [xx, yy] = getRelativePos(centerX, centerY);
        circle(xx, yy, 15);

        text(`Distance ${pinchDistance | 0}`, 0, 0);
        text(`Pinch ${["in", "", "out"][direction + 1]}`, 0, 18);
    }
    translate(width / 2, height / 2);
    rotate(pinchAngle);
    textAlign(CENTER, CENTER);
    text("Pinch and Rotate Me", 0, 0);
}
