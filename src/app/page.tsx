import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header locale="en" />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative pt-20 pb-section-gap px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-outline-variant/30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-surface-container-high/20 via-background to-background">
          <div
            className="absolute inset-0 z-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #8f9097 1px, transparent 1px), linear-gradient(to bottom, #8f9097 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          ></div>
          <div className="max-w-container-max mx-auto relative z-10 grid md:grid-cols-12 gap-gutter items-center">
            <div className="md:col-span-8 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-surface-container-high border border-outline-variant/30 px-3 py-1 rounded-none self-start">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                  Where Vision Meets Decision
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground leading-tight">
                Decision Center for <br />
                <span className="text-secondary">Financial & Economic Consulting</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                Your strategic partner in crafting the financial future. We provide deep expertise in economic analysis,
                asset restructuring, and supporting sovereign and institutional decisions for exceptional sustainable
                growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/contact"
                  className="bg-secondary text-background hover:brightness-110 transition-all duration-300 px-10 py-4 rounded-none font-label-caps text-label-caps text-center flex items-center justify-center gap-2"
                >
                  Book a Consultation
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </Link>
                <Link
                  href="/contact"
                  className="bg-transparent text-foreground hover:bg-surface-container-high border border-outline-variant/30 transition-all duration-300 px-10 py-4 rounded-none font-label-caps text-label-caps text-center"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
            <div className="md:col-span-4 mt-12 md:mt-0 relative">
              <div className="aspect-[4/5] bg-surface-container-high border border-outline-variant/30 rounded-none relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
                <img
                  alt="Decision Center"
                  className="w-full h-full object-cover transition-all duration-700"
                  src="/Image_euujiweuujiweuuj.png"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-4 border-l-4 border-secondary/30 -z-10"></div>
            </div>
          </div>
        </section>

        {/* Sliding Business SVGs Section */}
        <section className="py-12 bg-surface-container-low border-b border-outline-variant/30 overflow-hidden relative">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="relative w-full overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-container-low to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-container-low to-transparent z-10 pointer-events-none"></div>
              
              <div className="animate-marquee flex gap-16 items-center">
                {/* Loop 1 */}
                {[
                  {
                    title: "Asset Restructuring",
                    desc: "Wealth Optimization",
                    svg: (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e9c176" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" />
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 2v5M12 17v5M2 12h5M17 12h5" />
                        <path d="m19 5-3.5 3.5M8.5 15.5 5 19M5 5l3.5 3.5m7 7L19 19" />
                      </svg>
                    )
                  },
                  {
                    title: "Economic Growth",
                    desc: "Performance Intelligence",
                    svg: (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e9c176" strokeWidth="1.5">
                        <path d="M3 3v18h18" />
                        <path d="m18.5 7-5 5-3-3-4.5 4.5" />
                        <path d="M14 7h4.5V11.5" />
                        <rect x="5" y="14" width="2" height="4" />
                        <rect x="10" y="11" width="2" height="7" />
                        <rect x="15" y="8" width="2" height="10" />
                      </svg>
                    )
                  },
                  {
                    title: "Sovereign Wealth",
                    desc: "Institutional Governance",
                    svg: (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e9c176" strokeWidth="1.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M12 6v10M9 9h6M9 13h6" />
                      </svg>
                    )
                  },
                  {
                    title: "Feasibility Studies",
                    desc: "Rigorous Valuation",
                    svg: (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e9c176" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                        <path d="M16 13H8M16 17H8" />
                        <circle cx="15" cy="11" r="2" />
                        <path d="m17 13 2 2" />
                      </svg>
                    )
                  },
                  {
                    title: "Corporate Governance",
                    desc: "Risk Mitigation",
                    svg: (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e9c176" strokeWidth="1.5">
                        <path d="M12 3v17M12 20H8m4 0h4" />
                        <path d="M6 7h12" />
                        <path d="m6 7 2 6h-4zM18 7l2 6h-4z" />
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <div key={`l1-${index}`} className="flex items-center gap-4 min-w-[280px]">
                    <div className="p-3 bg-background border border-outline-variant/20">
                      {item.svg}
                    </div>
                    <div>
                      <h4 className="font-display-lg text-lg text-foreground font-semibold">{item.title}</h4>
                      <p className="font-body-sm text-xs text-on-surface-variant">{item.desc}</p>
                    </div>
                  </div>
                ))}

                {/* Loop 2 */}
                {[
                  {
                    title: "Asset Restructuring",
                    desc: "Wealth Optimization",
                    svg: (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e9c176" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" />
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 2v5M12 17v5M2 12h5M17 12h5" />
                        <path d="m19 5-3.5 3.5M8.5 15.5 5 19M5 5l3.5 3.5m7 7L19 19" />
                      </svg>
                    )
                  },
                  {
                    title: "Economic Growth",
                    desc: "Performance Intelligence",
                    svg: (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e9c176" strokeWidth="1.5">
                        <path d="M3 3v18h18" />
                        <path d="m18.5 7-5 5-3-3-4.5 4.5" />
                        <path d="M14 7h4.5V11.5" />
                        <rect x="5" y="14" width="2" height="4" />
                        <rect x="10" y="11" width="2" height="7" />
                        <rect x="15" y="8" width="2" height="10" />
                      </svg>
                    )
                  },
                  {
                    title: "Sovereign Wealth",
                    desc: "Institutional Governance",
                    svg: (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e9c176" strokeWidth="1.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M12 6v10M9 9h6M9 13h6" />
                      </svg>
                    )
                  },
                  {
                    title: "Feasibility Studies",
                    desc: "Rigorous Valuation",
                    svg: (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e9c176" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                        <path d="M16 13H8M16 17H8" />
                        <circle cx="15" cy="11" r="2" />
                        <path d="m17 13 2 2" />
                      </svg>
                    )
                  },
                  {
                    title: "Corporate Governance",
                    desc: "Risk Mitigation",
                    svg: (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e9c176" strokeWidth="1.5">
                        <path d="M12 3v17M12 20H8m4 0h4" />
                        <path d="M6 7h12" />
                        <path d="m6 7 2 6h-4zM18 7l2 6h-4z" />
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <div key={`l2-${index}`} className="flex items-center gap-4 min-w-[280px]">
                    <div className="p-3 bg-background border border-outline-variant/20">
                      {item.svg}
                    </div>
                    <div>
                      <h4 className="font-display-lg text-lg text-foreground font-semibold">{item.title}</h4>
                      <p className="font-body-sm text-xs text-on-surface-variant">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Decision Center? Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="font-display-lg text-headline-lg text-foreground mb-4">Why Decision Center?</h2>
              <p className="text-on-surface-variant mb-6">
                In a world of accelerating economic changes, decisions are no longer built on intuition alone, but on
                data, analysis, and strategic vision.
              </p>
              <div className="w-20 h-1 bg-secondary mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 border border-outline-variant/20 hover:border-secondary/50 transition-all duration-300 bg-surface-container-low/50">
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">insights</span>
                <h3 className="font-display-lg text-headline-md text-foreground mb-4 text-2xl">Opportunity Evaluation</h3>
                <p className="text-on-surface-variant">
                  Evaluating investment opportunities and major projects to ensure the highest levels of profitability and
                  growth.
                </p>
              </div>
              <div className="p-8 border border-outline-variant/20 hover:border-secondary/50 transition-all duration-300 bg-surface-container-low/50">
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">account_balance</span>
                <h3 className="font-display-lg text-headline-md text-foreground mb-4 text-2xl">Funding Optimization</h3>
                <p className="text-on-surface-variant">
                  Innovative funding structure solutions that support institutional expansion and reduce capital costs.
                </p>
              </div>
              <div className="p-8 border border-outline-variant/20 hover:border-secondary/50 transition-all duration-300 bg-surface-container-low/50">
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">public</span>
                <h3 className="font-display-lg text-headline-md text-foreground mb-4 text-2xl">Market Insights</h3>
                <p className="text-on-surface-variant">
                  Deep economic analysis of local and regional markets to guide your decisions with confidence.
                </p>
              </div>
              <div className="p-8 border border-outline-variant/20 hover:border-secondary/50 transition-all duration-300 bg-surface-container-low/50">
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">trending_up</span>
                <h3 className="font-display-lg text-headline-md text-foreground mb-4 text-2xl">Growth Strategies</h3>
                <p className="text-on-surface-variant">
                  Building clear roadmaps for sustainable growth in changing economic environments.
                </p>
              </div>
              <div className="p-8 border border-outline-variant/20 hover:border-secondary/50 transition-all duration-300 bg-surface-container-low/50">
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">gavel</span>
                <h3 className="font-display-lg text-headline-md text-foreground mb-4 text-2xl">Governance & Compliance</h3>
                <p className="text-on-surface-variant">
                  Establishing advanced monitoring and compliance systems that protect the organization and enhance its
                  transparency.
                </p>
              </div>
              <div className="p-8 border border-outline-variant/20 hover:border-secondary/50 transition-all duration-300 bg-surface-container-low/50">
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">psychology</span>
                <h3 className="font-display-lg text-headline-md text-foreground mb-4 text-2xl">Economic Intelligence</h3>
                <p className="text-on-surface-variant">
                  Transforming data into executive decisions that support your organization's competitive edge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Methodology Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low border-y border-outline-variant/20">
          <div className="max-w-container-max mx-auto text-center">
            <h2 className="font-display-lg text-headline-lg text-foreground mb-6">Strategic Excellence in Every Step</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
              Our approach is built on precision, data-driven insights, and a deep understanding of the global economic
              landscape.
            </p>
            <div className="flex justify-center">
              <Link
                className="bg-secondary text-background hover:brightness-110 transition-all duration-300 px-10 py-4 rounded-none font-label-caps text-label-caps text-center flex items-center justify-center gap-2"
                href="/methodology"
              >
                Discover Our Methodology
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background">
          <div className="max-w-container-max mx-auto text-center">
            <h2 className="font-display-lg text-headline-lg text-foreground mb-4">Success Partners</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-16 max-w-2xl mx-auto">
              We take pride in serving an elite group of economic entities, investors, and developers to achieve their
              financial aspirations.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-surface-container-low p-6 border border-outline-variant/10 hover:bg-surface-container transition-colors rounded-none flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-secondary">payments</span>
                <span className="font-label-caps text-xs">Investors</span>
              </div>
              <div className="bg-surface-container-low p-6 border border-outline-variant/10 hover:bg-surface-container transition-colors rounded-none flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-secondary">business_center</span>
                <span className="font-label-caps text-xs">Small & Medium Enterprises</span>
              </div>
              <div className="bg-surface-container-low p-6 border border-outline-variant/10 hover:bg-surface-container transition-colors rounded-none flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-secondary">family_restroom</span>
                <span className="font-label-caps text-xs">Family Businesses</span>
              </div>
              <div className="bg-surface-container-low p-6 border border-outline-variant/10 hover:bg-surface-container transition-colors rounded-none flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-secondary">corporate_fare</span>
                <span className="font-label-caps text-xs">Large Institutions</span>
              </div>
              <div className="bg-surface-container-low p-6 border border-outline-variant/10 hover:bg-surface-container transition-colors rounded-none flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-secondary">account_balance</span>
                <span className="font-label-caps text-xs">Government Entities</span>
              </div>
              <div className="bg-surface-container-low p-6 border border-outline-variant/10 hover:bg-surface-container transition-colors rounded-none flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-secondary">assured_workload</span>
                <span className="font-label-caps text-xs">Banks & Financial Institutions</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
