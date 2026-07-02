"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Message {
  sender: "ai" | "user";
  text: string;
}

export default function ArabicAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "مرحباً. أنا مستشارك الرقمي. يمكنني مساعدتك في مراجعة المشاريع، أو التحضير للتمويل البنكي، أو الإجابة على التساؤلات المصرفية. كيف يمكنني مساعدتك اليوم؟",
    },
  ]);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [timeframe, setTimeframe] = useState("عاجل (1-3 أيام عمل)");

  const handleRequestSession = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `مرحباً مركز القرار، أود طلب جلسة استشارية آمنة.\nالاسم: ${name}\nالشركة: ${company}\nالموعد المفضل: ${timeframe}`;
    const waUrl = `https://wa.me/96896680001?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  const responses: Record<string, string> = {
    "تحقق من قيمة المشروع":
      "لتقييم القيمة المالية لمشروعك، نقوم بإجراء نمذجة كاملة للتدفقات النقدية المخصومة (DCF)، وتحليل معدل العائد الداخلي (IRR)، وتقديرات المتوسط المرجح لتكلفة رأس المال (WACC). هل ترغب في جدولة تقييم رسمي؟",
    "الاستعداد للتمويل البنكي":
      "يتطلب التحضير للحصول على تمويل بنكي إعداد دراسة جدوى متكاملة تتوافق تماماً مع المعايير المصرفية في سلطنة عُمان. نحن نجمع بحوث السوق، وهياكل العمليات، وملفات تخفيف المخاطر. هل نقوم بحجز موعد تحضيري؟",
    "استشارة مصرفية":
      "يمتلك مركز القرار عقوداً من القيادة المصرفية الإقليمية. نقدم المشورة بشأن إعادة الهيكلة، وهيكلة رأس المال، والمفاوضات المتعلقة بالديون، والامتثال لإدارة مخاطر المؤسسات (ERM). يرجى توضيح حجم التمويل المستهدف.",
  };

  const handleQuickAction = (actionName: string) => {
    setShowQuickActions(false);
    setMessages((prev) => [...prev, { sender: "user", text: actionName }]);

    setTimeout(() => {
      const reply = responses[actionName] || "شكراً لك. دعني أراجع هذا الطلب وأعود إليك قريباً.";
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 800);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const text = inputValue.trim();
    setInputValue("");
    setShowQuickActions(false);
    setMessages((prev) => [...prev, { sender: "user", text }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "شكراً لك على التفاصيل. تم إدراج طلبك في محرك التأهيل الخاص بنا. سيقوم فريق الاستشارات الاستراتيجية لدينا بمراجعة طلبك والتواصل معك. يمكنك أيضاً طلب جلسة تنفيذية باستخدام النموذج الموجود على اليسار.",
        },
      ]);
    }, 800);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Header locale="ar" />
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-section-gap grid grid-cols-1 lg:grid-cols-12 gap-gutter pt-36">
        {/* Left Panel: AI Consultant Chat */}
        <div className="lg:col-span-7 flex flex-col h-[700px] border border-outline-variant/20 bg-primary-container rounded-none relative overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-outline-variant/20 bg-surface-container-high flex justify-between items-center">
            <div>
              <h2 className="font-display-lg text-headline-md text-foreground">مساعد الذكاء الاصطناعي لاتخاذ القرار</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">محرك التأهيل المؤسسي</p>
            </div>
            <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              smart_toy
            </span>
          </div>

          {/* Chat Area */}
          <div className="flex-grow p-6 overflow-y-auto space-y-6">
            {messages.map((msg, index) => (
              <div key={index} className="flex gap-4">
                {msg.sender === "ai" ? (
                  <>
                    <div className="w-10 h-10 rounded-none bg-surface-container-highest flex items-center justify-center border border-outline-variant/30 flex-shrink-0">
                      <span className="material-symbols-outlined text-secondary">memory</span>
                    </div>
                    <div className="bg-surface-container-highest border border-outline-variant/20 p-4 rounded-none max-w-[85%]">
                      <p className="font-body-md text-body-md text-foreground">{msg.text}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-surface-container border border-outline-variant/20 p-4 rounded-none max-w-[85%] mr-auto text-right">
                      <p className="font-body-md text-body-md text-foreground">{msg.text}</p>
                    </div>
                    <div className="w-10 h-10 rounded-none bg-secondary flex items-center justify-center text-background font-bold flex-shrink-0">
                      ع
                    </div>
                  </>
                )}
              </div>
            ))}

            {showQuickActions && (
              <div className="pr-14 space-y-3">
                {Object.keys(responses).map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="w-full text-right p-4 border border-outline-variant/20 bg-surface-container-lowest hover:bg-surface-container-low transition-colors rounded-none flex items-center justify-between group cursor-pointer"
                  >
                    <span className="font-data-tabular text-data-tabular text-foreground">{action}</span>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors transform rotate-180">
                      arrow_forward
                    </span>
                  </button>
                ))}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-outline-variant/20 bg-surface-container-high">
            <div className="flex gap-4 gold-border-focus">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-grow bg-surface-container-lowest border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-3 rounded-none focus:outline-none focus:ring-0 focus:border-secondary"
                placeholder="فصل متطلباتك المؤسسية..."
                type="text"
              />
              <button
                onClick={handleSendMessage}
                className="btn-gold px-4 py-3 rounded-none flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Filters & Form */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Target Sector Filter */}
          <div className="border border-outline-variant/20 bg-primary-container p-6 rounded-none">
            <h3 className="font-label-caps text-label-caps uppercase text-secondary mb-4 border-b border-outline-variant/20 pb-2">
              التوافق مع رؤية عمان 2040
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "الخدمات اللوجستية",
                "الطاقة",
                "التعدين",
                "السياحة",
                "المؤسسات الصغيرة والمتوسطة",
                "العقار",
              ].map((sector, i) => (
                <button
                  key={sector}
                  className={`border px-3 py-1 font-body-sm text-body-sm rounded-full transition-colors cursor-pointer ${
                    i === 0
                      ? "border-secondary text-secondary bg-secondary/10"
                      : "border-outline-variant/50 text-on-surface-variant hover:border-secondary hover:text-secondary"
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>

          {/* Capture Form */}
          <div className="border border-outline-variant/20 bg-surface-container-highest p-6 rounded-none flex-grow relative overflow-hidden">
            {/* Abstract visual element */}
            <div className="absolute -left-16 -top-16 w-32 h-32 border border-secondary/20 rounded-full"></div>
            <h3 className="font-display-lg text-headline-md text-foreground mb-6">جدولة تنفيذية</h3>
            <form onSubmit={handleRequestSession} className="space-y-5">
              <div className="space-y-1">
                <label className="font-body-sm text-body-sm text-foreground">الاسم الكامل</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-3 rounded-none focus:outline-none focus:border-secondary focus:ring-0 transition-colors"
                  placeholder="مثال: عبدالله الروشدي"
                  type="text"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-body-sm text-body-sm text-foreground">اسم الشركة</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-3 rounded-none focus:outline-none focus:border-secondary focus:ring-0 transition-colors"
                  placeholder="مثال: صندوق مسقط السيادي"
                  type="text"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-body-sm text-body-sm text-foreground">متى تود الاجتماع؟</label>
                <div className="relative">
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 text-foreground font-body-sm text-body-sm px-4 py-3 rounded-none focus:outline-none focus:border-secondary focus:ring-0 transition-colors appearance-none"
                  >
                    <option>عاجل (1-3 أيام عمل)</option>
                    <option>اعتيادي (1-2 أسبوع)</option>
                    <option>استكشافي (الربع الثالث 2026)</option>
                  </select>
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full btn-gold font-label-caps text-label-caps uppercase px-6 py-4 rounded-none flex justify-center items-center gap-2 cursor-pointer"
                >
                  <span>طلب جلسة آمنة</span>
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    lock
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer locale="ar" />
    </>
  );
}
