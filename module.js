'use strict';

const $navDisplay = document.querySelector(".nav");

document.addEventListener("click", e=>{
    if (e.target.matches(".burger__icon")) {
        if ($navDisplay.style.clipPath != "inset(0px)") $navDisplay.style.clipPath = "inset(0px)";
        else $navDisplay.style.clipPath = "inset(0px 100% 0px 0px)";
    }
})