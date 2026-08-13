import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  X,
  Code2,
  Smartphone,
  Sparkles,
  Gamepad2,
  MousePointer2,
} from 'lucide-react'
import { motion, useMotionValue, useSpring, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import './index.css'

const contact = {
  github: 'https://github.com/Naman-Aggarwal-dev',
  linkedin: 'https://www.linkedin.com/in/naman-aggarwal-3a08b0307/',
  instagram: 'https://www.instagram.com/naman_aggarwall/',
  email: 'mailto:namansingla8371@gmail.com',
  emailText: 'namansingla8371@gmail.com',
}

const portrait = 'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png'

const loadingImages = [
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png', bg: '#F4845F' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png', bg: '#6BBF7A' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png', bg: '#E882B4' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png', bg: '#6EB5FF' },
]

const projects = [
  { n:'01', name:'KAI', type:'AI / PRODUCT', category:'Product', url:'https://in-kai.vercel.app', desc:'My biggest build so far: an AI assistant project treated like a real product, with interface, interaction and identity working together.', year:'2026', tags:['AI','Product','UI'], accent:'linear-gradient(135deg,#17191e,#565d6d)' },
  { n:'02', name:'NamanOS', type:'OS / INTERFACE', category:'Experiment', url:'https://namanos.netlify.app', desc:'An operating system made by Naman for Naman — an experiment in desktop interaction, structure and visual language.', year:'2026', tags:['OS','Interface','Experiment'], accent:'linear-gradient(135deg,#14181d,#6f7d8c)' },
  { n:'03', name:'AmazeMC', type:'MINECRAFT / WEB', category:'Minecraft', url:'https://amazemc.vercel.app', desc:'A Minecraft server project with its own web presence and community-facing identity.', year:'2026', tags:['Minecraft','Web','Community'], accent:'linear-gradient(135deg,#111913,#5c7b64)' },
  { n:'04', name:'AmazeMC Release', type:'LAUNCH / WEB', category:'Web', url:'https://amazemc-surprise.vercel.app', desc:'A second AmazeMC web experience focused on the release and reveal moment.', year:'2026', tags:['Launch','Web'], accent:'linear-gradient(135deg,#1c1613,#8c634c)' },
  { n:'05', name:'Neev Institute', type:'EDUCATION / WEB', category:'Web', url:'https://neev-institute.vercel.app', desc:'A coaching institute website built to present information clearly and confidently.', year:'2026', tags:['Education','Web'], accent:'linear-gradient(135deg,#15171c,#596576)' },
  { n:'06', name:'Veloura Café', type:'HOSPITALITY / WEB', category:'Web', url:'https://veloura-cafe-demo.vercel.app', desc:'A café website concept focused on atmosphere, visual identity and presentation.', year:'2026', tags:['Brand','Web'], accent:'linear-gradient(135deg,#241a16,#a86e4f)' },
]

const skills = ['React','TypeScript','JavaScript','Tailwind CSS','Framer Motion','GSAP','Three.js','Java','Android','Godot','Paper / Minecraft']
const socialLinks = [
  ['GitHub', contact.github, Github],
  ['LinkedIn', contact.linkedin, Linkedin],
  ['Instagram', contact.instagram, Instagram],
  ['Email', contact.email, Mail],
] as const

function Reveal({ children, delay=0, y=28, className='' }:{children:React.ReactNode;delay?:number;y?:number;className?:string}){
  return <motion.div className={className} initial={{opacity:0,y}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.78,delay,ease:[.16,1,.3,1]}}>{children}</motion.div>
}

function CameraCursor(){
  const x=useMotionValue(-100), y=useMotionValue(-100)
  const sx=useSpring(x,{stiffness:180,damping:28,mass:.25}), sy=useSpring(y,{stiffness:180,damping:28,mass:.25})
  const [state,setState]=useState({hover:false,label:'FOCUS'})
  const [flash,setFlash]=useState(false)
  const lastHit=useRef(''), flashTimer=useRef<ReturnType<typeof setTimeout>|null>(null)
  useEffect(()=>{
    if(window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return
    const getTarget=(target:EventTarget|null)=>{
      const el=target instanceof HTMLElement ? target.closest<HTMLElement>('[data-cursor]') : null
      if(!el)return null
      return (el.getAttribute('data-cursor') || 'FOCUS').slice(0,11).toUpperCase()
    }
    const move=(e:MouseEvent)=>{x.set(e.clientX);y.set(e.clientY)}
    const over=(e:MouseEvent)=>{
      const label=getTarget(e.target)
      const key=label||'FOCUS'
      if(lastHit.current===key)return
      lastHit.current=key
      setState({hover:Boolean(label),label:key})
    }
    const leave=()=>{lastHit.current='';setState({hover:false,label:'FOCUS'})}
    const down=(e:MouseEvent)=>{if(!getTarget(e.target))return;setFlash(true);if(flashTimer.current)clearTimeout(flashTimer.current);flashTimer.current=setTimeout(()=>setFlash(false),220)}
    window.addEventListener('mousemove',move,{passive:true});document.addEventListener('mouseover',over);document.addEventListener('mouseleave',leave);document.addEventListener('mousedown',down)
    document.documentElement.classList.add('camera-cursor-active')
    return()=>{window.removeEventListener('mousemove',move);document.removeEventListener('mouseover',over);document.removeEventListener('mouseleave',leave);document.removeEventListener('mousedown',down);document.documentElement.classList.remove('camera-cursor-active');if(flashTimer.current)clearTimeout(flashTimer.current)}
  },[x,y])
  if(typeof window!=='undefined' && window.matchMedia('(pointer: coarse)').matches)return null
  return <motion.div className={`camera-cursor ${state.hover?'is-hover':''} ${flash?'is-flash':''}`} style={{x:sx,y:sy}} aria-hidden="true">
    <div className="camera-corner corner-tl"/><div className="camera-corner corner-tr"/><div className="camera-corner corner-bl"/><div className="camera-corner corner-br"/>
    <div className="camera-crosshair"><span/><span/></div><div className="camera-core"/>
    <div className="camera-readout"><span className="camera-rec"><i/> REC</span><b>{state.label}</b></div><div className="camera-flash"/>
  </motion.div>
}

function LoadingScreen({onEnter}:{onEnter:()=>void}){
  const [activeIndex,setActiveIndex]=useState(0),[isAnimating,setIsAnimating]=useState(false),[isMobile,setIsMobile]=useState(false),[ready,setReady]=useState(false),[exiting,setExiting]=useState(false)
  const timerRef=useRef<ReturnType<typeof setTimeout>|null>(null)
  const navTimerRef=useRef<ReturnType<typeof setTimeout>|null>(null)
  useEffect(()=>{setIsMobile(window.innerWidth<640);const resize=()=>setIsMobile(window.innerWidth<640);window.addEventListener('resize',resize,{passive:true});return()=>window.removeEventListener('resize',resize)},[])
  useEffect(()=>{
    let cancelled=false
    const img=new Image();img.decoding='async';img.onload=()=>!cancelled&&setReady(true);img.onerror=()=>!cancelled&&setReady(true);img.src=loadingImages[0].src
    const preloadRest=()=>loadingImages.slice(1).forEach(({src})=>{const warm=new Image();warm.decoding='async';warm.src=src})
    if(typeof window.requestIdleCallback==='function'){const id=window.requestIdleCallback(preloadRest);return()=>{cancelled=true;window.cancelIdleCallback(id)}}
    const id=setTimeout(preloadRest,900);return()=>{cancelled=true;clearTimeout(id)}
  },[])
  const finish=()=>{if(!ready||exiting)return;setExiting(true);timerRef.current=setTimeout(onEnter,360)}
  useEffect(()=>()=>{if(timerRef.current)clearTimeout(timerRef.current);if(navTimerRef.current)clearTimeout(navTimerRef.current)},[])
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='ArrowRight')navigate('next');if(e.key==='ArrowLeft')navigate('prev');if(e.key==='Enter')finish()};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[isAnimating,ready,exiting])
  const navigate=(dir:'next'|'prev')=>{if(isAnimating)return;setIsAnimating(true);setActiveIndex(v=>dir==='next'?(v+1)%4:(v+3)%4);if(navTimerRef.current)clearTimeout(navTimerRef.current);navTimerRef.current=setTimeout(()=>setIsAnimating(false),650)}
  const center=activeIndex,left=(activeIndex+3)%4,right=(activeIndex+1)%4
  const role=(i:number)=>i===center?'center':i===left?'left':i===right?'right':'back'
  return <motion.div className="fixed inset-0 z-[100] overflow-hidden" style={{backgroundColor:loadingImages[activeIndex].bg,fontFamily:'Inter, sans-serif'}} animate={{opacity:exiting?0:1}} transition={{duration:.36}}>
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <div className="loading-grain absolute inset-0 z-50 pointer-events-none"/>
      <div className="absolute inset-x-0 top-[17%] z-[2] flex justify-center pointer-events-none select-none"><div className="loading-ghost-text">3D SHAPE</div></div>
      <div className="absolute left-4 top-6 z-[60] text-xs font-semibold uppercase tracking-[.2em] text-white sm:left-8">N / NAMAN</div>
      <div className="absolute right-4 top-6 z-[60] text-[10px] uppercase tracking-[.28em] text-white/80 sm:right-8">PORTFOLIO 2026</div>
      <div className="absolute inset-0 z-[3]">
        {loadingImages.map((item,index)=>{const r=role(index);const styles:Record<string,React.CSSProperties>={center:{left:'50%',bottom:isMobile?'22%':0,height:isMobile?'60%':'92%',transform:`translateX(-50%) scale(${isMobile?1.25:1.68})`,filter:'blur(0px)',opacity:1,zIndex:20},left:{left:isMobile?'20%':'30%',bottom:isMobile?'32%':'12%',height:isMobile?'16%':'28%',transform:'translateX(-50%)',filter:'blur(2px)',opacity:.85,zIndex:10},right:{left:isMobile?'80%':'70%',bottom:isMobile?'32%':'12%',height:isMobile?'16%':'28%',transform:'translateX(-50%)',filter:'blur(2px)',opacity:.85,zIndex:10},back:{left:'50%',bottom:isMobile?'32%':'12%',height:isMobile?'13%':'22%',transform:'translateX(-50%)',filter:'blur(4px)',opacity:1,zIndex:5}};return <div key={item.src} className="absolute aspect-[.6/1] will-change-transform transition-[transform,filter,opacity,left] duration-[650ms] ease-[cubic-bezier(.4,0,.2,1)]" style={styles[r]}><img src={item.src} alt="3D figurine" className="h-full w-full select-none object-contain object-bottom" draggable={false} decoding="async" loading={r==='center'?'eager':'lazy'}/></div>})}
      </div>
      <div className="absolute bottom-6 left-4 z-[60] max-w-[340px] sm:bottom-20 sm:left-24"><p className="mb-2 text-base font-bold uppercase tracking-[.18em] text-white sm:text-[22px]">Naman Aggarwal</p><p className="mb-4 hidden text-sm leading-relaxed text-white/85 sm:block">A visual entrance to a portfolio built around real work, experiments and things worth shipping.</p><div className="flex items-center gap-3"><button data-cursor="PREV" className="loading-circle-button" onClick={()=>navigate('prev')} aria-label="Previous"><ArrowLeft size={25}/></button><button data-cursor="NEXT" className="loading-circle-button" onClick={()=>navigate('next')} aria-label="Next"><ArrowRight size={25}/></button><span className="ml-1 text-[9px] uppercase tracking-[.25em] text-white/80">{String(activeIndex+1).padStart(2,'0')} / 04</span></div></div>
      <button data-cursor="ENTER" onClick={finish} disabled={!ready||exiting} className="absolute bottom-6 right-4 z-[60] flex items-center gap-2 font-anton text-[clamp(20px,4vw,56px)] uppercase leading-none tracking-[-.02em] text-white transition-[opacity,transform] hover:opacity-70 disabled:cursor-wait disabled:opacity-45 sm:bottom-20 sm:right-10">{ready?'ENTER PORTFOLIO':'LOADING'} <ArrowRight className="h-5 w-5 sm:h-8 sm:w-8"/></button>
    </div>
  </motion.div>
}

function MobileNav({open,setOpen}:{open:boolean;setOpen:(v:boolean)=>void}){
  const items=[['About','#about'],['Work','#work'],['Build','#build'],['Contact','#contact']]
  return <AnimatePresence>{open&&<motion.div className="fixed inset-0 z-[250] flex flex-col bg-[#080808]/96 backdrop-blur-xl md:hidden" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.32}}><div className="flex items-center justify-between px-5 py-6"><span className="font-anton text-2xl">N</span><button onClick={()=>setOpen(false)} className="rounded-full p-2 text-white" aria-label="Close menu"><X size={24}/></button></div><div className="flex flex-1 flex-col items-center justify-center gap-5">{items.map(([label,href],i)=><motion.a key={href} data-cursor={label.toUpperCase()} href={href} onClick={()=>setOpen(false)} className="font-anton text-5xl uppercase tracking-[-.03em] text-white" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.08+i*.06,duration:.45,ease:[.16,1,.3,1]}}>{label}</motion.a>)}</div><div className="border-t border-white/10 px-5 py-6 text-center text-[9px] uppercase tracking-[.25em] text-white/35">Naman Aggarwal / Portfolio</div></motion.div>}</AnimatePresence>
}

function Header({openMenu}:{openMenu:()=>void}){
  const [active,setActive]=useState('top')
  useEffect(()=>{const ids=['top','about','work','build','contact'];const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)}),{rootMargin:'-38% 0px -48% 0px'});ids.forEach(id=>document.getElementById(id)&&obs.observe(document.getElementById(id)!));return()=>obs.disconnect()},[])
  return <nav className="absolute left-0 right-0 top-0 z-[40] px-5 py-6 sm:px-6 md:px-10 lg:px-14"><div className="flex items-center justify-between"><a data-cursor="HOME" href="#top" className="flex items-center gap-3 text-white"><span className="font-anton text-2xl">N</span><span className="hidden text-xs font-semibold uppercase tracking-[.24em] text-white/72 sm:inline">NAMAN AGGARWAL</span></a><div className="hidden items-center gap-6 md:flex">{[['ABOUT','about'],['WORK','work'],['BUILD','build'],['CONTACT','contact']].map(([label,id])=><a key={id} data-cursor={label} className={`nav-link ${active===id?'active':''}`} href={`#${id.toLowerCase()}`}>{label}</a>)}<a data-cursor="EMAIL" href={contact.email} className="cta">LET'S TALK <ArrowUpRight size={14}/></a></div><button data-cursor="MENU" className="rounded-full p-2 text-white hover:opacity-70 md:hidden" onClick={openMenu} aria-label="Open menu"><Menu size={24}/></button></div></nav>
}

function HeroSection({openMenu}:{openMenu:()=>void}){
  const x=useMotionValue(0),y=useMotionValue(0),sx=useSpring(x,{stiffness:60,damping:18}),sy=useSpring(y,{stiffness:60,damping:18})
  const [parallax,setParallax]=useState(false)
  useEffect(()=>{const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;const coarse=window.matchMedia('(pointer: coarse)').matches;const saveData=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData===true;const enabled=!reduce&&!coarse&&!saveData;setParallax(enabled);if(!enabled)return;const move=(e:MouseEvent)=>{x.set((e.clientX/window.innerWidth-.5)*20);y.set((e.clientY/window.innerHeight-.5)*14)};window.addEventListener('mousemove',move,{passive:true});return()=>window.removeEventListener('mousemove',move)},[x,y])
  return <section id="top" className="relative min-h-[100dvh] overflow-hidden bg-[#090909] text-white"><Header openMenu={openMenu}/><motion.div className="absolute inset-[-7%]" style={parallax?{x:sx,y:sy}:undefined}><div className="hero-ambient absolute inset-0"/><div className="hero-grid absolute inset-0"/><div className="hero-noise absolute inset-0"/></motion.div><div className="hero-vignette absolute inset-0"/><motion.div className="absolute bottom-[-2%] left-1/2 z-[5] -translate-x-1/2" style={parallax?{x:sx,y:sy}:undefined} animate={parallax?{rotateZ:[0,.2,0],scale:[1,1.01,1]}:undefined} transition={parallax?{duration:7,repeat:Infinity,ease:'easeInOut'}:undefined}><img src={portrait} alt="Naman 3D character in red jacket" fetchPriority="high" decoding="async" className="hero-portrait h-[67vh] w-[78vw] max-w-[570px] sm:h-[75vh] sm:w-[540px] md:h-[86vh] md:w-[620px] lg:h-[94vh]"/></motion.div><div className="hero-orbit orbit-a"/><div className="hero-orbit orbit-b"/><div className="relative z-10 flex min-h-[100dvh] flex-col justify-between px-5 pb-7 pt-28 sm:px-6 md:px-10 md:pb-9 lg:px-14"><div className="flex justify-between gap-8"><Reveal y={16}><p className="eyebrow text-white/50">WEB DEVELOPER / CREATIVE BUILDER</p></Reveal><Reveal delay={.05} y={16} className="max-w-[240px] text-right"><p className="text-[10px] leading-relaxed text-white/45 sm:text-xs">Websites, apps, experiments and the occasional idea that gets out of hand.</p></Reveal></div><div className="max-w-[1140px]"><Reveal delay={.08}><div className="mb-5 flex items-center gap-3 text-[9px] uppercase tracking-[.34em] text-white/35"><span className="h-px w-9 bg-white/20"/> PERSONAL PORTFOLIO / 2026</div></Reveal><Reveal delay={.15} y={34}><h1 className="text-[clamp(4rem,10.4vw,10.2rem)] font-normal uppercase leading-[.76] tracking-[-.055em]">I BUILD <span className="font-anton">THE UNEXPECTED</span><br/><span className="hero-heading">AND SHIP IT.</span></h1></Reveal><div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><Reveal delay={.26} className="max-w-xl"><p className="text-sm leading-relaxed text-white/62 sm:text-base">I'm Naman. I turn rough ideas into websites, products and experiments — then keep pushing until the thing feels worth opening twice.</p></Reveal><Reveal delay={.34}><div className="flex flex-wrap gap-3"><a data-cursor="VIEW" href="#work" className="cta">VIEW WORK <ArrowDown size={14}/></a><a data-cursor="EMAIL" href={contact.email} className="ghost-cta">CONTACT <ArrowUpRight size={14}/></a></div></Reveal></div></div><div className="absolute bottom-6 right-5 z-20 hidden items-center gap-2 text-[9px] uppercase tracking-[.25em] text-white/28 md:flex"><MousePointer2 size={13}/> MOVE YOUR CURSOR</div></div></section>
}

function BuildSection(){
  const disciplines=[
    {title:'Web',desc:'Modern, responsive sites that are fast enough to use and interesting enough to remember.',icon:Code2},
    {title:'Apps',desc:'Product ideas and Android experiences designed from the screen outward.',icon:Smartphone},
    {title:'Experiments',desc:'Interfaces, operating-system concepts, 3D interactions and whatever I want to test next.',icon:Sparkles},
    {title:'Games / Servers',desc:'Minecraft communities, server systems and game experiments that become whole projects.',icon:Gamepad2},
  ]
  return <section id="build" className="perf-section bg-[#f4f2ee] px-5 py-24 text-[#0c0c0c] sm:px-8 sm:py-28 md:px-10 md:py-36"><div className="mx-auto max-w-7xl"><Reveal><div className="section-kicker section-kicker-dark"><span>02</span><i/> WHAT I BUILD</div></Reveal><div className="mt-12 grid gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-20"><Reveal><h2 className="max-w-xl text-[clamp(3.7rem,8vw,8rem)] font-black uppercase leading-[.78] tracking-[-.06em]">More than<br/><span className="text-black/28">one lane.</span></h2></Reveal><div className="grid gap-px overflow-hidden rounded-[28px] bg-black/10 sm:grid-cols-2">{disciplines.map(({title,desc,icon:Icon},i)=><Reveal key={title} delay={i*.05}><div className="group bg-[#f4f2ee] p-6 transition-colors hover:bg-white sm:p-8"><div className="flex items-center justify-between"><Icon size={21} strokeWidth={1.7}/><span className="text-[9px] font-semibold tracking-[.22em] text-black/25">0{i+1}</span></div><h3 className="mt-14 text-3xl font-black uppercase tracking-[-.04em]">{title}</h3><p className="mt-3 max-w-xs text-sm leading-relaxed text-black/50">{desc}</p></div></Reveal>)}</div></div></div></section>
}

function ProjectWindow({project}:{project:typeof projects[number]}){
  return <div className="project-window" data-cursor="VIEW">
    <div className="project-window-bar"><span/><span/><span/><b>{project.name}</b><small>{project.url.replace('https://','')}</small></div>
    <div className="project-card-visual" style={{background:project.accent}}>
      <div className="project-card-noise"/>
      <span className="project-card-kicker">{project.n} / {project.type}</span>
      <strong>{project.name}</strong>
      <small>{project.category} · {project.year}</small>
      <span className="project-card-open">Open project ↗</span>
    </div>
  </div>
}

function WorkCard({project,index,total}:{project:typeof projects[number];index:number;total:number}){
  const ref=useRef<HTMLDivElement|null>(null)
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']})
  const targetScale=1-(total-1-index)*.035
  const scale=useTransform(scrollYProgress,[0,.85,1],[1, targetScale, targetScale])
  return <div ref={ref} className="sticky-card-wrap"><motion.article style={{scale,top:index*24}} className="sticky-project group" data-cursor="PROJECT"><div className="sticky-project-image"><ProjectWindow project={project}/></div><div className="sticky-project-meta"><div><div className="flex items-center gap-3 text-[9px] uppercase tracking-[.24em] text-white/35"><span>{project.n}</span><span>•</span><span>{project.type}</span><span>•</span><span>{project.year}</span></div><h3 className="mt-4 text-[clamp(3rem,7vw,7.5rem)] font-black uppercase leading-[.76] tracking-[-.06em]">{project.name}</h3><p className="mt-5 max-w-xl text-sm leading-relaxed text-white/45 sm:text-base">{project.desc}</p></div><div className="flex flex-col items-start gap-4 sm:items-end"><div className="flex flex-wrap gap-2 sm:justify-end">{project.tags.map(tag=><span key={tag} className="pill">{tag}</span>)}</div><a data-cursor="OPEN" href={project.url} target="_blank" rel="noreferrer" className="ghost-cta">LIVE PROJECT <ArrowUpRight size={15}/></a></div></div></motion.article></div>
}

function WorkSection(){
  const [filter,setFilter]=useState('ALL')
  const filters=['ALL','Web','Product','Experiment','Minecraft']
  const filtered=useMemo(()=>filter==='ALL'?projects:projects.filter(p=>p.category===filter),[filter])
  return <section id="work" className="relative bg-[#0c0c0c] px-5 py-24 text-white sm:px-8 sm:py-28 md:px-10 md:py-36"><div className="mx-auto max-w-7xl"><Reveal><div className="section-label"><span>03</span><i/> SELECTED WORK</div><div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="max-w-5xl text-[clamp(4rem,10vw,10rem)] font-black uppercase leading-[.75] tracking-[-.06em]">Built, not<br/><span className="hero-heading">imagined.</span></h2><p className="max-w-sm text-sm leading-relaxed text-white/38">Real projects. Real links. No placeholder case studies.</p></div></Reveal><div className="mt-10 flex flex-wrap gap-2 border-b border-white/10 pb-5">{filters.map(f=><button data-cursor="FILTER" key={f} onClick={()=>setFilter(f)} className={`pill ${filter===f?'bg-white text-black border-white':''}`}>{f}</button>)}</div><div className="mt-10">{filtered.map((p,i)=><WorkCard key={p.n} project={p} index={i} total={filtered.length}/>)}</div></div></section>
}

function AboutSection(){
  return <section id="about" className="perf-section bg-[#111111] px-5 py-24 text-white sm:px-8 sm:py-28 md:px-10 md:py-36"><div className="mx-auto max-w-7xl"><Reveal><div className="section-label"><span>01</span><i/> ABOUT NAMAN</div></Reveal><div className="mt-14 grid gap-12 md:grid-cols-[1.05fr_.95fr] md:gap-20"><Reveal><h2 className="max-w-4xl text-[clamp(4rem,9.5vw,9.5rem)] font-black uppercase leading-[.75] tracking-[-.065em]">I like making<br/><span className="hero-heading">real things.</span></h2></Reveal><div><Reveal delay={.08}><p className="max-w-xl text-lg leading-relaxed text-white/66">I like the moment when an idea stops being a sketch and becomes something you can actually click, use, play with or show someone.</p></Reveal><Reveal delay={.15}><p className="mt-6 max-w-xl text-sm leading-relaxed text-white/38">My projects jump between web development, product interfaces, Android, Minecraft and experiments. The common part is simple: build, learn, break, fix and ship.</p></Reveal><Reveal delay={.22}><div className="mt-10 flex flex-wrap gap-2">{skills.map(skill=><span key={skill} className="pill">{skill}</span>)}</div></Reveal><Reveal delay={.3}><div className="mt-12 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/[.025] p-6"><p className="eyebrow">BIGGEST BUILD</p><p className="mt-3 text-2xl font-semibold uppercase">KAI</p><p className="mt-2 text-xs leading-relaxed text-white/35">AI assistant / product experiment.</p></div><div className="rounded-2xl border border-white/10 bg-white/[.025] p-6"><p className="eyebrow">SIDE QUEST</p><p className="mt-3 text-2xl font-semibold uppercase">NamanOS</p><p className="mt-2 text-xs leading-relaxed text-white/35">An OS made by Naman for Naman.</p></div></div></Reveal></div></div></div></section>
}

function ContactSection(){
  const [copied,setCopied]=useState(false)
  const copy=async()=>{try{await navigator.clipboard.writeText(contact.emailText);setCopied(true);setTimeout(()=>setCopied(false),1300)}catch{}}
  return <section id="contact" className="bg-[#f4f2ee] px-5 py-24 text-[#0c0c0c] sm:px-8 sm:py-28 md:px-10 md:py-36"><div className="mx-auto max-w-7xl"><Reveal><div className="section-kicker section-kicker-dark"><span>04</span><i/> LET'S TALK</div><h2 className="mt-7 max-w-[1100px] text-[clamp(4rem,10vw,10rem)] font-black uppercase leading-[.73] tracking-[-.07em]">Got something<br/><span className="text-black/28">worth building?</span></h2></Reveal><div className="mt-14 grid gap-10 border-t border-black/10 pt-8 md:grid-cols-[1fr_auto] md:items-end"><div><p className="eyebrow !text-black/35">DIRECT LINE</p><a data-cursor="EMAIL" href={contact.email} className="mt-3 block break-all text-[clamp(1.6rem,4vw,3.8rem)] font-semibold tracking-[-.04em] transition-opacity hover:opacity-55">{contact.emailText}</a><div className="mt-6 flex flex-wrap gap-3"><a data-cursor="EMAIL" href={contact.email} className="cta">EMAIL ME <ArrowUpRight size={14}/></a><button data-cursor="COPY" onClick={copy} className="rounded-full border border-black/10 bg-black/[.03] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white">{copied?'COPIED':'COPY EMAIL'}</button></div></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-2">{socialLinks.map(([name,href,Icon])=><a data-cursor={name.toUpperCase()} key={name} href={href} target={href.startsWith('http')?'_blank':undefined} rel={href.startsWith('http')?'noreferrer':undefined} className="flex items-center gap-3 rounded-2xl border border-black/10 px-4 py-3 text-[9px] font-semibold uppercase tracking-[.18em] text-black/70 transition-colors hover:bg-black hover:text-white"><Icon size={15}/>{name}</a>)}</div></div><footer className="mt-16 flex flex-col gap-3 border-t border-black/10 pt-6 text-[9px] uppercase tracking-[.24em] text-black/30 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 NAMAN AGGARWAL</span><span>BUILD / BREAK / FIX / SHIP</span><a data-cursor="TOP" href="#top" className="flex items-center gap-2 hover:text-black">BACK TO TOP <ArrowUpRight size={12}/></a></footer></div></section>
}

function App(){
  const [loading,setLoading]=useState(true),[menu,setMenu]=useState(false)
  useEffect(()=>{const locked=loading||menu;document.body.style.overflow=locked?'hidden':'';document.documentElement.style.overflow=locked?'hidden':'';return()=>{document.body.style.overflow='';document.documentElement.style.overflow=''}},[loading,menu])
  return <><main className="main-wrapper"><HeroSection openMenu={()=>setMenu(true)}/><AboutSection/><BuildSection/><WorkSection/><ContactSection/></main><MobileNav open={menu} setOpen={setMenu}/>{!loading&&<CameraCursor/>}{loading&&<LoadingScreen onEnter={()=>setLoading(false)}/>}</>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
