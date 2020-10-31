import React from 'react';

import SchemaComponent from './Node'

class ObjectNode extends SchemaComponent {

    constructor(props: any) {
        super({
            ...props,
            hasChild: true,
            optionExist: false,
        });
    }

    OptionModal(): JSX.Element {
        return (
            <div></div>
        );
    }
}

export default ObjectNode;