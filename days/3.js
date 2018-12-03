const { getInput } = require('./utils');

const rightTopRegex = /\d+,\d+/g;
const widthHeightRegex = /\d+x\d+/g;
const idRegex = /#\d+/g;

const logOutput = async () => {
  const dayInput = await getInput('3');

  const sizeTries = dayInput
    .split('\n')
    .map(e => {
      const edges = e.match(rightTopRegex);
      const sizes = e.match(widthHeightRegex);
      const ids = e.match(idRegex);

      if (!edges || !sizes) return console.log('empty line', e);

      const [left, top] = edges[0].split(',').map(f => Number.parseInt(f, 10));
      const [width, height] = sizes[0]
        .split('x')
        .map(f => Number.parseInt(f, 10));

      return { left, top, width, height, id: ids[0] };
    })
    .filter(Boolean);

  const maxHeight = Math.max(...sizeTries.map(e => e.top + e.height));
  const maxWidth = Math.max(...sizeTries.map(e => e.left + e.width));
  // console.log('maxwidth, maxheight', maxWidth, maxHeight);

  const matrix = {};
  for (let i = 0; i <= maxWidth; i++) {
    for (let j = 0; j <= maxHeight; j++) {
      matrix[`${i}x${j}`] = 0;
    }
  }

  sizeTries.forEach(e => {
    const { left, top, height, width } = e;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        matrix[`${i + left}x${j + top}`]++;
      }
    }
  });

  console.log(
    'in^2 >= 2: ',
    Object.values(matrix).reduce((sum, e) => (e > 1 ? sum + 1 : sum), 0)
  );

  const foundUntouched = sizeTries.reduce(
    (resultant, e) => {
      const { left, top, height, width, id } = e;
      let untouched = true;

      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          if (matrix[`${i + left}x${j + top}`] > 1) untouched = false;
        }
      }

      return { id: untouched ? id : resultant.id };
    },
    { id: null }
  );

  console.log('untouchedId: ', foundUntouched.id);
};

logOutput();
