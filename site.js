/* Edit these lists to fill in the site. Leave url empty to show "Link coming soon".
   Entries that aren't in use are commented out with //. Remove the // to turn one on. */
var BEAN_IMG = "assets/beanbound.jpg";
var PROJECTS = [
  {slug:"beanbound", icon:"assets/beanbound/icon.png", tagline:"How far can you grow?", price:"Free on iOS",
   shots:["assets/beanbound/shot1.jpg","assets/beanbound/shot2.jpg","assets/beanbound/shot3.jpg"],
   name:"Beanbound 🌱", kind:"iOS", status:"Released", blurb:"You play as a bean climbing from the dirt all the way to space at 100,000m, dodging hazards and evolving as you go. No ads, free to play. How far can you grow?", url:"https://apps.apple.com/us/app/beanbound/id6818844668", cta:"Get it on the App Store", img:BEAN_IMG, alt:"Beanbound gameplay: a smiling bean on a vine climbing through a forest, collecting water drops and dodging birds"},
  // {name:"Project name", kind:"VR", status:"Prototype", blurb:"One line about the game and what makes it fun.", url:""},
  // {name:"Project name", kind:"Flatscreen", status:"Released", blurb:"One line about the game and what makes it fun.", url:""}
];

var VIDEOS = [
  // {title:"Devlog title", type:"Devlog", blurb:"What got built this week.", url:""},
  // {title:"Short title", type:"Short", blurb:"One quick idea, under a minute.", url:""},
  // {title:"Prototype title", type:"Prototype", blurb:"A first look at a new idea.", url:""},
  // {title:"Release title", type:"Release", blurb:"A finished game, out now.", url:""}
];

var SOCIALS = [
  {name:"YouTube", note:"Devlogs, shorts, prototypes and releases", url:"https://www.youtube.com/@Loke_works"},
  {name:"Twitch", note:"Live development", url:"https://www.twitch.tv/lokeworks"},
  {name:"Discord", note:"Chat and feedback", url:"https://discord.com/invite/9qu84vd3em"},
  {name:"Instagram", note:"Clips and screenshots", url:"https://www.instagram.com/lokeworks"},
  {name:"X", note:"Updates", url:"https://x.com/lokeworks"}
];

function el(t,c,h){
  var e=document.createElement(t);
  if(c)e.className=c;
  if(h!=null)e.textContent=h;
  return e;
}

function linkOrOff(o,label){
  if(o.url){
    var a=el("a","btn alt",label);
    a.href=o.url;
    a.target="_blank";
    a.rel="noopener";
    return a;
  }
  return el("span","tag plain","Link coming soon");
}

function renderProjects(){
  var g=document.getElementById("projectGrid");
  g.textContent="";
  PROJECTS.forEach(function(p){
    var c=el("article","card");
    if(p.img){
      var im=el("img","thumb");
      im.src=p.img;
      im.alt=p.alt||p.name;
      im.loading="lazy";
      c.appendChild(im);
    } else {
      c.appendChild(el("div","thumb","Screenshot"));
    }

    var b=el("div","body");
    b.appendChild(el("h3",null,p.name));
    b.appendChild(el("p",null,p.blurb));

    var t=el("div");
    t.style.cssText="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px";
    t.appendChild(el("span","tag",p.status));
    t.appendChild(el("span","tag plain",p.kind));
    b.appendChild(t);
    var more=el("a","btn",p.slug?"View page":"Coming soon");
    if(p.slug) more.href="project.html?p="+encodeURIComponent(p.slug);
    b.appendChild(more);
    c.appendChild(b);
    if(p.slug){
      c.style.cursor="pointer";
      c.addEventListener("click",function(e){
        if(e.target.closest("a")) return;
        window.location.href="project.html?p="+encodeURIComponent(p.slug);
      });
    }
    g.appendChild(c);
  });
}

function renderProjectPage(){
  var side=document.getElementById("projSide");
  var main=document.getElementById("projMain");
  var list=PROJECTS.filter(function(p){return p.slug;});
  var want=new URLSearchParams(location.search).get("p");
  var cur=list.filter(function(p){return p.slug===want;})[0]||list[0];
  side.textContent="";
  list.forEach(function(p){
    var a=el("a","proj-pill",p.name);
    a.href="project.html?p="+encodeURIComponent(p.slug);
    if(p===cur) a.setAttribute("aria-current","page");
    side.appendChild(a);
  });
  main.textContent="";
  if(!cur){ main.appendChild(el("p","sub","No projects yet.")); return; }
  document.title=cur.name+" — LokeWorks";

  var head=el("div","proj-head");
  if(cur.icon){
    var ic=el("img","proj-icon");
    ic.src=cur.icon; ic.alt=cur.name+" icon";
    head.appendChild(ic);
  }
  var info=el("div","proj-info");
  info.appendChild(el("h1","proj-title",cur.name));
  if(cur.tagline) info.appendChild(el("p","proj-tagline",cur.tagline));
  if(cur.price) info.appendChild(el("p","proj-price",cur.price));
  info.appendChild(linkOrOff(cur,"Get"));
  head.appendChild(info);
  main.appendChild(head);

  if(cur.shots&&cur.shots.length){
    var row=el("div","proj-shots");
    cur.shots.forEach(function(src,i){
      var im=el("img");
      im.src=src; im.alt=cur.name+" screenshot "+(i+1); im.loading="lazy";
      row.appendChild(im);
    });
    main.appendChild(row);
  }
  main.appendChild(el("h2","proj-h2","About"));
  main.appendChild(el("p","proj-about",cur.blurb));
  var t=el("div","proj-tags");
  t.appendChild(el("span","tag",cur.status));
  t.appendChild(el("span","tag plain",cur.kind));
  main.appendChild(t);
}

var activeType="All";

function renderVideos(){
  var f=document.getElementById("filters");
  f.textContent="";
  ["All","Devlog","Short","Prototype","Release"].forEach(function(t){
    var b=el("button",null,t==="All"?"All":t+"s");
    b.setAttribute("aria-pressed",String(t===activeType));
    b.onclick=function(){
      activeType=t;
      renderVideos();
    };
    f.appendChild(b);
  });

  var g=document.getElementById("videoGrid");
  g.textContent="";
  VIDEOS.filter(function(v){
    return activeType==="All"||v.type===activeType;
  }).forEach(function(v){
    var c=el("article","card");
    c.appendChild(el("div","thumb","Thumbnail"));
    var b=el("div","body");
    b.appendChild(el("span","tag",v.type));
    var h=el("h3",null,v.title);
    h.style.marginTop="8px";
    b.appendChild(h);
    b.appendChild(el("p",null,v.blurb));
    b.appendChild(linkOrOff(v,"Watch on YouTube"));
    c.appendChild(b);
    g.appendChild(c);
  });

  if(!g.children.length){
    g.appendChild(el("p","sub","No videos yet. Check back soon."));
  }
}

function renderSocials(){
  var u=document.getElementById("socialList");
  u.textContent="";
  SOCIALS.forEach(function(s){
    var li=el("li");
    var row;

    if(s.url){
      row=el("a");
      row.href=s.url;
      row.target="_blank";
      row.rel="noopener";
    } else {
      row=el("div","off");
    }

    var left=el("span");
    left.appendChild(document.createTextNode(s.name));
    left.appendChild(el("br"));
    left.appendChild(el("small",null,s.note));

    row.appendChild(left);
    row.appendChild(el("small",null,s.url?"Open":"Link coming soon"));
    li.appendChild(row);
    u.appendChild(li);
  });
}

// Render only the content present on the current HTML page.
if(document.getElementById("projectGrid")) renderProjects();
if(document.getElementById("projMain")) renderProjectPage();
if(document.getElementById("videoGrid")) renderVideos();
if(document.getElementById("socialList")) renderSocials();

var FALLBACK_ASSETS={"fonts-and-code": [{"title": "Bagel Fat One", "description": "Main font used in Beanbound.", "file": "assets/Fonts%20and%20Code/Bagel_Fat_One%20(1).zip", "preview": "assets/Fonts%20and%20Code/IMG_6233.jpeg", "buttonText": "Download Font"}, {"title": "LokeWorks Norm", "description": "The official LokeWorks font.", "file": "assets/Fonts%20and%20Code/LokeWorks-norm.ttf", "preview": "assets/Fonts%20and%20Code/IMG_6234.jpeg", "buttonText": "Download Font"}, {"title": "Newyear Coffee", "description": "idk just a good font", "file": "assets/Fonts%20and%20Code/Newyear_Coffee.zip", "preview": "assets/Fonts%20and%20Code/newyear-coffee-preview.jpg", "buttonText": "Download Font", "credit": "Khurasan", "creditUrl": "https://www.khurasanstudio.com", "supportUrl": "https://paypal.me/khurasantype"}], "3D": [], "2D": []};

// Load assets listed in assets/assets.json. Empty categories stay hidden.
async function renderFolderAssets(){
  var keys=["fonts-and-code","3D","2D"];
  var empty=document.getElementById("assetsEmpty");
  var shown=0;
  try{
    var manifest;
    try{
      var response=await fetch("assets/assets.json?v="+Date.now(),{cache:"no-store"});
      if(!response.ok) throw new Error("Could not load assets/assets.json");
      manifest=await response.json();
    }catch(e){
      // Fallback (e.g. page opened straight from disk, where fetch is blocked)
      manifest=FALLBACK_ASSETS;
    }

    keys.forEach(function(key){
      var section=document.getElementById("assetSection-"+key);
      var target=document.getElementById("assetGrid-"+key);
      var items=manifest[key]||[];
      if(!section||!target||!items.length) return;
      target.textContent="";
      items.forEach(function(item){
        var card=el("article","card");
        if(item.preview){
          var img=el("img","asset-preview");
          img.src=item.preview;
          img.alt=(item.title||"Asset")+" preview";
          img.loading="lazy";
          card.appendChild(img);
        }
        var body=el("div","body");
        body.appendChild(el("h3",null,item.title||item.name||"Untitled asset"));
        if(item.description) body.appendChild(el("p",null,item.description));
        if(item.file){
          var link=el("a","btn alt",item.buttonText||"Download");
          link.href=item.file;
          link.setAttribute("download","");
          body.appendChild(link);
        }
        if(item.credit||item.supportUrl){
          var meta=el("p","asset-credit");
          meta.style.cssText="margin:12px 0 0;font-size:.9rem";
          if(item.credit){
            meta.appendChild(document.createTextNode("Made by "));
            if(item.creditUrl){
              var ca=el("a",null,item.credit);ca.href=item.creditUrl;ca.target="_blank";ca.rel="noopener";meta.appendChild(ca);
            } else meta.appendChild(document.createTextNode(item.credit));
          }
          if(item.supportUrl){
            if(item.credit) meta.appendChild(document.createTextNode(" \u00b7 "));
            var sa=el("a",null,"Support the creator \u2665");sa.href=item.supportUrl;sa.target="_blank";sa.rel="noopener";meta.appendChild(sa);
          }
          body.appendChild(meta);
        }
        card.appendChild(body);
        target.appendChild(card);
      });
      section.hidden=false;
      shown++;
    });
  } catch(error){
    console.error(error);
  }
  if(!shown&&empty) empty.hidden=false;
}

if(document.getElementById("assetsEmpty")) renderFolderAssets();

// Home page buttons: data-go="projects" -> projects.html, etc.
document.addEventListener("click",function(e){
  var b=e.target.closest&&e.target.closest("[data-go]");
  if(b) window.location.href=b.getAttribute("data-go")+".html";
});

// Home page: press and hold Loke to swap his picture; let go to swap back.
(function(){
  var guy=document.getElementById("guy");
  if(!guy) return;
  var normal=guy.getAttribute("src");
  var pressed=guy.getAttribute("data-press");
  new Image().src=pressed; // preload so the swap is instant
  function down(e){ guy.src=pressed; }
  function up(){ guy.src=normal; }
  guy.addEventListener("pointerdown",down);
  guy.addEventListener("pointerup",up);
  guy.addEventListener("pointercancel",up);
  guy.addEventListener("pointerleave",up);
  guy.addEventListener("contextmenu",function(e){e.preventDefault();});
})();
