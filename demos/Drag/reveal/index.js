const aside = document.querySelector("aside");
EZG.enableDragEvents(document);

const toggleSideBar = enableSwipeToReveal(aside, { swipeArea: 65 });

const menu = document.getElementById("menu");
menu.addEventListener("click", (e) => {
    const show = !aside.classList.contains("active");
    toggleSideBar(show);
});
