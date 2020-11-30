import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';

import * as hljs from 'react-syntax-highlighter/dist/esm/styles/hljs';

import RootNode from '../nodes_component/RootNode';

interface SchemaEditorState {
    showExport: boolean;
    showImport: boolean;
    exportString: string;
}

class SchemaEditor extends React.Component<{}, SchemaEditorState> {

    private rootNodeRef: React.RefObject<RootNode>;

    constructor(props: any) {
        super(props);

        this.rootNodeRef = React.createRef<RootNode>();

        this.state = {
            showExport: false,
            showImport: false,
            exportString: ""
        }
    }

    toggleImport(show: boolean): void {

        this.setState({ showImport: show });

    }

    toggleExport(show: boolean): void {

        if (show) {
            const schema = this.rootNodeRef!.current!.exportSchemaObj();
            this.setState({
                exportString: JSON.stringify(schema, null, 4),
                showExport: show
            })

        } else {

            this.setState({ showExport: show });

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
                    <RootNode ref={this.rootNodeRef} />
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


            </div>

        );
    }
}

export default SchemaEditor;