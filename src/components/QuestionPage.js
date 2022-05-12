import { Card, Col, Button, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleSaveAnswer, OPTION_ONE, OPTION_TWO } from "../actions/questions";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = (props) => {
  const navigate = useNavigate();

  const handleVote = (e, answer) => {
    e.preventDefault();
    props.dispatch(
      handleSaveAnswer(props.authedUser, props.question.id, answer)
    );
    navigate("/");
  };
  return (
    <div className="question-wrapper">
      <div className="question-inner">
        <div className="question-profile">
          <img
            src={props.user.avatarURL}
            alt={`Avatar of ${props.user.name}`}
            className="rounded-circle"
          />
          <p>Poll by {props.user.name}</p>
        </div>
        <div className="question-content">
          <p>Would You Rather:</p>
          <Row>
            <Col>
              <Card className="text-center" border="primary">
                <Card.Header>Option One</Card.Header>
                <Card.Body>
                  <Card.Text>{props.question.optionOne.text}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={(e) => handleVote(e, OPTION_ONE)}
                    disabled={props.isAnswered}
                  >
                    Vote
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="text-center" border="primary">
                <Card.Header>Option Two</Card.Header>
                <Card.Body>
                  <Card.Text>{props.question.optionTwo.text}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={(e) => handleVote(e, OPTION_TWO)}
                    disabled={props.isAnswered}
                  >
                    Vote
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, { router }) => {
  const question = questions.byId[router.params.id];
  const user = users[question.author];
  const isAnswered = questions.answered.includes(router.params.id);
  return {
    authedUser,
    question,
    user,
    isAnswered,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
