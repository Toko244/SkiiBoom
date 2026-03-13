import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import SkiLessonsInteractive from './components/SkiLessonsInteractive';

export const metadata: Metadata = {
  title: 'Ski Lessons - SkiBoomGudauri',
  description: 'Learn to ski with certified instructors in Gudauri. From beginner to advanced lessons, we offer personalized instruction with local expertise and international standards.',
};

export default function SkiLessonsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 lg:pt-20">
        <SkiLessonsInteractive />
      </div>
    </main>
  );
}