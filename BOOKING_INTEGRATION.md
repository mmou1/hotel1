# Guide d'Intégration Booking.com

Ce document explique comment configurer l'intégration Booking.com pour L'Hôtel des Poètes.

## Option 1 : Redirection vers Booking.com (Actuellement utilisée)

### Avantages
- ✅ Simple et rapide à mettre en place
- ✅ Pas besoin de compte partenaire
- ✅ Fonctionne immédiatement
- ✅ Les utilisateurs sont redirigés vers la plateforme sécurisée de Booking.com

### Configuration

1. **Trouvez l'ID de votre hôtel sur Booking.com**
   - Allez sur votre page Booking.com
   - L'URL ressemble à : `https://www.booking.com/hotel/fr/nom-de-votre-hotel.html`
   - L'ID est la partie après `/hotel/fr/` (exemple: `nom-de-votre-hotel`)

2. **Modifiez le fichier `BookingWidget.tsx`**
   - Ligne 9 : Remplacez `'YOUR_HOTEL_ID'` par votre ID d'hôtel
   
   ```tsx
   const BOOKING_HOTEL_ID = 'lhotel-des-poetes-beziers'; // Exemple
   ```

3. **C'est tout !** Le widget redirigera maintenant les visiteurs vers votre page Booking.com avec les dates pré-remplies.

---

## Option 2 : Widget Iframe Intégré

### Avantages
- ✅ Les utilisateurs restent sur votre site
- ✅ Expérience de réservation fluide
- ✅ Personnalisable

### Prérequis
- Compte **Booking.com Extranet** (gratuit pour les propriétaires)
- Être inscrit en tant que partenaire Booking.com

### Configuration

1. **Connectez-vous à Booking.com Extranet**
   - URL : https://admin.booking.com
   - Utilisez vos identifiants de propriétaire

2. **Créez un widget de réservation**
   - Allez dans **Promotion** → **Outils marketing**
   - Sélectionnez **Widget de réservation**
   - Personnalisez les couleurs et options
   - Générez le code

3. **Intégrez le widget dans votre site**
   - Copiez l'URL du widget fourni
   - Dans `App.tsx`, remplacez `<BookingWidget />` par `<BookingWidgetIframe />`
   - Ajoutez l'import : `import { BookingWidgetIframe } from './components/BookingWidgetIframe';`
   - Modifiez `BookingWidgetIframe.tsx` ligne 13 avec votre URL

---

## Option 3 : API Booking.com (Avancé)

### Avantages
- ✅ Contrôle total de l'expérience
- ✅ Synchronisation en temps réel des disponibilités
- ✅ Gestion des réservations depuis votre propre interface

### Prérequis
- Compte **Booking.com Connectivity Partner**
- Connaissances en développement backend
- Serveur pour gérer les appels API

### Étapes
1. Inscrivez-vous au programme Booking.com Connectivity
2. Obtenez vos clés API
3. Implémentez l'API de disponibilité et de réservation
4. Configurez un backend (Supabase, Node.js, etc.)

**Note** : Cette option est complexe et recommandée uniquement si vous avez un développeur dédié.

---

## Recommandation

Pour L'Hôtel des Poètes, je recommande de commencer avec **l'Option 1 (Redirection)** car :

- C'est la solution la plus simple
- Aucune maintenance requise
- Booking.com gère toute la sécurité et le processus de paiement
- Vous pouvez toujours migrer vers l'Option 2 plus tard

---

## Support

Si vous avez besoin d'aide pour configurer l'intégration :

1. **Documentation Booking.com** : https://partner.booking.com
2. **Support Booking.com** : Via votre Extranet
3. **Modification du code** : Je peux vous aider à personnaliser davantage le widget

---

## Fichiers concernés

- `src/app/components/BookingWidget.tsx` - Widget avec redirection (utilisé actuellement)
- `src/app/components/BookingWidgetIframe.tsx` - Widget iframe (alternative)
- `src/app/App.tsx` - Page principale qui utilise le widget
