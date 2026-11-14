import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown, ArrowUpRight, X, Github, Linkedin, Mail, Code2,
  BrainCircuit, Database, Server, Terminal, Sparkles, Pencil,
  Music2, Grid3X3, ExternalLink, CheckCircle2, BookOpen, Layers3
} from "lucide-react";
import "./styles.css";

const projects = [
  {
    id: "01",
    title: "IT Ticket Intelligence",
    subtitle: "IT Ticket Decision Support & Triage System",
    category: "MACHINE LEARNING / NLP",
    tone: "red-one",
    stamp: "TICKET\nINTELLIGENCE",
    summary: "An evidence-first ML pipeline for software-support ticket analysis, triage and decision support.",
    stack: ["Python", "scikit-learn", "NLP", "FastAPI", "PostgreSQL", "Docker"],
    overview: "IT Ticket Intelligence explores how machine learning and NLP can help teams understand and prioritise incoming software-support tickets. The project combines dataset investigation, task-specific modelling and a practical API layer.",
    work: [
      "Audited five source families: Eclipse, Mozilla CORE, IT Support, GitBugs Cassandra and GitBugs VS Code. The master record documents 311,464 Eclipse tickets, 522,352 Mozilla CORE tickets, 2,229 IT Support tickets, 4,612 Cassandra records and 32,829 VS Code records.",
      "Built a staged evidence workflow: raw-source audit → Formal Dataset Contract (FDC) → Dataset-to-Task Mapping (DTM) → target/cutoff definition → formulation → evaluation → frozen artifacts.",
      "Investigated schema integrity, missingness, duplicate identities, historical fields and temporal availability before deciding which dataset/task combinations were admissible.",
      "Worked across a heterogeneous task portfolio covering classification, routing, duplicate detection, retrieval and resolution-time modelling, alongside evidence fusion, calibration, human review and feedback design.",
      "Integrated the frozen research runtime into a FastAPI application with PostgreSQL persistence for tickets, analyses and human reviews, then packaged the frontend, backend and database with Docker Compose."
    ],
    engineering: [
      ["Data research", "Five source families were audited. Dataset contracts recorded provenance, integrity, completeness, temporal semantics, target validity and allowed use."],
      ["Task design", "The Dataset-to-Task Mapping gate prevented unsupported targets from being treated as valid labels. The project preserved task-specific prediction cutoffs and evaluation boundaries."],
      ["Model portfolio", "The documented task map spans text classification, observed candidate-space routing, duplicate probability, historical retrieval and survival-based resolution-time analysis; later layers handle evidence fusion and review policy."],
      ["Persistence", "PostgreSQL stores tickets, ticket analyses and human reviews, with foreign-key relationships and JSONB analysis structures."],
      ["Deployment", "Docker Compose packages PostgreSQL, FastAPI and the frontend. The master record documents browser and database end-to-end validation."]
    ],
    honest: "The system is decision support: model outputs should be interpreted within documented dataset limitations and human-review boundaries."
  },
  {
    id: "02",
    title: "VeriQuery",
    subtitle: "Trustworthy Natural-Language Analytics for Relational Databases",
    category: "LLM ENGINEERING / TEXT-TO-SQL",
    tone: "red-two",
    stamp: "VERI\nQUERY",
    summary: "An LLM-powered Text-to-SQL system designed to generate grounded, validated and read-only database queries.",
    stack: ["Python", "LLM APIs", "Pydantic", "PostgreSQL", "SQLGlot", "SQLAlchemy"],
    overview: "VeriQuery translates natural-language questions into structured SQL for a relational database. It focuses on grounding generation in database context and controlling what can be executed, rather than treating generated SQL as automatically trustworthy.",
    work: [
      "Built an LLM-powered Text-to-SQL workflow using schema-aware prompting to help the model reference the database correctly.",
      "Used Pydantic structured outputs to make generated query responses predictable and easier to validate.",
      "Implemented SQL validation and controlled read-only PostgreSQL execution to restrict unsafe database operations.",
      "Added a bounded error-correction workflow so failed queries can be corrected and revalidated before execution.",
      "Designed a 100-question benchmark to assess SQL generation, query validity, execution correctness and handling of unsupported questions."
    ],
    engineering: [
      ["Context", "The generation workflow is grounded in the relational schema and relevant business context."],
      ["Generation", "An LLM produces structured query output rather than unconstrained free-form text."],
      ["Validation", "SQL parsing and policy checks form a boundary before database execution."],
      ["Execution", "The database role and application flow are designed around read-only operations."]
    ],
    honest: "The project is deliberately scoped to one relational dataset and read-only operations. Benchmark results should be reported from the measured evaluation, not assumed in advance."
  },
  {
    id: "03",
    title: "Multi model feature representation Based CNN model for Malicious Website Detection",
    subtitle: "Group Research Project / CNN-Based Malicious Website Detection",
    category: "DEEP LEARNING / CYBERSECURITY",
    tone: "red-three",
    stamp: "MALICIOUS\nWEBSITE",
    summary: "A group research project exploring multi-model feature representation with CNNs for malicious website detection.",
    stack: ["Python", "CNN", "Deep Learning", "Machine Learning"],
    overview: "A group research project proposing a multi-model feature representation-based CNN framework for malicious website detection. The paper combines character-level URL sequences with engineered lexical and structural features, then fuses these representations for classification.",
    work: [
      "Worked as part of a five-author group project at CMR Engineering College; the camera-ready paper lists me as the second author.",
      "The paper describes URL preprocessing, character-level tokenization, padding/truncation and duplicate removal.",
      "The proposed feature representation combines character-level sequences with lexical indicators (such as URL length, digits, special characters and suspicious terms) and structural attributes (such as subdomains and IP-address usage).",
      "The architecture uses an embedding layer and CNN feature extraction, followed by feature fusion and fully connected classification layers.",
      "The paper reports comparisons against Logistic Regression, Random Forest, SVM, single-input CNN and LSTM/CNN-LSTM baselines, plus five-fold cross-validation."
    ],
    engineering: [
      ["Input representation", "Character sequences are integer-encoded and passed through an embedding layer; engineered lexical and structural features provide complementary signals."],
      ["Feature learning", "Convolution and pooling layers extract local URL patterns from the character sequence."],
      ["Feature fusion", "CNN-derived features are concatenated with engineered features before the final classification layers."],
      ["Research evaluation", "The paper reports accuracy, precision, recall and F1-score on a balanced subset and a larger dataset, as well as five-fold cross-validation."]
    ],
    paper: "/assets/papers/multi-model-feature-representation-cnn-malicious-website-detection.pdf",
    paperLabel: "Read camera-ready research paper",
    authors: "Ajay Kumar Velisoju, Lohith Kumar Musirana, Shriya Sriramoji, Abhilash Abrapuri and Sumangala G.",
    honest: "This was a group research project. The paper's reported results are presented as paper-reported results, not as independently verified production performance. The paper discusses future work including transformer/attention models, richer webpage and DNS features, explainability and real-time deployment."
  }
];

const skillGroups = [
  { icon: Code2, title: "Languages", items: ["Python", "Java", "C", "SQL"] },
  { icon: BrainCircuit, title: "Machine Learning", items: ["scikit-learn", "PyTorch", "CNNs", "Feature Engineering", "Model Evaluation"] },
  { icon: Layers3, title: "Data & Scientific Computing", items: ["NumPy", "Pandas", "Matplotlib"] },
  { icon: Sparkles, title: "Generative AI", items: ["LLM Fundamentals", "Prompt Engineering", "Embeddings", "RAG", "LLM APIs"] },
  { icon: Server, title: "Backend Development", items: ["Python", "FastAPI", "REST API Development", "Pydantic", "SQLAlchemy ORM", "PostgreSQL", "Database Design", "CRUD Operations"] },
  { icon: Terminal, title: "Developer Tools & Deployment", items: ["Git", "GitHub", "Jupyter"] },
  { icon: Database, title: "Core", items: ["Data Structures & Algorithms", "OOP"] }
];


function Doodle({ type, className = "" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  return (
    <div className={`corner-doodle ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 100" {...common}>
        {type === "monitor" && <><rect x="12" y="10" width="82" height="56" rx="4"/><path d="M45 66v13m17-13v13M34 80h40M22 23h62M28 32l10 0m-10 8h22"/><path d="M82 49l-9-8 9-8" stroke="#d9362b"/><circle cx="84" cy="55" r="2" fill="#e6b62f" stroke="none"/></>}
        {type === "chip" && <><rect x="32" y="19" width="54" height="54" rx="5"/><rect x="43" y="30" width="32" height="32" rx="2"/><path d="M42 9v10m16-10v10m16-10v10M42 73v10m16-10v10m16-10v10M22 29h10m-10 16h10m-10 16h10M86 29h10m-10 16h10m-10 16h10"/><path d="M49 45h20m-10-10v20" stroke="#d9362b"/></>}
        {type === "keyboard" && <><path d="M10 27l96 0 7 43H3z"/><path d="M18 37h9m7 0h9m7 0h9m7 0h9m7 0h9m-69 12h9m7 0h9m7 0h9m7 0h9m7 0h9M24 59h58"/><path d="M44 59h26" stroke="#d9362b" strokeWidth="4"/></>}
        {type === "mouse" && <><path d="M60 8c-20 0-34 16-34 38v12c0 22 14 34 34 34s34-12 34-34V46C94 24 80 8 60 8z"/><path d="M60 9v28m-34 0h68"/><path d="M60 22v9" stroke="#d9362b" strokeWidth="3"/><path d="M13 18l-6-6m106 6 6-6M12 80l-7 6m103-6 7 6"/></>}
        {type === "terminal" && <><rect x="9" y="13" width="102" height="72" rx="5"/><path d="M9 27h102"/><circle cx="20" cy="20" r="2" fill="#d9362b" stroke="none"/><circle cx="29" cy="20" r="2" fill="#e6b62f" stroke="none"/><path d="M24 43l10 8-10 8m19 0h20"/><path d="M76 43l-9 8 9 8" stroke="#d9362b"/></>}
      </svg>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className={`modal-banner ${project.tone}`}>
          <div className="modal-banner-top"><span>PROJECT FILE / {project.id}</span><button className="modal-close" onClick={onClose} aria-label="Close project details"><X size={20}/></button></div>
          <div className="modal-banner-bottom"><span>{project.category}</span><strong>{project.stamp.split("\n").map((line, i) => <React.Fragment key={line}>{line}{i === 0 ? <br/> : null}</React.Fragment>)}</strong><span>{project.subtitle}</span></div>
        </div>
        <div className="modal-content">
          <div className="modal-intro"><div className="eyebrow">CASE STUDY / {project.id}</div><h2 id="modal-title">{project.title}</h2><p>{project.overview}</p></div>
          <div className="modal-columns">
            <div>
              <h3><span>01</span> What I worked on</h3>
              <ul className="detail-list">{project.work.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </div>
            <div>
              <h3><span>02</span> Engineering breakdown</h3>
              <div className="engineering-list">{project.engineering.map(([label, body]) => <div key={label}><b>{label}</b><p>{body}</p></div>)}</div>
              <h3 className="stack-heading"><span>03</span> Technology</h3>
              <div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
              {project.paper && <div className="research-paper"><span>GROUP RESEARCH PAPER</span><p>{project.authors}</p><a href={project.paper} target="_blank" rel="noreferrer">{project.paperLabel} <ArrowUpRight size={15}/></a></div>}
            </div>
          </div>
          <div className="honest-note"><CheckCircle2 size={17}/><p><b>Scope & context</b>{project.honest}</p></div>
          <div className="modal-footer"><span>LOHITH KUMAR / SELECTED WORK</span><button onClick={onClose}>Back to portfolio <ArrowUpRight size={15}/></button></div>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="topline"><span>LOHITH KUMAR / PORTFOLIO 2026</span><span>HYDERABAD, INDIA <i className="live-dot"/></span></div>
      <header className="nav-wrap">
        <a className="wordmark" href="#home" onClick={closeMenu}>LK<span>✳</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? "CLOSE" : "MENU"}</button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#about" onClick={closeMenu}>About</a><a href="#work" onClick={closeMenu}>Projects</a><a href="#skills" onClick={closeMenu}>Skills</a><a href="#credentials" onClick={closeMenu}>Certification</a><a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-cta" href="https://github.com/MusiranaLohith" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a>
        </nav>
      </header>

      <main id="home">
        <section className="hero section-pad">
          <Doodle type="monitor" className="doodle-hero"/>
          <div className="hero-topline"><span>PORTFOLIO / 001</span><span>AI · ML · PYTHON · LLM SYSTEMS</span></div>
          <div className="hero-main">
            <div className="hero-copy">
              <div className="hero-kicker"><span className="kicker-square"/> BUILDING WITH CURIOSITY</div>
              <h1>LOHITH<br/><em>KUMAR</em><span className="hero-star">✳</span></h1>
              <div className="hero-role">AI / ML ENGINEERING <b>·</b> PYTHON <b>·</b> LLM SYSTEMS</div>
              <p>I’m a B.Tech Computer Science graduate focused on AI and Machine Learning. I enjoy turning complex ideas into practical, testable software.</p>
              <div className="hero-actions"><a className="button button-red" href="#work">Explore my projects <ArrowDown size={16}/></a><a className="button button-paper" href="#contact">Let’s connect <ArrowUpRight size={16}/></a></div>
            </div>
            <div className="hero-art" aria-label="Typographic portfolio artwork">
              <div className="art-paper"><span className="art-micro">THOUGHT / CODE / ITERATION</span><div className="art-big">IDEAS<br/><i>INTO</i><br/>SYSTEMS<span>.</span></div><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-sticker">CURIOUS<br/>BY DEFAULT</div><div className="art-bottom"><span>PYTHON + AI</span><span>HYD / IN</span></div></div>
              <div className="art-side-note">A WORK IN<br/>PROGRESS <b>↗</b></div>
            </div>
          </div>
          <div className="hero-bottomline"><span>SCROLL TO EXPLORE <ArrowDown size={13}/></span><span>OPEN TO AI / ML & PYTHON OPPORTUNITIES</span></div>
        </section>

        <div className="marquee"><div className="marquee-track"><span>ARTIFICIAL INTELLIGENCE</span><b>✳</b><span>MACHINE LEARNING</span><b>✳</b><span>BACKEND ENGINEERING</span><b>✳</b><span>LLM SYSTEMS</span><b>✳</b><span>ARTIFICIAL INTELLIGENCE</span><b>✳</b><span>MACHINE LEARNING</span></div></div>

        <section className="about section-pad" id="about">
          <Doodle type="mouse" className="doodle-about"/>
          <div className="section-label"><span>01 / ABOUT</span><b>A LITTLE CONTEXT</b></div>
          <div className="about-grid"><h2>Curious by nature.<br/><em>Engineer by practice.</em></h2><div className="about-copy"><p className="lead">I like understanding how things work — then building something useful with what I learn.</p><p>My work and learning span machine learning, NLP, Python backend development and LLM-powered applications. I care about clear reasoning, careful evaluation and software that behaves predictably.</p><p>Based in Hyderabad, India. Interested in AI/ML engineering and Python-focused opportunities.</p><div className="signature">LOHITH KUMAR <span>— COMPUTER SCIENCE / AI & ML</span></div></div></div>
        </section>

        <section className="work section-pad" id="work">
          <Doodle type="chip" className="doodle-work"/>
          <div className="section-label"><span>02 / SELECTED WORK</span><b>THREE PROJECT FILES</b></div>
          <div className="work-heading"><h2>Things I’ve<br/><em>been building.</em></h2><p>Each project explores a different problem space. Open a project to see the thinking, implementation and technical details behind it.</p></div>
          <div className="project-grid">
            {projects.map((project) => (
              <button className={`project-card ${project.tone}`} key={project.id} onClick={() => setSelectedProject(project)} aria-label={`Open ${project.title} case study`}>
                <div className="project-card-top"><span>PROJECT / {project.id}</span><span>{project.category}</span></div>
                <div className="project-stamp">{project.stamp.split("\n").map((line, i) => <React.Fragment key={line}>{line}{i === 0 ? <br/> : null}</React.Fragment>)}</div>
                <div className="project-card-bottom"><div><h3>{project.title}</h3><p>{project.summary}</p></div><span className="project-open"><ArrowUpRight size={22}/></span></div>
                <div className="project-card-hint">OPEN CASE STUDY <span>↗</span></div>
              </button>
            ))}
          </div>
        </section>

        <section className="skills section-pad" id="skills">
          <Doodle type="keyboard" className="doodle-skills"/>
          <div className="section-label"><span>03 / TECHNICAL SKILLS</span><b>TOOLS & FOUNDATIONS</b></div>
          <div className="skills-heading"><h2>My working<br/><em>toolkit.</em></h2><p>A snapshot of the technologies and foundations listed in my resume.</p></div>
          <div className="skills-grid">
            {skillGroups.map(({icon: Icon, title, items}, i) => <article className="skill-card" key={title}><div className="skill-card-top"><span>0{i + 1}</span><Icon size={21}/></div><h3>{title}</h3><div className="skill-tags">{items.map(item => <span key={item}>{item}</span>)}</div></article>)}
          </div>
          <div className="soft-skills"><span>ALSO IMPORTANT</span><p>Problem Solving <b>·</b> Analytical Thinking <b>·</b> Communication <b>·</b> Teamwork <b>·</b> Adaptability <b>·</b> Continuous Learning</p></div>
        </section>

        <section className="credentials section-pad" id="credentials">
          <Doodle type="terminal" className="doodle-credentials"/>
          <div className="section-label"><span>04 / CERTIFICATION</span><b>CONTINUOUS LEARNING</b></div>
          <div className="credential-card">
            <a className="certificate-preview" href="/assets/ml-specialization-certificate.pdf" target="_blank" rel="noreferrer" aria-label="Open Machine Learning Specialization certificate PDF"><img src="/assets/ml-specialization-certificate.png" alt="Coursera Machine Learning Specialization certificate awarded to Lohith Kumar Musirana"/><span>VIEW CERTIFICATE ↗</span></a>
            <div className="credential-copy"><span className="credential-type">PROFESSIONAL CERTIFICATE / ONLINE · MAR 10, 2026</span><h2>Machine Learning<br/><em>Specialization.</em></h2><p className="credential-provider">DeepLearning.AI · Coursera · Andrew Ng</p><p>Completed all three courses: Supervised Machine Learning: Regression and Classification; Advanced Learning Algorithms; and Unsupervised Learning, Recommenders, Reinforcement Learning.</p><div className="credential-actions"><a className="credential-link" href="https://coursera.org/verify/specialization/FEM53LQP3EFP" target="_blank" rel="noreferrer">Verify certificate <ArrowUpRight size={15}/></a><a className="credential-link credential-link-secondary" href="/assets/ml-specialization-certificate.pdf" target="_blank" rel="noreferrer">Open certificate PDF <ArrowUpRight size={15}/></a></div></div>
          </div>
        </section>

        <section className="hobbies section-pad" id="hobbies">
          <Doodle type="mouse" className="doodle-hobbies"/>
          <div className="section-label"><span>05 / OFF THE CLOCK</span><b>OUTSIDE THE SCREEN</b></div>
          <div className="hobbies-grid"><h2>Other ways<br/><em>I recharge.</em></h2><div className="hobby-list">
            <div><Pencil/><span><b>Pencil & pen art</b><small>Sketching and drawing ideas by hand.</small></span><i>01</i></div>
            <div><Music2/><span><b>Music</b><small>A soundtrack for focus, breaks and everything between.</small></span><i>02</i></div>
            <div><Grid3X3/><span><b>Sudoku</b><small>A small logic challenge to reset the mind.</small></span><i>03</i></div>
          </div></div>
        </section>

        <section className="contact section-pad" id="contact">
          <Doodle type="chip" className="doodle-contact"/>
          <div className="contact-panel"><div className="section-label"><span>06 / CONTACT</span><b>THE NEXT CHAPTER</b></div><h2>Let’s make<br/><em>something useful.</em></h2><p>I’m open to conversations about AI/ML, Python engineering and opportunities to learn, contribute and build meaningful software.</p><div className="contact-links"><a href="https://github.com/MusiranaLohith" target="_blank" rel="noreferrer"><Github/> GitHub <ArrowUpRight/></a><a href="https://www.linkedin.com/in/musirana-lohith-kumar-72871a251" target="_blank" rel="noreferrer"><Linkedin/> LinkedIn <ArrowUpRight/></a><a href="mailto:lohithkumar15p@gmail.com"><Mail/> Email <ArrowUpRight/></a></div><small>Reach me on LinkedIn or by email.</small></div>
        </section>
      </main>
      <footer className="footer"><a className="wordmark" href="#home">LK<span>✳</span></a><span>BUILT WITH CURIOSITY / 2026</span><a href="#home">BACK TO TOP ↑</a><span>© LOHITH KUMAR</span></footer>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)}/>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);
