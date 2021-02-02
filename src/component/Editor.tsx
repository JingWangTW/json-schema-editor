import React from "react";
import { Button } from "react-bootstrap";

import ObjectSchemaEditor from "./schema_editor/ObjectSchemaEditor";

class Editor extends React.Component {
    constructor(props: never) {
        super(props);

        this.state = {
            showExport: false,
            exportString: "",
        };
    }

    nullFunction(): void {}

    render(): JSX.Element {
        return (
            <div className="my-3 mx-4 ">
                <input type="file" id="file-uploader" data-target="file-uploader" hidden />
                <Button variant="outline-primary"> Import from file</Button> <Button variant="outline-success"> Export Schema</Button>
                <ObjectSchemaEditor depth={0} selfId="0" hasSibling={false} changeType={this.nullFunction} changeName={this.nullFunction} />
            </div>
        );
    }
}

export default Editor;
