const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
EZG.enableDragEvents(canvas);

window.onresize = function () {
    canvas.width = window.innerWidth - 4;
    canvas.height = window.innerHeight / 2;

    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
};

window.onresize();

canvas.addEventListener("ezgdragmove", (e) => {
    const { clientX, clientY, lastX, lastY } = e.detail;
    const canvasRect = canvas.getBoundingClientRect(); // to get mouse position relative to canvas position
    ctx.beginPath();
    ctx.moveTo(lastX - canvasRect.left, lastY - canvasRect.top);
    ctx.lineTo(clientX - canvasRect.left, clientY - canvasRect.top);
    ctx.closePath();
    ctx.stroke();
});
