import type { Metadata } from 'next';
import AboutUsInteractive from './components/AboutUsInteractive';

export const metadata: Metadata = {
  title: 'About Us - SkiBoom Gudauri',
  description: 'Discover the story behind Gudauri\'s premier ski equipment rental and lesson provider. Meet our expert team, explore our certifications, and learn why thousands trust us for their mountain adventures.',
};

export default function AboutUsPage() {
  return <AboutUsInteractive />;
}
