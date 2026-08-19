/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import type { Destination, PageRoute, TripType } from './types';
import { fetchDestinationsFromSupabase } from './lib/supabase';
import { CURATED_DESTINATIONS, resolveDestinationImage } from './lib/data';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AutoRotatingShowcase } from './components/AutoRotatingShowcase';
import { DestinationsSection } from './components/DestinationsSection';
import { DestinationModal } from './components/DestinationModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { WhyTravelersChooseSection } from './components/WhyTravelersChooseSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BookingPage } from './components/BookingPage';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [destinations, setDestinations] = useState<Destination[]>(CURATED_DESTINATIONS);
  const [isLoadingDestinations, setIsLoadingDestinations] = useState<boolean>(true);
  const [selectedDestinationForModal, setSelectedDestinationForModal] = useState<Destination | null>(null);

  // Booking initial prefill params from query or quick-select
  const [bookingParams, setBookingParams] = useState<{
    destinationId?: string;
    tripType?: TripType;
    travelDate?: string;
    returnDate?: string;
    persons?: number;
  }>({});

  // Parse URL query on initial mount
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page') as PageRoute;
      const destinationId = urlParams.get('destinationId') || undefined;
      const tripType = (urlParams.get('tripType') as TripType) || undefined;
      const travelDate = urlParams.get('travelDate') || undefined;
      const returnDate = urlParams.get('returnDate') || undefined;
      const persons = urlParams.get('persons') ? parseInt(urlParams.get('persons')!, 10) : undefined;

      if (pageParam && ['home', 'destinations', 'booking', 'about', 'contact'].includes(pageParam)) {
        setCurrentPage(pageParam);
      } else if (destinationId || travelDate || returnDate || persons) {
        setCurrentPage('booking');
      }

      if (destinationId || tripType || travelDate || returnDate || persons) {
        setBookingParams({
          destinationId,
          tripType,
          travelDate,
          returnDate,
          persons,
        });
      }
    } catch (e) {
      console.warn('URL search params parse error:', e);
    }
  }, []);

  // Fetch destinations from Supabase
  const loadDestinations = useCallback(async () => {
    setIsLoadingDestinations(true);
    const { data, error } = await fetchDestinationsFromSupabase();

    if (data && data.length > 0) {
      // Merge with curated enrichments while preserving the real Supabase database UUID in item.id
      const merged = data.map((item) => {
        const enriched = CURATED_DESTINATIONS.find(
          (c) =>
            c.slug === item.slug ||
            c.id === item.id ||
            c.name.toLowerCase() === item.name.toLowerCase() ||
            (c.slug.includes('trincomalee') && item.slug?.includes('trincomalee')) ||
            (c.slug.includes('polonnaruwa') && item.slug?.includes('polonnaruwa')) ||
            (c.slug.includes('kandy') && item.slug?.includes('kandy')) ||
            (c.slug.includes('nuwara') && item.slug?.includes('nuwara')) ||
            (c.slug.includes('ella') && item.slug?.includes('ella')) ||
            (c.slug.includes('arugam') && item.slug?.includes('arugam')) ||
            (c.slug.includes('yala') && item.slug?.includes('yala'))
        );
        const resolvedImg = resolveDestinationImage({ ...enriched, ...item });
        return enriched
          ? {
              ...enriched,
              ...item,
              id: item.id,
              image_url: resolvedImg,
            }
          : {
              ...item,
              image_url: resolvedImg,
              rating: 4.95,
              review_count: 48,
              category: 'Cultural' as const,
              duration: '5 Days / 4 Nights',
            };
      });

      setDestinations(merged);
    } else {
      // If Supabase table is empty or unreachable, use curated dataset
      setDestinations(CURATED_DESTINATIONS);
    }
    setIsLoadingDestinations(false);
  }, []);

  useEffect(() => {
    loadDestinations();
  }, [loadDestinations]);

  // Navigate handler with URL sync
  const handleNavigate = (page: PageRoute, params?: Record<string, string>) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('page', page);
      if (params) {
        Object.entries(params).forEach(([key, val]) => {
          if (val) url.searchParams.set(key, val);
          else url.searchParams.delete(key);
        });
      } else if (page !== 'booking') {
        url.searchParams.delete('destinationId');
        url.searchParams.delete('tripType');
        url.searchParams.delete('travelDate');
        url.searchParams.delete('returnDate');
        url.searchParams.delete('persons');
      }
      window.history.pushState({}, '', url.toString());
    } catch (e) {
      // Safe fallback
    }
  };

  // Handle homepage booking widget search
  const handleBookingSearch = (params: {
    destinationId: string;
    tripType: TripType;
    travelDate: string;
    returnDate: string;
    persons: number;
  }) => {
    setBookingParams(params);
    handleNavigate('booking', {
      destinationId: params.destinationId,
      tripType: params.tripType,
      travelDate: params.travelDate,
      returnDate: params.returnDate,
      persons: params.persons.toString(),
    });
  };

  // Quick book from card
  const handleQuickBook = (destination: Destination) => {
    setSelectedDestinationForModal(null);
    setBookingParams((prev) => ({
      ...prev,
      destinationId: destination.id,
    }));
    handleNavigate('booking', { destinationId: destination.id });
  };

  return (
    <div className="min-h-screen bg-[#0f2e24] text-neutral-100 flex flex-col font-sans selection:bg-[#70e29b]/40 selection:text-[#0f2e24]">
      
      {/* Sticky Glass Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        destinationsCount={destinations.length}
      />

      {/* Main Routed Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            {/* 1. Hero with integrated Booking Widget */}
            <Hero
              destinations={destinations}
              onNavigate={handleNavigate}
              onBookingSearch={handleBookingSearch}
              onQuickBook={handleQuickBook}
            />

            {/* 2. Auto Rotating Sri Lanka Showcase Section */}
            <AutoRotatingShowcase
              destinations={destinations}
              onBookNow={handleQuickBook}
              onViewDetails={(dest) => setSelectedDestinationForModal(dest)}
            />

            {/* 3. Featured Destinations */}
            <DestinationsSection
              destinations={destinations}
              isLoading={isLoadingDestinations}
              onRefresh={loadDestinations}
              onViewDetails={(dest) => setSelectedDestinationForModal(dest)}
              onQuickBook={handleQuickBook}
              isFullPage={false}
            />

            {/* 3. Why Travel With Us (Designed for Freedom, Curated for Comfort) */}
            <WhyChooseUs />

            {/* 4. Why Travelers Choose Solis (2-Column Interactive List & Travel Photo) */}
            <WhyTravelersChooseSection onNavigate={handleNavigate} />

            {/* 5. Guest Testimonials */}
            <TestimonialsSection />

            {/* 5. Contact Section */}
            <ContactSection />
          </>
        )}

        {currentPage === 'destinations' && (
          <DestinationsSection
            destinations={destinations}
            isLoading={isLoadingDestinations}
            onRefresh={loadDestinations}
            onViewDetails={(dest) => setSelectedDestinationForModal(dest)}
            onQuickBook={handleQuickBook}
            isFullPage={true}
          />
        )}

        {currentPage === 'booking' && (
          <BookingPage
            destinations={destinations}
            initialParams={bookingParams}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateDestinations={() => handleNavigate('destinations')}
          />
        )}

        {currentPage === 'about' && (
          <>
            <AboutSection onNavigate={handleNavigate} />
            <WhyChooseUs />
            <WhyTravelersChooseSection onNavigate={handleNavigate} />
            <TestimonialsSection />
          </>
        )}

        {currentPage === 'contact' && (
          <div className="pt-20">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Destination Detail Modal */}
      <DestinationModal
        destination={selectedDestinationForModal}
        onClose={() => setSelectedDestinationForModal(null)}
        onBookNow={handleQuickBook}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
