import { getInitialData } from "../utils/index";
import { receiveUsers } from "./users";
import { groupQuestions, receiveQuestions } from "./questions";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { handleLoginAction } from "./authedUser";

export function handleInitialData() {
  return (dispatch, getState) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      //TODO: Remove this before submitting
      dispatch(handleLoginAction("admin", "admin"));
      const { authedUser } = getState();
      if (authedUser != null) {
        dispatch(groupQuestions(authedUser));
      }
      dispatch(hideLoading());
    });
  };
}
