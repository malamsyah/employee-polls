import { Row, Container, Col } from "react-bootstrap";
import { connect } from "react-redux";
import QuestionsCard from "./QuestionsCard";

const HomePage = (props) => {
  return (
    <Container>
      <h1>New Questions</h1>
      <Container>
        <Row xs={1} md={3} className="g-3">
          {props.newQuestions.map((id) => (
            <Col key={id}>
              <QuestionsCard id={id} />
            </Col>
          ))}
        </Row>
      </Container>
      <h1>Done</h1>
      <Container>
        <Row xs={1} md={3} className="g-3">
          {props.oldQuestions.map((id) => (
            <Col key={id}>
              <QuestionsCard id={id} />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    newQuestions: state.questions.nonAnswered,
    oldQuestions: state.questions.answered,
  };
};

export default connect(mapStateToProps)(HomePage);
