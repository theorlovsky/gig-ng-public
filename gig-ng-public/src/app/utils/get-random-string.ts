export const getRandomString = (): string => {
  return Math.random().toString(36).substr(2);
};
