if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const t=e=>i(e,l),u={module:{uri:l},exports:o,require:t};s[l]=Promise.all(n.map((e=>u[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/Footer-e43218a4.js",revision:null},{url:"assets/FormFinal-612c04f5.js",revision:null},{url:"assets/GoBackBtn-35b8e9b2.js",revision:null},{url:"assets/Header-85a5ad07.js",revision:null},{url:"assets/HomeLogged-5da85e11.js",revision:null},{url:"assets/index-0446f872.css",revision:null},{url:"assets/index-5d40556c.js",revision:null},{url:"assets/index.esm-fa5d28c1.js",revision:null},{url:"assets/LoginComp-7b9765bf.js",revision:null},{url:"assets/MenuFixed-f92ab592.js",revision:null},{url:"assets/MenuHamb-9dde5716.js",revision:null},{url:"assets/RegisterComp-a31258f1.js",revision:null},{url:"iconPortfolio.png",revision:"3ffa4e8b0bed3ce474c7896348fa758b"},{url:"index.html",revision:"db5beea4efaeb644a4d89ec5d8f7bcf6"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"90693bdfaccd37914d6c79149bb7c2e6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
