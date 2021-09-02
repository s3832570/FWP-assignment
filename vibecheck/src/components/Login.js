import useLogin from '../hooks/useLogin';
import { Form, Button } from 'react-bootstrap';
import "../containers/Login.css";

function Login(props) {

    const {
        handleChange,
        handleSubmit,
        values,
        error
    } = useLogin(login, props);

    function login() {
        console.log("hello");
    }

return (
    <div className="Login">
        <div className="Details">
        <Form>
            <Form.Group className="username" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="username"
                name="username"
                placeholder="Username"
                value={values.username || ''}
                onChange={handleChange}
            />
            </Form.Group>

            <Form.Group className="password" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                defaultValue={values.password}
                onChange={handleChange}
            />
            </Form.Group>

            <Button
            className="submit"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            >
            Login
            </Button>
            <Form.Group className="SignUp-link">
            <Form.Text>Don't have an account? Sign up <a href='/signup'>here</a>
            </Form.Text>
            {/* <Link to='./signup' component={SignUp}>here</Link> */}
            {/* <Router>
                <Route path="/signup" component={SignUp} />
            </Router> */}
            </Form.Group>
        </Form>
        {error && (
            <p className="help is-danger">{error}</p>
        )}
        </div>
    </div>
    );
}
  
export default Login;