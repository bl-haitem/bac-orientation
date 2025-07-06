// src/pages/Orientation.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import { ArrowRight, ArrowLeft, User, GraduationCap, Brain, CheckCircle, AlertCircle, BookOpen, Award, School, TrendingUp, Sparkles, Home, ChevronDown, ChevronUp } from "lucide-react";

// ** تعريف علاقات المواد الأساسية بالتخصصات **
const MAJOR_SUBJECT_RELATIONS = {
  "الطب": ["العلوم الطبيعية", "الفيزياء"],
  "طب الأسنان": ["العلوم الطبيعية", "الفيزياء", "الرياضيات"],
  "الصيدلة": ["العلوم الطبيعية", "الفيزياء"],
  "شبه طبي": ["العلوم الطبيعية", "الفيزياء"],
  "بيطرة": ["العلوم الطبيعية", "الفيزياء"],
  "هندسة مدنية": ["الرياضيات", "الفيزياء"],
  "هندسة معمارية وعمران": ["الرياضيات", "الفيزياء"],
  "هندسة ميكانيكية": ["الرياضيات", "الفيزياء", "التكنولوجيا"],
  "هندسة كهربائية": ["الرياضيات", "الفيزياء", "التكنولوجيا"],
  "هندسة كيميائية": ["الرياضيات", "الفيزياء", "التكنولوجيا"],
  "هندسة صناعية": ["الرياضيات", "الفيزياء", "الاقتصاد والمناجمنت"],
  "هندسة بترول": ["الرياضيات", "الفيزياء", "العلوم الطبيعية"],
  "هندسة مائية": ["الرياضيات", "الفيزياء", "العلوم الطبيعية"],
  "هندسة المناجم": ["الرياضيات", "الفيزياء", "العلوم الطبيعية"],
  "هندسة بيوطبية": ["الرياضيات", "الفيزياء", "العلوم الطبيعية"],
  "رياضيات": ["الرياضيات", "الفيزياء"],
  "إعلام آلي": ["الرياضيات", "الفيزياء", "التكنولوجيا"],
  "فيزياء": ["الفيزياء", "الرياضيات"],
  "كيمياء": ["الرياضيات", "الفيزياء", "التكنولوجيا", "العلوم الطبيعية"],
  "علوم بيولوجية": ["العلوم الطبيعية", "الفيزياء"],
  "علوم بيئية": ["العلوم الطبيعية", "الفيزياء", "الجغرافيا"],
  "تكنولوجيا فلاحية وغذائية": ["العلوم الطبيعية"],
  "علوم اقتصادية": ["الرياضيات", "الاقتصاد والمناجمنت"],
  "علوم تجارية": ["الرياضيات", "الاقتصاد والمناجمنت"],
  "علوم التسيير": ["الرياضيات", "التسيير المحاسبي والمالي"],
  "مالية ومحاسبة": ["الرياضيات", "التسيير المحاسبي والمالي"],
  "حقوق": ["اللغة العربية", "الفلسفة", "التاريخ والجغرافيا"],
  "علوم سياسية": ["التاريخ والجغرافيا", "الفلسفة", "اللغة العربية"],
  "علم النفس": ["الفلسفة", "العلوم الطبيعية"],
  "علم الاجتماع": ["الفلسفة", "التاريخ والجغرافيا"],
  "فلسفة": ["الفلسفة"],
  "تاريخ": ["التاريخ والجغرافيا"],
  "علم الآثار": ["التاريخ والجغرافيا"],
  "علوم إعلام واتصال": ["اللغة العربية", "الفلسفة", "اللغة الفرنسية", "اللغة الإنجليزية"],
  "علوم المكتبات": ["اللغة العربية", "الفلسفة"],
  "لغة وأدب عربي": ["اللغة العربية"],
  "لغة وأدب فرنسي": ["اللغة الفرنسية"],
  "لغة وأدب إنجليزي": ["اللغة الإنجليزية"],
  "لغات أجنبية أخرى": ["اللغة الأجنبية الثالثة", "اللغة الفرنسية", "اللغة الإنجليزية"],
  "ترجمة": ["اللغة العربية", "اللغة الفرنسية", "اللغة الإنجليزية"],
  "علوم إسلامية": ["اللغة العربية", "التربية الإسلامية"],
  "فنون": ["اللغة العربية", "الفنون", "الفلسفة"],
  "تربية بدنية ورياضية": ["العلوم الطبيعية", "الفيزياء", "التربية البدنية"],
  "تعليم": ["الفلسفة", "التربية الإسلامية"]
};

// ** مكون Step1Content ** (لا تغيير)
const Step1Content = ({ formData, updateFormData, nextStep, errors, isVisible }) => (
  <div className={`p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6 flex items-center justify-center">
      <User className="w-8 h-8 mr-3 text-teal-600" />
      معلومات الطالب
    </h2>
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
        الاسم الكامل:
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={(e) => updateFormData('name', e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        placeholder="أدخل اسمك"
      />
      {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
    </div>
    <div className="mb-6">
      <label htmlFor="branch" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
        الشعبة:
      </label>
      <select
        id="branch"
        name="branch"
        value={formData.branch}
        onChange={(e) => updateFormData('branch', e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
      >
        <option value="">اختر شعبتك</option>
        <option value="علوم تجريبية">علوم تجريبية</option>
        <option value="رياضيات">رياضيات</option>
        <option value="تقني رياضي">تقني رياضي</option>
        <option value="تسيير واقتصاد">تسيير واقتصاد</option>
        <option value="آداب وفلسفة">آداب وفلسفة</option>
        <option value="لغات أجنبية">لغات أجنبية</option>
      </select>
      {errors.branch && <p className="text-red-500 text-xs italic mt-1">{errors.branch}</p>}
    </div>
    <div className="flex justify-end">
      <Button onClick={nextStep} className="group w-full sm:w-auto text-base px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 flex items-center justify-center">
        التالي <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  </div>
);

// ** مكون Step2Content ** (لا تغيير)
const Step2Content = ({ formData, updateFormData, updateGrades, prevStep, nextStep, errors }) => {
  const subjects = useMemo(() => formData.subjectsByBranch[formData.branch] || [], [formData.branch, formData.subjectsByBranch]);

  return (
    <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6 flex items-center justify-center">
        <BookOpen className="w-8 h-8 mr-3 text-teal-600" />
        العلامات والمعدل
      </h2>
      <div className="mb-4">
        <label htmlFor="average" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          المعدل العام للبكالوريا:
        </label>
        <input
          type="number"
          id="average"
          name="average"
          value={formData.average}
          onChange={(e) => updateFormData('average', e.target.value)}
          min="0"
          max="20"
          step="0.01"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          placeholder="مثال: 15.50"
        />
        {errors.average && <p className="text-red-500 text-xs italic mt-1">{errors.average}</p>}
      </div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">علامات جميع المواد:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {subjects.map(subject => (
          <div key={subject}>
            <label htmlFor={`grade-${subject}`} className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              علامة {subject}:
            </label>
            <input
              type="number"
              id={`grade-${subject}`}
              name={`grade-${subject}`}
              value={formData.grades[subject] || ''}
              onChange={(e) => updateGrades(subject, e.target.value)}
              min="0"
              max="20"
              step="0.01"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              placeholder="0-20"
            />
            {errors[subject] && <p className="text-red-500 text-xs italic mt-1">{errors[subject]}</p>}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={prevStep}
          variant="outline"
          className="group w-full sm:w-auto text-base px-8 py-4 border-2 border-teal-300 dark:border-teal-600 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-400 dark:hover:border-teal-500 backdrop-blur-sm transition-all duration-300 hover:scale-105 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 ml-2 group-hover:-translate-x-1 transition-transform" /> السابق
        </Button>
        <Button onClick={nextStep} className="group w-full sm:w-auto text-base px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 flex items-center justify-center">
          التالي <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

// ** مكون Step3Content ** (لا تغيير)
const Step3Content = ({ orientationQuestions, formData, updateAnswer, calculateResults, prevStep, loading, errors }) => {
  return (
    <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6 flex items-center justify-center">
        <Brain className="w-8 h-8 mr-3 text-teal-600" />
        أسئلة الميول والتوجيه
      </h2>
      {errors.answers && <p className="text-red-500 text-xs italic mt-1 text-center">{errors.answers}</p>}
      <div className="space-y-6 mb-6">
        {orientationQuestions.map((q, index) => (
          <div key={index} className="border border-gray-200/50 dark:border-gray-700/50 p-4 rounded-md bg-gray-50/70 dark:bg-gray-800/70 shadow-sm">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">{index + 1}. {q.question}</p>
            <div className="flex justify-around items-center space-x-2">
              {[1, 2, 3, 4, 5].map(value => (
                <label key={value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={value}
                    checked={formData.answers[index] === value}
                    onChange={() => updateAnswer(index, value)}
                    className="form-radio h-5 w-5 text-teal-600 dark:text-teal-400 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{value}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={prevStep}
          variant="outline"
          className="group w-full sm:w-auto text-base px-8 py-4 border-2 border-teal-300 dark:border-teal-600 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-400 dark:hover:border-teal-500 backdrop-blur-sm transition-all duration-300 hover:scale-105 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 ml-2 group-hover:-translate-x-1 transition-transform" /> السابق
        </Button>
        <Button onClick={calculateResults} className="group w-full sm:w-auto text-base px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 flex items-center justify-center" disabled={loading}>
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
          )}
          عرض النتائج
        </Button>
      </div>
    </div>
  );
};

// ** مكون Step4Content ** (مُعدل حسب طلبك)
const Step4Content = ({ result, goToHomePage, errors }) => {
  const [openMajorCard, setOpenMajorCard] = useState(null);
  const [openUniversityCard, setOpenUniversityCard] = useState(null);

  const toggleMajor = useCallback((index) => {
    setOpenUniversityCard(null); // إغلاق أي جامعة مفتوحة عند تغيير التخصص
    setOpenMajorCard(prev => (prev === index ? null : index));
  }, []);

  const toggleUniversityDescription = useCallback((majorIndex, uniIndex) => {
    const uniqueKey = `${majorIndex}-${uniIndex}`;
    setOpenUniversityCard(prev => (prev === uniqueKey ? null : uniqueKey));
  }, []);

  return (
    <div className="space-y-6 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        النتائج النهائية
      </h2>

      {errors.calculation && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">خطأ!</strong>
          <span className="block sm:inline"> {errors.calculation}</span>
        </div>
      )}

      {result && result.length === 0 ? (
        <div className="text-center text-lg text-gray-600 dark:text-gray-400 p-8 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow">
          <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <p>عذرًا، لم يتم العثور على تخصصات مناسبة بناءً على بياناتك. يرجى مراجعة إجاباتك ومحاولة مرة أخرى.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {result.map((majorGroup, majorIndex) => {
            const isMajorOpen = openMajorCard === majorIndex;
            return (
              <div
                key={majorIndex}
                className="border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm cursor-pointer hover:bg-white/80 dark:hover:bg-gray-800 transition-colors"
                onClick={() => toggleMajor(majorIndex)}
              >
                <h3 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-3 flex items-center justify-between">
                  <span className="flex items-center">
                    <GraduationCap className="w-6 h-6 mr-2" />
                    {majorGroup.major}
                  </span>
                  {isMajorOpen ? <ChevronUp /> : <ChevronDown />}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-medium">نسبة التطابق:</span> {majorGroup.score}%
                </p>

                {isMajorOpen && majorGroup.universities && majorGroup.universities.length > 0 && (
                  <div className="mt-4 border-t border-gray-200/50 dark:border-gray-700/50 pt-4">
                    <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <School className="w-5 h-5 mr-2" />
                      الجامعات المتاحة لهذا التخصص:
                    </h4>
                    <ul className="space-y-3">
                      {majorGroup.universities.map((uni, uniIndex) => {
                        const uniqueUniKey = `${majorIndex}-${uniIndex}`;
                        const isOpen = openUniversityCard === uniqueUniKey;
                        return (
                          <li
                            key={uniqueUniKey}
                            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-md border border-gray-100/50 dark:border-gray-750/50 shadow-sm cursor-pointer hover:bg-white/90 dark:hover:bg-gray-700/90 transition-colors duration-200"
                            onClick={(e) => {
                              e.stopPropagation(); // منع فتح التخصص عند الضغط على الجامعة
                              toggleUniversityDescription(majorIndex, uniIndex);
                            }}
                          >
                            <div className="flex justify-between items-center">
                              <p className="font-semibold text-gray-800 dark:text-gray-200">
                                {uni.university} ({uni.state})
                              </p>
                              {isOpen ? (
                                <ChevronUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                              )}
                            </div>
                            {isOpen && uni.description && (
                              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 mt-2 transition-all duration-300 ease-in-out animate-fade-in">
                                <strong className="text-teal-600 dark:text-teal-400">الوصف:</strong> {uni.description}
                              </p>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Button onClick={goToHomePage} className="group w-full sm:w-auto text-base px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 flex items-center justify-center">
          <Home className="w-5 h-5 mr-2" />
          العودة إلى الصفحة الرئيسية
        </Button>
      </div>
    </div>
  );
};



const Orientation = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    grades: {},
    average: '',
    answers: []
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState([]);

  const [majorsData, setMajorsData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // معرف Google Sheet الخاص بك - لا تنسَ تغييره!
  const googleSheetId = "17mw-TXbt9r6verkJthakK4g1kVB_bHPlwXqf-rxOiCM"; // <<<<<<< غير هذا بمعرف ورقة Google Sheet الخاصة بك
  const googleSheetUrl = `https://docs.google.com/spreadsheets/d/${googleSheetId}/export?format=csv&gid=0`;


  const orientationQuestions = useMemo(() => [
    { question: "هل تستمتع بتحليل البيانات المعقدة للوصول إلى استنتاجات منطقية؟", category: "تحليلي" },
    { question: "هل تجد متعة في حل الألغاز أو الألعاب التي تتطلب تفكيراً عميقاً؟", category: "تحليلي" },
    { question: "هل تفضل العمل على مشاريع تتطلب التخطيط الدقيق والمنهجية الواضحة؟", category: "تحليلي" },
    { question: "هل أنت مهتم بكيفية عمل الأجهزة الإلكترونية والتقنيات الحديثة؟", category: "تقني" },
    { question: "هل تستمتع بتعلم استخدام برامج أو أدوات تقنية جديدة؟", category: "تقني" },
    { question: "هل تفكر غالباً في تحسين الأنظمة أو العمليات باستخدام التكنولوجيا؟", category: "تقني" },
    { question: "هل تستمتع بالعمل ضمن فريق والتفاعل مع الآخرين لحل المشكلات؟", category: "اجتماعي" },
    { question: "هل تشعر بالرضا عند تقديم المساعدة أو الدعم للآخرين؟", category: "اجتماعي" },
    { question: "هل تجذبك الأنشطة التي تتطلب التواصل وبناء العلاقات؟", category: "اجتماعي" },
    { question: "هل لديك فضول لمعرفة أسباب الظواهر الطبيعية والعلمية؟", category: "علمي" },
    { question: "هل تستمتع بقراءة المقالات العلمية أو مشاهدة البرامج الوثائقية عن الاكتشافات؟", category: "علمي" },
    { question: "هل تفضل بيئة العمل التي تتضمن التجارب أو البحث المخبري؟", category: "مخبري" },
    { question: "هل تستمتع بقراءة الكتب وكتابة النصوص والتعبير عن الأفكار بالكلمات؟", category: "لغوي" },
    { question: "هل تجد سهولة في تعلم اللغات الأجنبية أو فهم الفروق الدقيقة في اللغة؟", category: "لغوي" },
    { question: "هل تهتم بفهم كيفية عمل الأسواق والأعمال التجارية؟", category: "اقتصادي" },
    { question: "هل تستمتع بتحليل الأرقام والبيانات المالية؟", category: "اقتصادي" },
    { question: "هل تحب تصميم الأشياء أو اكتشاف كيفية بناء المنتجات والمنشآت؟", category: "هندسي" },
    { question: "هل تستمتع بدراسة الأحداث الماضية وتأثيرها على الحاضر؟", category: "تاريخي" },
    { question: "هل تفضل الأنشطة التي تتطلب استخدام المهارات اليدوية أو العمل الملموس؟", category: "عملي" },
    { question: "هل تشعر بالاهتمام بفهم القواعد والأنظمة التي تحكم المجتمع؟", category: "قانوني" },
    { question: "هل تستمتع بالأنشطة الإبداعية مثل الرسم، النحت، أو التصميم الجرافيكي؟", category: "فني" },
    { question: "هل لديك شغف بالبحث عن معلومات جديدة والتعمق في موضوعات مختلفة؟", category: "بحثي" },
    { question: "هل تجد نفسك غالباً في دور تنظيم وتوجيه المجموعات أو الفرق؟", category: "قيادي" },
    { question: "هل تهتم بقضايا البيئة والاستدامة، وكيف يمكن حماية الكوكب؟", category: "بيئي" },
    { question: "هل تستمتع بشرح المفاهيم المعقدة للآخرين ومساعدتهم على التعلم؟", category: "تعليمي" },
    { question: "هل يثير اهتمامك فهم السلوك البشري، الدوافع، والعواطف؟", category: "نفسي" },
    { question: "هل تحب قراءة أو كتابة القصص، الشعر، أو المسرحيات؟", category: "أدبي" },
    { question: "هل تفضل بيئة العمل المنظمة التي تتطلب الدقة في التجريب والملاحظة؟", category: "مخبري" },
    { question: "هل تهتم بمتابعة الأخبار، وسائل الإعلام، أو كيفية نشر المعلومات؟", category: "إعلامي" },
    { question: "أطمح لأن أكون مستقلًا وأدير عملي الخاص.", category: "ريادة أعمال" }
  ], []);

  const subjectsByBranch = useMemo(() => ({
    "علوم تجريبية": [
      "الرياضيات", "العلوم الطبيعية", "الفيزياء", "اللغة العربية",
      "اللغة الفرنسية", "اللغة الإنجليزية", "الفلسفة", "التاريخ والجغرافيا",
      "التربية الإسلامية", "التربية البدنية"
    ],
    "رياضيات": [
      "الرياضيات", "الفيزياء", "العلوم الطبيعية", "اللغة العربية",
      "اللغة الفرنسية", "اللغة الإنجليزية", "الفلسفة", "التاريخ والجغرافيا",
      "التربية الإسلامية", "التربية البدنية"
    ],
    "تقني رياضي": [
      "الرياضيات", "الفيزياء", "التكنولوجيا", "اللغة العربية",
      "اللغة الفرنسية", "الاللغة الإنجليزية", "الفلسفة", "التاريخ والجغرافيا",
      "التربية الإسلامية", "التربية البدنية"
    ],
    "تسيير واقتصاد": [
      "الرياضيات", "التسيير المحاسبي والمالي", "الاقتصاد والمناجمنت", "القانون",
      "اللغة العربية", "اللغة الفرنسية", "اللغة الإنجليزية", "الفلسفة",
      "التاريخ والجغرافيا", "التربية الإسلامية", "التربية البدنية"
    ],
    "آداب وفلسفة": [
      "اللغة العربية وآدابها", "الفلسفة", "التاريخ والجغرافيا", "اللغة الفرنسية",
      "اللغة الإنجليزية", "الرياضيات",
      "التربية الإسلامية", "التربية البدنية"
    ],
    "لغات أجنبية": [
      "اللغة العربية", "اللغة الفرنسية", "اللغة الإنجليزية", "لغة أجنبية ثالثة",
      "الفلسفة", "التاريخ والجغرافيا", "الرياضيات",
       "التربية الإسلامية", "التربية البدنية"
    ]
  }), []);

  const findMatchingMajorKey = useCallback((sheetMajorName, relationsObject) => {
    if (!sheetMajorName) return null;
    const normalizedSheetMajorName = sheetMajorName.toLowerCase().replace(/\s/g, '');

    for (const key in relationsObject) {
      if (key === sheetMajorName) {
        return key;
      }
    }

    for (const key in relationsObject) {
      const normalizedKey = key.toLowerCase().replace(/\s/g, '');
      if (normalizedKey === normalizedSheetMajorName) {
        return key;
      }
    }

    for (const key in relationsObject) {
      const normalizedKey = key.toLowerCase().replace(/\s/g, '');
      if (normalizedKey.includes(normalizedSheetMajorName) || normalizedSheetMajorName.includes(normalizedKey)) {
        return key;
      }
    }
    return null;
  }, []);

  const isMajorRelatedToSubject = useCallback((majorFromSheet, subject) => {
    const matchedMajorKey = findMatchingMajorKey(majorFromSheet, MAJOR_SUBJECT_RELATIONS);
    if (matchedMajorKey && MAJOR_SUBJECT_RELATIONS[matchedMajorKey]) {
      return MAJOR_SUBJECT_RELATIONS[matchedMajorKey].includes(subject);
    }
    return false;
  }, [findMatchingMajorKey]);

  // دالة جديدة لمعالجة أسطر CSV بشكل صحيح مع الحقول المقتبسة
  const parseCsvLine = useCallback((line) => {
      const results = [];
      let current = '';
      let inQuote = false;

      for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
              // Handle escaped quotes (e.g., "" within a quoted field)
              if (inQuote && i + 1 < line.length && line[i + 1] === '"') {
                  current += char; // Add one quote
                  i++; // Skip the next quote (which is the escape)
              } else {
                  inQuote = !inQuote;
              }
          } else if (char === ',' && !inQuote) {
              results.push(current.trim()); // Push current field, trim whitespace
              current = ''; // Reset for next field
          } else {
              current += char;
          }
      }
      results.push(current.trim()); // Add the last field

      // Remove surrounding quotes if present (e.g., "Field" -> Field)
      return results.map(field => {
          if (field.startsWith('"') && field.endsWith('"')) {
              return field.substring(1, field.length - 1);
          }
          return field;
      });
  }, []);

  // جلب البيانات من Google Sheet عند تحميل المكون
  useEffect(() => {
    const fetchMajors = async () => {
      setDataLoading(true);
      try {
        const response = await fetch(googleSheetUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();

        const rows = csvText.split('\n').map(row => row.trim()).filter(row => row.length > 0);
        if (rows.length === 0) {
            throw new Error("ملف CSV فارغ أو لا يحتوي على بيانات.");
        }
        const headers = parseCsvLine(rows[0]); // استخدم parseCsvLine للرؤوس أيضاً

        const jsonData = rows.slice(1).map(row => {
          const values = parseCsvLine(row); // <<<<<<< تم التغيير هنا لاستخدام parseCsvLine
          const obj = {};
          // تأكد من أن ترتيب الأعمدة والمفاتيح هنا يطابق Google Sheet الخاص بك
          // التخصص, الشعبة_المسموح_بها, المعدل_الأدنى, الولاية, اسم الجامعة, الوصف, الميول_المطلوبة
          headers.forEach((header, index) => {
            // استخدام أسماء الرؤوس كمعرفات لزيادة المرونة
            const normalizedHeader = header.toLowerCase().replace(/_/g, '').replace(/\s/g, ''); // لإزالة المسافات والشرطات السفلية
            switch(normalizedHeader) {
                case 'اسمالتخصص': obj.major = values[index]; break;
                case 'الشعبالمسموحلها': obj.allowedBranches = values[index]; break;
                case 'المعدلالادنى': obj.minAverage = values[index]; break;
                case 'الولاية': obj.state = values[index]; break;
                case 'اسمالجامعة': obj.university = values[index]; break;
                case 'وصفالجامعة': obj.description = values[index]; break;
                case 'الميولالمطلوبة': obj.requiredInterests = values[index]; break;
                default: break;
            }
          });
          return obj;
        });

        const formattedData = jsonData.map(item => ({
            c: [
                { v: item.major || '' },
                { v: item.allowedBranches || '' },
                { v: item.minAverage || '' },
                { v: item.state || '' },
                { v: item.university || '' },
                { v: item.description || '' },
                { v: item.requiredInterests || '' }
            ]
        }));
        
        setMajorsData(formattedData);
      } catch (error) {
        console.error("Error fetching majors data:", error);
        setErrors({ data: `حدث خطأ أثناء جلب بيانات التخصصات: ${error.message}. يرجى التأكد من أن Google Sheet منشور على الويب وأن الرابط صحيح.` });
      } finally {
        setDataLoading(false);
      }
    };
    fetchMajors();
  }, [googleSheetUrl, parseCsvLine]); // أضف parseCsvLine كـ dependency

  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  }, []);

  const updateGrades = useCallback((subject, value) => {
    setFormData(prev => ({
      ...prev,
      grades: {
        ...prev.grades,
        [subject]: value
      }
    }));
    setErrors(prev => ({ ...prev, [subject]: '' }));
  }, []);

  const updateAnswer = useCallback((index, value) => {
    setFormData(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[index] = value;
      return { ...prev, answers: newAnswers };
    });
    setErrors(prev => ({ ...prev, answers: '' }));
  }, []);

  const validateStep = useCallback((stepNumber) => {
    const newErrors = {};
    let isValid = true;

    switch(stepNumber) {
      case 1:
        if (!formData.name.trim()) { newErrors.name = "يرجى إدخال الاسم"; isValid = false; }
        if (!formData.branch) { newErrors.branch = "يرجى اختيار الشعبة"; isValid = false; }
        break;
      case 2:
        const average = parseFloat(formData.average);
        if (isNaN(average) || average < 0 || average > 20) {
          newErrors.average = "يرجى إدخال معدل صحيح (0-20)"; isValid = false;
        }
        const subjects = subjectsByBranch[formData.branch] || [];
        subjects.forEach(subject => {
          const grade = parseFloat(formData.grades[subject]);
          if (isNaN(grade) || grade < 0 || grade > 20) {
            newErrors[subject] = `علامة ${subject} غير صحيحة (0-20)`; isValid = false;
          }
        });
        break;
      case 3:
        if (formData.answers.length !== orientationQuestions.length || formData.answers.some(answer => answer === undefined || isNaN(answer) || answer < 1 || answer > 5)) {
          newErrors.answers = `يرجى الإجابة على جميع الأسئلة (${orientationQuestions.length} سؤال) بتقييم من 1 إلى 5`;
          isValid = false;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
    if (!isValid) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return isValid;
  }, [formData, orientationQuestions.length, subjectsByBranch]);

  const nextStep = useCallback(() => {
    if (validateStep(step)) {
      setIsVisible(false);
      setTimeout(() => {
        setStep(prevStep => prevStep + 1);
        setIsVisible(true);
      }, 300);
    }
  }, [step, validateStep]);

  const prevStep = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setStep(prevStep => prevStep - 1);
      setIsVisible(true);
    }, 300);
  }, []);

  const goToHomePage = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const calculateResults = useCallback(() => {
    if (!validateStep(step)) {
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      if (majorsData.length === 0) {
        throw new Error("بيانات التخصصات غير متوفرة. يرجى إعادة تحميل الصفحة أو التأكد من توفر البيانات في Google Sheet.");
      }

      console.log("Student formData:", formData);
      console.log("Majors data fetched:", majorsData);

      const studentInterestScores = {};
      const questionsPerCategory = {};
      orientationQuestions.forEach((question, index) => {
        const answer = formData.answers[index] || 0;
        const category = question.category;
        studentInterestScores[category] = (studentInterestScores[category] || 0) + answer;
        questionsPerCategory[category] = (questionsPerCategory[category] || 0) + 1;
      });
      console.log("Student Interest Scores (sum of answers per category):", studentInterestScores);
      console.log("Questions Per Category:", questionsPerCategory);

      const majorScores = [];
      majorsData.forEach(majorItem => {
        const majorNameFromSheet = majorItem.c[0]?.v;
        const allowedBranchesString = majorItem.c[1]?.v;
        const majorMinAverage = parseFloat(majorItem.c[2]?.v);
        const majorState = majorItem.c[3]?.v || "غير محدد";
        const universityName = majorItem.c[4]?.v || "غير محدد";
        const universityDescription = majorItem.c[5]?.v || "لا يوجد وصف";
        const majorInterestsString = majorItem.c[6]?.v;

        console.log(`\n--- Processing major: "${majorNameFromSheet}" ---`);
        console.log(`  Allowed Branches String: "${allowedBranchesString}"`);
        console.log(`  Major Min Average from Sheet: "${majorItem.c[2]?.v}" (Parsed: ${majorMinAverage})`);
        console.log(`  Major Interests String: "${majorInterestsString}"`);
        console.log(`  University Name: "${universityName}"`); // إضافة log لاسم الجامعة
        console.log(`  University Description: "${universityDescription}"`); // إضافة log لوصف الجامعة

        if (!majorNameFromSheet) {
          console.warn("  Skipping major: No name found.");
          return;
        }

        const allowedBranchesAndDegrees = allowedBranchesString ?
          allowedBranchesString.split(',').map(b => {
            const parts = b.trim().split(':');
            return { branch: parts[0].trim(), degree: parseInt(parts[1], 10) || 1 };
          }) : [];
        console.log("  Parsed Allowed Branches and Degrees:", allowedBranchesAndDegrees);

        const branchSpecificMinAverage = allowedBranchesAndDegrees.find(
          item => item.branch === formData.branch
        )?.degree;

        const isBranchAllowed = branchSpecificMinAverage !== undefined;
        console.log(`  Is Branch ("${formData.branch}") Allowed: ${isBranchAllowed}`);
        console.log(`  Branch Specific Min Average: ${branchSpecificMinAverage}`);

        if (!isBranchAllowed) {
          console.log(`    Skipping "${majorNameFromSheet}": Branch ("${formData.branch}") is not allowed for this major.`);
          return;
        }

        const effectiveMinAverage = branchSpecificMinAverage || majorMinAverage;
        
        console.log(`  Student Average: ${parseFloat(formData.average)}, Effective Min Average: ${effectiveMinAverage}`);
        if (isNaN(effectiveMinAverage) || parseFloat(formData.average) < effectiveMinAverage) {
            console.log(`    Skipping "${majorNameFromSheet}": Student average (${parseFloat(formData.average)}) is less than effective min average (${effectiveMinAverage}).`);
            return;
        }


        const requiredInterests = majorInterestsString ?
          majorInterestsString.split(',').map(interest => interest.trim()) : [];
        console.log(`  Required Interests for "${majorNameFromSheet}":`, requiredInterests);

        let totalScore = 0;
        let details = [];

        let interestMatchScore = 0;
        let totalPossibleInterestScore = 0;

        requiredInterests.forEach(interest => {
          if (studentInterestScores.hasOwnProperty(interest) && questionsPerCategory.hasOwnProperty(interest)) {
            interestMatchScore += studentInterestScores[interest];
            totalPossibleInterestScore += questionsPerCategory[interest] * 5;
          } else {
            console.warn(`    Interest "${interest}" required by major "${majorNameFromSheet}" not found in student's interest scores or categories.`);
          }
        });

        let normalizedInterestContribution = 0;
        if (totalPossibleInterestScore > 0) {
          normalizedInterestContribution = (interestMatchScore / totalPossibleInterestScore);
        }
        totalScore += normalizedInterestContribution * 40;
        details.push(`الميول: ${Math.round(normalizedInterestContribution * 40)} نقطة`);
        console.log(`  Interest Contribution for "${majorNameFromSheet}": ${Math.round(normalizedInterestContribution * 40)} (Normalized: ${normalizedInterestContribution.toFixed(2)})`);

        const averageScore = parseFloat(formData.average) || 0;
        const relativeAverageContribution = (averageScore - effectiveMinAverage) / (20 - effectiveMinAverage);
        const normalizedAverageContribution = Math.max(0, Math.min(1, relativeAverageContribution));
        
        totalScore += normalizedAverageContribution * 30;
        details.push(`المعدل: ${Math.round(normalizedAverageContribution * 30)} نقطة`);
        console.log(`  Average Contribution for "${majorNameFromSheet}": ${Math.round(normalizedAverageContribution * 30)} (Normalized: ${normalizedAverageContribution.toFixed(2)})`);


        let subjectGradesSum = 0;
        let relatedSubjectsCount = 0;
        const subjectsInBranch = subjectsByBranch[formData.branch] || [];
        console.log(`  Subjects in current branch ("${formData.branch}"):`, subjectsInBranch);

        subjectsInBranch.forEach(subject => {
          const grade = parseFloat(formData.grades[subject]) || 0;
          const isRelated = isMajorRelatedToSubject(majorNameFromSheet, subject);
          console.log(`    Subject: "${subject}", Grade: ${grade}, Is Related to "${majorNameFromSheet}": ${isRelated}`);
          if (isRelated) {
            subjectGradesSum += grade;
            relatedSubjectsCount++;
          }
        });

        let normalizedSubjectContribution = 0;
        if (relatedSubjectsCount > 0) {
          const maxPossibleSubjectSum = relatedSubjectsCount * 20;
          normalizedSubjectContribution = (subjectGradesSum / maxPossibleSubjectSum);
        }
        totalScore += normalizedSubjectContribution * 30;
        details.push(`المواد: ${Math.round(normalizedSubjectContribution * 30)} نقطة`);
        console.log(`  Subject Contribution for "${majorNameFromSheet}": ${Math.round(normalizedSubjectContribution * 30)} (Normalized: ${normalizedSubjectContribution.toFixed(2)})`);

        const finalScore = Math.min(Math.max(0, Math.round(totalScore)), 100);
        console.log(`  Calculated Final Score for "${majorNameFromSheet}": ${finalScore}`);


        majorScores.push({
          major: majorNameFromSheet,
          university: universityName,
          state: majorState,
          description: universityDescription,
          // ** تم إزالة هذا السطر - لا نضعه في الكائن لتجنب عرضه **
          // minAverage: effectiveMinAverage, 
          score: finalScore,
          percentage: finalScore,
          details: details.join(' | '),
          requiredInterests: requiredInterests
        });
      });

      console.log("\n--- All Major Scores Before Filtering/Grouping ---");
      console.log(majorScores);

      const groupedResults = {};
      majorScores
        .filter(item => item.score > 0)
        .sort((a, b) => {
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          // إذا كنت لا تريد الفرز بالمعدل الأدنى بعد إزالته من العرض، يمكنك إزالة هذا الجزء
          // ولكن بما أنك لم تطلب إزالته من الحساب، فالترتيب يبقى منطقياً
          return b.minAverage - a.minAverage; 
        })
        .forEach(item => {
          if (!groupedResults[item.major]) {
            groupedResults[item.major] = {
              major: item.major,
              score: item.score,
              details: item.details,
              requiredInterests: item.requiredInterests,
              universities: []
            };
          }
          const existingUni = groupedResults[item.major].universities.find(
            uni => uni.university === item.university && uni.state === item.state
          );
          if (!existingUni) {
            groupedResults[item.major].universities.push({
              university: item.university,
              state: item.state,
              description: item.description,
              // ** تم إزالة هذا السطر - لا نضعه في قائمة الجامعات المعروضة **
              // minAverage: item.minAverage 
            });
          }
        });

      const finalSortedResults = Object.values(groupedResults).sort((a, b) => b.score - a.score);
      console.log("\n--- Final Sorted Results ---");
      console.log(finalSortedResults);


      setResult(finalSortedResults);
      setStep(4);
    } catch (error) {
      console.error("خطأ في عملية الحساب:", error);
      setErrors({ calculation: error.message || "حدث خطأ أثناء حساب النتائج. يرجى المحاولة مرة أخرى." });
    } finally {
      setLoading(false);
    }
  }, [formData, majorsData, orientationQuestions, subjectsByBranch, step, validateStep, isMajorRelatedToSubject]);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 dark:from-slate-900 dark:via-blue-900/50 dark:to-teal-900/50 overflow-hidden">
      <AnimatedBackground />

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

      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen max-w-4xl w-full space-y-8 p-8 mx-auto my-auto">
        {dataLoading ? (
          <div className="text-center text-lg text-gray-600 dark:text-gray-400 p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl">
            <svg className="animate-spin h-8 w-8 text-teal-500 mx-auto mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>جارٍ تحميل بيانات التخصصات...</p>
          </div>
        ) : errors.data ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">خطأ!</strong>
            <span className="block sm:inline"> {errors.data}</span>
          </div>
        ) : (
          <>
            {step === 1 && (
              <Step1Content
                formData={{ ...formData, subjectsByBranch: subjectsByBranch }}
                updateFormData={updateFormData}
                nextStep={nextStep}
                errors={errors}
                isVisible={isVisible}
              />
            )}

            {step === 2 && formData.branch && (
              <Step2Content
                formData={{ ...formData, subjectsByBranch: subjectsByBranch }}
                updateFormData={updateFormData}
                updateGrades={updateGrades}
                prevStep={prevStep}
                nextStep={nextStep}
                errors={errors}
              />
            )}

            {step === 3 && (
              <Step3Content
                orientationQuestions={orientationQuestions}
                formData={formData}
                updateAnswer={updateAnswer}
                calculateResults={calculateResults}
                prevStep={prevStep}
                loading={loading}
                errors={errors}
              />
            )}

            {step === 4 && (
              <Step4Content
                result={result}
                goToHomePage={goToHomePage}
                errors={errors}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Orientation;
