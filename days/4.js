const { getInput } = require('./utils');

const guardRegex = /#\d+/;

const sortByDate = (a, b) => (a.slice(1, 17) > b.slice(1, 17) ? 1 : -1);

const logOutput = async () => {
  const dayInput = await getInput('4');

  const guardSchedules = dayInput
    .split('\n')
    .filter(Boolean)
    .sort(sortByDate);

  let guardID = '';

  const guardStats = guardSchedules.reduce((stats, guardEvent) => {
    const internalStats = { ...stats };
    const minute = Number.parseInt(guardEvent.slice(15, 17), 10);
    const foundGuard = guardEvent.match(guardRegex);

    if (foundGuard) {
      guardID = foundGuard[0].slice(1);

      if (!internalStats[guardID]) {
        internalStats[guardID] = { sessions: [], totalTime: 0 };
      }
    }

    if (guardEvent.includes('asleep')) {
      internalStats[guardID].start = minute;
    }

    if (guardEvent.includes('wakes')) {
      const { start } = internalStats[guardID];
      const time = minute - start;

      internalStats[guardID].totalTime += time;
      internalStats[guardID].sessions.push([start, minute]);
      internalStats[guardID].start = null;
    }

    return internalStats;
  }, {});

  const bigBoy = Object.keys(guardStats).reduce(
    (maxGuard, id) => {
      if (guardStats[id].totalTime > maxGuard.totalTime) {
        return { id, ...guardStats[id] };
      }

      return maxGuard;
    },
    { totalTime: 0 }
  );

  const minuteCounts = Array(60)
    .fill(0)
    .map((_, i) => {
      let count = 0;
      bigBoy.sessions.forEach(session => {
        const [start, end] = session;
        if (i < end && i >= start) count++;
      });
      return count;
    });

  console.log(bigBoy.id, minuteCounts.map((count, i) => ({ [i]: count })));
};

logOutput();
