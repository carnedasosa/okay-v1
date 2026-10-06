import { menu } from "@/data/menu";
import { venue } from "@/data/venue";
import { absoluteUrl } from "@/lib/site";
import type { VenueEvent } from "@/types";

/**
 * schema.org builders. Only verified data is published: fields flagged
 * `verified: false` in src/data are left out until the owner confirms them.
 */

type JsonLd = Record<string, unknown>;

const restaurantId = absoluteUrl("/#restaurant");

export function restaurantJsonLd(): JsonLd {
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": restaurantId,
    name: venue.name,
    alternateName: venue.shortName,
    slogan: venue.tagline,
    description: venue.description,
    url: absoluteUrl("/"),
    image: absoluteUrl("/opengraph-image"),
    logo: absoluteUrl("/icon.svg"),
    servesCuisine: venue.cuisine,
    hasMenu: absoluteUrl("/menu"),
    address: {
      "@type": "PostalAddress",
      streetAddress: venue.address.street,
      postalCode: venue.address.postalCode,
      addressLocality: venue.address.city,
      addressRegion: venue.address.region,
      addressCountry: venue.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: venue.geo.lat,
      longitude: venue.geo.lng,
    },
    hasMap: venue.maps.google,
    sameAs: [
      venue.social.instagram.url,
      venue.social.linktree,
      venue.ordering.ios,
      venue.ordering.android,
    ],
    potentialAction: {
      "@type": "OrderAction",
      target: [venue.ordering.ios, venue.ordering.android],
      deliveryMethod: [
        "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
        "http://purl.org/goodrelations/v1#DeliveryModePickUp",
      ],
    },
  };

  if (venue.phone.verified) data.telephone = venue.phone.value;
  if (venue.priceRange.verified) data.priceRange = venue.priceRange.value;
  if (venue.email.verified && venue.email.value) data.email = venue.email.value;
  if (venue.reservations.verified) data.acceptsReservations = true;
  if (venue.hours.verified) {
    data.openingHoursSpecification = venue.hours.value.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days.map((day) => `https://schema.org/${day}`),
      opens: slot.opens,
      closes: slot.closes === "24:00" ? "23:59" : slot.closes,
    }));
  }

  return data;
}

export function menuJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": absoluteUrl("/menu#menu"),
    name: `Menu ${venue.shortName}`,
    inLanguage: "it",
    isPartOf: { "@id": restaurantId },
    hasMenuSection: menu.map((section) => ({
      "@type": "MenuSection",
      name: section.title.replace(/\s+/g, " "),
      hasMenuItem: section.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
        ...(item.price !== undefined && item.verified
          ? {
              offers: {
                "@type": "Offer",
                price: item.price.toFixed(2),
                priceCurrency: "EUR",
              },
            }
          : {}),
      })),
    })),
  };
}

export function eventJsonLd(event: VenueEvent): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.startDate,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(event.image ? { image: absoluteUrl(event.image) } : {}),
    location: {
      "@type": "Place",
      name: venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: venue.address.street,
        postalCode: venue.address.postalCode,
        addressLocality: venue.address.city,
        addressCountry: venue.address.country,
      },
    },
    organizer: { "@id": restaurantId },
    ...(event.free !== undefined || event.ticketUrl
      ? {
          offers: {
            "@type": "Offer",
            ...(event.free ? { price: "0", priceCurrency: "EUR" } : {}),
            ...(event.ticketUrl ? { url: event.ticketUrl } : {}),
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Serialises JSON-LD safely for a <script> tag (escapes "<"). */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
