'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface PhotoCardProps {
  photo: {
    id: number;
    image: string;
    alt: string;
    title: string;
    author: string;
    authorAvatar: string;
    authorAvatarAlt: string;
    date: string;
    likes: number;
    category: string;
    season: string;
  };
  onPhotoClick: (photoId: number) => void;
}

const PhotoCard = ({ photo, onPhotoClick }: PhotoCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(photo.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div
      onClick={() => onPhotoClick(photo.id)}
      className="group relative bg-card rounded-lg overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative w-full h-64 overflow-hidden">
        <AppImage
          src={photo.image}
          alt={photo.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground rounded-full font-inter font-medium text-xs">
          {photo.category}
        </div>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 p-2 bg-background/90 rounded-full hover:bg-background transition-all duration-300 transform hover:scale-110"
        >
          <Icon
            name="HeartIcon"
            size={20}
            variant={isLiked ? 'solid' : 'outline'}
            className={isLiked ? 'text-destructive' : 'text-foreground'}
          />
        </button>

        {/* View Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-4 bg-background/90 rounded-full">
            <Icon name="MagnifyingGlassPlusIcon" size={32} variant="outline" className="text-foreground" />
          </div>
        </div>
      </div>

      {/* Photo Info */}
      <div className="p-4">
        <h3 className="font-outfit font-semibold text-foreground text-base mb-2 line-clamp-1">
          {photo.title}
        </h3>
        
        {/* Author Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <AppImage
                src={photo.authorAvatar}
                alt={photo.authorAvatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-inter font-medium text-foreground text-sm">
                {photo.author}
              </span>
              <span className="font-inter text-muted-foreground text-xs">
                {photo.date}
              </span>
            </div>
          </div>

          {/* Like Count */}
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="HeartIcon" size={16} variant="outline" />
            <span className="font-inter text-sm">{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;