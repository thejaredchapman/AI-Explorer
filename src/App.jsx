import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import AiExamples from './components/AiExamples';
import AiConcepts from './components/AiConcepts';
import ConceptDetail from './components/ConceptDetail';
import LlmRubric from './components/LlmRubric';
import ModelTraining from './components/ModelTraining';
import PromptEngineering from './components/PromptEngineering';
import ProductsExplorer from './components/ProductsExplorer';
import CodeAssistants from './components/CodeAssistants';
import AiToolsSection from './components/AiToolsSection';
import FreeLearningSection from './components/FreeLearningSection';
import ResourcesSection from './components/ResourcesSection';
import GuidesSection from "./components/GuidesSection";
import SkillsSection from "./components/SkillsSection";
import LearningGames from "./components/LearningGames";
import Compass from './components/Compass';
import { SECTIONS } from './data/sections';
import './App.css';
import './theme.css';

const SECTION_IDS = SECTIONS.map((s) => s.id);

function App() {
  const [activeConceptId, setActiveConceptId] = useState(null);
  const [currentSection, setCurrentSection] = useState('hero');
  const isScrollingTo = useRef(false);

  // Theme state — defaults to dark, persists in localStorage
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('ai-explorer-theme') || 'dark'; }
    catch { return 'dark'; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('ai-explorer-theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  // Scroll-based section highlighting
  useEffect(() => {
    if (activeConceptId) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingTo.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    );

    const timer = setTimeout(() => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [activeConceptId]);

  const navigateTo = useCallback((sectionId) => {
    setCurrentSection(sectionId);
    isScrollingTo.current = true;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Re-enable observer after scroll settles
    setTimeout(() => { isScrollingTo.current = false; }, 1000);
  }, []);

  const openConceptDetail = useCallback((conceptId) => {
    setActiveConceptId(conceptId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const closeConceptDetail = useCallback(() => {
    setActiveConceptId(null);
  }, []);

  return (
    <div className="app">
      <Navigation currentSection={currentSection} onNavigate={navigateTo} theme={theme} onToggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        {activeConceptId ? (
          <main className="main-content" key="concept-detail">
            <ConceptDetail conceptId={activeConceptId} onBack={closeConceptDetail} />
          </main>
        ) : (
          <main className="main-content" key="overview">
            <Hero onNavigate={navigateTo} />
            <AiExamples />
            <AiConcepts onOpenDetail={openConceptDetail} />
            <LlmRubric />
            <ModelTraining />
            <PromptEngineering />
            <ProductsExplorer />
            <AiToolsSection />
            <CodeAssistants />
            <SkillsSection />
            <LearningGames />
            <FreeLearningSection />
            <ResourcesSection />
            <GuidesSection />
          </main>
        )}
      </AnimatePresence>
      <Compass currentSection={currentSection} onNavigate={navigateTo} />
      <footer className="site-footer">
        <div className="footer-content">
          <p className="footer-main"><strong>AI-Explorer</strong>: an interactive field guide to understanding AI from the ground up.</p>
          <div className="footer-links">
            <a href="https://github.com/thejaredchapman/AI-Explorer" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="footer-divider">|</span>
            <a href="https://docs.anthropic.com" target="_blank" rel="noopener noreferrer">Anthropic Docs</a>
            <span className="footer-divider">|</span>
            <a href="https://platform.openai.com/docs" target="_blank" rel="noopener noreferrer">OpenAI Docs</a>
            <span className="footer-divider">|</span>
            <a href="https://huggingface.co" target="_blank" rel="noopener noreferrer">Hugging Face</a>
          </div>
          <p className="footer-disclaimer">Not affiliated with any company mentioned. For educational purposes.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
