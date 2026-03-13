import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import GalleryInteractive from './components/GalleryInteractive';

export const metadata: Metadata = {
  title: 'Gallery - SkiBoom Gudauri',
  description: 'Experience the magic of Gudauri through stunning photos from our community. Browse customer adventures, slope conditions, and equipment in action. Share your own skiing memories and inspire others.',
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        <GalleryInteractive />
      </main>
    </div>
  );
}