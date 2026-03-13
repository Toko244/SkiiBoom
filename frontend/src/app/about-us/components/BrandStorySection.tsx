import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface StoryPoint {
  icon: string;
  title: string;
  description: string;
}

interface BrandStorySectionProps {
  storyPoints: StoryPoint[];
  mainImage: string;
  mainImageAlt: string;
  storyText: string;
  pageContent?: Record<string, unknown> | null;
}

export default function BrandStorySection({ storyPoints, mainImage, mainImageAlt, storyText, pageContent }: BrandStorySectionProps) {
  const brandStory = pageContent?.brand_story as Record<string, unknown> | undefined;
  const resolvedTitle = (brandStory?.title as string) || 'Our Story';
  const resolvedNarrative = (brandStory?.narrative as string) || storyText;
  const resolvedImage = (brandStory?.main_image as string) || mainImage;
  const resolvedImageAlt = (brandStory?.main_image_alt as string) || mainImageAlt;
  const apiStoryPoints = brandStory?.story_points as StoryPoint[] | undefined;
  const resolvedStoryPoints = apiStoryPoints?.length ? apiStoryPoints : storyPoints;
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-3xl lg:text-5xl text-foreground mb-4">
            {resolvedTitle}
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {resolvedNarrative}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-elevated">
            <AppImage
              src={resolvedImage}
              alt={resolvedImageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-8">
            {resolvedStoryPoints.map((point, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name={point.icon as any} size={24} variant="solid" className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-outfit font-semibold text-xl text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}