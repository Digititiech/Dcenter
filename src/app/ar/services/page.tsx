import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ArabicServices() {
  return (
    <>
      <Header locale="ar" />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="px-margin-mobile md:px-margin-desktop pt-section-gap pb-16 max-w-container-max mx-auto">
          <div className="max-w-4xl">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground mb-6">
              الخدمات الاستشارية المؤسسية
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              نقدم حلولاً متكاملة تجمع بين الدقة المالية والتميز التشغيلي، مصممة لدعم صناع القرار في بيئات العمل المعقدة.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-margin-mobile md:px-margin-desktop pb-12 max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Financial Consulting */}
            <div className="bg-surface-container border border-outline-variant/20 p-8 flex flex-col hover:border-secondary/40 transition-colors">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6">account_balance</span>
              <h3 className="font-display-lg text-2xl text-foreground mb-4">الاستشارات المالية</h3>
              <ul className="space-y-3 font-body-md text-on-surface-variant mb-6 flex-grow">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>التحليل المالي المعمق
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>إدارة وتقييم الأصول
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>استراتيجيات إدارة الديون
                </li>
              </ul>
              <Link
                className="inline-flex items-center text-secondary font-label-caps text-label-caps gap-2 group"
                href="/ar/contact"
              >
                استكشف المزيد{" "}
                <span className="material-symbols-outlined text-sm group-hover:translate-x-[-4px] transition-transform">
                  arrow_back
                </span>
              </Link>
            </div>

            {/* Finance & Investment */}
            <div className="bg-surface-container border border-outline-variant/20 p-8 flex flex-col hover:border-secondary/40 transition-colors">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6">payments</span>
              <h3 className="font-display-lg text-2xl text-foreground mb-4">التمويل والاستثمار</h3>
              <ul className="space-y-3 font-body-md text-on-surface-variant mb-6 flex-grow">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>هيكلة الاستثمارات
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>التفاوض مع البنوك والمؤسسات
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>الاندماج والاستحواذ (M&A)
                </li>
              </ul>
              <Link
                className="inline-flex items-center text-secondary font-label-caps text-label-caps gap-2 group"
                href="/ar/contact"
              >
                استكشف المزيد{" "}
                <span className="material-symbols-outlined text-sm group-hover:translate-x-[-4px] transition-transform">
                  arrow_back
                </span>
              </Link>
            </div>

            {/* Governance & Institutional */}
            <div className="bg-surface-container border border-outline-variant/20 p-8 flex flex-col hover:border-secondary/40 transition-colors">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6">corporate_fare</span>
              <h3 className="font-display-lg text-2xl text-foreground mb-4">الحوكمة والتطوير</h3>
              <ul className="space-y-3 font-body-md text-on-surface-variant mb-6 flex-grow">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>تصميم الهياكل التنظيمية
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>نظم إدارة الأداء
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>سياسات وإجراءات الحوكمة
                </li>
              </ul>
              <Link
                className="inline-flex items-center text-secondary font-label-caps text-label-caps gap-2 group"
                href="/ar/contact"
              >
                استكشف المزيد{" "}
                <span className="material-symbols-outlined text-sm group-hover:translate-x-[-4px] transition-transform">
                  arrow_back
                </span>
              </Link>
            </div>

            {/* Digital Transformation */}
            <div className="bg-surface-container border border-outline-variant/20 p-8 flex flex-col hover:border-secondary/40 transition-colors md:col-span-2 lg:col-span-1">
              <span className="material-symbols-outlined text-secondary text-4xl mb-6">precision_manufacturing</span>
              <h3 className="font-display-lg text-2xl text-foreground mb-4">التحول الرقمي</h3>
              <ul className="space-y-3 font-body-md text-on-surface-variant mb-6 flex-grow">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>أتمتة العمليات
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>تطبيقات الذكاء الاصطناعي
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>استراتيجيات البيانات والتحليلات
                </li>
              </ul>
              <Link
                className="inline-flex items-center text-secondary font-label-caps text-label-caps gap-2 group"
                href="/ar/contact"
              >
                استكشف المزيد{" "}
                <span className="material-symbols-outlined text-sm group-hover:translate-x-[-4px] transition-transform">
                  arrow_back
                </span>
              </Link>
            </div>

            {/* Feasibility Studies Teaser */}
            <div className="md:col-span-2 bg-secondary/5 border border-secondary/20 p-8 flex flex-col md:flex-row gap-8 items-center overflow-hidden relative">
              <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/10 blur-3xl -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
              <div className="flex-grow z-10">
                <span className="inline-block px-3 py-1 bg-secondary text-primary-container font-label-caps text-[10px] mb-4">
                  خدمة مميزة
                </span>
                <h3 className="font-display-lg text-2xl text-foreground mb-4">دراسات الجدوى المتكاملة</h3>
                <p className="font-body-md text-on-surface-variant mb-6">
                  نقدم تحليلات شاملة للمشاريع تضمن الجدوى الاقتصادية والفنية والقانونية قبل تخصيص الموارد.
                </p>
                <Link
                  className="bg-secondary text-primary-container px-8 py-3 font-label-caps text-label-caps inline-block hover:bg-transparent hover:text-secondary border border-transparent hover:border-secondary transition-all"
                  href="#feasibility"
                >
                  التفاصيل الكاملة
                </Link>
              </div>
              <div className="hidden lg:block w-48 h-48 bg-surface-container-high border border-outline-variant/30 rotate-12 flex items-center justify-center opacity-50">
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
                  دراسات الجدوى: حجر الزاوية لكل استثمار ناجح
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                  لماذا نحتاج لدراسات الجدوى؟ إنها ليست مجرد متطلبات بنكية، بل هي خريطة الطريق التي تحمي رأس المال من
                  المخاطر غير المحسوبة وتحدد فرص النمو الحقيقية في السوق المتغير.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-secondary/10 p-2 h-fit">
                      <span className="material-symbols-outlined text-secondary">trending_up</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">تقليل المخاطر</h4>
                      <p className="text-body-sm text-on-surface-variant">
                        تحديد العقبات المحتملة ووضع خطط الطوارئ قبل التنفيذ.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-secondary/10 p-2 h-fit">
                      <span className="material-symbols-outlined text-secondary">insights</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">تحسين الموارد</h4>
                      <p className="text-body-sm text-on-surface-variant">
                        ضمان توجيه الاستثمارات نحو القنوات الأكثر ربحية واستدامة.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="bg-background border border-outline-variant/20 p-8">
                  <h3 className="font-label-caps text-label-caps text-secondary mb-8 border-b border-outline-variant/20 pb-4">
                    مكونات ومخرجات الدراسة
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div className="group">
                      <div className="text-secondary font-data-tabular mb-2">01. تحليل السوق</div>
                      <p className="text-body-sm text-on-surface-variant group-hover:text-foreground transition-colors">
                        تقدير الطلب، تحليل المنافسين، واستراتيجيات التسعير المعتمدة.
                      </p>
                    </div>
                    <div className="group">
                      <div className="text-secondary font-data-tabular mb-2">02. الجدوى الفنية</div>
                      <p className="text-body-sm text-on-surface-variant group-hover:text-foreground transition-colors">
                        تقييم المتطلبات التشغيلية، التقنيات اللازمة، وسلاسل التوريد.
                      </p>
                    </div>
                    <div className="group">
                      <div className="text-secondary font-data-tabular mb-2">03. النموذج المالي</div>
                      <p className="text-body-sm text-on-surface-variant group-hover:text-foreground transition-colors">
                        توقعات التدفقات النقدية، فترة الاسترداد، ومعدلات العائد (IRR/NPV).
                      </p>
                    </div>
                    <div className="group">
                      <div className="text-secondary font-data-tabular mb-2">04. تقييم المخاطر</div>
                      <p className="text-body-sm text-on-surface-variant group-hover:text-foreground transition-colors">
                        تحليل الحساسية، مصفوفة المخاطر، واستراتيجيات التخفيف.
                      </p>
                    </div>
                    <div className="group">
                      <div className="text-secondary font-data-tabular mb-2">05. المراجعة القانونية</div>
                      <p className="text-body-sm text-on-surface-variant group-hover:text-foreground transition-colors">
                        الامتثال للتراخيص، اللوائح المحلية، والاتفاقيات التعاقدية.
                      </p>
                    </div>
                    <div className="group">
                      <div className="text-secondary font-data-tabular mb-2">06. تقرير القرار النهائي</div>
                      <p className="text-body-sm text-on-surface-variant group-hover:text-foreground transition-colors">
                        توصيات تنفيذية واضحة مدعومة ببيانات تجريبية دقيقة.
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
            هل أنت جاهز لاتخاذ قرارك القادم؟
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
            خبراؤنا مستعدون لتحويل تحدياتك إلى فرص نمو مستدامة من خلال استشارات مبنية على البيانات.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              className="bg-secondary text-primary-container px-10 py-4 font-label-caps text-label-caps hover:bg-transparent hover:text-secondary border border-transparent hover:border-secondary transition-all"
              href="/ar/contact"
            >
              تواصل مع مستشار
            </Link>
            <Link
              className="border border-outline-variant/40 text-foreground px-10 py-4 font-label-caps text-label-caps hover:bg-surface-container-high transition-all"
              href="#"
            >
              تحميل ملف الخدمات (PDF)
            </Link>
          </div>
        </section>
      </main>
      <Footer locale="ar" />
    </>
  );
}
