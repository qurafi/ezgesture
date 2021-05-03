const zone = document.getElementById("zone");
const div = document.getElementById("box");
EZG.enableDragEvents(div);

let divOffsetX = 0;
let divOffsetY = 0;

console.log("hello");

div.addEventListener("ezgdragmove", (e) => {
    const { movementX, movementY } = e.detail;

    const divRect = div.getBoundingClientRect();
    const elmRect = zone.getBoundingClientRect();
    const isInZone =
        divRect.right + movementX >= elmRect.left && // x
        divRect.left + movementX <= elmRect.right &&
        divRect.bottom + movementY >= elmRect.top && // y
        divRect.top + movementY <= elmRect.bottom;

    if (isInZone) return e.preventDefault();

    divOffsetX += movementX;
    divOffsetY += movementY;

    e.currentTarget.style.transform = `translate(${divOffsetX}px, ${divOffsetY}px)`;
});
