const fs = require('fs');
const path = require('path');

const root = 'c:\\projects\\dra-deniseMedina';
const srcFile = path.join(root, 'tratamientos', 'alzheimer-y-demencia-durango.html');

if (!fs.existsSync(srcFile)) {
    console.error("Missing source file");
    process.exit(1);
}

// Read the perfectly formatted alzheimer page as a template
const template = fs.readFileSync(srcFile, 'utf8');

// We need to swap out:
// 1. <title> y meta tags
// 2. <script type="application/ld+json"> ... </script>
// 3. <article> ... </article> inside <main>
const headStart = template.indexOf('<meta name="description"');
const headEnd = template.indexOf('</script>', template.indexOf('<script type="application/ld+json"')) + 9;

const articleStart = template.indexOf('<article>');
const articleEnd = template.indexOf('</article>') + 10;

// Factory function
function buildPage(destPath, metaData, jsonLdData, articleHtml) {
    let newHtml = template
        .replace(template.substring(headStart, headEnd), metaData + '\n\n    ' + jsonLdData)
        .replace(template.substring(articleStart, articleEnd), articleHtml);
        
    fs.writeFileSync(path.join(root, destPath), newHtml, 'utf8');
    console.log("Built: " + destPath);
}

// ============================================
// DEPRESIÓN GERIÁTRICA
// ============================================
const depMeta = `    <meta name="description" content="Tratamiento de la depresión geriátrica en Durango. Diferenciamos entre deterioro neurológico y estado de ánimo sistémico con la Dra. Denise Medina.">
    <meta name="keywords" content="depresion geriatrica durango, apatia adultos mayores, trsiteza ansianos, geriatra durango salud mental, evaluacion psicoafectiva">
    <meta name="author" content="Dra. Denise Medina Peralta">
    <meta name="robots" content="index, follow">
    <title>Depresión Geriátrica y Salud Mental en Adultos Mayores | Dra. Denise Medina</title>

    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Dra. Denise Medina Peralta | Geriatra Durango">
    <meta property="og:url" content="https://dradenisemedina.com/tratamientos/depresion-geriatrica-durango">
    <meta property="og:title" content="Tratamiento de la Depresión Geriátrica en Durango">
    <meta property="og:description" content="Manejo clínico del estado anímico en el adulto mayor. Abordaje sin sobre-medicación ni sedantes innecesarios.">
    <meta property="og:image" content="https://dradenisemedina.com/assets/images/social-share-cover.jpg">
    <meta property="og:locale" content="es_MX">
    <link rel="canonical" href="https://dradenisemedina.com/tratamientos/depresion-geriatrica-durango">
    <link rel="icon" href="../assets/images/favicon.ico" type="image/x-icon">`;

const depJson = `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MedicalCondition",
          "@id": "https://dradenisemedina.com/tratamientos/depresion-geriatrica-durango#condition",
          "name": "Depresión Geriátrica",
          "description": "Trastorno psicoafectivo clínico en adultos mayores caracterizado por apatía profunda, que a menudo se subdiagnostica al confundirse con los primeros síntomas de demencia (pseudodemencia depresiva).",
          "signOrSymptom": [
            "Apatía total o pérdida de interés en cosas que antes disfrutaban",
            "Dificultades repentinas de memoria asociadas a falta de atención",
            "Quejas somáticas constantes (mucho dolor físico que en realidad es de origen emocional)",
            "Aislamiento social y negativa a levantarse de la cama"
          ],
          "possibleTreatment": [
            {
              "@type": "MedicalTherapy",
              "name": "Manejo Farmacológico Geriátrico Seguro",
              "description": "Uso de antidepresivos muy específicos para el hígado adulto, evitando totalmente los tricíclicos (que provocan arritmias y caídas) más intervención social-familiar."
            }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "¿Es normal que los abuelos estén deprimidos o aislados?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutamente no. La depresión y la tristeza crónica no son una etapa normal del envejecimiento. La apatía profunda es un problema clínico severo que responde a falta de neurotransmisores, y si no es atendida degrada la masa muscular y el sistema inmune."
              }
            },
            {
              "@type": "Question",
              "name": "¿Mi familiar tiene Alzheimer o depresión?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Existe un síndrome conocido como Pseudodemencia Depresiva: el nivel de depresión es tan bajo que el adulto no presta atención a su entorno y olvida todo, simulando una demencia temporal. El geriatra es quien aplica pruebas neurocognitivas (MOCA, Minimental) para diferenciar y tratar la causa de raíz."
              }
            }
          ]
        }
      ]
    }
    </script>`;

const depArticle = `        <article>
            <section class="page-hero">
                <div class="orb orb-1"></div>
                <div class="orb orb-2"></div>
                <div class="w-full max-w-7xl mx-auto px-6 lg:px-10">
                    <div class="max-w-3xl">
                        <div class="section-tag reveal">
                            <i data-lucide="flower" style="width:13px;height:13px;"></i> Salud Psicoafectiva
                        </div>
                        <h1 class="text-4xl lg:text-5xl font-bold leading-tight mb-5 reveal" style="color:#4e4d4d; letter-spacing:-0.03em;">
                            Tratamiento de la <span class="gradient-text">Depresión Geriátrica</span>
                        </h1>
                        <p class="text-base lg:text-xl font-medium leading-relaxed mb-6 reveal" style="color:#4e4d4d;">
                            Estar eternamente aislado, amargado o apático <strong>no es un proceso natural del envejecimiento.</strong> A menudo, lo que las familias confunden con "carácter de anciano" o "principios de Alzheimer", es en realidad un trastorno clínico de depresión profunda que mina la salud cognitiva, pero que es altamenteb tratable y reversible bajo los fármacos geriátricos modernos indicados.
                        </p>
                        <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-sm reveal" style="color:#7a7979;">
                            <a href="../index.html" style="color:#8766aa;" class="hover:underline">Inicio</a>
                            <i data-lucide="chevron-right" style="width:14px;height:14px;color:#a88bc5;"></i>
                            <a href="../servicios.html" style="color:#8766aa;" class="hover:underline">Servicios</a>
                            <i data-lucide="chevron-right" style="width:14px;height:14px;color:#a88bc5;"></i>
                            <span style="color:#4e4d4d;font-weight:600;">Depresión Geriátrica</span>
                        </nav>
                    </div>
                </div>
            </section>

            <section class="py-20">
                <div class="w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
                    <div class="lg:col-span-8 space-y-6">
                        <h2 class="text-3xl font-bold mb-4 reveal" style="color:#4e4d4d;">El Falso Diagnóstico de Demencia</h2>
                        <p class="text-base leading-relaxed reveal" style="color:#7a7979;">
                            La queja principal en mi consulta suele ser: "Doctora, mi padre está perdiendo la memoria, creemos que es Alzheimer". Sin embargo, tras aplicar reactivos neurocognitivos especializados, descubrimos que el paciente no carece de capacidad estructural cerebral, lo que tiene es <strong>falta absoluta de atención e interés</strong> provocados por una neblina depresiva clínica profunda, padecimiento categorizado en la medicina como la "pseudodemencia depresiva".
                        </p>
                        
                        <h3 class="text-2xl font-bold mt-10 mb-4 reveal" style="color:#4e4d4d;">Síntomas Atípicos en la Tercera Edad</h3>
                        <ul class="space-y-3 reveal">
                            <li class="flex items-start gap-4 glass p-5 rounded-2xl">
                                <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-white text-[#8766aa] shadow"><i data-lucide="frown" style="width:20px;height:20px;"></i></div>
                                <div>
                                    <span class="block text-base font-bold mb-1" style="color:#4e4d4d;">Quejas Somáticas (Me duele todo)</span>
                                    <span class="text-sm font-medium" style="color:#7a7979;">El adulto mayor rara vez dice "me siento triste". Su forma principal de manifestar la angustia depresiva es creando dolores de cuerpo migratorios (psicosomatización).</span>
                                </div>
                            </li>
                            <li class="flex items-start gap-4 glass p-5 rounded-2xl">
                                <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-white text-[#8766aa] shadow"><i data-lucide="moon" style="width:20px;height:20px;"></i></div>
                                <div>
                                    <span class="block text-base font-bold mb-1" style="color:#4e4d4d;">Negativa a participar (Apatía Geriátrica)</span>
                                    <span class="text-sm font-medium" style="color:#7a7979;">Pérdida dramática de disfrute. Incluso rechazan a sus nietos o actividades de iglesia que antes adoraban realizar por décadas.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <aside class="lg:col-span-4 mt-10 lg:mt-0">
                        <div class="glass-card rounded-3xl p-8 sticky top-32 reveal border-t-4" style="border-top-color:#8766aa;">
                            <h4 class="font-bold text-xl mb-3 flex items-center gap-2" style="color:#4e4d4d;">
                                <i data-lucide="shield-alert"></i> Cuidado con Antidepresivos Tóxicos
                            </h4>
                            <p class="text-sm leading-relaxed mb-4" style="color:#7a7979;">
                                Muchos adultos terminan aún peor diagnosticados porque un médico no especializado les prescribe medicamentos como **Fluoxetina** antigua o **Amitriptilina**. 
                            </p>
                            <p class="text-sm leading-relaxed" style="color:#7a7979;">
                                Estos medicamentos en el fenotipo adulto mayor causan <strong>hiponatremia (bajo sodio fatal) o taquicardias severas</strong>. Un geriatra sabe qué moléculas ISRS usar para proteger el corazón del abuelo.
                            </p>
                        </div>
                    </aside>
                </div>
            </section>
        </article>`;

buildPage('tratamientos/depresion-geriatrica-durango.html', depMeta, depJson, depArticle);


// ============================================
// INSOMNIO MAYORES
// ============================================
const insMeta = `    <meta name="description" content="Tratamiento del Insomnio en adultos mayores en Durango. Eliminamos el uso de Clonazepam y mejoramos la arquitectura del sueño. Dra Denise Medina.">
    <meta name="keywords" content="insomnio adultos mayores, clonazepam en geriatria, no puedo dormir anciano, problemas de sueño durango, pastillas para dormir mayores">
    <meta name="author" content="Dra. Denise Medina Peralta">
    <meta name="robots" content="index, follow">
    <title>Insomnio en el Adulto Mayor y Desprescripción Segura | Dra. Denise Medina</title>

    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Dra. Denise Medina Peralta | Geriatra Durango">
    <meta property="og:url" content="https://dradenisemedina.com/tratamientos/insomnio-adultos-mayores">
    <meta property="og:title" content="Insomnio y Problemas de Sueño en el Adulto Mayor">
    <meta property="og:description" content="Manejo del sueño y des-prescripción de Benzodiacepinas. Soluciones geriátricas sin riesgo de caídas ni pérdida de memoria.">
    <meta property="og:image" content="https://dradenisemedina.com/assets/images/social-share-cover.jpg">
    <meta property="og:locale" content="es_MX">
    <link rel="canonical" href="https://dradenisemedina.com/tratamientos/insomnio-adultos-mayores">
    <link rel="icon" href="../assets/images/favicon.ico" type="image/x-icon">`;

const insJson = `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MedicalCondition",
          "@id": "https://dradenisemedina.com/tratamientos/insomnio-adultos-mayores#condition",
          "name": "Insomnio Geriátrico",
          "description": "Alteración de la arquitectura natural del ciclo circadiano. A menudo agravada drásticamente en adultos mayores por el uso irresponsable de pastillas inductoras que rompen el REM o causan dependencia severa.",
          "signOrSymptom": [
            "Despertar temprano sin capacidad de reanudar sueño",
            "Fragmentación del sueño (despertares a orinar, pero sin reincorporarse al ciclo)",
            "Somnolencia diurna excesiva a pesar de haber 'dormido'"
          ],
          "possibleTreatment": [
            {
              "@type": "MedicalTherapy",
              "name": "Higiene del Sueño y Desprescripción Benzodiacepínica",
              "description": "Retiro paulatino ('Tapering') de medicamentos zombificadores (como el clonazepam) sustituyendos con melatonina de liberación prolongada o medicamentos duales ultra seguros para el sistema nervioso mayor."
            }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "¿Por que las pastillas para dormir le hacen daño a mi abuelo?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Los inductores del sueño fuertes (Clonazepam, Alprazolam) son el peor enemigo del hígado lento y la salud cognitiva. En el adulto mayor la pastilla 'tarda mucho en salir de la sangre'. Consecuencia clínica drástica: el paciente se levanta a orinar a la madrugada sedado, pierde el equilibrio de sus piernas y colapsa, resultando en trauma cráneo encefalico profundo del cual muy pocos se pueden recuperar."
              }
            }
          ]
        }
      ]
    }
    </script>`;

const insArticle = `        <article>
            <section class="page-hero">
                <div class="orb orb-1"></div>
                <div class="orb orb-2"></div>
                <div class="w-full max-w-7xl mx-auto px-6 lg:px-10">
                    <div class="max-w-3xl">
                        <div class="section-tag reveal">
                            <i data-lucide="moon-star" style="width:13px;height:13px;"></i> Medicina del Sueño
                        </div>
                        <h1 class="text-4xl lg:text-5xl font-bold leading-tight mb-5 reveal" style="color:#4e4d4d; letter-spacing:-0.03em;">
                            Manejo Geriátrico del <span class="gradient-text">Insomnio y el Sueño</span>
                        </h1>
                        <p class="text-base lg:text-xl font-medium leading-relaxed mb-6 reveal" style="color:#4e4d4d;">
                            La arquitectura cerebral del sueño muta con los años. Dificultar en el descanso es común, pero atacarlo con pastillas inductivas que lo <strong>zombifican clínicamente</strong> es un horror médico. Nuestro abordaje optimiza la melatonina fisiológica y remueve medicamentos tóxicos que detonan caídas letales nocturnas.
                        </p>
                        <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-sm reveal" style="color:#7a7979;">
                            <a href="../index.html" style="color:#8766aa;" class="hover:underline">Inicio</a>
                            <i data-lucide="chevron-right" style="width:14px;height:14px;color:#a88bc5;"></i>
                            <a href="../servicios.html" style="color:#8766aa;" class="hover:underline">Servicios</a>
                            <i data-lucide="chevron-right" style="width:14px;height:14px;color:#a88bc5;"></i>
                            <span style="color:#4e4d4d;font-weight:600;">Insomnio</span>
                        </nav>
                    </div>
                </div>
            </section>

            <section class="py-20">
                <div class="w-full max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
                    <div class="lg:col-span-8 space-y-6">
                        <h2 class="text-3xl font-bold mb-4 reveal" style="color:#4e4d4d;">El Veneno de las Benzodiacepinas</h2>
                        <p class="text-base leading-relaxed reveal" style="color:#7a7979;">
                            Es trágicamente frecuente recibir pacientes sobre-recetados durante años con medicamentos como el Clonazepam o Alprazolam "para poder descansar". Estos medicamentos disminuyen gravemente los reflejos cognitivos de supervivencia.
                        </p>
                        <p class="text-base leading-relaxed reveal" style="color:#7a7979;">
                            Cuando el hígado envejecido no puede purgar esa medicina, el adulto sufre sedación acumulativa: amanecen mareados, experimentan pérdida grave en memoria de corto plazo y aumentan en 500% el riesgo de una caída y ruptura de cadera o craneal al ir al baño solos en la oscuridad nocturna.
                        </p>
                        
                        <h3 class="text-2xl font-bold mt-10 mb-4 reveal" style="color:#4e4d4d;">Ruta Correcta para el Descanso</h3>
                        <div class="grid md:grid-cols-2 gap-4 reveal">
                            <div class="glass p-5 rounded-2xl relative overflow-hidden">
                                <div style="position:absolute; top:0; left:0; width:4px; height:100%; background:#ca8ebe;"></div>
                                <h4 class="font-bold flex items-center gap-2 mb-2" style="color:#4e4d4d;">1. Desprescripción Gradual</h4>
                                <p class="text-sm" style="color:#7a7979;">Nunca deben ser retirados "de golpe" (provoca síndrome de abstinencia y taquicardias). Se ejecuta un calendario analítico de retiro progresivo.</p>
                            </div>
                            <div class="glass p-5 rounded-2xl relative overflow-hidden">
                                <div style="position:absolute; top:0; left:0; width:4px; height:100%; background:#8766aa;"></div>
                                <h4 class="font-bold flex items-center gap-2 mb-2" style="color:#4e4d4d;">2. Moléculas Amigables</h4>
                                <p class="text-sm" style="color:#7a7979;">Implementación de Melatonina clínica de liberación prolongada o Trazodona en dosis micro, no adictivas y cero porciento paralizantes motoras.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>`;

buildPage('tratamientos/insomnio-adultos-mayores.html', insMeta, insJson, insArticle);
