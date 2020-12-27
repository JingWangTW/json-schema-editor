import React from 'react';
import { Modal, Button, Toast } from 'react-bootstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Ajv from "ajv"
import draft_04_meta from 'ajv/lib/refs/json-schema-draft-04.json';
import draft_06_meta from 'ajv/lib/refs/json-schema-draft-06.json';

import * as hljs from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Schema from '../nodes_component/interface/Schema';
import RootNode from '../nodes_component/RootNode';

interface SchemaEditorState {
    showExport: boolean;
    errorMessage?: string;
    exportString: string;
    schema?: Schema;
}

class SchemaEditor extends React.Component<{}, SchemaEditorState> {

    private rootNode: any;
    private rootNodeRef: React.RefObject<RootNode>;
    private fileUploadRef: React.RefObject<HTMLInputElement>;

    constructor(props: any) {

        super(props);

        this.state = {
            showExport: false,
            exportString: ""
        };

        this.fileUploadRef = React.createRef<HTMLInputElement>();

        this.rootNodeRef = React.createRef<RootNode>();
        this.rootNode = <RootNode ref={this.rootNodeRef} schema={this.state.schema} />
    }

    toggleImport(show: boolean): void {

        this.fileUploadRef.current!.click();
    }

    async importSchema(event: React.ChangeEvent<HTMLInputElement>) {

        if (event.target.files) {

            try {

                const text = await event.target.files[0].text();
                const schema = JSON.parse(text);

                const validator = new Ajv({ schemaId: 'auto' });;
                validator.addMetaSchema(draft_06_meta)
                validator.addMetaSchema(draft_04_meta)

                const result = validator.validateSchema(schema);

                if (!result) {

                    this.setState({
                        errorMessage: "Parsing Schema Error! Please check your schema."
                    })

                } else {

                    this.setState({ schema });

                }

            } catch (error) {

                this.setState({
                    errorMessage: "Parsing Schema Error! We only support draft-04/06/07 "
                })
            }
        }
    }

    toggleExport(show: boolean): void {

        if (show) {

            try {
                const schema = this.rootNodeRef.current!.exportSchemaObj();
                this.setState({
                    exportString: JSON.stringify(schema, null, 4),
                    showExport: true,
                    errorMessage: undefined
                })
            } catch (error) {
                this.setState({
                    errorMessage: "There's still some errors in your schema! Please check and try again!"
                })

            }

        } else {

            this.setState({ showExport: false, errorMessage: undefined });

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
                <input type="file" id="file-uploader" data-target="file-uploader" hidden ref={this.fileUploadRef} onChange={this.importSchema.bind(this)} />

                <Button variant="outline-primary" onClick={this.toggleImport.bind(this, true)}>Import from file</Button> {' '}
                <Button variant="outline-success" onClick={this.toggleExport.bind(this, true)}>Export Schema</Button>
                <div>
                    {this.rootNode}
                    {/* <RootNode ref={this.rootNodeRef} schema={this.state.schema} /> */}
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

                {
                    this.state.errorMessage && (
                        <Toast
                            show={this.state.errorMessage ? true : false}
                            onClose={() => { this.setState({ errorMessage: undefined }) }}
                            delay={3000}
                            autohide
                            style={{
                                position: 'absolute',
                                bottom: "20px",
                                right: "20px",
                                borderColor: "red",
                                color: "red"
                            }}>
                            <Toast.Header style={{ borderColor: "red", color: "red" }}>
                                <strong className="mr-auto">Error</strong>
                            </Toast.Header>
                            <Toast.Body>{this.state.errorMessage}</Toast.Body>
                        </Toast>
                    )
                }



            </div>

        );
    }
}

export default SchemaEditor;