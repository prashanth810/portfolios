import React, { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { LiveProjectButton } from '../components/LiveProjectButton';
import { SmartImage } from '../components/SmartImage';
import { PROJECTS, ProjectItem } from '../data/portfolioData';
import { TechStackSection } from './TechStackSection';

export interface ProjectsSectionProps {
  onOpenProject: (project: ProjectItem, initialImageIndex?: number) => void;
  onOpenContact: (preselectedService?: string) => void;
}

interface StickyProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  onOpenProject: (project: ProjectItem, initialImageIndex?: number) => void;
}

const StickyProjectCard: React.FC<StickyProjectCardProps> = ({
  project,
  index,
  totalCards,
  progress,
  onOpenProject,
}) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const start = index * (1 / totalCards);
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  return (
    <div className="sticky top-16 flex h-[85vh] min-h-[600px] w-full items-start justify-center sm:top-24 sm:min-h-[660px] md:top-32">
      <motion.article
        style={{
          scale,
          top: `${index * 28}px`,
          transformOrigin: 'top center',
          willChange: 'transform',
        }}
        className="relative w-full rounded border border-black/15 bg-[#F2F2F2] p-4 shadow-[0_12px_36px_rgba(0,0,0,0.12)]"
      >
        {/* Top Row: Number, Category + Name, and Live Project CTA */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span className="text-[clamp(2.5rem,7.5vw,105px)] font-black leading-none tracking-tight text-black tabular-nums">
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-light uppercase tracking-widest text-black/60 sm:text-sm md:text-base">
                {project.category}
              </span>
              <h3 className="text-[clamp(1.1rem,2.5vw,2.25rem)] font-medium uppercase leading-tight tracking-wide text-black">
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton onClick={() => onOpenProject(project, 0)} />
        </div>

        {/* Bottom Row: 40% Left Stacked Column + 60% Right Tall Column */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-10 md:gap-5">
          {/* Left Column (40% on md+) */}
          <div className="flex flex-row gap-3 sm:gap-4 md:col-span-4 md:flex-col md:gap-5">
            <button
              type="button"
              onClick={() => onOpenProject(project, 0)}
              aria-label={`View ${project.name} showcase render 1`}
              className="group relative h-[130px] w-1/2 overflow-hidden rounded-[20px] bg-[#BFBFBF] cursor-pointer sm:h-[155px] sm:rounded-[24px] md:h-[clamp(130px,16vw,230px)] md:w-full md:rounded-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <SmartImage
                src={project.col1Images[0]}
                alt={`${project.name} visual study 1`}
                loading="lazy"
                fallbackLabel={project.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>

            <button
              type="button"
              onClick={() => onOpenProject(project, 1)}
              aria-label={`View ${project.name} showcase render 2`}
              className="group relative h-[130px] w-1/2 overflow-hidden rounded-[20px] bg-[#BFBFBF] cursor-pointer sm:h-[155px] sm:rounded-[24px] md:h-[clamp(160px,22vw,340px)] md:w-full md:rounded-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <SmartImage
                src={project.col1Images[1]}
                alt={`${project.name} visual study 2`}
                loading="lazy"
                fallbackLabel={project.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          </div>

          {/* Right Column (60% on md+) */}
          <div className="relative h-[210px] sm:h-[260px] md:col-span-6 md:h-auto">
            <button
              type="button"
              onClick={() => onOpenProject(project, 2)}
              aria-label={`View ${project.name} primary showcase render`}
              className="group absolute inset-0 h-full w-full overflow-hidden rounded-[20px] bg-[#BFBFBF] cursor-pointer sm:rounded-[24px] md:rounded-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <SmartImage
                src={project.col2Image}
                alt={`${project.name} featured artwork`}
                loading="lazy"
                fallbackLabel={project.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenProject,
  onOpenContact,
}) => {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  });

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 w-full rounded-t-[40px] bg-[#DADADA] px-4 pb-16 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pb-24 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading mb-14 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          Project
        </h2>
      </FadeIn>

      {/* Sticky Stacking Cards Track */}
      <div ref={stackRef} className="relative mx-auto w-full max-w-[95%]">
        {PROJECTS.map((project, index) => (
          <StickyProjectCard
            key={project.id}
            project={project}
            index={index}
            totalCards={PROJECTS.length}
            progress={scrollYProgress}
            onOpenProject={onOpenProject}
          />
        ))}
      </div>

      {/* Tech Stack (rolling marquees, full width) */}
      <div className="-mx-4 mt-24 sm:-mx-8 md:-mx-10">
        <TechStackSection />
      </div>

      {/* Minimal Footer */}
      <footer className="mx-auto mt-20 flex w-full max-w-[1280px] flex-col items-center justify-between gap-6 border-t border-black/15 pt-10 text-sm text-black/70 sm:mt-28 sm:flex-row">
        <p className="font-light uppercase tracking-wider">
          &copy; {new Date().getFullYear()} Prashanth &mdash; 3D Creator
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          <button
            type="button"
            onClick={() => scrollToSection('#top')}
            className="uppercase tracking-wider transition-opacity duration-200 hover:opacity-100 opacity-70 cursor-pointer"
          >
            Top
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('#statement')}
            className="uppercase tracking-wider transition-opacity duration-200 hover:opacity-100 opacity-70 cursor-pointer"
          >
            Studio
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('#tech')}
            className="uppercase tracking-wider transition-opacity duration-200 hover:opacity-100 opacity-70 cursor-pointer"
          >
            Tech Stack
          </button>
          <button
            type="button"
            onClick={() => onOpenContact()}
            className="uppercase tracking-wider text-black underline underline-offset-4 transition-opacity duration-200 hover:opacity-70 cursor-pointer" >
            Start a Project
          </button>
        </div>
      </footer>
    </section>
  );
};

export default ProjectsSection;