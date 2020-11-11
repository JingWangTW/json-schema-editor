import React from 'react';
import { Type } from './data_type/DataType';
import Factory from './data_type/Factory';
class RootNode extends React.Component {

    selfType: keyof typeof Type;

    constructor(props: any) {
        super(props);

        this.selfType = Type.Object;
    }

    changeType(type: keyof typeof Type): void {

        this.selfType = type;
        this.forceUpdate()

    }
    // overriding
    render(): JSX.Element {
        return (
            <Factory
                key={this.selfType}
                depth={0}
                type={this.selfType}
                isDeleteAble={false}
                fieldName={"root"}
                changeType={this.changeType.bind(this)}
            />
        )
    }
}

export default RootNode;