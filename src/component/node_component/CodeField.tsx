import React from "react";
import AceEditor from "react-ace";
import { Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap";
import { TiPencil } from "react-icons/ti";

require("ace-builds/src-noconflict/mode-json");
require("ace-builds/src-noconflict/theme-terminal");

interface CodeFieldProps {
    title: string;

    value: string;
    update(value: string): void;
}

interface CodeFieldState {
    isShowModal: boolean;
}

class CodeField extends React.Component<CodeFieldProps, CodeFieldState> {
    constructor(props: CodeFieldProps) {
        super(props);

        this.state = {
            isShowModal: false,
        };
    }

    setDisplayCodeModal(isShowModal: boolean): void {
        this.setState({ isShowModal });
    }

    render(): JSX.Element {
        return (
            <>
                <FormControl
                    type="text"
                    onChange={(e): void => {
                        this.props.update(e.target.value);
                    }}
                    value={this.props.value}
                />
                <InputGroup.Append>
                    <Button variant="outline-primary" onClick={this.setDisplayCodeModal.bind(this, true)}>
                        <TiPencil />
                    </Button>
                </InputGroup.Append>
                <Modal
                    onHide={this.setDisplayCodeModal.bind(this, false)}
                    show={this.state.isShowModal}
                    size="lg"
                    aria-labelledby="code-modal"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="code-modal">{this.props.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <AceEditor
                                placeholder="Placeholder Text"
                                width="100%"
                                mode="json"
                                theme="terminal"
                                name="Code"
                                onChange={this.props.update}
                                fontSize={14}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                value={this.props.value}
                                setOptions={{
                                    enableBasicAutocompletion: false,
                                    enableLiveAutocompletion: false,
                                    enableSnippets: false,
                                    showLineNumbers: true,
                                    tabSize: 4,
                                }}
                            />
                        </Form.Group>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default CodeField;
