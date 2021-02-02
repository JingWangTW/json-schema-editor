import React from "react";
import { Button, Modal } from "react-bootstrap";

interface EditorOptionModalProps {
    children: JSX.Element;
    resetOptionFiledForm(): void;
}

interface EditorOptionModalState {
    isOptionModalShow: boolean;
}

class EditorOptionModal extends React.Component<EditorOptionModalProps, EditorOptionModalState> {
    constructor(props: EditorOptionModalProps) {
        super(props);

        this.state = {
            isOptionModalShow: false,
        };
    }

    setDisplayOptionModal(show: boolean): void {
        this.setState({ isOptionModalShow: show });
    }

    render(): JSX.Element {
        return (
            <Modal
                onHide={this.setDisplayOptionModal.bind(this, false)}
                show={this.state.isOptionModalShow}
                size="lg"
                aria-labelledby="option-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="option-modal">Advanced Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.children}</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outline-secondary"
                        // onClick={this.resetOptionFiledForm.bind(this)}
                    >
                        Clear
                    </Button>
                    <Button variant="outline-success" onClick={this.setDisplayOptionModal.bind(this, false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default EditorOptionModal;
