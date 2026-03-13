import type { Metadata } from 'next';
import HomepageInteractive from './components/HomepageInteractive';

export const metadata: Metadata = {
  title: 'Ski Boom Gudauri - Premium Ski Equipment Rental & Lessons in Gudauri',
  description: 'Experience the thrill of Gudauri slopes with premium ski equipment rental and expert lessons. Book online for the best rates on quality gear and professional instruction in the heart of the Caucasus Mountains.',
};

export default function Homepage() {
  return <HomepageInteractive />;
}