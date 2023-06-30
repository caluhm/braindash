const savedReactionScoresKey = 'savedReactionScores';
const savedTypingScoresKey = 'saveTypingScores';
const savedSequenceScoresKey = 'savedSequenceScores';

type ReactionScore = {
  date: string;
  time: number;
};

type TypingScore = {
  date: string;
  wpm: number;
};

type SequenceScore = {
  date: string;
  level: number;
};

export const saveReactionScoreToLocalStorage = (scores: ReactionScore[], newScore: { date: string, time: number }) => {
  const key = savedReactionScoresKey;
  localStorage.setItem(key, JSON.stringify([...scores, newScore]));
}

export const loadReactionScoresFromLocalStorage = () => {
    const key = savedReactionScoresKey;
    const scores = localStorage.getItem(key);
    return scores ? (JSON.parse(scores)) : [];
}

export const saveTypingScoreToLocalStorage = (scores: TypingScore[], newScore: { date: string, wpm: number }) => {
  const key = savedTypingScoresKey;
  localStorage.setItem(key, JSON.stringify([...scores, newScore]));
}

export const loadTypingScoresFromLocalStorage = () => {
    const key = savedTypingScoresKey;
    const scores = localStorage.getItem(key);
    return scores ? (JSON.parse(scores)) : [];
}

export const saveSequenceScoreToLocalStorage = (scores: SequenceScore[], newScore: { date: string, level: number }) => {
  const key = savedSequenceScoresKey;
  localStorage.setItem(key, JSON.stringify([...scores, newScore]));
}

export const loadSequenceScoresFromLocalStorage = () => {
  const key = savedSequenceScoresKey;
  const scores = localStorage.getItem(key);
  return scores ? (JSON.parse(scores)) : [];
}