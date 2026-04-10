-- Ajouter la colonne google_calendar_url pour les locations saisonnières
ALTER TABLE properties 
ADD COLUMN google_calendar_url VARCHAR(1000) NULL AFTER virtual_tour_url;

-- Vérifier que la colonne a été ajoutée
DESCRIBE properties;
