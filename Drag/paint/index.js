const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
EZG.enableDragEvents(canvas);

window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
};

window.onresize();

canvas.addEventListener("ezgdragmove", (e) => {
    const { clientX, clientY, lastX, lastY } = e.detail;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(clientX, clientY);
    ctx.closePath();
    ctx.stroke();
});
