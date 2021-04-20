const canvas = document.querySelector("canvas");
EZG.enableDragEvents(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.lineJoin = "round";

canvas.addEventListener("ezgdragmove", (e) => {
    const { clientX, clientY, lastX, lastY } = e.detail;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(clientX, clientY);
    ctx.closePath();
    ctx.stroke();
});
