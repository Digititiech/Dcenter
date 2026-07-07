import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ArabicAbout() {
  return (
    <>
      <Header locale="ar" />
      <main className="flex-grow pt-20">
        {/* Section 1: About Decision Center */}
        <section className="relative py-section-gap overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(233, 193, 118, 0.1) 0%, transparent 50%)",
            }}
          ></div>
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
              <div className="lg:col-span-6 space-y-8">
                <img src="/dc-logo.png" alt="Decision Center Logo" className="h-16 w-auto object-contain mb-2" />
                <span className="font-label-caps text-label-caps text-secondary tracking-widest block">
                  نظرة عامة مؤسسية
                </span>
                <h1 className="font-display-lg text-display-lg text-foreground leading-tight">
                  حول مركز <br />
                  <span className="text-secondary">اتخاذ القرار</span>
                </h1>
                <div className="w-20 h-1 bg-secondary"></div>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-xl">
                  نحن لسنا مجرد شركة استشارية؛ نحن مهندسو الاستقرار المالي. في مركز اتخاذ القرار، نؤمن بأن القيمة
                  الحقيقية تكمن في التطبيق العملي لا في النظريات المجردة. نحن نركز على النتائج الملموسة والحلول القابلة
                  للتنفيذ التي تخدم الكيانات السيادية والمؤسسات الكبرى.
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-xl">
                  منذ تأسيسنا، التزمنا بتفكيك التعقيدات المالية وتحويلها إلى استراتيجيات نمو واضحة، معتمدين على فهمنا
                  العميق لديناميكيات السوق الإقليمية وشبكة علاقاتنا المؤسسية الواسعة.
                </p>
              </div>
              <div className="lg:col-span-6 relative">
                <div className="aspect-square bg-surface-container-high relative overflow-hidden institutional-border p-1">
                  <div
                    className="w-full h-full bg-cover bg-center transition-all duration-700"
                    style={{
                      backgroundImage: "url('/Image_5sz10z5sz10z5sz1.png')",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Founder Profile */}
        <section className="py-section-gap bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="mb-16">
              <h2 className="font-display-lg text-headline-lg text-foreground mb-4 max-w-2xl">
                عقود من الخبرة في قلب النظام المالي
              </h2>
            </div>
            <div className="grid grid-cols-12 gap-gutter institutional-border p-0 overflow-hidden bg-background">
              <div className="col-span-12 lg:col-span-5 h-[400px] lg:h-auto overflow-hidden relative">
                <img
                  className="w-full h-full object-cover transition-all duration-700"
                  alt="Abdullah Al Rushdi"
                  src="/founder-image.jpeg"
                />
                {/* MOVED METRICS BADGE */}
                <div className="absolute bottom-6 right-6 z-20 w-64 bg-surface-container-highest border border-secondary/20 p-8 hidden md:block">
                  <div className="text-secondary font-display-lg text-5xl mb-2">30+</div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant">
                    عاماً من الخبرة المؤسسية المتراكمة
                  </p>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 p-12 lg:p-16 flex flex-col justify-center">
                <div className="mb-8">
                  <h3 className="font-display-lg text-headline-md text-secondary">عبدالله الروشدي</h3>
                  <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mt-1 font-semibold">
                    المؤسس والرئيس التنفيذي
                  </p>
                </div>
                <div className="font-body-md text-body-md text-on-surface-variant mb-10 leading-relaxed space-y-6">
                  <p>
                    يتمتع عبدالله الروشدي بمسيرة مهنية استثنائية تمتد لأكثر من 30 عاماً في قمة القطاع المالي والمصرفي في
                    سلطنة عُمان والمنطقة. قبل تأسيس &quot;مركز اتخاذ القرار&quot;، شغل مناصب قيادية عليا في أبرز المؤسسات
                    المالية، بما في ذلك بنك مسقط وبنك ظفار.
                  </p>
                  <p>
                    تميزت فترة عمله بقيادة استراتيجيات التحول الكبرى، وإدارة مخاطر المؤسسات (ERM) وإدارة محافظ قروض ضخمة، وهيكلة تمويل المشاريع الوطنية الاستراتيجية.
                  </p>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-secondary mb-6 uppercase">
                    مجالات التركيز الاستراتيجي
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">الإدارة المصرفية العليا</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">حوكمة الشركات والامتثال والاستثمار</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">إدارة مخاطر المؤسسات (ERM)</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">هيكلة رأس المال والتمويل المعقد</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">تطوير السياسات المالية السيادية</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">استراتيجيات مواءمة الثروة والأداء</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">تحسين أداء الأرباح والخسائر والنمو</span>
                    </div>
                    <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-2">
                      <span className="w-1.5 h-1.5 bg-secondary"></span>
                      <span className="font-body-sm text-body-sm">التحول الرقمي للقطاع المالي</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Vision, Mission & Values */}
        <section className="bg-surface-container-lowest py-section-gap border-y border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary text-4xl">visibility</span>
                  <h2 className="font-display-lg text-headline-md text-foreground">رؤيتنا</h2>
                </div>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  أن نكون المرجع الاستراتيجي الأول للكيانات السيادية وقادة المؤسسات في المنطقة، من خلال صياغة أطر مالية
                  تضمن الاستدامة عبر الأجيال وتحقق ميزات تنافسية حاسمة.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary text-4xl">flag</span>
                  <h2 className="font-display-lg text-headline-md text-foreground">مهمتنا</h2>
                </div>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  تمكين صناع القرار من خلال دقة تحليلية صارمة، ومعلومات استخباراتية عميقة عن السوق، وتنفيذ خالٍ من العيوب
                  للهياكل المالية المعقدة التي تواجه تحديات العصر.
                </p>
              </div>
            </div>
            <div className="text-center mb-16">
              <span className="font-label-caps text-label-caps text-secondary block mb-4">قيمنا الراسخة</span>
              <h2 className="font-display-lg text-headline-lg text-foreground">المبادئ التي تقودنا</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {/* Value Items */}
              <div className="p-8 bg-background institutional-border hover:border-secondary transition-all group">
                <div className="text-secondary mb-6">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    gavel
                  </span>
                </div>
                <h3 className="font-display-lg text-2xl mb-4 text-foreground">النزاهة</h3>
                <p className="font-body-sm text-on-surface-variant">
                  الالتزام بأعلى المعايير الأخلاقية والمهنية في كل تعامل واستشارة، لبناء علاقات قائمة على الثقة المطلقة.
                </p>
              </div>
              <div className="p-8 bg-background institutional-border hover:border-secondary transition-all group">
                <div className="text-secondary mb-6">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    lock
                  </span>
                </div>
                <h3 className="font-display-lg text-2xl mb-4 text-foreground">السرية</h3>
                <p className="font-body-sm text-on-surface-variant">
                  حماية المعلومات الحساسة لعملائنا هي أولوية قصوى، حيث نتبع بروتوكولات صارمة لضمان خصوصية الارتباطات
                  السيادية.
                </p>
              </div>
              <div className="p-8 bg-background institutional-border hover:border-secondary transition-all group">
                <div className="text-secondary mb-6">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                </div>
                <h3 className="font-display-lg text-2xl mb-4 text-foreground">الاحترافية</h3>
                <p className="font-body-sm text-on-surface-variant">
                  الاحترافية: فريقنا يجسد الانضباط والخبرة التقنية العالية، مما يضمن تقديم مخرجات بمستوى يليق بكبرى المؤسسات العالمية.
                </p>
              </div>
              <div className="p-8 bg-background institutional-border hover:border-secondary transition-all group">
                <div className="text-secondary mb-6">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    workspace_premium
                  </span>
                </div>
                <h3 className="font-display-lg text-2xl mb-4 text-foreground">الجودة</h3>
                <p className="font-body-sm text-on-surface-variant">
                  السعي الدائم نحو الكمال في النمذجة المالية والتخطيط الاستراتيجي، مع التركيز على الدقة في كل التفاصيل.
                </p>
              </div>
              <div className="p-8 bg-background institutional-border hover:border-secondary transition-all group">
                <div className="text-secondary mb-6">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    lightbulb
                  </span>
                </div>
                <h3 className="font-display-lg text-2xl mb-4 text-foreground">الابتكار</h3>
                <p className="font-body-sm text-on-surface-variant">
                  تطوير أدوات تحليلية ومنهجيات مالية مبتكرة تسبق تحولات السوق وتخلق فرصاً غير مسبوقة لعملائنا.
                </p>
              </div>
              <div className="p-8 bg-background institutional-border hover:border-secondary transition-all group">
                <div className="text-secondary mb-6">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    eco
                  </span>
                </div>
                <h3 className="font-display-lg text-2xl mb-4 text-foreground">الاستدامة</h3>
                <p className="font-body-sm text-on-surface-variant">
                  بناء هياكل مالية ليست فقط ناجحة اليوم، بل قادرة على الصمود والنمو المستدام للأجيال القادمة.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="ar" />
    </>
  );
}
