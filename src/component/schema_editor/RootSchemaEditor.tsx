import React from "react";

import { IGenericSchemaType, ISchemaType } from "../../model/schema/type_schema";
import { NextId } from "../../model/utility";
import { DataType } from "../../type";
import { IGenericField } from "../node_component/type_NodeComponent";
import SchemaEditor from "./SchemaEditor";
import SchemaEditorFactory from "./SchemaEditorFactory";

interface RootSchemaEditorProps {
    schema?: ISchemaType;
}

class RootSchemaEditor extends React.Component<RootSchemaEditorProps, { type: DataType }> {
    private editorRef: React.RefObject<SchemaEditor<IGenericSchemaType, IGenericField>>;

    constructor(props: RootSchemaEditorProps) {
        super(props);

        this.editorRef = React.createRef<SchemaEditor<IGenericSchemaType, IGenericField>>();

        if (props.schema) {
            this.state = { type: props.schema.type };
        } else {
            this.state = { type: DataType.Object };
        }
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
                key={NextId.next()}
                ref={this.editorRef}
                type={this.state.type}
                schema={this.props.schema}
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
