/**
 * Widget Booking.com intégré (iframe)
 *
 * Pour utiliser ce widget :
 * 1. Connectez-vous à votre compte Booking.com Extranet
 * 2. Allez dans "Promotion" > "Outils marketing"
 * 3. Générez un widget de réservation
 * 4. Copiez le code iframe fourni
 * 5. Remplacez l'URL ci-dessous par celle de votre widget
 */

export function BookingWidgetIframe() {
  // URL du widget Booking.com - À remplacer par votre propre URL
  const BOOKING_WIDGET_URL = 'https://www.booking.com/searchresults.html?aid=YOUR_AFFILIATE_ID';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
      <iframe
        src={BOOKING_WIDGET_URL}
        width="100%"
        height="400"
        frameBorder="0"
        className="w-full"
        title="Widget de réservation Booking.com"
      />

      <div className="p-4 bg-yellow-50 border-t border-yellow-200 text-sm text-yellow-800">
        <p className="mb-2">
          ℹ️ <strong>Configuration du widget iframe :</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-xs">
          <li>Connectez-vous à votre <a href="https://admin.booking.com" target="_blank" rel="noopener noreferrer" className="underline">Booking.com Extranet</a></li>
          <li>Allez dans <strong>Promotion → Outils marketing</strong></li>
          <li>Créez un widget de réservation personnalisé</li>
          <li>Copiez l'URL du widget et remplacez <code className="bg-yellow-100 px-1 rounded">BOOKING_WIDGET_URL</code> dans le code</li>
        </ol>
      </div>
    </div>
  );
}
