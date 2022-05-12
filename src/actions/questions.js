import { showLoading, hideLoading } from "react-redux-loading-bar";
import { getInitialData } from "../utils/index";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const GROUP_QUESTIONS = "GROUP_QUESTIONS";
export const VOTE_QUESTION = "VOTE_QUESTION";

export const OPTION_ONE = "optionOne";
export const OPTION_TWO = "optionTwo";

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

export function answerQuestion(username, questionId, answer) {
  return {
    type: VOTE_QUESTION,
    username: username,
    questionId: questionId,
    answer: answer,
  };
}

export function handleSaveAnswer(username, questionId, answer) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    return getInitialData().then(() => {
      dispatch(answerQuestion(username, questionId, answer));
      dispatch(groupQuestions(username));
      dispatch(hideLoading());
    });
  };
}
