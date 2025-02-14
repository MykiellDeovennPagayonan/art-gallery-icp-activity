// Home.tsx
"use client"
import React, { JSX, useState } from 'react';
import IntroductionSection from "@/components/IntroductionSection";
import Search from "@/components/Search";
import GallerySection from "@/components/GallerySection";
import { artworks } from "@/lib/galleryInfo";
import Arts from '@/components/Arts';

const initialArtworks: JSX.Element[] = artworks.map((artwork, index) => (
  <Arts key={index} imageUrl={artwork.imageUrl} title={artwork.title} description={artwork.description} />
));

export default function Home() {
  const [filteredArtworks, setFilteredArtworks] = useState<JSX.Element[]>(initialArtworks);

  const handleSearch = (query: string) => {

    const filteredResults = artworks.filter((artwork) => 
      artwork.description.toLowerCase().includes(query.toLowerCase()) ||
      artwork.title.toLowerCase().includes(query.toLowerCase())
    );

    const filteredArtworks = filteredResults.map((artwork, index) => (
      <Arts key={index} imageUrl={artwork.imageUrl} title={artwork.title} description={artwork.description} />
    ));

    setFilteredArtworks(filteredArtworks);
  };

  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      <IntroductionSection />
      <Search onSearch={handleSearch} />
      <GallerySection artworks={filteredArtworks} />
    </div>
  );
}
