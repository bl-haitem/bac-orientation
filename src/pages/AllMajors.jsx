import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import AnimatedBackground from "../components/AnimatedBackground";
import { Search, MapPin, ChevronDown, ChevronUp, BookOpen, AlertCircle, Bookmark, Home } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const AllMajors = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [selectedMajorFilter, setSelectedMajorFilter] = useState('');
  const [uniqueMajors, setUniqueMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const wilayas = [
    "أدرار", "الشلف", "الأغواط", "أم البواقي", "باتنة", "بجاية", "بسكرة", "بشار", "البليدة", "البويرة",
    "تمنراست", "تبسة", "تلمسان", "تيارت", "تيزي وزو", "الجزائر", "الجلفة", "جيجل", "سطيف", "سعيدة",
    "سكيكدة", "سيدي بلعباس", "عنابة", "قالمة", "قسنطينة", "المدية", "مستغانم", "المسيلة", "معسكر", "ورقلة",
    "وهران", "البيض", "إليزي", "برج بوعريريج", "بومرداس", "الطارف", "تندوف", "تيسمسيلت", "الوادي", "خنشلة",
    "سوق أهراس", "تيبازة", "ميلة", "عين الدفلى", "النعامة", "عين تموشنت", "غرداية", "غليزان", "تميمون", "برج باجي مختار",
    "أولاد جلال", "بني عباس", "عين صالح", "عين قزام", "تقرت", "جانت", "المغير", "المنيعة"
  ];

  const getValueByPartialKey = useCallback((obj, partialKey) => {
    if (!obj || typeof obj !== 'object') return "";

    const exactKeysMap = {
      "اسم التخصص": ["اسم التخصص", "التخصص", "تخصص"],
      "الشعب المسموح لها": ["الشعب المسموح لها", "الشعب المسموحة لها", "الشعب", "الشعب المسموح به", "شعبة"],
      "المعدل الادنى": ["المعدل الادنى", "المعدل الأدنى", "المعدل", "معدل"],
      "اسم الجامعة": ["اسم الجامعة", "الجامعة", "جامعة"],
      "الولاية": ["الولاية", "ولاية"],
      "وصف": ["وصف الجامعة", "الوصف", "وصف"],
      "الميول المطلوبة": ["الميول المطلوبة", "الميول"]
    };

    if (exactKeysMap[partialKey]) {
      for (const keyVariant of exactKeysMap[partialKey]) {
        if (obj[keyVariant] !== undefined && obj[keyVariant] !== null && String(obj[keyVariant]).trim() !== '') {
          return String(obj[keyVariant]).trim();
        }
      }
    }

    const lowerPartialKey = partialKey.trim().toLowerCase();
    const foundKey = Object.keys(obj).find(k =>
      k.trim().toLowerCase().includes(lowerPartialKey) ||
      lowerPartialKey.includes(k.trim().toLowerCase())
    );
    return foundKey ? String(obj[foundKey]).trim() : "";
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get("https://opensheet.elk.sh/17mw-TXbt9r6verkJthakK4g1kVB_bHPlwXqf-rxOiCM/Sheet1")
      .then((res) => {
        setData(res.data);
        setFiltered(res.data);
        
        const majors = Array.from(new Set(res.data.map(item => 
          String(getValueByPartialKey(item, "اسم التخصص")).trim()
        )))
          .filter(Boolean)
          .sort();
        setUniqueMajors(majors);
        setCurrentPage(1);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setError("فشل في جلب بيانات التخصصات. يرجى التحقق من اتصال الإنترنت أو إعدادات Google Sheet.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getValueByPartialKey]);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filteredMajors = data.filter((item) => {
      const majorName = getValueByPartialKey(item, "اسم التخصص")?.toLowerCase() || "";
      const uni = getValueByPartialKey(item, "اسم الجامعة")?.toLowerCase() || "";
      const itemWilaya = getValueByPartialKey(item, "الولاية");

      const searchMatch = majorName.includes(lowerSearch) || uni.includes(lowerSearch);

      let wilayaMatch = true;
      if (wilaya && !majorName.includes("طب")) {
          wilayaMatch = itemWilaya === wilaya;
      } else if (majorName.includes("طب")) {
          wilayaMatch = true;
      } else if (!wilaya) {
          wilayaMatch = true;
      }

      const majorFilterMatch = selectedMajorFilter ? majorName === selectedMajorFilter.toLowerCase() : true;
      
      return searchMatch && wilayaMatch && majorFilterMatch;
    });
    setFiltered(filteredMajors);
    setCurrentPage(1);
  }, [search, wilaya, selectedMajorFilter, data, getValueByPartialKey]);

  const [selectedCard, setSelectedCard] = useState(null);

  const toggleCard = useCallback((index) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + index;
    setSelectedCard(prev => (prev === globalIndex ? null : globalIndex));
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMajors = filtered.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 dark:from-slate-900 dark:via-blue-900/50 dark:to-teal-900/50 overflow-hidden">
      <AnimatedBackground />
      
      {/* طبقات الخلفية الضبابية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-teal-300/20 to-green-400/20 dark:from-blue-600/30 dark:via-teal-500/20 dark:to-green-600/30" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-teal-500/30 rounded-full blur-3xl" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-bl from-teal-400/25 to-green-500/25 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-tl from-teal-500/25 to-blue-400/25 rounded-full blur-2xl" />
        <div className="absolute inset-0 opacity-60 dark:opacity-40" style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)
          `
        }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8 max-w-4xl mx-auto p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl transition-all duration-1000 transform opacity-100 translate-y-0">
          <BookOpen className="w-16 h-16 text-teal-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            استكشاف جميع التخصصات والجامعات
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            ابحث وتصفح قائمة كاملة بالتخصصات الجامعية المتاحة في الجزائر.
          </p>
        </div>

        <div className="max-w-4xl w-full mx-auto p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl mb-8 flex flex-col md:flex-row md:flex-wrap justify-between gap-4">
          <div className="relative w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.7rem)]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="ابحث عن تخصص أو جامعة..."
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white pr-10 text-right"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="relative w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.7rem)]">
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <select
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white appearance-none pr-10 text-right"
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
            >
              <option value="">كل الولايات</option>
              {wilayas.map((w, i) => (
                <option key={i} value={w}>{w}</option>
              ))}
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
          </div>

          <div className="relative w-full md:w-full lg:w-[calc(33.33%-0.7rem)]">
            <Bookmark className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <select
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white appearance-none pr-10 text-right"
              value={selectedMajorFilter}
              onChange={(e) => setSelectedMajorFilter(e.target.value)}
            >
              <option value="">كل التخصصات</option>
              {uniqueMajors.map((major, i) => (
                <option key={i} value={major}>{major}</option>
              ))}
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
          </div>

        </div>

        {loading ? (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center max-w-4xl mx-auto w-full">
            <svg className="animate-spin h-10 w-10 text-teal-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg text-gray-700 dark:text-gray-300">جاري تحميل بيانات التخصصات...</p>
          </div>
        ) : error ? (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center max-w-4xl mx-auto w-full text-red-600 dark:text-red-400">
            <AlertCircle className="w-12 h-12 mx-auto mb-4" />
            <p className="text-lg">{error}</p>
            <p className="text-sm mt-2">يرجى التأكد من أن Google Sheet الخاص بك منشور علنًا على الويب وأن الرابط صحيح.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 w-full max-w-5xl">
              {currentMajors.length > 0 ? currentMajors.map((item, index) => {
                const university = getValueByPartialKey(item, "اسم الجامعة") || "غير محددة";
                const wilayaName = getValueByPartialKey(item, "الولاية") || "غير معروفة";
                const major = getValueByPartialKey(item, "اسم التخصص") || "غير معروف";
                const minAverage = getValueByPartialKey(item, "المعدل الادنى") || "غير متوفر";
                const description = getValueByPartialKey(item, "وصف") || "لا يوجد وصف متاح.";
                const branches = getValueByPartialKey(item, "الشعب المسموح لها") || "غير متوفرة";
                const interests = getValueByPartialKey(item, "الميول المطلوبة") || "غير متوفرة";

                const globalCardIndex = (currentPage - 1) * itemsPerPage + index;

                return (
                  <div
                    key={globalCardIndex}
                    className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg p-5 border border-gray-200/50 dark:border-gray-700/50 cursor-pointer hover:bg-gray-50/80 dark:hover:bg-gray-700/80 hover:shadow-xl transition-all duration-300 transform col-span-full"
                    onClick={() => toggleCard(globalCardIndex)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-bold text-teal-700 dark:text-teal-300">{university}</h2>
                      {selectedCard === globalCardIndex ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex items-center">
                      <MapPin className="w-4 h-4 ml-1" /> {wilayaName} - {major}
                    </p>

                    {selectedCard === globalCardIndex && (
                      <div className="mt-4 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <p className="mb-2">
                          <strong className="text-teal-600 dark:text-teal-400">التخصص:</strong> {major}
                        </p>
                        <p className="mb-2">
                          <strong className="text-teal-600 dark:text-teal-400">معدل القبول:</strong> {minAverage}
                        </p>
                        <p className="mb-2">
                          <strong className="text-teal-600 dark:text-teal-400">الشعب المسموح بها:</strong> {branches}
                        </p>
                        <p className="mb-2">
                          <strong className="text-teal-600 dark:text-teal-400">الميول المطلوبة:</strong> {interests}
                        </p>
                        <p className="text-sm leading-relaxed text-wrap">
                          <strong className="text-teal-600 dark:text-teal-400">الوصف:</strong> {description}
                        </p>
                      </div>
                    )}
                  </div>
                );
              }) : (
                <div className="col-span-full text-center py-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-600 dark:text-gray-300">لا توجد تخصصات مطابقة لمعايير البحث.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">يرجى تعديل مصطلحات البحث أو اختيار ولاية أخرى أو تخصص آخر.</p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-4">
                <Button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-6 py-3 border border-teal-200 dark:border-teal-700 text-teal-600 dark:text-teal-300 bg-white/30 dark:bg-teal-900/20 hover:bg-teal-100/50 dark:hover:bg-teal-800/40 hover:border-teal-300 dark:hover:border-teal-600 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  السابق
                </Button>
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  صفحة {currentPage} من {totalPages}
                </span>
                <Button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 border border-teal-200 dark:border-teal-700 text-teal-600 dark:text-teal-300 bg-white/30 dark:bg-teal-900/20 hover:bg-teal-100/50 dark:hover:bg-teal-800/40 hover:border-teal-300 dark:hover:border-teal-600 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  التالي
                </Button>
              </div>
            )}
          </>
        )}

        {/* زر العودة للقائمة الرئيسية - تصميم خفيف ومتوافق */}
        <div className="mt-12 w-full max-w-4xl text-center">
          <Button
            onClick={goToHomePage}
            className="px-8 py-3 border border-blue-200 dark:border-blue-600 text-blue-600 dark:text-blue-200 bg-white/30 dark:bg-blue-900/20 hover:bg-blue-100/50 dark:hover:bg-blue-800/40 hover:border-blue-300 dark:hover:border-blue-500 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Home className="ml-2 w-4 h-4" />
            العودة للقائمة الرئيسية
          </Button>
        </div>
      </div>
    </main>
  );
};

export default AllMajors;