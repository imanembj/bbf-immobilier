-- Migration: Augmenter la taille de cover_image pour supporter les images base64
-- À exécuter dans phpMyAdmin Hostinger

ALTER TABLE blog_posts 
MODIFY COLUMN cover_image MEDIUMTEXT NOT NULL;

-- Vérifier la modification
DESCRIBE blog_posts;
