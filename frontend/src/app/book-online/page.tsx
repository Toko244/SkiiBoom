import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import BookOnlineInteractive from './components/BookOnlineInteractive';

export const metadata: Metadata = {
  title: 'Book Online - SkiBoom Gudauri',
  description: 'Reserve premium ski equipment and expert lessons online. Complete your booking with our streamlined multilingual system supporting Georgian Lari, Euro, and US Dollar payments.',
};

export default function BookOnlinePage() {
  return (
    <>
      <Header />
      <BookOnlineInteractive />
    </>
  );
}