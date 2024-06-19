# Gestione di un sistema di eventi

=============================================

Descrizione: Creare un'API per la gestione di un sistema di eventi. 
L'API deve gestire eventi, partecipanti e location. 
Ogni evento deve avere un nome, una descrizione, una data e un ID location. 
Ogni partecipante deve avere un nome, un'email e un ID evento.
Ogni location deve avere un ID, un nome ed un indirizzo.

=============================================


Endpoint richiesti: Events
-------------------------
1. GET /events
Recupera l'elenco di tutti gli eventi.
2. GET /events/
Recupera un singolo evento per ID.
3. POST /events
Aggiunge un nuovo evento. Richiede un corpo con name, description, date, e locationId.
4. PUT /events/
Aggiorna i dettagli di un evento esistente per ID.
5. DELETE /events/
Elimina un evento per ID.

Endpoint richiesti: Partecipants
-------------------------
1. GET /participants
Recupera l'elenco di tutti i partecipanti.
2. GET /participants/
Recupera un singolo partecipante per ID.
3. POST /participants
Aggiunge un nuovo partecipante. Richiede un corpo con name , email , e eventId .
4. PUT /participants/
Aggiorna i dettagli di un partecipante esistente per ID.
5. DELETE /participants/
Elimina un partecipante per ID.

Endpoint richiesti: Location
-------------------------
1. GET /locations
Recupera l'elenco di tutte le location.
2. GET /locations/
Recupera una singola location per ID.
3. POST /locations
Aggiunge una nuova location. Richiede un corpo con name e address .
4. PUT /locations/
Aggiorna i dettagli di una location esistente per ID.
5. DELETE /locations/
Elimina una location per ID.