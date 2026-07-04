import React from 'react';
import AboutHero from '../components/About/AboutHero';
import MissionVision from '../components/About/MissionVision';
import TeamAuthor from '../components/About/TeamAuthor';
import NewsLetter from '../components/NewsLetter';

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen animate-in fade-in duration-500">
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. Mission & Vision */}
      <MissionVision />

      {/* 3. Team / Author Info */}
      <TeamAuthor />

      {/* 4. Newsletter (Call to action) */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 border-t">
        <NewsLetter />
      </div>
    </div>
  );
}
