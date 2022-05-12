import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { formatDate } from "../utils";
import { useNavigate } from "react-router-dom";

const QuestionCard = (props) => {
  const navigate = useNavigate();

  const toDetails = (e, id) => {
    e.preventDefault();

    navigate(`/questions/${id}`);
  };

  return (
    <Card border="primary">
      <Card.Header>{props.question.author}</Card.Header>
      <Card.Body>
        <Card.Text>{formatDate(props.question.timestamp)}</Card.Text>
        <Button
          variant="primary"
          onClick={(e) => toDetails(e, props.question.id)}
        >
          Show
        </Button>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = ({ questions }, { id }) => {
  const question = questions.byId[id];
  return {
    question,
  };
};

export default connect(mapStateToProps)(QuestionCard);
