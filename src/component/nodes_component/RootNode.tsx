import React from 'react';
import nextId from "react-id-generator";

import { Type, Node } from './data_type/DataType';
import Factory from './data_type/Factory';
class RootNode extends React.Component {

    private selfType: keyof typeof Type;
    private nodeRef: React.RefObject<Node>;

    constructor(props: any) {
        super(props);

        this.selfType = Type.Object;
        this.nodeRef = React.createRef<Node>();
    }

    changeType(keyId: string, type: keyof typeof Type): void {

        this.selfType = type;
        this.forceUpdate()

    }

    exportSchemaObj(): any {

        return this.nodeRef.current!.exportSchemaObj();
    }

    render(): JSX.Element {

        return (
            <Factory
                ref={this.nodeRef}
                key={nextId("childId")}
                keyId={nextId("childId")}
                depth={0}
                type={this.selfType}
                isDeleteAble={false}
                hasSibling={false}
                field={{ name: "root" }}
                changeType={this.changeType.bind(this)}
                changeName={() => true}
            />
        )
    }
}

export default RootNode;