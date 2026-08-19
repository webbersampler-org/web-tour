import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../lib/data';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials-section" className="py-24 relative overflow-hidden bg-[#0a2118]">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/3 w-[600px] h-[300px] bg-[#70e29b]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#70e29b]/20 border border-[#70e29b]/30 text-xs font-bold text-[#70e29b]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Guest Perspectives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white">
            Stories From Real Expeditions
          </h2>
          <p className="text-emerald-100/80 text-sm sm:text-base font-light leading-relaxed">
            Read reflections from travelers who experienced the Solis standard across private yachts, campervans, and mountain reserves.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-[#143a2e] border border-emerald-400/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 hover:shadow-2xl hover:border-[#70e29b]/40 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#70e29b]/40" />
                </div>

                <p className="text-sm sm:text-base text-emerald-50 font-light italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-emerald-500/20 flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-[#70e29b]/40"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                  <p className="text-[11px] text-[#70e29b] font-semibold">{testimonial.title}</p>
                  <p className="text-[10px] text-emerald-200/70">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
