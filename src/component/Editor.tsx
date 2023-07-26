import Ajv from "ajv";
import draft_06_meta from "ajv/dist/refs/json-schema-draft-06.json";
import React from "react";
import { Button, Toast } from "react-bootstrap";

import { ISchemaType } from "../model/schema/type_schema";
import { NextId } from "../model/utility";
import RootSchemaEditor from "./schema_editor/RootSchemaEditor";
import { EmptyProps } from "./type_component";

interface IEditorState {
    error?: string;
    schema?: ISchemaType;
}

class Editor extends React.Component<EmptyProps, IEditorState> {
    private fileUploadRef: React.RefObject<HTMLInputElement>;
    private editorRef: React.RefObject<RootSchemaEditor>;
    private rootSchemaEditorKey: string;

    constructor(props: EmptyProps) {
        super(props);

        this.fileUploadRef = React.createRef<HTMLInputElement>();
        this.editorRef = React.createRef<RootSchemaEditor>();

        this.rootSchemaEditorKey = NextId.next("key").toString();

        this.state = {};
    }

    toggleImport(): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.fileUploadRef.current!.click();
    }

    async import(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        if (event.target.files) {
            try {
                const text = await event.target.files[0].text();
                const schema = JSON.parse(text);

                const validator = new Ajv();
                validator.addMetaSchema(draft_06_meta);

                const result = validator.validateSchema(schema);

                if (!result) {
                    this.setState({
                        error: "Parsing Schema Error! We only support draft-06/07",
                    });
                } else {
                    this.rootSchemaEditorKey = NextId.next("key").toString();
                    this.setState({ schema });
                }
            } catch (error) {
                this.setState({
                    error: "Parsing Schema Error! Please check your schema.",
                });
            }
        }
    }

    export(): void {
        try {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const schema = this.editorRef.current!.exportSchema();

            const fileBlob = new Blob([JSON.stringify(schema, null, 4)], {
                type: "application/schema+json",
            });
            const blobURL = window.URL.createObjectURL(fileBlob);

            const anchorElement = document.createElement("a");
            anchorElement.href = blobURL;
            anchorElement.setAttribute("download", "Schema.json");
            document.body.appendChild(anchorElement);
            anchorElement.click();

            document.body.removeChild(anchorElement);
        } catch (e) {
            this.setState({
                error: `Find Error: ${e.message} Please check and export again.`,
            });
        }
    }

    render(): JSX.Element {
        return (
            <div className="my-3 mx-4 ">
                <input
                    type="file"
                    id="file-uploader"
                    data-target="file-uploader"
                    hidden
                    ref={this.fileUploadRef}
                    onChange={this.import.bind(this)}
                />
                <Button variant="outline-primary" onClick={this.toggleImport.bind(this)}>
                    Import from file
                </Button>{" "}
                <Button variant="outline-success" onClick={this.export.bind(this)}>
                    Export Schema
                </Button>
                <RootSchemaEditor ref={this.editorRef} key={this.rootSchemaEditorKey} schema={this.state.schema} />
                {this.state.error && (
                    <Toast
                        show={this.state.error ? true : false}
                        onClose={(): void => {
                            this.setState({ error: undefined });
                        }}
                        delay={3000}
                        autohide
                        style={{
                            position: "absolute",
                            bottom: "20px",
                            right: "20px",
                            borderColor: "red",
                            color: "red",
                        }}
                    >
                        <Toast.Header style={{ borderColor: "red", color: "red" }}>
                            <strong className="mr-auto">Error</strong>
                        </Toast.Header>
                        <Toast.Body>{this.state.error}</Toast.Body>
                    </Toast>
                )}
            </div>
        );
    }
}

export default Editor;
