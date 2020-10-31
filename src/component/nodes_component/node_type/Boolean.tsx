import React from 'react';

import Node from '../Node';

class Boolean extends Node {

    constructor(props: any) {

        super({ ...props, optionExist: false });

        this.option = []
    }

    OptionModal(): JSX.Element {
        return (
            <div></div>
        );
    }
}

export default Boolean;