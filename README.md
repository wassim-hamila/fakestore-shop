# fakestore.

Petite boutique en React qui consomme la [FakeStore API](https://fakestoreapi.com).

## Fonctionnalités

- Liste des produits (image, titre, prix, description, note)
- Filtre par catégorie
- Tri par prix ou par note
- Recherche par nom
- Panier avec quantités, sauvegardé dans le localStorage

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:5173

## Structure

```
src/
  api.js              appels à l'API
  hooks/              useProducts
  context/            panier (CartContext)
  components/         Header, Filters, ProductGrid, ProductCard, CartDrawer
```
