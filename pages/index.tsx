import Head from 'next/head'
import { useEffect, useRef, useState, useCallback } from 'react'

/* ─── DATA ─────────────────────────────────────────── */
const PROJECTS = [
  {
    id:1, num:'01',
    name:'MINT', full:'Project Management System',
    org:'Ethiopian Ministry of Innovation & Technology',
    desc:'Enterprise-grade project tracking for a government entity. Role-based access control, real-time collaboration, advanced analytics, and a RESTful API — live in production.',
    tags:['Next.js','TypeScript','Node.js','PostgreSQL','Prisma'],
    link:'https://mint-pms.vercel.app',
    accent:'#58a6ff', c1:'#1f6feb', c2:'#bc8cff',
    lang:'TypeScript', langColor:'#3178c6',
    stats:[{l:'Users',v:'Gov Entity'},{l:'Status',v:'Production'},{l:'Type',v:'Enterprise'}],
    images:['/images/MinT-dashboards/gov-pm-admin.jpg','/images/MinT-dashboards/gov-pm-analytics.jpg','/images/MinT-dashboards/gov-pm-budget.jpg','/images/MinT-dashboards/gov-pm-manager.jpg'],
  },
  {
    id:2, num:'02',
    name:'RAS HOTEL', full:'Booking & Management Platform',
    org:'Hotel Management & Reservation System',
    desc:'Full-featured hotel booking platform with room reservations, property dashboard, guest CRM, and inventory tracking. Features a multilingual RAG-based AI chatbot answering guest queries in real time.',
    tags:['React','TypeScript','Node.js','Express','RAG AI'],
    link:'https://ras-hotel-two.vercel.app',
    accent:'#3fb950', c1:'#238636', c2:'#3fb950',
    lang:'React', langColor:'#61dafb',
    stats:[{l:'Status',v:'Production'},{l:'Type',v:'SaaS + AI'},{l:'AI',v:'RAG Chatbot'}],
    images:['/images/RasHotel management-dashboards/Screenshot 2026-06-07 142616.png','/images/RasHotel management-dashboards/Screenshot 2026-06-07 142940.png','/images/RasHotel management-dashboards/Screenshot 2026-06-07 143132.png','/images/RasHotel management-dashboards/Screenshot 2026-06-07 143322.png','/images/RasHotel management-dashboards/Screenshot 2026-06-07 143420.png','/images/RasHotel management-dashboards/Screenshot 2026-06-07 143723.png'],
  },
  {
    id:3, num:'03',
    name:'HU FRESHMAN', full:'Academic Learning Platform',
    org:'Haramaya University — PWA',
    desc:'Progressive Web App serving 1000+ active students. Course modules, past exam repository (2013–2017), AI-powered study assistant, and real-time mock exams. Offline-capable, mobile-first.',
    tags:['PWA','React','Node.js','AI','Offline'],
    link:'https://hu-freshman.vercel.app',
    accent:'#d29922', c1:'#bb8009', c2:'#f78166',
    lang:'JavaScript', langColor:'#f1e05a',
    stats:[{l:'Users',v:'1000+ Students'},{l:'Status',v:'Production'},{l:'Type',v:'PWA + AI'}],
    images:['/images/FreshApp-dashboards/admin panael.jpg','/images/FreshApp-dashboards/course-section.jpg','/images/FreshApp-dashboards/exam-section.jpg','/images/FreshApp-dashboards/gpa-calculator.jpg'],
  },
  {
    id:4, num:'04',
    name:'SHOP-VERSE', full:'E-Commerce Platform',
    org:'Full Stack E-Commerce Solution',
    desc:'Complete production e-commerce with Stripe payment processing, comprehensive admin dashboard, real-time inventory management, and responsive UI/UX built for scale.',
    tags:['React','TypeScript','Node.js','Stripe'],
    link:'https://shop-verse-brown.vercel.app',
    accent:'#bc8cff', c1:'#8957e5', c2:'#bc8cff',
    lang:'TypeScript', langColor:'#3178c6',
    stats:[{l:'Payments',v:'Stripe'},{l:'Status',v:'Production'},{l:'Type',v:'E-Commerce'}],
    images:['/images/ShopVerse-dashboards/home-products.jpg','/images/ShopVerse-dashboards/shoping-cart.jpg','/images/ShopVerse-dashboards/payment-method.jpg','/images/ShopVerse-dashboards/order-placed.jpg','/images/ShopVerse-dashboards/admin-dashboard.jpg'],
  },
  {
    id:5, num:'05',
    name:'HU CONNECT', full:'Community Q&A Platform',
    org:'University Community Platform',
    desc:'2000+ active members, 5000+ quality answers, 90% question coverage, 2h avg response time. Peer-to-peer Q&A with reputation ranking and real-time notifications.',
    tags:['React','TypeScript','Node.js','Real-time'],
    link:'https://hu-connect.vercel.app',
    accent:'#3fb950', c1:'#1f6feb', c2:'#3fb950',
    lang:'TypeScript', langColor:'#3178c6',
    stats:[{l:'Members',v:'2000+'},{l:'Answers',v:'5000+'},{l:'Coverage',v:'90%'}],
    images:['/images/HuConnect-dashboards/admin-dashboard.jpg','/images/HuConnect-dashboards/profile-analytics.jpg','/images/HuConnect-dashboards/question-answer.jpg','/images/HuConnect-dashboards/tag-managment.jpg'],
  },
]

const SKILLS = [
  {name:'Next.js / React',pct:95,color:'#58a6ff'},
  {name:'Node.js / Express',pct:92,color:'#3fb950'},
  {name:'TypeScript',pct:90,color:'#3178c6'},
  {name:'PostgreSQL / MySQL',pct:85,color:'#bc8cff'},
  {name:'System Design',pct:82,color:'#d29922'},
  {name:'DevOps / CI-CD',pct:75,color:'#f78166'},
]

const TECH = ['React','Next.js','TypeScript','Node.js','Express','PostgreSQL','MySQL','Prisma','Redis','Tailwind','Stripe','JWT','Docker','Vercel','AWS S3','REST APIs','GraphQL','PWA']

const ACTIVITY = [
  {icon:'🚀',text:<><strong>Deployed</strong> <code>mint-pms.vercel.app</code> — Gov PM System</>,time:'2d ago'},
  {icon:'✅',text:<><strong>Merged PR</strong> #47 — Real-time analytics</>,time:'4d ago'},
  {icon:'⭐',text:<><strong>Shipped</strong> <code>hu-connect</code> — 2000+ users</>,time:'1w ago'},
  {icon:'🔧',text:<><strong>Integrated</strong> Stripe in <code>shop-verse</code></>,time:'2w ago'},
  {icon:'📦',text:<><strong>Published</strong> AI assistant for <code>hu-freshman</code></>,time:'3w ago'},
]

function genContribs() {
  const cols: number[][] = []
  for (let c = 0; c < 52; c++) {
    const col: number[] = []
    for (let r = 0; r < 7; r++) {
      const b = Math.random()
      col.push(b < .5 ? 0 : b < .7 ? 1 : b < .85 ? 2 : b < .95 ? 3 : 4)
    }
    cols.push(col)
  }
  return cols
}
const CONTRIBS = genContribs()
const CONTRIB_C = ['#161b22','#0e4429','#006d32','#26a641','#39d353']
const NAV = ['hero','work','expertise','about','contact']

/* ─── COMPONENT ────────────────────────────────────── */
export default function Home() {
  const [active,  setActive]  = useState('hero')
  const [menu,    setMenu]    = useState(false)
  const [toast,   setToast]   = useState(false)
  const [imgIdx,  setImgIdx]  = useState<Record<number,number>>({})
  const [fills,   setFills]   = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const bar = document.getElementById('pgbar')
    const fn = () => {
      const max = document.body.scrollHeight - window.innerHeight
      if (bar && max > 0) bar.style.width = (window.scrollY / max * 100) + '%'
      let cur = 'hero'
      NAV.forEach(id => { const el = document.getElementById(id); if (el && window.scrollY >= el.offsetTop - 140) cur = id })
      setActive(cur)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } }),
      { threshold: 0.07 }
    )
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))
    const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { setFills(true); so.disconnect() } }), { threshold: .3 })
    const exp = document.getElementById('expertise')
    if (exp) so.observe(exp)
    return () => { obs.disconnect(); so.disconnect() }
  }, [])

  useEffect(() => {
    const c = document.getElementById('cur'), r = document.getElementById('cur-r')
    if (!c || !r) return
    let rx=0,ry=0,mx=0,my=0,id=0
    const mv = (e:MouseEvent) => { mx=e.clientX; my=e.clientY; c.style.left=mx+'px'; c.style.top=my+'px' }
    const tick = () => { rx+=(mx-rx)*.14; ry+=(my-ry)*.14; r.style.left=rx+'px'; r.style.top=ry+'px'; id=requestAnimationFrame(tick) }
    window.addEventListener('mousemove', mv)
    id = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', mv); cancelAnimationFrame(id) }
  }, [])

  useEffect(() => {
    const iv = setInterval(() => {
      setImgIdx(prev => { const n={...prev}; PROJECTS.forEach(p => { n[p.id]=((prev[p.id]??0)+1)%p.images.length }); return n })
    }, 3500)
    return () => clearInterval(iv)
  }, [])

  const go = useCallback((id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    const d = new FormData(formRef.current)
    if (!(d.get('name') as string)?.trim() || !(d.get('email') as string)?.trim() || !(d.get('msg') as string)?.trim()) return
    setToast(true); formRef.current.reset()
    setTimeout(() => setToast(false), 4000)
  }

  return (
    <>
      <Head>
        <title>Barekegn Asefa — Full-Stack Engineer</title>
        <meta name="description" content="Full-stack MERN developer available for remote freelance work. 5 production apps. Contra, Wellfound, Fiverr. Addis Ababa, Ethiopia." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👨‍💻</text></svg>" />
      </Head>

      <div id="cur" aria-hidden /><div id="cur-r" aria-hidden />
      <div id="pgbar" aria-hidden />

      {/* Mobile menu */}
      <div className={`m-menu${menu ? ' open' : ''}`}>
        <button className="m-menu-close" onClick={() => setMenu(false)}>✕</button>
        {NAV.map(s => <button key={s} className="m-tab" onClick={() => go(s)}>{s === 'hero' ? 'Home' : s.charAt(0).toUpperCase() + s.slice(1)}</button>)}
        <a href="/Barekegn Asefa Professional CV Resume.pdf" download className="m-tab m-tab-cv" onClick={() => setMenu(false)}>
          ↓ Download CV
        </a>
      </div>

      {/* Nav */}
      <nav>
        <div className="nav-wrap">
          <button className="nav-logo" onClick={() => go('hero')}><span className="nav-logo-dot" />barekegnn</button>
          <div className="nav-tabs">
            {NAV.map(s => (
              <button key={s} className={`nav-tab${active===s?' active':''}`} onClick={() => go(s)}>
                {s === 'hero' ? 'Overview' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <div className="nav-right">
            <a href="/Barekegn Asefa Professional CV Resume.pdf" download className="nav-btn">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M7.47 10.78a.75.75 0 0 0 1.06 0l3.75-3.75a.75.75 0 0 0-1.06-1.06L8.75 8.44V1.75a.75.75 0 0 0-1.5 0v6.69L4.78 5.97a.75.75 0 0 0-1.06 1.06l3.75 3.75ZM3.75 13a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z"/></svg>
              CV
            </a>
            <button className="nav-btn nav-btn-primary" onClick={() => go('contact')}>Hire me →</button>
            <button className="nav-burger" onClick={() => setMenu(true)} aria-label="Open menu">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* ═══════ HERO ═══════ */}
        <section id="hero">
          <div className="wrap">
            <div className="hero-grid">

              {/* Left */}
              <div className="hero-left">
                <div className="hero-avatar">
                  <img src="/profile.png" alt="Barekegn Asefa"
                    onError={e => { e.currentTarget.style.display='none'; const fb=e.currentTarget.nextSibling as HTMLElement; if(fb) fb.style.display='flex' }}
                  />
                  <span className="avatar-initials" style={{display:'none'}}>BA</span>
                </div>
                <div className="hero-name">Barekegn Asefa</div>
                <div className="hero-handle">@barekegnn</div>
                <div className="hero-status"><span className="status-dot" />Available for freelance &amp; remote</div>
                <p className="hero-bio-left">Full-stack developer building production-grade apps that solve real problems.</p>
                <div className="hero-meta">
                  {[
                    {icon:'📍',text:'Addis Ababa, Ethiopia'},
                    {icon:'✉️',text:'barekegna@gmail.com'},
                    {icon:'📞',text:'+251 979 732 741'},
                    {icon:'🌐',text:'Open to remote worldwide'},
                  ].map((r,i) => <div key={i} className="hero-meta-row"><span>{r.icon}</span>{r.text}</div>)}
                </div>
                <div className="hero-socials">
                  <a href="https://github.com/barekegnn" target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/barekegn-asefa-346b46247" target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href="mailto:barekegna@gmail.com" className="social-btn" title="Email">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88l6.5-3.81Z"/></svg>
                  </a>
                </div>
              </div>

              {/* Right */}
              <div className="hero-right">
                <div className="rv">
                  <div className="hero-eyebrow">// full-stack engineer · available for remote work</div>
                  <h1 className="hero-title">
                    I build things that<br />
                    <span className="hero-title-gradient">actually ship.</span>
                  </h1>
                  <p className="hero-subtitle">
                    MERN specialist with <strong>3+ years</strong> shipping production systems — from{' '}
                    <strong>government platforms</strong> to <strong>university apps</strong> serving thousands.
                    Available for <span className="hl">remote freelance work</span> on Contra, Wellfound, Fiverr, and direct contracts.
                  </p>
                </div>

                {/* Contribution graph */}
                <div className="contrib-graph rv rv1">
                  <div className="contrib-top">
                    <span className="contrib-top-text">530 contributions last year · 385 in 2026</span>
                    <a href="https://github.com/barekegnn" target="_blank" rel="noopener noreferrer" className="contrib-top-link">github.com/barekegnn</a>
                  </div>
                  <div className="contrib-scroll">
                    <div className="contrib-grid">
                      {CONTRIBS.map((col,ci) => (
                        <div key={ci} className="contrib-col">
                          {col.map((v,ri) => <div key={ri} className="contrib-cell" style={{background:CONTRIB_C[v]}} />)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="contrib-legend">
                    <span>Less</span>
                    {CONTRIB_C.map((c,i) => <span key={i} className="contrib-legend-cell" style={{background:c}} />)}
                    <span>More</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="stats-row rv rv1">
                  {[
                    {n:'5+',l:'Live Apps',    c:'#58a6ff',e:'🚀'},
                    {n:'3K+',l:'Users',       c:'#3fb950',e:'👥'},
                    {n:'35', l:'Repos',       c:'#d29922',e:'📦'},
                    {n:'100',l:'Stars',       c:'#bc8cff',e:'⭐'},
                  ].map(s => (
                    <div key={s.l} className="stat-card" style={{borderColor:'transparent'}}
                      onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor=s.c}
                      onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor='transparent'}>
                      <div className="stat-emoji">{s.e}</div>
                      <div className="stat-num" style={{color:s.c}}>{s.n}</div>
                      <div className="stat-lbl">{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* Featured projects */}
                <div className="rv rv2">
                  <div className="feat-label">// featured projects</div>
                  <div className="feat-grid">
                    {PROJECTS.slice(0,4).map(p => (
                      <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer" className="repo-card"
                        style={{'--c1':p.c1,'--c2':p.c2, background:`linear-gradient(160deg,var(--bg-2),var(--bg-2))`} as React.CSSProperties}>
                        <div className="repo-thumb">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.images[0]} alt={p.name} />
                          <div className="repo-thumb-overlay" style={{background:`linear-gradient(135deg,${p.c1}55,transparent)`}} />
                        </div>
                        <div className="repo-name" style={{color:p.accent}}>
                          <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8V1.5Z"/></svg>
                          {p.name.toLowerCase().replace(' ','-')}
                        </div>
                        <div className="repo-desc">{p.full}</div>
                        <div className="repo-footer">
                          <div className="repo-lang"><span className="lang-dot" style={{background:p.langColor}} />{p.lang}</div>
                          <div className="repo-live" style={{color:p.accent}}>live ↗</div>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="feat-more">
                    <button className="feat-more-btn" onClick={() => go('work')}>View all 5 projects →</button>
                  </div>
                </div>

                {/* CTA */}
                <div className="cta-row rv rv3">
                  <button className="nav-btn nav-btn-primary" onClick={() => go('contact')}>Hire me for your project</button>
                  <button className="nav-btn" onClick={() => go('work')}>View my work</button>
                  <a href="/Barekegn Asefa Professional CV Resume.pdf" download className="nav-btn">Download CV</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ═══════ PROJECTS ═══════ */}
        <section id="work">
          <div className="wrap">
            <div className="sec-header rv">
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <span className="sec-title">Projects</span>
                <span className="sec-count">5 production apps</span>
              </div>
              <button className="sec-link" onClick={() => go('contact')}>View all ↗</button>
            </div>

            {PROJECTS.map((p,i) => {
              const cur = imgIdx[p.id] ?? 0
              return (
                <div key={p.id} className="project-item rv">
                  <div className={`project-card${i%2!==0?' flip':''}`}>
                    {/* Screenshot */}
                    <div className="proj-shots">
                      <div className="shot-bg" style={{background:`linear-gradient(135deg,#0d1117,${p.c1}22)`}} />
                      <div className="shot-chrome">
                        <span className="chrome-dot" style={{background:'#ff5f57'}} />
                        <span className="chrome-dot" style={{background:'#febc2e'}} />
                        <span className="chrome-dot" style={{background:'#28c840'}} />
                        <div className="chrome-bar">{p.link.replace('https://','')}</div>
                      </div>
                      {p.images.map((src,di) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={di} src={src} alt={`${p.name} ${di+1}`}
                          className={`shot${di===cur?' on':''}`} style={{top:26,height:'calc(100% - 26px)'}} />
                      ))}
                      <div className="shot-overlay" />
                      <div className="proj-label">{p.name}</div>
                      <div className="shot-strip">
                        {p.images.map((_,di) => (
                          <div key={di} className="strip-thumb" onClick={() => setImgIdx(prev=>({...prev,[p.id]:di}))}>
                            <div className="strip-fill" style={{width:di===cur?'100%':'0',background:p.accent}} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="proj-info" style={{borderTop:`2px solid ${p.accent}`}}>
                      <div className="proj-num" style={{color:p.accent}}>{p.num} / 05</div>
                      <div className="proj-org">{p.org}</div>
                      <div className="proj-name">{p.name}</div>
                      <div className="proj-full">{p.full}</div>
                      <p className="proj-desc">{p.desc}</p>
                      <div className="proj-tags">
                        {p.tags.map(t => <span key={t} className="ptag">{t}</span>)}
                      </div>
                      <div className="proj-stats">
                        {p.stats.map(s => (
                          <div key={s.l} className="pstat">
                            <span className="pstat-dot" style={{background:p.accent}} />
                            <span style={{color:'var(--text-3)'}}>{s.l}:</span>
                            <span style={{color:'var(--text-2)'}}>{s.v}</span>
                          </div>
                        ))}
                      </div>
                      <div className="proj-actions">
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-link proj-link-primary">
                          <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"/></svg>
                          Live Demo
                        </a>
                        <a href="https://github.com/barekegnn" target="_blank" rel="noopener noreferrer" className="proj-link">
                          <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>
                          Source
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <hr className="divider" />

        {/* ═══════ EXPERTISE ═══════ */}
        <section id="expertise">
          <div className="wrap">
            <div className="sec-header rv"><span className="sec-title">Expertise</span></div>
            <div className="exp-grid">
              <div className="exp-card rv">
                <div className="exp-card-hd"><div className="exp-icon">📊</div><div><div className="exp-title">Proficiency</div><div className="exp-sub">skill breakdown</div></div></div>
                <div className="skill-list">
                  {SKILLS.map(s => (
                    <div key={s.name} className="skill-row">
                      <div className="skill-top"><span className="skill-name">{s.name}</span><span className="skill-pct">{s.pct}%</span></div>
                      <div className="skill-bar"><div className="skill-fill" style={{width:fills?s.pct+'%':'0%',background:s.color}} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="exp-card rv rv1">
                <div className="exp-card-hd"><div className="exp-icon">⚡</div><div><div className="exp-title">Tech Stack</div><div className="exp-sub">tools &amp; frameworks</div></div></div>
                <div className="tech-pills">{TECH.map(t => <span key={t} className="tpill">{t}</span>)}</div>
                <div style={{marginTop:14,paddingTop:12,borderTop:'1px solid var(--border)'}}>
                  <div style={{fontSize:11,color:'var(--text-3)',fontFamily:'var(--mono)',marginBottom:8}}>// recent activity</div>
                  <div className="act-list">
                    {ACTIVITY.slice(0,3).map((a,i) => (
                      <div key={i} className="act-item">
                        <div className="act-icon">{a.icon}</div>
                        <div><div className="act-text">{a.text}</div><div className="act-time">{a.time}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="exp-card rv rv2">
                <div className="exp-card-hd"><div className="exp-icon">🏆</div><div><div className="exp-title">Achievements</div><div className="exp-sub">milestones</div></div></div>
                <div className="ach-list">
                  {[
                    {n:'5+',l:'Production Apps',c:'#58a6ff',e:'🚀'},
                    {n:'3K+',l:'Active Users',c:'#3fb950',e:'👥'},
                    {n:'3+',l:'Years Experience',c:'#d29922',e:'📅'},
                    {n:'2',l:'Enterprise Clients',c:'#bc8cff',e:'🏢'},
                    {n:'100%',l:'TypeScript First',c:'#3178c6',e:'📘'},
                    {n:'90%',l:'Q&A Coverage',c:'#f78166',e:'✅'},
                  ].map(s => (
                    <div key={s.l} className="ach-item">
                      <div className="ach-icon">{s.e}</div>
                      <div><div className="ach-num" style={{color:s.c}}>{s.n}</div><div className="ach-lbl">{s.l}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ═══════ ABOUT ═══════ */}
        <section id="about">
          <div className="wrap">
            <div className="sec-header rv"><span className="sec-title">About</span></div>
            <div className="about-grid">
              <div className="readme-card rv">
                <div className="readme-bar">
                  <div style={{display:'flex',gap:5}}>
                    <div className="rm-dot" style={{background:'#ff5f57'}} />
                    <div className="rm-dot" style={{background:'#febc2e'}} />
                    <div className="rm-dot" style={{background:'#28c840'}} />
                  </div>
                  <span className="rm-title">README.md</span>
                </div>
                <div className="readme-body">
                  <div className="rm-h1">👋 Hi, I&apos;m Barekegn Asefa</div>
                  <div className="rm-badges">
                    {[
                      {t:'Full-Stack Dev',c:'#58a6ff',bg:'rgba(88,166,255,.15)',b:'rgba(88,166,255,.3)'},
                      {t:'Open for Hire', c:'#3fb950',bg:'rgba(63,185,80,.15)', b:'rgba(63,185,80,.3)'},
                      {t:'Remote Worldwide',c:'#d29922',bg:'rgba(210,153,34,.15)',b:'rgba(210,153,34,.3)'},
                      {t:'TypeScript First',c:'#bc8cff',bg:'rgba(188,140,255,.15)',b:'rgba(188,140,255,.3)'},
                    ].map(b => <span key={b.t} className="badge" style={{color:b.c,background:b.bg,border:`1px solid ${b.b}`}}>{b.t}</span>)}
                  </div>
                  <p className="rm-p">Full-stack developer building <strong>production-grade apps</strong> for <strong>government entities</strong> and <strong>educational institutions</strong>. Currently pursuing <strong>BSc Software Engineering at Haramaya University (2022–2026)</strong>, with MERN training from <strong>Evangadi Tech</strong>.</p>

                  <div className="rm-h2">🚀 What I&apos;m working on</div>
                  <ul className="rm-ul">
                    <li>Available on <strong>Contra</strong>, <strong>Wellfound</strong>, <strong>Fiverr</strong> &amp; direct contracts</li>
                    <li>Maintaining MINT — live government PM system</li>
                    <li>Studying AI Automation &amp; System Architecture</li>
                    <li>Completing BSc Software Engineering</li>
                  </ul>

                  <div className="rm-h2">🛠 Stack at a glance</div>
                  <div className="rm-code">
                    <pre><span className="rc-c">{'// barekegn.config.ts'}</span>{'\n'}<span className="rc-k">export const</span>{' stack = {\n  '}<span className="rc-k">frontend</span>{': ['}<span className="rc-s">{'\'Next.js\''}</span>{', '}<span className="rc-s">{'\'React\''}</span>{', '}<span className="rc-s">{'\'TypeScript\''}</span>{']\n  '}<span className="rc-k">backend</span>{':  ['}<span className="rc-s">{'\'Node.js\''}</span>{', '}<span className="rc-s">{'\'Express\''}</span>{'],\n  '}<span className="rc-k">database</span>{': ['}<span className="rc-s">{'\'PostgreSQL\''}</span>{', '}<span className="rc-s">{'\'MySQL\''}</span>{'],\n  '}<span className="rc-k">available</span>{': '}<span className="rc-b">true</span>{',\n  '}<span className="rc-k">remote</span>{'   : '}<span className="rc-b">true</span>{',\n  '}<span className="rc-k">platforms</span>{': ['}<span className="rc-s">{'\'Contra\''}</span>{', '}<span className="rc-s">{'\'Wellfound\''}</span>{', '}<span className="rc-s">{'\'Fiverr\''}</span>{']\n}'}</pre>
                  </div>

                  <div className="rm-h2">📐 Philosophy</div>
                  <div className="rm-quote"><p>&ldquo;Building scalable solutions that make a real difference. Quality is a fundamental constraint — not an afterthought.&rdquo;</p></div>

                  <div className="rm-h2">⚡ Career</div>
                  <div className="career-list">
                    {[
                      {role:'Full-Stack MERN Developer',co:'Freelance / Remote',yr:'2023 — Present',dot:'#3fb950'},
                      {role:'Web Developer & Consultant',co:'Ethiopian Market',yr:'2022 — 2023',dot:'#d29922'},
                      {role:'Self-Taught Journey',co:'Learning & Building',yr:'2021 — 2022',dot:'var(--bg-4)'},
                    ].map((t,i) => (
                      <div key={i} className="career-item">
                        <div className="career-dot-col">
                          <div className="career-dot" style={{background:t.dot,boxShadow:`0 0 5px ${t.dot}`}} />
                          {i < 2 && <div className="career-line" />}
                        </div>
                        <div><div className="career-role">{t.role}</div><div className="career-co">{t.co}</div><div className="career-yr">{t.yr}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="about-sidebar">
                <div className="sb-card rv">
                  <div className="sb-title">Languages</div>
                  {[{l:'TypeScript',p:48,c:'#3178c6'},{l:'JavaScript',p:28,c:'#f1e05a'},{l:'CSS',p:14,c:'#563d7c'},{l:'HTML',p:10,c:'#e34c26'}].map(s => (
                    <div key={s.l} className="lsr">
                      <div className="lsr-dot" style={{background:s.c}} />
                      <span className="lsr-name">{s.l}</span>
                      <div className="lsr-bar"><div className="lsr-fill" style={{width:s.p+'%',background:s.c}} /></div>
                      <span className="lsr-pct">{s.p}%</span>
                    </div>
                  ))}
                </div>
                <div className="sb-card rv rv1">
                  <div className="sb-title">GitHub Stats</div>
                  <div className="streak-box"><div className="streak-num">530</div><div className="streak-lbl">contributions · last year</div></div>
                  <div className="streak-row">
                    {[['35','Repos'],['100','Stars'],['385','2026']].map(([n,l]) => (
                      <div key={l} className="streak-stat"><div className="streak-stat-n">{n}</div><div className="streak-stat-l">{l}</div></div>
                    ))}
                  </div>
                </div>
                <div className="sb-card rv rv2">
                  <div className="sb-title">Education</div>
                  <div className="edu-list">
                    {[{t:'BSc Software Eng.',i:'Haramaya University',y:'2022–2026',e:'🎓'},{t:'MERN Stack Dev',i:'Evangadi Tech',y:'2022–2023',e:'⚡'},{t:'AI Automation',i:'Self-Study',y:'2024–Present',e:'🤖'}].map(e => (
                      <div key={e.t} className="edu-item">
                        <div className="edu-icon-box">{e.e}</div>
                        <div><div className="edu-title">{e.t}</div><div className="edu-inst">{e.i}</div><div className="edu-yr">{e.y}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sb-card rv rv3">
                  <div className="sb-title">Interests</div>
                  <div className="int-list">
                    {[['📚','Reading','Tech & business'],['🏃','Fitness','Mental clarity'],['🤖','AI & Innovation','Emerging tech'],['🌍','Social Impact','Tech for real problems']].map(([e,t,s]) => (
                      <div key={t} className="int-item"><span className="int-emoji">{e}</span><div><div className="int-label">{t}</div><div className="int-sub">{s}</div></div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ═══════ CONTACT ═══════ */}
        <section id="contact">
          <div className="wrap">
            <div className="sec-header rv"><span className="sec-title">Contact</span></div>
            <div className="contact-grid">
              <div className="rv">
                <h2 className="contact-heading">Let&apos;s build something <span>exceptional</span>.</h2>
                <p className="contact-sub">
                  Available on <strong>Contra</strong>, <strong>Wellfound</strong>, <strong>Fiverr</strong> and direct contracts — including local Ethiopian organizations.
                </p>
                <form ref={formRef} onSubmit={submit} noValidate>
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label" htmlFor="c-name">name</label>
                      <input id="c-name" name="name" className="form-input" type="text" placeholder="Jane Doe" required />
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="c-email">email</label>
                      <input id="c-email" name="email" className="form-input" type="email" placeholder="jane@company.com" required />
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="c-sub">subject</label>
                    <input id="c-sub" name="subject" className="form-input" type="text" placeholder="Project Inquiry" />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="c-msg">message</label>
                    <textarea id="c-msg" name="msg" className="form-ta" placeholder="Tell me about your project..." required />
                  </div>
                  <button type="submit" className="nav-btn nav-btn-primary" style={{padding:'9px 20px',fontSize:13}}>Send message →</button>
                </form>
              </div>

              <div className="contact-right-col rv rv2">
                <div className="csb-card">
                  <div className="csb-hd">// contact.json</div>
                  <div className="csb-body">
                    <div className="csb-row"><div className="csb-lbl">email</div><div className="csb-val"><a href="mailto:barekegna@gmail.com">barekegna@gmail.com</a></div></div>
                    <div className="csb-row"><div className="csb-lbl">phone</div><div className="csb-val"><a href="tel:+251979732741">+251 979 732 741</a></div></div>
                    <div className="csb-row"><div className="csb-lbl">location</div><div className="csb-val">Addis Ababa, Ethiopia<small>Remote worldwide · Contra · Wellfound · Fiverr</small></div></div>
                    <div className="csb-row"><div className="csb-lbl">status</div><div className="csb-val"><span className="online-dot" />Accepting new clients</div></div>
                    <div className="csb-row">
                      <div className="csb-lbl">links</div>
                      <div className="clinks">
                        {[['GitHub','https://github.com/barekegnn'],['LinkedIn','https://www.linkedin.com/in/barekegn-asefa-346b46247'],['Email','mailto:barekegna@gmail.com'],['Phone','tel:+251979732741']].map(([n,h]) => (
                          <a key={n} href={h} target={h.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" className="clink">
                            {n}<span className="clink-arr">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <button className="footer-logo" onClick={() => go('hero')}>barekegnn</button>
          <div className="footer-links">
            <a href="https://github.com/barekegnn" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/barekegn-asefa-346b46247" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:barekegna@gmail.com">Email</a>
          </div>
          <span className="footer-copy">© 2025 Barekegn Asefa</span>
        </div>
      </footer>

      <div className={`toast${toast?' show':''}`} role="status" aria-live="polite">
        <span className="toast-ico">✓</span> Message sent! I&apos;ll get back to you soon.
      </div>
    </>
  )
}
