import AppImage from '@/components/ui/AppImage';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  backgroundAlt: string;
  pageContent?: Record<string, unknown> | null;
}

export default function HeroSection({ title, subtitle, backgroundImage, backgroundAlt, pageContent }: HeroSectionProps) {
  const hero = pageContent?.hero as Record<string, string> | undefined;
  const resolvedTitle = hero?.title || title;
  const resolvedSubtitle = hero?.subtitle || subtitle;
  const resolvedImage = hero?.background_image || backgroundImage;
  const resolvedAlt = hero?.background_alt || backgroundAlt;
  return (
    <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <AppImage
          src={resolvedImage}
          alt={resolvedAlt}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="font-outfit font-bold text-4xl lg:text-6xl text-white mb-4 leading-tight">
          {resolvedTitle}
        </h1>
        <p className="font-inter font-medium text-lg lg:text-xl text-white/90 max-w-3xl leading-relaxed">
          {resolvedSubtitle}
        </p>
      </div>
    </section>
  );
}