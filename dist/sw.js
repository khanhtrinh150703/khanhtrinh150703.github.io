if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const c=e=>i(e,o),d={module:{uri:o},exports:t,require:c};s[o]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-a3cf1d8c"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-akJwnkow.css",revision:null},{url:"assets/index-B61584Pd.js",revision:null},{url:"index.html",revision:"d765e1ca974af2430b290d98c6aed523"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"logo.png",revision:"81cb75a1fb9a9353c8f406242dd6c00c"},{url:"manifest.webmanifest",revision:"bf851a05d9b4b4219aa6dedc9acf2067"}],{}),e.cleanupOutdatedCaches()}));
