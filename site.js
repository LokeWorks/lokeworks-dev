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
  {name:"YouTube", note:"Devlogs, shorts, prototypes and releases", url:""},
  {name:"Twitch", note:"Live development", url:""},
  {name:"Discord", note:"Chat and feedback", url:""},
  {name:"Instagram", note:"Clips and screenshots", url:""},
  {name:"X", note:"Updates", url:""}
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

// Load assets listed in assets/assets.json.
async function renderFolderAssets(){
  const categories=[
    {key:"fonts-and-code",id:"assetGrid-font-code",title:"Fonts and Code"},
    {key:"3D",id:"assetGrid-3d",title:"3D"},
    {key:"2D",id:"assetGrid-2d",title:"2D"}
  ];

  try{
    const response=await fetch("assets/assets.json",{cache:"no-store"});
    if(!response.ok) throw new Error("Could not load assets/assets.json");

    const manifest=await response.json();

    for(const category of categories){
      const target=document.getElementById(category.id);
      if(!target) continue;

      target.replaceChildren();
      const items=manifest[category.key]||[];

      if(!items.length){
        const empty=document.createElement("p");
        empty.className="muted";
        empty.textContent="No assets added yet.";
        target.appendChild(empty);
        continue;
      }

      for(const item of items){
        const card=document.createElement("article");
        card.className="card";

        const title=document.createElement("h3");
        title.textContent=item.title||item.name||"Untitled asset";
        card.appendChild(title);

        if(item.description){
          const description=document.createElement("p");
          description.textContent=item.description;
          card.appendChild(description);
        }

        if(item.preview){
          const preview=document.createElement("img");
          preview.src=item.preview;
          preview.alt=item.title?item.title+" preview":"Asset preview";
          preview.loading="lazy";
          preview.className="asset-preview";
          card.appendChild(preview);
        }

        if(item.file){
          const link=document.createElement("a");
          link.href=item.file;
          link.textContent=item.buttonText||"Download";
          link.className="button";
          link.setAttribute("download","");
          card.appendChild(link);
        }

        target.appendChild(card);
      }
    }
  } catch(error){
    for(const id of ["assetGrid-games","assetGrid-3d","assetGrid-2d"]){
      const target=document.getElementById(id);
      if(target){
        target.innerHTML='<p class="muted">Could not load the asset list. Check that assets/assets.json exists.</p>';
      }
    }
  }
}

if(document.getElementById("assetGrid-games")){
  renderFolderAssets();
}
