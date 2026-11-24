import { useLayoutEffect, useState } from 'react';
import { HeroSection } from './sections/HeroSection';
import { StatementSection } from './sections/StatementSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ContactModal } from './components/ContactModal';
import { ProjectModal } from './components/ProjectModal';
import { ProjectItem } from './data/portfolioData';
import { ContactSection } from './sections/ContactSection';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeProjectImageIndex, setActiveProjectImageIndex] = useState(0);

  const handleOpenContact = (preselectedService?: string) => {
    setSelectedService(preselectedService);
    setContactOpen(true);
  };

  const handleOpenProject = (project: ProjectItem, imageIndex = 0) => {
    setActiveProject(project);
    setActiveProjectImageIndex(imageIndex);
  };

  const handleRequestSimilar = () => {
    setActiveProject(null);
    setSelectedService('3D Modeling');
    setContactOpen(true);
  };

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <main className="site-main min-h-screen w-full">
      <HeroSection
        onOpenContact={handleOpenContact}
        onOpenProject={handleOpenProject}
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
      />
      <StatementSection />
      <ProjectsSection onOpenProject={handleOpenProject} />
      <ContactSection onOpenContact={handleOpenContact} />

      <ContactModal
        isOpen={contactOpen}
        initialService={selectedService}
        onClose={() => setContactOpen(false)}
      />

      <ProjectModal
        project={activeProject}
        initialImageIndex={activeProjectImageIndex}
        onClose={() => setActiveProject(null)}
        onRequestSimilar={handleRequestSimilar}
      />
    </main>
  );
}