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
                    className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHF-gQoWOwyIS5QPtcyQpKttCwKERJfaHll6JpQP5oadYqE_qEAxW_R9euhdt8axVnPJqN_SW-lmiHaH5ApU9bQ9YHPwMOFXU2I-AQ0fb75h4Dl0RLdIZ_XXnu5G0jZfygyRNNZYtuff5CfhWBhqEj_LkxMtEkTjRLdtyxccQ98VO66b370JzAjmpZ2tZIsnlLTO9UEGCuZKHkiuFvWcOYI14g4s0Qc4i18XBKM9aC7qCX_L9kfSeIUR0b6rn8F1toZeOuRoCuiiUz')",
                    }}
                  ></div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-surface-container-highest border border-secondary/20 p-8 hidden md:block">
                  <div className="text-secondary font-display-lg text-5xl mb-2">30+</div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant">
                    عاماً من الخبرة المؤسسية المتراكمة
                  </p>
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
                  فريقنا يجسد الانضباط والخبرة التقنية العالية، مما يضمن تقديم مخرجات بمستوى يليق بكبرى المؤسسات
                  العالمية.
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

        {/* Section 3: Founder Profile */}
        <section className="py-section-gap bg-background">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* Founder Image Side */}
              <div className="lg:col-span-5 relative">
                <div className="relative z-10 institutional-border p-4 bg-surface-container-low shadow-2xl">
                  <div className="aspect-[4/5] bg-surface-container overflow-hidden">
                    <img
                      alt="Abdullah Al Rushdi"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-bvF8dSN2MQZhRHcgeQIRktds4enzh7p0YWlgz2qayYe3o2-1VDiVDFbDpBdt3wp9I_QQvDxmt_IRV_y0_HZbbsUxN1nsC2SCUzT-IdgOTP7zluazS8wFlYZK0BWoiH_QEbzJQTVRtpmEBwsEFzm7M4KJ_gf83CpGQv3mwlEsJK8LXxbZXH_7q2NC2VsAZaf3GAPY2zMpNikueQ4LG5NLQ1y0pizNI66pHJU6D-H7XCMjt0dX9FYJHP5DTU6DAWrPVayc3VEPjxIz"
                    />
                  </div>
                  <div className="mt-8">
                    <h3 className="font-display-lg text-3xl mb-1 text-foreground">عبدالله الرشدي</h3>
                    <p className="font-label-caps text-secondary tracking-[0.2em]">المؤسس والرئيس التنفيذي</p>
                  </div>
                </div>
                <div className="absolute -top-10 -right-10 w-full h-full border border-secondary/10 z-0"></div>
              </div>
              {/* Biography Side */}
              <div className="lg:col-span-7 space-y-10">
                <div>
                  <span className="font-label-caps text-secondary mb-4 block">قيادة تنفيذية</span>
                  <h2 className="font-display-lg text-4xl mb-8 text-foreground">
                    عقود من الخبرة في قلب النظام المالي
                  </h2>
                  <div className="space-y-6 font-body-lg text-on-surface-variant leading-relaxed">
                    <p>
                      يتمتع عبدالله الرشدي بمسيرة مهنية استثنائية تمتد لأكثر من 30 عاماً في قمة القطاع المالي والمصرفي في
                      سلطنة عُمان والمنطقة. قبل تأسيس &quot;مركز اتخاذ القرار&quot;، شغل مناصب قيادية عليا في أبرز المؤسسات
                      المالية، بما في ذلك بنك مسقط وبنك ظفار.
                    </p>
                    <p>
                      تميزت فترة عمله بقيادة استراتيجيات التحول الكبرى، وإدارة محافظ قروض ضخمة، وهيكلة تمويل المشاريع
                      الوطنية الاستراتيجية. يُعرف عبدالله بدقته التحليلية المتناهية وقدرته الفذة على إدارة المخاطر في
                      أكثر الظروف الاقتصادية تقلباً، مما جعله مستشاراً موثوقاً للعديد من الهيئات السيادية ومجالس
                      الإدارات.
                    </p>
                  </div>
                </div>
                {/* Expertise List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-8 border-t border-outline-variant/20">
                  <div>
                    <h4 className="font-label-caps text-foreground mb-4 text-sm opacity-60">مجالات الخبرة الرئيسية</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-on-surface">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                        <span className="font-body-sm text-foreground">الإدارة المصرفية العليا</span>
                      </li>
                      <li className="flex items-center gap-3 text-on-surface">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                        <span className="font-body-sm text-foreground">حوكمة الشركات والامتثال</span>
                      </li>
                      <li className="flex items-center gap-3 text-on-surface">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                        <span className="font-body-sm text-foreground">إدارة مخاطر المؤسسات (ERM)</span>
                      </li>
                      <li className="flex items-center gap-3 text-on-surface">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                        <span className="font-body-sm text-foreground">هيكلة رأس المال والتمويل المعقد</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-label-caps text-foreground mb-4 text-sm opacity-60">التركيز الاستراتيجي</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-on-surface">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                        <span className="font-body-sm text-foreground">تطوير السياسات المالية السيادية</span>
                      </li>
                      <li className="flex items-center gap-3 text-on-surface">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                        <span className="font-body-sm text-foreground">استراتيجيات مواءمة الثروة</span>
                      </li>
                      <li className="flex items-center gap-3 text-on-surface">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                        <span className="font-body-sm text-foreground">تحسين أداء الأرباح والخسائر</span>
                      </li>
                      <li className="flex items-center gap-3 text-on-surface">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                        <span className="font-body-sm text-foreground">التحول الرقمي للقطاع المالي</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="ar" />
    </>
  );
}
