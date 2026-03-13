import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface InstagramPost {
  id: number;
  image: string;
  alt: string;
  likes: number;
  comments: number;
}

const InstagramFeed = () => {
  const instagramPosts: InstagramPost[] = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg',
      alt: 'Skier carving through fresh powder snow on steep mountain slope with blue sky',
      likes: 342,
      comments: 28,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256',
      alt: 'Close-up of modern ski equipment with red and black skis against snowy background',
      likes: 289,
      comments: 19,
    },
    {
      id: 3,
      image: 'https://images.pixabay.com/photo/2016/01/19/17/41/skiing-1149877_1280.jpg',
      alt: 'Group of skiers taking lesson on beginner slope with instructor in yellow jacket',
      likes: 421,
      comments: 35,
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/1271736/pexels-photo-1271736.jpeg',
      alt: 'Panoramic view of snow-covered mountain peaks at sunset with orange and pink sky',
      likes: 567,
      comments: 42,
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766',
      alt: 'Skier performing jump trick in terrain park with mountain backdrop',
      likes: 398,
      comments: 31,
    },
    {
      id: 6,
      image: 'https://images.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_1280.jpg',
      alt: 'Ski lift chairs ascending mountain with skiers enjoying scenic ride',
      likes: 312,
      comments: 24,
    },
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] rounded-lg">
            <Icon name="CameraIcon" size={24} variant="outline" className="text-white" />
          </div>
          <div>
            <h2 className="font-outfit font-bold text-foreground text-xl">
              Follow Us on Instagram
            </h2>
            <p className="font-inter text-muted-foreground text-sm">
              @skiboomgudauri
            </p>
          </div>
        </div>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white rounded-md font-inter font-medium text-sm hover:opacity-90 transition-opacity duration-300"
        >
          Follow
        </a>
      </div>

      {/* Instagram Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {instagramPosts.map((post) => (
          <a
            key={post.id}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-lg overflow-hidden"
          >
            <AppImage
              src={post.image}
              alt={post.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex items-center space-x-6 text-white">
                <div className="flex items-center space-x-2">
                  <Icon name="HeartIcon" size={20} variant="solid" />
                  <span className="font-inter font-medium text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="ChatBubbleLeftIcon" size={20} variant="solid" />
                  <span className="font-inter font-medium text-sm">{post.comments}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* View More Link */}
      <div className="mt-6 text-center">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-secondary hover:text-secondary/80 font-inter font-medium text-sm transition-colors duration-300"
        >
          <span>View all posts on Instagram</span>
          <Icon name="ArrowRightIcon" size={16} variant="outline" />
        </a>
      </div>
    </div>
  );
};

export default InstagramFeed;