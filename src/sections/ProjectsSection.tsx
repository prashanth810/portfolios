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
  const rightImage = project.images[0];
  const leftTopImage = project.images[1] ?? rightImage;
  const leftBottomImage = project.images[2] ?? rightImage;
  const leftTopIndex = project.images[1] ? 1 : 0;
  const leftBottomIndex = project.images[2] ? 2 : 0;
  const hasMultipleImages = project.images.length > 1;
  const leftImageFit = hasMultipleImages ? 'object-contain' : 'object-cover';

  return (
    <div className="sticky top-16 flex h-[calc(100svh-5rem)] w-full items-start justify-center sm:top-24 sm:h-[calc(100svh-7.5rem)] md:top-32 md:h-[calc(100svh-10rem)]">
      <motion.article
        style={{
          scale,
          transformOrigin: 'top center',
          willChange: 'transform',
          zIndex: index + 1,
        }}
        className="relative flex h-full w-full flex-col border border-black/15 bg-[#F2F2F2] p-4 shadow-[0_12px_36px_rgba(0,0,0,0.12)] sm:rounded-[14px] sm:p-5"
      >
        {/* Top Row: Number, Category + Name, and Live Project CTA */}
        <div className="mb-3 flex shrink-0 flex-wrap items-center justify-between gap-3 sm:mb-4 md:mb-5">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span className="text-[clamp(2.5rem,7.5vw,105px)] font-black leading-none tracking-tight text-black tabular-nums">
              {project.number}
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-light uppercase tracking-widest text-black/60 sm:text-sm md:text-base">
                  {project.category}
                </span>
                {project.badge && (
                  <span className="rounded-full bg-emerald-700 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {project.badge}
                  </span>
                )}
              </div>
              <h3 className="text-[clamp(1.1rem,2.5vw,2.25rem)] font-medium uppercase leading-tight tracking-wide text-black">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <LiveProjectButton
              href={project.link}
              onClick={() => onOpenProject(project, 0)}
            />
            {project.adminLink && (
              <a
                href={project.adminLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-black/30 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-black transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2F2F2]"
              >
                Admin
              </a>
            )}
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,36%)_minmax(0,64%)] gap-3 sm:gap-4 md:gap-5">
          <div className="grid min-h-0 grid-rows-2 gap-3 sm:gap-4 md:gap-5">
            <button
              type="button"
              onClick={() => onOpenProject(project, leftTopIndex)}
              aria-label={`View ${project.name} detail preview`}
              className="group relative min-h-0 overflow-hidden border border-black/10 bg-[#E8E8E8] cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.04)] sm:rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <SmartImage
                src={leftTopImage}
                alt={`${project.name} detail preview`}
                loading="lazy"
                fallbackLabel={project.name}
                className={`h-full w-full ${leftImageFit} ${hasMultipleImages ? 'object-center' : 'object-[center_top]'} transition-transform duration-500 group-hover:scale-[1.02]`}
              />
            </button>
            <button
              type="button"
              onClick={() => onOpenProject(project, leftBottomIndex)}
              aria-label={`View ${project.name} secondary preview`}
              className="group relative min-h-0 overflow-hidden border border-black/10 bg-[#E8E8E8] cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.04)] sm:rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <SmartImage
                src={leftBottomImage}
                alt={`${project.name} secondary preview`}
                loading="lazy"
                fallbackLabel={project.name}
                className={`h-full w-full ${leftImageFit} ${hasMultipleImages ? 'object-center' : 'object-[center_bottom]'} transition-transform duration-500 group-hover:scale-[1.02]`}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onOpenProject(project, 0)}
            aria-label={`View ${project.name} project`}
            className="group relative min-h-0 overflow-hidden border border-black/10 bg-[#E8E8E8] cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.05)] sm:rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <SmartImage
              src={rightImage}
              alt={`${project.name} project screenshot`}
              loading="lazy"
              fallbackLabel={project.name}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </button>
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
            About Me
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