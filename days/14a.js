const scoreBoard = '37'.split('').map(Number);
let elfIndex1 = 0;
let elfIndex2 = 1;
let i = 1;

const iterateMovement = () => {
  const elf1Score = scoreBoard[elfIndex1];
  const elf2Score = scoreBoard[elfIndex2];

  const combinedScore = `${elf1Score + elf2Score}`.split('').map(Number);

  scoreBoard.push(...combinedScore);

  elfIndex1 = (elfIndex1 + elf1Score + 1) % scoreBoard.length;
  elfIndex2 = (elfIndex2 + elf2Score + 1) % scoreBoard.length;
  i += combinedScore.length;
};

const testNextTenFromIndex = input => {
  let found = null;

  while (!found) {
    found = scoreBoard
      .slice(-8)
      .join('')
      .match(input);

    iterateMovement();
    if (!(i % 100000)) console.log(i);
  }
  console.log(found, i - 8 + found.index);
};

testNextTenFromIndex('825401');
