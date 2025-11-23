"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ServiceCardProps {
  title: string;
  description?: string;
  variant?: "primary" | "secondary";
  className?: string;
  image?: string;
  subcategories?: string[];
  href?: string;
  onClick?: () => void;
}

const ServiceCard: FC<ServiceCardProps> = ({
  title,
  description,
  variant = "secondary",
  className = "",
  image,
  subcategories,
  href,
  onClick
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const isPrimary = variant === "primary";
  const router = useRouter();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      // Получаем текущую локаль из пути
      const currentPath = window.location.pathname;
      const localeMatch = currentPath.match(/^\/(ru|ro)/);
      const currentLocale = localeMatch ? localeMatch[1] : 'ru';
      
      // Добавляем локаль к пути, если ее нет
      const fullPath = href.startsWith('/') ? href : `/${href}`;
      const localizedPath = fullPath.startsWith(`/${currentLocale}`)
        ? fullPath
        : `/${currentLocale}${fullPath}`;
      
      router.push(localizedPath);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      className={`
        w-full relative overflow-hidden group cursor-pointer
        bg-background border border-gray-300 dark:border-gray-800 rounded-xl
        flex flex-col focus-within:ring-2 focus-within:ring-[#EA3C23] focus-within:ring-offset-2
        transition-all duration-500 ease-out
        hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl hover:shadow-black/10
        hover:border-gray-400 dark:hover:border-gray-700
        aspect-[1/1] ${isPrimary ? 'sm:aspect-[1.4/1]' : ''}
        ${className}
      `}
      role="button"
      tabIndex={0}
      aria-label={`${title}${description ? ': ' + description : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {image ? (
        <>
          {/* Image at the top takes most of the card */}
          <div className="relative flex-1 w-full overflow-hidden rounded-t-xl">
            {/* Loading indicator */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            )}
            
            {/* Error state */}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
                <div className="text-center p-4">
                  <div className="text-gray-400 mb-2">Изображение недоступно</div>
                  <div className="text-gray-500 text-sm">{title}</div>
                </div>
              </div>
            )}
            
            <Image
              src={image}
              alt={title}
              fill
              className={`object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Subcategories overlay on hover */}
            {isHovered && subcategories && subcategories.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-white text-xs sm:text-sm">
                  <div className="font-medium mb-1 sm:mb-2">Услуги:</div>
                  <div className="flex flex-wrap gap-1">
                    {subcategories.slice(0, 3).map((subcategory, index) => (
                      <span
                        key={index}
                        className="bg-white/20 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs"
                      >
                        {subcategory}
                      </span>
                    ))}
                    {subcategories.length > 3 && (
                      <span className="bg-white/20 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">
                        +{subcategories.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Text section at the bottom optimized for 5:3 ratio */}
          <div className="bg-[#F3F3F3] dark:bg-[#1F1F1F] p-3 sm:p-5 flex flex-row items-center justify-between transition-colors duration-300 group-hover:bg-[#E8E8E8] dark:group-hover:bg-[#2A2A2A]">
            <h3
              className="text-[#1F1F1F] dark:text-white font-medium transition-all duration-300 leading-[1.22] text-base sm:text-lg"
              style={{
                fontFamily: "Montserrat, sans-serif"
              }}
            >
              {title}
            </h3>
            
            {/* Arrow on the right */}
            <ArrowUpRight
              className="text-[#1F1F1F] dark:text-white flex-shrink-0 transition-all duration-300 group-hover:text-[#EA3C23] group-hover:translate-x-1 group-hover:-translate-y-1"
              size={24}
              aria-hidden="true"
            />
          </div>
        </>
      ) : (
        /* Cards without image - optimized for 5:3 ratio */
        <div className="flex flex-col justify-center items-center text-center h-full p-3 sm:p-5 bg-[#F3F3F3] dark:bg-[#1F1F1F] transition-colors duration-300 group-hover:bg-[#E8E8E8] dark:group-hover:bg-[#2A2A2A]">
          <h3
            className="text-[#1F1F1F] dark:text-white font-medium mb-3 transition-all duration-300 group-hover:scale-105 leading-[1.22] text-base sm:text-lg"
            style={{
              fontFamily: "Montserrat, sans-serif"
            }}
          >
            {title}
          </h3>

          {description && (
            <p
              className="text-gray-600 dark:text-gray-300 text-center mb-4 transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200"
              style={{
                fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                lineHeight: "1.4"
              }}
            >
              {description}
            </p>
          )}
          
          {/* Arrow at the bottom for cards without image */}
          <div className="mt-auto">
            <ArrowUpRight
              className="text-[#1F1F1F] dark:text-white transition-all duration-300 group-hover:text-[#EA3C23] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110"
              size={24}
              aria-hidden="true"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
