"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function ArabicContact() {
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(8);
  const [selectedSlot, setSelectedSlot] = useState<string>("11:30 GST");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const faqs: FAQ[] = [
    {
      id: "faq1",
      question: "هل معلوماتي آمنة؟",
      answer:
        "يستخدم مركز القرار تشفيراً من الدرجة المصرفية وبروتوكولات عزل البيانات على المستوى السيادي. يتم استضافة جميع بيانات العملاء الخاصة في بيئات معزولة تماماً وقادرة على العمل دون اتصال بالإنترنت.",
    },
    {
      id: "faq2",
      question: "هل التقارير مقبولة رسمياً؟",
      answer:
        "نعم. يتم تنسيق تقارير المحاسبة الجنائية والتقييم الخاصة بنا بدقة للالتزام بالمتطلبات الإثباتية للنظام القضائي في سلطنة عمان، مما يوفر دعماً قوياً في قضايا التقاضي والتحكيم.",
    },
    {
      id: "faq3",
      question: "ما هي نسبة النجاح؟",
      answer:
        "تحافظ دراسات الجدوى التي يعدها مركز القرار على معدل قبول مؤسسي يتجاوز 94٪ لدى البنوك العمانية الكبرى وصناديق الثروة السيادية.",
    },
  ];

  const handleConfirmConsultation = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 5000);
  };

  const toggleFAQ = (id: string) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  const days = [
    { num: 1, current: false },
    { num: 2, current: false },
    { num: 3, current: false },
    { num: 4, current: false },
    { num: 5, current: true },
    { num: 6, current: true },
    { num: 7, current: true },
    { num: 8, current: true },
    { num: 9, current: true },
    { num: 10, current: true },
    { num: 11, current: false },
    { num: 12, current: false },
    { num: 13, current: true },
    { num: 14, current: true },
    { num: 15, current: true },
  ];

  const timeSlots = ["09:00 GST", "11:30 GST", "14:00 GST", "16:00 GST"];

  return (
    <>
      <Header locale="ar" />
      <main className="flex-grow pt-20">
        {/* Section: Conversion Header & Objection Handling */}
        <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-5 flex flex-col justify-center">
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-foreground mb-6">
                امضِ قدماً <span className="text-secondary">بوضوح تام.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                هيكلية تقاريرنا ذات المستوى المؤسسي لا تدع مجالاً للغموض. وجه اهتماماتك مباشرة أدناه.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center space-y-4">
              {faqs.map((faq) => {
                const isActive = activeFAQ === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-outline-variant/30 bg-surface-container-high rounded-none overflow-hidden"
                  >
                    <button
                      className="w-full px-6 py-4 flex justify-between items-center text-right focus:outline-none cursor-pointer"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <span className="font-body-md text-body-md text-foreground font-semibold">
                        {faq.question}
                      </span>
                      <span
                        className={`material-symbols-outlined accordion-icon text-secondary ${
                          isActive ? "rotate-180" : ""
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                    <div
                      className={`transition-all duration-300 ${
                        isActive ? "max-h-[500px] opacity-100 p-6 pt-0" : "max-h-0 opacity-0 overflow-hidden"
                      } bg-surface`}
                    >
                      <div className="w-full h-px bg-outline-variant/10 mb-4"></div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-px bg-outline-variant/30"></div>

        {/* Section: Secure Contact & Scheduling */}
        <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Trust & Coordinates Box */}
            <div className="md:col-span-4 bg-surface-container-high border border-outline-variant/20 p-8 flex flex-col h-full">
              <h3 className="font-display-lg text-headline-md text-foreground mb-8 border-b border-outline-variant/20 pb-4">
                اتصل بنا
              </h3>
              <div className="space-y-6 flex-grow">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <span
                    className="material-symbols-outlined text-secondary mt-1"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">مكتبنا</p>
                    <p className="font-body-md text-body-md text-foreground">صحار، سلطنة عمان</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <span
                    className="material-symbols-outlined text-secondary mt-1"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    phone_enabled
                  </span>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">اتصل بنا</p>
                    <p className="font-body-md text-body-md text-foreground" dir="ltr">
                      +968 96680001
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <span
                    className="material-symbols-outlined text-secondary mt-1"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    mail
                  </span>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">بريدنا الإلكتروني</p>
                    <p className="font-body-md text-body-md text-foreground">dcenterfe@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <span
                    className="material-symbols-outlined text-secondary mt-1"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    public
                  </span>
                  <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">الانستجرام</p>
                    <a
                      href="https://instagram.com/center.decision"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body-md text-body-md text-foreground hover:text-secondary transition-colors"
                    >
                      center.decision
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-outline-variant/20 flex space-x-4 space-x-reverse items-center animate-pulse">
                <span className="material-symbols-outlined text-outline text-3xl">verified_user</span>
                <p className="font-body-sm text-body-sm text-outline">بروتوكول الاتصال المشفر نشط</p>
              </div>
            </div>

            {/* Scheduling Interface */}
            <div className="md:col-span-8 bg-surface-container border border-outline-variant/20 p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -ml-32 -mt-32 pointer-events-none"></div>
              <h3 className="font-display-lg text-headline-md text-foreground mb-2">احجز جلسة استشارية الآن</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-8">
                حدد تاريخاً وموعداً لجلستك السرية.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar Widget */}
                <div className="border border-outline-variant/20 bg-surface-dim p-4">
                  <div className="flex justify-between items-center mb-4" dir="ltr">
                    <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-secondary">
                      chevron_left
                    </span>
                    <span id="current-month" className="font-data-tabular text-data-tabular text-foreground font-bold">
                      أكتوبر ٢٠٢٦
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-secondary">
                      chevron_right
                    </span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {["ح", "ن", "ث", "ر", "خ", "ج", "س"].map((d, index) => (
                      <div key={index} className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center" dir="ltr">
                    {/* offset slots */}
                    <div></div>
                    <div></div>
                    <div></div>
                    {days.map((d, index) => {
                      if (!d.current) {
                        return (
                          <div key={index} className="p-2 font-data-tabular text-data-tabular text-outline-variant">
                            {d.num}
                          </div>
                        );
                      }
                      const isSelected = selectedDay === d.num;
                      return (
                        <div
                          key={index}
                          onClick={() => setSelectedDay(d.num)}
                          className={`p-2 font-data-tabular text-data-tabular text-foreground cursor-pointer hover:border hover:border-secondary ${
                            isSelected ? "border border-secondary text-secondary bg-secondary/10" : ""
                          }`}
                        >
                          {d.num}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots & CTA */}
                <div className="flex flex-col">
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">
                    المواعيد المتاحة ليوم {selectedDay} أكتوبر
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`border py-2 font-data-tabular text-data-tabular transition-colors cursor-pointer ${
                            isSelected
                              ? "border-secondary text-secondary bg-secondary/10"
                              : "border-outline-variant/30 text-foreground bg-surface-dim hover:border-secondary hover:text-secondary"
                          }`}
                          dir="ltr"
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleConfirmConsultation}
                    className="w-full bg-secondary text-primary-container py-4 font-label-caps text-label-caps font-semibold border border-secondary hover:bg-transparent hover:text-secondary transition-all duration-300 mt-auto shadow-[0_0_15px_rgba(197,160,89,0.2)] cursor-pointer"
                  >
                    تأكيد الاستشارة
                  </button>
                  {showConfirmation && (
                    <div className="mt-4 text-secondary font-label-caps text-xs text-center border border-secondary/30 p-2 bg-secondary/5">
                      تم تأكيد موعد الاستشارة ليوم {selectedDay} أكتوبر في تمام الساعة {selectedSlot} بنجاح!
                    </div>
                  )}
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
