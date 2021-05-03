const button = document.getElementById("button");
const content = document.getElementById("content");
EZG.enableLongPressEvents(button);

button.addEventListener("ezglongpress", (e) => {
    content.hidden = false;
});
