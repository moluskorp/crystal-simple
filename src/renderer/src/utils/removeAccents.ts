export function removeAccents(palavra: string): string {
  return palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}