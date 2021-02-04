import React from "react";
import { Button } from "react-bootstrap";

import RootSchemaEditor from "./schema_editor/RootSchemaEditor";

class Editor extends React.Component {
    constructor(props: never) {
        super(props);

        this.state = {
            showExport: false,
            exportString: "",
        };
    }

    nullFunction(): void {
        // to make eslint happy
        console.log("eslint Happy");
    }

    render(): JSX.Element {
        return (
            <div className="my-3 mx-4 ">
                <input type="file" id="file-uploader" data-target="file-uploader" hidden />
                <Button variant="outline-primary"> Import from file</Button> <Button variant="outline-success"> Export Schema</Button>
                <RootSchemaEditor />
            </div>
        );
    }
}

export default Editor;
