import React, { useState } from 'react';
import { Check, Sparkles, Zap, Shield, HelpCircle, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [annualBilling, setAnnualBilling] = useState(true);

  const plans = [
    {
      name: 'Free',
      tagline: 'Ideal for individuals & everyday questions',
      price: '$0',
      period: 'forever',
      badge: 'Starter',
      popular: false,
      features: [
        'Access to all 10 AI Tools',
        'Gemini 3.8 Flash intelligence',
        'Standard image & PDF uploads (up to 10MB)',
        'Local activity history & favorites',
        'Markdown & code export',
        'Web & mobile responsive'
      ],
      buttonText: 'Current Plan',
      buttonVariant: 'secondary'
    },
    {
      name: 'Pro',
      tagline: 'Supercharged power for students, builders & pros',
      price: annualBilling ? '$15' : '$19',
      period: 'per month',
      badge: 'Most Popular',
      popular: true,
      features: [
        'Unlimited AI queries with zero queue',
        'Priority high-throughput Gemini 3.8 Flash',
        'Expanded 50MB PDF & image uploads',
        'Full document OCR & table extraction',
        'Unlimited history & cloud sync',
        'Early access to new experimental tools',
        'Dedicated 24/7 priority support'
      ],
      buttonText: 'Upgrade to Pro',
      buttonVariant: 'primary'
    },
    {
      name: 'Team',
      tagline: 'Collaborative AI workspace for companies & schools',
      price: annualBilling ? '$39' : '$49',
      period: 'per seat / month',
      badge: 'Enterprise',
      popular: false,
      features: [
        'Everything in Pro, plus:',
        'Shared workspace & team prompt library',
        'Centralized billing & member management',
        'Bring your own custom API keys (optional)',
        'Custom fine-tuned system instructions',
        '99.9% uptime SLA guarantee',
        'Dedicated customer success manager'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary'
    }
  ];

  const faqs = [
    {
      q: 'Which AI model powers LifeAI?',
      a: 'LifeAI is built natively with Google’s latest Gemini 3.8 Flash model, delivering state-of-the-art multimodal reasoning, ultra-fast responses, and high accuracy across coding, math, translation, and writing.'
    },
    {
      q: 'Are file uploads (Images & PDFs) private?',
      a: 'Yes. Your uploaded files and prompts are processed securely over encrypted channels and are never stored or used to train third-party models.'
    },
    {
      q: 'Can I cancel or switch plans at any time?',
      a: 'Absolutely. You can change your subscription tier or cancel renewal at any time directly from your account settings with zero cancellation fees.'
    },
    {
      q: 'Does LifeAI work on mobile phones?',
      a: 'Yes! LifeAI is fully responsive and optimized for mobile devices, tablets, and desktop displays with both dark and light modes.'
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>Simple, Transparent Pricing</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Invest in your productivity.
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3">
          Start for free, then upgrade as your AI workflows expand. No hidden costs.
        </p>

        {/* Billing Switch */}
        <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setAnnualBilling(false)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              !annualBilling
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnualBilling(true)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              annualBilling
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Annual</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-white/20 text-white">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 ${
              plan.popular
                ? 'bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-500 shadow-2xl shadow-indigo-500/10 md:-translate-y-2'
                : 'bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
                {plan.badge}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                {!plan.popular && (
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">{plan.tagline}</p>

              {/* Price */}
              <div className="flex items-baseline gap-1.5 mb-8">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {plan.period}
                </span>
              </div>

              {/* Feature list */}
              <ul className="space-y-3.5 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action button */}
            <button
              onClick={() => onSelectPlan(plan.name)}
              className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                plan.buttonVariant === 'primary'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
              }`}
            >
              <span>{plan.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Got questions? We're here to help.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80"
            >
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
