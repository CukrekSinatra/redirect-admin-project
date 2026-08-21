const form=document.getElementById("loginForm");
const msg=document.getElementById("loginMsg");
document.getElementById("togglePassword").onclick=()=>{
 const p=document.getElementById("password"); p.type=p.type==="password"?"text":"password";
};
form.addEventListener("submit",async e=>{
 e.preventDefault(); msg.textContent="Memeriksa...";
 if(WORKER_URL.includes("PASTE_YOUR")){msg.textContent="Isi WORKER_URL di js/config.js terlebih dahulu.";return}
 try{
  const r=await fetch(WORKER_URL+"/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:document.getElementById("password").value})});
  const data=await r.json().catch(()=>({}));
  if(!r.ok) throw new Error(data.error||"Login gagal");
  sessionStorage.setItem("admin_token",data.token);
  location.href="dashboard.html";
 }catch(err){msg.textContent=err.message||"Worker tidak dapat dihubungi.";}
});