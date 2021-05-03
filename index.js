const nav = document.getElementById("nav");
const iframe = document.querySelector("iframe");
const loading = document.getElementById("loading");
const demos = [
    ["Basic Drag", "Drag/dragElement/index.html"],
    ["Paint", "Drag/paint/index.html"],
    ["Swipe", "Drag/swipe/index.html"],
    ["Swipe to reveal", "Drag/reveal/index.html"],
    ["Longpress", "Longpress/index.html"],
    ["Pinch", "Pinch/rotate/index.html"],
];

iframe.onload = function () {
    loading.style.display = "none";
    iframe.style.opacity = 1;
};

let active;
window.onhashchange = function () {
    loading.style.display = "";
    iframe.style.opacity = 0; // hiding iframe cause issues with sizing

    const current = decodeURIComponent(location.hash.slice(1));
    let route = demos.find((v) => v[0] == current) || demos[0];

    iframe.src = route[1];

    if (active) {
        active.classList.remove("active");
        _scrollLeft = active.offsetLeft;
    }
    active = route[2];
    active.classList.add("active");

    nav.scrollLeft = nav.scrollWidth;
    nav.scrollTo({
        top: 0,
        left: active.offsetLeft,
        behavior: "smooth",
    });
};

demos.forEach((v, i) => {
    const a = document.createElement("a");
    a.href = `#${v[0]}`;
    a.textContent = v[0];
    nav.appendChild(a);
    demos[i].push(a);
});

window.onhashchange();
