import { connect } from "react-redux";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleLogoutAction } from "../actions/authedUser";
import { Link } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const Navigation = (props) => {
  const { location } = props.router;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav activeKey={location.pathname} className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/leaderboard">
              Leaderboard
            </Nav.Link>
            <Nav.Link as={Link} to="/new">
              New
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="#">
              {props.name}
            </Nav.Link>
            <Nav.Link as={Link} to="#" onClick={props.onLogoutClick}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    name: users[authedUser].name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutClick: () => {
      dispatch(handleLogoutAction());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Navigation)
);
