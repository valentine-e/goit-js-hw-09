const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};let n=null;function e(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}t.startBtn.addEventListener("click",(function(){document.body.style.backgroundColor=e(),n=setInterval((()=>{document.body.style.backgroundColor=e()}),1e3),t.startBtn.disabled=!0,t.stopBtn.disabled=!1})),t.stopBtn.addEventListener("click",(function(){clearInterval(n),t.startBtn.disabled=!1,t.stopBtn.disabled=!0}));
//# sourceMappingURL=01-color-switcher.bea55da6.js.map
