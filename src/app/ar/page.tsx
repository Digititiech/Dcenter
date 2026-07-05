import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ArabicHome() {
  return (
    <>
      <Header locale="ar" />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-outline-variant/30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-surface-container-high/20 via-background to-background">
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
                  حيث تلتقي الرؤية بالقرار
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground leading-tight">
                مركز القرار <br />
                <span className="text-secondary">للاستشارات المالية والاقتصادية</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                شريككم الاستراتيجي في صياغة المستقبل المالي. نوفر خبرات معمقة في التحليل الاقتصادي، وهيكلة الأصول، ودعم
                القرارات السيادية والمؤسسية لتحقيق استدامة اقتصادية استثنائية.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/ar/contact"
                  className="bg-secondary text-background hover:brightness-110 transition-all duration-300 px-10 py-4 rounded-none font-label-caps text-label-caps text-center flex items-center justify-center gap-2"
                >
                  احجز استشارة
                  <span className="material-symbols-outlined text-xl">arrow_back</span>
                </Link>
                <Link
                  href="/ar/contact"
                  className="bg-transparent text-foreground hover:bg-surface-container-high border border-outline-variant/30 transition-all duration-300 px-10 py-4 rounded-none font-label-caps text-label-caps text-center"
                >
                  اطلب عرض سعر
                </Link>
              </div>
            </div>
            <div className="md:col-span-4 mt-12 md:mt-0 relative">
              <div className="aspect-[4/5] bg-surface-container-high border border-outline-variant/30 rounded-none relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
                <video
                  className="w-full h-full object-cover"
                  src="/intro-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-4 border-r-4 border-secondary/30 -z-10"></div>
            </div>
          </div>
        </section>

        {/* Sliding Business SVGs Section */}
        <section className="py-12 bg-surface-container-low border-b border-outline-variant/30 overflow-hidden relative" dir="ltr">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="relative w-full overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-container-low to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-container-low to-transparent z-10 pointer-events-none"></div>
              
              <div className="animate-marquee flex gap-16 items-center">
                {/* Loop 1 */}
                {[
                  {
                    title: "إعادة هيكلة الأصول",
                    desc: "الاستخدام الأمثل للثروة",
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
                    title: "النمو الاقتصادي",
                    desc: "ذكاء الأداء المالي",
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
                    title: "الثروة السيادية",
                    desc: "الحوكمة المؤسسية",
                    svg: (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e9c176" strokeWidth="1.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M12 6v10M9 9h6M9 13h6" />
                      </svg>
                    )
                  },
                  {
                    title: "دراسات الجدوى",
                    desc: "تقييم دقيق للمشاريع",
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
                    title: "حوكمة الشركات",
                    desc: "تخفيف وإدارة المخاطر",
                    svg: (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e9c176" strokeWidth="1.5">
                        <path d="M12 3v17M12 20H8m4 0h4" />
                        <path d="M6 7h12" />
                        <path d="m6 7 2 6h-4zM18 7l2 6h-4z" />
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <div key={`l1-${index}`} className="flex items-center gap-4 min-w-[280px]" style={{ direction: "rtl" }}>
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
                    title: "إعادة هيكلة الأصول",
                    desc: "الاستخدام الأمثل للثروة",
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
                    title: "النمو الاقتصادي",
                    desc: "ذكاء الأداء المالي",
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
                    title: "الثروة السيادية",
                    desc: "الحوكمة المؤسسية",
                    svg: (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e9c176" strokeWidth="1.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M12 6v10M9 9h6M9 13h6" />
                      </svg>
                    )
                  },
                  {
                    title: "دراسات الجدوى",
                    desc: "تقييم دقيق للمشاريع",
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
                    title: "حوكمة الشركات",
                    desc: "تخفيف وإدارة المخاطر",
                    svg: (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e9c176" strokeWidth="1.5">
                        <path d="M12 3v17M12 20H8m4 0h4" />
                        <path d="M6 7h12" />
                        <path d="m6 7 2 6h-4zM18 7l2 6h-4z" />
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <div key={`l2-${index}`} className="flex items-center gap-4 min-w-[280px]" style={{ direction: "rtl" }}>
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
            <div className="text-center mb-20">
              <h2 className="font-display-lg text-headline-lg text-foreground mb-4">لماذا مركز القرار؟</h2>
              <div className="w-20 h-1 bg-secondary mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 border border-outline-variant/20 hover:border-secondary/50 transition-all duration-300 bg-surface-container-low/50">
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">insights</span>
                <h3 className="font-display-lg text-headline-md text-foreground mb-4 text-2xl">تقييم الفرص</h3>
                <p className="text-on-surface-variant">
                  تقييم دقيق للفرص الاستثمارية والمشاريع لضمان أقصى درجات الربحية والنمو.
                </p>
              </div>
              <div className="p-8 border border-outline-variant/20 hover:border-secondary/50 transition-all duration-300 bg-surface-container-low/50">
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">account_balance</span>
                <h3 className="font-display-lg text-headline-md text-foreground mb-4 text-2xl">تحسين التمويل</h3>
                <p className="text-on-surface-variant">
                  هيكلة حلول تمويلية مبتكرة تدعم التوسع المؤسسي وتخفض تكلفة رأس المال.
                </p>
              </div>
              <div className="p-8 border border-outline-variant/20 hover:border-secondary/50 transition-all duration-300 bg-surface-container-low/50">
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">public</span>
                <h3 className="font-display-lg text-headline-md text-foreground mb-4 text-2xl">فهم الأسواق</h3>
                <p className="text-on-surface-variant">
                  تحليلات اقتصادية معمقة للأسواق المحلية والإقليمية لتوجيه قراراتكم بثقة.
                </p>
              </div>
              <div className="p-8 border border-outline-variant/20 hover:border-secondary/50 transition-all duration-300 bg-surface-container-low/50">
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">trending_up</span>
                <h3 className="font-display-lg text-headline-md text-foreground mb-4 text-2xl">استراتيجيات النمو</h3>
                <p className="text-on-surface-variant">
                  بناء خارطة طريق واضحة للنمو المستدام في بيئات اقتصادية متغيرة.
                </p>
              </div>
              <div className="p-8 border border-outline-variant/20 hover:border-secondary/50 transition-all duration-300 bg-surface-container-low/50">
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">gavel</span>
                <h3 className="font-display-lg text-headline-md text-foreground mb-4 text-2xl">الحوكمة والامتثال</h3>
                <p className="text-on-surface-variant">
                  تأسيس نظم رقابة وامتثال متطورة تحمي المؤسسة وتعزز شفافيتها.
                </p>
              </div>
              <div className="p-8 border border-outline-variant/20 hover:border-secondary/50 transition-all duration-300 bg-surface-container-low/50">
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">psychology</span>
                <h3 className="font-display-lg text-headline-md text-foreground mb-4 text-2xl">الذكاء الاقتصادي</h3>
                <p className="text-on-surface-variant">
                  تحويل البيانات إلى قرارات تنفيذية تدعم التفوق التنافسي لمؤسستكم.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low border-y border-outline-variant/20">
          <div className="max-w-container-max mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display-lg text-headline-lg text-foreground mb-6">منهجية العمل</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
                  نتبع مساراً استشارياً دقيقاً يضمن ترجمة التحديات إلى فرص نجاح ملموسة عبر أربع مراحل تكاملية.
                </p>
                <div className="space-y-12">
                  <div className="flex gap-6 items-start">
                    <span className="font-display-lg text-5xl step-number opacity-50">01</span>
                    <div>
                      <h4 className="font-display-lg text-2xl text-foreground mb-2">الفهم (نستمع)</h4>
                      <p className="text-on-surface-variant">
                        تحليل عميق لاحتياجاتكم وأهدافكم لفهم السياق التشغيلي والمالي.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <span className="font-display-lg text-5xl step-number opacity-50">02</span>
                    <div>
                      <h4 className="font-display-lg text-2xl text-foreground mb-2">التحليل (نشخص)</h4>
                      <p className="text-on-surface-variant">
                        استخدام أدوات تحليلية متقدمة لتحديد الفجوات والفرص الكامنة.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <span className="font-display-lg text-5xl step-number opacity-50">03</span>
                    <div>
                      <h4 className="font-display-lg text-2xl text-foreground mb-2">الحلول (نبني)</h4>
                      <p className="text-on-surface-variant">
                        صياغة استراتيجيات وحلول مالية مخصصة وقابلة للتطبيق العملي.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <span className="font-display-lg text-5xl step-number opacity-50">04</span>
                    <div>
                      <h4 className="font-display-lg text-2xl text-foreground mb-2">التنفيذ (ندعم)</h4>
                      <p className="text-on-surface-variant">مرافقة دائمة خلال مرحلة التطبيق لضمان تحقيق النتائج المرجوة.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex justify-center">
                <div className="aspect-square bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/20 p-8 w-full max-w-md relative">
                  <div className="w-full h-full rounded-full border-4 border-dashed border-secondary/20 animate-[spin_20s_linear_infinite] absolute inset-0"></div>
                  <img
                    alt="Strategic Process"
                    className="w-full h-full object-cover rounded-full opacity-70"
                    src="/methodology_illustration.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background">
          <div className="max-w-container-max mx-auto text-center">
            <h2 className="font-display-lg text-headline-lg text-foreground mb-4">شركاء النجاح</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-16 max-w-2xl mx-auto">
              نعتز بخدمة نخبة من الكيانات الاقتصادية والمستثمرين لتمكينهم من تحقيق تطلعاتهم المالية.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-surface-container-low p-6 border border-outline-variant/10 hover:bg-surface-container transition-colors rounded-none flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-secondary">payments</span>
                <span className="font-label-caps text-xs">المستثمرون</span>
              </div>
              <div className="bg-surface-container-low p-6 border border-outline-variant/10 hover:bg-surface-container transition-colors rounded-none flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-secondary">business_center</span>
                <span className="font-label-caps text-xs">الشركات الصغيرة والمتوسطة</span>
              </div>
              <div className="bg-surface-container-low p-6 border border-outline-variant/10 hover:bg-surface-container transition-colors rounded-none flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-secondary">family_restroom</span>
                <span className="font-label-caps text-xs">الشركات العائلية</span>
              </div>
              <div className="bg-surface-container-low p-6 border border-outline-variant/10 hover:bg-surface-container transition-colors rounded-none flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-secondary">corporate_fare</span>
                <span className="font-label-caps text-xs">المؤسسات الكبرى</span>
              </div>
              <div className="bg-surface-container-low p-6 border border-outline-variant/10 hover:bg-surface-container transition-colors rounded-none flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-secondary">account_balance</span>
                <span className="font-label-caps text-xs">الجهات الحكومية</span>
              </div>
              <div className="bg-surface-container-low p-6 border border-outline-variant/10 hover:bg-surface-container transition-colors rounded-none flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-secondary">assured_workload</span>
                <span className="font-label-caps text-xs">البنوك والمؤسسات المالية</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="ar" />
    </>
  );
}
