/**
 * Content for the restaurant "solutions" pages (/[locale]/solutions/<slug>).
 *
 * Every capability referenced here is real and traceable to skybot-inbox:
 * - Voice reservations: src/workflow-engine/workflows/booking.workflow.ts
 *   (calendar two-way sync, slot-conflict check, confirmation message)
 * - Voice availability / capacity / alternative slots + phone orders → POS:
 *   src/voice/voice-agent-api.service.ts (checkAvailability, createOrder → HubRise)
 * - Multi-channel AI replies: src/channels/{instagram-ai-reply,email-ai-reply,
 *   webchat-ai}.service.ts, connectors/{whatsapp-cloud,meta,email,webchat}.connector.ts
 * - Email's deliberate human-handoff on sensitive topics: SENSITIVE_TOPIC_KEYWORDS
 *   in email-ai-reply.service.ts
 *
 * No fabricated statistics, client names, or numeric outcomes — only
 * qualitative, capability-grounded copy.
 */

export type Locale = "fr" | "en" | "es" | "de" | "pt";

export type IconKey =
  | "phone-ring"
  | "clock"
  | "calendar-check"
  | "message-circle"
  | "utensils"
  | "wine"
  | "truck"
  | "gem"
  | "zap"
  | "users";

export interface SolutionFeature {
  icon: IconKey;
  title: string;
  desc: string;
}

export interface SolutionDayStep {
  time: string;
  text: string;
}

export interface SolutionCopy {
  /** Short label used in nav/cards, e.g. "Restaurant traditionnel" */
  label: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  heroTitleA: string;
  heroTitleHighlight: string;
  heroTitleB: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  painTitle: string;
  painBody: string;
  painPoints: string[];
  solutionTitle: string;
  solutionSubtitle: string;
  features: SolutionFeature[];
  dayTitle: string;
  daySubtitle: string;
  daySteps: SolutionDayStep[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
}

export interface SolutionEntry {
  slug: string;
  iconKey: IconKey;
  accentFrom: string; // tailwind gradient classes
  accentTo: string;
  glow: string;
  copy: Partial<Record<Locale, SolutionCopy>>;
}

export const SOLUTIONS: SolutionEntry[] = [
  // ── 1. Restaurant traditionnel / bistrot ──────────────────────────────
  {
    slug: "restaurant-traditionnel",
    iconKey: "utensils",
    accentFrom: "from-orange-500",
    accentTo: "to-red-500",
    glow: "group-hover:shadow-orange-500/20",
    copy: {
      fr: {
        label: "Restaurant traditionnel",
        metaTitle: "IA pour restaurant traditionnel — répondre au téléphone pendant le coup de feu | Aevia",
        metaDescription:
          "Le téléphone sonne pendant le service et personne n'est disponible pour répondre. L'agent vocal Aevia prend les réservations en temps réel, sans interrompre la brigade.",
        badge: "Restaurant traditionnel · Bistrot",
        heroTitleA: "Le téléphone sonne pendant le coup de feu.",
        heroTitleHighlight: "Personne n'est libre",
        heroTitleB: "pour répondre.",
        heroSubtitle:
          "En cuisine ou en salle, personne ne peut décrocher entre midi et 14h. Chaque appel manqué, c'est une réservation qui part chez le voisin.",
        ctaPrimary: "Voir comment ça marche",
        ctaSecondary: "Découvrir AeviaInbox",
        painTitle: "Le problème",
        painBody:
          "Un bistrot tourne avec une équipe réduite : le chef en cuisine, un ou deux en salle. Pendant le coup de feu, personne n'a de main libre pour un appel de trois minutes — et pourtant c'est justement à ces heures-là que les clients appellent pour réserver le soir même. Résultat : le téléphone sonne dans le vide, ou quelqu'un décroche entre deux plats en s'excusant de devoir raccrocher vite. Les habitués comprennent, les nouveaux clients essaient ailleurs.",
        painPoints: [
          "Impossible de laisser la cuisine ou le pass pour répondre entre 12h et 14h",
          "Un appel décroché à la va-vite = informations mal prises, erreurs de couverts",
          "Les demandes hors service (le matin, en coupure) atterrissent sur un répondeur jamais réécouté",
        ],
        solutionTitle: "Comment Aevia répond",
        solutionSubtitle:
          "Un agent vocal qui décroche à votre place, avec vos horaires et votre agenda réels — pas un standard générique.",
        features: [
          {
            icon: "phone-ring",
            title: "L'agent vocal décroche à chaque appel",
            desc: "Il connaît vos services (midi/soir, jour de fermeture) et répond même quand toute l'équipe est sur le pont.",
          },
          {
            icon: "calendar-check",
            title: "Réservation prise en temps réel",
            desc: "Il vérifie la disponibilité réelle de la salle au créneau demandé et évite les doublons grâce à la synchronisation avec votre agenda Google Calendar.",
          },
          {
            icon: "clock",
            title: "Créneau plein ? Il propose une alternative",
            desc: "Si 20h est complet, l'agent propose le créneau le plus proche encore disponible au lieu de simplement refuser.",
          },
          {
            icon: "message-circle",
            title: "Confirmation immédiate",
            desc: "Le client reçoit sa confirmation avec le lien pour l'ajouter à son propre calendrier, sans que personne en salle n'ait eu à s'en occuper.",
          },
        ],
        dayTitle: "Une heure de service, avec Aevia",
        daySubtitle: "Un scénario réaliste, pas une promesse chiffrée.",
        daySteps: [
          { time: "12h58", text: "Le service bat son plein, la brigade est en pleine action. Le téléphone sonne deux fois en cinq minutes." },
          { time: "12h58", text: "L'agent vocal décroche le premier appel : une table de 6 pour ce soir, avec une question sur la terrasse." },
          { time: "12h59", text: "Il vérifie la disponibilité réelle à 20h — la terrasse est complète pour ce groupe à cette heure — et propose 20h45, encore libre." },
          { time: "13h01", text: "Le second appel arrive pendant que le premier se termine : l'agent le prend aussi, sans faire attendre personne." },
          { time: "13h02", text: "Confirmation envoyée aux deux clients. En cuisine, personne n'a quitté son poste." },
        ],
        ctaTitle: "Laissez l'agent vocal gérer vos appels de réservation",
        ctaBody: "Configuré avec vos horaires, votre capacité de salle et votre agenda — prêt à répondre dès le premier appel.",
        ctaButton: "Discuter de votre restaurant",
      },
      en: {
        label: "Traditional restaurant",
        metaTitle: "AI for traditional restaurants — answer the phone during the rush | Aevia",
        metaDescription:
          "The phone rings mid-service and nobody's free to answer. Aevia's voice agent takes reservations in real time without pulling staff off the floor.",
        badge: "Traditional restaurant · Bistro",
        heroTitleA: "The phone rings during the rush.",
        heroTitleHighlight: "Nobody's free",
        heroTitleB: "to answer.",
        heroSubtitle:
          "Between noon and 2pm, kitchen and floor staff have no hands free. Every missed call is a reservation that goes to the place next door instead.",
        ctaPrimary: "See how it works",
        ctaSecondary: "Explore AeviaInbox",
        painTitle: "The problem",
        painBody:
          "A bistro runs on a small team — the chef in the kitchen, one or two on the floor. During the rush nobody has a spare three minutes for a phone call, yet that's exactly when people call to book for tonight. The phone rings out, or someone picks up between plates and rushes the caller off the line. Regulars understand; new customers just try somewhere else.",
        painPoints: [
          "No one can step away from the kitchen or the pass between noon and 2pm",
          "A rushed answer means details get lost — wrong party size, wrong time",
          "Calls outside service hours land on voicemail nobody replays",
        ],
        solutionTitle: "How Aevia handles it",
        solutionSubtitle: "A voice agent that answers in your place, using your real hours and your real calendar — not a generic switchboard.",
        features: [
          {
            icon: "phone-ring",
            title: "The voice agent answers every call",
            desc: "It knows your service hours and closing day, and picks up even when the whole team is slammed.",
          },
          {
            icon: "calendar-check",
            title: "Reservations booked in real time",
            desc: "It checks actual room availability for the requested slot and avoids double-booking by syncing with your Google Calendar.",
          },
          {
            icon: "clock",
            title: "Slot full? It offers an alternative",
            desc: "If 8pm is booked out, the agent suggests the closest open slot instead of just turning the caller away.",
          },
          {
            icon: "message-circle",
            title: "Instant confirmation",
            desc: "The guest gets a confirmation with a link to add it to their own calendar — nobody on the floor had to touch it.",
          },
        ],
        dayTitle: "One hour of service, with Aevia",
        daySubtitle: "A realistic scenario, not a numbered promise.",
        daySteps: [
          { time: "12:58pm", text: "Service is in full swing, the team is heads-down. The phone rings twice in five minutes." },
          { time: "12:58pm", text: "The voice agent picks up the first call: a party of 6 for tonight, asking about the terrace." },
          { time: "12:59pm", text: "It checks real availability for 8pm — the terrace is full for that group size — and offers 8:45pm instead, which is open." },
          { time: "1:01pm", text: "The second call comes in as the first wraps up; the agent takes it too, no one left waiting." },
          { time: "1:02pm", text: "Both guests get their confirmation. In the kitchen, nobody left their station." },
        ],
        ctaTitle: "Let the voice agent handle your reservation calls",
        ctaBody: "Set up with your hours, your room capacity, and your calendar — ready to answer from the first call.",
        ctaButton: "Talk about your restaurant",
      },
    },
  },

  // ── 2. Restauration rapide / fast-casual ──────────────────────────────
  {
    slug: "restaurant-rapide",
    iconKey: "zap",
    accentFrom: "from-cyan-500",
    accentTo: "to-blue-500",
    glow: "group-hover:shadow-cyan-500/20",
    copy: {
      fr: {
        label: "Restauration rapide",
        metaTitle: "IA pour restauration rapide — gérer le volume du coup de feu déjeuner | Aevia",
        metaDescription:
          "Appels, DM Instagram et messages WhatsApp s'accumulent pendant le rush du midi. Aevia répond instantanément sur tous les canaux, sans faire attendre personne.",
        badge: "Restauration rapide · Fast-casual",
        heroTitleA: "Le rush du midi, ce n'est pas des réservations.",
        heroTitleHighlight: "C'est du volume.",
        heroTitleB: "",
        heroSubtitle:
          "Entre 11h30 et 13h30, les questions simples s'accumulent sur tous les canaux à la fois — pendant que toute l'équipe est en cuisine ou au comptoir.",
        ctaPrimary: "Voir comment ça marche",
        ctaSecondary: "Découvrir AeviaInbox",
        painTitle: "Le problème",
        painBody:
          "Dans un fast-casual, le sujet n'est presque jamais la nuance d'une réservation à table — c'est le volume. Pendant le coup de feu, le téléphone sonne, les DM Instagram arrivent, les messages WhatsApp s'accumulent — et toute l'équipe est en cuisine ou au comptoir à préparer les commandes. Les questions sont souvent simples (horaires, allergènes, « vous livrez ? », « c'est complet ? ») mais si personne ne répond dans les minutes qui suivent, le client hésitant part vers l'enseigne d'à côté qui, elle, a répondu.",
        painPoints: [
          "Impossible de décrocher ou de répondre à un DM pendant 90 minutes de rush",
          "Les questions sont simples mais répétitives — chaque canal (tel, Instagram, WhatsApp, site) reçoit les mêmes",
          "Un client qui n'a pas de réponse en quelques minutes change d'enseigne",
        ],
        solutionTitle: "Comment Aevia répond",
        solutionSubtitle:
          "Une seule base de connaissances (horaires, menu, allergènes, FAQ) qui répond instantanément sur chaque canal, en parallèle, sans jamais faire la queue.",
        features: [
          {
            icon: "zap",
            title: "Réponse instantanée, tous canaux confondus",
            desc: "Téléphone, WhatsApp, Instagram DM et chat du site sont tous branchés sur la même IA — aucun canal ne prend le pas sur un autre.",
          },
          {
            icon: "message-circle",
            title: "Les questions simples ne remontent jamais au comptoir",
            desc: "Horaires, allergènes, zone de livraison, menu du jour : l'IA répond directement depuis vos informations, sans interrompre la préparation des commandes.",
          },
          {
            icon: "phone-ring",
            title: "L'agent vocal absorbe les pics d'appels",
            desc: "Plusieurs appels simultanés pendant le rush ? Chacun est pris en charge sans mise en attente — ce qu'une seule personne au comptoir ne peut pas faire.",
          },
          {
            icon: "users",
            title: "Les cas sensibles remontent à un humain",
            desc: "Une réclamation ou un sujet délicat par email est automatiquement détecté et transmis à l'équipe plutôt que traité par l'IA.",
          },
        ],
        dayTitle: "Deux minutes de rush, avec Aevia",
        daySubtitle: "Un scénario réaliste, pas une promesse chiffrée.",
        daySteps: [
          { time: "12h14", text: "Le comptoir enchaîne les commandes, la file d'attente s'allonge." },
          { time: "12h14", text: "Un DM Instagram arrive : « vous avez du sans gluten ? » — répondu en quelques secondes à partir du menu réel." },
          { time: "12h15", text: "Le téléphone sonne en même temps : quelqu'un demande si vous livrez dans son quartier — réponse immédiate, sans faire patienter." },
          { time: "12h16", text: "Un message WhatsApp suit : « vous êtes ouverts dimanche ? » — répondu tout aussi vite." },
          { time: "12h16", text: "Personne au comptoir n'a quitté les commandes en cours pour répondre à l'une de ces trois demandes." },
        ],
        ctaTitle: "Absorbez le volume du coup de feu sans y perdre de clients",
        ctaBody: "Configuré avec votre menu, vos horaires et vos allergènes — prêt à répondre sur tous les canaux dès le premier jour.",
        ctaButton: "Discuter de votre établissement",
      },
      en: {
        label: "Fast-casual",
        metaTitle: "AI for fast-casual restaurants — handle lunch-rush volume | Aevia",
        metaDescription:
          "Calls, Instagram DMs and WhatsApp messages pile up during the lunch rush. Aevia answers instantly across every channel, so nobody waits.",
        badge: "Fast-casual · Quick service",
        heroTitleA: "The lunch rush isn't about reservations.",
        heroTitleHighlight: "It's about volume.",
        heroTitleB: "",
        heroSubtitle:
          "Between 11:30 and 1:30, simple questions pile up across every channel at once — while the whole team is on the line or at the counter.",
        ctaPrimary: "See how it works",
        ctaSecondary: "Explore AeviaInbox",
        painTitle: "The problem",
        painBody:
          "In a fast-casual spot the issue is almost never reservation nuance — it's raw volume. During the rush the phone rings, Instagram DMs land, WhatsApp messages pile up, and the whole team is heads-down at the counter or the line. The questions are usually simple (hours, allergens, \"do you deliver?\", \"are you full?\") but if nobody answers within a few minutes, the undecided customer just walks — or messages — the place next door instead.",
        painPoints: [
          "No one can pick up a call or answer a DM during a 90-minute rush",
          "Questions are simple but repetitive — every channel (phone, Instagram, WhatsApp, site) gets the same ones",
          "A customer without an answer in a few minutes goes elsewhere",
        ],
        solutionTitle: "How Aevia handles it",
        solutionSubtitle: "One knowledge base — hours, menu, allergens, FAQ — answering instantly on every channel in parallel, with no queue.",
        features: [
          {
            icon: "zap",
            title: "Instant replies, every channel at once",
            desc: "Phone, WhatsApp, Instagram DM, and the site chat all run on the same AI — no channel waits behind another.",
          },
          {
            icon: "message-circle",
            title: "Simple questions never reach the counter",
            desc: "Hours, allergens, delivery zone, today's menu — the AI answers straight from your own information, without pulling anyone off order prep.",
          },
          {
            icon: "phone-ring",
            title: "The voice agent absorbs call spikes",
            desc: "Several calls at once during the rush? Each one is handled, no hold music — something one person at the counter simply can't do.",
          },
          {
            icon: "users",
            title: "Sensitive cases go to a human",
            desc: "A complaint or a delicate topic arriving by email is automatically flagged and routed to the team instead of auto-answered.",
          },
        ],
        dayTitle: "Two minutes of the rush, with Aevia",
        daySubtitle: "A realistic scenario, not a numbered promise.",
        daySteps: [
          { time: "12:14pm", text: "The counter is running order after order, the line is growing." },
          { time: "12:14pm", text: "An Instagram DM comes in: \"do you have gluten-free?\" — answered in seconds from the real menu." },
          { time: "12:15pm", text: "The phone rings at the same time: someone asks if you deliver to their neighborhood — answered instantly, no waiting." },
          { time: "12:16pm", text: "A WhatsApp message follows: \"are you open Sundays?\" — answered just as fast." },
          { time: "12:16pm", text: "Nobody at the counter stepped away from live orders to handle any of the three." },
        ],
        ctaTitle: "Absorb rush-hour volume without losing customers to it",
        ctaBody: "Set up with your menu, your hours, and your allergens — ready to answer on every channel from day one.",
        ctaButton: "Talk about your restaurant",
      },
    },
  },

  // ── 3. Restaurant gastronomique ────────────────────────────────────────
  {
    slug: "restaurant-gastronomique",
    iconKey: "gem",
    accentFrom: "from-amber-300",
    accentTo: "to-yellow-600",
    glow: "group-hover:shadow-amber-400/20",
    copy: {
      fr: {
        label: "Restaurant gastronomique",
        metaTitle: "IA pour restaurant gastronomique — réservations précises, sans no-show | Aevia",
        metaDescription:
          "Chaque table compte. L'agent vocal Aevia prend les réservations avec précision, évite les doublons et confirme immédiatement pour limiter les no-shows.",
        badge: "Restaurant gastronomique",
        heroTitleA: "Chaque table a un coût quand elle reste vide.",
        heroTitleHighlight: "La précision",
        heroTitleB: "n'est pas négociable.",
        heroSubtitle:
          "En gastronomie, une réservation mal prise ou un no-show ne se rattrape pas comme dans un restaurant à fort roulement — la table reste vide toute la soirée.",
        ctaPrimary: "Voir comment ça marche",
        ctaSecondary: "Découvrir AeviaInbox",
        painTitle: "Le problème",
        painBody:
          "Un restaurant gastronomique vit avec peu de tables et un service exigeant. Une réservation approximative — mauvais horaire, doublon, détail oublié — coûte cher parce qu'il n'y a pas de volume pour compenser une table vide. Pendant le service, c'est souvent le maître d'hôtel ou le chef lui-même qui doit décrocher, au pire moment. Et les habitués attendent d'être reconnus, pas de tout réexpliquer à chaque appel.",
        painPoints: [
          "Une table refusée ou mal réservée pèse lourd sur une soirée à faible volume",
          "Le service est exigeant : personne d'assez disponible pour un appel précis pendant le coup de feu",
          "Les clients réguliers s'attendent à être reconnus, pas traités comme un premier contact",
        ],
        solutionTitle: "Comment Aevia répond",
        solutionSubtitle:
          "Un agent vocal qui vérifie la disponibilité réelle avant de confirmer, synchronisé avec l'agenda que vous utilisez déjà pour gérer la salle.",
        features: [
          {
            icon: "calendar-check",
            title: "Vérification de capacité avant confirmation",
            desc: "L'agent vérifie la disponibilité réelle du service demandé et propose le créneau suivant disponible plutôt que de surbooker.",
          },
          {
            icon: "gem",
            title: "Synchronisation avec l'agenda de la maison",
            desc: "Chaque réservation se reflète immédiatement dans le calendrier que vous utilisez déjà pour organiser le plan de salle — aucune double saisie, aucun conflit.",
          },
          {
            icon: "message-circle",
            title: "Confirmation immédiate, moins d'incertitude",
            desc: "Le client reçoit sa confirmation dès l'appel raccroché — un des leviers les plus simples pour limiter les no-shows liés à l'oubli.",
          },
          {
            icon: "users",
            title: "Historique du client conservé",
            desc: "Appels, WhatsApp, email : chaque échange avec un contact reste rattaché à sa fiche, pour ne pas repartir de zéro avec un habitué. Les demandes sensibles par email sont transmises à un humain plutôt qu'automatisées.",
          },
        ],
        dayTitle: "Un changement de dernière minute, avec Aevia",
        daySubtitle: "Un scénario réaliste, pas une promesse chiffrée.",
        daySteps: [
          { time: "18h42", text: "Le service bat son plein, le maître d'hôtel est en salle. Le téléphone sonne." },
          { time: "18h42", text: "Un client veut avancer sa réservation de samedi : table de 4 à 21h au lieu de 19h30." },
          { time: "18h43", text: "L'agent vérifie la disponibilité réelle du service de 21h — la table est libre à ce créneau." },
          { time: "18h43", text: "La réservation est mise à jour et synchronisée avec le calendrier de la maison." },
          { time: "18h44", text: "Confirmation envoyée au client. Personne n'a quitté la salle pour gérer le changement." },
        ],
        ctaTitle: "Protégez chaque table avec des réservations précises",
        ctaBody: "Configuré avec vos services, votre capacité par créneau et votre agenda — pour que chaque appel se traduise par une réservation fiable.",
        ctaButton: "Discuter de votre établissement",
      },
      en: {
        label: "Fine dining",
        metaTitle: "AI for fine dining — precise bookings, fewer no-shows | Aevia",
        metaDescription:
          "Every table matters. Aevia's voice agent books reservations precisely, prevents double-booking, and confirms instantly to reduce no-shows.",
        badge: "Fine dining",
        heroTitleA: "Every table costs you when it sits empty.",
        heroTitleHighlight: "Precision",
        heroTitleB: "isn't optional.",
        heroSubtitle:
          "In fine dining, a mis-booked table or a no-show doesn't get absorbed the way it would at a high-turnover restaurant — the table stays empty for the night.",
        ctaPrimary: "See how it works",
        ctaSecondary: "Explore AeviaInbox",
        painTitle: "The problem",
        painBody:
          "A fine dining room runs on few tables and an exacting service. A loosely taken reservation — wrong time, a double-booking, a forgotten detail — costs real money because there's no volume to absorb an empty table. During service it's often the maître d' or the chef who has to answer the phone, at the worst possible moment. And regulars expect to be recognized, not to re-explain themselves on every call.",
        painPoints: [
          "A mishandled or refused table weighs heavily on a low-volume night",
          "Service is demanding — nobody has the bandwidth for a precise call mid-service",
          "Regulars expect recognition, not to be treated like a first-time caller",
        ],
        solutionTitle: "How Aevia handles it",
        solutionSubtitle: "A voice agent that checks real availability before confirming, synced with the calendar you already use to run the room.",
        features: [
          {
            icon: "calendar-check",
            title: "Capacity check before confirming",
            desc: "The agent checks real availability for the requested service and offers the next open slot rather than overbooking.",
          },
          {
            icon: "gem",
            title: "Synced with the house calendar",
            desc: "Every booking reflects instantly in the calendar you already use to run the floor plan — no double entry, no conflicts.",
          },
          {
            icon: "message-circle",
            title: "Instant confirmation, less uncertainty",
            desc: "The guest gets confirmation the moment the call ends — one of the simplest levers against forgetfulness-driven no-shows.",
          },
          {
            icon: "users",
            title: "Guest history retained",
            desc: "Calls, WhatsApp, email — every exchange stays attached to that contact's record, so a regular doesn't start from zero. Sensitive email requests are routed to a human rather than automated.",
          },
        ],
        dayTitle: "A last-minute change, with Aevia",
        daySubtitle: "A realistic scenario, not a numbered promise.",
        daySteps: [
          { time: "6:42pm", text: "Service is in full swing, the maître d' is on the floor. The phone rings." },
          { time: "6:42pm", text: "A guest wants to move Saturday's booking earlier: table for 4 at 9pm instead of 7:30pm." },
          { time: "6:43pm", text: "The agent checks real availability for the 9pm service — the table is open at that time." },
          { time: "6:43pm", text: "The booking is updated and synced with the house calendar." },
          { time: "6:44pm", text: "Confirmation sent to the guest. Nobody left the floor to handle the change." },
        ],
        ctaTitle: "Protect every table with precise bookings",
        ctaBody: "Set up with your services, your per-slot capacity, and your calendar — so every call becomes a reliable reservation.",
        ctaButton: "Talk about your restaurant",
      },
    },
  },

  // ── 4. Food truck / traiteur ───────────────────────────────────────────
  {
    slug: "food-truck-traiteur",
    iconKey: "truck",
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-500",
    glow: "group-hover:shadow-emerald-500/20",
    copy: {
      fr: {
        label: "Food truck & traiteur",
        metaTitle: "IA pour food truck et traiteur — répondre sur Instagram sans lâcher le service | Aevia",
        metaDescription:
          "Pas d'adresse fixe, pas de personne dédiée au téléphone. Aevia répond sur Instagram et email pendant que vous cuisinez, et route les demandes de devis à un humain.",
        badge: "Food truck · Traiteur",
        heroTitleA: "Pas d'adresse fixe.",
        heroTitleHighlight: "Pas de main libre",
        heroTitleB: "non plus.",
        heroSubtitle:
          "La cuisine et le service se font au même endroit, avec la même personne. Le téléphone dans la poche du tablier ne répond jamais à temps.",
        ctaPrimary: "Voir comment ça marche",
        ctaSecondary: "Découvrir AeviaInbox",
        painTitle: "Le problème",
        painBody:
          "Un food truck ou une activité traiteur n'a ni adresse fixe ni personne dédiée à l'accueil — la même personne cuisine et sert. La majorité des demandes arrivent là où vous construisez votre visibilité : Instagram, avec des questions comme « vous êtes où aujourd'hui ? » ou une demande de devis pour un événement dans trois semaines. Si la réponse met des heures à arriver, le client passe au traiteur suivant sur sa liste.",
        painPoints: [
          "Personne de libre pour répondre à un DM ou un appel pendant le service",
          "Les demandes de devis traiteur sont à fort enjeu — une mauvaise estimation automatique coûte cher",
          "Le lieu et les horaires changent d'un jour à l'autre, difficile à suivre manuellement sur chaque canal",
        ],
        solutionTitle: "Comment Aevia répond",
        solutionSubtitle:
          "Instagram traité comme un canal à part entière, avec un routage prudent des demandes à fort enjeu vers vous.",
        features: [
          {
            icon: "message-circle",
            title: "Instagram DM répond à partir de vos infos du jour",
            desc: "Emplacement, horaires, menu du moment : les questions rapides trouvent une réponse instantanée, sans que vous lâchiez la plancha.",
          },
          {
            icon: "users",
            title: "Les demandes de devis remontent à vous",
            desc: "Une demande de traiteur pour un événement — quantités, budget, date — est un sujet trop précis pour être deviné par l'IA : elle est transmise directement à votre équipe, comme les autres sujets sensibles reçus par email.",
          },
          {
            icon: "phone-ring",
            title: "Commandes à emporter prises par téléphone",
            desc: "L'agent vocal peut prendre une commande pour retrait, la faire correspondre à votre carte, et la transmettre directement à votre caisse (avec une sauvegarde locale si la caisse est injoignable — la commande n'est jamais perdue).",
          },
          {
            icon: "zap",
            title: "Multi-canal sans y penser",
            desc: "Instagram, WhatsApp, email, téléphone : chaque canal partage la même base d'informations, à jour avec votre activité mobile.",
          },
        ],
        dayTitle: "Un samedi de marché, avec Aevia",
        daySubtitle: "Un scénario réaliste, pas une promesse chiffrée.",
        daySteps: [
          { time: "12h10", text: "Le truck est plein, la file s'allonge. Un DM Instagram arrive : « vous êtes où aujourd'hui ? »" },
          { time: "12h10", text: "Réponse envoyée en quelques secondes, à partir de l'emplacement du jour — personne n'a lâché la spatule." },
          { time: "16h30", text: "Un email arrive pour un événement de 40 personnes le mois prochain." },
          { time: "16h30", text: "La demande est reconnue comme un sujet à fort enjeu et transmise directement à l'équipe plutôt que traitée automatiquement." },
          { time: "17h00", text: "Le service continue sans interruption — les deux demandes ont trouvé une réponse adaptée, sans détourner personne de la cuisine." },
        ],
        ctaTitle: "Répondez partout, même sans adresse fixe",
        ctaBody: "Configuré avec votre menu, vos horaires du jour et vos canaux — Instagram, WhatsApp, email et téléphone réunis dans une seule boîte.",
        ctaButton: "Discuter de votre activité",
      },
      en: {
        label: "Food truck & catering",
        metaTitle: "AI for food trucks and caterers — answer Instagram without leaving the line | Aevia",
        metaDescription:
          "No fixed address, no one dedicated to answering the phone. Aevia replies on Instagram and email while you cook, and routes quote requests to a human.",
        badge: "Food truck · Catering",
        heroTitleA: "No fixed address.",
        heroTitleHighlight: "No free hands",
        heroTitleB: "either.",
        heroSubtitle:
          "Cooking and serving happen at the same spot, by the same person. The phone in the apron pocket never gets answered in time.",
        ctaPrimary: "See how it works",
        ctaSecondary: "Explore AeviaInbox",
        painTitle: "The problem",
        painBody:
          "A food truck or catering operation has no fixed address and no one dedicated to the front — the same person cooks and serves. Most inquiries land where you build your following: Instagram, with questions like \"where are you today?\" or a catering quote request for an event three weeks out. If the reply takes hours, the customer moves to the next caterer on their list.",
        painPoints: [
          "No one free to answer a DM or a call mid-service",
          "Catering quote requests are high-stakes — a bad auto-generated estimate is costly",
          "Location and hours change day to day, hard to keep in sync across every channel manually",
        ],
        solutionTitle: "How Aevia handles it",
        solutionSubtitle: "Instagram treated as a first-class channel, with careful routing of high-stakes requests back to you.",
        features: [
          {
            icon: "message-circle",
            title: "Instagram DM answers from your info of the day",
            desc: "Location, hours, today's menu: quick questions get an instant answer without you stepping off the griddle.",
          },
          {
            icon: "users",
            title: "Quote requests come straight to you",
            desc: "A catering request for an event — quantities, budget, date — is too specific to be guessed by AI: it's routed directly to your team, like other sensitive topics received by email.",
          },
          {
            icon: "phone-ring",
            title: "Pickup orders taken by phone",
            desc: "The voice agent can take a pickup order, match it against your menu, and push it straight to your POS (with a local fallback if the POS is unreachable — the order is never lost).",
          },
          {
            icon: "zap",
            title: "Multi-channel without extra effort",
            desc: "Instagram, WhatsApp, email, phone — every channel shares the same information, kept current with your mobile schedule.",
          },
        ],
        dayTitle: "A Saturday market, with Aevia",
        daySubtitle: "A realistic scenario, not a numbered promise.",
        daySteps: [
          { time: "12:10pm", text: "The truck is slammed, the line keeps growing. An Instagram DM comes in: \"where are you today?\"" },
          { time: "12:10pm", text: "Answered in seconds from today's location — nobody put down the spatula." },
          { time: "4:30pm", text: "An email arrives about a 40-person event next month." },
          { time: "4:30pm", text: "The request is recognized as high-stakes and routed straight to the team instead of being auto-answered." },
          { time: "5:00pm", text: "Service continues uninterrupted — both requests got a fitting answer without pulling anyone off the line." },
        ],
        ctaTitle: "Answer everywhere, even without a fixed address",
        ctaBody: "Set up with your menu, today's hours, and your channels — Instagram, WhatsApp, email and phone in one inbox.",
        ctaButton: "Talk about your business",
      },
    },
  },

  // ── 5. Bar à cocktails / bar à vin ─────────────────────────────────────
  {
    slug: "bar-cocktails-vins",
    iconKey: "wine",
    accentFrom: "from-fuchsia-500",
    accentTo: "to-purple-600",
    glow: "group-hover:shadow-fuchsia-500/20",
    copy: {
      fr: {
        label: "Bar à cocktails / bar à vin",
        metaTitle: "IA pour bar à cocktails et bar à vin — gérer le pic du soir | Aevia",
        metaDescription:
          "L'ouverture du soir déclenche un pic d'appels et de messages. Aevia gère les réservations sans surbooker une petite salle, pendant que vous montez le bar.",
        badge: "Bar à cocktails · Bar à vin",
        heroTitleA: "L'ouverture du soir déclenche",
        heroTitleHighlight: "un pic",
        heroTitleB: "que personne n'a le temps de gérer.",
        heroSubtitle:
          "Réservations, groupes, privatisations — les demandes arrivent en rafale juste au moment où l'équipe monte le bar, pas pendant qu'elle sert.",
        ctaPrimary: "Voir comment ça marche",
        ctaSecondary: "Découvrir AeviaInbox",
        painTitle: "Le problème",
        painBody:
          "Un bar à cocktails ou à vin mélange une clientèle de passage et des réservations, avec une salle souvent restreinte. Le pic de demandes arrive au pire moment : juste à l'ouverture, quand une ou deux personnes montent le bar et ne sont pas disponibles pour prendre des appels ou répondre à des messages sur la faisabilité d'un groupe de 8 ce soir. Accepter une réservation sans vérifier la capacité réelle revient à surbooker une salle qui n'a pas de marge.",
        painPoints: [
          "Le pic d'appels tombe pendant le montage du bar, pas pendant le calme",
          "Une petite salle ne tolère pas d'être surbookée sur un créneau",
          "La clientèle plus jeune préfère souvent WhatsApp ou le chat au téléphone",
        ],
        solutionTitle: "Comment Aevia répond",
        solutionSubtitle:
          "Un agent vocal qui vérifie la capacité réelle avant de confirmer, et des canaux texte pour la clientèle qui préfère écrire.",
        features: [
          {
            icon: "phone-ring",
            title: "L'agent vocal absorbe le pic de l'ouverture",
            desc: "Plusieurs appels d'affilée à 19h ? Chacun est pris en charge, pendant que l'équipe termine de monter le bar.",
          },
          {
            icon: "calendar-check",
            title: "Capacité vérifiée avant chaque confirmation",
            desc: "L'agent vérifie la place réellement disponible au créneau demandé avant de confirmer un groupe, pour ne jamais surbooker une salle restreinte.",
          },
          {
            icon: "message-circle",
            title: "WhatsApp et chat pour ceux qui préfèrent écrire",
            desc: "Une partie de la clientèle réserve par message plutôt que par appel — le même agent y répond avec les mêmes informations à jour.",
          },
          {
            icon: "users",
            title: "Les demandes de privatisation remontent à vous",
            desc: "Un événement privé ou une demande sur-mesure sort du cadre d'une réservation standard et est transmis à un humain plutôt que traité automatiquement.",
          },
        ],
        dayTitle: "L'ouverture du vendredi, avec Aevia",
        daySubtitle: "Un scénario réaliste, pas une promesse chiffrée.",
        daySteps: [
          { time: "19h05", text: "Le bar vient d'ouvrir, l'équipe termine la mise en place. Deux appels arrivent coup sur coup." },
          { time: "19h05", text: "Le premier : une table de 2 pour ce soir — l'agent vérifie la place disponible et confirme directement." },
          { time: "19h06", text: "Le second : une question sur la privatisation pour un anniversaire le mois prochain — sujet transmis à l'équipe plutôt que deviné." },
          { time: "19h07", text: "Un message WhatsApp suit, demandant si une table de 8 est possible à 21h — vérifié, confirmé." },
          { time: "19h08", text: "L'équipe derrière le bar n'a interrompu la mise en place pour aucun des trois." },
        ],
        ctaTitle: "Absorbez le pic du soir sans surbooker la salle",
        ctaBody: "Configuré avec votre capacité réelle, vos horaires d'ouverture et vos canaux — prêt pour le rush de 19h.",
        ctaButton: "Discuter de votre établissement",
      },
      en: {
        label: "Cocktail bar / wine bar",
        metaTitle: "AI for cocktail bars and wine bars — handle the evening rush | Aevia",
        metaDescription:
          "Opening time triggers a spike of calls and messages. Aevia manages reservations without overbooking a small room, while your team sets up the bar.",
        badge: "Cocktail bar · Wine bar",
        heroTitleA: "Opening time triggers",
        heroTitleHighlight: "a spike",
        heroTitleB: "nobody has time to handle.",
        heroSubtitle:
          "Reservations, groups, private events — requests arrive in a burst right as the team is setting up the bar, not while they're serving.",
        ctaPrimary: "See how it works",
        ctaSecondary: "Explore AeviaInbox",
        painTitle: "The problem",
        painBody:
          "A cocktail or wine bar mixes walk-in traffic with reservations, usually in a small room. The spike in requests hits at the worst moment — right at opening, when one or two people are still setting up the bar and can't take calls or answer messages about whether a party of 8 can fit tonight. Accepting a booking without checking real capacity means overbooking a room with no slack.",
        painPoints: [
          "The call spike hits during bar setup, not during the quiet stretch",
          "A small room can't tolerate being overbooked on a given slot",
          "Younger customers often prefer WhatsApp or chat over a phone call",
        ],
        solutionTitle: "How Aevia handles it",
        solutionSubtitle: "A voice agent that checks real capacity before confirming, plus text channels for guests who'd rather message.",
        features: [
          {
            icon: "phone-ring",
            title: "The voice agent absorbs the opening spike",
            desc: "Several calls back to back at 7pm? Each one is handled while the team finishes setting up the bar.",
          },
          {
            icon: "calendar-check",
            title: "Capacity checked before every confirmation",
            desc: "The agent checks actual room available at the requested slot before confirming a group — a small room never gets overbooked.",
          },
          {
            icon: "message-circle",
            title: "WhatsApp and chat for those who'd rather text",
            desc: "Some guests book by message instead of calling — the same agent answers there with the same up-to-date information.",
          },
          {
            icon: "users",
            title: "Private-hire requests come to you",
            desc: "A private event or a custom request falls outside a standard booking and is routed to a human rather than guessed at automatically.",
          },
        ],
        dayTitle: "Friday opening, with Aevia",
        daySubtitle: "A realistic scenario, not a numbered promise.",
        daySteps: [
          { time: "7:05pm", text: "The bar just opened, the team is finishing setup. Two calls come in back to back." },
          { time: "7:05pm", text: "First: a table for 2 tonight — the agent checks availability and confirms directly." },
          { time: "7:06pm", text: "Second: a question about privatizing the space for a birthday next month — routed to the team instead of guessed at." },
          { time: "7:07pm", text: "A WhatsApp message follows, asking if a table of 8 works at 9pm — checked, confirmed." },
          { time: "7:08pm", text: "The team behind the bar didn't stop setup for any of the three." },
        ],
        ctaTitle: "Absorb the evening spike without overbooking the room",
        ctaBody: "Set up with your real capacity, your opening hours, and your channels — ready for the 7pm rush.",
        ctaButton: "Talk about your bar",
      },
    },
  },
];

export function getSolution(slug: string): SolutionEntry | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export function getSolutionCopy(slug: string, locale: string): SolutionCopy | undefined {
  const entry = getSolution(slug);
  if (!entry) return undefined;
  const loc = locale as Locale;
  return entry.copy[loc] ?? entry.copy.fr;
}

const BASE_URL = "https://aevia.services";
export const SOLUTIONS_LOCALES: Locale[] = ["fr", "en", "es", "de", "pt"];

/**
 * Metadata for a single solution page, shared between the page's
 * generateMetadata and the sitemap. Falls back to French copy for
 * locales that don't have a dedicated translation yet (es/de/pt).
 */
export function buildSolutionMetadata(slug: string, locale: string) {
  const copy = getSolutionCopy(slug, locale);
  if (!copy) return null;
  const loc = SOLUTIONS_LOCALES.includes(locale as Locale) ? locale : "fr";
  const url = `${BASE_URL}/${loc}/solutions/${slug}`;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    url,
    languages: Object.fromEntries(SOLUTIONS_LOCALES.map((l) => [l, `${BASE_URL}/${l}/solutions/${slug}`])),
  };
}
