import React from "react";
import { Button } from "react-bootstrap";

import RootSchemaEditor from "./schema_editor/RootSchemaEditor";

class Editor extends React.Component {
    private editorRef: React.RefObject<RootSchemaEditor>;

    constructor(props: never) {
        super(props);

        this.editorRef = React.createRef<RootSchemaEditor>();

        this.state = {
            showExport: false,
            exportString: "",
        };
    }

    export(): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const schema = this.editorRef.current!.exportSchema();

        const fileBlob = new Blob([JSON.stringify(schema)], { type: "application/schema+json" });
        const blobURL = window.URL.createObjectURL(fileBlob);

        const anchorElement = document.createElement("a");
        anchorElement.href = blobURL;
        anchorElement.setAttribute("download", "Schema.json");
        document.body.appendChild(anchorElement);
        anchorElement.click();

        document.body.removeChild(anchorElement);
    }

    render(): JSX.Element {
        return (
            <div className="my-3 mx-4 ">
                <input type="file" id="file-uploader" data-target="file-uploader" hidden />
                <Button variant="outline-primary"> Import from file</Button>{" "}
                <Button variant="outline-success" onClick={this.export.bind(this)}>
                    Export Schema
                </Button>
                <RootSchemaEditor ref={this.editorRef} />
            </div>
        );
    }
}

export default Editor;
