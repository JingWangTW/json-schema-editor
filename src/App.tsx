import React from 'react';
import { Navbar, Row, Col } from 'react-bootstrap';

class App extends React.Component {

    App() {

    }

    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="">JSON Schema Editor</Navbar.Brand>
                </Navbar>
                <div className="p-5">
                    <Row>
                        <Col md={12} lg={4} xl={3}>123</Col>
                        <Col md={12} lg={8} xl={9}>456</Col>
                    </Row>
                </div>
            </>
        )
    }
}

export default App;
