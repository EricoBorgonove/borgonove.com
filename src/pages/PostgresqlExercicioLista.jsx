import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import {
  findPostgresqlExerciseBlock,
  findPostgresqlExerciseList,
  getPostgresqlExerciseAnswer,
  getPostgresqlExerciseNumber,
  getPostgresqlExerciseQuestion,
} from "../data/postgresqlExercises";

function getEntityPosition(index, total) {
  if (total >= 10) {
    const topRow = [
      { x: 70, y: 60 },
      { x: 380, y: 60 },
      { x: 690, y: 60 },
      { x: 1000, y: 60 },
      { x: 1310, y: 60 },
    ];
    const bottomRow = [
      { x: 70, y: 610 },
      { x: 380, y: 610 },
      { x: 690, y: 610 },
      { x: 1000, y: 610 },
      { x: 1310, y: 610 },
    ];

    return [...topRow, ...bottomRow][index] || {
      x: 70 + (index % 5) * 310,
      y: 60 + Math.floor(index / 5) * 510,
    };
  }

  const positionsByTotal = {
    3: [
      { x: 80, y: 70 },
      { x: 810, y: 70 },
      { x: 445, y: 560 },
    ],
    4: [
      { x: 70, y: 60 },
      { x: 850, y: 60 },
      { x: 70, y: 560 },
      { x: 850, y: 560 },
    ],
  };

  return positionsByTotal[total]?.[index] || {
    x: 90 + (index % 3) * 300,
    y: 70 + Math.floor(index / 3) * 280,
  };
}

function getEntityHeight(entity) {
  return 72 + entity.fields.length * 28;
}

function getEntityCenter(entity, position) {
  return {
    x: position.x + 115,
    y: position.y + getEntityHeight(entity) / 2,
  };
}

function getEntityAnchor(entity, position, target, width) {
  const height = getEntityHeight(entity);
  const center = getEntityCenter(entity, position);
  const dx = target.x - center.x;
  const dy = target.y - center.y;
  const scaleX = Math.abs(dx) > 0 ? (width / 2) / Math.abs(dx) : Infinity;
  const scaleY = Math.abs(dy) > 0 ? (height / 2) / Math.abs(dy) : Infinity;
  const scale = Math.min(scaleX, scaleY);

  return {
    x: center.x + dx * scale,
    y: center.y + dy * scale,
  };
}

function getCanvasHeight(totalEntities) {
  if (totalEntities >= 10) return 980;
  return totalEntities <= 2 ? 620 : 820;
}

function getCanvasWidth(totalEntities) {
  return totalEntities >= 10 ? 1600 : 1120;
}

function getRelationshipPosition(fromCenter, toCenter, index, total) {
  const base = {
    x: (fromCenter.x + toCenter.x) / 2,
    y: (fromCenter.y + toCenter.y) / 2,
  };

  if (total === 3) {
    const positions = [
      { x: base.x - 70, y: base.y - 8 },
      { x: base.x + 70, y: base.y - 8 },
      base,
    ];

    return positions[index] || base;
  }

  if (total === 4) {
    const positions = [
      { x: base.x, y: base.y - 16 },
      { x: base.x - 58, y: base.y + 4 },
      { x: base.x + 58, y: base.y + 4 },
      base,
    ];

    return positions[index] || base;
  }

  return {
    x: base.x,
    y: base.y,
  };
}

function getPointBetween(start, end, ratio) {
  return {
    x: start.x + (end.x - start.x) * ratio,
    y: start.y + (end.y - start.y) * ratio,
  };
}

function getPerpendicularOffset(start, end, amount) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;

  return {
    x: (-dy / length) * amount,
    y: (dx / length) * amount,
  };
}

function parseMerField(field) {
  const badges = [];

  if (field.includes("PK/FK")) {
    badges.push("PK", "FK");
  } else {
    if (field.includes("PK")) badges.push("PK");
    if (field.includes("FK")) badges.push("FK");
  }

  if (field.includes("UNIQUE")) {
    badges.push("UNIQUE");
  }

  const name = field
    .replace("PK/FK", "")
    .replace("UNIQUE", "")
    .replace("PK", "")
    .replace("FK", "")
    .trim();

  return { name, badges };
}

function getCardinalityLabel(cardinality) {
  if (!cardinality) return "";
  if (cardinality.includes("(")) return cardinality;
  if (cardinality === "1") return "(1,1)";
  if (cardinality === "N") return "(0,N)";

  return cardinality;
}

function getModelingExplanation(diagram) {
  if (!diagram) {
    return null;
  }

  const entityItems = diagram.entities.map((entity) => {
    const fields = entity.fields.map(parseMerField);
    const primaryKeys = fields.filter((field) => field.badges.includes("PK")).map((field) => field.name);
    const foreignKeys = fields.filter((field) => field.badges.includes("FK")).map((field) => field.name);
    const uniqueFields = fields.filter((field) => field.badges.includes("UNIQUE")).map((field) => field.name);
    const details = [];

    if (primaryKeys.length > 0) details.push(`chave primária: ${primaryKeys.join(", ")}`);
    if (foreignKeys.length > 0) details.push(`chave estrangeira: ${foreignKeys.join(", ")}`);
    if (uniqueFields.length > 0) details.push(`campo único: ${uniqueFields.join(", ")}`);

    return {
      title: entity.name,
      text: details.length > 0
        ? `A entidade ${entity.name} virou tabela porque representa um objeto importante do domínio; ${details.join("; ")}.`
        : `A entidade ${entity.name} virou tabela porque representa um objeto importante do domínio.`,
    };
  });

  const relationshipItems = (diagram.relationships || []).map((relationship) => {
    if (typeof relationship === "string") {
      return { title: "Relacionamento", text: relationship };
    }

    return {
      title: `${relationship.from} ${getCardinalityLabel(relationship.fromCardinality)} - ${relationship.name} - ${getCardinalityLabel(relationship.toCardinality)} ${relationship.to}`,
      text: relationship.description,
    };
  });

  return { entityItems, relationshipItems };
}

function ModelingExplanation({ diagram }) {
  const explanation = getModelingExplanation(diagram);

  if (!explanation) {
    return null;
  }

  return (
    <div className="mb-5 rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
        Modelagem que levou à estrutura
      </h3>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Entidades e chaves
          </p>
          <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
            {explanation.entityItems.map((item) => (
              <li key={item.title}>
                <span className="font-semibold text-cyan-100">{item.title}: </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Relacionamentos
          </p>
          <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
            {explanation.relationshipItems.map((item) => (
              <li key={item.title}>
                <span className="font-semibold text-cyan-100">{item.title}: </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MerDiagram({ diagram }) {
  if (!diagram) {
    return null;
  }

  const canvas = {
    width: getCanvasWidth(diagram.entities.length),
    height: getCanvasHeight(diagram.entities.length),
  };
  const isLargeAssociativeDiagram = diagram.entities.length >= 10;
  const entityWidth = 230;
  const entityPositions = new Map(
    diagram.entities.map((entity, index) => [
      entity.name,
      getEntityPosition(index, diagram.entities.length),
    ])
  );
  const relationshipObjects = (diagram.relationships || []).filter(
    (relationship) => typeof relationship === "object" && relationship.draw !== false
  );
  const relationshipDescriptions = (diagram.relationships || []).map((relationship) => {
    if (typeof relationship === "string") {
      return { text: relationship };
    }

    return {
      title: `${relationship.from} ${getCardinalityLabel(relationship.fromCardinality)} - ${relationship.name} - ${getCardinalityLabel(relationship.toCardinality)} ${relationship.to}`,
      text: relationship.description,
    };
  });
  const relationshipShapes = relationshipObjects
    .map((relationship, index) => {
      const fromEntity = diagram.entities.find((entity) => entity.name === relationship.from);
      const toEntity = diagram.entities.find((entity) => entity.name === relationship.to);
      const fromPosition = entityPositions.get(relationship.from);
      const toPosition = entityPositions.get(relationship.to);

      if (!fromEntity || !toEntity || !fromPosition || !toPosition) {
        return null;
      }

      const fromCenter = getEntityCenter(fromEntity, fromPosition);
      const toCenter = getEntityCenter(toEntity, toPosition);
      const center = getRelationshipPosition(fromCenter, toCenter, index, diagram.entities.length);
      const fromAnchor = getEntityAnchor(
        fromEntity,
        fromPosition,
        isLargeAssociativeDiagram ? toCenter : center,
        entityWidth
      );
      const toAnchor = getEntityAnchor(
        toEntity,
        toPosition,
        isLargeAssociativeDiagram ? fromCenter : center,
        entityWidth
      );
      const labelOffset = getPerpendicularOffset(
        fromAnchor,
        toAnchor,
        index % 2 === 0 ? 18 : -18
      );
      const lineLabelBase = getPointBetween(fromAnchor, toAnchor, 0.5);
      const fromLargeCardinalityBase = getPointBetween(fromAnchor, toAnchor, 0.24);
      const toLargeCardinalityBase = getPointBetween(fromAnchor, toAnchor, 0.76);

      return {
        ...relationship,
        fromCenter,
        toCenter,
        fromAnchor,
        toAnchor,
        lineLabelPosition: {
          x: lineLabelBase.x + labelOffset.x,
          y: lineLabelBase.y + labelOffset.y,
        },
        fromLargeCardinalityPosition: {
          x: fromLargeCardinalityBase.x + labelOffset.x,
          y: fromLargeCardinalityBase.y + labelOffset.y,
        },
        toLargeCardinalityPosition: {
          x: toLargeCardinalityBase.x + labelOffset.x,
          y: toLargeCardinalityBase.y + labelOffset.y,
        },
        fromCardinalityPosition: getPointBetween(fromAnchor, center, 0.5),
        toCardinalityPosition: getPointBetween(toAnchor, center, 0.5),
        center,
      };
    })
    .filter(Boolean);

  return (
    <div className="mt-4 rounded-xl border border-cyan-400/25 bg-slate-950/70 p-4 shadow-inner">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
        Diagrama MER
      </p>
      <div className="rounded-xl border border-slate-700 bg-slate-950 p-2">
        <svg
          className="h-auto w-full"
          viewBox={`0 0 ${canvas.width} ${canvas.height}`}
          role="img"
          aria-label="Diagrama MER com entidades, relacionamentos, cardinalidades e chaves"
        >
          <rect width={canvas.width} height={canvas.height} rx="22" fill="#020617" />
          <g opacity="0.38">
            <path d={`M40 110 H${canvas.width - 40}`} stroke="#164e63" strokeWidth="1" />
            <path d={`M40 ${canvas.height / 2} H${canvas.width - 40}`} stroke="#164e63" strokeWidth="1" />
            <path d={`M40 ${canvas.height - 110} H${canvas.width - 40}`} stroke="#164e63" strokeWidth="1" />
            <path d={`M220 35 V${canvas.height - 35}`} stroke="#164e63" strokeWidth="1" />
            <path d={`M560 35 V${canvas.height - 35}`} stroke="#164e63" strokeWidth="1" />
            <path d={`M900 35 V${canvas.height - 35}`} stroke="#164e63" strokeWidth="1" />
            {canvas.width > 1120 && (
              <>
                <path d={`M1240 35 V${canvas.height - 35}`} stroke="#164e63" strokeWidth="1" />
                <path d={`M1480 35 V${canvas.height - 35}`} stroke="#164e63" strokeWidth="1" />
              </>
            )}
          </g>

          {relationshipShapes.map((relationship) => (
            <g key={`${relationship.from}-${relationship.name}-${relationship.to}-lines`}>
              {isLargeAssociativeDiagram ? (
                <line
                  x1={relationship.fromAnchor.x}
                  y1={relationship.fromAnchor.y}
                  x2={relationship.toAnchor.x}
                  y2={relationship.toAnchor.y}
                  stroke="#67e8f9"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeOpacity="0.86"
                />
              ) : (
                <>
                  <line
                    x1={relationship.fromAnchor.x}
                    y1={relationship.fromAnchor.y}
                    x2={relationship.center.x}
                    y2={relationship.center.y}
                    stroke="#67e8f9"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1={relationship.center.x}
                    y1={relationship.center.y}
                    x2={relationship.toAnchor.x}
                    y2={relationship.toAnchor.y}
                    stroke="#67e8f9"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </>
              )}
              {isLargeAssociativeDiagram && (
                <g>
                  <rect
                    x={relationship.lineLabelPosition.x - 48}
                    y={relationship.lineLabelPosition.y - 14}
                    width="96"
                    height="26"
                    rx="8"
                    fill="#451a03"
                    stroke="#fbbf24"
                    strokeWidth="1.5"
                  />
                  <text
                    x={relationship.lineLabelPosition.x}
                    y={relationship.lineLabelPosition.y + 4}
                    fill="#fef3c7"
                    fontSize="12"
                    fontWeight="900"
                    textAnchor="middle"
                  >
                    {relationship.name}
                  </text>
                </g>
              )}
              {(isLargeAssociativeDiagram
                ? [
                    {
                      label: getCardinalityLabel(relationship.fromCardinality),
                      x: relationship.fromLargeCardinalityPosition.x,
                      y: relationship.fromLargeCardinalityPosition.y,
                      width: 56,
                      fontSize: 12,
                    },
                    {
                      label: getCardinalityLabel(relationship.toCardinality),
                      x: relationship.toLargeCardinalityPosition.x,
                      y: relationship.toLargeCardinalityPosition.y,
                      width: 56,
                      fontSize: 12,
                    },
                  ]
                : [
                    {
                      label: getCardinalityLabel(relationship.fromCardinality),
                      x: relationship.fromCardinalityPosition.x,
                      y: relationship.fromCardinalityPosition.y,
                      width: 72,
                      fontSize: 17,
                    },
                    {
                      label: getCardinalityLabel(relationship.toCardinality),
                      x: relationship.toCardinalityPosition.x,
                      y: relationship.toCardinalityPosition.y,
                      width: 72,
                      fontSize: 17,
                    },
                  ]).map((cardinality) => (
                <g key={`${relationship.name}-${cardinality.label}-${cardinality.x}`}>
                  <rect
                    x={cardinality.x - cardinality.width / 2}
                    y={cardinality.y - 22}
                    width={cardinality.width}
                    height={isLargeAssociativeDiagram ? "24" : "30"}
                    rx="8"
                    fill="#0f172a"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                  />
                  <text
                    x={cardinality.x}
                    y={cardinality.y - 6}
                    fill="#cffafe"
                    fontSize={cardinality.fontSize}
                    fontWeight="800"
                    textAnchor="middle"
                  >
                    {cardinality.label}
                  </text>
                </g>
              ))}
            </g>
          ))}

          {!isLargeAssociativeDiagram && relationshipShapes.map((relationship) => (
            <g key={`${relationship.name}-${relationship.from}-${relationship.to}`}>
              <polygon
                points={`${relationship.center.x},${relationship.center.y - 48} ${relationship.center.x + 78},${relationship.center.y} ${relationship.center.x},${relationship.center.y + 48} ${relationship.center.x - 78},${relationship.center.y}`}
                fill="#451a03"
                stroke="#fbbf24"
                strokeWidth="3"
              />
              <text
                x={relationship.center.x}
                y={relationship.center.y + 5}
                fill="#fef3c7"
                fontSize="16"
                fontWeight="900"
                textAnchor="middle"
              >
                {relationship.name}
              </text>
            </g>
          ))}

          {diagram.entities.map((entity) => {
            const position = entityPositions.get(entity.name);
            const entityHeight = getEntityHeight(entity);

            return (
              <g key={entity.name}>
                <rect
                  x={position.x}
                  y={position.y}
                  width={entityWidth}
                  height={entityHeight}
                  rx="12"
                  fill="#0f172a"
                  stroke="#67e8f9"
                  strokeWidth="3"
                />
                <rect
                  x={position.x}
                  y={position.y}
                  width={entityWidth}
                  height="42"
                  rx="12"
                  fill="#155e75"
                />
                <line
                  x1={position.x}
                  y1={position.y + 42}
                  x2={position.x + entityWidth}
                  y2={position.y + 42}
                  stroke="#67e8f9"
                  strokeWidth="2"
                />
                <text
                  x={position.x + entityWidth / 2}
                  y={position.y + 27}
                  fill="#ecfeff"
                  fontSize="18"
                  fontWeight="900"
                  textAnchor="middle"
                >
                  {entity.name}
                </text>
                {entity.fields.map((field, fieldIndex) => {
                  const parsedField = parseMerField(field);
                  const fieldY = position.y + 66 + fieldIndex * 28;
                  const isPrimary = parsedField.badges.includes("PK");

                  return (
                    <g key={field}>
                      <text
                        x={position.x + 16}
                        y={fieldY}
                        fill={isPrimary ? "#cffafe" : "#cbd5e1"}
                        fontSize="15"
                        fontWeight={isPrimary ? "800" : "600"}
                      >
                        {parsedField.name}
                      </text>
                      {isPrimary && (
                        <line
                          x1={position.x + 16}
                          y1={fieldY + 4}
                          x2={position.x + 16 + Math.min(parsedField.name.length * 8, 96)}
                          y2={fieldY + 4}
                          stroke="#67e8f9"
                          strokeWidth="2"
                        />
                      )}
                      {parsedField.badges.map((badge, badgeIndex) => {
                        const badgeWidth = badge === "UNIQUE" ? 58 : 30;
                        const badgeX = position.x + entityWidth - 16 - badgeWidth - badgeIndex * (badge === "UNIQUE" ? 64 : 36);
                        const badgeColor = badge === "PK" ? "#0e7490" : badge === "FK" ? "#92400e" : "#047857";

                        return (
                          <g key={badge}>
                            <rect
                              x={badgeX}
                              y={fieldY - 17}
                              width={badgeWidth}
                              height="20"
                              rx="5"
                              fill={badgeColor}
                            />
                            <text
                              x={badgeX + badgeWidth / 2}
                              y={fieldY - 3}
                              fill="#ffffff"
                              fontSize="10"
                              fontWeight="900"
                              textAnchor="middle"
                            >
                              {badge}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
      {relationshipDescriptions.length > 0 && (
        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/60 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
            Leitura dos relacionamentos
          </p>
          <div className="mb-3 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-300">
            <span className="rounded-md border border-cyan-400/20 bg-cyan-500/10 px-2 py-1">PK = chave primária</span>
            <span className="rounded-md border border-amber-400/20 bg-amber-500/10 px-2 py-1">FK = chave estrangeira</span>
            <span className="rounded-md border border-emerald-400/20 bg-emerald-500/10 px-2 py-1">UNIQUE = valor não pode repetir</span>
            <span className="rounded-md border border-slate-600 bg-slate-800/70 px-2 py-1">(mín,máx) = cardinalidade mínima e máxima</span>
          </div>
          <ul className="space-y-2 text-xs leading-relaxed text-slate-300">
            {relationshipDescriptions.map((relationship) => (
              <li key={relationship.title || relationship.text} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
                <span>
                  {relationship.title && (
                    <span className="mb-0.5 block font-semibold text-cyan-100">{relationship.title}</span>
                  )}
                  {relationship.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function PostgresqlExercicioLista() {
  const { listSlug, exerciseSlug } = useParams();
  const list = findPostgresqlExerciseList(listSlug);
  const block = findPostgresqlExerciseBlock(listSlug, exerciseSlug);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedDiagram, setSelectedDiagram] = useState(null);
  const [answerPassword, setAnswerPassword] = useState("");
  const [answerPasswordError, setAnswerPasswordError] = useState(false);
  const [unlockedAnswerKey, setUnlockedAnswerKey] = useState(null);

  if (!list || !block) {
    return <Navigate to="/disciplinas/postgresql/exercicios" replace />;
  }

  const currentIndex = list.blocks.findIndex((item) => item.slug === block.slug);
  const previousBlock = list.blocks[currentIndex - 1];
  const nextBlock = list.blocks[currentIndex + 1];
  const hasDiagrams = block.exercises.some((exercise) => typeof exercise === "object" && exercise.diagram);
  const requiresAnswerPassword = Boolean(list.answerPasswordPrefix);
  const hideBlockOrder = list.slug === "loja-temporal";

  function getAnswerKey(exercise) {
    return `${list.slug}-${block.slug}-${exercise.number}`;
  }

  function openAnswer(exerciseData) {
    setSelectedExercise(exerciseData);
    setAnswerPassword("");
    setAnswerPasswordError(false);
    setUnlockedAnswerKey(null);
  }

  function closeAnswer() {
    setSelectedExercise(null);
    setAnswerPassword("");
    setAnswerPasswordError(false);
    setUnlockedAnswerKey(null);
  }

  function submitAnswerPassword(event) {
    event.preventDefault();

    if (!selectedExercise) return;

    const expectedPassword = `${list.answerPasswordPrefix}${selectedExercise.number}`;

    if (answerPassword.trim() === expectedPassword) {
      setUnlockedAnswerKey(getAnswerKey(selectedExercise));
      setAnswerPasswordError(false);
      return;
    }

    setAnswerPasswordError(true);
  }

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-7xl mx-auto">
      <div className="mb-8">
        <BackButton
          fallbackTo={`/disciplinas/postgresql/exercicios/${list.slug}`}
          className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2"
        >
          Voltar para Lista {list.title}
        </BackButton>
      </div>

      <div className="mb-10 max-w-4xl">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
            {block.level}
          </span>
          <span className="text-sm font-semibold text-slate-500">
            {hideBlockOrder ? list.title : `Lista ${list.title} · Bloco ${block.order} de ${list.blocks.length}`}
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-black md:text-5xl">{block.title}</h1>
        <p className="text-lg leading-relaxed text-slate-400">{block.summary}</p>
      </div>

      {list.files && (
        <div className="glass mb-8 rounded-2xl p-6 md:p-8">
          <h2 className="mb-4 text-xl font-semibold text-cyan-300">Arquivos para download</h2>
          <div className="flex flex-wrap gap-3">
            {list.files.map((file) => (
              <a
                key={file.href}
                href={file.href}
                download={file.fileName}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:text-cyan-100"
              >
                {file.label}
                <span aria-hidden="true">↓</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <ol className={`grid gap-4 ${hasDiagrams ? "" : "md:grid-cols-2"}`}>
        {block.exercises.map((exercise, index) => {
          const question = getPostgresqlExerciseQuestion(exercise);
          const number = getPostgresqlExerciseNumber(exercise, index + 1);

          return (
          <li
            key={`${block.slug}-${number}`}
            className="glass rounded-2xl p-5 text-sm leading-relaxed text-slate-300"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                Exercício {String(number).padStart(2, "0")}
              </span>
              <div className="flex shrink-0 items-center gap-2">
                {exercise.diagram && (
                  <button
                    type="button"
                    onClick={() => setSelectedDiagram({ exercise, question, number })}
                    className="postgres-mer-button rounded-lg border px-3 py-1 text-xs font-semibold transition"
                  >
                    MER
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => openAnswer({ exercise, question, number, index })}
                  className="rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200 transition hover:border-cyan-300 hover:text-cyan-100"
                >
                  Resposta
                </button>
              </div>
            </div>
            <p>{question}</p>
          </li>
          );
        })}
      </ol>

      <nav className="mt-10 grid gap-4 sm:grid-cols-2" aria-label="Navegação entre blocos de exercícios">
        {previousBlock ? (
          <Link
            to={`/disciplinas/postgresql/exercicios/${list.slug}/${previousBlock.slug}`}
            className="glass theme-hover-border rounded-2xl p-5 transition hover:-translate-y-1"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Anterior</p>
            <p className="font-semibold text-cyan-200">← {previousBlock.title}</p>
          </Link>
        ) : <div />}

        {nextBlock && (
          <Link
            to={`/disciplinas/postgresql/exercicios/${list.slug}/${nextBlock.slug}`}
            className="glass theme-hover-border rounded-2xl p-5 text-right transition hover:-translate-y-1"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Próximo</p>
            <p className="font-semibold text-cyan-200">{nextBlock.title} →</p>
          </Link>
        )}
      </nav>

      {selectedExercise && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="postgresql-answer-title"
        >
          <div className="glass max-h-[86vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-6 shadow-2xl md:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  Exercício {String(selectedExercise.number).padStart(2, "0")}
                </p>
                <h2 id="postgresql-answer-title" className="text-2xl font-semibold text-slate-100">
                  Resposta comentada
                </h2>
              </div>
              <button
                type="button"
                onClick={closeAnswer}
                className="rounded-xl border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-100"
              >
                Fechar
              </button>
            </div>

            <div className="mb-5 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-sm leading-relaxed text-slate-300">{selectedExercise.question}</p>
            </div>

            <p className="mb-3 text-sm leading-relaxed text-slate-400">
              Compare com a sua solução e observe principalmente a lógica usada, os filtros e os relacionamentos entre as tabelas.
            </p>

            <ModelingExplanation diagram={selectedExercise.exercise.diagram} />

            {requiresAnswerPassword && unlockedAnswerKey !== getAnswerKey(selectedExercise) ? (
              <form onSubmit={submitAnswerPassword} className="rounded-xl border border-cyan-400/20 bg-slate-950/70 p-4">
                <label className="mb-2 block text-sm font-semibold text-cyan-100" htmlFor="postgresql-answer-password">
                  Senha da resposta
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="postgresql-answer-password"
                    type="password"
                    value={answerPassword}
                    onChange={(event) => {
                      setAnswerPassword(event.target.value);
                      setAnswerPasswordError(false);
                    }}
                    className="min-h-11 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
                    placeholder="Digite a senha"
                    autoComplete="off"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="min-h-11 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300"
                  >
                    Liberar resposta
                  </button>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  Use o padrão informado pelo professor: prefixo da lista mais o número da questão.
                </p>
                {answerPasswordError && (
                  <p className="mt-3 text-sm font-semibold text-rose-300">
                    Senha incorreta para esta questão.
                  </p>
                )}
              </form>
            ) : (
              <pre className="whitespace-pre-wrap rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm leading-7 text-slate-200">
                {getPostgresqlExerciseAnswer(block.slug, selectedExercise.index, selectedExercise.exercise)}
              </pre>
            )}
          </div>
        </div>
      )}

      {selectedDiagram && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="postgresql-mer-title"
        >
          <div className="glass max-h-[92vh] w-full max-w-7xl overflow-y-auto rounded-2xl p-5 shadow-2xl md:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
                  Exercício {String(selectedDiagram.number).padStart(2, "0")}
                </p>
                <h2 id="postgresql-mer-title" className="text-2xl font-semibold text-slate-100">
                  Diagrama MER
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDiagram(null)}
                className="rounded-xl border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-amber-300 hover:text-amber-100"
              >
                Fechar
              </button>
            </div>

            <div className="mb-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-sm leading-relaxed text-slate-300">{selectedDiagram.question}</p>
            </div>

            <MerDiagram diagram={selectedDiagram.exercise.diagram} />
          </div>
        </div>
      )}
    </section>
  );
}
