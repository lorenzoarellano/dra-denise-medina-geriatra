const fs = require('fs');
const path = require('path');

const directoris = [
  path.join(__dirname, 'servicios'),
  path.join(__dirname, 'tratamientos')
];

const eeatProps = {
  "sameAs": [
    "https://www.facebook.com/geriatria.durango"
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Universidad Nacional Autónoma de México (UNAM)"
  },
  "identifier": {
     "@type": "PropertyValue",
     "propertyID": "COFEPRIS",
     "value": "2610012002A00010"
  },
  "knowsAbout": [
    "Geriatría", "Alzheimer", "Demencia", "Polifarmacia", "Síndromes Geriátricos", "Cuidados Paliativos"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Gómez Palacio 502 Oriente, Zona Centro",
    "addressLocality": "Victoria de Durango",
    "addressRegion": "Dgo.",
    "postalCode": "34000",
    "addressCountry": "MX"
  }
};

directoris.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Find JSON-LD block
    // Buscamos el bloque que puede estar al inicio.
    const regex = /<script type="application\/ld\+json">\s*({[\s\S]*?})\s*<\/script>/;
    const match = html.match(regex);
    
    if (match) {
      try {
        const json = JSON.parse(match[1]);
        if (json['@graph']) {
          let updated = false;
          json['@graph'] = json['@graph'].map(item => {
            if (item['@type'] === 'Physician') {
              updated = true;
              return { ...item, ...eeatProps };
            }
            return item;
          });
          
          if (updated) {
            const newJsonStr = JSON.stringify(json, null, 2);
            html = html.replace(match[0], `<script type="application/ld+json">\n    ${newJsonStr}\n    </script>`);
            fs.writeFileSync(filePath, html, 'utf8');
            console.log(`Updated ${file}`);
          }
        }
      } catch (e) {
        console.error(`Error parsing JSON in ${file}: ` + e.message);
      }
    }
  });
});
