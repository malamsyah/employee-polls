export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const GROUP_QUESTIONS = "GROUP_QUESTIONS";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function groupQuestions(username) {
  return {
    type: GROUP_QUESTIONS,
    username: username,
  };
}
