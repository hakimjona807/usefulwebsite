import React, { useState } from 'react';
import { Sparkles, Heart, Mail, Shield, FileCheck, Info, X, Send, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'about' | 'privacy' | 'terms' | 'contact' | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setActiveModal(null);
    }, 2500);
  };

  return (
    <>
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
            {/* Brand column */}
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Life<span className="text-indigo-600 dark:text-indigo-400">AI</span>
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                The all-in-one AI assistant designed for millions of learners, creators, and builders worldwide. Powered by Gemini 3.8 Flash.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Made for global builders</span>
                <span>•</span>
                <span>Fast & Accessible</span>
              </div>
            </div>

            {/* Links columns */}
            <div className="flex flex-wrap gap-12 sm:gap-16">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                  Company
                </h4>
                <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <li>
                    <button
                      onClick={() => setActiveModal('about')}
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      About LifeAI
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal('contact')}
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      Contact & Support
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                  Legal & Trust
                </h4>
                <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                  <li>
                    <button
                      onClick={() => setActiveModal('privacy')}
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveModal('terms')}
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      Terms of Service
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-100 dark:border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} LifeAI Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>GDPR & CCPA Compliant</span>
              <span>•</span>
              <span>Zero-Data Retention Option</span>
            </div>
          </div>
        </div>
      </footer>

      {/* About Modal */}
      {activeModal === 'about' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">About LifeAI</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              LifeAI was engineered with a single guiding mission: to democratize world-class artificial intelligence by consolidating essential AI capabilities into one unified, ultra-fast interface.
            </p>
            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 mb-6 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl">
              <div>
                <strong className="text-slate-900 dark:text-white">🚀 Gemini 3.8 Flash Engine:</strong>
                <p className="text-xs text-slate-500 dark:text-slate-400">High-speed reasoning, coding, and multilingual knowledge.</p>
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">🎯 10 Domain-Specific Studios:</strong>
                <p className="text-xs text-slate-500 dark:text-slate-400">Fine-tuned system architectures tailored for homework, coding, writing, and calculations.</p>
              </div>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Privacy Policy</h3>
            <p className="text-xs text-slate-400 mb-4">Last updated: September 2026</p>
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              <p>
                At LifeAI, we respect your privacy. Here is our straightforward promise:
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white">1. Data Ownership</h4>
              <p>
                You retain complete ownership over all text, files, and media submitted to LifeAI. We do not sell your personal data.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white">2. No AI Training on Private Data</h4>
              <p>
                Your private prompts, attached documents, and answers are never used to train public foundational AI models.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white">3. Local Storage First</h4>
              <p>
                Your activity history and favorites are stored locally in your browser session for maximum user privacy.
              </p>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Terms of Service</h3>
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              <p>
                By utilizing LifeAI services, you agree to these fair usage principles:
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white">1. Permitted Use</h4>
              <p>
                LifeAI provides assistance for academic learning, professional writing, code development, and problem solving. You agree not to use the service for generating harmful, illicit, or deceptive materials.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white">2. AI Output Verification</h4>
              <p>
                While Gemini 3.8 Flash achieves high accuracy, outputs should be reviewed for critical medical, legal, or high-stakes financial determinations.
              </p>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer"
            >
              I Accept Terms
            </button>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Get in Touch</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
              Have feedback, tool requests, or enterprise inquiries? Send us a message!
            </p>

            {contactSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">Message Received!</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                  Thank you for reaching out. A member of the LifeAI engineering team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Message / Feedback
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us what you love or what tool you would like to see next..."
                    className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
