const fs = require('fs');
const path = require('path');

const serviciosDir = path.join(__dirname, 'servicios');
const tratamientosDir = path.join(__dirname, 'tratamientos');

const serviciosHTML = `
                        <h3 class="text-2xl font-bold mt-10 mb-4 reveal">Abordaje Clínico Integral en el Hogar</h3>
                        <p class="text-base leading-relaxed mb-6 reveal" style="color:#7a7979;">
                            Como especialista en medicina interna y geriátrica en la región, ofrezco un protocolo médico resolutivo in situ. Evalúo y trato activamente <a href="../tratamientos/alzheimer-y-demencia-durango.html" class="font-bold text-[#8766aa] hover:underline">cuadros de Alzheimer y deterioro cognitivo avanzado</a>, diagnostico y prevengo de manera urgente problemas de <a href="../tratamientos/osteoporosis-fracturas-adultos-mayores.html" class="font-bold text-[#8766aa] hover:underline">osteoporosis severa para evitar fracturas tempranas</a>, y aplico esquemas de desprescripción resolviendo la peligrosa cruzada química de <a href="../tratamientos/polifarmacia-manejo-medicamentos-adultos-mayores.html" class="font-bold text-[#8766aa] hover:underline">polifarmacia en la tercera edad</a>.
                        </p>
`;

const tratamientosHTML = `
                        <p class="text-base font-medium leading-relaxed mt-10 p-5 glass rounded-2xl reveal border-l-4" style="border-color: #8766aa; color:#4e4d4d;">
                            <i data-lucide="info" class="inline mb-1" style="width:18px;height:18px;color:#8766aa;"></i> 
                            <strong>Consideración Geriátrica:</strong> Para este tipo de patología, evite trasladar innecesariamente a su familiar a salas de espera concurridas. Agende una <a href="../servicios/geriatra-a-domicilio-durango.html" class="font-bold text-[#8766aa] hover:underline">consulta geriátrica especializada a domicilio en Durango</a> para una evaluación precisa y en la seguridad de su hogar.
                        </p>
`;

function inject(dir, htmlBlock, isServicio) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    // Skip non-localised service pages for the specific LSI text since the text says "en la región"
    if (isServicio && (file === 'geriatra-a-domicilio-durango.html' || file === 'consulta-geriatrica-virtual.html')) return;

    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Make sure we haven't already injected it
    if (html.includes('Abordaje Clínico Integral en el Hogar') || html.includes('Consideración Geriátrica')) {
      return;
    }

    const targetRegex = /<\/div>\s*<\/div>\s*<!-- Sidebar: Autoridad -->/g;
    
    // Test if match exists before replacing
    if (targetRegex.test(html)) {
      html = html.replace(/<\/div>\s*<\/div>\s*<!-- Sidebar: Autoridad -->/g, `</div>${htmlBlock}                    </div>\n                    \n                    <!-- Sidebar: Autoridad -->`);
      fs.writeFileSync(filePath, html, 'utf8');
      console.log(`Injected in ${file}`);
    } else {
      console.log(`Target not found in ${file}`);
    }
  });
}

inject(serviciosDir, serviciosHTML, true);
inject(tratamientosDir, tratamientosHTML, false);
