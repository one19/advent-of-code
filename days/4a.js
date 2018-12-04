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
      const guard = guardStats[id];

      const minuteCounts = Array(60)
        .fill(0)
        .map((_, i) => {
          let count = 0;

          guard.sessions.forEach(session => {
            const [start, end] = session;
            if (i < end && i >= start) count++;
          });

          return count;
        });

      const mostSleepsOnAMinute = Math.max(...minuteCounts);

      if (mostSleepsOnAMinute > maxGuard.mostSleepsOnAMinute) {
        const index = minuteCounts.findIndex(e => e === mostSleepsOnAMinute);
        return { id, mostSleepsOnAMinute, index };
      }

      return maxGuard;
    },
    { mostSleepsOnAMinute: 0 }
  );

  console.log(bigBoy);
};

logOutput();
