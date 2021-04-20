const div = document.querySelector("div");
EZG.enableDragEvents(div);

const maxOffset = Math.min(window.innerWidth / 4, 300);

div.addEventListener("ezgdragmove", (e) => {
    const { offsetX } = e.detail;

    const p = Math.abs(offsetX) / maxOffset;

    div.style.transform = `translate(${offsetX}px, 0px)`;
    div.style.opacity = 1 - p;
});

div.addEventListener("ezgdragstop", (e) => {
    const { offsetX } = e.detail;

    div.style.transform = "";
    div.style.opacity = "";

    if (Math.abs(offsetX) >= maxOffset) {
        alert("Removed!");

        div.style.display = "none";
        setTimeout(() => {
            div.style.display = "";
        }, 300);
    }
});
