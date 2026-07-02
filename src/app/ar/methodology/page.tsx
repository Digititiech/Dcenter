import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ArabicMethodology() {
  return (
    <>
      <Header locale="ar" />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-8">
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground mb-6">
                منهجية العمل المعتمدة
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
                منهجيتنا المكونة من 5 خطوات تضمن بناء مشروعك على أسس بحثية متينة واستراتيجية واضحة، مصممة لمساعدتك على
                اتخاذ قرارات واثقة.
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
                <h3 className="font-label-caps text-label-caps text-foreground mb-2">الاستماع</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  نكرس الوقت الكافي لفهم أهدافك ووضعك الحالي بشكل كامل.
                </p>
                {/* Chevron indicator (inverted for RTL) */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-6 h-6 bg-background border border-outline-variant/20 rounded-full text-secondary">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </div>
              </div>
              {/* Step 2 */}
              <div className="bg-primary-container border border-outline-variant/20 p-6 relative group hover:border-secondary/50 transition-colors duration-300 lg:mt-8">
                <div className="text-secondary font-display-lg text-headline-md mb-4">02</div>
                <h3 className="font-label-caps text-label-caps text-foreground mb-2">التحليل</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  نراجع الحقائق ونبحث عن أفضل الفرص لضمان نجاحك.
                </p>
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-6 h-6 bg-background border border-outline-variant/20 rounded-full text-secondary">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </div>
              </div>
              {/* Step 3 */}
              <div className="bg-primary-container border border-secondary/50 p-6 relative group lg:-mt-4 shadow-[0_0_15px_rgba(197,160,89,0.1)]">
                <div className="text-secondary font-display-lg text-headline-md mb-4">03</div>
                <h3 className="font-label-caps text-label-caps text-foreground mb-2">التخطيط</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  نبتكر حلولاً واضحة وخارطة طريق مفصلة لمشروعك.
                </p>
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-6 h-6 bg-background border border-secondary/50 rounded-full text-secondary shadow-[0_0_10px_rgba(197,160,89,0.2)]">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </div>
                {/* Active State Indicator */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary"></div>
              </div>
              {/* Step 4 */}
              <div className="bg-primary-container border border-outline-variant/20 p-6 relative group hover:border-secondary/50 transition-colors duration-300 lg:mt-8">
                <div className="text-secondary font-display-lg text-headline-md mb-4">04</div>
                <h3 className="font-label-caps text-label-caps text-foreground mb-2">التنفيذ</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  نقدم النتائج النهائية وكافة الأدوات اللازمة للمضي قدماً.
                </p>
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-6 h-6 bg-background border border-outline-variant/20 rounded-full text-secondary">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </div>
              </div>
              {/* Step 5 */}
              <div className="bg-primary-container border border-outline-variant/20 p-6 relative group hover:border-secondary/50 transition-colors duration-300">
                <div className="text-secondary font-display-lg text-headline-md mb-4">05</div>
                <h3 className="font-label-caps text-label-caps text-foreground mb-2">الدعم</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  نقدم استشارات ودعماً مستمراً لضمان بقاء مشروعك في المسار الصحيح.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Decision-Ready Deliverables Dashboard */}
        <section className="px-margin-mobile md:px-margin-desktop pb-section-gap max-w-container-max mx-auto">
          <div className="mb-12 border-b border-outline-variant/30 pb-6 flex justify-between items-end">
            <div>
              <h2 className="font-display-lg text-headline-md text-foreground mb-2">مخرجاتنا الاستشارية</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                تقارير وأدوات مهنية واضحة جاهزة للتطبيق الفوري.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Main Preview Panel (Bento Large) */}
            <div className="lg:col-span-8 bg-surface-container border border-outline-variant/20 flex flex-col">
              <div className="p-4 border-b border-outline-variant/20 bg-surface-container-high flex justify-between items-center">
                <span className="font-label-caps text-label-caps text-on-surface-variant">النماذج المالية</span>
                <div className="flex space-x-reverse space-x-2">
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
                    <div className="font-label-caps text-label-caps text-on-surface-variant mb-1 font-semibold">
                      القيمة التقديرية
                    </div>
                    <div className="font-data-tabular text-data-tabular text-secondary text-lg" dir="ltr">
                      142.5M $
                    </div>
                  </div>
                  <div className="bg-background/90 backdrop-blur-sm border border-outline-variant/30 p-4">
                    <div className="font-label-caps text-label-caps text-on-surface-variant mb-1 font-semibold">
                      معدل العائد
                    </div>
                    <div className="font-data-tabular text-data-tabular text-foreground text-lg" dir="ltr">
                      18.4%
                    </div>
                  </div>
                  <div className="bg-background/90 backdrop-blur-sm border border-outline-variant/30 p-4">
                    <div className="font-label-caps text-label-caps text-on-surface-variant mb-1 font-semibold">
                      فترة الاسترداد
                    </div>
                    <div className="font-data-tabular text-data-tabular text-foreground text-lg">4.2 سنوات</div>
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
                    تقرير
                  </span>
                </div>
                <h4 className="font-body-md text-body-md font-semibold text-foreground mb-2">تقارير الخبراء</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                  تقارير مفصلة توضح نتائج التحليل والتوصيات المهنية.
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
                    عرض تقديمي
                  </span>
                </div>
                <h4 className="font-body-md text-body-md font-semibold text-foreground mb-2">خطط الاستثمار</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                  ملخصات تنفيذية مصممة لمساعدتك في جذب التمويل والشركاء.
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
                    مستندات
                  </span>
                </div>
                <h4 className="font-body-md text-body-md font-semibold text-foreground mb-2">الطلبات المصرفية</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                  كافة الوثائق والمستندات اللازمة للحصول على التمويلات والموافقات البنكية.
                </p>
                <div className="w-full h-[1px] bg-outline-variant/20 group-hover:bg-secondary/30 transition-colors"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="ar" />
    </>
  );
}
