export interface Destination {
  id: string;
  name: string;
  slug: string;
  country: string;
  short_description: string | null;
  image_url: string | null;
  base_price: number | null;
  currency: string | null;
  is_active?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
  // Extended UI helper fields
  highlights?: string[];
  duration?: string;
  category?: 'Alpine' | 'Island' | 'Safari' | 'Cultural' | 'Desert' | 'Arctic';
  rating?: number;
  review_count?: number;
}

export interface Booking {
  id: string;
  booking_reference: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string | null;
  destination_id: string;
  travel_date: string;
  return_date?: string | null;
  number_of_persons: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string | null;
  created_by?: string | null;
  created_at?: string;
  updated_at?: string;
}

export type TripType = 'round-trip' | 'one-way';

export interface BookingFormData {
  destinationId: string;
  tripType: TripType;
  travelDate: string;
  returnDate: string;
  numberOfPersons: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  travelClass?: 'Signature Suite' | 'First Class' | 'Premium Prestige';
  airportTransfer?: boolean;
  privateGuide?: boolean;
}

export type PageRoute = 'home' | 'destinations' | 'destination-detail' | 'booking' | 'contact' | 'about';
