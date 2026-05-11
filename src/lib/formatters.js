export function formatCurrency(value) {
  if (value == null || isNaN(value)) return "R$ 0,00";
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatPercent(value) {
  if (value == null || isNaN(value)) return "0%";
  return `${value.toFixed(1)}%`;
}

export const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export function getMesAtual() {
  return MESES[new Date().getMonth()];
}

export function getAnoAtual() {
  return new Date().getFullYear();
}
