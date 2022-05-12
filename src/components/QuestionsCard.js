import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { formatDate } from "../utils";

const QuestionCard = (props) => {
  return (
    <Card border="primary">
      <Card.Header>{props.question.author}</Card.Header>
      <Card.Body>
        <Card.Text>{formatDate(props.question.timestamp)}</Card.Text>
        <Button variant="primary">Show</Button>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = ({ questions }, { id }) => {
  const question = questions.byId[id];
  console.log(question, id);
  return {
    question,
  };
};

export default connect(mapStateToProps)(QuestionCard);
