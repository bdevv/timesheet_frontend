export const DAYS_ARRAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const TRAPEZOIDS = [1, 2, 3, 4, 5, 6, 7];

/*
 *  +--d1--+
 *  |      |
 * d2      d3
 *  |      |
 *  +--d4--+
 *  |      |
 * d5      d6
 *  |      |
 *  +--d7--+
 */
export const ACTIVE_LINES_BY_NUMBER = {
  0: [1, 2, 3, 5, 6, 7],
  1: [3, 6],
  2: [1, 3, 4, 5, 7],
  3: [1, 3, 4, 6, 7],
  4: [2, 3, 4, 6],
  5: [1, 2, 4, 6, 7],
  6: [1, 2, 4, 5, 6, 7],
  7: [1, 3, 6],
  8: [1, 2, 3, 4, 5, 6, 7],
  9: [1, 2, 3, 4, 6, 7],
};

export const CLOCK_SIZES = {
  small: { width: "200px", height: "80px" },
  medium: { width: "250px", height: "110px" },
  big: { width: "300px", height: "140px" },
};
