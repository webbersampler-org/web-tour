import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [destinationInterest, setDestinationInterest] = useState('Alps & Glaciers');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact-section" className="py-24 relative overflow-hidden bg-[#0f2e24]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[300px] bg-[#70e29b]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#70e29b]/20 border border-[#70e29b]/30 text-xs font-bold text-[#70e29b]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Private Consultation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-tight">
              Design Your Custom Expedition
            </h2>

            <p className="text-emerald-100/80 text-sm sm:text-base font-light leading-relaxed">
              Looking for a custom wilderness route, multi-country campervan convoy, or private charter? Our expedition specialists are available 24/7.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#143a2e] border border-emerald-400/20">
                <div className="w-10 h-10 rounded-xl bg-[#70e29b] text-[#0f2e24] flex items-center justify-center shrink-0 font-bold">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-emerald-200 font-bold uppercase tracking-wider">Direct Concierge VIP</span>
                  <p className="text-sm font-bold text-white mt-0.5">+41 44 892 3400 (Zurich / Global)</p>
                  <p className="text-xs text-emerald-300/70">Mon – Sun, 24 Hours Active</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#143a2e] border border-emerald-400/20">
                <div className="w-10 h-10 rounded-xl bg-[#70e29b] text-[#0f2e24] flex items-center justify-center shrink-0 font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-emerald-200 font-bold uppercase tracking-wider">Bespoke Inquiry Bureau</span>
                  <p className="text-sm font-bold text-white mt-0.5">concierge@solis-expeditions.com</p>
                  <p className="text-xs text-emerald-300/70">Average response time: &lt; 30 minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#143a2e] border border-emerald-400/20 rounded-3xl p-6 sm:p-10 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-2xl bg-[#70e29b] text-[#0f2e24] flex items-center justify-center mx-auto shadow-lg shadow-[#70e29b]/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white">Inquiry Received</h3>
                  <p className="text-sm text-emerald-100/90 max-w-md mx-auto font-light">
                    Thank you, <strong className="text-white">{name}</strong>. An expedition designer is preparing custom itinerary options for you.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-[#70e29b] text-[#0f2e24] font-bold text-xs hover:bg-[#58cc84] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold font-display text-white mb-2">
                    Request an Expedition Consultation
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        placeholder="e.g. Alex Henderson"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#0a2118] border border-emerald-500/30 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-emerald-300/40 focus:outline-none focus:border-[#70e29b] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        placeholder="alex@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#0a2118] border border-emerald-500/30 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-emerald-300/40 focus:outline-none focus:border-[#70e29b] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-interest" className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1.5">
                      Region / Expedition Preference
                    </label>
                    <select
                      id="contact-interest"
                      value={destinationInterest}
                      onChange={(e) => setDestinationInterest(e.target.value)}
                      className="w-full bg-[#0a2118] border border-emerald-500/30 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#70e29b] transition-colors cursor-pointer"
                    >
                      <option value="Alps & Glaciers" className="bg-[#0f2e24]">European Alps & Glacial Valleys (Switzerland / Italy)</option>
                      <option value="Japanese Ryokans" className="bg-[#0f2e24]">Japan Mountain Onsens & Kyoto Forests</option>
                      <option value="Nordic Aurora" className="bg-[#0f2e24]">Iceland Glass Domes & Arctic Fjords</option>
                      <option value="Safari Reserve" className="bg-[#0f2e24]">Serengeti & African Wilderness Lodges</option>
                      <option value="Polynesia Island" className="bg-[#0f2e24]">French Polynesia Overwater Atolls</option>
                      <option value="Custom Expedition" className="bg-[#0f2e24]">Completely Custom Worldwide Itinerary</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1.5">
                      Tell us about your envisioned trip
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="Share estimated travel dates, group size, special milestones, or preferred wilderness experiences..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#0a2118] border border-emerald-500/30 rounded-2xl p-4 text-sm text-white placeholder:text-emerald-300/40 focus:outline-none focus:border-[#70e29b] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-contact-btn"
                    className="w-full py-4 rounded-full bg-[#70e29b] text-[#0f2e24] hover:bg-[#58cc84] font-extrabold text-sm tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Consultation Request</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
