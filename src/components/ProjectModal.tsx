import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { ContactButton } from './ContactButton';
import { SmartImage } from './SmartImage';

export interface ProjectModalProps {
  project: ProjectItem | null;
  initialImageIndex?: number;
  onClose: () => void;
  onRequestSimilar: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  initialImageIndex = 0,
  onClose,
  onRequestSimilar,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialImageIndex);
  const images = project?.images ?? [];
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    setActiveIndex(Math.min(initialImageIndex, Math.max(images.length - 1, 0)));
  }, [project, initialImageIndex, images.length]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (hasMultipleImages && event.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % images.length);
      } else if (hasMultipleImages && event.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev + images.length - 1) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, hasMultipleImages, images.length]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[32px] border border-black/15 bg-[#F2F2F2] p-5 text-black shadow-2xl sm:rounded-md sm:p-8"
          >
            {/* Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="text-4xl font-black leading-none text-black tabular-nums sm:text-6xl">
                  {project.number}
                </span>
                <div>
                  <p className="text-xs font-light uppercase tracking-widest text-black/60 sm:text-sm">
                    {project.category}
                  </p>
                  <h2
                    id="project-modal-title"
                    className="text-xl font-semibold uppercase tracking-wide text-black sm:text-3xl"
                  >
                    {project.name}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project showcase"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/20 text-black transition-colors duration-200 hover:bg-black/5 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Active Image Viewer */}
            <div className="relative mb-5 overflow-hidden rounded-[28px] bg-[#BFBFBF] sm:rounded-[36px]">
              <div className="aspect-[2/1] w-full">
                <SmartImage
                  src={images[activeIndex]}
                  alt={`${project.name} render ${activeIndex + 1}`}
                  loading="eager"
                  fallbackLabel={project.name}
                  className="h-full w-full object-contain"
                />
              </div>

              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    aria-label="Previous render"
                    onClick={() =>
                      setActiveIndex((prev) => (prev + images.length - 1) % images.length)
                    }
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/85 cursor-pointer sm:left-4"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    aria-label="Next render"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/85 cursor-pointer sm:right-4"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {hasMultipleImages && (
              <div className="mb-6 grid grid-cols-3 gap-3 sm:gap-4">
                {images.map((imgUrl, idx) => (
                  <button
                    key={`${project.id}-thumb-${idx}`}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`aspect-[2/1] overflow-hidden rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                      activeIndex === idx
                        ? 'border-black opacity-100'
                        : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <SmartImage
                      src={imgUrl}
                      alt={`${project.name} thumbnail ${idx + 1}`}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Case Study Details & CTA */}
            <div className="flex flex-col justify-between gap-6 border-t border-black/15 pt-6 md:flex-row md:items-end">
              <div className="max-w-2xl space-y-2.5">
                <p className="text-sm font-light leading-relaxed text-black/85 sm:text-base">
                  {project.summary}
                </p>
                {project.tools && (
                  <p className="text-xs font-medium uppercase tracking-wide text-black/60">
                    Tools: {project.tools}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-black/25 px-6 py-3 text-xs font-medium uppercase tracking-widest text-black transition-colors hover:bg-black/5"
                  >
                    {project.isGithub ? 'View GitHub' : 'Visit Live Site'}
                  </a>
                )}
                {project.adminLink && (
                  <a
                    href={project.adminLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-black/25 px-6 py-3 text-xs font-medium uppercase tracking-widest text-black transition-colors hover:bg-black/5"
                  >
                    Admin Portal
                  </a>
                )}
                <ContactButton
                  label="Inquire Similar"
                  onClick={() => onRequestSimilar(project.name)}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
