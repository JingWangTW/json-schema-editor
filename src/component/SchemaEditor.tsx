import React from 'react';
import { Button } from 'react-bootstrap';

class SchemaEditor extends React.Component {

    constructor(props: any) {

        super(props);

        this.state = {
            showExport: false,
            exportString: ""
        };
    }

    render() {

        return (
            <div className="my-3 mx-4 ">
                <input type="file" id="file-uploader" data-target="file-uploader" hidden />

                <Button variant="outline-primary"> Import from file</Button> {' '}
                <Button variant="outline-success"> Export Schema</Button>

            </div>

        );
    }
}

export default SchemaEditor;