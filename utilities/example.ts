import { GameScoreValue } from 'models/example';

export function sortByHighestScore(scores: GameScoreValue[]) {
  return scores.sort(
    (a, b) => a.turnCount * a.elapsedTime - b.turnCount * b.elapsedTime
  );
}
