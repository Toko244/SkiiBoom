import AppImage from '@/components/ui/AppImage';

interface HeroSectionProps {
  className?: string;
  pageContent?: Record<string, unknown> | null;
}

const HeroSection = ({ className = '', pageContent }: HeroSectionProps) => {
  const hero = pageContent?.hero as Record<string, string> | undefined;

  return (
    <section className={`relative h-[500px] lg:h-[600px] overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <AppImage
          src={hero?.background_image || "https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg"}
          alt={hero?.background_alt || "Professional ski instructor teaching beginner student proper skiing stance on snowy mountain slope with blue sky background"}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="font-outfit font-bold text-4xl lg:text-6xl mb-4 leading-tight">
            {hero?.title || "Master the Mountains with Expert Instruction"}
          </h1>
          <p className="font-inter text-lg lg:text-xl mb-8 text-gray-200">
            {hero?.subtitle || "From first turns to perfect powder days - our certified instructors guide you every step of the way"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-conversionAccent text-white rounded-md font-outfit font-semibold text-lg hover:bg-ctaHover transition-all duration-300 shadow-elevated">
              {hero?.button1 || "Book Your Lesson"}
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-md font-outfit font-semibold text-lg hover:bg-white/20 transition-all duration-300">
              {hero?.button2 || "View Instructors"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;