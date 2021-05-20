const zone = document.getElementById("zone");
const div = document.getElementById("box");
EZG.enableDragEvents(div);

let divOffsetX = 0;
let divOffsetY = 0;

div.addEventListener("ezgdragmove", (e) => {
    let { movementX, movementY, clientX, clientY } = e.detail;

    const divRect = div.getBoundingClientRect();
    const elmRect = zone.getBoundingClientRect();

    const isInZone =
        divRect.right + movementX >= elmRect.left && // x
        divRect.left + movementX <= elmRect.right &&
        divRect.bottom + movementY >= elmRect.top && // y
        divRect.top + movementY <= elmRect.bottom;

    if (isInZone) {
        if (clientX > elmRect.right + divRect.width / 2) {
            setBoxOffset(elmRect.right, elmRect.top);
        } else if (clientX < elmRect.left - divRect.width / 2) {
            setBoxOffset(elmRect.left - divRect.width, elmRect.top);
        }

        if (clientY > elmRect.bottom + divRect.height / 2) {
            setBoxOffset(elmRect.left, elmRect.bottom);
        } else if (clientY < elmRect.top - divRect.height / 2) {
            setBoxOffset(elmRect.left, elmRect.top - divRect.height);
        }

        return;
    }

    setBoxOffset(divOffsetX + movementX, divOffsetY + movementY);
});

function setBoxOffset(nx = divOffsetX, ny = divOffsetY) {
    divOffsetX = nx;
    divOffsetY = ny;
    div.style.transform = `translate(${divOffsetX}px, ${divOffsetY}px)`;
}
