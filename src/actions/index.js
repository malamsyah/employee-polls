import { getInitialData } from "../utils/index";
import { receiveUsers } from "./users";
import { groupQuestions, receiveQuestions } from "./questions";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function handleInitialData() {
  return (dispatch, getState) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      const { authedUser } = getState();
      if (authedUser != null) {
        dispatch(groupQuestions(authedUser));
      }
      dispatch(hideLoading());
    });
  };
}
