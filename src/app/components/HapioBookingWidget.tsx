import { Calendar, Users, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface Room {
  id: string;
  name: string;
  capacity: number;
  price: number;
}

export function HapioBookingWidget() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('2');
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      setError('Veuillez sélectionner les dates d\'arrivée et de départ');
      return;
    }

    setLoading(true);
    setError('');
    setShowResults(false);

    try {
      const params = new URLSearchParams({
        checkIn,
        checkOut,
        adults,
      });

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-173baa2d/hapio/availability?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des disponibilités');
      }

      const data = await response.json();
      setAvailableRooms(data.rooms || []);
      setShowResults(true);
    } catch (err) {
      console.error('Search error:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = (roomId: string) => {
    // Redirection vers la page de réservation avec les paramètres
    const params = new URLSearchParams({
      roomId,
      checkIn,
      checkOut,
      adults,
    });
    window.location.href = `/reservation?${params}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="md:col-span-1">
          <label className="block text-sm mb-2 text-foreground/70">Arrivée</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
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
              min={checkIn || new Date().toISOString().split('T')[0]}
              className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm mb-2 text-foreground/70">Personnes</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <select
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
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
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Recherche...</span>
              </>
            ) : (
              <span>Vérifier disponibilités</span>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          {error}
        </div>
      )}

      {showResults && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="font-serif text-xl mb-4">Chambres disponibles</h3>
          {availableRooms.length === 0 ? (
            <p className="text-foreground/60 text-center py-8">
              Aucune chambre disponible pour ces dates. Veuillez essayer d'autres dates.
            </p>
          ) : (
            <div className="grid gap-4">
              {availableRooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary transition-colors"
                >
                  <div>
                    <h4 className="font-medium mb-1">{room.name}</h4>
                    <p className="text-sm text-foreground/60">
                      Jusqu'à {room.capacity} personnes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl text-primary mb-2">
                      {room.price}€
                    </p>
                    <button
                      onClick={() => handleBookRoom(room.id)}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                    >
                      Réserver
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
