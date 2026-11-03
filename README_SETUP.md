# Vega am Handy – Einrichtung (kostenlos)

Diese Version funktioniert **zweifach**:
- **Am PC über Vega.exe**: alles wie bisher (die exe liefert die Seite aus, Speichern läuft über die exe).
- **Im Browser / am Handy**: Vega liest und schreibt direkt in deinem Google Drive (Ordner `Breachpoint/Vega`), ohne dass der PC laufen muss.

Du brauchst einmalig ca. 20–30 Minuten. Alles ist kostenlos, keine Kreditkarte nötig.

---

## Schritt 1: Seite online stellen (GitHub Pages)

1. Auf https://github.com ein kostenloses Konto anlegen (falls noch nicht vorhanden).
2. Oben rechts **„+“ → „New repository“**. Name z. B. `vega`. **Public** auswählen. „Create repository“.
3. Auf der neuen Seite **„uploading an existing file“** anklicken und den **Inhalt** des Ordners `vega-pwa` hineinziehen
   (`index.html`, `manifest.webmanifest`, `service-worker.js`, Ordner `icons`). „Commit changes“.
4. Im Repository **Settings → Pages**: bei „Branch“ `main` und `/ (root)` wählen → **Save**.
5. Nach 1–2 Minuten steht oben die Adresse, z. B. `https://DEINNAME.github.io/vega/`. **Diese Adresse notieren.**

> Hinweis: Das Repository ist öffentlich. Darin stehen **keine** API-Keys und **keine** Daten von dir –
> die bleiben in deinem Browser bzw. in deinem Drive. Die Google-Client-ID ist kein Geheimnis.

## Schritt 2: Google-Zugang anlegen (Google Cloud, kostenlos)

1. https://console.cloud.google.com öffnen, mit deinem Google-Konto anmelden (dem, dem das Drive gehört).
2. Oben **Projekt auswählen → „Neues Projekt“**, Name `Vega` → Erstellen.
3. Menü **„APIs & Dienste“ → „Bibliothek“** → nach **„Google Drive API“** suchen → **Aktivieren**.
4. **„APIs & Dienste“ → „OAuth-Zustimmungsbildschirm“** (heißt evtl. „Google Auth Platform“):
   - Nutzertyp **Extern**, App-Name `Vega`, deine E-Mail eintragen → speichern.
   - Bei **„Testnutzer“ / „Zielgruppe“** deine eigene Gmail-Adresse hinzufügen.
   - Status **„Test“** lassen – veröffentlichen ist nicht nötig.
5. **„APIs & Dienste“ → „Anmeldedaten“ → „Anmeldedaten erstellen“ → „OAuth-Client-ID“**:
   - Anwendungstyp: **Webanwendung**
   - **Autorisierte JavaScript-Quellen**: `https://DEINNAME.github.io` (nur der Anfang, ohne `/vega/` und ohne `/` am Ende)
   - Weiterleitungs-URIs: leer lassen → Erstellen.
6. Die angezeigte **Client-ID** kopieren (sieht aus wie `1234-abc….apps.googleusercontent.com`).

## Schritt 3: Client-ID eintragen

1. Auf GitHub im Repository `index.html` öffnen → Stift-Symbol (bearbeiten).
2. Mit Strg+F nach `GOOGLE_CLIENT_ID` suchen. Die Zeile lautet:
   `const GOOGLE_CLIENT_ID = 'HIER_DEINE_CLIENT_ID.apps.googleusercontent.com';`
3. Den Text zwischen den Hochkommas durch deine Client-ID ersetzen → „Commit changes“.
4. 1–2 Minuten warten, bis GitHub Pages aktualisiert ist.

## Schritt 4: Am Handy installieren (Android)

1. In **Chrome** die Adresse `https://DEINNAME.github.io/vega/` öffnen.
2. Menü (⋮) → **„Zum Startbildschirm hinzufügen“** bzw. **„App installieren“**.
3. Vega über das neue Icon starten.
4. Links oben **☰** → **„🔐 Mit Google verbinden“** → Google-Konto wählen.
   Es erscheint die Warnung **„Google hat diese App nicht überprüft“** – das ist normal bei eigenen Apps:
   **„Erweitert“ → „Weiter zu Vega (unsicher)“** → Zugriff auf Drive erlauben.
5. Vega lädt jetzt Gedächtnis und Wissen aus `Breachpoint/Vega`.
6. **API-Keys** (Gemini, Groq, OpenRouter) einmal über „🔑 API-Key Einrichten“ eintragen – sie werden nur in diesem Browser gespeichert.

Am PC geht das genauso (Chrome/Edge → Adresse öffnen → Installieren-Symbol in der Adressleiste).

## Gut zu wissen

- Die Google-Anmeldung gilt jeweils ca. **1 Stunde**. Danach steht oben wieder „Nicht mit Google verbunden“ –
  einfach erneut auf **„Mit Google verbinden“** tippen (meist ohne erneute Passwortabfrage).
- Der Ordner `Breachpoint` muss **direkt in „Meine Ablage“** liegen, darin der Ordner `Vega`.
- Das Laden am Handy dauert beim ersten Mal länger (jede Datei wird einzeln aus Drive geholt). Mobil werden max. 8 Mio. Zeichen Text vorab geladen.
- Die Vega.exe am PC kann parallel weiterlaufen und benutzt dieselben Dateien. Nicht gleichzeitig an beiden Geräten schreiben – sonst gewinnt das zuletzt gespeicherte.
- Abmelden: Knopf **⏏** neben „Mit Google verbinden“.
