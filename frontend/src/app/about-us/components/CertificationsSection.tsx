import Icon from '@/components/ui/AppIcon';

interface Certification {
  id: number;
  icon: string;
  title: string;
  description: string;
  issuer: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
  pageContent?: Record<string, unknown> | null;
}

export default function CertificationsSection({ certifications, pageContent }: CertificationsSectionProps) {
  const certsContent = pageContent?.certifications as Record<string, string> | undefined;
  return (
    <section className="py-16 lg:py-24 bg-trustBuilder">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-3xl lg:text-5xl text-white mb-4">
            {certsContent?.title || 'Certifications & Standards'}
          </h2>
          <p className="font-inter text-lg text-white/80 max-w-3xl mx-auto">
            {certsContent?.subtitle || 'Your safety and satisfaction are backed by international certifications and Georgian business standards'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Icon name={cert.icon as any} size={32} variant="solid" className="text-primary-foreground" />
              </div>
              <h3 className="font-outfit font-semibold text-xl text-white mb-2">
                {cert.title}
              </h3>
              <p className="font-inter text-sm text-white/70 mb-3 leading-relaxed">
                {cert.description}
              </p>
              <p className="font-inter text-xs text-white/60">
                Issued by: {cert.issuer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}