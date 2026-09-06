import React from 'react';
import { Link } from 'react-router-dom';

const sizeClass = {
  sm: 'h-9',
  md: 'h-11',
  lg: 'h-14 md:h-[72px]',
};

export default function BrandLogo({ size = 'md', asLink = true }) {
  const logo = (
    <img
      src="/logo.png"
      alt="Krinova Logo"
      width={220}
      height={72}
      decoding="async"
      className={`${sizeClass[size] || 'h-12'} w-auto object-contain block`}
    />
  );

  if (!asLink) return logo;

  return (
    <Link to="/" className="inline-block no-underline">
      {logo}
    </Link>
  );
}
