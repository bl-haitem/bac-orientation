import { Linkedin, Mail, Link } from "lucide-react"; // Changed Instagram and Globe to Linkedin and Link

export default function Footer() {
  return (
    <footer className="relative z-10 mt-0 py-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-t-3xl border-t border-gray-200/50 dark:border-gray-700/50 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* اسم المنصة */}
        <div className="text-2xl font-extrabold text-teal-700 dark:text-teal-300">
          📘 وجهني
        </div>

        {/* الروابط */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 items-center text-sm">
          <a
            href="https://haitem-belaib-portfolio.web.app/" // Portfolio link
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 flex items-center gap-2 transition-colors duration-300"
          >
            <Link size={20} /> Portfolio
          </a>

          <a
            href="https://www.linkedin.com/in/haitem-belaib-61b621353/" // LinkedIn link
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors duration-300"
          >
            <Linkedin size={20} /> LinkedIn
          </a>

          <a
            href="mailto:your_email@example.com" // Email link (kept as is from your original code)
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors duration-300"
          >
            <Mail size={20} /> Email
          </a>
        </div>

        {/* الحقوق */}
        <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-right">
          <p>© 2025 جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}
