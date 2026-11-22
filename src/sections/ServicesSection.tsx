import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { SERVICES } from '../data/portfolioData';

export interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
}) => {
  return (
    <section
      id="services"
      className="relative w-full rounded-t-[40px] bg-[#DADADA] px-5 pb-28 pt-20 text-black sm:rounded-t-[50px] sm:px-8 sm:pb-36 sm:pt-24 md:rounded-t-[60px] md:px-10 md:pb-44 md:pt-32"
    >
      <FadeIn delay={0} y={40}>
        <h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight text-black sm:mb-20 md:mb-28">
          Services
        </h2>
      </FadeIn>

      <div className="mx-auto flex w-full max-w-5xl flex-col">
        {SERVICES.map((service, index) => (
          <FadeIn
            key={service.number}
            delay={index * 0.1}
            y={30}
            className={`group border-t border-[rgba(12,12,12,0.15)] ${
              index === SERVICES.length - 1
                ? 'border-b border-[rgba(12,12,12,0.15)]'
                : ''
            }`}
          >
            <button
              type="button"
              onClick={() => onSelectService?.(service.name)}
              className="flex w-full flex-col items-start gap-4 py-8 text-left transition-colors duration-200 hover:bg-black/[0.03] cursor-pointer sm:flex-row sm:items-center sm:gap-10 sm:py-10 md:gap-16 md:py-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg"
            >
              <span className="shrink-0 text-[clamp(3rem,10vw,140px)] font-black leading-none tracking-tight text-black tabular-nums sm:w-[130px] md:w-[190px]">
                {service.number}
              </span>

              <div className="flex flex-1 flex-col gap-2 sm:gap-3">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase tracking-wide text-black">
                    {service.name}
                  </h3>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-black/30 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black sm:h-6 sm:w-6"
                  />
                </div>
                <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed text-black opacity-70">
                  {service.description}
                </p>
              </div>
            </button>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
