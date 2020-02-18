export const chunk = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (v, i) => {
    const from = i * size;
    const to = from + size;

    return array.slice(from, to);
  });
};
