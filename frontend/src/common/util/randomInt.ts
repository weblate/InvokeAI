const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default randomInt;

/*
 * Returns a random number within range [min,max]
 *
 * min and max must be multiples of multiple
 * (note that 0 is a multiple of all integers)
 */
export const randomMultiple = (min: number, max: number, multiple: number): number => {
  return (
    Math.floor(Math.random() * ((max - min) / multiple + 1)) * multiple + min
  );
};
