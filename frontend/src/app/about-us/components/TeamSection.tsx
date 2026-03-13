'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  alt: string;
  bio: string;
  certifications: string[];
  experience: string;
}

interface TeamSectionProps {
  teamMembers: TeamMember[];
  pageContent?: Record<string, unknown> | null;
}

export default function TeamSection({ teamMembers, pageContent }: TeamSectionProps) {
  const teamContent = pageContent?.team as Record<string, string> | undefined;
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-3xl lg:text-5xl text-foreground mb-4">
            {teamContent?.title || 'Meet Our Expert Team'}
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto">
            {teamContent?.subtitle || 'Passionate professionals dedicated to making your mountain experience unforgettable'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-background rounded-lg overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative h-64 overflow-hidden">
                <AppImage
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-outfit font-semibold text-xl text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="font-inter text-sm text-secondary mb-3">
                  {member.role}
                </p>
                <p className="font-inter text-sm text-muted-foreground line-clamp-3">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {selectedMember && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelectedMember(null)}>
            <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="relative h-80">
                <AppImage
                  src={selectedMember.image}
                  alt={selectedMember.alt}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-background/90 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                  aria-label="Close modal"
                >
                  <Icon name="XMarkIcon" size={24} variant="outline" />
                </button>
              </div>
              <div className="p-8">
                <h3 className="font-outfit font-bold text-2xl text-foreground mb-2">
                  {selectedMember.name}
                </h3>
                <p className="font-inter text-lg text-secondary mb-4">
                  {selectedMember.role}
                </p>
                <p className="font-inter text-muted-foreground mb-6 leading-relaxed">
                  {selectedMember.bio}
                </p>
                <div className="mb-6">
                  <h4 className="font-outfit font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
                    <Icon name="AcademicCapIcon" size={20} variant="solid" className="text-primary" />
                    {teamContent?.certifications_label || 'Certifications'}
                  </h4>
                  <ul className="space-y-2">
                    {selectedMember.certifications.map((cert, index) => (
                      <li key={index} className="font-inter text-sm text-muted-foreground flex items-start gap-2">
                        <Icon name="CheckCircleIcon" size={16} variant="solid" className="text-success mt-0.5 flex-shrink-0" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="ClockIcon" size={16} variant="outline" />
                  <span className="font-inter">{selectedMember.experience}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}