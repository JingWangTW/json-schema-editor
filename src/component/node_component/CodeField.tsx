import "@uiw/react-textarea-code-editor/dist.css";

import dynamic from "next/dynamic";
import React from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { TiPencil } from "react-icons/ti";

import { CodeFieldValue } from "./type_NodeComponent";

const CodeEditor = dynamic(() => import("@uiw/react-textarea-code-editor").then(mod => mod.default), { ssr: false });

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
            <InputGroup>
                <Form.Control
                    type="text"
                    onChange={(e): void => {
                        this.props.update(e.target.value as CodeFieldValue);
                    }}
                    value={this.props.value}
                />

                <Button variant="outline-primary" onClick={this.setDisplayCodeModal.bind(this, true)}>
                    <TiPencil />
                </Button>
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
                            <CodeEditor
                                value={this.props.value}
                                language="json"
                                placeholder="Please enter JSON here."
                                onChange={(e): void => {
                                    this.props.update(e.target.value as CodeFieldValue);
                                }}
                                padding={15}
                                style={{
                                    fontSize: 12,
                                    backgroundColor: "#f5f5f5",
                                    fontFamily:
                                        "'Courier New',ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                                }}
                                data-color-mode="dark"
                            />
                            {/* <AceEditor
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
                            /> */}
                        </Form.Group>
                    </Modal.Body>
                </Modal>
            </InputGroup>
        );
    }
}

export default CodeField;
