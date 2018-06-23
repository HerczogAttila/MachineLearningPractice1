export const notSets = [
  {input: [0], output: [1]},
  {input: [1], output: [0]}
];

export const andSets = [
  {input: [0, 0], output: [0]},
  {input: [1, 0], output: [0]},
  {input: [0, 1], output: [0]},
  {input: [1, 1], output: [1]}
];

export const orSets = [
  {input: [0, 0], output: [0]},
  {input: [1, 0], output: [1]},
  {input: [0, 1], output: [1]},
  {input: [1, 1], output: [1]}
];

export const nandSets = [
  {input: [0, 0], output: [1]},
  {input: [1, 0], output: [1]},
  {input: [0, 1], output: [1]},
  {input: [1, 1], output: [0]}
];

export const norSets = [
  {input: [0, 0], output: [1]},
  {input: [1, 0], output: [0]},
  {input: [0, 1], output: [0]},
  {input: [1, 1], output: [0]}
];

export const xorSets = [
  {input: [0, 0], output: [0]},
  {input: [1, 0], output: [1]},
  {input: [0, 1], output: [1]},
  {input: [1, 1], output: [0]}
];

export const xnorSets = [
  {input: [0, 0], output: [1]},
  {input: [1, 0], output: [0]},
  {input: [0, 1], output: [0]},
  {input: [1, 1], output: [1]}
];

export const logic = {not: 0, and: 1, or: 2, nand: 3, nor: 4, xor: 5, xnor: 6};

export const allLogicGateSets = [
  {input: [logic.not, 0, 0], output: [1]},
  {input: [logic.not, 0, 1], output: [1]},
  {input: [logic.not, 1, 0], output: [0]},
  {input: [logic.not, 1, 1], output: [0]},

  {input: [logic.and, 0, 0], output: [0]},
  {input: [logic.and, 1, 0], output: [0]},
  {input: [logic.and, 0, 1], output: [0]},
  {input: [logic.and, 1, 1], output: [1]},

  {input: [logic.or, 0, 0], output: [0]},
  {input: [logic.or, 1, 0], output: [1]},
  {input: [logic.or, 0, 1], output: [1]},
  {input: [logic.or, 1, 1], output: [1]},

  {input: [logic.nand, 0, 0], output: [1]},
  {input: [logic.nand, 1, 0], output: [1]},
  {input: [logic.nand, 0, 1], output: [1]},
  {input: [logic.nand, 1, 1], output: [0]},

  {input: [logic.nor, 0, 0], output: [1]},
  {input: [logic.nor, 1, 0], output: [0]},
  {input: [logic.nor, 0, 1], output: [0]},
  {input: [logic.nor, 1, 1], output: [0]},

  {input: [logic.xor, 0, 0], output: [0]},
  {input: [logic.xor, 1, 0], output: [1]},
  {input: [logic.xor, 0, 1], output: [1]},
  {input: [logic.xor, 1, 1], output: [0]},

  {input: [logic.xnor, 0, 0], output: [1]},
  {input: [logic.xnor, 1, 0], output: [0]},
  {input: [logic.xnor, 0, 1], output: [0]},
  {input: [logic.xnor, 1, 1], output: [1]}
];
