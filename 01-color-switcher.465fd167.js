const t={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]")};let e=0;function n(){t.btnStop.setAttribute("disabled",!0)}function o(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}n(),t.btnStart.addEventListener("click",(function(){t.btnStop.removeAttribute("disabled"),t.btnStart.setAttribute("disabled",!0),o(),e=setInterval((()=>{o()}),1e3)})),t.btnStop.addEventListener("click",(function(){t.btnStart.removeAttribute("disabled"),n(),clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.465fd167.js.map
