import React from 'react';

import SchemaComponent from './Node'

class ObjectNode extends SchemaComponent {

    constructor() {
        super({
            hasChild: true,
        });
    }
}

export default ObjectNode;