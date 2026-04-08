#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de conversion des propriétés de PostgreSQL/Supabase vers MySQL
"""

import csv
import sys

# Augmenter la limite de taille des champs CSV
csv.field_size_limit(sys.maxsize)

def escape_sql(value):
    """Échappe les apostrophes pour SQL"""
    if value is None or value == '':
        return 'NULL'
    return "'" + str(value).replace("'", "''").replace("\\", "\\\\") + "'"

def convert_array_to_json(value):
    """Convertit un array PostgreSQL en JSON MySQL"""
    if not value or value == '':
        return 'NULL'
    # Le CSV contient déjà le format JSON array
    return escape_sql(value)

def convert_boolean(value):
    """Convertit un booléen"""
    if value == 'true' or value == '1':
        return 'true'
    elif value == 'false' or value == '0':
        return 'false'
    return 'NULL'

def main():
    input_file = '/Users/mandioukouate/Downloads/properties_rows.csv'
    output_file = '/Users/mandioukouate/Desktop/Dossier Imane Code/Bulle immobilière/properties_insert.sql'
    
    print("🔄 Lecture du fichier CSV...")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    
    print(f"✅ {len(rows)} propriétés trouvées")
    print("🔄 Conversion en cours...")
    
    # Créer le fichier SQL
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("-- ================================================\n")
        f.write("-- INSERTION DES PROPRIÉTÉS\n")
        f.write(f"-- Nombre de propriétés: {len(rows)}\n")
        f.write("-- ================================================\n\n")
        
        f.write("INSERT INTO properties (id, type, title, location, price, period, description, beds, baths, area, guests, images, features, amenities, available, created_at, updated_at, rooms, video_url, virtual_tour_url, status, featured, detailed_description, environment, rules, rental_conditions, purchase_conditions, fees, legal_info, pricing_info) VALUES\n")
        
        for i, row in enumerate(rows):
            # Construire les valeurs
            values = [
                escape_sql(row['id']),
                escape_sql(row['type']),
                escape_sql(row['title']),
                escape_sql(row['location']),
                escape_sql(row['price']),
                escape_sql(row['period']),
                escape_sql(row['description']),
                row['beds'] if row['beds'] else 'NULL',
                row['baths'] if row['baths'] else 'NULL',
                escape_sql(row['area']),
                row['guests'] if row['guests'] else 'NULL',
                convert_array_to_json(row['images']),
                convert_array_to_json(row['features']),
                convert_array_to_json(row['amenities']),
                convert_boolean(row['available']),
                escape_sql(row['created_at']),
                escape_sql(row['updated_at']),
                row['rooms'] if row['rooms'] else 'NULL',
                escape_sql(row['video_url']),
                escape_sql(row['virtual_tour_url']),
                escape_sql(row['status']),
                convert_boolean(row['featured']),
                escape_sql(row['detailed_description']),
                escape_sql(row['environment']),
                escape_sql(row['rules']),
                escape_sql(row['rental_conditions']),
                escape_sql(row['purchase_conditions']),
                escape_sql(row['fees']),
                escape_sql(row['legal_info']),
                escape_sql(row['pricing_info'])
            ]
            
            line = "(" + ", ".join(values) + ")"
            
            # Ajouter une virgule sauf pour la dernière ligne
            if i < len(rows) - 1:
                line += ","
            else:
                line += ";"
            
            f.write(line + "\n")
        
        f.write("\n-- Fin de l'insertion des propriétés\n")
    
    print(f"✅ Conversion terminée!")
    print(f"📄 Fichier créé: {output_file}")
    print(f"📊 Taille approximative: {len(rows)} lignes")

if __name__ == "__main__":
    main()
