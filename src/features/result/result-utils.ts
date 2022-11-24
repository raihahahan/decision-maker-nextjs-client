export function getWeight(weight: number): string {
  if (typeof weight != "number" || isNaN(weight)) {
    return "0";
  }

  return (weight / 100).toFixed(2);
}
