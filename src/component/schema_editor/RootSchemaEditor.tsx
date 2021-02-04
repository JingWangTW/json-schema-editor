import React from "react";

import { NextId } from "../../model/utility";
import { DataType } from "../../type";
import { EmptyProps } from "../type_component";
import SchemaEditorFactory from "./SchemaEditorFactory";

class RootSchemaEditor extends React.Component<EmptyProps, { type: DataType }> {
    constructor(props: EmptyProps) {
        super(props);

        this.state = { type: DataType.Object };
    }

    changeType(type: DataType): void {
        this.setState({ type });
    }

    changeName(name: string): void {
        console.log(`[Root Node] Change Name!! ${name}`);
    }

    render(): JSX.Element {
        return (
            <SchemaEditorFactory
                type={this.state.type}
                selfId={NextId.next().toString()}
                depth={0}
                field={{ name: "root", required: true }}
                hasSibling={false}
                isDeleteable={false}
                isRequiredFieldReadonly={true}
                isNameFieldReadonly={true}
                changeType={this.changeType.bind(this)}
                changeName={this.changeName.bind(this)}
            />
        );
    }
}

export default RootSchemaEditor;
