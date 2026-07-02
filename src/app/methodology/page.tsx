import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Methodology() {
  return (
    <>
      <Header locale="en" />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-8">
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground mb-6">
                Our Proven Process
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
                Our straightforward 5-step approach ensures your project is backed by solid research and clear strategy,
                designed to help you make confident decisions.
              </p>
            </div>
          </div>
        </section>

        {/* 5-Step Methodology Flow */}
        <section className="px-margin-mobile md:px-margin-desktop pb-section-gap max-w-container-max mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-outline-variant/30 -translate-y-1/2 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-gutter relative z-10">
              {/* Step 1 */}
              <div className="bg-primary-container border border-outline-variant/20 p-6 relative group hover:border-secondary/50 transition-colors duration-300">
                <div className="text-secondary font-display-lg text-headline-md mb-4">01</div>
                <h3 className="font-label-caps text-label-caps text-foreground mb-2">Listen</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  We take the time to fully understand your goals and current situation.
                </p>
                {/* Chevron indicator */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-6 h-6 bg-background border border-outline-variant/20 rounded-full text-secondary">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </div>
              </div>
              {/* Step 2 */}
              <div className="bg-primary-container border border-outline-variant/20 p-6 relative group hover:border-secondary/50 transition-colors duration-300 lg:mt-8">
                <div className="text-secondary font-display-lg text-headline-md mb-4">02</div>
                <h3 className="font-label-caps text-label-caps text-foreground mb-2">Analyze</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  We review the facts and look for the best opportunities for your success.
                </p>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-6 h-6 bg-background border border-outline-variant/20 rounded-full text-secondary">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </div>
              </div>
              {/* Step 3 */}
              <div className="bg-primary-container border border-secondary/50 p-6 relative group lg:-mt-4 shadow-[0_0_15px_rgba(197,160,89,0.1)]">
                <div className="text-secondary font-display-lg text-headline-md mb-4">03</div>
                <h3 className="font-label-caps text-label-caps text-foreground mb-2">Plan</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  We create a clear solution and a detailed roadmap for your project.
                </p>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-6 h-6 bg-background border border-secondary/50 rounded-full text-secondary shadow-[0_0_10px_rgba(197,160,89,0.2)]">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </div>
                {/* Active State Indicator */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary"></div>
              </div>
              {/* Step 4 */}
              <div className="bg-primary-container border border-outline-variant/20 p-6 relative group hover:border-secondary/50 transition-colors duration-300 lg:mt-8">
                <div className="text-secondary font-display-lg text-headline-md mb-4">04</div>
                <h3 className="font-label-caps text-label-caps text-foreground mb-2">Deliver</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  We provide the final results and all the materials you need to move forward.
                </p>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-6 h-6 bg-background border border-outline-variant/20 rounded-full text-secondary">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </div>
              </div>
              {/* Step 5 */}
              <div className="bg-primary-container border border-outline-variant/20 p-6 relative group hover:border-secondary/50 transition-colors duration-300">
                <div className="text-secondary font-display-lg text-headline-md mb-4">05</div>
                <h3 className="font-label-caps text-label-caps text-foreground mb-2">Support</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  We offer ongoing help and advice to ensure your project stays on track.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Decision-Ready Deliverables Dashboard */}
        <section className="px-margin-mobile md:px-margin-desktop pb-section-gap max-w-container-max mx-auto">
          <div className="mb-12 border-b border-outline-variant/30 pb-6 flex justify-between items-end">
            <div>
              <h2 className="font-display-lg text-headline-md text-foreground mb-2">Your Deliverables</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Clear, professional reports and tools you can use immediately.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Main Preview Panel (Bento Large) */}
            <div className="lg:col-span-8 bg-surface-container border border-outline-variant/20 flex flex-col">
              <div className="p-4 border-b border-outline-variant/20 bg-surface-container-high flex justify-between items-center">
                <span className="font-label-caps text-label-caps text-on-surface-variant">Financial Models</span>
                <div className="flex space-x-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">fullscreen</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">download</span>
                </div>
              </div>
              <div className="relative flex-grow min-h-[400px] overflow-hidden">
                {/* Abstract Data Viz / Model Preview */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCml0ilORVcyUeJju1CIYv8bOcpOFXuCOqPBSvvy3o5lUAqZQZzu3kdI2mA-S98o4oq_02Be54n_IOmHc8hYpGzvCu8lSNVzsyIX4tbYbbdY-KIwgk_ehytsztZ_3BPKtWvsSyy7lbl1uFntHbBEDOPcBUxjpFafhgx06l7JiOeAhrkdocrgWGOErKY8LKa2KpIrSvam0KhcapZKOJYEIrs8lE4EhTDXWcUpoazsPZ1gkTA_C5lJxMDUMkc6a70kNb69hqmkiE5wMeP')",
                  }}
                ></div>
                {/* Overlay UI elements */}
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-4">
                  <div className="bg-background/90 backdrop-blur-sm border border-outline-variant/30 p-4">
                    <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">Estimated Value</div>
                    <div className="font-data-tabular text-data-tabular text-secondary text-lg">$142.5M</div>
                  </div>
                  <div className="bg-background/90 backdrop-blur-sm border border-outline-variant/30 p-4">
                    <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">Return Rate</div>
                    <div className="font-data-tabular text-data-tabular text-foreground text-lg">18.4%</div>
                  </div>
                  <div className="bg-background/90 backdrop-blur-sm border border-outline-variant/30 p-4">
                    <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">Time to Profit</div>
                    <div className="font-data-tabular text-data-tabular text-foreground text-lg">4.2 Yrs</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column Stack */}
            <div className="lg:col-span-4 flex flex-col gap-gutter">
              {/* Report Item 1 */}
              <div className="bg-primary-container border border-outline-variant/20 p-6 hover:border-secondary/50 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    gavel
                  </span>
                  <span className="text-xs font-data-tabular text-on-surface-variant px-2 py-1 bg-surface-container-high border border-outline-variant/10">
                    Report
                  </span>
                </div>
                <h4 className="font-body-md text-body-md font-semibold text-foreground mb-2">Expert Reports</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                  Clear, detailed reports that explain our findings and professional advice.
                </p>
                <div className="w-full h-[1px] bg-outline-variant/20 group-hover:bg-secondary/30 transition-colors"></div>
              </div>
              {/* Report Item 2 */}
              <div className="bg-primary-container border border-outline-variant/20 p-6 hover:border-secondary/50 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    description
                  </span>
                  <span className="text-xs font-data-tabular text-on-surface-variant px-2 py-1 bg-surface-container-high border border-outline-variant/10">
                    Presentation
                  </span>
                </div>
                <h4 className="font-body-md text-body-md font-semibold text-foreground mb-2">Investment Plans</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                  Easy-to-read summaries designed to help you attract funding and partners.
                </p>
                <div className="w-full h-[1px] bg-outline-variant/20 group-hover:bg-secondary/30 transition-colors"></div>
              </div>
              {/* Report Item 3 */}
              <div className="bg-primary-container border border-outline-variant/20 p-6 hover:border-secondary/50 transition-all cursor-pointer group flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    shield
                  </span>
                  <span className="text-xs font-data-tabular text-on-surface-variant px-2 py-1 bg-surface-container-high border border-outline-variant/10">
                    Documents
                  </span>
                </div>
                <h4 className="font-body-md text-body-md font-semibold text-foreground mb-2">Bank Applications</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                  All the paperwork and evidence you need for bank loans and approvals.
                </p>
                <div className="w-full h-[1px] bg-outline-variant/20 group-hover:bg-secondary/30 transition-colors"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
