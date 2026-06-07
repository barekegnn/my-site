import Head from 'next/head'
import { useEffect, useRef, useState, useCallback } from 'react'

/* ═══════════════════════════════ DATA ═══════════════════════════════ */

const PROJECTS = [
  {
    id: 1, num: '01',
    name: 'MINT',
    full: 'Project Management System',
    org: 'Ethiopian Ministry of Innovation & Technology',
    desc: 'Enterprise-grade project tracking for a government entity. Role-based access control, real-time collaboration, advanced analytics, and a RESTful API — live in production.',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'],
    link: 'https://mint-pms.vercel.app',
    accent: '#58a6ff', c1: '#1f6feb', c2: '#bc8cff',
    lang: 'TypeScript', langColor: '#3178c6',
    stats: [{ l:'Users', v:'Gov Entity' }, { l:'Status', v:'Production' }, { l:'Type', v:'Enterprise' }],
    images: [
      '/images/MinT-dashboards/gov-pm-admin.jpg',
      '/images/MinT-dashboards/gov-pm-analytics.jpg',
      '/images/MinT-dashboards/gov-pm-budget.jpg',
      '/images/MinT-dashboards/gov-pm-manager.jpg',
    ],
  },
  {
    id: 2, num: '02',
    name: 'RAS HOTEL',
    full: 'Booking & Management Platform',
    org: 'Hotel Management & Reservation System',
    desc: 'Full-featured hotel booking and management platform with seamless room reservations, property dashboard, guest CRM, and inventory tracking. Features a multilingual RAG-based AI chatbot that answers guest queries in real time using hotel-specific knowledge.',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'RAG AI'],
    link: 'https://ras-hotel-two.vercel.app',
    accent: '#3fb950', c1: '#238636', c2: '#3fb950',
    lang: 'React', langColor: '#61dafb',
    stats: [{ l:'Status', v:'Production' }, { l:'Type', v:'SaaS + AI' }, { l:'AI', v:'RAG Chatbot' }],
    images: [
      '/images/RasHotel management-dashboards/Screenshot 2026-06-07 142616.png',
      '/images/RasHotel management-dashboards/Screenshot 2026-06-07 142940.png',
      '/images/RasHotel management-dashboards/Screenshot 2026-06-07 143132.png',
      '/images/RasHotel management-dashboards/Screenshot 2026-06-07 143322.png',
      '/images/RasHotel management-dashboards/Screenshot 2026-06-07 143420.png',
      '/images/RasHotel management-dashboards/Screenshot 2026-06-07 143723.png',
    ],
  },
  {
    id: 3, num: '03',
    name: 'HU FRESHMAN',
    full: 'Academic Learning Platform',
    org: 'Haramaya University — PWA',
    desc: 'Progressive Web App serving 1000+ active students. Course modules, past exam repository (2013–2017), AI-powered study assistant, and real-time mock exams. Offline-capable.',
    tags: ['PWA', 'React', 'Node.js', 'AI'],
    link: 'https://hu-freshman.vercel.app',
    accent: '#d29922', c1: '#bb8009', c2: '#f78166',
    lang: 'JavaScript', langColor: '#f1e05a',
    stats: [{ l:'Users', v:'1000+ Students' }, { l:'Status', v:'Production' }, { l:'Type', v:'PWA + AI' }],
    images: [
      '/images/FreshApp-dashboards/admin panael.jpg',
      '/images/FreshApp-dashboards/course-section.jpg',
      '/images/FreshApp-dashboards/exam-section.jpg',
      '/images/FreshApp-dashboards/gpa-calculator.jpg',
    ],
  },
  {
    id: 4, num: '04',
    name: 'SHOP-VERSE',
    full: 'E-Commerce Platform',
    org: 'Full Stack E-Commerce Solution',
    desc: 'Complete production e-commerce with Stripe payment processing, comprehensive admin dashboard, real-time inventory management, and responsive UI/UX built for scale.',
    tags: ['React', 'TypeScript', 'Node.js', 'Stripe'],
    link: 'https://shop-verse-brown.vercel.app',
    accent: '#bc8cff', c1: '#8957e5', c2: '#bc8cff',
    lang: 'TypeScript', langColor: '#3178c6',
    stats: [{ l:'Payments', v:'Stripe' }, { l:'Status', v:'Production' }, { l:'Type', v:'E-Commerce' }],
    images: [
      '/images/ShopVerse-dashboards/home-products.jpg',
      '/images/ShopVerse-dashboards/shoping-cart.jpg',
      '/images/ShopVerse-dashboards/payment-method.jpg',
      '/images/ShopVerse-dashboards/order-placed.jpg',
      '/images/ShopVerse-dashboards/admin-dashboard.jpg',
    ],
  },
  {
    id: 5, num: '05',
    name: 'HU CONNECT',
    full: 'Community Q&A Platform',
    org: 'University Community Platform',
    desc: '2000+ active members, 5000+ quality answers, 90% question coverage, 2h avg response time. Peer-to-peer Q&A with reputation ranking and real-time notifications.',
    tags: ['React', 'TypeScript', 'Node.js', 'Real-time'],
    link: 'https://hu-connect.vercel.app',
    accent: '#3fb950', c1: '#1f6feb', c2: '#3fb950',
    lang: 'TypeScript', langColor: '#3178c6',
    stats: [{ l:'Members', v:'2000+' }, { l:'Answers', v:'5000+' }, { l:'Coverage', v:'90%' }],
    images: [
      '/images/HuConnect-dashboards/admin-dashboard.jpg',
      '/images/HuConnect-dashboards/profile-analytics.jpg',
      '/images/HuConnect-dashboards/question-answer.jpg',
      '/images/HuConnect-dashboards/tag-managment.jpg',
    ],
  },
]

const SKILLS = [
  { name: 'Next.js / React', pct: 95, color: '#58a6ff' },
  { name: 'Node.js / Express', pct: 92, color: '#3fb950' },
  { name: 'TypeScript', pct: 90, color: '#3178c6' },
  { name: 'PostgreSQL / MySQL', pct: 85, color: '#bc8cff' },
  { name: 'System Design', pct: 82, color: '#d29922' },
  { name: 'DevOps / CI-CD', pct: 75, color: '#f78166' },
]

const TECH_ALL = ['React','Next.js','TypeScript','Node.js','Express','PostgreSQL','MySQL','Prisma','Redis','Tailwind','Stripe','JWT','Docker','Vercel','AWS S3','REST APIs','GraphQL','PWA']

const ACTIVITY = [
  { icon: '🚀', text: <><strong>Deployed</strong> <code>mint-pms.vercel.app</code> — Gov PM System</>, time: '2d ago' },
  { icon: '✅', text: <><strong>Merged PR</strong> #47 — Real-time analytics dashboard</>, time: '4d ago' },
  { icon: '⭐', text: <><strong>Shipped</strong> <code>hu-connect</code> — 2000+ users milestone</>, time: '1w ago' },
  { icon: '🔧', text: <><strong>Integrated</strong> Stripe payments in <code>shop-verse</code></>, time: '2w ago' },
  { icon: '📦', text: <><strong>Published</strong> AI study assistant for <code>hu-freshman</code></>, time: '3w ago' },
]

// Generate a plausible contribution graph
function genContribs() {
  const cols: number[][] = []
  for (let c = 0; c < 52; c++) {
    const col: number[] = []
    for (let r = 0; r < 7; r++) {
      const base = Math.random()
      col.push(base < 0.5 ? 0 : base < 0.7 ? 1 : base < 0.85 ? 2 : base < 0.95 ? 3 : 4)
    }
    cols.push(col)
  }
  return cols
}
const CONTRIBS = genContribs()
const CONTRIB_COLORS = ['#161b22','#0e4429','#006d32','#26a641','#39d353']

const NAV = ['hero', 'work', 'expertise', 'about', 'contact']

/* ════════════════════════════════════════════════════════════════════ */

export default function Home() {
  const [active, setActive]   = useState('hero')
  const [menu, setMenu]       = useState(false)
  const [toast, setToast]     = useState(false)
  const [imgIdx, setImgIdx]   = useState<Record<number,number>>({})
  const [fills, setFills]     = useState(false)
  const formRef               = useRef<HTMLFormElement>(null)


  // Scroll handling
  useEffect(() => {
    const bar = document.getElementById('pgbar')
    const handle = () => {
      const max = document.body.scrollHeight - window.innerHeight
      if (bar && max > 0) bar.style.width = (window.scrollY / max * 100) + '%'
      let cur = 'hero'
      NAV.forEach(id => { const el = document.getElementById(id); if (el && window.scrollY >= el.offsetTop - 140) cur = id })
      setActive(cur)
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  // Reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } }),
      { threshold: 0.07 }
    )
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))
    // trigger skill bar fills when expertise in view
    const skillObs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { setFills(true); skillObs.disconnect() } }), { threshold: 0.3 })
    const exp = document.getElementById('expertise')
    if (exp) skillObs.observe(exp)
    return () => { obs.disconnect(); skillObs.disconnect() }
  }, [])

  // Cursor
  useEffect(() => {
    const c = document.getElementById('cur'), r = document.getElementById('cur-r')
    if (!c || !r) return
    let rx = 0, ry = 0, mx = 0, my = 0, id = 0
    const mv = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; c.style.left = mx+'px'; c.style.top = my+'px' }
    const tick = () => { rx += (mx-rx)*.14; ry += (my-ry)*.14; r.style.left = rx+'px'; r.style.top = ry+'px'; id = requestAnimationFrame(tick) }
    window.addEventListener('mousemove', mv)
    id = requestAnimationFrame(tick)
    const hov = document.querySelectorAll('a,button,.repo-card,.exp-card,.proj-shots')
    hov.forEach(el => { el.addEventListener('mouseenter',()=>{c.classList.add('on');r.classList.add('on')}); el.addEventListener('mouseleave',()=>{c.classList.remove('on');r.classList.remove('on')}) })
    return () => { window.removeEventListener('mousemove', mv); cancelAnimationFrame(id) }
  }, [])

  // Image carousel
  useEffect(() => {
    const iv = setInterval(() => {
      setImgIdx(prev => {
        const n = { ...prev }
        PROJECTS.forEach(p => { n[p.id] = ((prev[p.id] ?? 0) + 1) % p.images.length })
        return n
      })
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
        <title>barekegn — Full-Stack Engineer</title>
        <meta name="description" content="Barekegn Asefa — Full-stack MERN developer available for remote freelance work. 5 production apps. Contra, Wellfound, Fiverr. Based in Addis Ababa, Ethiopia." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👨‍💻</text></svg>" />
      </Head>

      {/* Cursor */}
      <div id="cur" aria-hidden /><div id="cur-r" aria-hidden />
      <div id="pgbar" aria-hidden />

      {/* Mobile menu */}
      <div className={`m-menu${menu ? ' open' : ''}`}>
        <button className="m-menu-close" onClick={() => setMenu(false)}>✕</button>
        {NAV.map(s => <button key={s} className="m-tab" onClick={() => go(s)}>{s === 'hero' ? 'Home' : s.charAt(0).toUpperCase() + s.slice(1)}</button>)}
      </div>

      {/* Nav */}
      <nav>
        <div className="nav-wrap">
          <button className="nav-logo" onClick={() => go('hero')}>
            <span className="nav-logo-dot" />
            barekegnn
          </button>
          <div className="nav-tabs">
            {NAV.map(s => (
              <button key={s} className={`nav-tab${active === s ? ' active' : ''}`} onClick={() => go(s)}>
                {s === 'hero' ? 'Overview' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <div className="nav-right">
            <a href="/Barekegn Asefa Professional CV Resume (1).pdf" download className="nav-btn">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M7.47 10.78a.75.75 0 0 0 1.06 0l3.75-3.75a.75.75 0 0 0-1.06-1.06L8.75 8.44V1.75a.75.75 0 0 0-1.5 0v6.69L4.78 5.97a.75.75 0 0 0-1.06 1.06l3.75 3.75ZM3.75 13a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z"/></svg>
              Resume
            </a>
            <button className="nav-btn nav-btn-primary" onClick={() => go('contact')}>Hire me →</button>
            <button className="nav-burger" onClick={() => setMenu(true)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"/></svg>
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* ═══════════════════ HERO ═══════════════════ */}
        <section id="hero">
          <div className="wrap">
            <div className="hero-grid">

              {/* ── Left: Avatar sidebar ── */}
              <div className="hero-left">
                <div className="hero-avatar">
                  <img
                    src="/profile.png"
                    alt="Barekegn Asefa"
                    style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center' }}
                    onError={(e) => {
                      const t = e.currentTarget; t.style.display = 'none'
                      const fb = t.nextSibling as HTMLElement; if (fb) fb.style.display = 'flex'
                    }}
                  />
                  <span className="avatar-initials" style={{ display:'none', width:'100%', height:'100%', alignItems:'center', justifyContent:'center' }}>BA</span>
                </div>

                <div className="hero-name">Barekegn Asefa</div>
                <div style={{ fontFamily:'var(--mono)', fontSize:13, color:'var(--text-3)', marginBottom:14 }}>@barekegnn</div>

                <div className="hero-status">
                  <span className="status-dot" />
                  Available for freelance & remote work
                </div>

                <p className="hero-bio-left">Full-stack developer building production-grade applications that solve real problems.</p>

                <div className="hero-meta">
                  {[
                    { icon: '📍', text: 'Addis Ababa, Ethiopia' },
                    { icon: '✉️', text: 'barekegna@gmail.com' },
                    { icon: '📞', text: '+251 979 732 741' },
                    { icon: '🌐', text: 'Open to remote worldwide' },
                  ].map((r, i) => (
                    <div key={i} className="hero-meta-row">
                      <span style={{ fontSize:13 }}>{r.icon}</span>
                      {r.text}
                    </div>
                  ))}
                </div>

                <div className="hero-socials">
                  <a href="https://github.com/barekegnn" target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/barekegn-asefa-346b46247" target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href="mailto:barekegna@gmail.com" className="social-btn" title="Email">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88l6.5-3.81Z"/></svg>
                  </a>
                </div>
              </div>

              {/* ── Right: Creative content ── */}
              <div className="hero-right">

                {/* Intro headline */}
                <div className="rv" style={{ marginBottom:28 }}>
                  <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text-3)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:10 }}>
                    // full-stack engineer · available for remote work
                  </div>
                  <h1 style={{ fontSize:'clamp(28px,3.5vw,42px)', fontWeight:700, color:'var(--text-1)', letterSpacing:'-.03em', lineHeight:1.15, marginBottom:12 }}>
                    I build things that<br />
                    <span style={{ background:'linear-gradient(90deg,#58a6ff,#bc8cff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                      actually ship.
                    </span>
                  </h1>
                  <p style={{ fontSize:14, color:'var(--text-2)', lineHeight:1.75, maxWidth:500 }}>
                    MERN specialist with <strong style={{ color:'var(--text-1)' }}>3+ years</strong> shipping production systems —
                    from <strong style={{ color:'var(--text-1)' }}>government platforms</strong> to{' '}
                    <strong style={{ color:'var(--text-1)' }}>university apps</strong> serving thousands of real users.
                    Available for <strong style={{ color:'var(--accent)' }}>remote freelance work</strong> on Contra, Wellfound, Fiverr, and direct contracts.
                  </p>
                </div>

                {/* Contribution graph */}
                <div className="contrib-graph rv rv1">
                  <div className="contrib-header">
                    <span>530 contributions in the last year &middot; 385 in 2026</span>
                    <a href="https://github.com/barekegnn" target="_blank" rel="noopener noreferrer"
                      style={{ color:'var(--text-3)', fontSize:11, fontFamily:'var(--mono)', textDecoration:'none' }}>
                      github.com/barekegnn
                    </a>
                  </div>
                  <div className="contrib-grid" style={{ overflowX:'auto' }}>
                    {CONTRIBS.map((col, ci) => (
                      <div key={ci} className="contrib-col">
                        {col.map((v, ri) => (
                          <div key={ri} className="contrib-cell" style={{ background: CONTRIB_COLORS[v] }} />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="contrib-legend">
                    <span>Less</span>
                    {CONTRIB_COLORS.map((c, i) => <span key={i} style={{ background: c }} />)}
                    <span>More</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="rv rv2" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
                  {[
                    { n:'5+',  l:'Live Apps',     c:'#58a6ff', icon:'🚀' },
                    { n:'3K+', l:'Users Reached', c:'#3fb950', icon:'👥' },
                    { n:'35',  l:'Repos',         c:'#d29922', icon:'📦' },
                    { n:'100', l:'GitHub Stars',  c:'#bc8cff', icon:'⭐' },
                  ].map(s => (
                    <div key={s.l} style={{
                      background:'var(--bg-2)', border:'1px solid var(--border)',
                      borderRadius:'var(--r-lg)', padding:'14px 12px', textAlign:'center',
                      transition:'border-color .2s,transform .2s', cursor:'default',
                    }}>
                      <div style={{ fontSize:18, marginBottom:4 }}>{s.icon}</div>
                      <div style={{ fontSize:20, fontWeight:700, color:s.c, fontFamily:'var(--mono)', lineHeight:1 }}>{s.n}</div>
                      <div style={{ fontSize:10, color:'var(--text-3)', marginTop:4, letterSpacing:'.06em', textTransform:'uppercase' }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* Featured projects mini-grid */}
                <div className="rv rv2">
                  <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--text-3)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10 }}>
                    // featured projects
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    {PROJECTS.slice(0,4).map(p => (
                      <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer"
                        className="repo-card" style={{ '--c1':p.c1, '--c2':p.c2, textDecoration:'none' } as React.CSSProperties}>
                        <div style={{
                          height:52, borderRadius:4, overflow:'hidden', marginBottom:8,
                          position:'relative', border:'1px solid var(--border)',
                        }}>
                          <img src={p.images[0]} alt={p.name}
                            style={{ width:'100%', height:'100%', objectFit:'cover', opacity:.65 }} />
                          <div style={{ position:'absolute', inset:0, background:`linear-gradient(135deg,${p.c1}44,transparent)` }} />
                        </div>
                        <div className="repo-name" style={{ color:p.accent, marginBottom:4 }}>
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8V1.5Z"/></svg>
                          {p.name.toLowerCase().replace(' ','-')}
                        </div>
                        <div className="repo-desc" style={{ fontSize:11, lineHeight:1.4 }}>{p.full}</div>
                        <div className="repo-footer" style={{ marginTop:8 }}>
                          <div className="repo-lang">
                            <span className="lang-dot" style={{ background:p.langColor }} />{p.lang}
                          </div>
                          <div style={{ fontSize:10, color:p.accent, fontFamily:'var(--mono)', fontWeight:600 }}>live ↗</div>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div style={{ marginTop:10, textAlign:'right' }}>
                    <button onClick={() => go('work')}
                      style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'var(--mono)', fontSize:12, color:'var(--accent)' }}>
                      View all 5 projects →
                    </button>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="rv rv3" style={{ display:'flex', gap:10, flexWrap:'wrap', marginTop:16 }}>
                  <button className="nav-btn nav-btn-primary" onClick={() => go('contact')} style={{ padding:'9px 20px', fontSize:13 }}>
                    Hire me for your project
                  </button>
                  <button className="nav-btn" onClick={() => go('work')} style={{ padding:'9px 20px', fontSize:13 }}>
                    View my work
                  </button>
                  <a href="/Barekegn Asefa Professional CV Resume (1).pdf" download className="nav-btn" style={{ padding:'9px 20px', fontSize:13 }}>
                    Download CV
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ═══════════════════ PROJECTS ═══════════════════ */}
        <section id="work">
          <div className="wrap">
            <div className="sec-header rv">
              <div style={{ display:'flex',alignItems:'center',gap:12 }}>
                <span className="sec-title">Projects</span>
                <span className="sec-count">5 production apps</span>
              </div>
              <button className="sec-link" onClick={() => go('contact')}>
                View all
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"/></svg>
              </button>
            </div>

            {PROJECTS.map((p, i) => {
              const cur = imgIdx[p.id] ?? 0
              const isEven = i % 2 === 0
              return (
                <div key={p.id} className={`project-row rv${!isEven ? ' reverse' : ''}`} style={{ marginBottom: 16 }}>
                  {/* Screenshot panel */}
                  <div className="proj-shots">
                    <div className="proj-bg" style={{
                      position:'absolute',inset:0,
                      background: `linear-gradient(135deg, #0d1117 0%, ${p.c1}22 100%)`
                    }} />
                    {/* Browser chrome */}
                    <div className="shot-chrome">
                      <span className="chrome-dot" style={{ background:'#ff5f57' }} />
                      <span className="chrome-dot" style={{ background:'#febc2e' }} />
                      <span className="chrome-dot" style={{ background:'#28c840' }} />
                      <div className="chrome-bar">{p.link.replace('https://', '')}</div>
                    </div>
                    {/* Screenshots */}
                    {p.images.map((src, di) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={di} src={src} alt={`${p.name} screenshot ${di+1}`}
                        className={`shot${di === cur ? ' on' : ''}`}
                        style={{ top: 28, height: 'calc(100% - 28px)' }}
                      />
                    ))}
                    <div className="shot-overlay" />
                    <div className="proj-label">{p.name}</div>
                    {/* Thumbnail strip */}
                    <div className="shot-strip">
                      {p.images.map((_, di) => (
                        <div key={di} className="strip-thumb" onClick={() => setImgIdx(prev => ({ ...prev, [p.id]: di }))}>
                          <div className="strip-fill" style={{ width: di === cur ? '100%' : '0%', background: p.accent }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info panel */}
                  <div className="proj-info" style={{ borderTop: `2px solid ${p.accent}` }}>
                    <div>
                      <div className="proj-number" style={{ color: p.accent }}>{p.num} / 0{PROJECTS.length}</div>
                      <div className="proj-org" style={{ color: 'var(--text-3)' }}>{p.org}</div>
                      <div className="proj-title">{p.name}</div>
                      <div style={{ fontSize:12,color:'var(--text-3)',fontFamily:'var(--mono)',marginBottom:10,marginTop:-4 }}>{p.full}</div>
                      <p className="proj-desc">{p.desc}</p>
                    </div>
                    <div className="proj-tags">
                      {p.tags.map(t => <span key={t} className="ptag">{t}</span>)}
                    </div>
                    <div className="proj-stats">
                      {p.stats.map(s => (
                        <div key={s.l} className="pstat">
                          <span className="pstat-dot" style={{ background: p.accent }} />
                          <span style={{ color:'var(--text-3)' }}>{s.l}:</span>
                          <span style={{ color:'var(--text-2)' }}>{s.v}</span>
                        </div>
                      ))}
                    </div>
                    <div className="proj-actions">
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-link proj-link-primary">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"/></svg>
                        Live Demo
                      </a>
                      <a href={`https://github.com/barekegnn`} target="_blank" rel="noopener noreferrer" className="proj-link">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>
                        Source
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <hr className="divider" />

        {/* ═══════════════════ EXPERTISE ═══════════════════ */}
        <section id="expertise">
          <div className="wrap">
            <div className="sec-header rv">
              <span className="sec-title">Expertise</span>
            </div>
            <div className="exp-grid">
              {/* Skills */}
              <div className="exp-card rv">
                <div className="exp-card-header">
                  <div className="exp-card-icon">📊</div>
                  <div>
                    <div className="exp-card-title">Proficiency</div>
                    <div className="exp-card-sub">skill breakdown</div>
                  </div>
                </div>
                <div className="skill-list">
                  {SKILLS.map(s => (
                    <div key={s.name} className="skill-row">
                      <div className="skill-top">
                        <span className="skill-name">{s.name}</span>
                        <span className="skill-pct">{s.pct}%</span>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-fill" style={{ width: fills ? s.pct + '%' : '0%', background: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack */}
              <div className="exp-card rv rv1">
                <div className="exp-card-header">
                  <div className="exp-card-icon">⚡</div>
                  <div>
                    <div className="exp-card-title">Tech Stack</div>
                    <div className="exp-card-sub">tools & frameworks</div>
                  </div>
                </div>
                <div className="tech-pills">
                  {TECH_ALL.map(t => <span key={t} className="tpill">{t}</span>)}
                </div>
                <div style={{ marginTop:16, paddingTop:14, borderTop:'1px solid var(--border)' }}>
                  <div style={{ fontSize:12,color:'var(--text-3)',fontFamily:'var(--mono)',marginBottom:10 }}>// recent activity</div>
                  <div className="activity-list">
                    {ACTIVITY.slice(0, 3).map((a, i) => (
                      <div key={i} className="act-item">
                        <div className="act-icon">{a.icon}</div>
                        <div style={{ flex:1 }}>
                          <div className="act-text">{a.text}</div>
                          <div className="act-time">{a.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="exp-card rv rv2">
                <div className="exp-card-header">
                  <div className="exp-card-icon">🏆</div>
                  <div>
                    <div className="exp-card-title">Achievements</div>
                    <div className="exp-card-sub">milestones reached</div>
                  </div>
                </div>
                <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                  {[
                    { n: '5+',   l: 'Production Apps',     c: '#58a6ff', icon: '🚀' },
                    { n: '3K+',  l: 'Active Users',        c: '#3fb950', icon: '👥' },
                    { n: '3+',   l: 'Years Experience',    c: '#d29922', icon: '📅' },
                    { n: '2',    l: 'Enterprise Clients',  c: '#bc8cff', icon: '🏢' },
                    { n: '100%', l: 'TypeScript First',    c: '#3178c6', icon: '📘' },
                    { n: '90%',  l: 'Q&A Coverage (HU)',   c: '#f78166', icon: '✅' },
                  ].map(s => (
                    <div key={s.l} style={{ display:'flex',alignItems:'center',gap:10 }}>
                      <div style={{ width:32,height:32,borderRadius:'var(--r)',background:'var(--bg-3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,flexShrink:0 }}>{s.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14,fontWeight:700,color:s.c,fontFamily:'var(--mono)',lineHeight:1 }}>{s.n}</div>
                        <div style={{ fontSize:12,color:'var(--text-3)',marginTop:2 }}>{s.l}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ═══════════════════ ABOUT ═══════════════════ */}
        <section id="about">
          <div className="wrap">
            <div className="sec-header rv">
              <span className="sec-title">About</span>
            </div>
            <div className="about-grid">
              {/* README-style card */}
              <div className="about-readme rv">
                <div className="readme-bar">
                  <div className="readme-bar-dots">
                    <div className="readme-bar-dot" style={{ background:'#ff5f57' }} />
                    <div className="readme-bar-dot" style={{ background:'#febc2e' }} />
                    <div className="readme-bar-dot" style={{ background:'#28c840' }} />
                  </div>
                  <span className="readme-bar-title">README.md</span>
                </div>
                <div className="readme-body">
                  <div className="readme-h1">👋 Hi, I&apos;m Barekegn Asefa</div>
                  <div className="readme-badge-row">
                    <span className="badge" style={{ background:'rgba(88,166,255,.15)', color:'#58a6ff', border:'1px solid rgba(88,166,255,.3)' }}>Full-Stack Developer</span>
                    <span className="badge" style={{ background:'rgba(63,185,80,.15)', color:'#3fb950', border:'1px solid rgba(63,185,80,.3)' }}>Open for Hire</span>
                    <span className="badge" style={{ background:'rgba(210,153,34,.15)', color:'#d29922', border:'1px solid rgba(210,153,34,.3)' }}>Remote Worldwide</span>
                    <span className="badge" style={{ background:'rgba(188,140,255,.15)', color:'#bc8cff', border:'1px solid rgba(188,140,255,.3)' }}>TypeScript First</span>
                  </div>
                  <p className="readme-p">
                    I&apos;m a full-stack developer with expertise in building <strong>production-grade applications</strong> using modern tech stacks. Passionate about creating scalable, user-centric solutions that solve real-world problems — including for <strong>government entities</strong> and <strong>educational institutions</strong>.
                  </p>
                  <p className="readme-p">
                    Currently pursuing a <strong>BSc in Software Engineering at Haramaya University (2022–2026)</strong>, with hands-on MERN stack training from <strong>Evangadi Tech</strong>. Based in <strong>Addis Ababa, Ethiopia</strong> — deep knowledge of local infrastructure, Telebirr integrations, and building for mobile-first users.
                  </p>

                  <div className="readme-h2">🚀 What I&apos;m working on</div>
                  <ul className="readme-ul">
                    <li>Available for freelance on <strong style={{color:'var(--text-1)'}}>Contra</strong>, <strong style={{color:'var(--text-1)'}}>Wellfound</strong>, <strong style={{color:'var(--text-1)'}}>Fiverr</strong> &amp; direct contracts</li>
                    <li>Maintaining MINT — live government project management system</li>
                    <li>Studying AI Automation, System Design &amp; Architecture</li>
                    <li>Completing BSc Software Engineering at Haramaya University</li>
                  </ul>

                  <div className="readme-h2">🛠 My stack at a glance</div>
                  <div className="readme-code">
                    <pre>
                      <span className="rc-comment">// barekegn.config.ts</span>{'\n'}
                      <span className="rc-key">export const</span> <span style={{color:'var(--text-1)'}}>stack</span> = {'{'}{'\n'}
                      {'  '}<span className="rc-key">frontend</span>: [<span className="rc-str">&apos;Next.js&apos;</span>, <span className="rc-str">&apos;React&apos;</span>, <span className="rc-str">&apos;TypeScript&apos;</span>],{'\n'}
                      {'  '}<span className="rc-key">backend</span>:  [<span className="rc-str">&apos;Node.js&apos;</span>, <span className="rc-str">&apos;Express&apos;</span>, <span className="rc-str">&apos;REST&apos;</span>],{'\n'}
                      {'  '}<span className="rc-key">database</span>: [<span className="rc-str">&apos;PostgreSQL&apos;</span>, <span className="rc-str">&apos;MySQL&apos;</span>, <span className="rc-str">&apos;Redis&apos;</span>],{'\n'}
                      {'  '}<span className="rc-key">deploy</span>:   [<span className="rc-str">&apos;Vercel&apos;</span>, <span className="rc-str">&apos;AWS&apos;</span>, <span className="rc-str">&apos;Docker&apos;</span>],{'\n'}
                      {'  '}<span className="rc-key">available</span>: <span className="rc-bool">true</span>,{'\n'}
                      {'  '}<span className="rc-key">remote</span>:    <span className="rc-bool">true</span>,{'\n'}
                      {'  '}<span className="rc-key">platforms</span>: [<span className="rc-str">&apos;Contra&apos;</span>, <span className="rc-str">&apos;Wellfound&apos;</span>, <span className="rc-str">&apos;Fiverr&apos;</span>],{'\n'}
                      {'}'}
                    </pre>
                  </div>

                  <div className="readme-h2">📐 Philosophy</div>
                  <div style={{ paddingLeft:14, borderLeft:'3px solid var(--accent)', marginBottom:14 }}>
                    <p style={{ fontSize:13, fontStyle:'italic', color:'var(--text-2)', lineHeight:1.7 }}>
                      &ldquo;Building scalable solutions that make a real difference. True premium quality isn&apos;t added at the end — it&apos;s a fundamental constraint guiding every architectural decision from day one.&rdquo;
                    </p>
                  </div>

                  <div className="readme-h2">⚡ Career</div>
                  <div style={{ display:'flex',flexDirection:'column',gap:0 }}>
                    {[
                      { role:'Full-Stack MERN Developer', co:'Freelance / Remote', years:'2023 — Present', dot:'#3fb950' },
                      { role:'Web Developer & Consultant', co:'Ethiopian Market', years:'2022 — 2023', dot:'#d29922' },
                      { role:'Self-Taught Journey', co:'Learning & Building', years:'2021 — 2022', dot:'var(--bg-4)' },
                    ].map((t, i) => (
                      <div key={i} style={{ display:'flex',gap:16,padding:'12px 0',borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                        <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:4,paddingTop:3 }}>
                          <div style={{ width:10,height:10,borderRadius:'50%',background:t.dot,border:'2px solid var(--bg)',boxShadow:`0 0 6px ${t.dot}`,flexShrink:0 }} />
                          {i < 2 && <div style={{ width:1,height:32,background:'var(--border)' }} />}
                        </div>
                        <div>
                          <div style={{ fontSize:13,fontWeight:600,color:'var(--text-1)' }}>{t.role}</div>
                          <div style={{ fontSize:12,color:'var(--accent)',fontFamily:'var(--mono)',marginTop:2 }}>{t.co}</div>
                          <div style={{ fontSize:11,color:'var(--text-3)',fontFamily:'var(--mono)',marginTop:2 }}>{t.years}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="about-sidebar">
                {/* Language stats */}
                <div className="sidebar-card rv">
                  <div className="sidebar-card-title">Most Used Languages</div>
                  <div className="lang-stat-row">
                    {[
                      { l:'TypeScript', pct:48, c:'#3178c6' },
                      { l:'JavaScript', pct:28, c:'#f1e05a' },
                      { l:'CSS',        pct:14, c:'#563d7c' },
                      { l:'HTML',       pct:10, c:'#e34c26' },
                    ].map(s => (
                      <div key={s.l} className="lsr">
                        <div className="lsr-dot" style={{ background:s.c }} />
                        <span className="lsr-name">{s.l}</span>
                        <div className="lsr-bar"><div className="lsr-fill" style={{ width:s.pct+'%',background:s.c }} /></div>
                        <span className="lsr-pct">{s.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Streak */}
                <div className="sidebar-card rv rv1">
                  <div className="sidebar-card-title">GitHub Stats</div>
                  <div className="streak-box">
                    <div className="streak-num">530</div>
                    <div className="streak-label">contributions · last year</div>
                  </div>
                  <div className="streak-row">
                    {[['35','Repos'],['100','Stars'],['385','2026']].map(([n,l]) => (
                      <div key={l} className="streak-stat">
                        <div className="streak-stat-n">{n}</div>
                        <div className="streak-stat-l">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="sidebar-card rv rv2">
                  <div className="sidebar-card-title">Education</div>
                  <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
                    {[
                      { title:'BSc Software Engineering', inst:'Haramaya University', year:'2022–2026', icon:'🎓' },
                      { title:'MERN Stack Web Dev', inst:'Evangadi Tech', year:'2022–2023', icon:'⚡' },
                      { title:'AI Automation & System Design', inst:'Self-Study', year:'2024–Present', icon:'🤖' },
                    ].map(e => (
                      <div key={e.title} style={{ display:'flex',gap:10,alignItems:'flex-start' }}>
                        <div style={{ width:28,height:28,borderRadius:'var(--r)',background:'var(--bg-3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,flexShrink:0 }}>{e.icon}</div>
                        <div>
                          <div style={{ fontSize:12,fontWeight:600,color:'var(--text-1)' }}>{e.title}</div>
                          <div style={{ fontSize:11,color:'var(--accent)',fontFamily:'var(--mono)',marginTop:2 }}>{e.inst}</div>
                          <div style={{ fontSize:11,color:'var(--text-3)',fontFamily:'var(--mono)',marginTop:1 }}>{e.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="sidebar-card rv rv3">
                  <div className="sidebar-card-title">Interests</div>
                  <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
                    {[['📚','Reading','Tech & business literature'],['🏃','Fitness','Mental clarity & wellness'],['🤖','AI & Innovation','Emerging tech exploration'],['🌍','Social Impact','Tech for real problems'],['🗣','Networking','Meaningful tech connections']].map(([e,t,s]) => (
                      <div key={t} style={{ display:'flex',gap:8,alignItems:'center' }}>
                        <span style={{ fontSize:14,flexShrink:0 }}>{e}</span>
                        <div>
                          <div style={{ fontSize:12,fontWeight:500,color:'var(--text-2)' }}>{t}</div>
                          <div style={{ fontSize:11,color:'var(--text-3)',marginTop:1 }}>{s}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ═══════════════════ CONTACT ═══════════════════ */}
        <section id="contact">
          <div className="wrap">
            <div className="sec-header rv">
              <span className="sec-title">Contact</span>
            </div>
            <div className="contact-grid">
              <div className="rv">
                <h2 className="contact-heading">
                  Let&apos;s build something <span>exceptional</span>.
                </h2>
                <p className="contact-sub">
                  Available for remote freelance projects on <strong style={{ color:'var(--text-1)' }}>Contra</strong>, <strong style={{ color:'var(--text-1)' }}>Wellfound</strong>, <strong style={{ color:'var(--text-1)' }}>Fiverr</strong>, and direct contracts — as well as local Ethiopian organizations. Got a project? Let&apos;s talk.
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
                    <textarea id="c-msg" name="msg" className="form-ta" placeholder="Tell me about your goals..." required />
                  </div>
                  <button type="submit" className="nav-btn nav-btn-primary" style={{ padding:'8px 20px', fontSize:13 }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm6.5-.25A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>
                    Send message
                  </button>
                </form>
              </div>

              <div className="contact-right rv rv2">
                <div className="contact-sidebar-card">
                  <div className="csb-header">// contact.json</div>
                  <div className="csb-body">
                    <div className="csb-row">
                      <div className="csb-label">email</div>
                      <div className="csb-value"><a href="mailto:barekegna@gmail.com">barekegna@gmail.com</a></div>
                    </div>
                    <div className="csb-row">
                      <div className="csb-label">phone</div>
                      <div className="csb-value"><a href="tel:+251979732741">+251 979 732 741</a></div>
                    </div>
                    <div className="csb-row">
                      <div className="csb-label">location</div>
                      <div className="csb-value">Addis Ababa, Ethiopia<small>Remote worldwide · Contra · Wellfound · Fiverr</small></div>
                    </div>
                    <div className="csb-row">
                      <div className="csb-label">status</div>
                      <div className="csb-value"><span className="online-dot" />Accepting new clients</div>
                    </div>
                    <div className="csb-row">
                      <div className="csb-label">links</div>
                      <div className="contact-links">
                        {[['GitHub','https://github.com/barekegnn'],['LinkedIn','https://www.linkedin.com/in/barekegn-asefa-346b46247'],['Email','mailto:barekegna@gmail.com'],['Phone','tel:+251979732741']].map(([n,h]) => (
                          <a key={n} href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="clink">
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

      {/* Footer */}
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

      {/* Toast */}
      <div className={`toast${toast ? ' show' : ''}`} role="status" aria-live="polite">
        <span className="toast-ico">✓</span>
        Message sent! I&apos;ll get back to you soon.
      </div>
    </>
  )
}
