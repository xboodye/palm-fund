import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlantedPalmTrees } from '@/entities';
import { Image } from '@/components/ui/image';

interface TreeDetailModalProps {
  tree: PlantedPalmTrees;
  onClose: () => void;
  formatDate: (date: Date | string | undefined) => string;
}

export default function TreeDetailModal({ tree, onClose, formatDate }: TreeDetailModalProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background bg-opacity-95"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl bg-donor-card-background overflow-hidden z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 text-secondary hover:text-accent-green transition-colors duration-300"
            aria-label="Close modal"
          >
            <X size={32} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative aspect-square lg:aspect-auto lg:min-h-[600px]">
              <Image
                src={tree.palmTreePhoto || 'https://static.wixstatic.com/media/17c871_e0733f5609a348c7a99ae5b1cfb6aa66~mv2.png?originWidth=576&originHeight=576'}
                alt={`Palm tree planted by ${tree.donorName || 'Anonymous'}`}
                className="w-full h-full object-cover"
                width={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40"></div>
            </div>

            {/* Details Section */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <div className="font-paragraph text-xs text-accent-green mb-3 tracking-wider">
                  TREE DETAILS
                </div>
                <h2 className="font-heading text-4xl md:text-5xl text-secondary mb-4 leading-tight">
                  {tree.donorName || 'Anonymous Donor'}
                </h2>
              </div>

              <div className="space-y-6 mb-8">
                <div className="border-l-4 border-accent-green pl-6">
                  <div className="font-paragraph text-xs text-secondary opacity-60 mb-2">
                    DONATION ID
                  </div>
                  <div className="font-paragraph text-lg text-secondary">
                    {tree.donationId || 'Not available'}
                  </div>
                </div>

                <div className="border-l-4 border-accent-green pl-6">
                  <div className="font-paragraph text-xs text-secondary opacity-60 mb-2">
                    PLANTING DATE
                  </div>
                  <div className="font-paragraph text-lg text-secondary">
                    {formatDate(tree.plantingDate)}
                  </div>
                </div>

                {tree.treeDescription && (
                  <div className="border-l-4 border-accent-green pl-6">
                    <div className="font-paragraph text-xs text-secondary opacity-60 mb-2">
                      DESCRIPTION
                    </div>
                    <div className="font-paragraph text-base text-secondary leading-relaxed">
                      {tree.treeDescription}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-secondary border-opacity-20">
                <p className="font-paragraph text-sm text-secondary opacity-60 leading-relaxed">
                  This palm tree stands as a living monument to {tree.donorName || 'an anonymous donor'}'s commitment to environmental action. Every tree in The Grove represents a choice to create lasting impact.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
