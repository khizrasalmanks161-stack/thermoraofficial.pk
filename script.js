const products=[
 {name:'Menstrual Heat Patch',price:790,heat:8,type:'menstrual',desc:'Discreet comfort for cramps, lower back pain, and daily movement.',unit:'3 PATCHES'},
 {name:'Muscle Pain Heat Patch',price:890,heat:12,type:'muscle',desc:'Targeted relief for sore, tired, and overworked muscles.',unit:'3 PATCHES'},
 {name:'Hand Warmers',price:690,heat:10,type:'hand',desc:'Pocket-sized warmth for cold commutes and winter mornings.',unit:'2 WARMERS'},
 {name:'Foot Warmers',price:890,heat:10,type:'foot',desc:'Step-in comfort for long days, travel, and chilly offices.',unit:'2 WARMERS'}
];

const nav=document.getElementById('nav'),burger=document.getElementById('burger'),mobileMenu=document.getElementById('mobileMenu'),grid=document.getElementById('productGrid'),cartCount=document.getElementById('cartCount');
let cart=0;

window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>24),{passive:true});

burger?.addEventListener('click',()=>mobileMenu.classList.toggle('open'));
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));

function packHTML(p){return `<article class="pack ${p.type}"><span>THERMORA</span><h2>${p.name.replace(' ','<br>')}</h2><p>Up to ${p.heat} Hours<br>of natural warmth.</p><ul><li>Instant Warmth</li><li>Long Lasting</li><li>Odourless</li></ul><b>${p.unit}</b></article>`}
function renderProducts(list=products){grid.innerHTML=list.map((p,i)=>`<article class="product-card reveal" data-name="${p.name}" style="transition-delay:${i*.06}s">${packHTML(p)}<p class="eyebrow">Up to ${p.heat} hours</p><h3>${p.name}</h3><p>${p.desc}</p><strong>Rs. ${p.price}</strong><div class="product-actions"><button class="add-cart">Quick Add</button><button aria-label="Add ${p.name} to wishlist">♡</button></div></article>`).join('');
observeReveals();
wireCart();
}
function observeReveals(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');
io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px'});
document.querySelectorAll('.reveal:not(.in-view)').forEach(el=>io.observe(el));
}
function wireCart(){document.querySelectorAll('.add-cart').forEach(btn=>btn.onclick=()=>{cart++;
cartCount.textContent=cart;
btn.animate([{transform:'scale(1)'},{transform:'scale(.96)'},{transform:'scale(1)'}],{duration:260});
});
}
renderProducts();
observeReveals();
wireCart();

document.getElementById('productSearch')?.addEventListener('input',e=>{const q=e.target.value.toLowerCase();
renderProducts(products.filter(p=>p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)));
});

document.getElementById('sortProducts')?.addEventListener('change',e=>{let sorted=[...products];
if(e.target.value==='price')sorted.sort((a,b)=>a.price-b.price);
if(e.target.value==='heat')sorted.sort((a,b)=>b.heat-a.heat);
renderProducts(sorted);
});

document.querySelectorAll('.faq button').forEach(btn=>btn.addEventListener('click',()=>btn.parentElement.classList.toggle('open')));

document.getElementById('faqSearch')?.addEventListener('input',e=>{const q=e.target.value.toLowerCase();
document.querySelectorAll('.faq-list article').forEach(item=>item.style.display=item.textContent.toLowerCase().includes(q)?'':'none');
});

document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();
el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.12}px)`});
el.addEventListener('mouseleave',()=>el.style.transform='')});

document.addEventListener('mousemove',e=>{document.documentElement.style.setProperty('--mx',e.clientX/window.innerWidth);
document.documentElement.style.setProperty('--my',e.clientY/window.innerHeight);
});

