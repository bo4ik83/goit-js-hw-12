import{S as d,i}from"./assets/vendor-BrddEoy-.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(r){if(r.ep)return;r.ep=!0;const t=s(r);fetch(r.href,t)}})();const u="46607456-5552cc86243543e4de6027df0",f="https://pixabay.com/api/";async function m(e,o=1,s=12){const n=await fetch(`${f}?key=${u}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${s}`);if(!n.ok)throw new Error("Error fetching data");return n.json()}let p=new d(".gallery a",{captionsData:"alt",captionDelay:250});function y(e){e.innerHTML=""}function g(e){return`
    <li class="gallery-item">
      <a href="${e.largeImageURL}" class="gallery-link">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${e.likes}</p>
        <p><b>Views:</b> ${e.views}</p>
        <p><b>Comments:</b> ${e.comments}</p>
        <p><b>Downloads:</b> ${e.downloads}</p>
      </div>
    </li>
  `}function h(e,o){const s=o.map(g).join("");e.insertAdjacentHTML("beforeend",s),p.refresh()}const b=document.getElementById("search-form"),l=document.querySelector(".gallery"),c=document.getElementById("loader");b.addEventListener("submit",async e=>{e.preventDefault();const o=e.currentTarget.elements.query.value.trim();if(!o){i.error({title:"Error",message:"Please enter a search query!"});return}try{c.classList.remove("hidden");const s=await m(o);s.hits.length===0?i.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"}):(y(l),h(l,s.hits))}catch{i.error({title:"Error",message:"Something went wrong! Please try again later."})}finally{c.classList.add("hidden")}});
//# sourceMappingURL=index.js.map
