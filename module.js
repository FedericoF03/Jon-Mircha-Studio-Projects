'use strict';

const $navDisplay = document.querySelector(".nav")
console.log($navDisplay.style)
console.log($navDisplay.style == 'inset(0 100% 0 0)')
document.addEventListener("click", e=>{
    if (e.target.matches(".burger__icon")) {
        if ($navDisplay.style.clip == "inset(0 100% 0 0)") {console.log("checkado")}
    }
})