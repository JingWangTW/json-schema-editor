import React from 'react';
import { Node, Type } from './data_type/DataType';
import Factory from './data_type/Factory';

class RootNode extends Node {

    private selfType: keyof typeof Type;

    constructor(props: any) {
        super({
            ...props,
            isDeleteAble: false,
            isOptionExist: false,
            fieldName: "root",
            hasChild: true,
        });

        this.selfType = Type.Object;
    }

    OptionModal(): JSX.Element {
        return (
            <div></div>
        );
    }

    changeType(): void {

    }
    // overriding
    render(): JSX.Element {
        return (
            <Factory
                type={this.selfType}
                isDeleteAble={false}
                fieldName={"root"}
            />
        )
    }
}

export default RootNode;