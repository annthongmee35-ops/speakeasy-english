import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, Award, BookOpen, Check, ChevronLeft, ChevronRight, Flame,
  Globe2, Headphones, Home, Lock, Menu, Mic, Play, RotateCcw, Settings,
  Sparkles, Star, Target, Trophy, User, Volume2, X
} from "lucide-react";
import "./styles.css";

const lessons = [
  {
    id: 1, level: 1, category: "Greeting", icon: "👋",
    titleTH: "การทักทาย", titleEN: "Greetings",
    items: [
      { en: "Hello! How are you?", read: "เฮลโล! ฮาว อาร์ ยู?", th: "สวัสดี! คุณเป็นอย่างไรบ้าง?" },
      { en: "I'm good, thank you.", read: "ไอม์ กูด แธงก์ ยู", th: "ฉันสบายดี ขอบคุณ" },
      { en: "Nice to meet you.", read: "ไนซ์ ทู มีท ยู", th: "ยินดีที่ได้รู้จัก" }
    ]
  },
  {
    id: 2, level: 1, category: "Introduce", icon: "🙋",
    titleTH: "แนะนำตัว", titleEN: "Introduce Yourself",
    items: [
      { en: "My name is Anna.", read: "มาย เนม อิส แอนนา", th: "ฉันชื่อแอนนา" },
      { en: "Where are you from?", read: "แวร์ อาร์ ยู ฟรอม?", th: "คุณมาจากที่ไหน?" },
      { en: "I'm from Thailand.", read: "ไอม์ ฟรอม ไทยแลนด์", th: "ฉันมาจากประเทศไทย" }
    ]
  },
  {
    id: 3, level: 1, category: "Restaurant", icon: "🍜",
    titleTH: "ร้านอาหาร", titleEN: "At a Restaurant",
    items: [
      { en: "I'd like fried rice, please.", read: "ไอด์ ไลค์ ฟรายด์ ไรซ์ พลีซ", th: "ฉันขอข้าวผัดค่ะ/ครับ" },
      { en: "Can I have some water?", read: "แคน ไอ แฮฟ ซัม วอเทอร์?", th: "ขอน้ำสักหน่อยได้ไหม?" },
      { en: "The food is delicious.", read: "เดอะ ฟู้ด อิส ดิ-ลิ-เชิส", th: "อาหารอร่อยมาก" }
    ]
  },
  {
    id: 4, level: 2, category: "Shopping", icon: "🛍️",
    titleTH: "การซื้อของ", titleEN: "Shopping",
    items: [
      { en: "How much is this?", read: "ฮาว มัช อิส ดิส?", th: "อันนี้ราคาเท่าไหร่?" },
      { en: "Do you have a larger size?", read: "ดู ยู แฮฟ อะ ลาร์เจอร์ ไซซ์?", th: "มีขนาดที่ใหญ่กว่านี้ไหม?" },
      { en: "I'll take it.", read: "ไอล์ เทค อิท", th: "ฉันเอาอันนี้" }
    ]
  },
  {
    id: 5, level: 2, category: "Travel", icon: "✈️",
    titleTH: "การเดินทาง", titleEN: "Travel",
    items: [
      { en: "Where is the train station?", read: "แวร์ อิส เดอะ เทรน สเตชัน?", th: "สถานีรถไฟอยู่ที่ไหน?" },
      { en: "How can I get there?", read: "ฮาว แคน ไอ เก็ต แดร์?", th: "ฉันจะไปที่นั่นได้อย่างไร?" },
      { en: "Is it far from here?", read: "อิส อิท ฟาร์ ฟรอม เฮียร์?", th: "มันอยู่ไกลจากที่นี่ไหม?" }
    ]
  },
  {
    id: 6, level: 3, category: "Work", icon: "💼",
    titleTH: "ที่ทำงาน", titleEN: "At Work",
    items: [
      { en: "Could we schedule a meeting?", read: "คูด วี สเคดจูล อะ มีททิง?", th: "เรานัดประชุมกันได้ไหม?" },
      { en: "I'll send you an email.", read: "ไอล์ เซนด์ ยู แอน อีเมล", th: "ฉันจะส่งอีเมลให้คุณ" },
      { en: "Let me check that for you.", read: "เล็ท มี เช็ค แดท ฟอร์ ยู", th: "ขอฉันตรวจสอบให้คุณก่อน" }
    ]
  }
];

const levels = [
  { n: 1, name: "Beginner", th: "เริ่มต้น", color: "blue", desc: "ประโยคพื้นฐาน ใช้ได้ทุกวัน" },
  { n: 2, name: "Elementary", th: "พื้นฐาน", color: "violet", desc: "สนทนาในสถานการณ์ทั่วไป" },
  { n: 3, name: "Intermediate", th: "ปานกลาง", color: "amber", desc: "พูดคุยเรื่องงานและชีวิตประจำวัน" },
  { n: 4, name: "Upper Intermediate", th: "ค่อนข้างดี", color: "orange", desc: "สนทนาได้อย่างเป็นธรรมชาติ" },
  { n: 5, name: "Advanced", th: "ขั้นสูง", color: "rose", desc: "Professional & fluent conversation" }
];

const copy = {
  th: {
    welcome: "ฝึกพูดภาษาอังกฤษ",
    subtitle: "วันละนิด พูดได้จริงในชีวิตประจำวัน",
    start: "เริ่มต้นใช้งาน",
    trial: "ทดลองเรียนก่อน",
    login: "เข้าสู่ระบบ",
    home: "หน้าแรก", learn: "บทเรียน", speak: "ฝึกพูด", vocab: "คำศัพท์", profile: "โปรไฟล์",
    today: "วันนี้เรามาฝึกภาษาอังกฤษกันไหม?",
    continue: "เรียนต่อ", todayLearn: "เรียนวันนี้", levels: "ระดับของฉัน",
    progress: "ความก้าวหน้า", speaking: "การพูด", listening: "การฟัง", vocabulary: "คำศัพท์", grammar: "ไวยากรณ์",
    listen: "ฟังเสียง", read: "คำอ่าน", translate: "คำแปล", record: "กดเพื่อพูด",
    next: "ถัดไป", retry: "ลองอีกครั้ง", result: "ผลการฝึก", excellent: "ทำได้ดีมาก!",
    language: "ภาษา", settings: "ตั้งค่า", streak: "ฝึกต่อเนื่อง", xp: "XP",
    chooseLevel: "เลือกระดับของคุณ", select: "เลือก", lesson: "บทเรียน",
    score: "คะแนน", dailyGoal: "เป้าหมายวันนี้", complete: "เรียนจบแล้ว"
  },
  en: {
    welcome: "Practice English Speaking",
    subtitle: "A little every day. Speak with confidence.",
    start: "Get Started", trial: "Try a lesson",
    login: "Log in", home: "Home", learn: "Learn", speak: "Speak", vocab: "Vocabulary", profile: "Profile",
    today: "Ready to practice English today?",
    continue: "Continue", todayLearn: "Learn today", levels: "My level",
    progress: "Progress", speaking: "Speaking", listening: "Listening", vocabulary: "Vocabulary", grammar: "Grammar",
    listen: "Listen", read: "Pronunciation", translate: "Translation", record: "Tap to speak",
    next: "Next", retry: "Try again", result: "Practice result", excellent: "Excellent!",
    language: "Language", settings: "Settings", streak: "Day streak", xp: "XP",
    chooseLevel: "Choose your level", select: "Select", lesson: "Lesson",
    score: "Score", dailyGoal: "Today's goal", complete: "Completed"
  }
};

function App() {
  const [lang, setLang] = useState("th");
  const [page, setPage] = useState("welcome");
  const [level, setLevel] = useState(1);
  const [lesson, setLesson] = useState(lessons[0]);
  const [step, setStep] = useState(0);
  const [xp, setXp] = useState(1250);
  const [streak, setStreak] = useState(7);
  const [fontScale, setFontScale] = useState(1);
  const [menu, setMenu] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "th" ? "th" : "en";
    document.documentElement.style.setProperty("--font-scale", fontScale);
  }, [lang, fontScale]);

  const current = lesson.items[step];

  const speakText = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(current.en);
      u.lang = "en-US"; u.rate = 0.82;
      window.speechSynthesis.speak(u);
    }
  };

  const chooseLesson = (l) => {
    setLesson(l); setStep(0); setPage("lesson");
  };

  const nextStep = () => {
    if (step < lesson.items.length - 1) {
      setStep(step + 1);
      setXp(x => x + 10);
    } else {
      setXp(x => x + 50);
      setPage("result");
    }
  };

  const nav = (p) => { setPage(p); setMenu(false); };

  if (page === "welcome") return <Welcome lang={lang} setLang={setLang} t={t} onStart={() => setPage("onboarding")} onTrial={() => chooseLesson(lessons[0])} />;
  if (page === "onboarding") return <Onboarding lang={lang} setLang={setLang} t={t} level={level} setLevel={setLevel} onDone={() => setPage("home")} />;
  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => nav("home")}><span className="brand-mark">S</span><span>SpeakEasy</span></button>
        <nav className="desktop-nav">
          <NavItem icon={<Home size={18}/>} text={t.home} active={page==="home"} onClick={()=>nav("home")} />
          <NavItem icon={<BookOpen size={18}/>} text={t.learn} active={page==="learn"} onClick={()=>nav("learn")} />
          <NavItem icon={<Mic size={18}/>} text={t.speak} active={page==="speak"} onClick={()=>nav("speak")} />
          <NavItem icon={<Star size={18}/>} text={t.vocab} active={page==="vocab"} onClick={()=>nav("vocab")} />
        </nav>
        <div className="top-actions">
          <LanguageToggle lang={lang} setLang={setLang} />
          <button className="avatar" onClick={()=>nav("profile")}>A</button>
          <button className="mobile-menu" onClick={()=>setMenu(!menu)}><Menu/></button>
        </div>
      </header>
      {menu && <div className="mobile-menu-panel">
        <NavItem icon={<Home/>} text={t.home} onClick={()=>nav("home")} />
        <NavItem icon={<BookOpen/>} text={t.learn} onClick={()=>nav("learn")} />
        <NavItem icon={<Mic/>} text={t.speak} onClick={()=>nav("speak")} />
        <NavItem icon={<Star/>} text={t.vocab} onClick={()=>nav("vocab")} />
        <NavItem icon={<User/>} text={t.profile} onClick={()=>nav("profile")} />
      </div>}
      <main className="main">
        {page === "home" && <HomePage t={t} lang={lang} level={level} xp={xp} streak={streak} onContinue={()=>chooseLesson(lessons.find(x=>x.level===level) || lessons[0])} onLearn={()=>nav("learn")} onSpeak={()=>nav("speak")} />}
        {page === "learn" && <LearnPage t={t} lang={lang} level={level} setLevel={setLevel} onLesson={chooseLesson} />}
        {page === "speak" && <SpeakPage t={t} lang={lang} onLesson={chooseLesson} />}
        {page === "lesson" && <LessonPage t={t} lang={lang} lesson={lesson} current={current} step={step} speakText={speakText} onNext={nextStep} />}
        {page === "result" && <ResultPage t={t} lang={lang} lesson={lesson} xp={xp} onRetry={()=>{setStep(0);setPage("lesson")}} onHome={()=>nav("home")} />}
        {page === "vocab" && <VocabPage t={t} lang={lang} />}
        {page === "profile" && <ProfilePage t={t} lang={lang} setLang={setLang} fontScale={fontScale} setFontScale={setFontScale} level={level} streak={streak} xp={xp} />}
      </main>
      <footer className="mobile-bottom">
        <NavItem icon={<Home/>} text={t.home} active={page==="home"} onClick={()=>nav("home")} />
        <NavItem icon={<BookOpen/>} text={t.learn} active={page==="learn"} onClick={()=>nav("learn")} />
        <NavItem icon={<Mic/>} text={t.speak} active={page==="speak"} onClick={()=>nav("speak")} />
        <NavItem icon={<Star/>} text={t.vocab} active={page==="vocab"} onClick={()=>nav("vocab")} />
        <NavItem icon={<User/>} text={t.profile} active={page==="profile"} onClick={()=>nav("profile")} />
      </footer>
    </div>
  );
}

function Welcome({lang,setLang,t,onStart,onTrial}) {
  return <div className="welcome">
    <div className="welcome-orb orb1"/><div className="welcome-orb orb2"/>
    <div className="welcome-header"><div className="brand"><span className="brand-mark">S</span><span>SpeakEasy</span></div><LanguageToggle lang={lang} setLang={setLang}/></div>
    <div className="welcome-content">
      <div className="hero-icon"><span>🗣️</span><div className="sound-wave">)))</div></div>
      <div className="eyebrow"><Sparkles size={16}/> English for everyday life</div>
      <h1>{t.welcome}<br/><span>{t.subtitle}</span></h1>
      <p className="hero-copy">{lang==="th" ? "ฟัง • อ่านคำอ่าน • ดูคำแปล • พูดตาม และพัฒนาทักษะของคุณทีละวัน" : "Listen • Read • Translate • Speak along and build your confidence every day."}</p>
      <div className="hero-actions"><button className="primary-btn large" onClick={onStart}>{t.start}<ArrowRight size={20}/></button><button className="text-btn" onClick={onTrial}>{t.trial}</button></div>
      <div className="trust-row"><span>✓ {lang==="th"?"ใช้งานง่าย":"Easy to use"}</span><span>✓ {lang==="th"?"เหมาะทุกวัย":"All ages"}</span><span>✓ {lang==="th"?"ฝึกได้ทุกวัน":"Practice daily"}</span></div>
    </div>
  </div>
}

function Onboarding({lang,setLang,t,level,setLevel,onDone}) {
  return <div className="onboarding">
    <div className="onboard-top"><button className="brand"><span className="brand-mark">S</span><span>SpeakEasy</span></button><LanguageToggle lang={lang} setLang={setLang}/></div>
    <div className="onboard-card">
      <div className="step-label">STEP 1 / 1</div><div className="onboard-emoji">🎯</div>
      <h1>{t.chooseLevel}</h1><p>{lang==="th"?"ไม่ต้องกังวล คุณสามารถเปลี่ยนระดับได้ภายหลัง":"Don't worry. You can change your level later."}</p>
      <div className="level-grid">{levels.map(x=><button key={x.n} className={`level-card ${level===x.n?"selected":""}`} onClick={()=>setLevel(x.n)}>
        <span className={`level-dot ${x.color}`}>{x.n}</span><span><strong>{x.name}</strong><small>{lang==="th"?x.th:x.desc}</small></span>{level===x.n&&<Check className="check"/>}
      </button>)}</div>
      <button className="primary-btn full" onClick={onDone}>{lang==="th"?"เริ่มเรียน":"Start learning"} <ArrowRight/></button>
    </div>
  </div>
}

function HomePage({t,lang,level,xp,streak,onContinue,onLearn,onSpeak}) {
  const pct = level===1 ? 70 : level===2 ? 48 : 32;
  return <div className="page">
    <section className="welcome-strip">
      <div><div className="eyebrow">{lang==="th"?"ยินดีต้อนรับกลับ 👋":"WELCOME BACK 👋"}</div><h1>{t.today}</h1><p>{lang==="th"?"พร้อมสำหรับอีกหนึ่งก้าวเล็ก ๆ สู่การพูดอังกฤษอย่างมั่นใจ":"One small step toward confident English."}</p></div>
      <div className="daily-card"><div className="fire">🔥</div><strong>{streak}</strong><span>{t.streak}</span></div>
    </section>
    <section className="hero-progress">
      <div><div className="pill">LEVEL {level}</div><h2>{levels[level-1]?.name}</h2><p>{levels[level-1]?.desc}</p><div className="progress"><span style={{width:`${pct}%`}}/></div><small>{pct}% {lang==="th"?"สำเร็จ":"complete"}</small></div>
      <button className="primary-btn" onClick={onContinue}>{t.continue}<ArrowRight/></button>
    </section>
    <div className="section-head"><h2>{t.todayLearn}</h2><button className="link-btn" onClick={onLearn}>{lang==="th"?"ดูทั้งหมด":"View all"} <ArrowRight size={16}/></button></div>
    <div className="quick-grid">
      <QuickCard icon="🗣️" title={lang==="th"?"ฝึกพูด":"Speaking"} desc={lang==="th"?"ฝึกออกเสียงจากประโยคจริง":"Practice real-life phrases"} onClick={onSpeak}/>
      <QuickCard icon="🎧" title={lang==="th"?"ฝึกฟัง":"Listening"} desc={lang==="th"?"ฟังและทำความเข้าใจ":"Listen and understand"} onClick={onContinue}/>
      <QuickCard icon="📖" title={t.vocab} desc={lang==="th"?"ทบทวนคำศัพท์":"Review useful words"} onClick={()=>{}}/>
    </div>
    <div className="section-head"><h2>{t.progress}</h2><span className="xp"><Star size={16} fill="currentColor"/> {xp.toLocaleString()} XP</span></div>
    <div className="skills">
      <Skill name={t.speaking} value={75} icon="🗣️"/><Skill name={t.listening} value={68} icon="🎧"/><Skill name={t.vocabulary} value={82} icon="📖"/><Skill name={t.grammar} value={70} icon="✍️"/>
    </div>
  </div>
}

function QuickCard({icon,title,desc,onClick}) { return <button className="quick-card" onClick={onClick}><span className="quick-icon">{icon}</span><div><strong>{title}</strong><p>{desc}</p></div><ChevronRight/></button> }
function Skill({name,value,icon}) { return <div className="skill"><div className="skill-label"><span>{icon} {name}</span><b>{value}%</b></div><div className="progress thin"><span style={{width:`${value}%`}}/></div></div> }

function LearnPage({t,lang,level,setLevel,onLesson}) {
  return <div className="page"><div className="page-title"><div><div className="eyebrow">LEARNING PATH</div><h1>{t.learn}</h1><p>{lang==="th"?"เรียนตามระดับและสถานการณ์จริง":"Learn by level and real-life situations."}</p></div></div>
    <div className="level-tabs">{levels.map(x=><button className={level===x.n?"active":""} onClick={()=>setLevel(x.n)} key={x.n}>Level {x.n}</button>)}</div>
    <div className="lesson-grid">{lessons.filter(l=>l.level===level).map((l,i)=><LessonCard key={l.id} l={l} i={i} lang={lang} onClick={()=>onLesson(l)}/>)}
      {lessons.filter(l=>l.level===level).length===0 && <div className="empty"><Lock/> {lang==="th"?"บทเรียนระดับนี้จะเปิดเร็ว ๆ นี้":"Lessons for this level are coming soon."}</div>}
    </div>
  </div>
}

function LessonCard({l,i,lang,onClick}) { return <button className="lesson-card" onClick={onClick}><div className="lesson-icon">{l.icon}</div><div className="lesson-meta"><span>LESSON {String(l.id).padStart(2,"0")}</span><span>{l.items.length} {lang==="th"?"ประโยค":"phrases"}</span></div><h3>{lang==="th"?l.titleTH:l.titleEN}</h3><p>{lang==="th"?"ฟัง • อ่าน • พูด":"Listen • Read • Speak"}</p><div className="card-bottom"><div className="mini-progress"><span style={{width:`${35+i*18}%`}}/></div><ArrowRight size={18}/></div></button> }

function SpeakPage({t,lang,onLesson}) {
  return <div className="page"><div className="page-title"><div><div className="eyebrow">SPEAKING PRACTICE</div><h1>{lang==="th"?"ฝึกพูด":"Speak"}</h1><p>{lang==="th"?"เลือกสถานการณ์ แล้วเริ่มพูดได้ทันที":"Choose a situation and start speaking."}</p></div><div className="mic-hero"><Mic/></div></div>
  <div className="scenario-grid">{lessons.map(l=><button className="scenario" key={l.id} onClick={()=>onLesson(l)}><span>{l.icon}</span><div><strong>{lang==="th"?l.titleTH:l.titleEN}</strong><small>{l.items.length} {lang==="th"?"ประโยค":"phrases"}</small></div><ArrowRight/></button>)}</div></div>
}

function LessonPage({t,lang,lesson,current,step,speakText,onNext}) {
  return <div className="page lesson-page"><button className="back-btn" onClick={()=>history.back()}><ChevronLeft/> {t.learn}</button>
    <div className="lesson-heading"><div><span className="pill">{lesson.icon} {lang==="th"?lesson.titleTH:lesson.titleEN}</span><h1>{t.lesson} {step+1} / {lesson.items.length}</h1></div><div className="lesson-dots">{lesson.items.map((_,i)=><span className={i<=step?"done":""} key={i}/>)}</div></div>
    <div className="phrase-card">
      <div className="phrase-top"><span>{lang==="th"?"ประโยคที่ใช้ได้จริง":"REAL-LIFE PHRASE"}</span><button className="sound-btn" onClick={speakText}><Volume2/></button></div>
      <div className="english">{current.en}</div>
      <div className="reading"><span>{t.read}</span>{current.read}</div>
      <div className="translation"><span>{t.translate}</span>{current.th}</div>
      <div className="record-area"><div className="record-ring"><button className="record-btn" onClick={onNext}><Mic/></button></div><strong>{t.record}</strong><small>{lang==="th"?"พูดประโยคภาษาอังกฤษตามด้านบน":"Say the English sentence above"}</small></div>
    </div>
    <div className="lesson-tips"><div><Headphones/><span><b>{lang==="th"?"เคล็ดลับ":"Tip"}</b>{lang==="th"?" ฟังเสียงก่อนพูด แล้วพูดช้า ๆ ชัด ๆ":" Listen first, then speak slowly and clearly."}</span></div><button className="primary-btn" onClick={onNext}>{step===lesson.items.length-1?t.complete:t.next}<ChevronRight/></button></div>
  </div>
}

function ResultPage({t,lang,lesson,xp,onRetry,onHome}) {
  return <div className="page result-page"><div className="result-badge"><Trophy/></div><div className="eyebrow">PRACTICE COMPLETE</div><h1>{t.excellent}</h1><p>{lang==="th"?`คุณฝึกจบ ${lesson.titleTH} แล้ว`:`You completed ${lesson.titleEN}.`}</p>
    <div className="score-card"><div className="score-circle"><strong>86</strong><span>/100</span></div><div><h3>{t.score}</h3><p>{lang==="th"?"พัฒนาขึ้นจากครั้งก่อน 8%":"8% better than your last practice"}</p></div></div>
    <div className="result-grid"><ResultMetric icon="🗣️" name={t.speaking} value="85%"/><ResultMetric icon="🎧" name={t.listening} value="88%"/><ResultMetric icon="📖" name={t.vocabulary} value="92%"/><ResultMetric icon="⚡" name={lang==="th"?"ความคล่อง":"Fluency"} value="80%"/></div>
    <div className="result-actions"><button className="secondary-btn" onClick={onRetry}><RotateCcw/> {t.retry}</button><button className="primary-btn" onClick={onHome}>{t.home} <ArrowRight/></button></div>
    <div className="earned"><Star fill="currentColor"/> +50 XP <span>•</span> {xp.toLocaleString()} total XP</div>
  </div>
}
function ResultMetric({icon,name,value}) { return <div className="metric"><span>{icon}</span><small>{name}</small><strong>{value}</strong></div> }

function VocabPage({t,lang}) {
  const words=[["beautiful","บิว-ทิ-ฟูล","สวย / งดงาม","You look beautiful today."],["delicious","ดิ-ลิ-เชิส","อร่อย","The food is delicious."],["meeting","มีท-ทิง","การประชุม","We have a meeting today."],["travel","แทรฟ-เวิล","การเดินทาง","I love to travel."]];
  return <div className="page"><div className="page-title"><div><div className="eyebrow">MY WORDS</div><h1>{t.vocab}</h1><p>{lang==="th"?"คำศัพท์ที่บันทึกไว้สำหรับทบทวน":"Words saved for review."}</p></div><span className="pill">⭐ 24 words</span></div>
    <div className="vocab-list">{words.map(w=><div className="word-card" key={w[0]}><button className="sound-small" onClick={()=>{"speechSynthesis" in window && speechSynthesis.speak(Object.assign(new SpeechSynthesisUtterance(w[0]),{lang:"en-US"}))}}><Volume2/></button><div className="word-main"><h3>{w[0]}</h3><span>{w[1]}</span></div><div className="word-th">{w[2]}</div><div className="word-example"><b>{w[3]}</b></div><Star className="saved" fill="currentColor"/></div>)}</div>
  </div>
}

function ProfilePage({t,lang,setLang,fontScale,setFontScale,level,streak,xp}) {
  return <div className="page"><div className="profile-head"><div className="profile-avatar">A</div><div><h1>Anna</h1><p>Level {level} • {levels[level-1]?.name}</p></div><button className="icon-btn"><Settings/></button></div>
    <div className="stats"><Stat icon="🔥" value={streak} label={t.streak}/><Stat icon="⭐" value={xp.toLocaleString()} label={t.xp}/><Stat icon="🏆" value="24" label={lang==="th"?"บทเรียน":"Lessons"}/></div>
    <div className="settings-card"><h2>{t.settings}</h2><div className="setting-row"><div><Globe2/><span>{t.language}<small>{lang==="th"?"ไทย":"English"}</small></span></div><LanguageToggle lang={lang} setLang={setLang}/></div>
      <div className="setting-row"><div><span className="font-icon">A</span><span>{lang==="th"?"ขนาดตัวอักษร":"Text size"}<small>A− &nbsp; A &nbsp; A+</small></span></div><div className="font-controls"><button onClick={()=>setFontScale(Math.max(.9,fontScale-.1))}>A−</button><button onClick={()=>setFontScale(1)}>A</button><button onClick={()=>setFontScale(Math.min(1.2,fontScale+.1))}>A+</button></div></div>
      <div className="setting-row"><div><BellIcon/><span>{lang==="th"?"การแจ้งเตือน":"Notifications"}<small>{lang==="th"?"เปิดอยู่":"On"}</small></span></div><div className="toggle on"><span/></div></div>
    </div>
  </div>
}
function BellIcon(){return <span className="bell">🔔</span>}
function Stat({icon,value,label}){return <div className="stat"><span>{icon}</span><strong>{value}</strong><small>{label}</small></div>}
function LanguageToggle({lang,setLang}){return <div className="lang-toggle"><button className={lang==="th"?"active":""} onClick={()=>setLang("th")}>🇹🇭 TH</button><button className={lang==="en"?"active":""} onClick={()=>setLang("en")}>🇬🇧 EN</button></div>}
function NavItem({icon,text,active,onClick}){return <button className={`nav-item ${active?"active":""}`} onClick={onClick}>{icon}<span>{text}</span></button>}

createRoot(document.getElementById("root")).render(<App />);
