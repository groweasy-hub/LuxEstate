import OffersPageClient from "./OffersPageClient";
import { getAllOffers, getFeaturedOffer } from "@/lib/offersData";

export const dynamic = "force-dynamic";

export default async function OffersPage() {
  const [offers, featured] = await Promise.all([
    getAllOffers(),
    getFeaturedOffer(),
  ]);

  const featuredOffer = featured || offers[0] || null;

  return (
    <OffersPageClient
      offers={offers}
      featuredOffer={featuredOffer}
    />
  );
}
