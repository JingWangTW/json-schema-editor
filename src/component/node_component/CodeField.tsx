import React from "react";
import AceEditor from "react-ace";
import { Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap";
import { TiPencil } from "react-icons/ti";

import { CodeFieldValue } from "./type_NodeComponent";

require("ace-builds/src-noconflict/mode-json");
require("ace-builds/src-noconflict/theme-terminal");

interface CodeFieldProps {
    title: string;

    value: CodeFieldValue;
    update(value: CodeFieldValue): void;
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
                        this.props.update(e.target.value as CodeFieldValue);
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
                                onChange={(e): void => {
                                    this.props.update(e as CodeFieldValue);
                                }}
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
