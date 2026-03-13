import Icon from '@/components/ui/AppIcon';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  currentLanguage: string;
  pageContent?: Record<string, unknown> | null;
}

const iconMap: Record<number, string> = {
  0: 'ShieldCheckIcon',
  1: 'UserGroupIcon',
  2: 'ClockIcon',
  3: 'MapPinIcon',
  4: 'CurrencyDollarIcon',
  5: 'ChatBubbleLeftRightIcon',
};

const WhyChooseUs = ({ currentLanguage, pageContent }: WhyChooseUsProps) => {
  const wcu = pageContent?.why_choose_us as { title?: string; subtitle?: string; features?: { title: string; description: string }[] } | undefined;

  const fallbackFeatures: Feature[] = [
    { icon: "ShieldCheckIcon", title: "Premium Quality Equipment", description: "Top-brand skis, snowboards, and gear maintained to the highest standards for your safety and performance." },
    { icon: "UserGroupIcon", title: "Expert Instructors", description: "Certified professionals with years of experience teaching all skill levels in multiple languages." },
    { icon: "ClockIcon", title: "Flexible Booking", description: "Easy online reservations with flexible cancellation policies and instant confirmation." },
    { icon: "MapPinIcon", title: "Prime Location", description: "Conveniently located in the heart of Gudauri with direct access to the best slopes." },
    { icon: "CurrencyDollarIcon", title: "Competitive Pricing", description: "Best value for money with transparent pricing and special packages for families and groups." },
    { icon: "ChatBubbleLeftRightIcon", title: "Multilingual Support", description: "Customer service in Georgian, English, Russian, and more to ensure clear communication." },
  ];

  const fallback = {
    en: { title: "Why Choose Ski Boom Gudauri", subtitle: "Experience the difference with our premium service", features: fallbackFeatures },
    ka: {
      title: "რატომ აირჩიოთ Ski Boom Gudauri", subtitle: "გამოსცადეთ განსხვავება ჩვენი პრემიუმ სერვისით",
      features: [
        { icon: "ShieldCheckIcon", title: "პრემიუმ ხარისხის აღჭურვილობა", description: "ტოპ ბრენდის თხილამურები, სნოუბორდები და აღჭურვილობა, რომელიც შენარჩუნებულია უმაღლეს სტანდარტებზე თქვენი უსაფრთხოებისა და შესრულებისთვის." },
        { icon: "UserGroupIcon", title: "ექსპერტი ინსტრუქტორები", description: "სერტიფიცირებული პროფესიონალები წლების გამოცდილებით, რომლებიც ასწავლიან ყველა დონეს რამდენიმე ენაზე." },
        { icon: "ClockIcon", title: "მოქნილი დაჯავშნა", description: "მარტივი ონლაინ რეზერვაციები მოქნილი გაუქმების პოლიტიკით და მყისიერი დადასტურებით." },
        { icon: "MapPinIcon", title: "პრემიერ ლოკაცია", description: "მოხერხებულად მდებარეობს გუდაურის გულში პირდაპირი წვდომით საუკეთესო ფერდობებზე." },
        { icon: "CurrencyDollarIcon", title: "კონკურენტული ფასები", description: "საუკეთესო ღირებულება ფულისთვის გამჭვირვალე ფასებით და სპეციალური პაკეტებით ოჯახებისა და ჯგუფებისთვის." },
        { icon: "ChatBubbleLeftRightIcon", title: "მრავალენოვანი მხარდაჭერა", description: "მომხმარებელთა სერვისი ქართულ, ინგლისურ, რუსულ და სხვა ენებზე მკაფიო კომუნიკაციის უზრუნველსაყოფად." },
      ]
    },
    ru: {
      title: "Почему выбирают Ski Boom Gudauri", subtitle: "Почувствуйте разницу с нашим премиальным сервисом",
      features: [
        { icon: "ShieldCheckIcon", title: "Премиальное качество оборудования", description: "Лыжи, сноуборды и снаряжение ведущих брендов, обслуживаемые по самым высоким стандартам для вашей безопасности и производительности." },
        { icon: "UserGroupIcon", title: "Опытные инструкторы", description: "Сертифицированные профессионалы с многолетним опытом обучения всех уровней на нескольких языках." },
        { icon: "ClockIcon", title: "Гибкое бронирование", description: "Простое онлайн-бронирование с гибкой политикой отмены и мгновенным подтверждением." },
        { icon: "MapPinIcon", title: "Отличное расположение", description: "Удобно расположен в самом сердце Гудаури с прямым доступом к лучшим склонам." },
        { icon: "CurrencyDollarIcon", title: "Конкурентные цены", description: "Лучшее соотношение цены и качества с прозрачным ценообразованием и специальными пакетами для семей и групп." },
        { icon: "ChatBubbleLeftRightIcon", title: "Многоязычная поддержка", description: "Обслуживание клиентов на грузинском, английском, русском и других языках для обеспечения четкой коммуникации." },
      ]
    }
  };

  const staticText = fallback[currentLanguage as keyof typeof fallback] || fallback.en;

  const title = wcu?.title || staticText.title;
  const subtitle = wcu?.subtitle || staticText.subtitle;
  const features: Feature[] = wcu?.features
    ? wcu.features.map((f, i) => ({ icon: iconMap[i] || 'SparklesIcon', title: f.title, description: f.description }))
    : staticText.features;

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary/10 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-outfit font-bold text-3xl lg:text-4xl text-foreground mb-4">
            {title}
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 shadow-subtle hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Icon name={feature.icon as any} size={28} variant="solid" className="text-primary" />
              </div>
              <h3 className="font-outfit font-bold text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="font-inter text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
