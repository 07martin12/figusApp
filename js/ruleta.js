"use strict";
const girarBtn = document.getElementById("girarBtn");
const premiosCircle = document.querySelector(".premios-circle");
const ruletaImg = document.querySelector(".ruleta");
function waitForAnimationEnd(el) {
    return new Promise((resolve) => {
        const handler = () => {
            el.removeEventListener("animationend", handler);
            resolve();
        };
        el.addEventListener("animationend", handler);
    });
}
girarBtn.addEventListener("click", async () => {
    girarBtn.disabled = true;
    premiosCircle.classList.add("girar");
    ruletaImg.classList.add("girar");
    try {
        await Promise.all([
            waitForAnimationEnd(premiosCircle),
            waitForAnimationEnd(ruletaImg),
        ]);
    }
    finally {
        premiosCircle.classList.remove("girar");
        ruletaImg.classList.remove("girar");
        girarBtn.disabled = false;
    }
});
