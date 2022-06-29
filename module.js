'use strict';
let activeGame = false;
const $navDisplay = document.querySelector(".nav");
let StartEnd = null;
const alarm = document.createElement("AUDIO");
alarm.src = "./Assets/alarm-clock.mp3";
let x = 0,
y = 0;
const contdown = document.createElement("P")
const boxCount = document.querySelector(".box__countdown")
contdown.classList.add("text__contdown")
boxCount.appendChild(contdown)



document.addEventListener("click", e=>{
    if (e.target.matches(".burger__icon")) {
        if ($navDisplay.style.clipPath != "inset(0px)") $navDisplay.style.clipPath = "inset(0px)";
        else $navDisplay.style.clipPath = "inset(0px 100% 0px 0px)";
    }

    if (e.target.matches("#button__alarm1")) {
        document.getElementById("button__alarm1").setAttribute("disabled", "true");
        document.getElementById("button__alarm2").removeAttribute("disabled");
        const dateH = new Date();
        const dateNow = `${dateH.getHours()}:${dateH.getMinutes()}:${dateH.getSeconds()}`;
        document.querySelector('.time').innerHTML = dateNow;
        StartEnd = setInterval(()=>{
            const dateH = new Date();
            const dateNow = `${dateH.getHours()}:${dateH.getMinutes()}:${dateH.getSeconds()}`;
            document.querySelector('.time').innerHTML = dateNow;
        }, 500)
        
    }

    if (e.target.matches("#button__alarm2")) {
        document.getElementById("button__alarm1").removeAttribute("disabled");
        document.getElementById("button__alarm2").setAttribute("disabled", "true");
        clearInterval(StartEnd);
        document.querySelector('.time').innerHTML = "";
    }

    if (e.target.matches("#button__alarm3")) {
        document.querySelector(".parl").style.animation = "on 0.5s infinite"
        alarm.play();
        document.getElementById("button__alarm3").setAttribute("disabled", "true");
        document.getElementById("button__alarm4").removeAttribute("disabled");     
    }

    if (e.target.matches("#button__alarm4")) {
        document.querySelector(".parl").removeAttribute("style", "animation")
        alarm.pause();
        alarm.currentTime = 0;
        document.getElementById("button__alarm4").setAttribute("disabled", "true");
        document.getElementById("button__alarm3").removeAttribute("disabled");
    }

    if (e.target.matches(".top__button")) {
        window.scrollTo(top)
        
    }
})
    document.addEventListener("keydown", e=>{
        // moveBall(e)
    })

    const moveBall = (e)=>{
        const $ball = document.querySelector(".box__ball");
        const $stage = document.querySelector(".box__key");
        const limitBall = $ball.getBoundingClientRect();
        let limitStage = $stage.getBoundingClientRect();
        const bottomK = Math.round(limitStage.bottom);
        const bottomKR = Math.round(limitStage.right);
        
        switch(e.keyCode) {
            case 87:
            if(limitBall.top>limitStage.top) {
                y--;
                e.preventDefault();
            } 
            break;
            case 68:
            if(limitBall.right<bottomKR-11) {
                e.preventDefault();
                x++;
            } 
            break;
            case 83:
            if(limitBall.bottom<bottomK-11) {
                e.preventDefault();
                y++;
            } 
            break;
            case 65:
            if(limitBall.left>limitStage.left) {
                e.preventDefault();
                x--;
            } 
            break;
            default:
            break;
        }   
        $ball.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    }

    const condown = ()=>{
        const limp = setInterval(()=>{
            const now = new Date().getTime();
            const limitDate = new Date("June 28, 2023 03:16:30").getTime();
            const finishC   = limitDate - now;
            const days = Math.floor(finishC / (1000*60*60*24))
            const hours = ("0" + Math.floor(finishC % (1000*60*60*24) / (1000*60*60))).slice(-2)
            const minutes = ("0" + Math.floor(finishC % (1000*60*60) / (1000*60))).slice(-2)
            const seconds = ("0" + Math.floor(finishC % (1000*60) / (1000))).slice(-2)
            contdown.innerHTML = `Faltan ${days} dias ${hours}hs ${minutes}m ${seconds}s`
            if(finishC<1) {
                clearInterval(limp)
                contdown.innerHTML= "SE LLEGO"
            }
        }, 1000)
    }
    
    condown();
setInterval(()=>{
    if(window.scrollY > 300) {
        document.querySelector(".top__button").style.opacity = 1
    } else {
        document.querySelector(".top__button").style.opacity = 0
    }
}, 0)

const webCam = ()=>{
    const $camBox = document.getElementById("webcam");
    if(navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then(strem=>{
            console.log(strem)
            $camBox.srcObject = strem;
            $camBox.play();
        
        })
        .catch(e=> console.log("No tiene camara o sucedio el error", e))
    }

}

webCam();

const p = document.querySelectorAll(".text__flash")
const findFlash = ()=>{
    document.addEventListener("keyup", e=>{
        if(e.target.matches("#inputFlash")) {
            document.querySelectorAll(".box__img").forEach((el, i) => {
                p[i].textContent.toLowerCase().startsWith(e.target.value) 
                ? el.classList.remove("filter")
                : el.classList.add("filter")
            });
        }
    })
}

findFlash()

