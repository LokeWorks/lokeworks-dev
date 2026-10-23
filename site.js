/* Edit these lists to fill in the site. Leave url empty to show "Link coming soon".
   Entries that aren't in use are commented out with //. Remove the // to turn one on. */
var BEAN_IMG = "assets/beanbound.jpg";
var PROJECTS = [
  {name:"Beanbound 🌱", kind:"iOS", status:"Released", blurb:"You play as a bean climbing from the dirt all the way to space at 100,000m, dodging hazards and evolving as you go. No ads, free to play. How far can you grow?", url:"https://apps.apple.com/us/app/beanbound/id6818844668", cta:"Get it on the App Store", img:BEAN_IMG, alt:"Beanbound gameplay: a smiling bean on a vine climbing through a forest, collecting water drops and dodging birds"},
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
  {name:"Discord", note:"Chat and feedback", url:""},
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
    b.appendChild(linkOrOff(p,p.cta||"Play or read more"));
    c.appendChild(b);
    g.appendChild(c);
  });
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
if(document.getElementById("videoGrid")) renderVideos();
if(document.getElementById("socialList")) renderSocials();

var FALLBACK_ASSETS={"fonts-and-code": [{"title": "Bagel Fat One", "description": "Main font used in Beanbound.", "file": "assets/Fonts%20and%20Code/Bagel_Fat_One%20(1).zip", "preview": "assets/Fonts%20and%20Code/IMG_6233.jpeg", "buttonText": "Download Font"}, {"title": "LokeWorks Norm", "description": "The official LokeWorks font.", "file": "assets/Fonts%20and%20Code/LokeWorks-norm.ttf", "preview": "assets/Fonts%20and%20Code/IMG_6234.jpeg", "buttonText": "Download Font"}], "3D": [], "2D": []};

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
