// HPI 1.7-G
import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Leaf, Hash, Calendar, User } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { PlantedPalmTrees } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TreeDetailModal from '@/components/TreeDetailModal';

export default function HomePage() {
  // --- DATA FIDELITY PROTOCOL: CANONICAL SOURCES ---
  const [trees, setTrees] = useState<PlantedPalmTrees[]>([]);
  const [filteredTrees, setFilteredTrees] = useState<PlantedPalmTrees[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTree, setSelectedTree] = useState<PlantedPalmTrees | null>(null);

  useEffect(() => {
    loadTrees();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTrees(trees);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = trees.filter(tree => 
        tree.donorName?.toLowerCase().includes(query) ||
        tree.donationId?.toLowerCase().includes(query)
      );
      setFilteredTrees(filtered);
    }
  }, [searchQuery, trees]);

  const loadTrees = async () => {
    try {
      const result = await BaseCrudService.getAll<PlantedPalmTrees>('plantedpalmtrees');
      setTrees(result.items);
      setFilteredTrees(result.items);
    } catch (error) {
      console.error('Failed to load trees:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'التاريخ غير متاح';
    const d = new Date(date);
    return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  // --- END DATA FIDELITY PROTOCOL ---

  // --- MOTION & LAYOUT REFS ---
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "-20%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  // Asymmetrical Grid Pattern Generator
  const getGridSpan = (index: number) => {
    const spans = [
      "col-span-12 lg:col-span-8 row-span-2 min-h-[60vh] lg:min-h-[80vh]", // Massive feature
      "col-span-12 lg:col-span-4 min-h-[40vh]", // Standard side
      "col-span-12 lg:col-span-4 min-h-[40vh]", // Standard side
      "col-span-12 lg:col-span-5 min-h-[50vh]", // Offset medium
      "col-span-12 lg:col-span-7 min-h-[50vh]", // Offset large
      "col-span-12 min-h-[60vh]", // Full width breaker
    ];
    return spans[index % spans.length];
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-secondary selection:bg-accent-green selection:text-primary-foreground overflow-clip font-paragraph" dir="rtl">
      <style>{`
        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 50;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
        .text-stroke {
          -webkit-text-stroke: 2px #FFFFFF;
          color: transparent;
        }
        .text-stroke-accent {
          -webkit-text-stroke: 2px #39FF14;
          color: transparent;
        }
        /* Hide scrollbar for horizontal scroll areas if any */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div className="noise-overlay" />
      <Header />

      {/* 1. HERO SECTION: The Disruptive Entry */}
      <section ref={heroRef} className="relative w-full min-h-[100vh] flex items-center pt-24 pb-12 overflow-hidden bg-background">
        {/* Background Typography Parallax */}
        <motion.div 
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-0 overflow-hidden"
        >
          <h1 className="font-heading text-[15vw] leading-[0.8] text-stroke opacity-20 whitespace-nowrap transform -rotate-2 scale-110">
            العمل
          </h1>
          <h1 className="font-heading text-[15vw] leading-[0.8] text-stroke-accent opacity-20 whitespace-nowrap transform -rotate-2 scale-110 ml-32">
            الجماعي
          </h1>
        </motion.div>

        <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-8 md:px-16 relative z-10">
          <div className="grid grid-cols-12 gap-8 items-center">
            
            {/* Left: Monumental Typography */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-block bg-accent-green text-primary-foreground px-4 py-2 font-bold text-sm tracking-widest mb-8 transform -skew-x-12">
                  المشروع: البستان
                </div>
                <h2 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] text-secondary mb-8 uppercase">
                  كل شجرة <br/>
                  <span className="text-accent-green">تحكي</span> <br/>
                  قصة.
                </h2>
                <p className="font-paragraph text-lg md:text-xl text-secondary/80 max-w-2xl mb-12 leading-relaxed border-r-4 border-accent-green pr-6">
                  هذا ليس مجرد معرض. هذا شهادة حية على العمل الجماعي. كل نخلة تراها هنا تمثل متبرعاً اختار إحداث تأثير ملموس. مساهمتك لا تختفي - فهي تنمو وتتنفس وتقف شامخة.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <a 
                    href="#gallery" 
                    className="group relative inline-flex items-center justify-center bg-accent-green text-primary-foreground font-heading text-xl font-bold px-10 py-5 overflow-hidden transition-transform hover:scale-105"
                  >
                    <span className="absolute inset-0 w-full h-full bg-secondary transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                    <span className="relative flex items-center gap-3 group-hover:text-secondary-foreground transition-colors duration-300">
                      استكشف البستان <ArrowRight className="w-6 h-6" />
                    </span>
                  </a>
                  <a 
                    href="#search" 
                    className="group inline-flex items-center justify-center bg-transparent text-secondary font-heading text-xl font-bold px-10 py-5 border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                  >
                    ابحث عن تأثيرك
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right: Brutalist Image Container */}
            <div className="col-span-12 lg:col-span-5 mt-16 lg:mt-0 relative h-[60vh] lg:h-[80vh]">
              <motion.div 
                style={{ y: heroImageY }}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Decorative offset border */}
                <div className="absolute inset-0 border-4 border-accent-green transform translate-x-4 translate-y-4 z-0" />
                
                <div className="relative z-10 w-full h-full overflow-hidden bg-donor-card-background">
                  <Image
                    src="https://static.wixstatic.com/media/17c871_3ffb3722d63b488787a6e8270b2f458f~mv2.png?originWidth=1152&originHeight=768"
                    alt="A thriving palm tree in the grove"
                    className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  />
                  {/* Overlay Stats */}
                  <div className="absolute bottom-0 left-0 w-full bg-background/90 backdrop-blur-sm border-t border-accent-green/30 p-6 flex justify-between items-end">
                    <div>
                      <div className="text-accent-green text-xs font-bold tracking-widest mb-1">العدد الحي</div>
                      <div className="font-heading text-5xl text-secondary">{trees.length}</div>
                    </div>
                    <div className="text-left">
                      <div className="text-secondary/60 text-xs font-bold tracking-widest mb-1">الحالة</div>
                      <div className="font-paragraph text-lg text-secondary">ينمو</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. IMPACT STATS: The Bold Declaration */}
      <section ref={statsRef} className="w-full bg-accent-green text-primary-foreground py-20 border-y-8 border-secondary">
        <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y-4 md:divide-y-0 md:divide-x-4 divide-primary-foreground/20">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col items-center text-center pt-8 md:pt-0 px-4"
            >
              <Leaf className="w-12 h-12 mb-6 opacity-80" />
              <div className="font-heading text-7xl lg:text-8xl mb-2 tracking-tighter">
                {trees.length}
              </div>
              <div className="font-paragraph text-xl font-bold uppercase tracking-widest">
                أشجار مزروعة
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center text-center pt-8 md:pt-0 px-4"
            >
              <User className="w-12 h-12 mb-6 opacity-80" />
              <div className="font-heading text-7xl lg:text-8xl mb-2 tracking-tighter">
                {new Set(trees.map(t => t.donorName)).size}
              </div>
              <div className="font-paragraph text-xl font-bold uppercase tracking-widest">
                متبرعون فريدون
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center pt-8 md:pt-0 px-4"
            >
              <Hash className="w-12 h-12 mb-6 opacity-80" />
              <div className="font-heading text-7xl lg:text-8xl mb-2 tracking-tighter">
                100<span className="text-5xl">%</span>
              </div>
              <div className="font-paragraph text-xl font-bold uppercase tracking-widest">
                الشفافية
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. SEARCH SECTION: The Terminal */}
      <section id="search" className="w-full bg-secondary text-secondary-foreground py-32 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)] opacity-10" />
        
        <div className="w-full max-w-[100rem] mx-auto px-4 sm:px-8 md:px-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-3 h-3 bg-accent-green rounded-full animate-pulse" />
              <span className="font-paragraph text-sm font-bold tracking-widest uppercase">استعلام النظام</span>
            </div>
            
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl mb-12 uppercase leading-none">
              حدد <br/>تأثيرك.
            </h2>
            
            <div className="relative group">
              <div className="absolute -inset-2 bg-accent-green opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-lg" />
              <div className="relative flex items-center bg-background border-4 border-secondary-foreground p-2">
                <div className="bg-accent-green p-4 flex items-center justify-center">
                  <Search className="w-8 h-8 text-primary-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="أدخل اسم المتبرع أو المعرف_"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-secondary font-paragraph text-2xl md:text-4xl px-6 py-6 focus:outline-none placeholder:text-secondary/30 uppercase"
                />
              </div>
            </div>

            <AnimatePresence>
              {searchQuery && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 bg-secondary-foreground text-secondary p-6 border-r-8 border-accent-green"
                >
                  <p className="font-paragraph text-xl">
                    <span className="text-accent-green">{'<'}</span> وجدت {filteredTrees.length} سجل مطابق
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 4. GALLERY SECTION: The Asymmetrical Grid */}
      <section id="gallery" className="w-full bg-background py-32 relative">
        <div className="w-full max-w-[120rem] mx-auto px-4 sm:px-8 md:px-16">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-b border-secondary/20 pb-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-6xl md:text-8xl text-secondary uppercase leading-none">
                المعرض <br/>
                <span className="text-accent-green">الحي</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-md"
            >
              <p className="font-paragraph text-lg text-secondary/70 text-left">
                تمثيل هيكلي للكرم. كل كتلة هي حياة مزروعة، قصة متجذرة في الأرض.
              </p>
            </motion.div>
          </div>

          {/* The Grid Container - ALWAYS rendered to prevent crash */}
          <div className="min-h-[50vh]">
            {isLoading ? (
              <div className="w-full h-[50vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-secondary border-t-accent-green rounded-full animate-spin" />
                  <div className="font-paragraph text-accent-green tracking-widest uppercase">جاري تحميل بيانات البستان...</div>
                </div>
              </div>
            ) : filteredTrees.length > 0 ? (
              <div className="grid grid-cols-12 gap-4 md:gap-8 auto-rows-auto">
                {filteredTrees.map((tree, index) => {
                  const spanClass = getGridSpan(index);
                  return (
                    <motion.div
                      key={tree._id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                      className={`${spanClass} group relative bg-donor-card-background cursor-pointer overflow-hidden border border-secondary/10 hover:border-accent-green transition-colors duration-500`}
                      onClick={() => setSelectedTree(tree)}
                    >
                      {/* Image Background */}
                      <div className="absolute inset-0 w-full h-full">
                        <Image
                          src={tree.palmTreePhoto || 'https://static.wixstatic.com/media/17c871_551046d20a404510a225b7370fdc5313~mv2.png?originWidth=768&originHeight=576'}
                          alt={`Palm tree planted by ${tree.donorName || 'Anonymous'}`}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                        />
                        {/* Gradient Overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                        {/* Top Bar */}
                        <div className="flex justify-between items-start">
                          <div className="bg-background/80 backdrop-blur-md px-3 py-1 border border-secondary/20 font-paragraph text-xs text-accent-green tracking-widest">
                            المعرف: {tree.donationId || 'غير معروف'}
                          </div>
                          <div className="w-10 h-10 rounded-full border border-secondary/30 flex items-center justify-center group-hover:bg-accent-green group-hover:border-accent-green group-hover:text-primary-foreground transition-all duration-300">
                            <ArrowRight className="w-5 h-5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                          </div>
                        </div>

                        {/* Bottom Info */}
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="font-paragraph text-sm text-secondary/60 mb-2 flex items-center gap-2 uppercase tracking-wider">
                            <User className="w-4 h-4" /> المتبرع
                          </div>
                          <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-secondary mb-4 leading-none group-hover:text-accent-green transition-colors duration-300">
                            {tree.donorName || 'Anonymous'}
                          </h3>
                          
                          <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            <div className="flex items-center gap-2 font-paragraph text-sm text-secondary/80">
                              <Calendar className="w-4 h-4 text-accent-green" />
                              {tree.plantingDate ? new Date(tree.plantingDate).toLocaleDateString('ar-SA', { month: 'short', year: 'numeric' }) : 'التاريخ غير متاح'}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover Border Effect */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent-green group-hover:w-full transition-all duration-700 ease-out" />
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full py-32 flex flex-col items-center justify-center text-center border-4 border-dashed border-secondary/20">
                <Leaf className="w-24 h-24 text-secondary/20 mb-8" />
                <h3 className="font-heading text-5xl text-secondary mb-4 uppercase">
                  لم يتم العثور على سجلات
                </h3>
                <p className="font-paragraph text-xl text-secondary/60 max-w-md">
                  لم تعيد الاستعلام أي نتائج. اضبط معاملات البحث الخاصة بك لاستكشاف البستان.
                </p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-8 bg-secondary text-secondary-foreground px-8 py-4 font-bold uppercase tracking-widest hover:bg-accent-green transition-colors"
                >
                  مسح البحث
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION: The Final Push */}
      <section className="w-full bg-accent-green py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://static.wixstatic.com/media/17c871_84751d8ef42741dd9d7be5d7afc10dfa~mv2.png?originWidth=1152&originHeight=576')] bg-cover bg-center opacity-10 mix-blend-multiply" />
        <div className="w-full max-w-[100rem] mx-auto px-4 sm:px-8 md:px-16 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-6xl md:text-8xl lg:text-9xl text-primary-foreground uppercase leading-none mb-8">
              ازرع <br/> إرثك.
            </h2>
            <p className="font-paragraph text-2xl text-primary-foreground/80 max-w-2xl mx-auto mb-12">
              انضم إلى الحركة. أضف اسمك إلى البستان وأحدث تأثيراً ملموساً على الكوكب اليوم.
            </p>
            <button className="bg-background text-secondary font-heading text-2xl px-16 py-8 uppercase hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300 border-4 border-background hover:border-secondary">
              تبرع الآن
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Tree Detail Modal */}
      <AnimatePresence>
        {selectedTree && (
          <TreeDetailModal
            tree={selectedTree}
            onClose={() => setSelectedTree(null)}
            formatDate={formatDate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
