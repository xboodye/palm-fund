export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-background border-t-2 border-accent-green">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <h3 className="font-heading text-4xl md:text-5xl text-accent-green mb-6">
              البستان
            </h3>
            <p className="font-paragraph text-base text-secondary leading-relaxed max-w-md">
              بيان جريء للعمل الجماعي. كل نخلة مزروعة هي شهادة على قوة المساهمات الفردية التي تخلق تأثيراً بيئياً دائماً.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-heading text-2xl text-secondary mb-6">
              التنقل
            </h4>
            <nav className="flex flex-col gap-4">
              <a 
                href="#gallery" 
                className="font-paragraph text-base text-secondary hover:text-accent-green transition-colors duration-300"
              >
                المعرض
              </a>
              <a 
                href="#search" 
                className="font-paragraph text-base text-secondary hover:text-accent-green transition-colors duration-300"
              >
                البحث عن الأشجار
              </a>
              <a 
                href="#donate" 
                className="font-paragraph text-base text-secondary hover:text-accent-green transition-colors duration-300"
              >
                تبرع
              </a>
            </nav>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4">
            <h4 className="font-heading text-2xl text-secondary mb-6">
              تواصل
            </h4>
            <div className="space-y-4">
              <div>
                <p className="font-paragraph text-xs text-secondary opacity-60 mb-1">
                  البريد الإلكتروني
                </p>
                <a 
                  href="mailto:info@thegrove.org" 
                  className="font-paragraph text-base text-accent-green hover:text-secondary transition-colors duration-300"
                >
                  info@thegrove.org
                </a>
              </div>
              <div>
                <p className="font-paragraph text-xs text-secondary opacity-60 mb-1">
                  الهاتف
                </p>
                <a 
                  href="tel:+1234567890" 
                  className="font-paragraph text-base text-accent-green hover:text-secondary transition-colors duration-300"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary border-opacity-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-secondary opacity-60">
              © 2026 البستان. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-8">
              <a 
                href="#privacy" 
                className="font-paragraph text-sm text-secondary opacity-60 hover:text-accent-green hover:opacity-100 transition-all duration-300"
              >
                سياسة الخصوصية
              </a>
              <a 
                href="#terms" 
                className="font-paragraph text-sm text-secondary opacity-60 hover:text-accent-green hover:opacity-100 transition-all duration-300"
              >
                شروط الخدمة
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
