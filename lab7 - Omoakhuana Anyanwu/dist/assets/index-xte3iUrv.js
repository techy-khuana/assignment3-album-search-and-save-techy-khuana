(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const f of n.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&l(f)}).observe(document,{childList:!0,subtree:!0});function m(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(e){if(e.ep)return;e.ep=!0;const n=m(e);fetch(e.href,n)}})();const g=document.querySelector("#search-results").cloneNode(!0),L=document.querySelector("#favorites").cloneNode(!0);async function q(){const a=await(await fetch("https://660f5001356b87a55c5127e0.mockapi.io/api/v1/albums")).json();console.log(a);async function m(s){const t=document.querySelector("#search-results");t.innerHTML="";const o=a.filter(c=>{const r=c.artistName.toLowerCase().includes(s),i=c.albumName.toLowerCase().includes(s);return r||i});l(o)}function l(s){const t=g.cloneNode(!0);s.forEach(o=>{const c=` 
         <li class="list-group-item d-flex justify-content-between align-items-start">
         <div class="ms-2 me-auto">
         <div class="fw-bold">
        ${o.albumName}
         <span class="badge bg-primary rounded-pill">${o.averageRating}</span>
         </div>
         <span>${o.artistName}</span>
         </div>
         <button data-uid=${o.uid} type="button" class="btn btn-success">Add to Favorites</button>
       </li>
         `,r=document.createRange().createContextualFragment(c).children[0];r.querySelector(".btn-success").addEventListener("click",function(){const i=o.uid,u=s.find(v=>v.uid===i);console.log(u),d.find(v=>v.uid===i)||(d.push(u),e(),n(u))}),t.append(r)}),document.querySelector("#search-results").replaceWith(t)}function e(){const s=L.cloneNode(!0);d.forEach(t=>{const o=` 
         <li class="list-group-item d-flex justify-content-between align-items-start">
         <div class="ms-2 me-auto">
         <div class="fw-bold">
        ${t.albumName}
         <span class="badge bg-primary rounded-pill">${t.averageRating}</span>
         </div>
         <span>${t.artistName}</span>
         </div>
         <button data-uid=${t.uid} type="button" class="btn btn-success">Remove from Favorites</button>
       </li>
         `,c=document.createRange().createContextualFragment(o).children[0];c.querySelector(".btn-success").addEventListener("click",function(r){const i=r.currentTarget.dataset.uid;d.findIndex(u=>u.uid===i),r.currentTarget.parentElement.remove()}),s.append(c)}),document.querySelector("#favorites").replaceWith(s)}async function n(s){const t=new Headers;t.append("content-type","application/json");const o=JSON.stringify(s),r=await fetch("https://660f5001356b87a55c5127e0.mockapi.io/api/v1/favorites",{method:"POST",headers:t,body:o,redirect:"follow"});console.log(await r.json())}document.querySelector("#search-form").addEventListener("submit",function(s){s.preventDefault();const t=document.querySelector("input[name='query']").value.trim().toLowerCase();m(t)});function p(s){const t=document.querySelector("#search-button"),o=document.querySelector("#favorites-button"),c=document.querySelector("#search-tab"),r=document.querySelector("#favorites-tab");s==="search"?(t.classList.add("active"),o.classList.remove("active"),r.classList.add("d-none"),c.classList.remove("d-none")):s==="favorites"&&(o.classList.add("active"),t.classList.remove("active"),c.classList.add("d-none"),r.classList.remove("d-none"))}const h=document.querySelector("#search-button"),y=document.querySelector("#favorites-button");h.addEventListener("click",function(){p("search")}),y.addEventListener("click",function(){e(),console.log(d),p("favorites")}),p("search")}const d=[];q();
