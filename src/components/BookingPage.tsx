import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  CreditCard,
  Phone,
  Mail,
  User,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Plane,
  Download,
  Share2,
  Check,
  ChevronRight,
  FileText,
  Car,
  Tent
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Destination, TripType, BookingFormData } from '../types';
import { createBookingInSupabase } from '../lib/supabase';
import { resolveDestinationImage } from '../lib/data';

interface BookingPageProps {
  destinations: Destination[];
  initialParams?: {
    destinationId?: string;
    tripType?: TripType;
    travelDate?: string;
    returnDate?: string;
    persons?: number;
  };
  onNavigateHome: () => void;
  onNavigateDestinations: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  destinations,
  initialParams,
  onNavigateHome,
  onNavigateDestinations,
}) => {
  const today = new Date();
  const defaultDeparture = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const defaultReturn = new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const [destinationId, setDestinationId] = useState<string>(
    initialParams?.destinationId || (destinations.length > 0 ? destinations[0].id : '')
  );
  const [tripType, setTripType] = useState<TripType>(
    initialParams?.tripType || 'round-trip'
  );
  const [travelDate, setTravelDate] = useState<string>(
    initialParams?.travelDate || defaultDeparture
  );
  const [returnDate, setReturnDate] = useState<string>(
    initialParams?.returnDate || defaultReturn
  );
  const [numberOfPersons, setNumberOfPersons] = useState<number>(
    initialParams?.persons || 2
  );

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [travelClass, setTravelClass] = useState<'Signature Suite' | 'First Class' | 'Premium Prestige'>('Signature Suite');
  const [airportTransfer, setAirportTransfer] = useState(true);
  const [privateGuide, setPrivateGuide] = useState(false);
  const [travelInsurance, setTravelInsurance] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<{
    reference: string;
    details: BookingFormData;
    destinationName: string;
    totalAmount: number;
  } | null>(null);

  useEffect(() => {
    if (initialParams?.destinationId && destinations.length > 0) {
      const match = destinations.find(
        (d) =>
          d.id === initialParams.destinationId ||
          d.slug === initialParams.destinationId ||
          d.slug.toLowerCase() === initialParams.destinationId?.toLowerCase() ||
          d.name.toLowerCase() === initialParams.destinationId?.toLowerCase() ||
          (initialParams.destinationId?.includes('trincomalee') && d.slug.includes('trincomalee')) ||
          (initialParams.destinationId?.includes('polonnaruwa') && d.slug.includes('polonnaruwa')) ||
          (initialParams.destinationId?.includes('nuwara') && d.slug.includes('nuwara')) ||
          (initialParams.destinationId?.includes('arugam') && d.slug.includes('arugam')) ||
          (initialParams.destinationId?.includes('yala') && d.slug.includes('yala'))
      );
      if (match) {
        setDestinationId(match.id);
      } else if (!destinationId) {
        setDestinationId(destinations[0].id);
      }
    } else if (!destinationId && destinations.length > 0) {
      setDestinationId(destinations[0].id);
    }
  }, [destinations, initialParams?.destinationId, destinationId]);

  const selectedDestination = useMemo(() => {
    return (
      destinations.find(
        (d) =>
          d.id === destinationId ||
          d.slug === destinationId ||
          d.slug.toLowerCase() === destinationId.toLowerCase()
      ) || destinations[0]
    );
  }, [destinations, destinationId]);

  const priceBreakdown = useMemo(() => {
    const basePerPerson = selectedDestination?.base_price || 3450;
    const baseTotal = basePerPerson * numberOfPersons;

    let classSurchargePerPerson = 0;
    if (travelClass === 'First Class') classSurchargePerPerson = 650;
    if (travelClass === 'Premium Prestige') classSurchargePerPerson = 1400;
    const classTotal = classSurchargePerPerson * numberOfPersons;

    const transferTotal = airportTransfer ? 250 : 0;
    const guideTotal = privateGuide ? 450 * numberOfPersons : 0;
    const insuranceTotal = travelInsurance ? 180 * numberOfPersons : 0;

    const subtotal = baseTotal + classTotal + transferTotal + guideTotal + insuranceTotal;
    const taxesAndFees = Math.round(subtotal * 0.08);
    const grandTotal = subtotal + taxesAndFees;

    return {
      basePerPerson,
      baseTotal,
      classTotal,
      transferTotal,
      guideTotal,
      insuranceTotal,
      subtotal,
      taxesAndFees,
      grandTotal,
    };
  }, [
    selectedDestination,
    numberOfPersons,
    travelClass,
    airportTransfer,
    privateGuide,
    travelInsurance,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!destinationId) {
      setErrorMessage('Please select a destination.');
      return;
    }
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMessage('Please enter your phone number for arrival coordination.');
      return;
    }
    if (!travelDate) {
      setErrorMessage('Please specify your arrival date.');
      return;
    }
    if (tripType === 'round-trip' && !returnDate) {
      setErrorMessage('Please specify your return date.');
      return;
    }
    if (tripType === 'round-trip' && returnDate < travelDate) {
      setErrorMessage('Return date cannot be earlier than arrival date.');
      return;
    }

    setIsSubmitting(true);

    const formData: BookingFormData = {
      destinationId,
      tripType,
      travelDate,
      returnDate: tripType === 'round-trip' ? returnDate : '',
      numberOfPersons,
      customerName,
      customerEmail,
      customerPhone,
      notes,
      travelClass,
      airportTransfer,
      privateGuide,
    };

    const result = await createBookingInSupabase(formData, destinations);

    setIsSubmitting(false);

    if (result.success) {
      setBookingSuccess({
        reference: result.bookingReference,
        details: formData,
        destinationName: selectedDestination?.name || 'Selected Destination',
        totalAmount: priceBreakdown.grandTotal,
      });

      try {
        confetti({
          particleCount: 140,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#70e29b', '#58cc84', '#ffffff', '#0f2e24'],
        });
      } catch (err) {
        // Fallback
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrorMessage(
        result.error ||
          'Unable to complete booking. Please check details or retry.'
      );
    }
  };

  const handleDownloadCalendar = () => {
    if (!bookingSuccess) return;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Solis Expeditions//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Solis Expedition - ${bookingSuccess.destinationName}`,
      `DESCRIPTION:Booking Reference: ${bookingSuccess.reference}\\nGuests: ${bookingSuccess.details.numberOfPersons}\\nConcierge: concierge@solis-expeditions.com`,
      `DTSTART;VALUE=DATE:${bookingSuccess.details.travelDate.replace(/-/g, '')}`,
      bookingSuccess.details.returnDate
        ? `DTEND;VALUE=DATE:${bookingSuccess.details.returnDate.replace(/-/g, '')}`
        : '',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ]
      .filter(Boolean)
      .join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Solis-${bookingSuccess.reference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="booking-page" className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-[#0f2e24] text-white">
      {/* Radiant ambient glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#70e29b]/15 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SUCCESS STATE ================= */}
        {bookingSuccess ? (
          <div className="max-w-3xl mx-auto bg-[#143a2e] border border-[#70e29b]/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#70e29b] text-[#0f2e24] flex items-center justify-center mx-auto shadow-lg shadow-[#70e29b]/30 font-bold">
                <CheckCircle2 className="w-10 h-10 text-[#0f2e24]" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#70e29b] font-extrabold bg-[#70e29b]/20 border border-[#70e29b]/30 px-4 py-1 rounded-full inline-block">
                Reservation Confirmed & Live Synced to Database
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                Your Journey is Reserved!
              </h1>
              <p className="text-sm text-emerald-100/90 font-light max-w-lg mx-auto">
                Thank you, <strong className="text-white font-bold">{bookingSuccess.details.customerName}</strong>. Our personal concierge will reach out within 2 hours to confirm your custom itinerary.
              </p>
            </div>

            {/* Summary Box */}
            <div className="bg-[#0a2118] border border-emerald-500/20 rounded-2xl p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-emerald-500/20">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-200 block font-bold">
                    Booking Reference
                  </span>
                  <span className="text-2xl font-extrabold text-[#70e29b] font-mono tracking-wider">
                    {bookingSuccess.reference}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-emerald-200 block font-bold">
                    Status
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#70e29b]/20 text-[#70e29b] text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#70e29b] animate-pulse" />
                    Pending Verification
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-emerald-300/80 block">Destination</span>
                  <p className="font-bold text-white text-base">{bookingSuccess.destinationName}</p>
                </div>

                <div>
                  <span className="text-xs text-emerald-300/80 block">Travel Dates</span>
                  <p className="font-bold text-white">
                    {bookingSuccess.details.travelDate}
                    {bookingSuccess.details.returnDate ? ` → ${bookingSuccess.details.returnDate}` : ' (One-Way)'}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-emerald-300/80 block">Travellers & Class</span>
                  <p className="font-bold text-white">
                    {bookingSuccess.details.numberOfPersons} {bookingSuccess.details.numberOfPersons === 1 ? 'Guest' : 'Guests'} • {bookingSuccess.details.travelClass}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-emerald-300/80 block">Total Investment</span>
                  <p className="font-extrabold text-[#70e29b] text-lg">
                    ${bookingSuccess.totalAmount.toLocaleString()} USD
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-500/20 text-xs text-emerald-200 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#70e29b] shrink-0" />
                <span>
                  Confirmation dispatch sent to <strong className="text-white">{bookingSuccess.details.customerEmail}</strong>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                id="download-calendar-btn"
                onClick={handleDownloadCalendar}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#70e29b]" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  id="book-another-btn"
                  onClick={() => setBookingSuccess(null)}
                  className="w-1/2 sm:w-auto px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold transition-colors cursor-pointer"
                >
                  Book Another
                </button>
                <button
                  id="return-home-btn"
                  onClick={onNavigateHome}
                  className="w-1/2 sm:w-auto px-7 py-3 rounded-full bg-[#70e29b] text-[#0f2e24] hover:bg-[#58cc84] font-extrabold text-sm tracking-wide uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Return Home</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          
          /* ================= MAIN BOOKING FORM ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-8 space-y-6">
              
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#70e29b]/20 border border-[#70e29b]/30 text-xs font-bold text-[#70e29b] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Direct Supabase Reservation Engine</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white">
                  Reserve Your Next Expedition
                </h1>
                <p className="text-emerald-100/80 text-sm sm:text-base font-light mt-1">
                  Complete your journey details below to lock in exclusive rates and private accommodations.
                </p>
              </div>

              {/* Form Card */}
              <form onSubmit={handleSubmit} className="bg-[#143a2e] border border-emerald-400/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
                
                {/* 1. Journey Parameters */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#70e29b] text-[#0f2e24] text-xs flex items-center justify-center font-bold">1</span>
                      <span>Journey Parameters</span>
                    </h3>

                    <div className="inline-flex p-1 bg-[#0a2118] border border-emerald-500/30 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setTripType('round-trip')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          tripType === 'round-trip'
                            ? 'bg-[#70e29b] text-[#0f2e24]'
                            : 'text-emerald-200 hover:text-white'
                        }`}
                      >
                        Round Trip
                      </button>
                      <button
                        type="button"
                        onClick={() => setTripType('one-way')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          tripType === 'one-way'
                            ? 'bg-[#70e29b] text-[#0f2e24]'
                            : 'text-emerald-200 hover:text-white'
                        }`}
                      >
                        One Way
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="booking-dest-sel" className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1.5">
                        Selected Destination
                      </label>
                      <div className="relative flex items-center bg-[#0a2118] border border-emerald-500/30 hover:border-[#70e29b] rounded-2xl px-4 py-3 transition-colors">
                        <MapPin className="w-5 h-5 text-[#70e29b] shrink-0 mr-3" />
                        <select
                          id="booking-dest-sel"
                          value={destinationId}
                          onChange={(e) => setDestinationId(e.target.value)}
                          className="w-full bg-transparent text-white text-sm font-semibold focus:outline-none cursor-pointer"
                        >
                          {destinations.map((d) => (
                            <option key={d.id} value={d.id} className="bg-[#0f2e24] text-white py-1">
                              {d.name} ({d.country}) — ${d.base_price ? d.base_price.toLocaleString() : 3450} {d.currency || 'USD'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="booking-travel-date" className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1.5">
                        Check-in / Departure Date
                      </label>
                      <div className="relative flex items-center bg-[#0a2118] border border-emerald-500/30 hover:border-[#70e29b] rounded-2xl px-4 py-3 transition-colors">
                        <Calendar className="w-5 h-5 text-[#70e29b] shrink-0 mr-3" />
                        <input
                          type="date"
                          id="booking-travel-date"
                          value={travelDate}
                          min={today.toISOString().split('T')[0]}
                          onChange={(e) => setTravelDate(e.target.value)}
                          className="w-full bg-transparent text-white text-sm font-semibold focus:outline-none cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="booking-ret-date" className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1.5">
                        {tripType === 'round-trip' ? 'Check-out / Return Date' : 'Return Date (Optional)'}
                      </label>
                      <div className="relative flex items-center bg-[#0a2118] border border-emerald-500/30 hover:border-[#70e29b] rounded-2xl px-4 py-3 transition-colors">
                        <Calendar className="w-5 h-5 text-[#70e29b] shrink-0 mr-3" />
                        <input
                          type="date"
                          id="booking-ret-date"
                          value={returnDate}
                          disabled={tripType === 'one-way'}
                          min={travelDate || today.toISOString().split('T')[0]}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full bg-transparent text-white text-sm font-semibold focus:outline-none cursor-pointer disabled:opacity-40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1.5">
                        Number of Travellers
                      </label>
                      <div className="flex items-center justify-between bg-[#0a2118] border border-emerald-500/30 rounded-2xl px-4 py-2.5">
                        <div className="flex items-center gap-2 text-white font-semibold text-sm">
                          <Users className="w-4 h-4 text-[#70e29b]" />
                          <span>{numberOfPersons} {numberOfPersons === 1 ? 'Guest' : 'Guests'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setNumberOfPersons(Math.max(1, numberOfPersons - 1))}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => setNumberOfPersons(Math.min(100, numberOfPersons + 1))}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="booking-class" className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1.5">
                        Expedition Class
                      </label>
                      <div className="relative flex items-center bg-[#0a2118] border border-emerald-500/30 rounded-2xl px-4 py-3">
                        <Sparkles className="w-5 h-5 text-[#70e29b] shrink-0 mr-3" />
                        <select
                          id="booking-class"
                          value={travelClass}
                          onChange={(e) => setTravelClass(e.target.value as any)}
                          className="w-full bg-transparent text-white text-sm font-semibold focus:outline-none cursor-pointer"
                        >
                          <option value="Signature Suite" className="bg-[#0f2e24]">Signature Glamping / Villa (Included)</option>
                          <option value="First Class" className="bg-[#0f2e24]">First Class Chalet (+ $650/guest)</option>
                          <option value="Premium Prestige" className="bg-[#0f2e24]">Royal Reserve & Van (+ $1,400/guest)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Primary Guest Info */}
                <div className="space-y-4">
                  <div className="border-b border-emerald-500/20 pb-3">
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#70e29b] text-[#0f2e24] text-xs flex items-center justify-center font-bold">2</span>
                      <span>Primary Guest Information</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="name-input" className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative flex items-center bg-[#0a2118] border border-emerald-500/30 focus-within:border-[#70e29b] rounded-2xl px-4 py-3 transition-colors">
                        <User className="w-5 h-5 text-emerald-300/60 shrink-0 mr-3" />
                        <input
                          type="text"
                          id="name-input"
                          required
                          placeholder="e.g. Robin Van Houten"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-transparent text-white text-sm placeholder:text-emerald-300/40 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email-input" className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative flex items-center bg-[#0a2118] border border-emerald-500/30 focus-within:border-[#70e29b] rounded-2xl px-4 py-3 transition-colors">
                        <Mail className="w-5 h-5 text-emerald-300/60 shrink-0 mr-3" />
                        <input
                          type="email"
                          id="email-input"
                          required
                          placeholder="robin@domain.com"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full bg-transparent text-white text-sm placeholder:text-emerald-300/40 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone-input" className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <div className="relative flex items-center bg-[#0a2118] border border-emerald-500/30 focus-within:border-[#70e29b] rounded-2xl px-4 py-3 transition-colors">
                        <Phone className="w-5 h-5 text-emerald-300/60 shrink-0 mr-3" />
                        <input
                          type="tel"
                          id="phone-input"
                          required
                          placeholder="+1 (555) 019-2834"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full bg-transparent text-white text-sm placeholder:text-emerald-300/40 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="notes-input" className="block text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1.5">
                        Special Requests & Preferences
                      </label>
                      <textarea
                        id="notes-input"
                        rows={3}
                        placeholder="e.g., Requesting van pickup at airport, vegetarian campfire dining..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-[#0a2118] border border-emerald-500/30 focus-within:border-[#70e29b] rounded-2xl p-3.5 text-sm text-white placeholder:text-emerald-300/40 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Addons */}
                <div className="space-y-4">
                  <div className="border-b border-emerald-500/20 pb-3">
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#70e29b] text-[#0f2e24] text-xs flex items-center justify-center font-bold">3</span>
                      <span>Complimentary & VIP Expedition Add-ons</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      airportTransfer ? 'bg-[#70e29b]/15 border-[#70e29b]' : 'bg-[#0a2118] border-emerald-500/30'
                    }`}>
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-white">VIP Van Transfer</span>
                        <input
                          type="checkbox"
                          checked={airportTransfer}
                          onChange={(e) => setAirportTransfer(e.target.checked)}
                          className="rounded accent-[#70e29b] w-4 h-4"
                        />
                      </div>
                      <span className="text-[11px] text-emerald-200/80 mt-2 block">Direct airport chauffeur pickup (+$250)</span>
                    </label>

                    <label className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      privateGuide ? 'bg-[#70e29b]/15 border-[#70e29b]' : 'bg-[#0a2118] border-emerald-500/30'
                    }`}>
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-white">Private Wilderness Guide</span>
                        <input
                          type="checkbox"
                          checked={privateGuide}
                          onChange={(e) => setPrivateGuide(e.target.checked)}
                          className="rounded accent-[#70e29b] w-4 h-4"
                        />
                      </div>
                      <span className="text-[11px] text-emerald-200/80 mt-2 block">Dedicated naturalist guide (+$450/guest)</span>
                    </label>

                    <label className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      travelInsurance ? 'bg-[#70e29b]/15 border-[#70e29b]' : 'bg-[#0a2118] border-emerald-500/30'
                    }`}>
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-white">Cancel-For-Any-Reason</span>
                        <input
                          type="checkbox"
                          checked={travelInsurance}
                          onChange={(e) => setTravelInsurance(e.target.checked)}
                          className="rounded accent-[#70e29b] w-4 h-4"
                        />
                      </div>
                      <span className="text-[11px] text-emerald-200/80 mt-2 block">Full refund guarantee up to 24h (+$180/guest)</span>
                    </label>
                  </div>
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/40 rounded-2xl text-red-200 text-sm">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-4 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-emerald-200">
                    Live Supabase transaction with 100% data protection.
                  </div>

                  <button
                    type="submit"
                    id="submit-booking-btn"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto min-w-[260px] py-4 px-8 rounded-full bg-[#70e29b] text-[#0f2e24] hover:bg-[#58cc84] disabled:opacity-50 disabled:cursor-not-allowed font-extrabold text-sm tracking-wider uppercase transition-all shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#0f2e24] border-t-transparent rounded-full animate-spin" />
                        <span>SYNCHRONIZING WITH SUPABASE...</span>
                      </>
                    ) : (
                      <>
                        <span>CONFIRM & BOOK EXPEDITION</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Price Summary */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {selectedDestination && (
                <div className="bg-[#143a2e] border border-emerald-400/20 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="relative aspect-[16/9] w-full">
                    <img
                      src={resolveDestinationImage(selectedDestination)}
                      alt={selectedDestination.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#143a2e] via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[10px] uppercase tracking-wider text-[#0f2e24] font-extrabold bg-[#70e29b] px-2.5 py-0.5 rounded-full">
                        {selectedDestination.country}
                      </span>
                      <h4 className="text-lg font-bold font-display text-white mt-1">
                        {selectedDestination.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h4 className="text-xs uppercase tracking-widest text-emerald-200 font-bold border-b border-emerald-500/20 pb-2">
                      Investment Breakdown
                    </h4>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex justify-between text-emerald-100">
                        <span>Base Expedition ({numberOfPersons} guests)</span>
                        <span className="font-bold text-white">${priceBreakdown.baseTotal.toLocaleString()}</span>
                      </div>

                      {priceBreakdown.classTotal > 0 && (
                        <div className="flex justify-between text-emerald-100">
                          <span>{travelClass} Tier</span>
                          <span className="font-bold text-white">+${priceBreakdown.classTotal.toLocaleString()}</span>
                        </div>
                      )}

                      {priceBreakdown.transferTotal > 0 && (
                        <div className="flex justify-between text-emerald-100">
                          <span>VIP Van Chauffeur</span>
                          <span className="font-bold text-white">+${priceBreakdown.transferTotal.toLocaleString()}</span>
                        </div>
                      )}

                      {priceBreakdown.guideTotal > 0 && (
                        <div className="flex justify-between text-emerald-100">
                          <span>Wilderness Naturalist</span>
                          <span className="font-bold text-white">+${priceBreakdown.guideTotal.toLocaleString()}</span>
                        </div>
                      )}

                      {priceBreakdown.insuranceTotal > 0 && (
                        <div className="flex justify-between text-emerald-100">
                          <span>Cancel-For-Any-Reason Protection</span>
                          <span className="font-bold text-white">+${priceBreakdown.insuranceTotal.toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-emerald-300/80 pt-2 border-t border-emerald-500/10">
                        <span>Resort Taxes & Parks (8%)</span>
                        <span>+${priceBreakdown.taxesAndFees.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-emerald-500/20 flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-emerald-200 font-bold block">
                          Total Estimate
                        </span>
                        <span className="text-[11px] text-[#70e29b] flex items-center gap-1 font-semibold">
                          <Check className="w-3 h-3" /> All Inclusive Wild Luxury
                        </span>
                      </div>
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#70e29b] font-display">
                        ${priceBreakdown.grandTotal.toLocaleString()} <span className="text-xs text-emerald-200 font-sans">USD</span>
                      </span>
                    </div>

                    <div className="pt-2 space-y-2 text-[11px] text-emerald-200/90">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#70e29b] shrink-0" />
                        <span>No hidden campground surcharges or booking fees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#70e29b] shrink-0" />
                        <span>Complimentary flexible modification window</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
