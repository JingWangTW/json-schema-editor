import React from "react";

import { ISchemaType } from "../../model/schema/type_schema";
import { NextId } from "../../model/utility";
import { DataType } from "../../type";
import { IGenericField } from "../node_component/type_NodeComponent";
import { EmptyProps } from "../type_component";
import SchemaEditor from "./SchemaEditor";
import SchemaEditorFactory from "./SchemaEditorFactory";

class RootSchemaEditor extends React.Component<EmptyProps, { type: DataType }> {
    private editorRef: React.RefObject<SchemaEditor<IGenericField>>;

    constructor(props: EmptyProps) {
        super(props);

        this.editorRef = React.createRef<SchemaEditor<IGenericField>>();

        this.state = { type: DataType.Object };
    }

    changeType(type: DataType): void {
        this.setState({ type });
    }

    changeName(name: string): void {
        console.log(`[Root Node] Change Name!! ${name}`);
    }

    exportSchema(): ISchemaType {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.editorRef.current!.exportSchema();
    }

    render(): JSX.Element {
        return (
            <SchemaEditorFactory
                ref={this.editorRef}
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
