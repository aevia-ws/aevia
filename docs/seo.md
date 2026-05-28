# SEO — Documentation technique Aevia

> Dernière mise à jour : 2026-05-28
> Branch : `claude/aevia-seo-optimization-QOcvq`

## Objectif

Positionner Aevia et ses produits (AeviaLaunch, AeviaSecurity, AeviaInbox) dans les premiers résultats Google non-sponsorisés pour les requêtes liées à leurs cas d'usage, principalement sur le marché francophone PME/TPE.

---

## Mots-clés cibles par produit

### AeviaLaunch (builder site web IA)
| Requête | Intent | Priorité |
|---|---|---|
| créer site web PME | Commercial | Haute |
| builder site web IA | Commercial | Haute |
| générateur site web IA | Commercial | Haute |
| site vitrine professionnel | Commercial | Haute |
| landing page professionnelle | Commercial | Moyenne |
| créer site web en 7 jours | Commercial | Moyenne |
| template site web professionnel | Informationnel | Moyenne |

### AeviaSecurity (audit sécurité)
| Requête | Intent | Priorité |
|---|---|---|
| audit sécurité site web | Commercial | Haute |
| scanner vulnérabilités site web | Commercial | Haute |
| vérifier sécurité site web gratuit | Commercial | Haute |
| sécurité site web PME | Informationnel | Moyenne |
| rapport sécurité site web | Informationnel | Moyenne |
| headers HTTP sécurité | Informationnel | Basse |

### AeviaInbox (CRM multi-canal)
| Requête | Intent | Priorité |
|---|---|---|
| CRM PME WhatsApp | Commercial | Haute |
| inbox unifié WhatsApp Instagram email | Commercial | Haute |
| centraliser messages clients | Commercial | Haute |
| réponses automatiques WhatsApp PME | Commercial | Moyenne |
| gestion client multi-canal | Informationnel | Moyenne |
| IA support client PME | Informationnel | Moyenne |

---

## Ce qui a été implémenté (Mai 2026)

### 1. Sitemap (`app/sitemap.ts`)

**Avant** : 4 URLs statiques.
**Après** : 40+ URLs dynamiques couvrant tout le contenu indexable.

Structure :
```
/ /projects /about /contact                    → pages racine
/projects/[slug] × 7 projets                  → pages produit individuelles
/fr /en /es /de /pt                            → homepages localisées
/[locale]/templates × 5 locales               → page templates
/fr/blog                                       → listing blog (FR uniquement)
/fr/blog/[slug] × 11 articles                 → articles avec date réelle
```

Règle de priorisation :
- `/fr` → priority `0.98` (locale principale)
- `/projects/[slug]` → priority `0.85`
- `/[locale]` autres → priority `0.88`
- Blog → priority `0.72` avec `lastModified` = date de l'article

Blog indexé en français uniquement car le contenu n'est pas traduit — évite le contenu dupliqué multi-langue.

---

### 2. Metadata globale (`app/layout.tsx`)

**Titre par défaut** : `Aevia — Outils digitaux pour TPE/PME | Site web, Sécurité, CRM`

**Keywords ajoutés** : `créer site web PME`, `builder site web IA`, `audit sécurité site web`, `CRM multi-canal PME`, `inbox WhatsApp Instagram`, `outils digitaux entreprise`, `AeviaLaunch`, `AeviaSecurity`, `AeviaInbox`

**Robots amélioré** :
```typescript
googleBot: {
  index: true,
  follow: true,
  "max-video-preview": -1,
  "max-image-preview": "large",
  "max-snippet": -1,
}
```

**Hreflang racine** :
```typescript
alternates.languages = {
  fr: "https://valentin-milliand.vercel.app/fr",
  en: "https://valentin-milliand.vercel.app/en",
  ...
  "x-default": "https://valentin-milliand.vercel.app/fr",
}
```

**OG locale** : `fr_FR` (principale) avec `alternateLocale: ["en_US", "es_ES", "de_DE", "pt_BR"]`

---

### 3. Metadata par locale (`app/[locale]/layout.tsx`)

Chaque langue a maintenant son propre titre, description et mots-clés :

| Locale | Titre | Mots-clés principaux |
|---|---|---|
| `fr` | Aevia — Outils digitaux pour TPE/PME | créer site web PME, audit sécurité, CRM PME WhatsApp |
| `en` | Aevia — Digital Tools for Small Business | AI website builder, website security audit, WhatsApp CRM |
| `es` | Aevia — Herramientas Digitales para PYMES | crear sitio web empresa, auditoría seguridad web |
| `de` | Aevia — Digitale Tools für KMU | Website erstellen KMU, Sicherheitsaudit Website |
| `pt` | Aevia — Ferramentas Digitais para PMEs | criar site empresa, auditoria segurança site |

Hreflang injecté dynamiquement sur chaque page locale :
```typescript
alternates.languages = { fr: "…/fr", en: "…/en", …, "x-default": "…/fr" }
```

---

### 4. Pages projet — metadata dynamique (`app/projects/[slug]/page.tsx`)

`generateMetadata` retourne pour chaque projet :
- **Title** : `{project.title} — {project.tagline}`
- **Description** : `project.description`
- **Keywords** : `[project.title, ...project.tags, project.category]`
- **OG image** : premier screenshot du projet (ou `/og.png` en fallback)
- **Canonical** : `/projects/{slug}`

---

### 5. Blog — metadata par section et par article

**`app/[locale]/blog/layout.tsx`** (nouveau)
- Titre et description traduits par locale
- Canonical pointant sur `/fr/blog` (contenu en français)
- Hreflang pour toutes les langues

**`app/[locale]/blog/[slug]/layout.tsx`** (nouveau)
- `generateMetadata` avec title = `post.title`, description = `post.excerpt`
- `og:type: "article"` avec `publishedTime` et `section`
- Canonical toujours sur `/fr/blog/{slug}` (évite la duplication multi-locale)

---

### 6. Structured Data (JSON-LD)

Cinq schemas injectés dans `<head>` ou inline selon la page :

#### `Person` (root layout)
```json
{ "@type": "Person", "name": "Valentin Milliand", "jobTitle": "Full Stack Engineer & AI Builder" }
```

#### `Organization` (root layout)
```json
{
  "@type": "Organization",
  "name": "Aevia",
  "hasOfferCatalog": {
    "itemListElement": [
      { "itemOffered": { "@type": "SoftwareApplication", "name": "AeviaLaunch" } },
      { "itemOffered": { "@type": "SoftwareApplication", "name": "AeviaSecurity" } },
      { "itemOffered": { "@type": "SoftwareApplication", "name": "AeviaInbox" } }
    ]
  }
}
```

#### `WebSite` (root layout)
```json
{ "@type": "WebSite", "potentialAction": { "@type": "SearchAction" } }
```

#### `SoftwareApplication` (pages projet)
Par projet : `name`, `description`, `applicationCategory`, `featureList`, `offers`, `creator`.

#### `Article` (articles de blog)
Par article : `headline`, `datePublished`, `author`, `publisher`, `articleSection`, `timeRequired`.

---

## Ce qui reste à faire (off-site)

### Priorité 1 — Google Search Console
1. Vérifier la propriété du site
2. Soumettre `https://valentin-milliand.vercel.app/sitemap.xml`
3. Surveiller les erreurs de couverture et les impressions par requête

### Priorité 2 — Domaine personnalisé
Passer de `valentin-milliand.vercel.app` à `aevia.io` ou `aevia.fr` :
- L'URL impacte directement le CTR en SERP (un `.fr` inspire confiance au marché FR)
- Configurer les redirects 301 depuis l'ancienne URL
- Mettre à jour `metadataBase` dans `app/layout.tsx` et toutes les URLs hardcodées

### Priorité 3 — Backlinks (authority)
- Soumettre sur **Product Hunt** pour AeviaLaunch et AeviaSecurity
- Inscription sur **BetaList**, **Indie Hackers**
- Annuaires SaaS FR : **SaaS Maniak**, **Toolbox France**, **DigitalActu**
- Articles invités ou mentions dans la presse tech FR (BDM, FrenchWeb)

### Priorité 4 — Google My Business
Créer une fiche Google Business Profile pour apparaître dans le "Pack Local" sur les requêtes géolocalisées.

### Priorité 5 — Contenu blog (longue traîne)
Continuer à publier des articles ciblant des requêtes longue traîne avec fort intent commercial :
- "comment créer un site vitrine pour restaurant"
- "audit sécurité wordpress gratuit"
- "WhatsApp business automatisation réponses"
- "CRM gratuit petite entreprise"

### Priorité 6 — Core Web Vitals
Surveiller les scores Lighthouse sur mobile (cible : LCP < 2.5s, CLS < 0.1, INP < 200ms).
Optimiser les images au format AVIF/WebP si ce n'est pas déjà fait.

---

## Fichiers modifiés

| Fichier | Nature | Impact SEO |
|---|---|---|
| `app/sitemap.ts` | Modifié | Découvrabilité de toutes les pages |
| `app/layout.tsx` | Modifié | Keywords, Organization schema, WebSite schema |
| `app/[locale]/layout.tsx` | Modifié | Hreflang, metadata localisée × 5 langues |
| `app/projects/[slug]/page.tsx` | Modifié | Metadata dynamique + SoftwareApplication schema |
| `app/[locale]/blog/layout.tsx` | Créé | Metadata section blog |
| `app/[locale]/blog/[slug]/layout.tsx` | Créé | Metadata article + Article schema |
