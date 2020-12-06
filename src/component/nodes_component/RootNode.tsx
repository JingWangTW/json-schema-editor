import React from 'react';
import nextId from "react-id-generator";

import { Type, Node } from './data_type/DataType';
import Factory from './data_type/Factory';

interface RootNodeState {
    type: keyof typeof Type;
}
class RootNode extends React.Component<{}, RootNodeState> {

    private nodeRef: React.RefObject<Node>;

    constructor(props: any) {
        super(props);

        this.nodeRef = React.createRef<Node>();

        this.state = {
            type: Type.Object,
        }
    }

    changeType(keyId: string, type: keyof typeof Type): void {

        this.setState({
            type
        })

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
                type={this.state.type}
                isDeleteAble={false}
                hasSibling={false}
                field={{ name: "root", required: true }}
                changeType={this.changeType.bind(this)}
                changeName={() => true}
            />
        )
    }
}

export default RootNode;