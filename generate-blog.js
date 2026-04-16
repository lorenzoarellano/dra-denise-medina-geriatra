const fs = require('fs');
const path = require('path');

const root = 'c:\\projects\\dra-deniseMedina';
const blogDir = path.join(root, 'blog');

// Ensure blog directory exists
if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
}

// Ensure the JS script runs using the alzheimer template
const templatePath = path.join(root, 'tratamientos', 'alzheimer-y-demencia-durango.html');
const template = fs.readFileSync(templatePath, 'utf8');

function extractBlock(startStr, endStr) {
    const start = template.indexOf(startStr);
    const end = template.indexOf(endStr, start);
    if (start === -1 || end === -1) throw new Error("Template match fail: " + startStr);
    return template.substring(start, end + endStr.length);
}

function buildBlogPage(destFile, meta, jsonLd, heroData, mainContent, sidebarBio, ctaText) {
    let html = template;
    
    // Replace Meta
    const headBlock = extractBlock('<meta name="description"', '<link rel="icon" href="../assets/images/favicon.ico" type="image/x-icon">');
    html = html.replace(headBlock, meta + '\n    <link rel="icon" href="../assets/images/favicon.ico" type="image/x-icon">');
    
    // Replace JSON-LD
    const jsonBlock = extractBlock('<script type="application/ld+json">', '</script>');
    html = html.replace(jsonBlock, jsonLd);
    
    // Replace Hero
    const heroRegex = /<section class="page-hero">[\s\S]*?<\/section>/;
    html = html.replace(heroRegex, heroData);
    
    // Replace Main content completely inside lg:col-span-8
    const mainMatch = /<div class="lg:col-span-8 space-y-6">[\s\S]*?(?=<\/div>\s*<!-- Sidebar: Autoridad -->)/;
    html = html.replace(mainMatch, `<div class="lg:col-span-8 space-y-6">\n${mainContent}\n                        <div class="mt-12">\n                            <a href="https://wa.me/+5216181499080" target="_blank" class="btn-primary reveal text-sm"><i data-lucide="calendar" style="width:16px;height:16px;"></i> ${ctaText}</a>\n                        </div>\n                    `);
    
    // Replace Sidebar Bio
    const bioMatch = /<p class="text-xs leading-relaxed mb-6" style="color:#7a7979;">[\s\S]*?<\/p>/;
    html = html.replace(bioMatch, `<p class="text-xs leading-relaxed mb-6" style="color:#7a7979;">${sidebarBio}</p>`);
    
    // Remove the extra treatment section AND the FAQ section, as this is a blog article
    const extraStart = html.indexOf('<section class="py-20" style="background:linear-gradient');
    const faqEnd = html.indexOf('</article>');
    if (extraStart !== -1 && faqEnd !== -1) {
        html = html.substring(0, extraStart) + html.substring(faqEnd);
    }
    
    // Change breadcrumbs: Servicios -> Blog
    html = html.replace(/"\.\.\/servicios\.html"/g, '"../blog.html"').replace(/>Servicios</g, '>Blog<');
    
    // Setup static SVG Facebook icon (to avoid lucide dynamic load issue from earlier phase template state)
    const fbRegex = /<i\s+data-lucide="facebook"[^>]*><\/i>/g;
    const facebookSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>';
    html = html.replace(fbRegex, facebookSvg);

    fs.writeFileSync(path.join(root, destFile), html, 'utf8');
    console.log("Generado Artículo Blog: " + destFile);
}

// -------------------------------------------------------------
// POST 1: Cuando llevar
// -------------------------------------------------------------
const post1Meta = `<meta name="description" content="Señales de alarma clínicas para saber en qué momento exacto debes llevar a un adulto mayor al médico geriatra antes de una crisis en el hospital.">
    <meta name="keywords" content="cuando ir al geriatra, sintomas ancianos, especialista tercera edad, detectar alzheimer, señales medico geriátrico">
    <meta name="author" content="Dra. Denise Medina Peralta">
    <meta name="robots" content="index, follow">
    <title>¿Cuándo llevar al adulto mayor al Geriatra? Señales Críticas</title>

    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Dra. Denise Medina Peralta | Blog Geriátrico">
    <meta property="og:url" content="https://dradenisemedina.com/blog/cuando-llevar-adulto-mayor-al-geriatra">
    <meta property="og:title" content="¿Cuándo llevar al adulto mayor al Geriatra?">
    <meta property="og:description" content="Descubre las 5 señales críticas que indican que tu familiar necesita urgente un Geriatra y no un médico general. Prevé caídas y toxicidad.">
    <meta property="og:image" content="https://dradenisemedina.com/assets/images/social-share-cover.jpg">
    <meta property="og:locale" content="es_MX">
    <link rel="canonical" href="https://dradenisemedina.com/blog/cuando-llevar-adulto-mayor-al-geriatra">`;

const post1Json = `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://dradenisemedina.com/blog/cuando-llevar-adulto-mayor-al-geriatra"
      },
      "headline": "¿Cuándo y por qué llevar a un adulto mayor al Geriatra?",
      "description": "Señales médicas y cognitivas evidentes que indican la necesidad de trasladar el enfoque médico de uno generalista a uno especializado en Geriatría para evitar caídas y cascadas de prescripción.",
      "author": {
        "@type": "Person",
        "name": "Dra. Denise Medina Peralta",
        "url": "https://dradenisemedina.com/sobre-la-dra-denise-medina"
      },  
      "publisher": {
        "@type": "Organization",
        "name": "Consultorio Geriátrico Dra. Denise Medina",
        "logo": {
          "@type": "ImageObject",
          "url": "https://dradenisemedina.com/assets/images/logo/logo.webp"
        }
      },
      "datePublished": "2024-03-10",
      "dateModified": "2024-03-10"
    }
    </script>`;

const post1Hero = `<section class="page-hero">
                <div class="orb orb-1"></div><div class="orb orb-2"></div>
                <div class="w-full max-w-7xl mx-auto px-6 lg:px-10">
                    <div class="max-w-3xl">
                        <div class="section-tag reveal"><i data-lucide="book-open" style="width:13px;height:13px;"></i> Educación Médica</div>
                        <h1 class="text-4xl lg:text-5xl font-bold leading-tight mb-5 reveal" style="color:#4e4d4d; letter-spacing:-0.03em;">
                            ¿Cuándo llevar al <span class="gradient-text">Adulto Mayor</span> al Geriatra?
                        </h1>
                        <p class="text-base lg:text-xl font-medium leading-relaxed mb-6 reveal" style="color:#4e4d4d;">
                            La mayoría de las familias esperan a que ocurra una caída grave con fractura o un episodio de delirio agresivo nocturno. Aprende a detectar las <strong>5 banderas rojas silenciosas</strong> que te gritan que tu familiar necesita una transición de médico general a un enfoque geriátrico.
                        </p>
                        <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-sm reveal" style="color:#7a7979;">
                            <a href="../index.html" style="color:#8766aa;" class="hover:underline">Inicio</a>
                            <i data-lucide="chevron-right" style="width:14px;height:14px;color:#a88bc5;"></i>
                            <a href="../blog.html" style="color:#8766aa;" class="hover:underline">Blog</a>
                            <i data-lucide="chevron-right" style="width:14px;height:14px;color:#a88bc5;"></i>
                            <span style="color:#4e4d4d;font-weight:600;">Lectura</span>
                        </nav>
                    </div>
                </div>
            </section>`;

const post1Main = `<h2 class="text-3xl font-bold mb-4 reveal" style="color:#4e4d4d;">El error de la "vejez normal"</h2>
                        <p class="text-base leading-relaxed reveal" style="color:#7a7979;">
                            "Es que ya está viejecito, es normal que se olvide de las cosas y le duelan los huesos". Esta frase tan profundamente enraizada en nuestra cultura latinoamericana es la causante del 80% del deterioro evitable en la tercera edad.
                            <strong>Envejecer no es sinónimo de dejar de ser funcional o estar condenado al dolor crónico y la confusión mental.</strong>
                        </p>
                        <p class="text-base leading-relaxed reveal mt-4" style="color:#7a7979;">
                            Un geriatra no es el médico "para quienes se van a morir pronto". Un geriatra es el especialista en mantenimiento biológico celular avanzado que diseña la ruta para devolverle al abuelo su dignidad, independencia al caminar, y estabilidad emocional.
                        </p>

                        <h3 class="text-2xl font-bold mt-10 mb-4 reveal" style="color:#4e4d4d;">Las 5 Banderas Rojas (Red Flags)</h3>
                        <ul class="space-y-4 reveal">
                            <li class="glass p-5 rounded-2xl">
                                <span class="block text-base font-bold mb-1" style="color:#4e4d4d;">1. La Cascada de Pastillas (Polifarmacia)</span>
                                <span class="text-sm font-medium" style="color:#7a7979;">Si miras la mesita de noche de tu familiar y cuenta con 5, 8 o hasta 12 frascos de medicinas recetados todos por doctores distintos: ¡Aleta roja inmensa! Necesita una valoración urgente para desprescribir químicos tóxicos en su hígado que sólo duplican efectos secundarios.</span>
                            </li>
                            <li class="glass p-5 rounded-2xl">
                                <span class="block text-base font-bold mb-1" style="color:#4e4d4d;">2. Caídas Sucesivas desde su propia altura</span>
                                <span class="text-sm font-medium" style="color:#7a7979;">Si ha sufrido al menos 2 tropiezos o caídas en los últimos 6 meses, no es "torpeza". Es un síntoma evidente del <strong>Síndrome de Fragilidad</strong> que exige ajuste de musculatura, densitometría ósea y revisión del oído interno.</span>
                            </li>
                            <li class="glass p-5 rounded-2xl">
                                <span class="block text-base font-bold mb-1" style="color:#4e4d4d;">3. Cambios psiquiátricos no justificados</span>
                                <span class="text-sm font-medium" style="color:#7a7979;">Apatía repentina ("No quiero comer, dejenmé en el cuarto"), delirios como ver animales donde no los hay, o agresividad repentina con su hija favorita. Esto no es "locura senil", casi siempre es falta de oxígeno por medicamentos o infecciones urinarias silentes asintomáticas.</span>
                            </li>
                            <li class="glass p-5 rounded-2xl">
                                <span class="block text-base font-bold mb-1" style="color:#4e4d4d;">4. Descontrol Metabólico Crónico</span>
                                <span class="text-sm font-medium" style="color:#7a7979;">Diabéticos o hipertensos cuyas metas de control fueron pautadas por un internista midiendo su organismo como si tuviera 40 años. Someter a un cerebro de 82 años a una "glucosa perfecta de 90" provocará hipoglucemias nocturnas letales. Se requiere relajar las metas clínicas inteligentemente.</span>
                            </li>
                             <li class="glass p-5 rounded-2xl">
                                <span class="block text-base font-bold mb-1" style="color:#4e4d4d;">5. Agotamiento total del cuidador</span>
                                <span class="text-sm font-medium" style="color:#7a7979;">Cuando tú, como hija/o e hijo/a, estás experimentando pérdida de cabello, ataques de llanto inexplicables o insomnio tratando de cuidar a tus padres. Un geriatra no solo evalúa al paciente, sino que reestructura la higiene de sueño y aporta medicamentos directos al paciente para dar respiro absoluto a la familia por la noche.</span>
                            </li>
                        </ul>
                        
                        <p class="text-base text-center italic mt-8 border-l-4 pl-4 border-[#8766aa]" style="color:#4e4d4d;">
                            "La geriatría devuelve años a la vida, pero más importante aún, devuelve vida y lucidez a los años."
                        </p>`;

// -------------------------------------------------------------
// POST 2: Envejecimiento Saludable
// -------------------------------------------------------------
const post2Meta = `<meta name="description" content="Guía médica integral sobre envejecimiento saludable y prevención del desgaste en la tercera edad. Dieta, mente y movimiento funcional.">
    <meta name="keywords" content="envejecimiento saludable, longevidad geriatra, vitaminas adulto mayor, prevenir alzheimer, bienestar abuelos">
    <meta name="author" content="Dra. Denise Medina Peralta">
    <meta name="robots" content="index, follow">
    <title>Guía de la Geriatra para el Envejecimiento Saludable</title>

    <meta property="og:type" content="article">
    <meta property="og:url" content="https://dradenisemedina.com/blog/envejecimiento-saludable-guia-completa">
    <meta property="og:title" content="Mitos y Realidades del Envejecimiento Saludable">
    <meta property="og:description" content="¿Es necesario atiborrarse de calcio comercial? ¿Cómo entrenar cognitivamente al cerebro? Aquí todo lo que la ciencia dicta para el adulto mayor moderno.">
    <meta property="og:image" content="https://dradenisemedina.com/assets/images/social-share-cover.jpg">`;

const post2Json = `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Guía Científica del Envejecimiento Saludable",
      "author": { "@type": "Person", "name": "Dra. Denise Medina Peralta" },
      "datePublished": "2024-03-12"
    }
    </script>`;

const post2Hero = `<section class="page-hero">
                <div class="orb orb-1"></div><div class="orb orb-2"></div>
                <div class="w-full max-w-7xl mx-auto px-6 lg:px-10">
                    <div class="max-w-3xl">
                        <div class="section-tag reveal"><i data-lucide="book-open" style="width:13px;height:13px;"></i> Lifestyle & Prevención</div>
                        <h1 class="text-4xl lg:text-5xl font-bold leading-tight mb-5 reveal" style="color:#4e4d4d; letter-spacing:-0.03em;">
                            La Guía Médica Para un <span class="gradient-text">Envejecimiento Activo</span>
                        </h1>
                        <p class="text-base lg:text-xl font-medium leading-relaxed mb-6 reveal" style="color:#4e4d4d;">
                            La modernidad nos exige cambiar el chip: el adulto mayor de hoy ya no está atado a una mecedora. Descubramos cómo el tejido biológico reacciona al levantamiento ligero de peso, a los ácidos grasos correctos en la cocina y a las rutinas de sueño inquebrantables para burlar al envejecimiento degenerativo.
                        </p>
                    </div>
                </div>
            </section>`;

const post2Main = `<h2 class="text-3xl font-bold mb-4 reveal" style="color:#4e4d4d;">El mito de los vitamínicos mágicos</h2>
                        <p class="text-base leading-relaxed reveal" style="color:#7a7979;">
                            Existe un mercado brutal e irresponsable enfocado en vender un "licuado nutritivo fortificado" o un "suplemento de A la Z" como si fuera gasolina para que el abuelo deje de estar decaído. La realidad bioquímica es muy diferente. La medicina basada en evidencias ha comprobado que el cuerpo geriátrico responde de manera excepcional al <strong>movimiento resistivo funcional</strong> y reacciona de forma nula al exceso de vitaminas sintéticas orales cuando no hay una deficiencia probada de estas. La orina simplemente filtra lo que el estómago gastó miles de pesos en absorber.
                        </p>
                        
                        <h3 class="text-2xl font-bold mt-10 mb-4 reveal" style="color:#4e4d4d;">3 Leyes Biológicas del Antienvejecimiento Geriátrico</h3>
                        <ul class="space-y-4 reveal">
                            <li class="glass p-5 rounded-2xl">
                                <span class="block text-base font-bold mb-1" style="color:#4e4d4d;">1. Nutrición Hiperproteica, no hipercalórica</span>
                                <span class="text-sm font-medium" style="color:#7a7979;">La "sarcopenia" es el monstruo silencioso que consume el músculo esquelético. Es imprescindible ajustar la carga de macronutrientes asegurando alto valor proteico biológico (huevo libre, salmón, suero lácteo) reduciendo hidratos vacíos. Esto estabiliza el azúcar en la sangre y alimenta el tejido encargado de prevenir fragilidad.</span>
                            </li>
                            <li class="glass p-5 rounded-2xl">
                                <span class="block text-base font-bold mb-1" style="color:#4e4d4d;">2. Actividad Intelectual Dinámica (No solo Sudokus)</span>
                                <span class="text-sm font-medium" style="color:#7a7979;">Aprender pasos de un baile estructurado y nuevo, usar un smartphone de última generación o involucrarse en conversaciones familiares polémicas, detona algo llamado <strong style="color:#8766aa;">Neuroplasticidad sináptica</strong> protegiendo drásticamente el lóbulo frontal.</span>
                            </li>
                            <li class="glass p-5 rounded-2xl">
                                <span class="block text-base font-bold mb-1" style="color:#4e4d4d;">3. Higiene del Ritmo Circadiano Completo</span>
                                <span class="text-sm font-medium" style="color:#7a7979;">El adulto mayor que se duerme a las 5pm fente a la TV terminará despertando a la 1am en un ciclo tóxico. La luz solar matutina directa impactando las retinas oculares es la base de la producción de melatonina endógena (no la comprada en farmacia) requerida para la salud neurológica y cardiovascular general.</span>
                            </li>
                        </ul>`;

// -------------------------------------------------------------
// POST 3: Guía Cuidadores
// -------------------------------------------------------------
const post3Meta = `<meta name="description" content="Guía emocional y médica para el cuidador exhausto. Cómo prevenir el Síndrome del Cuidador Quemado (Burnout) si asistes a un adulto mayor con Alzheimer.">
    <meta name="keywords" content="sindrome del cuidador, hija cuida madre enferma, agotamiento cuidador alzheimer, burn out familiar, apoyo geriatrico familiar">
    <meta name="author" content="Dra. Denise Medina Peralta">
    <title>El Síndrome del Cuidador Quemado (Burnout Familiar)</title>
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://dradenisemedina.com/blog/guia-cuidadores-adultos-mayores">
    <meta property="og:title" content="Si tú te hundes, ellos también: El Síndrome del Cuidador">
    <meta property="og:description" content="Técnicas de preservación de la salud mental, distribución de cargas familiares y opciones de alivio químico nocturno para cuidar pacientes con demencia severa.">
    <meta property="og:image" content="https://dradenisemedina.com/assets/images/social-share-cover.jpg">`;

const post3Json = `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Guía Definitiva Contra el Burnout del Cuidador Geriátrico",
      "author": { "@type": "Person", "name": "Dra. Denise Medina Peralta" },
      "datePublished": "2024-03-14"
    }
    </script>`;

const post3Hero = `<section class="page-hero">
                <div class="orb orb-1"></div><div class="orb orb-2"></div>
                <div class="w-full max-w-7xl mx-auto px-6 lg:px-10">
                    <div class="max-w-3xl">
                        <div class="section-tag reveal"><i data-lucide="book-open" style="width:13px;height:13px;"></i> Salud Mental</div>
                        <h1 class="text-4xl lg:text-5xl font-bold leading-tight mb-5 reveal" style="color:#4e4d4d; letter-spacing:-0.03em;">
                            La Tragedia Invisible: <span class="gradient-text">El Síndrome del Cuidador</span>
                        </h1>
                        <p class="text-base lg:text-xl font-medium leading-relaxed mb-6 reveal" style="color:#4e4d4d;">
                            ¿Lloras incontrolablemente en el baño para que nadie te escuche? ¿Sientes resentimiento, amargura y culpa profunda al mismo tiempo por estar físicamente aniquilada velando a tu madre? Hablemos con total franqueza sobre cómo salvaguardar tu mente.
                        </p>
                    </div>
                </div>
            </section>`;

const post3Main = `<h2 class="text-3xl font-bold mb-4 reveal" style="color:#4e4d4d;">Tú eres el pilar. Si tú te quiebras, la casa entera se colapsa.</h2>
                        <p class="text-base leading-relaxed reveal" style="color:#7a7979;">
                            El gran error institucional es enfocar el 100% de la energía médica únicamente en el paciente y el 0% en la familia. El Alzheimer y la Demencia Vascular son llamadas <em>las patologías de la familia extensa</em> porque arrasan financieramente, emocionalmente y biológicamente con los hijos a cargo.
                        </p>
                        
                        <h3 class="text-2xl font-bold mt-10 mb-4 reveal" style="color:#4e4d4d;">Protocolo de Supervivencia Emocional</h3>
                        <ul class="space-y-4 reveal">
                            <li class="glass p-5 rounded-2xl">
                                <span class="block text-base font-bold mb-1" style="color:#4e4d4d;">1. Rechaza de tajo a la "Culpa Falsa"</span>
                                <span class="text-sm font-medium" style="color:#7a7979;">Comprender clínicamente que cuando un Alzheimer agudo dice groserías o acusa que "me están robando el dinero mis propios hijos", NO es tu ser querido hablando. Es la degeneración neurológica. No puedes tomarlo personal porque su corteza frontal inhibitoria y su capacidad crítica literal y biológicamente no existen ya.</span>
                            </li>
                            <li class="glass p-5 rounded-2xl">
                                <span class="block text-base font-bold mb-1" style="color:#4e4d4d;">2. La obligación del relevo programado</span>
                                <span class="text-sm font-medium" style="color:#7a7979;">El martirio individual no sirve a nadie. Se deben establecer asambleas familiares formales donde los cuidados básicos se tercericen o roten. Hay una regla inquebrantable en geriatría: Un cuidador primario en soledad, tiene una esperanza de ver afectada su barrera cardiovascular por estrés tan severo, que es propenso a infartos precoces igual que un fumador de cadena.</span>
                            </li>
                            <li class="glass p-5 rounded-2xl">
                                <span class="block text-base font-bold mb-1" style="color:#4e4d4d;">3. Exigir ayuda farmacológica al Médico Tratante</span>
                                <span class="text-sm font-medium" style="color:#7a7979;">Es un crimen dejar sufrir a un paciente —y por ende a su hijo sin poder dormir las 8 horas diarias— simplemente por el "miedo" a la psiquiatría. Gran parte de nuestro trabajo es estabilizar farmacológicamente las noches del adulto mayor confuso para garantizar el sueño profundo sanador para todo el hogar.</span>
                            </li>
                        </ul>
                        <p class="text-base font-medium reveal mt-8" style="color:#4e4d4d;">
                            No tienes por qué transitar por este duelo a ciegas. Permítenos intervenir y generar estructuras sólidas a tu lado.
                        </p>`;

// Sidebar for all blogs
const sidebarStr = `Aportando pedagogía científica desde la compasión y los nuevos descubrimientos hepáticos y neuronales. El control bioquímico de un paciente significa siempre claridad y tranquilidad en la familia mexicana.`;

buildBlogPage('blog/cuando-llevar-adulto-mayor-al-geriatra.html', post1Meta, post1Json, post1Hero, post1Main, sidebarStr, 'Agendar Evaluación Estructural');
buildBlogPage('blog/envejecimiento-saludable-guia-completa.html', post2Meta, post2Json, post2Hero, post2Main, sidebarStr, 'Consulta Preventiva para Adultos Mayores');
buildBlogPage('blog/guia-cuidadores-adultos-mayores.html', post3Meta, post3Json, post3Hero, post3Main, sidebarStr, 'Agendar Segunda Opinión Urgente');
