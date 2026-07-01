import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Services() {
  return (
    <>
      <Header locale="en" />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="px-margin-mobile md:px-margin-desktop pt-section-gap pb-16 max-w-container-max mx-auto">
          <div className="max-w-4xl">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground mb-6">
              Corporate Advisory Services
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Providing integrated solutions that combine financial precision and operational excellence, designed to
              support decision-makers in complex business environments.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-margin-mobile md:px-margin-desktop pb-12 max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Financial Consulting */}
            <div className="bg-surface-container border border-outline-variant/20 p-8 flex flex-col hover:border-secondary/40 transition-colors">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6">account_balance</span>
              <h3 className="font-display-lg text-2xl text-foreground mb-4">Financial Consulting</h3>
              <ul className="space-y-3 font-body-md text-on-surface-variant mb-6 flex-grow">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>Advanced Financial Analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>Performance Evaluation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>Debt Management Strategies
                </li>
              </ul>
              <Link className="inline-flex items-center text-secondary font-label-caps text-label-caps gap-2 group" href="/contact">
                Explore More{" "}
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Finance & Investment */}
            <div className="bg-surface-container border border-outline-variant/20 p-8 flex flex-col hover:border-secondary/40 transition-colors">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6">payments</span>
              <h3 className="font-display-lg text-2xl text-foreground mb-4">Funding & Investment</h3>
              <ul className="space-y-3 font-body-md text-on-surface-variant mb-6 flex-grow">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>Project Structuring
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>Bank Negotiations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>M&A Advisory
                </li>
              </ul>
              <Link className="inline-flex items-center text-secondary font-label-caps text-label-caps gap-2 group" href="/contact">
                Explore More{" "}
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Governance & Institutional */}
            <div className="bg-surface-container border border-outline-variant/20 p-8 flex flex-col hover:border-secondary/40 transition-colors">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6">corporate_fare</span>
              <h3 className="font-display-lg text-2xl text-foreground mb-4">Governance & Development</h3>
              <ul className="space-y-3 font-body-md text-on-surface-variant mb-6 flex-grow">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>Organizational Structures
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>Performance Systems
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>Policies & Procedures
                </li>
              </ul>
              <Link className="inline-flex items-center text-secondary font-label-caps text-label-caps gap-2 group" href="/contact">
                Explore More{" "}
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Digital Transformation */}
            <div className="bg-surface-container border border-outline-variant/20 p-8 flex flex-col hover:border-secondary/40 transition-colors md:col-span-2 lg:col-span-1">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6">precision_manufacturing</span>
              <h3 className="font-display-lg text-2xl text-foreground mb-4">Digital Transformation</h3>
              <ul className="space-y-3 font-body-md text-on-surface-variant mb-6 flex-grow">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>Process Automation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>AI Applications
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>Data Analysis
                </li>
              </ul>
              <Link className="inline-flex items-center text-secondary font-label-caps text-label-caps gap-2 group" href="/contact">
                Explore More{" "}
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Feasibility Studies Teaser */}
            <div className="md:col-span-2 bg-secondary/5 border border-secondary/20 p-8 flex flex-col md:flex-row gap-8 items-center overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-3xl translate-x-1/2 -translate-y-1/2 rounded-full"></div>
              <div className="flex-grow z-10">
                <span className="inline-block px-3 py-1 bg-secondary text-primary-container font-label-caps text-[10px] mb-4">
                  PREMIUM SERVICE
                </span>
                <h3 className="font-display-lg text-2xl text-foreground mb-4">Integrated Feasibility Studies</h3>
                <p className="font-body-md text-on-surface-variant mb-6">
                  We provide comprehensive project analyses ensuring economic, technical, and legal viability before
                  resources are allocated.
                </p>
                <Link
                  className="bg-secondary text-primary-container px-8 py-3 font-label-caps text-label-caps inline-block hover:bg-transparent hover:text-secondary border border-transparent hover:border-secondary transition-all"
                  href="#feasibility"
                >
                  Full Details
                </Link>
              </div>
              <div className="hidden lg:block w-48 h-48 bg-surface-container-high border border-outline-variant/30 -rotate-12 flex items-center justify-center opacity-50">
                <span className="material-symbols-outlined text-secondary text-6xl">fact_check</span>
              </div>
            </div>
          </div>
        </section>

        {/* Deep Dive: Feasibility Studies */}
        <section className="bg-surface-container-low py-section-gap" id="feasibility">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              <div className="lg:col-span-5">
                <h2 className="font-display-lg text-headline-md text-foreground mb-8 leading-tight">
                  Feasibility Studies: The Cornerstone of Every Successful Investment
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                  Why do we need professional feasibility studies? Because project success begins before capital is
                  committed. We provide bankable roadmaps that protect capital from uncalculated risks and identify real
                  growth opportunities in a changing market.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-secondary/10 p-2 h-fit">
                      <span className="material-symbols-outlined text-secondary">trending_up</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Risk Mitigation</h4>
                      <p className="text-body-sm text-on-surface-variant">
                        Identifying potential obstacles and defining contingency plans before implementation.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-secondary/10 p-2 h-fit">
                      <span className="material-symbols-outlined text-secondary">insights</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Resource Optimization</h4>
                      <p className="text-body-sm text-on-surface-variant">
                        Ensuring investments are directed toward the most profitable and sustainable channels.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="bg-background border border-outline-variant/20 p-8">
                  <h3 className="font-label-caps text-label-caps text-secondary mb-8 border-b border-outline-variant/20 pb-4">
                    STUDY COMPONENTS & DELIVERABLES
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div className="group">
                      <div className="text-secondary font-data-tabular mb-2">01. Market Analysis</div>
                      <p className="text-body-sm text-on-surface-variant group-hover:text-foreground transition-colors">
                        Demand estimation, competitor analysis, and targeted marketing strategies.
                      </p>
                    </div>
                    <div className="group">
                      <div className="text-secondary font-data-tabular mb-2">02. Technical Feasibility</div>
                      <p className="text-body-sm text-on-surface-variant group-hover:text-foreground transition-colors">
                        Evaluating operational and technical requirements and supply chains.
                      </p>
                    </div>
                    <div className="group">
                      <div className="text-secondary font-data-tabular mb-2">03. Financial Modeling</div>
                      <p className="text-body-sm text-on-surface-variant group-hover:text-foreground transition-colors">
                        Cash flow projections, payback period, and IRR/NPV analysis.
                      </p>
                    </div>
                    <div className="group">
                      <div className="text-secondary font-data-tabular mb-2">04. Risk Assessment</div>
                      <p className="text-body-sm text-on-surface-variant group-hover:text-foreground transition-colors">
                        Sensitivity analysis, potential risk identification, and mitigation strategies.
                      </p>
                    </div>
                    <div className="group">
                      <div className="text-secondary font-data-tabular mb-2">05. Legal Review</div>
                      <p className="text-body-sm text-on-surface-variant group-hover:text-foreground transition-colors">
                        Compliance with local laws, regulations, and contractual agreements.
                      </p>
                    </div>
                    <div className="group">
                      <div className="text-secondary font-data-tabular mb-2">06. Final Decision Report</div>
                      <p className="text-body-sm text-on-surface-variant group-hover:text-foreground transition-colors">
                        Executive recommendations and a clear roadmap for next steps.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto text-center">
          <h2 className="font-display-lg text-headline-md text-foreground mb-6">
            Are you ready to make your next big decision?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
            Our experts are ready to transform your challenges into sustainable growth opportunities based on
            data-driven consultations.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              className="bg-secondary text-primary-container px-10 py-4 font-label-caps text-label-caps hover:bg-transparent hover:text-secondary border border-transparent hover:border-secondary transition-all"
              href="/contact"
            >
              Book a Consultation
            </Link>
            <Link
              className="border border-outline-variant/40 text-foreground px-10 py-4 font-label-caps text-label-caps hover:bg-surface-container-high transition-all"
              href="#"
            >
              Download Service Profile (PDF)
            </Link>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
