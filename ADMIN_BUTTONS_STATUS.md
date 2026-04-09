# État des Boutons Admin - MySQL

## ✅ BIENS IMMOBILIERS

| Bouton | API Route | Fonction | Status |
|--------|-----------|----------|--------|
| Ajouter bien | `/api/properties` POST | `adminAPI.addProperty()` | ✅ OK |
| Modifier bien | `/api/properties/[id]` PATCH | `adminAPI.updateProperty()` | ✅ OK |
| Supprimer bien | `/api/properties/[id]` DELETE | `handleDeleteProperty()` | ✅ OK |
| Brouillon/Publier | `/api/properties/[id]` PATCH | `adminAPI.updateProperty()` | ✅ CORRIGÉ |
| Dupliquer bien | `/api/properties` POST | `adminAPI.addProperty()` | ✅ OK |

## ✅ MESSAGES

| Bouton | API Route | Fonction | Status |
|--------|-----------|----------|--------|
| Marquer comme lu | `/api/admin/messages` PATCH | `handleMarkMessageAsRead()` | ✅ OK |
| Marquer comme répondu | `/api/admin/messages` PATCH | `adminAPI.updateMessage()` | ✅ OK |

## ✅ AVIS CLIENTS

| Bouton | API Route | Fonction | Status |
|--------|-----------|----------|--------|
| Approuver/Rejeter | `/api/admin/reviews` PATCH | `adminAPI.updateReview()` | ✅ OK |
| Répondre | `/api/admin/reviews` PATCH | `adminAPI.updateReview()` | ✅ OK |
| Supprimer | `/api/admin/reviews` DELETE | `adminAPI.deleteReview()` | ✅ OK |

## ✅ PARTENAIRES

| Bouton | API Route | Fonction | Status |
|--------|-----------|----------|--------|
| Ajouter | `/api/partners` POST | `adminAPI.addPartner()` | ✅ OK |
| Modifier | `/api/partners` PATCH | `adminAPI.updatePartner()` | ✅ OK |
| Supprimer | `/api/partners` DELETE | `adminAPI.deletePartner()` | ✅ OK |
| Activer/Désactiver | `/api/partners` PATCH | `adminAPI.updatePartner()` | ✅ OK |
| Déplacer haut/bas | `/api/partners` PATCH | `adminAPI.updatePartner()` | ✅ OK |

## ✅ FAQs

| Bouton | API Route | Fonction | Status |
|--------|-----------|----------|--------|
| Ajouter | `/api/faqs` POST | `adminAPI.addFAQ()` | ✅ OK |
| Modifier | `/api/faqs` PATCH | `adminAPI.updateFAQ()` | ✅ OK |
| Supprimer | `/api/faqs` DELETE | `adminAPI.deleteFAQ()` | ✅ OK |
| Activer/Désactiver | `/api/faqs` PATCH | `adminAPI.updateFAQ()` | ✅ OK |
| Déplacer haut/bas | `/api/faqs` PATCH | `adminAPI.updateFAQ()` | ✅ OK |

## ✅ BLOG

| Bouton | API Route | Fonction | Status |
|--------|-----------|----------|--------|
| Ajouter article | `/api/admin/blog` POST | `adminAPI.addBlogPost()` | ✅ OK |
| Modifier article | `/api/admin/blog` PATCH | `adminAPI.updateBlogPost()` | ✅ OK |
| Supprimer article | `/api/admin/blog` DELETE | `adminAPI.deleteBlogPost()` | ✅ OK |
| Publier/Brouillon | `/api/admin/blog` PATCH | `adminAPI.updateBlogPost()` | ✅ OK |
| Épingler/Désépingler | `/api/admin/blog` PATCH | `adminAPI.updateBlogPost()` | ✅ CORRIGÉ |

## ✅ DEMANDES CLIENTS

| Bouton | API Route | Fonction | Status |
|--------|-----------|----------|--------|
| Changer statut | `/api/requests` PATCH | `adminAPI.updateClientRequest()` | ✅ OK |
| Supprimer | `/api/requests` DELETE | `adminAPI.deleteClientRequest()` | ✅ OK |

## ✅ PARAMÈTRES

| Bouton | API Route | Fonction | Status |
|--------|-----------|----------|--------|
| Changer mot de passe | `/api/admin/change-password` POST | Fetch direct | ✅ OK |
| Changer email | `/api/admin/change-email` POST | Fetch direct | ✅ OK |
| Sauvegarder agence | Local (agency-config) | `saveAgencyConfig()` | ✅ OK |

## 🔄 Tous les boutons :
- ✅ Ont `await loadData()` pour recharger les données
- ✅ Ont gestion d'erreur avec try/catch
- ✅ Affichent toast de succès/erreur
- ✅ Sauvegardent dans MySQL Hostinger
- ✅ Plus de localStorage

## 🚀 Prochaines étapes si problème :
1. Vider le cache navigateur (Cmd+Shift+R)
2. Vérifier dans phpMyAdmin que les données sont bien modifiées
3. Vérifier la console navigateur pour erreurs API
