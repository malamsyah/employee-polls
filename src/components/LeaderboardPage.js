import { connect } from "react-redux";

import { Container, Table } from "react-bootstrap";

const LeaderboardPage = ({ summary }) => {
  console.log(summary);
  return (
    <Container>
      <div className="whitebox-inner">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th style={{ width: "60%" }}>Users</th>
              <th>Answered</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((sum) => (
              <tr key={sum.id}>
                <td>
                  <img
                    style={{ width: "20px" }}
                    src={sum.avatarURL}
                    alt={`Avatar of ${sum.name}`}
                    className="rounded-circle"
                  />{" "}
                  {sum.name}
                </td>
                <td>{sum.answered}</td>
                <td>{sum.created}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

const mapStateToProps = ({ questions, users }) => {
  const summaryCreated = questions.allIds.reduce((prev, curr, idx, arr) => {
    let count = prev[questions.byId[curr].author];
    if (count) {
      count += 1;
    } else {
      count = 1;
    }

    return { ...prev, [questions.byId[curr].author]: count };
  }, {});

  const summaryAnswered = questions.allIds
    .reduce((prev, curr, idx, arr) => {
      return [
        ...prev,
        ...questions.byId[curr].optionOne.votes,
        ...questions.byId[curr].optionTwo.votes,
      ];
    }, [])
    .reduce((prev, curr, idx, arr) => {
      let count = prev[curr];
      if (count) {
        count += 1;
      } else {
        count = 1;
      }
      return { ...prev, [curr]: count };
    }, {});

  const summary = Object.keys(users).reduce((prev, curr, idx, arr) => {
    return [
      ...prev,
      {
        id: users[curr].id,
        name: users[curr].name,
        avatarURL: users[curr].avatarURL,
        answered: summaryAnswered[curr] ? summaryAnswered[curr] : 0,
        created: summaryCreated[curr] ? summaryCreated[curr] : 0,
      },
    ];
  }, []);

  return {
    summary,
  };
};

export default connect(mapStateToProps)(LeaderboardPage);
