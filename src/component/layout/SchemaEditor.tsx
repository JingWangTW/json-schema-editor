import React from 'react';
import { Modal, Button, Toast } from 'react-bootstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';

import * as hljs from 'react-syntax-highlighter/dist/esm/styles/hljs';

import RootNode from '../nodes_component/RootNode';

interface SchemaEditorState {
    showExport: boolean;
    showImport: boolean;
    showErrorToast: boolean;
    exportString: string;
}

class SchemaEditor extends React.Component<{}, SchemaEditorState> {

    private rootNode: any;
    private rootNodeRef: React.RefObject<RootNode>;

    constructor(props: any) {
        super(props);

        this.rootNodeRef = React.createRef<RootNode>();
        this.rootNode = <RootNode ref={this.rootNodeRef} />

        this.state = {
            showExport: false,
            showImport: false,
            showErrorToast: false,
            exportString: ""
        }
    }

    toggleImport(show: boolean): void {

        this.setState({ showImport: show });

    }

    toggleExport(show: boolean): void {

        if (show) {

            try {
                const schema = this.rootNodeRef.current!.exportSchemaObj();
                this.setState({
                    exportString: JSON.stringify(schema, null, 4),
                    showExport: true
                })
            } catch (error) {
                this.setState({
                    showErrorToast: true
                })

            }

        } else {

            this.setState({ showExport: false });

        }
    }

    saveSchema(): void {

        const fileBlob = new Blob([this.state.exportString], { type: 'application/json' });
        const blobURL = window.URL.createObjectURL(fileBlob);

        const anchorElement = document.createElement('a');
        anchorElement.href = blobURL;
        anchorElement.setAttribute('download', "Schema.json");
        document.body.appendChild(anchorElement);
        anchorElement.click();

        document.body.removeChild(anchorElement);
    }

    render() {

        return (
            <div className="my-3 mx-4 ">
                <Button variant="outline-primary" onClick={this.toggleImport.bind(this, true)}>Import from file</Button> {' '}
                <Button variant="outline-success" onClick={this.toggleExport.bind(this, true)}>Export Schema</Button>
                <div>
                    {this.rootNode}
                    {/* <RootNode ref={this.rootNodeRef} /> */}
                </div>

                <Modal size="xl" scrollable show={this.state.showExport} onHide={this.toggleExport.bind(this, false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Export</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ maxHeight: "80%" }}>
                            <SyntaxHighlighter language="json" style={hljs.vs2015} showLineNumbers={true}>
                                {this.state.exportString}
                            </SyntaxHighlighter>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-success" onClick={this.saveSchema.bind(this)}>Save</Button>
                    </Modal.Footer>
                </Modal>

                <Toast
                    show={this.state.showErrorToast}
                    delay={3000}
                    autohide style={{
                        position: 'absolute',
                        bottom: "20px",
                        right: "20px",
                    }}>
                    <Toast.Header>
                        <strong className="mr-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>There's still some errors in your schema!<br /> Please check and try again!</Toast.Body>
                </Toast>

            </div>

        );
    }
}

export default SchemaEditor;