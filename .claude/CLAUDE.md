# CLAUDE.md — Aevia Hub

## Deploy
```bash
export VERCEL_API_TOKEN=$(grep '^VERCEL_API_TOKEN=' ~/skybot-inbox/.env | cut -d= -f2)
npx vercel --prod --yes --token "$VERCEL_API_TOKEN"
```
Live URL: **aevia.services/fr** — vérifier : `curl -sI https://aevia.services/fr | head -2`

> ⚠️ push GitHub ≠ live. Deploy TOUJOURS manuellement.

## Architecture
- Next 16 + next-intl · 5 locales : `fr/en/es/pt/de`
- Routes : `app/[locale]/*` (hub) + `app/page.tsx` (portfolio mode — même repo, mode switché par host)
- Vercel project : `aevia` (prj_l0Nuok…)
- `~/aevia` et `valentin-milliand.vercel.app` partagent le même projet — déployer ici met à jour les deux.

## Fichiers clés
- `app/[locale]/layout.tsx` — root layout, provider next-intl
- `app/[locale]/page.tsx` — landing hub
- `app/[locale]/legal/mentions/page.tsx` — mentions légales Aevia WS
- `components/Nav.tsx` — navigation produits (Produits dropdown)
- `messages/fr.json` etc — traductions (5 fichiers)

## i18n
- next-intl, locale dans l'URL
- Toujours modifier les 5 fichiers `messages/*.json` en parallèle
- `generateStaticParams` requiert `locales: ['fr','en','es','pt','de']` dans `lib/i18n.ts`

## Règles métier
- **Aevia WS** — auto-entrepreneur, SIREN 852 546 225, valentinmilliand@aevia.services
- Adresse perso **JAMAIS affichée** : "Adresse communiquée sur demande à valentinmilliand@aevia.services"
- Produits exposés dans le hub : Launch, Security, Inbox (pas les autres — archivés)
- Aucune URL avec "sky" dans le copy front

## Pièges connus
- `~/aevia` n'a pas de `node_modules` en local — `npm install` tourne sur deploy Vercel, pas en local
- `package.json name` = "portfolio" (legacy, ne pas changer)
- `app/page.tsx` + `app/about` = pages portfolio-mode (legacy, coexistent avec `app/[locale]`)

## Skills & Workflow Claude Code

### Protocole de session (obligatoire)
```
1. /context          → rappel contexte + mémoire active
2. /writing-plans    → rédiger le plan + mockup UI si besoin → ATTENDRE VALIDATION
3. /executing-plans  → exécuter seulement après validation du plan
4. /code-review      → review avant commit
5. /security-review  → vérifier : aucun secret / adresse / donnée perso exposée
6. /verification-before-completion → curl live avant de dire "done"
7. /using-superpowers → agents parallèles pour gros chantiers multi-fichiers
8. /writing-skills   → documentation propre si nouveau pattern introduit
```

### Règle des plans
- Pour toute tâche > 1 fichier modifié : écrire le plan **en texte d'abord** (quoi, comment, fichiers touchés)
- Pour tout changement UI : fournir un **mockup ASCII ou description visuelle** avant de coder
- Ne commencer l'implémentation qu'après **validation explicite** de l'utilisateur

### Règle de fin de session
Appendre dans `.claude/HISTORY.md` (format : Fait / Comment / Pourquoi / Erreurs commises) :
- Ce qui a été fait (commit + URL curl-vérifiée)
- Comment c'était implémenté (approche choisie + alternatives rejetées)
- Erreurs commises + correction (pour ne pas répéter)
