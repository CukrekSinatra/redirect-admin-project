if(!sessionStorage.getItem("admin_token")) location.href="login.html";
const token=()=>sessionStorage.getItem("admin_token");
const api=async(path,opts={})=>{
 opts.headers=Object.assign({},opts.headers||{},{Authorization:"Bearer "+token(),"Content-Type":"application/json"});
 const r=await fetch(WORKER_URL+path,opts); const d=await r.json().catch(()=>({}));
 if(r.status===401){sessionStorage.removeItem("admin_token");location.href="login.html";throw new Error("Sesi berakhir");}
 if(!r.ok) throw new Error(d.error||"Request gagal"); return d;
};
document.getElementById("logout").onclick=()=>{sessionStorage.removeItem("admin_token");location.href="login.html"};
async function loadLinks(){
 const box=document.getElementById("linksList"); box.innerHTML="<p class='muted'>Memuat...</p>";
 try{
  const d=await api("/api/links");
  document.getElementById("totalLinks").textContent=d.links.length;
  document.getElementById("totalClicks").textContent=d.links.reduce((n,x)=>n+(x.clicks||0),0);
  if(!d.links.length){box.innerHTML="<p class='muted'>Belum ada link.</p>";return}
  box.innerHTML=`<table><thead><tr><th>Slug</th><th>URL Tujuan</th><th>Klik</th><th>Dibuat</th><th>Aksi</th></tr></thead><tbody>${
   d.links.map(x=>`<tr><td>${esc(x.slug)}</td><td class="link-cell">${esc(x.destination)}</td><td>${x.clicks||0}</td><td>${esc(x.createdAt||"")}</td><td><button class="copy" data-link="${esc(x.url)}">Copy</button><button class="delete" data-slug="${esc(x.slug)}">Hapus</button></td></tr>`).join("")
  }</tbody></table>`;
  box.querySelectorAll(".copy").forEach(b=>b.onclick=async()=>{await navigator.clipboard.writeText(b.dataset.link);b.textContent="Copied!"});
  box.querySelectorAll(".delete").forEach(b=>b.onclick=async()=>{if(confirm("Hapus link ini?")){await api("/api/links/"+encodeURIComponent(b.dataset.slug),{method:"DELETE"});loadLinks()}});
 }catch(e){box.innerHTML="<p class='message'>"+esc(e.message)+"</p>"}
}
document.getElementById("generateBtn").onclick=async()=>{
 const destination=document.getElementById("destination").value.trim(),slug=document.getElementById("slug").value.trim();
 const m=document.getElementById("generateMsg");
 if(!destination){m.textContent="Masukkan URL tujuan.";return}
 m.textContent="Membuat link...";
 try{const d=await api("/api/links",{method:"POST",body:JSON.stringify({destination,slug})});
 m.innerHTML=`Link berhasil: <a href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.url)}</a>`;
 document.getElementById("destination").value="";document.getElementById("slug").value="";loadLinks();
 }catch(e){m.textContent=e.message}
};
document.getElementById("refreshBtn").onclick=loadLinks;
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
loadLinks();