import {
  RECEIVE_QUESTIONS,
  GROUP_QUESTIONS,
  VOTE_QUESTION,
} from "../actions/questions";

export default function questions(
  state = { byId: {}, allIds: [], answered: [], nonAnswered: [] },
  action
) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      const allIds = [...state.allIds, ...Object.keys(action.questions)];

      const sortedIds = uniq(allIds)
        .map((id) => {
          const question = action.questions[id];
          return question;
        })
        .sort((a, b) => a.timestamp - b.timestamp)
        .reduce((prev, curr, idx, arr) => {
          return [...prev, arr[idx].id];
        }, []);

      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.questions,
        },
        allIds: sortedIds,
      };
    case GROUP_QUESTIONS:
      const groupedQuestions = state.allIds.reduce(
        (prev, curr, idx, arr) => {
          let question = state.byId[curr];
          if (
            question.optionOne.votes.includes(action.username) ||
            question.optionTwo.votes.includes(action.username)
          ) {
            return {
              answered: [...prev.answered, curr],
              nonAnswered: [...prev.nonAnswered],
            };
          } else {
            return {
              answered: [...prev.answered],
              nonAnswered: [...prev.nonAnswered, curr],
            };
          }
        },
        { answered: [], nonAnswered: [] }
      );
      return {
        ...state,
        ...groupedQuestions,
      };
    case VOTE_QUESTION:
      console.log("action", action);
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.questionId]: {
            ...state.byId[action.questionId],
            [action.answer]: {
              ...state.byId[action.questionId][action.answer],
              votes: [
                ...state.byId[action.questionId][action.answer].votes,
                action.username,
              ],
            },
          },
        },
      };
    default:
      return state;
  }
}

function uniq(a) {
  return Array.from(new Set(a));
}
