import React from 'react';
import AnimatedLogo from './AnimatedLogo';
import logoLight from '../../assets/abacus-logo-light.png';
import logoDark from '../../assets/abacus-logo-transparent.png';
import logoIcon from '../../assets/abacus-icon.png';

const Logo = ({
  variant = 'light', // 'light' for dark backgrounds, 'dark' for light backgrounds
  layout = 'horizontal', // 'horizontal', 'stacked', 'icon-only'
  useImage = false, // If true, uses PNG bitmap, otherwise uses vector animated logo
  className = '',
  height = 'h-10 sm:h-11',
  iconSize = 'h-10 w-10 sm:h-11 sm:w-11',
  animated = true,
  iconOnly = false,
}) => {
  if (useImage) {
    if (iconOnly) {
      return (
        <div className={`flex items-center ${className}`}>
          <img
            src={logoIcon}
            alt="Abacus Homes Logo"
            className={`${height} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
          />
        </div>
      );
    }
    const logoSrc = variant === 'dark' ? logoDark : logoLight;
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <img
          src={logoSrc}
          alt="Abacus Homes"
          className={`${height} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
        />
      </div>
    );
  }

  const effectiveLayout = iconOnly ? 'icon-only' : layout;

  return (
    <AnimatedLogo
      variant={variant}
      layout={effectiveLayout}
      className={className}
      iconSize={iconSize}
      animated={animated}
    />
  );
};

export default Logo;
