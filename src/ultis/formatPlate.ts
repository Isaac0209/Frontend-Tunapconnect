export function formatPlate(plate: string) {
  return plate.replace(/(\d{3})(\d{3})/, "$1-$2");
}
