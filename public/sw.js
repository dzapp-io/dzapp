if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const o=e=>n(e,t),r={module:{uri:t},exports:c,require:o};s[t]=Promise.all(a.map((e=>r[e]||o(e)))).then((e=>(i(...e),c)))}}define(["./workbox-75794ccf"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/1dbpgQIleALfho6H_HNRT/_buildManifest.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/1dbpgQIleALfho6H_HNRT/_middlewareManifest.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/1dbpgQIleALfho6H_HNRT/_ssgManifest.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/chunks/0a6e12db-e9da56509465d570.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/chunks/385-71abe92d880cdd8e.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/chunks/459-a4ef36f4ca13ec26.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/chunks/900-2f20c50305238be0.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/chunks/948-1f52df9a8754b218.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/chunks/framework-5f4595e5518b5600.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/chunks/main-50770868367ef490.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/chunks/pages/_app-d85dc076425a663c.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/chunks/pages/index-c545b5029ef1875a.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/chunks/pages/workflows-b502ec1843dda412.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/chunks/pages/workflows/new-79d65dc226b6507e.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/chunks/webpack-434fefa8f39d8fbc.js",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/_next/static/css/7a0d47e265e95f3a.css",revision:"1dbpgQIleALfho6H_HNRT"},{url:"/android-chrome-192x192.png",revision:"14a15d3ab2fa817bdd64e66a8f3b61cb"},{url:"/android-chrome-512x512.png",revision:"ba51e854daef5011d7785a4afe3ae10c"},{url:"/android-chrome-maskable-192x192.png",revision:"1bac74edb9bcdccd9b86b0c8e814a822"},{url:"/android-chrome-maskable-512x512.png",revision:"2c8b87d84321f8cdc08601641a84ae58"},{url:"/apple-touch-icon.png",revision:"c3b84f2fb238ad45295a59ca346a94c1"},{url:"/assets/icons/avax-icon.svg",revision:"0994653bfd1ccba9eec8eb49fd348ce4"},{url:"/assets/icons/ethereum-icon.svg",revision:"4dbffc86190ffbbeea0eed61a1122905"},{url:"/assets/icons/metamask-icon.svg",revision:"6c44216477bbc37f6effc74b7d41ca6e"},{url:"/assets/icons/polygon-icon.svg",revision:"a0f9f87b77352b53dfc0211aa9981f5e"},{url:"/assets/icons/walletconnect-icon.svg",revision:"fdef5d9f40ad775f2f49f71c6c250545"},{url:"/favicon.ico",revision:"fefef7331354de7beb0cbf9aa6c3dca1"},{url:"/manifest.json",revision:"255ae7de44e815fdd481f6bba108d3e2"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
