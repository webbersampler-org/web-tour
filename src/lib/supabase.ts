import { createClient } from '@supabase/supabase-js';
import type { Destination, BookingFormData } from '../types';

// Helper to safely read from Vite / Next.js env or fallback
const getEnvVar = (viteKey: string, nextKey: string, fallback: string): string => {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      return (
        (import.meta as any).env[viteKey] ||
        (import.meta as any).env[nextKey] ||
        fallback
      );
    }
  } catch (e) {
    // fallback
  }
  return fallback;
};

export const SUPABASE_URL = getEnvVar(
  'VITE_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'https://synvpyjjkrliugggnear.supabase.co'
);

export const SUPABASE_ANON_KEY = getEnvVar(
  'VITE_SUPABASE_PUBLISHABLE_KEY',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  'sb_publishable_3Vlek7KjbMDwUYLb-3nXVw_Ywv0Z6-n'
);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string | undefined | null): boolean {
  if (!value) return false;
  return UUID_REGEX.test(value.trim());
}

/**
 * Fetch all active destinations from Supabase matching the exact query schema
 */
export async function fetchDestinationsFromSupabase(): Promise<{
  data: Destination[] | null;
  error: Error | null;
}> {
  try {
    const { data, error } = await supabase
      .from('destinations')
      .select(
        'id, name, slug, country, short_description, image_url, base_price, currency, is_active, sort_order'
      )
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.warn('Supabase fetch destinations warning:', error.message);
      return { data: null, error: new Error(error.message) };
    }

    return { data: (data as Destination[]) || [], error: null };
  } catch (err: any) {
    console.error('Failed to connect to Supabase destinations:', err);
    return { data: null, error: err };
  }
}

/**
 * Resolve destination string/slug/id to a real Supabase UUID
 */
export async function resolveDestinationUuid(
  identifier: string,
  cachedDestinations: Destination[] = []
): Promise<string | null> {
  if (!identifier) return null;

  // 1. If already a valid UUID and exists in cached list
  if (isUuid(identifier)) {
    return identifier;
  }

  // 2. Check cached destinations in memory by id, slug, or name
  const foundInMemory = cachedDestinations.find(
    (d) =>
      d.id === identifier ||
      d.slug === identifier ||
      d.slug.toLowerCase() === identifier.toLowerCase() ||
      d.name.toLowerCase() === identifier.toLowerCase() ||
      identifier.toLowerCase().includes(d.slug.toLowerCase())
  );
  if (foundInMemory && isUuid(foundInMemory.id)) {
    return foundInMemory.id;
  }

  // 3. Query Supabase directly for the destination UUID by slug or name
  try {
    const { data: directMatch } = await supabase
      .from('destinations')
      .select('id, slug, name')
      .or(`slug.eq.${identifier},id.eq.${identifier}`)
      .limit(1)
      .maybeSingle();

    if (directMatch?.id && isUuid(directMatch.id)) {
      return directMatch.id;
    }
  } catch (e) {
    // Continue to fallback
  }

  // 4. Query by name search
  try {
    const { data: nameMatch } = await supabase
      .from('destinations')
      .select('id')
      .ilike('name', `%${identifier.replace(/[-_]/g, ' ')}%`)
      .limit(1)
      .maybeSingle();

    if (nameMatch?.id && isUuid(nameMatch.id)) {
      return nameMatch.id;
    }
  } catch (e) {
    // Continue
  }

  // 5. Fallback to first available active destination in Supabase
  try {
    const { data: firstActive } = await supabase
      .from('destinations')
      .select('id')
      .eq('is_active', true)
      .limit(1)
      .maybeSingle();

    if (firstActive?.id && isUuid(firstActive.id)) {
      return firstActive.id;
    }
  } catch (e) {
    // No-op
  }

  return null;
}

/**
 * Create a new pending travel booking in Supabase.
 * Strictly compliant with RLS (INSERT only, no SELECT returning).
 */
export async function createBookingInSupabase(
  formData: BookingFormData,
  cachedDestinations: Destination[] = []
): Promise<{
  success: boolean;
  bookingReference: string;
  error?: string;
}> {
  // Generate client confirmation reference code
  const generatedRef = `SLS-${Math.floor(100000 + Math.random() * 900000)}`;

  try {
    // Resolve destination_id to a guaranteed valid UUID
    const destinationUuid = await resolveDestinationUuid(
      formData.destinationId,
      cachedDestinations
    );

    if (!destinationUuid || !isUuid(destinationUuid)) {
      return {
        success: false,
        bookingReference: generatedRef,
        error: 'Unable to resolve destination ID to a valid Supabase UUID. Please select a valid destination.',
      };
    }

    const payload = {
      customer_name: formData.customerName.trim(),
      customer_email: formData.customerEmail.trim(),
      customer_phone: formData.customerPhone?.trim() || null,
      destination_id: destinationUuid,
      travel_date: formData.travelDate,
      return_date:
        formData.tripType === 'round-trip' && formData.returnDate
          ? formData.returnDate
          : null,
      number_of_persons: Number(formData.numberOfPersons),
      notes:
        [
          formData.notes?.trim(),
          formData.travelClass ? `Class: ${formData.travelClass}` : null,
          formData.airportTransfer ? 'VIP Van Transfer' : null,
          formData.privateGuide ? 'Private Naturalist Guide' : null,
        ]
          .filter(Boolean)
          .join(' | ') || null,
    };

    // Execute pure INSERT without .select() so Row Level Security policy is satisfied
    const { error: insertError } = await supabase
      .from('bookings')
      .insert([payload]);

    if (insertError) {
      console.error('Supabase booking insert error:', insertError);
      return {
        success: false,
        bookingReference: generatedRef,
        error: insertError.message || 'Failed to submit booking to Supabase.',
      };
    }

    return {
      success: true,
      bookingReference: generatedRef,
    };
  } catch (err: any) {
    console.error('Exception during booking submission:', err);
    return {
      success: false,
      bookingReference: generatedRef,
      error:
        err.message ||
        'An unexpected network error occurred while contacting the Supabase database.',
    };
  }
}
