"use client";
import React, { useState, useEffect } from "react";
import IntroductionSection from "@/components/IntroductionSection";
import Search from "@/components/Search";
import GallerySection from "@/components/GallerySection";
import { artworks } from "@/lib/galleryInfo";
import { backend } from "@/declarations/backend";
import { Comment } from "@/lib/interface";

export default function Home() {
  const [allComments, setAllComments] = useState<Comment[] | null>(null);
  const [filteredArtworks, setFilteredArtworks] = useState(artworks);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments: Comment[] = await backend.getAllComments();
        const sortedComments = comments.sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
        setAllComments(sortedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleSearch = (query: string) => {
    const filteredResults = artworks.filter((artwork) =>
      artwork.description.toLowerCase().includes(query.toLowerCase()) ||
      artwork.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArtworks(filteredResults);
  };

  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      <IntroductionSection />
      <Search onSearch={handleSearch} />
      <GallerySection artworks={filteredArtworks} comments={allComments} />
    </div>
  );
}
