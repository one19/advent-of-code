const scoreBoard = '37'.split('').map(Number);
let elfIndex1 = 0;
let elfIndex2 = 1;

const iterateMovement = () => {
  const elf1Score = scoreBoard[elfIndex1];
  const elf2Score = scoreBoard[elfIndex2];

  const combinedScore = `${elf1Score + elf2Score}`.split('').map(Number);

  scoreBoard.push(...combinedScore);
  elfIndex1 = (elfIndex1 + elf1Score + 1) % scoreBoard.length;
  elfIndex2 = (elfIndex2 + elf2Score + 1) % scoreBoard.length;
};

const testNextTenFromIndex = index => {
  while (scoreBoard.length <= index + 20) {
    iterateMovement();
  }
  console.log(scoreBoard.slice(index, index + 10).join(''));
};

testNextTenFromIndex(5);
testNextTenFromIndex(18);
testNextTenFromIndex(2018);
testNextTenFromIndex(825401);
