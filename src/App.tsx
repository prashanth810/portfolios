import { useState } from 'react';
import { HeroSection } from './sections/HeroSection';
import { StatementSection } from './sections/StatementSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ContactModal } from './components/ContactModal';
import { ProjectModal } from './components/ProjectModal';
import { ProjectItem } from './data/portfolioData';

export default function App() {
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

  return (
    <main className="min-h-screen w-full bg-[#DADADA] text-black" style={{ overflowX: 'clip' }}>
      <HeroSection onOpenContact={handleOpenContact} onOpenProject={handleOpenProject} />
      <StatementSection />
      <ProjectsSection onOpenProject={handleOpenProject} onOpenContact={handleOpenContact} />

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