import React from "react";
import { Container, Navbar } from "react-bootstrap";

import Editor from "./Editor";

class App extends React.Component {
    render(): JSX.Element {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container fluid>
                        <Navbar.Brand href="">JSON Schema Editor</Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <a href="https://github.com/JingWangTW/json-schema-editor" target="_blank" rel="noopener noreferrer">
                                    <img height="30px" src="https://github.com/fluidicon.png" alt="Github ICON" />
                                </a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Editor />
            </>
        );
    }
}

export default App;
