// src/pages/Home.jsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 dark:from-slate-900 dark:via-blue-900/50 dark:to-teal-900/50 overflow-hidden">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100/80 dark:bg-teal-900/30 backdrop-blur-sm rounded-full text-teal-700 dark:text-teal-300 text-sm font-medium mb-6 border border-teal-200/50 dark:border-teal-700/50">
            <Sparkles className="w-4 h-4" />
            أهلاً وسهلاً
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            <span className="block mb-2">👋 مرحبًا بك في</span>
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
              وجّهني
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto px-4">
            منصتك الذكية لاختيار التخصص الجامعي المناسب بعد البكالوريا
            <br />
            <span className="text-teal-600 dark:text-teal-400 font-medium">
              بناءً على معدلك وميولاتك واهتماماتك الدراسية
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              onClick={() => navigate("/orientation")}
              className="group w-full sm:w-auto text-base px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
            >
              <Brain className="ml-2 w-5 h-5 group-hover:animate-pulse" />
              ابدأ الاختبار التوجيهي
              <ArrowRight className="mr-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/majors")}
              className="group w-full sm:w-auto text-base px-8 py-4 border-2 border-teal-300 dark:border-teal-600 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-400 dark:hover:border-teal-500 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <BookOpen className="ml-2 w-5 h-5" />
              استعرض كل التخصصات
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: "🎯",
                title: "توجيه دقيق",
                description: "اختبارات علمية لتحديد ميولاتك"
              },
              {
                icon: "📊",
                title: "تحليل شامل",
                description: "تقييم معدلك وقدراتك الأكاديمية"
              },
              {
                icon: "🎓",
                title: "خيارات متنوعة",
                description: "جميع التخصصات الجامعية المتاحة"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 200 + 600}ms` }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-teal-300/20 to-green-400/20 dark:from-blue-600/30 dark:via-teal-500/20 dark:to-green-600/30" />
        
        {/* Static gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-teal-500/30 rounded-full blur-3xl" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-bl from-teal-400/25 to-green-500/25 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-tl from-teal-500/25 to-blue-400/25 rounded-full blur-2xl" />
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-60 dark:opacity-40" style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)
          `
        }} />
      </div>
    </main>
  );
}