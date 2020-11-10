import React from 'react';
import { Type } from './data_type/DataType';
import Factory from './data_type/Factory';

class RootNode extends React.Component {

    private selfType: keyof typeof Type;

    constructor(props: any) {
        super(props);

        this.selfType = Type.Object;
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