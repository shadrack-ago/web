'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Our Services" },
  { href: "#portfolio", label: "Our Portfolio" },
  { href: "#careers", label: "Careers" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact Us" },
];

interface Testimonial {
  id: string;
  content: string;
  author_name: string;
  author_title: string;
  rating: number;
}

interface Portfolio {
  id: string;
  title: string;
  type: string;
  accent_color: string;
  external_link?: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
}

const services = [
  {
    title: "Corporate Research",
    icon: "📊",
    items: [
      "Market research",
      "Feasibility studies",
      "Policy and program research",
      "Surveys",
    ],
  },
  {
    title: "Academic Research Support",
    icon: "🎓",
    items: [
      "Topic selection",
      "Chapter 1–5 writing",
      "Detailed literature review",
      "Research methodology",
    ],
  },
  {
    title: "Data Analysis Services",
    icon: "📈",
    items: ["Quantitative analysis", "Qualitative analysis", "Data reporting"],
  },
  {
    title: "Editing & Formatting",
    icon: "✏️",
    items: ["Structure & clarity", "Referencing", "Formatting standards"],
  },
  {
    title: "Research Training & Mentorship",
    icon: "👥",
    items: ["Guided practice", "Tooling & methods", "Feedback loops", "Mentorship"],
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchData();
    // Check if admin is logged in
    const adminAuth = localStorage.getItem('adminAuthenticated');
    setIsAdmin(adminAuth === 'true');
  }, []);

  const fetchData = async () => {
    try {
      const [testimonialsRes, portfolioRes, blogRes] = await Promise.all([
        supabase.from('testimonials').select('*').eq('is_active', true).order('created_at', { ascending: false }),
        supabase.from('portfolio').select('*').eq('is_active', true).order('sort_order', { ascending: true }),
        supabase.from('blog_posts').select('id, title, slug, excerpt, published_at').eq('is_published', true).order('published_at', { ascending: false }).limit(3)
      ]);

      if (testimonialsRes.error) throw testimonialsRes.error;
      if (portfolioRes.error) throw portfolioRes.error;
      if (blogRes.error) throw blogRes.error;

      setTestimonials(testimonialsRes.data || []);
      setPortfolio(portfolioRes.data || []);
      setBlogPosts(blogRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to static data if Supabase fails
      setTestimonials([
        { id: '1', content: "Very dependable. Helped me with data analysis.", author_name: "John M.", author_title: "Graduate Student", rating: 5 },
        { id: '2', content: "Professional and high-quality writing.", author_name: "Sarah K.", author_title: "Researcher", rating: 5 },
        { id: '3', content: "Loved the flow of my literature review.", author_name: "Michael T.", author_title: "Postgraduate", rating: 5 },
        { id: '4', content: "Best research guidance I've ever received.", author_name: "Emily R.", author_title: "PhD Candidate", rating: 5 },
      ]);
      setPortfolio([
        { id: '1', title: "Uptake of voluntary MBAO pension savings by informal sector traders", type: "Report", accent_color: "#7fd1b9" },
        { id: '2', title: "Development Finance Institutions & MSME Growth", type: "Policy Brief", accent_color: "#5c1f2d" },
        { id: '3', title: "Instructional supervision practices & teachers' job performance", type: "Academic", accent_color: "#4a1824" },
        { id: '4', title: "Parental involvement & learners' behavior", type: "Study", accent_color: "#7fd1b9" },
        { id: '5', title: "Organizational culture & teachers' job performance", type: "Study", accent_color: "#5c1f2d" },
        { id: '6', title: "Competitive strategies and beverage firms performance", type: "Corporate", accent_color: "#4a1824" },
        { id: '7', title: "Assessing Cambridge Analytica – Facebook Data Scandal", type: "Case Review", accent_color: "#7fd1b9" },
        { id: '8', title: "Evaluating financial performance of Limuru Tea Plc (2021–2023)", type: "Financial", accent_color: "#5c1f2d" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        service_interest: formData.get('service'),
        message: formData.get('message'),
      });

      if (error) throw error;

      alert('Message sent successfully! We will get back to you soon.');
      e.currentTarget.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again or contact us directly.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4ede6] flex items-center justify-center">
        <div className="text-[#1f2428]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4ede6] text-[#1f2428]">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f4ede6]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5c1f2d] text-[#f4ede6] font-serif text-xl font-semibold tracking-tight shadow-sm">
              FR
            </div>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">FAR Researchers</div>
              <div className="text-xs text-[#4a1824]">
                Your dependable research partner
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden gap-5 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 transition-colors hover:bg-black/5"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <a href="#contact" className="btn-primary hidden text-sm md:inline-flex">
            Talk to Us
          </a>

          {isAdmin && (
          <a 
            href="/admin" 
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#5c1f2d] border border-[#5c1f2d]/20 rounded-full hover:bg-[#5c1f2d]/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Admin Dashboard
          </a>
        )}

        {!isAdmin && (
          <a 
            href="/admin/login" 
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#4a1824] border border-[#4a1824]/20 rounded-full hover:bg-[#4a1824]/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Admin
          </a>
        )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-6 bg-[#1f2428] transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-[#1f2428] transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-[#1f2428] transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="flex flex-col border-t border-black/5 bg-[#f4ede6]/95 backdrop-blur">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-6 py-3 text-sm font-medium transition-colors hover:bg-black/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-black/5 px-6 py-3">
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary w-full justify-center text-sm mb-2"
                >
                  Talk to Us
                </a>
                <a
                  href="/admin/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full justify-center text-sm px-4 py-2 font-medium text-[#4a1824] border border-[#4a1824]/20 rounded-full hover:bg-[#4a1824]/10 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <section
          id="home"
          className="grid scroll-mt-28 grid-cols-1 gap-10 rounded-3xl bg-white/70 p-10 shadow-sm backdrop-blur md:grid-cols-2"
        >
          <div className="flex flex-col gap-6">
            <p className="text-sm uppercase tracking-[0.2em] text-[#4a1824]">
              Nairobi, Kenya
            </p>
            <h1 className="font-serif text-4xl leading-tight text-[#1f2428] sm:text-5xl">
              Let us be your dependable research partner.
            </h1>
            <p className="text-lg text-[#2f3438]">
              For Corporate Research, Academic Research, Data Analysis, and
              Research Training.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary">
                Talk to Us
              </a>
              <a href="#portfolio" className="btn-ghost">
                View Portfolio
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#2f3438]">
              <div className="flex items-center gap-2">
                <span className="text-lg">📞</span>
                <span>+254-729-170-159</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">✉️</span>
                <span>info@fresearchers.org</span>
              </div>
            </div>
          </div>
          <div className="relative rounded-3xl border border-black/5 bg-gradient-to-br from-white via-[#f9f4ef] to-[#f3e5df] p-8 shadow-inner">
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(124,26,53,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(127,209,185,0.12),transparent_25%)]" />
            <div className="relative flex h-full flex-col justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 text-xs font-medium text-[#4a1824] shadow-sm ring-1 ring-black/5">
                  FR • Reliable, private, on-time
                </div>
                <p className="mt-6 max-w-md text-lg text-[#2f3438]">
                  We walk with you from idea to delivery—ethically, discreetly,
                  and with clear updates at every milestone.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="card">
                  <p className="text-xs font-semibold text-[#4a1824]">
                    Dependable
                  </p>
                  <p className="mt-2 text-[#2f3438]">
                    We don’t ghost clients. Expect guidance through corrections
                    to final submission.
                  </p>
                </div>
                <div className="card">
                  <p className="text-xs font-semibold text-[#4a1824]">
                    Quality & Integrity
                  </p>
                  <p className="mt-2 text-[#2f3438]">
                    Passion, discipline, and secure handling of your research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mt-16 space-y-10 scroll-mt-28">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4a1824]">
              About Us
            </p>
            <h2 className="font-serif text-3xl text-[#1f2428]">Who We Are</h2>
            <p className="max-w-3xl text-lg text-[#2f3438]">
              Far Researchers is a dependable research and consulting company
              offering corporate and academic research solutions. Our priorities
              are client satisfaction, quality, and reliability.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card md:col-span-1">
              <h3 className="font-serif text-xl text-[#1f2428]">
                Mission Statement
              </h3>
              <p className="mt-3 text-[#2f3438]">
                Combining passion and effort to stitch every word ethically for
                professionals, institutions, and students.
              </p>
            </div>
            <div className="card md:col-span-2">
              <h3 className="font-serif text-xl text-[#1f2428]">
                Why Choose Us
              </h3>
              <ul className="mt-4 grid gap-3 text-[#2f3438] md:grid-cols-2">
                <li>Dependable: we stay with you through final submission.</li>
                <li>
                  Quality: passion, discipline, effort, and consistency in every
                  word.
                </li>
                <li>Integrity: your work remains private and secure.</li>
                <li>
                  Personalized Support: guidance tailored to your needs with
                  clear updates.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="services" className="mt-16 space-y-8 scroll-mt-28">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4a1824]">
                Services
              </p>
              <h2 className="font-serif text-3xl text-[#1f2428]">
                What we deliver
              </h2>
            </div>
            <a href="#contact" className="btn-primary text-sm">
              Need something specific?
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div 
                key={service.title} 
                className="card flex flex-col gap-3 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl animate-pulse">{service.icon}</div>
                  <h3 className="font-serif text-xl text-[#1f2428]">
                    {service.title}
                  </h3>
                </div>
                <ul className="space-y-2 text-[#2f3438]">
                  {service.items.map((item, itemIndex) => (
                    <li 
                      key={item} 
                      className="flex items-start gap-2 transform transition-all duration-300 hover:translate-x-1"
                      style={{
                        animationDelay: `${index * 100 + itemIndex * 50}ms`
                      }}
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#5c1f2d] animate-pulse" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="portfolio" className="mt-16 space-y-8 scroll-mt-28">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4a1824]">
                Portfolio
              </p>
              <h2 className="font-serif text-3xl text-[#1f2428]">
                Selected work
              </h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {portfolio.map((item, index) => (
              <div
                key={item.id}
                className="card flex gap-4 bg-white/90 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <div
                  className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-xl shadow-sm transform transition-transform duration-300 hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${item.accent_color} 0%, #f4ede6 100%)`,
                  }}
                >
                  <div className="flex h-full items-end justify-center bg-black/10 text-[10px] font-semibold uppercase tracking-wide text-white/90">
                    {item.type}
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[#1f2428] font-medium transform transition-all duration-300 hover:text-[#5c1f2d] leading-tight">{item.title}</p>
                    {item.external_link && (
                      <a
                        href={item.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5c1f2d] hover:text-[#4a1824] transform transition-all duration-300 hover:scale-110 flex-shrink-0"
                        title="View external work"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-[#4a1824]">Research profile</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        {blogPosts.length > 0 && (
          <section id="blog" className="mt-16 space-y-8 scroll-mt-28">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4a1824]">
                  Blog
                </p>
                <h2 className="font-serif text-3xl text-[#1f2428]">
                  Latest Insights
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {blogPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="card transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <h3 className="font-serif text-xl text-[#1f2428] mb-3 transform transition-all duration-300 hover:text-[#5c1f2d]">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-[#2f3438] mb-4">{post.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#4a1824]">
                      {new Date(post.published_at).toLocaleDateString()}
                    </span>
                    <a
                      href={`/blog/${post.slug}`}
                      className="text-sm text-[#5c1f2d] hover:underline transform transition-all duration-300 hover:scale-110"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section
          id="careers"
          className="mt-16 grid gap-6 rounded-3xl bg-[#5c1f2d] px-8 py-10 text-[#f4ede6] md:grid-cols-2 scroll-mt-28"
        >
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f4ede6]/80">
              Careers
            </p>
            <h2 className="font-serif text-3xl leading-tight">
              Train With Us → Become a Paid Research Associate
            </h2>
            <div className="space-y-2 text-[#f4ede6]/90">
              <p>What we offer:</p>
              <ul className="space-y-1">
                <li>• Professional research training (topic to data analysis)</li>
                <li>• Flexible, remote opportunities</li>
                <li>• Earn income as a certified research associate</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4 rounded-2xl bg-white/10 p-6 backdrop-blur">
            <p className="text-sm font-semibold text-[#f4ede6]">Who can apply?</p>
            <ul className="space-y-1 text-[#f4ede6]/90">
              <li>• Fresh graduates</li>
              <li>• Postgraduate students</li>
              <li>• Professionals seeking extra income</li>
              <li>• Anyone passionate about research</li>
            </ul>
            <div className="pt-4">
              <a href="#contact" className="btn-ghost border-[#f4ede6] text-[#f4ede6] hover:bg-[#f4ede6] hover:text-[#5c1f2d]">
                Apply on Contact Form
              </a>
            </div>
          </div>
        </section>

        <section id="testimonials" className="mt-16 space-y-8 scroll-mt-28">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4a1824]">
                Testimonials
              </p>
              <h2 className="font-serif text-3xl text-[#1f2428]">
                What our clients say
              </h2>
            </div>
            <a href="#contact" className="btn-ghost text-sm">
              Submit Your Testimonial
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="card bg-white transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                <div className="text-lg animate-pulse">⭐ ⭐ ⭐ ⭐ ⭐</div>
                <p className="mt-3 text-[#2f3438]">{testimonial.content}</p>
                {(testimonial.author_name || testimonial.author_title) && (
                  <div className="mt-4 text-sm text-[#4a1824] transform transition-all duration-300 hover:translate-x-1">
                    {testimonial.author_name && (
                      <div className="font-medium">{testimonial.author_name}</div>
                    )}
                    {testimonial.author_title && (
                      <div>{testimonial.author_title}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="mt-16 grid gap-10 rounded-3xl bg-white/80 p-10 shadow-sm md:grid-cols-2 scroll-mt-28"
        >
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4a1824]">
              Contact Us
            </p>
            <h2 className="font-serif text-3xl text-[#1f2428]">
              Reach out to us
            </h2>
            <div className="space-y-3 text-[#2f3438]">
              <div className="flex items-center gap-3">
                <span className="text-xl">📞</span>
                <span>Phone / WhatsApp: 0729 170 159</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">✉️</span>
                <span>info@fresearchers.org</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <span>Syokimau, Nairobi, Kenya</span>
              </div>
            </div>
            <p className="text-sm text-[#4a1824]">
              We respond quickly with clear next steps.
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleContactSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1f2428]">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  required
                  className="w-full rounded-xl border border-[#d7d1cc] bg-white/80 px-4 py-3 text-sm text-[#1f2428] outline-none transition focus:border-[#5c1f2d]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1f2428]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+254..."
                  className="w-full rounded-xl border border-[#d7d1cc] bg-white/80 px-4 py-3 text-sm text-[#1f2428] outline-none transition focus:border-[#5c1f2d]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1f2428]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-[#d7d1cc] bg-white/80 px-4 py-3 text-sm text-[#1f2428] outline-none transition focus:border-[#5c1f2d]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1f2428]">
                  Service Interested In
                </label>
                <select 
                  name="service"
                  className="w-full rounded-xl border border-[#d7d1cc] bg-white/80 px-4 py-3 text-sm text-[#1f2428] outline-none transition focus:border-[#5c1f2d]"
                >
                  <option>Corporate Research</option>
                  <option>Academic Research</option>
                  <option>Data Analysis</option>
                  <option>Proposal/Project Writing</option>
                  <option>Training (Research Associate)</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1f2428]">
                Other details
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your project or request..."
                className="w-full rounded-xl border border-[#d7d1cc] bg-white/80 px-4 py-3 text-sm text-[#1f2428] outline-none transition focus:border-[#5c1f2d]"
              />
            </div>
            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
        </section>
      </main>

      <footer className="border-t border-black/5 bg-[#f4ede6]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-[#2f3438] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>+254-729-170-159</span>
            <span className="hidden h-3 w-px bg-[#cbbeb5] md:inline" />
            <span>info@fresearchers.org</span>
            <span className="hidden h-3 w-px bg-[#cbbeb5] md:inline" />
            <span>Nairobi, Kenya</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-xs font-semibold text-[#1f2428] transition hover:bg-[#1f2428] hover:text-[#f4ede6]"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-xs font-semibold text-[#1f2428] transition hover:bg-[#1f2428] hover:text-[#f4ede6]"
              aria-label="X"
            >
              X
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-xs font-semibold text-[#1f2428] transition hover:bg-[#1f2428] hover:text-[#f4ede6]"
              aria-label="Facebook"
            >
              f
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-xs font-semibold text-[#1f2428] transition hover:bg-[#1f2428] hover:text-[#f4ede6]"
              aria-label="WhatsApp"
            >
              WA
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
