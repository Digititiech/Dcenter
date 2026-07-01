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
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjMtjEXKk5EzhtpOe6f3JPB3wK4DKOgec5Ey-6ZFaqVCF3xifNhTR-KDVTl55Mnb9k5WcLEZgVXhj3JPB8keM6GrA8X5gIOMrb3gnVP8OVY5JjgncqbysRTA5O5IH3XrZygCIiwA97RtWm-_GRGiFBsMVlh5_IslHqZz4yk_TxZOD66LrbvpskRFwuTg_IqCWbQ4dAS_ttcXjsxBj71H5dRZ5-B2D8RgIdkerpLakIIDWdsarMsHA4095HVHkVNHl6385gR-Q9DBBC"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-4 border-l-4 border-secondary/30 -z-10"></div>
            </div>
          </div>
        </section>

        {/* Numbers that Talk Section */}
        <section className="py-16 bg-surface-container-low border-b border-outline-variant/30 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div className="authority-badge pl-4">
                <h3 className="font-display-lg text-headline-md text-foreground">+30</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Years of Leadership</p>
              </div>
              <div className="authority-badge pl-4">
                <h3 className="font-display-lg text-headline-md text-foreground">100M+</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">OMR Assets Managed</p>
              </div>
              <div className="authority-badge pl-4">
                <h3 className="font-display-lg text-headline-md text-foreground">+32</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Local Branches</p>
              </div>
              <div className="authority-badge pl-4">
                <h3 className="font-display-lg text-headline-md text-foreground">+5</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Governorates Covered</p>
              </div>
              <div className="authority-badge pl-4 col-span-2 md:col-span-1">
                <h3 className="font-display-lg text-headline-md text-foreground">Hundreds</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">of Trusted Clients</p>
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
