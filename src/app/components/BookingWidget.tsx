import { Calendar, Users, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function BookingWidget() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  // ID de votre hôtel sur Booking.com (extrait de l'URL)
  const BOOKING_HOTEL_ID = 'des-poetes';

  const handleBooking = () => {
    // Formatage des dates pour Booking.com (YYYY-MM-DD)
    const checkInDate = checkIn || '';
    const checkOutDate = checkOut || '';

    // Construction de l'URL Booking.com avec les paramètres
    let bookingUrl = `https://www.booking.com/hotel/fr/${BOOKING_HOTEL_ID}.html?`;

    const params = new URLSearchParams();

    if (checkInDate) {
      params.append('checkin', checkInDate);
    }
    if (checkOutDate) {
      params.append('checkout', checkOutDate);
    }

    // Nombre d'adultes
    params.append('group_adults', guests);
    params.append('group_children', '0');
    params.append('no_rooms', '1');

    // Ouvre Booking.com dans un nouvel onglet
    window.open(bookingUrl + params.toString(), '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <label className="block text-sm mb-2 text-foreground/70">Arrivée</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm mb-2 text-foreground/70">Départ</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm mb-2 text-foreground/70">Personnes</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary appearance-none text-foreground"
            >
              <option value="1">1 personne</option>
              <option value="2">2 personnes</option>
              <option value="3">3 personnes</option>
              <option value="4">4 personnes</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-1 flex items-end">
          <button
            onClick={handleBooking}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span>Réserver</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
