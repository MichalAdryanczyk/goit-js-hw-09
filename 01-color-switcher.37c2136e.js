const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),o=()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`};let r=0;t.addEventListener("click",()=>{r=setInterval(o,1e3),t.setAttribute("disabled","")}),e.addEventListener("click",()=>{clearInterval(r),t.removeAttribute("disabled"),r=0});
//# sourceMappingURL=01-color-switcher.37c2136e.js.map