# HISTORY — Aevia Hub

> Format par entrée :
> - **Fait** : ce qui a changé + commit(s)
> - **Comment** : approche technique choisie + alternatives rejetées
> - **Pourquoi** : motivation (bug, demande utilisateur, dette technique)
> - **Erreurs commises** : ce que j'ai raté + correction (pour ne pas répéter)
>
> Appendre UNE entrée par session. Plan → Mock (si UI) → Valider → Exécuter.

---

## 2026-06-06

**Fait :**
- Hub rebrandé sky→aevia (liens produits : AeviaLaunch/Security/Inbox) · `660b9e7`
- Pages /projects + /templates (v0.1 obsolètes) supprimées · `cec137b`
- Mentions légales Aevia WS injectées (5 langues, page `/legal/mentions`) · `b947d64`
- Blog posts : build débloqué (backticks non échappés dans template literals) · `f5d8478`
- Nav : type `status` widened (`as "live" | "soon"`) → stop TS2367 · `f5d8478`
- Webchat widget repoointé onrender(mort)→inbox.aevia.services · `0ffd23c`
- "Sites web" retiré du nav dropdown (n'existe plus comme produit) · `9d208a1`
- Produits dropdown hover/click corrigé · `9d208a1`
- Forms 16px (`.ui-form-16`) + validation champs requis · `f7cbb29`
- .claude/CLAUDE.md créé (doc opérationnelle + skills workflow) · cette session

**Erreurs commises & corrections :**
- **Hub URL faux dans mémoire** : j'avais mémorisé `valentin-milliand.vercel.app` comme le hub — c'est le mode PORTFOLIO du même repo. Hub = `aevia.services`. Correction : MEMORY.md mis à jour.
- **Build cassé blog-posts.ts** : backticks non échappés dans des template literals (lignes 453/467/477) → `next build` échouait. Fix : caractères échappés.
- **~/portfolio délinké** : ce dossier partageait le Vercel project du hub — déployer depuis ~/portfolio aurait écrasé le hub. Correction : `.vercel/project.json` supprimé de ~/portfolio.
- **`de` locale** : déclarée dans le layout mais pas de dictionnaire `de.json` — doit être ajouté ou retiré de `generateStaticParams`.
