import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Header locale="en" />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-section-gap overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(185,199,228,0.05)_0%,rgba(1,18,48,0)_70%)] pointer-events-none"></div>
          <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
            <div className="grid grid-cols-12 gap-gutter items-center">
              <div className="col-span-12 lg:col-span-7">
                <img src="/dc-logo.png" alt="Decision Center Logo" className="h-16 w-auto object-contain mb-6" />
                <span className="font-label-caps text-label-caps text-secondary mb-4 block">
                  Where Vision Meets Decision
                </span>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-8 text-balance">
                  About Decision Center
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                  We are more than just a consultancy; we are architects of financial stability. At Decision Center, we
                  believe that real value lies in practical application, not just abstract theories. We focus on delivering
                  tangible results and executable solutions that serve sovereign entities and major corporations.
                </p>
              </div>
              <div className="col-span-12 lg:col-span-5 relative">
                <div className="aspect-square bg-surface-container-high relative overflow-hidden institutional-border p-1">
                  <div
                    className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
                    style={{
                      backgroundImage: "url('/Image_5sz10z5sz10z5sz1.png')",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision - Asymmetric Layout */}
        <section className="py-section-gap bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="grid grid-cols-12 gap-gutter">
              <div className="col-span-12 lg:col-span-6 institutional-border p-12 lg:p-16 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none">
                  <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    account_balance
                  </span>
                </div>
                <h2 className="font-display-lg text-headline-md text-secondary mb-6">Mission</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  Empowering decision-makers with rigorous analytical precision and deep insights that turn challenges
                  into growth opportunities.
                </p>
              </div>
              <div className="col-span-12 lg:col-span-6 institutional-border border-l-0 lg:border-l p-12 lg:p-16 relative overflow-hidden group bg-surface-container-low">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none">
                  <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    visibility
                  </span>
                </div>
                <h2 className="font-display-lg text-headline-md text-secondary mb-6">Vision</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  To be the primary strategic reference for sovereign entities and leadership in the region, crafting
                  financial frameworks that ensure sustainability across generations.
                </p>
              </div>
              <div className="col-span-12 mt-12">
                <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl italic border-l-2 border-secondary pl-8">
                  &quot;Since our inception, we have committed to demystifying financial complexities and transforming them
                  into clear, actionable strategies, drawing on our deep understanding of regional market dynamics and our
                  extensive network of institutional relationships.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Principles Section - Bento Grid */}
        <section className="py-section-gap">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-display-lg text-headline-lg text-foreground mb-4">The Principles That Guide Us</h2>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {/* Value 1 */}
              <div className="institutional-border p-8 gold-border-hover transition-all duration-300">
                <span className="material-symbols-outlined text-secondary mb-6 text-4xl">gavel</span>
                <h3 className="font-display-lg text-headline-md mb-4">Integrity</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Commitment to the highest ethical and professional standards in every consultation, building
                  relationships based on absolute trust.
                </p>
              </div>
              {/* Value 2 */}
              <div className="institutional-border p-8 gold-border-hover transition-all duration-300 bg-surface-container-low">
                <span className="material-symbols-outlined text-secondary mb-6 text-4xl">encrypted</span>
                <h3 className="font-display-lg text-headline-md mb-4">Confidentiality</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Protecting sensitive client information is our top priority, adhering to strict security protocols for
                  sovereign engagements.
                </p>
              </div>
              {/* Value 3 */}
              <div className="institutional-border p-8 gold-border-hover transition-all duration-300">
                <span className="material-symbols-outlined text-secondary mb-6 text-4xl">verified</span>
                <h3 className="font-display-lg text-headline-md mb-4">Professionalism</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Our team embodies discipline and high-tech expertise, delivering outputs that meet the requirements of
                  major international institutions.
                </p>
              </div>
              {/* Value 4 */}
              <div className="institutional-border p-8 gold-border-hover transition-all duration-300 bg-surface-container-low lg:bg-transparent">
                <span className="material-symbols-outlined text-secondary mb-6 text-4xl">insights</span>
                <h3 className="font-display-lg text-headline-md mb-4">Innovation</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Developing analytical tools and financial methodologies that anticipate market shifts and create
                  unprecedented opportunities for our clients.
                </p>
              </div>
              {/* Value 5 */}
              <div className="institutional-border p-8 gold-border-hover transition-all duration-300 lg:bg-surface-container-low">
                <span className="material-symbols-outlined text-secondary mb-6 text-4xl">forest</span>
                <h3 className="font-display-lg text-headline-md mb-4">Sustainability</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Building financial structures that are not just successful today, but resilient and growth-oriented
                  for future generations.
                </p>
              </div>
              {/* Value 6 */}
              <div className="institutional-border p-8 gold-border-hover transition-all duration-300">
                <span className="material-symbols-outlined text-secondary mb-6 text-4xl">diamond</span>
                <h3 className="font-display-lg text-headline-md mb-4">Quality</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Continuous pursuit of perfection in financial modeling and strategic planning, with a focus on precision
                  in every detail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Leadership */}
        <section className="py-section-gap bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="mb-16">
              <h2 className="font-display-lg text-headline-lg text-foreground mb-4 max-w-2xl">
                Decades of Expertise at the Heart of the Financial System
              </h2>
            </div>
            <div className="grid grid-cols-12 gap-gutter institutional-border p-0 overflow-hidden bg-background">
              <div className="col-span-12 lg:col-span-5 h-[400px] lg:h-auto overflow-hidden relative">
                <img
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  alt="Abdullah Al Rushdi"
                  src="/founder-image.jpeg"
                />
                {/* MOVED METRICS BADGE */}
                <div className="absolute bottom-6 right-6 z-20 w-64 bg-surface-container-highest border border-secondary/20 p-8 hidden md:block">
                  <div className="text-secondary font-display-lg text-5xl mb-2">30+</div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant">
                    Years of Institutional Expertise
                  </p>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 p-12 lg:p-16 flex flex-col justify-center">
                <div className="mb-8">
                  <h3 className="font-display-lg text-headline-md text-secondary">Abdullah Al Rushdi</h3>
                  <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mt-1">
                    Founder & Chief Executive Officer
                  </p>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-10 leading-relaxed">
                  Abdullah Al Rushdi brings an exceptional leadership and banking career spanning over 30 years in the
                  financial sector in the Sultanate of Oman and the region. Before founding &apos;Decision Center&apos;, he
                  held high-level leadership positions in prominent national banks, where he managed large operational
                  portfolios and led institutional transformation strategies.
                </p>
                <div>
                  <p className="font-label-caps text-label-caps text-secondary mb-6 uppercase">
                    Strategic Focus Areas
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">Banking Management</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">Corporate Governance & Investment</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">Risk Management (ERM)</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">Capital Structuring & Funding</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">Strategic Policy Development</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">Performance & Loss Strategies</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">Business & Loss Improvement</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">Financial Digital Transformation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Map Section */}
        <section className="py-section-gap relative">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="institutional-border h-[500px] relative overflow-hidden bg-surface-container-low flex items-center justify-center">
              {/* Symbolic background element */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "radial-gradient(#C5A059 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                ></div>
              </div>
              <div className="relative z-10 text-center p-8 bg-background institutional-border border-secondary/30 max-w-lg">
                <h3 className="font-display-lg text-headline-md text-foreground mb-4">
                  Headquartered in the Sultanate of Oman
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Serving the region with global standards and local wisdom.
                </p>
                <p className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                  Sohar, Oman
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
