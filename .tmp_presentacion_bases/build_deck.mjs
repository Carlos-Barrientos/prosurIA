import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const BUILD_DIR = String.raw`C:\Users\Carlos Barrientos\Documents\Desarrollos\prosurIA\.tmp_presentacion_bases`;
const FINAL_PPTX = String.raw`C:\Users\Carlos Barrientos\Documents\Desarrollos\prosurIA\Presentacion_Bases_Reto_IA_PROSUR.pptx`;
const LOGO_PATH = path.join(BUILD_DIR, "source_unzip", "word", "media", "image1.png");
const PREVIEW_DIR = path.join(BUILD_DIR, "artifact_previews");
const SOURCE_NAME = "MC-BC-IA Bases Convocatoria Reto IA PROSUR - Categorias por Áreas.docx";

const C = {
  white: "#FFFFFF",
  ink: "#111111",
  muted: "#5D626B",
  panel: "#F1F2F3",
  panel2: "#E7E9EC",
  rule: "#C5C8CD",
  red: "#D91E18",
  redDark: "#A91511",
  redPale: "#FCEAE9",
  green: "#197A55",
};

const W = 1280;
const H = 720;
const M = 56;
const FONT = "Arial";

function addBox(slide, name, left, top, width, height, fill = "none", lineFill = "none", lineWidth = 0, geometry = "rect") {
  return slide.shapes.add({
    geometry,
    name,
    position: { left, top, width, height },
    fill,
    line: { style: "solid", fill: lineFill, width: lineWidth },
  });
}

function addText(slide, name, text, left, top, width, height, options = {}) {
  const box = addBox(slide, name, left, top, width, height, options.fill ?? "none", options.lineFill ?? "none", options.lineWidth ?? 0, options.geometry ?? "rect");
  box.text = text;
  box.text.style = {
    fontSize: options.fontSize ?? 20,
    typeface: FONT,
    color: options.color ?? C.ink,
    bold: options.bold ?? false,
    alignment: options.alignment ?? "left",
    verticalAlignment: options.verticalAlignment ?? "top",
  };
  return box;
}

function addSlideTitle(slide, title, number, kicker = "BASES DEL RETO IA") {
  addBox(slide, `accent-${number}`, M, 38, 8, 62, C.red);
  addText(slide, `kicker-${number}`, kicker, M + 24, 38, 800, 22, { fontSize: 14, bold: true, color: C.red });
  addText(slide, `title-${number}`, title, M + 24, 62, 1110, 58, { fontSize: 38, bold: true });
  addText(slide, `page-${number}`, String(number).padStart(2, "0"), 1164, 674, 60, 18, { fontSize: 12, alignment: "right", color: C.muted });
}

function addSectionLabel(slide, name, text, left, top, width, color = C.red) {
  addText(slide, name, text.toUpperCase(), left, top, width, 24, { fontSize: 16, bold: true, color });
}

function addBulletList(slide, name, items, left, top, width, rowHeight = 48, options = {}) {
  items.forEach((item, index) => {
    const y = top + index * rowHeight;
    addBox(slide, `${name}-dot-${index}`, left, y + 8, 12, 12, options.dotColor ?? C.red, "none", 0, "ellipse");
    addText(slide, `${name}-text-${index}`, item, left + 26, y, width - 26, rowHeight - 4, {
      fontSize: options.fontSize ?? 19,
      color: options.color ?? C.ink,
      bold: options.bold ?? false,
      verticalAlignment: "top",
    });
  });
}

function addFooterRule(slide, name) {
  addBox(slide, `${name}-rule`, M, 650, W - M * 2, 1, C.rule);
}

function setSources(slide, sections, extra = "") {
  const notes = `[Sources]\n- ${SOURCE_NAME} — ${sections}${extra ? `\n- ${extra}` : ""}`;
  slide.speakerNotes.textFrame.setText(notes);
  slide.speakerNotes.setVisible(true);
}

function styleTable(table, headerColor = C.ink, headerFill = C.panel2, bodyFont = 17) {
  table.borders.assign({ style: "solid", fill: C.rule, width: 1 });
  table.cells.block({ row: 0, column: 0, rowCount: 1, columnCount: table.columns.length }).assign({
    fill: headerFill,
    textStyle: { bold: true, color: headerColor, fontSize: bodyFont, typeface: FONT },
    anchor: "middle",
  });
  if (table.rows.length > 1) {
    table.cells.block({ row: 1, column: 0, rowCount: table.rows.length - 1, columnCount: table.columns.length }).assign({
      textStyle: { color: C.ink, fontSize: bodyFont, typeface: FONT },
      anchor: "middle",
    });
  }
}

function addPillarTable(slide, values, top, height, widths, fontSize = 17) {
  const table = slide.tables.add({
    rows: values.length,
    columns: values[0].length,
    left: M,
    top,
    width: W - M * 2,
    height,
    columnWidths: widths,
    values,
  });
  styleTable(table, C.ink, C.panel2, fontSize);
  values.forEach((row, r) => {
    table.rows[r].height = height / values.length;
  });
  return table;
}

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

async function main() {
  await fs.mkdir(PREVIEW_DIR, { recursive: true });
  const logoBytes = await fs.readFile(LOGO_PATH);
  const logoBlob = logoBytes.buffer.slice(logoBytes.byteOffset, logoBytes.byteOffset + logoBytes.byteLength);

  const deck = Presentation.create({ slideSize: { width: W, height: H } });

  // 1. Cover — Codex Grid stacked-text-flow reference.
  {
    const slide = deck.slides.add();
    slide.background.fill = C.white;
    addBox(slide, "cover-accent", 0, 0, 18, H, C.red);
    slide.images.add({ blob: logoBlob, contentType: "image/png", alt: "Logotipo Grupo PROSUR", fit: "contain", position: { left: 850, top: 46, width: 340, height: 110 } });
    addText(slide, "cover-kicker", "BASES Y CONVOCATORIA OFICIAL", 70, 52, 650, 28, { fontSize: 18, bold: true, color: C.red });
    addText(slide, "cover-title", "Reto de\nInteligencia Artificial", 70, 185, 920, 190, { fontSize: 68, bold: true, verticalAlignment: "bottom" });
    addText(slide, "cover-subtitle", "De la idea al impacto", 72, 405, 620, 42, { fontSize: 30, color: C.muted });
    addText(slide, "cover-metric", "5 categorías  •  5 pilares  •  100 puntos", 72, 524, 760, 44, { fontSize: 26, bold: true });
    addText(slide, "cover-audience", "Para personas colaboradoras de las empresas, marcas y áreas de Grupo PROSUR", 72, 590, 850, 48, { fontSize: 18, color: C.muted });
    setSources(slide, "portada y encabezado", `${SOURCE_NAME} — logotipo embebido en word/media/image1.png`);
  }

  // 2. Core principle.
  {
    const slide = deck.slides.add();
    slide.background.fill = C.white;
    addSlideTitle(slide, "Aquí se premia el impacto probado, no la idea", 2, "PRINCIPIO DEL RETO");
    addText(slide, "core-lead", "Solo participan soluciones que ya funcionan en un proceso real y generan ahorro verificable.", 80, 156, 900, 78, { fontSize: 32, bold: true });
    const steps = [
      ["01", "Problema real", "Dolor operativo dentro de Grupo PROSUR"],
      ["02", "Solución operativa", "IA o automatización en uso antes de inscribirse"],
      ["03", "Valor verificable", "Evidencia, Antes vs. Después y beneficio neto"],
    ];
    steps.forEach((step, i) => {
      const x = 80 + i * 390;
      addText(slide, `core-num-${i}`, step[0], x, 300, 82, 82, { fontSize: 42, bold: true, color: C.red });
      addText(slide, `core-name-${i}`, step[1], x, 390, 330, 38, { fontSize: 25, bold: true });
      addText(slide, `core-desc-${i}`, step[2], x, 438, 320, 82, { fontSize: 18, color: C.muted });
      if (i < 2) addText(slide, `core-arrow-${i}`, "→", x + 310, 326, 56, 54, { fontSize: 38, color: C.rule, alignment: "center" });
    });
    addBox(slide, "core-warning", 80, 563, 1120, 60, C.redPale);
    addText(slide, "core-warning-text", "No califican ideas, conceptos, demostraciones aisladas ni prototipos que todavía no operen en la empresa.", 104, 578, 1070, 32, { fontSize: 20, bold: true, color: C.redDark });
    addFooterRule(slide, "core");
    setSources(slide, "sección 1; tabla ‘Principio del reto’; tabla ‘Ruta de valor’");
  }

  // 3. Participation.
  {
    const slide = deck.slides.add();
    slide.background.fill = C.white;
    addSlideTitle(slide, "El reto está abierto al talento de todo Grupo PROSUR", 3, "PARTICIPACIÓN");
    addText(slide, "participation-quote", "No es requisito ser programador ni especialista en inteligencia artificial.", 80, 172, 500, 118, { fontSize: 32, bold: true });
    addText(slide, "participation-body", "Cuenta la capacidad de detectar un problema, construir una solución viable y demostrar su valor en la operación.", 80, 322, 500, 110, { fontSize: 20, color: C.muted });
    addBox(slide, "participation-panel", 680, 158, 500, 424, C.panel);
    addSectionLabel(slide, "participation-label", "Modalidad y colaboración", 716, 192, 380);
    addBulletList(slide, "participation-bullets", [
      "Personas colaboradoras de empresas, marcas y áreas del Grupo.",
      "Se promueven equipos multidisciplinarios.",
      "Colaboración entre operación, negocio y TI.",
      "Modalidad y máximo de integrantes: por definir.",
      "Canal de inscripción: por definir.",
    ], 716, 244, 420, 62, { fontSize: 18 });
    addFooterRule(slide, "participation");
    setSources(slide, "sección 2.1 y tabla de modalidad de participación");
  }

  // 4. Admission gate — checklist layout reference.
  {
    const slide = deck.slides.add();
    slide.background.fill = C.white;
    addSlideTitle(slide, "La admisibilidad es un filtro: cumplir todo o quedar fuera", 4, "REQUISITOS OBLIGATORIOS");
    addBox(slide, "gate-left", 80, 164, 430, 440, C.red);
    addText(slide, "gate-word", "OBLIGATORIO", 112, 208, 360, 48, { fontSize: 28, bold: true, color: C.white });
    addText(slide, "gate-number", "6", 110, 280, 250, 130, { fontSize: 100, bold: true, color: C.white });
    addText(slide, "gate-caption", "comprobaciones habilitantes antes de aplicar la Scorecard", 114, 430, 320, 105, { fontSize: 24, color: C.white });
    addBulletList(slide, "gate-list", [
      "Problema real dentro de Grupo PROSUR.",
      "IA o automatización sustantiva y explicable.",
      "Solución implementada y funcionando.",
      "Evidencia verificable de uso real.",
      "Ahorro o beneficio neto con Antes vs. Después.",
      "Costos, dependencias y controles de seguridad declarados.",
    ], 600, 170, 580, 64, { fontSize: 18 });
    addText(slide, "gate-note", "El incumplimiento detectado después de la inscripción también causa descalificación.", 600, 570, 560, 50, { fontSize: 18, bold: true, color: C.redDark });
    addFooterRule(slide, "gate");
    setSources(slide, "sección 2.2; tabla ‘Regla de admisibilidad y descalificación’; Anexo A, revisión habilitante");
  }

  // 5. Categories — evidence table reference.
  {
    const slide = deck.slides.add();
    slide.background.fill = C.white;
    addSlideTitle(slide, "Cada proyecto compite en una sola categoría", 5, "5 CATEGORÍAS OFICIALES");
    const values = [
      ["Clave", "Área principal", "Ejemplos de enfoque"],
      ["A", "Finanzas, Contabilidad y Tesorería", "Cierres, conciliaciones, fiscal, facturas y dispersión bancaria"],
      ["B", "Operaciones, Taller, Logística y Posventa", "Inventarios, activos, tiempos de taller, mermas y traslados"],
      ["C", "Ventas, Marketing y Relación con Clientes", "Leads, asistentes de voz, CRM y retención"],
      ["D", "Capital Humano, Compliance y Gobernanza", "Talento, capacitación, cumplimiento y conocimiento jurídico"],
      ["E", "Tecnología, Datos, Ciberseguridad e Innovación", "APIs, datos, analítica, infraestructura y soluciones transversales"],
    ];
    const table = addPillarTable(slide, values, 154, 392, [105, 405, 658], 17);
    for (let r = 1; r < values.length; r++) {
      table.getCell(r, 0).fill = C.redPale;
      table.getCell(r, 0).text.style = { fontSize: 24, bold: true, color: C.redDark, typeface: FONT };
    }
    addBox(slide, "categories-note", 80, 570, 1120, 62, C.panel);
    addText(slide, "categories-note-text", "Los Focos de Valor no son categorías: todos deben acreditar ahorro; además pueden demostrar eficiencia, servicio, innovación y conectividad.", 104, 585, 1070, 40, { fontSize: 18, bold: true });
    addFooterRule(slide, "categories");
    setSources(slide, "sección 3 y tablas de enfoque de las categorías A–E; sección 3.6");
  }

  // 6. Deliverables.
  {
    const slide = deck.slides.add();
    slide.background.fill = C.white;
    addSlideTitle(slide, "La inscripción debe demostrar el caso completo", 6, "ENTREGABLES MÍNIMOS");
    const items = [
      ["01", "Problema y alcance", "Dolor, usuarios, frecuencia, volumen y consecuencias"],
      ["02", "Solución y uso de IA", "Funcionamiento actual y supervisión humana"],
      ["03", "Operación real", "Fecha de inicio, uso, registros, resultados y límites"],
      ["04", "Antes vs. Después", "Línea base y resultado con periodos comparables"],
      ["05", "Ahorro comprobable", "Beneficio bruto, costos y beneficio neto"],
      ["06", "Integración", "Sistemas, datos, áreas, clientes o proveedores"],
      ["07", "Escalabilidad", "Ámbitos, requisitos, costos, soporte y adopción"],
      ["08", "Seguridad", "Datos, accesos, proveedores, licencias y revisiones"],
    ];
    items.forEach((item, i) => {
      const col = i < 4 ? 0 : 1;
      const row = i % 4;
      const x = col === 0 ? 80 : 660;
      const y = 162 + row * 108;
      addText(slide, `deliver-num-${i}`, item[0], x, y, 58, 50, { fontSize: 24, bold: true, color: C.red });
      addText(slide, `deliver-title-${i}`, item[1], x + 78, y, 420, 32, { fontSize: 22, bold: true });
      addText(slide, `deliver-desc-${i}`, item[2], x + 78, y + 36, 455, 52, { fontSize: 17, color: C.muted });
      if (row < 3) addBox(slide, `deliver-rule-${i}`, x, y + 94, 500, 1, C.rule);
    });
    addText(slide, "deliver-warning", "La omisión o falta de acreditación de cualquiera de estos componentes causa descalificación.", 80, 608, 1100, 28, { fontSize: 18, bold: true, color: C.redDark });
    addFooterRule(slide, "deliver");
    setSources(slide, "sección 4 y tabla de componentes, contenidos mínimos y evidencias sugeridas");
  }

  // 7. Before vs After.
  {
    const slide = deck.slides.add();
    slide.background.fill = C.white;
    addSlideTitle(slide, "El Antes vs. Después convierte mejoras en valor económico", 7, "MEDICIÓN OBLIGATORIA");
    const cols = [
      ["ANTES", "Cómo se realiza hoy", "Tiempo, personas, costo, volumen, errores y fuente de línea base"],
      ["DESPUÉS", "Cómo funciona con la solución", "Tiempo, costo de operación, calidad, capacidad y evidencia"],
      ["ESCALA", "Dónde más puede utilizarse", "Integraciones, costo, plazo, mantenimiento y beneficio potencial"],
    ];
    cols.forEach((item, i) => {
      const x = 80 + i * 385;
      addBox(slide, `measure-panel-${i}`, x, 164, 340, 300, i === 1 ? C.redPale : C.panel);
      addText(slide, `measure-label-${i}`, item[0], x + 28, 194, 280, 26, { fontSize: 16, bold: true, color: i === 1 ? C.redDark : C.muted });
      addText(slide, `measure-title-${i}`, item[1], x + 28, 238, 280, 66, { fontSize: 25, bold: true });
      addText(slide, `measure-body-${i}`, item[2], x + 28, 326, 280, 110, { fontSize: 18, color: C.muted });
    });
    addBox(slide, "formula-panel", 80, 504, 1100, 94, C.ink);
    addText(slide, "formula", "Beneficio neto = beneficio bruto − costos de operación del periodo", 116, 526, 1030, 50, { fontSize: 28, bold: true, color: C.white, alignment: "center" });
    addText(slide, "measure-rule", "Mismo alcance, unidad y periodo; declarar supuestos, muestra, fuente y responsable de validación.", 80, 612, 1100, 28, { fontSize: 17, color: C.muted, alignment: "center" });
    addFooterRule(slide, "measure");
    setSources(slide, "sección 5; tabla Antes/Después/Escala; sección 5.1 y fórmula base");
  }

  // 8. Security.
  {
    const slide = deck.slides.add();
    slide.background.fill = C.white;
    addSlideTitle(slide, "La seguridad es un requisito habilitante, no un punto extra", 8, "IA RESPONSABLE");
    addBox(slide, "security-stop", 80, 164, 380, 424, C.ink);
    addText(slide, "security-stop-label", "DESCALIFICA", 112, 202, 300, 38, { fontSize: 24, bold: true, color: C.red });
    addText(slide, "security-stop-body", "Usar datos, cuentas, herramientas, APIs o licencias no autorizadas.", 112, 270, 300, 145, { fontSize: 30, bold: true, color: C.white });
    addText(slide, "security-stop-foot", "El control aplica aunque el incumplimiento se detecte después de la inscripción.", 112, 462, 300, 90, { fontSize: 18, color: C.rule });
    addBulletList(slide, "security-list", [
      "Canales corporativos y privados aprobados.",
      "Procesamiento local o proveedor autorizado.",
      "Minimización, acceso, retención y eliminación.",
      "Supervisión humana antes de efectos relevantes.",
      "Errores, sesgos, alucinaciones y límites documentados.",
      "Modelos, APIs, datos de terceros y licencias declarados.",
      "Revisión de TI/Seguridad cuando corresponda.",
    ], 560, 166, 620, 58, { fontSize: 18 });
    addFooterRule(slide, "security");
    setSources(slide, "sección 6; Anexo B, sección B.7");
  }

  // 9. Scorecard.
  {
    const slide = deck.slides.add();
    slide.background.fill = C.white;
    addSlideTitle(slide, "La Scorecard prioriza impacto económico y eficiencia", 9, "EVALUACIÓN — 100 PUNTOS");
    addText(slide, "score-intro", "Solo se califica a los proyectos declarados admisibles. Cada pilar se evalúa de 0 a 5 y se pondera.", 80, 142, 1120, 46, { fontSize: 20, color: C.muted });
    const values = [
      ["Pilar", "Puntos", "Prueba principal"],
      ["Funcionalidad", "20", "Operación real, estabilidad, usabilidad y resultados"],
      ["Impacto económico / ahorro", "25", "Beneficio neto, recuperación, costos evitados y costos operativos"],
      ["Eficiencia", "25", "Antes vs. Después en tiempo, pasos, errores, retrabajo y capacidad"],
      ["Conectividad e integración", "10", "Integraciones, flujo de datos, seguridad e interoperabilidad"],
      ["Escalabilidad", "20", "Replicabilidad, costo, mantenimiento, adopción y dependencias"],
    ];
    const table = addPillarTable(slide, values, 206, 354, [330, 120, 718], 17);
    for (let r = 1; r < values.length; r++) {
      table.getCell(r, 1).fill = values[r][1] === "25" ? C.redPale : C.panel;
      table.getCell(r, 1).text.style = { fontSize: 24, bold: true, color: C.redDark, typeface: FONT };
    }
    addBox(slide, "score-formula", 80, 586, 1120, 54, C.panel);
    addText(slide, "score-formula-text", "Puntos ponderados = (nivel obtenido ÷ 5) × ponderación máxima", 104, 600, 1070, 30, { fontSize: 20, bold: true, alignment: "center" });
    addFooterRule(slide, "score");
    setSources(slide, "sección 8; tabla de cinco pilares; Anexo A");
  }

  // 10. Three-phase timeline reference. Connectors before nodes.
  {
    const slide = deck.slides.add();
    slide.background.fill = C.white;
    addSlideTitle(slide, "El proceso tiene siete etapas; las fechas siguen por definir", 10, "ETAPAS Y CALENDARIO");
    addBox(slide, "timeline-line", 120, 320, 1040, 3, C.rule);
    const phases = [
      ["FASE 1", "Lanzamiento", "1. Convocatoria\n2. Inscripción"],
      ["FASE 2", "Validación", "3. Admisibilidad\n4. Mentoría\n5. Auditoría de evidencia"],
      ["FASE 3", "Cierre", "6. Presentación final\n7. Premiación"],
    ];
    phases.forEach((phase, i) => {
      const x = 120 + i * 400;
      addBox(slide, `timeline-node-${i}`, x, 303, 36, 36, i === 1 ? C.red : C.ink, "none", 0, "ellipse");
      addText(slide, `timeline-label-${i}`, phase[0], x, 248, 160, 26, { fontSize: 16, bold: true, color: C.red });
      addText(slide, `timeline-title-${i}`, phase[1], x, 374, 300, 42, { fontSize: 27, bold: true });
      addText(slide, `timeline-body-${i}`, phase[2], x, 430, 300, 116, { fontSize: 19, color: C.muted });
      addText(slide, `timeline-date-${i}`, "Fecha / periodo: por definir", x, 566, 310, 28, { fontSize: 16, bold: true, color: C.redDark });
    });
    addText(slide, "timeline-note", "El Comité Organizador comunicará canales, responsables y fechas definitivas antes de publicar la convocatoria.", 80, 624, 1100, 28, { fontSize: 17, color: C.muted, alignment: "center" });
    addFooterRule(slide, "timeline");
    setSources(slide, "sección 7 y tabla de etapas y calendario");
  }

  // 11. Historical impact references.
  {
    const slide = deck.slides.add();
    slide.background.fill = C.white;
    addSlideTitle(slide, "Tres referentes muestran el tipo de impacto buscado", 11, "EDICIONES ANTERIORES");
    const cases = [
      ["CORI", "≈ $4.0 M MXN", "Recuperación reportada de incentivos comerciales; costo operativo reportado de $0."],
      ["La Santa Conciliación", "20 h → 10 min", "Automatización local de conciliaciones de viáticos y procesamiento masivo sin costo de APIs."],
      ["SAM", "94%", "Precisión reportada en validación y análisis forense de identificaciones."],
    ];
    cases.forEach((item, i) => {
      const x = 80 + i * 385;
      addBox(slide, `case-panel-${i}`, x, 170, 340, 370, i === 1 ? C.redPale : C.panel);
      addText(slide, `case-name-${i}`, item[0], x + 28, 202, 280, 48, { fontSize: 24, bold: true });
      addText(slide, `case-metric-${i}`, item[1], x + 28, 284, 290, 76, { fontSize: 40, bold: true, color: C.redDark });
      addText(slide, `case-desc-${i}`, item[2], x + 28, 400, 282, 112, { fontSize: 18, color: C.muted });
    });
    addText(slide, "cases-disclaimer", "Son referencias ilustrativas reportadas por bases anteriores; la nueva edición exige evidencia verificable y comparable para cualquier resultado.", 80, 574, 1120, 60, { fontSize: 18, bold: true, color: C.redDark, alignment: "center" });
    addFooterRule(slide, "cases");
    setSources(slide, "sección 12 y tablas CORI, La Santa Conciliación y SAM");
  }

  // 12. Final pitch.
  {
    const slide = deck.slides.add();
    slide.background.fill = C.white;
    addSlideTitle(slide, "El pitch final debe probar nueve respuestas", 12, "PRESENTACIÓN FINAL");
    addBox(slide, "pitch-left", 80, 160, 380, 440, C.ink);
    addText(slide, "pitch-left-title", "PITCH\n+ DEMO", 112, 202, 300, 116, { fontSize: 48, bold: true, color: C.white });
    addText(slide, "pitch-left-body", "Demostración funcionando en el proceso real o evidencia equivalente autorizada.", 112, 352, 300, 106, { fontSize: 22, color: C.rule });
    addText(slide, "pitch-left-tbd", "Duración, formato, sede, fecha y hora: por definir.", 112, 500, 300, 70, { fontSize: 18, bold: true, color: C.red });
    addBulletList(slide, "pitch-list", [
      "¿Cuál era el problema y a quién afectaba?",
      "¿Cómo se resolvió y dónde se usó IA?",
      "¿Qué prueba que la solución funciona?",
      "¿Cuál es el Antes vs. Después?",
      "¿Cuánto genera, recupera, protege o ahorra?",
      "¿Cuánto cuesta implementar y operar?",
      "¿Qué datos utiliza y cómo se protegen?",
      "¿Con qué sistemas o actores se integra?",
      "¿Dónde más puede escalar y qué requiere?",
    ], 540, 154, 650, 49, { fontSize: 17 });
    addFooterRule(slide, "pitch");
    setSources(slide, "sección 9 y tabla de condiciones de la presentación final");
  }

  // 13. Close and publication gaps.
  {
    const slide = deck.slides.add();
    slide.background.fill = C.white;
    addSlideTitle(slide, "Antes de publicar, faltan definiciones operativas", 13, "CIERRE Y SIGUIENTE PASO");
    addBulletList(slide, "tbd-list", [
      "Fechas de convocatoria, inscripción, final y premiación.",
      "Modalidad y número máximo de integrantes.",
      "Canal de inscripción y responsables por etapa.",
      "Duración del pitch, demostración, formato y sede.",
      "Conformación del jurado y mecanismo de desempate.",
      "Premios, condiciones de entrega y datos de contacto.",
    ], 80, 156, 660, 58, { fontSize: 18 });
    addBox(slide, "closing-panel", 800, 154, 380, 330, C.red);
    addText(slide, "closing-line-1", "Identifica un problema.", 834, 196, 310, 48, { fontSize: 25, bold: true, color: C.white });
    addText(slide, "closing-line-2", "Automatízalo.", 834, 252, 310, 48, { fontSize: 25, bold: true, color: C.white });
    addText(slide, "closing-line-3", "Mide su impacto.", 834, 308, 310, 48, { fontSize: 25, bold: true, color: C.white });
    addText(slide, "closing-line-4", "Demuestra su valor.", 834, 364, 310, 48, { fontSize: 25, bold: true, color: C.white });
    addText(slide, "closing-line-5", "Conviértelo en el próximo estándar del Grupo.", 834, 420, 310, 54, { fontSize: 20, color: C.white });
    slide.images.add({ blob: logoBlob, contentType: "image/png", alt: "Logotipo Grupo PROSUR", fit: "contain", position: { left: 842, top: 522, width: 300, height: 96 } });
    addText(slide, "closing-contact", "Área responsable • correo • extensión: por definir", 80, 588, 620, 36, { fontSize: 18, bold: true, color: C.redDark });
    addFooterRule(slide, "closing");
    setSources(slide, "secciones 7, 8, 9, 10 y cierre; información de contacto", `${SOURCE_NAME} — logotipo embebido en word/media/image1.png`);
  }

  for (const [index, slide] of deck.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    await writeBlob(path.join(PREVIEW_DIR, `${stem}.png`), await deck.export({ slide, format: "png", scale: 1 }));
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(PREVIEW_DIR, `${stem}.layout.json`), await layout.text());
  }

  await writeBlob(path.join(PREVIEW_DIR, "deck-montage.webp"), await deck.export({ format: "webp", montage: true, scale: 1 }));
  const pptx = await PresentationFile.exportPptx(deck);
  await pptx.save(FINAL_PPTX);
  console.log(`Created ${FINAL_PPTX}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
