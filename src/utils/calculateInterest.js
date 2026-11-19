export const MAX_INTEREST_PERIODS = 1200;

export function calculateInterest({ capital, rate, periods, type }) {
  const c = Number(capital);
  const i = Number(rate) / 100;
  const n = Number(periods);
  if (!Number.isFinite(c) || !Number.isFinite(i) || !Number.isInteger(n) ||
    c <= 0 || i < 0 || n < 1 || n > MAX_INTEREST_PERIODS ||
    !["simples", "compostos"].includes(type)) return null;

  const linhas = [];
  for (let p = 1; p <= n; p += 1) {
    const montante = type === "simples" ? c * (1 + i * p) : c * (1 + i) ** p;
    if (!Number.isFinite(montante)) return null;
    linhas.push({ periodo: p, montante, jurosAcumulado: montante - c });
  }
  const final = linhas[linhas.length - 1];
  return { montanteFinal: final.montante, jurosTotal: final.jurosAcumulado, linhas };
}
