import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import SchemaEditor from './layout/SchemaEditor';

class App extends React.Component {

    private schemaEditorRef: React.RefObject<SchemaEditor>;

    constructor(props: any) {

        super(props);

        this.schemaEditorRef = React.createRef<SchemaEditor>();
    }

    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="">JSON Schema Editor</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <a href="https://github.com/JingWangTW/json-schema-editor" target="_blank" rel="noopener noreferrer">
                                <img height="30px" src="https://github.com/fluidicon.png" alt="Github ICON" />
                            </a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <div className="my-3 mx-4">
                    <Button variant="outline-primary">Import from file</Button> {' '}
                    <Button variant="outline-success">View schema in source</Button>
                    <SchemaEditor />
                </div>
            </>
        )
    }
}

export default App;
