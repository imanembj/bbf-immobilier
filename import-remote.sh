#!/bin/bash
# Upload et import sur Hostinger via SSH
scp insert-data-mysql.sql votre-user@votre-serveur.hostinger.com:~/
ssh votre-user@votre-serveur.hostinger.com "mysql -u u169114354_bbf_user -p'0lV2fqX^Z' u169114354_bbf_new < ~/insert-data-mysql.sql"
