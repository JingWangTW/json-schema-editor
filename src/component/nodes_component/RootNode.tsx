import React from 'react';
import nextId from "react-id-generator";

import { Type } from './data_type/DataType';
import Factory from './data_type/Factory';
class RootNode extends React.Component {

    selfType: keyof typeof Type;

    constructor(props: any) {
        super(props);

        this.selfType = Type.Object;
    }

    changeType(keyId: string, type: keyof typeof Type): void {

        this.selfType = type;
        this.forceUpdate()

    }

    render(): JSX.Element {

        return (
            <Factory
                key={nextId("childId")}
                keyId={nextId("childId")}
                depth={0}
                type={this.selfType}
                isDeleteAble={false}
                fieldName={"root"}
                changeType={this.changeType.bind(this)}
                hasSibling={false}
            />
        )
    }
}

export default RootNode;