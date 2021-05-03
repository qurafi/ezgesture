const defaults = {
    axis: "X",
    swipeArea: 30,
    minOffset: 50,
    touchActions: true, // enable automatic disabling of the pan-x/y touch-actions depends the axis
};

function enableSwipeToReveal(elm, options = {}) {
    options = { ...defaults, options };

    const { axis, swipeArea, minOffset, touchActions } = options;

    let isOpen;
    function swipeOn(on) {
        elm.style.transform = `translate${axis}(${on ? "0" : "-100%"})`;
        isOpen = on;

        elm.classList.toggle("active", on);

        // slide it back when clicking outside element
        if (on) {
            document.addEventListener("mouseup", close);
            document.addEventListener("touchend", close);
        }
    }

    elm.style.transition = "transform 0.2s";
    elm.style.display = "block";

    // hide it
    swipeOn(false);

    // make sure we disable panning-x/y gestures actions in browser to prevent scroll or other related actions (e.g. swipe-to-refresh)
    if (touchActions)
        document.body.style.touchAction = `pan-${axis == "X" ? "y" : "x"}`;

    document.addEventListener("ezgdragstart", (e) => {
        // cancel dragging when it is not in swipe area
        if (!isOpen && e.detail[`start${axis}`] >= swipeArea)
            return e.preventDefault();

        // temporarily disable user selection
        document.body.style.userSelect = "none";
    });

    document.addEventListener("ezgdragstop", (e) => {
        // const { offsetX } = e.detail;
        const offset = e.detail[`offset${axis}`];

        // reset user selection
        document.body.style.userSelect = "";

        // set minimum distance to swipe to avoid accident swipes
        if (Math.abs(offset) < minOffset) return;

        //offsetX > 0 -> swipe right
        swipeOn(offset > 0);
    });

    function close(e) {
        // check if the target is not the elm children or itself(click outside elm)
        if (elm.contains(e.target)) return;

        swipeOn(false);
        document.removeEventListener("mouseup", close);
        document.removeEventListener("touchend", close);
    }

    return swipeOn;
}
