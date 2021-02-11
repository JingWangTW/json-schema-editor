import React from "react";

import { IChildrenSchemaType, IGenericSchemaType, ISchemaType } from "../../model/schema/type_schema";
import { NextId } from "../../model/utility";
import { DataType, PartialBy } from "../../type";
import HintText from "../node_component/HintText";
import { IGenericField, type_Hints } from "../node_component/type_NodeComponent";
import SchemaEditor from "./SchemaEditor";
import SchemaEditorFactory from "./SchemaEditorFactory";
import { ISchemaEditorType } from "./type_SchemaEditor";

interface NewChildNodeProps {
    hasSibling?: boolean;
    isDeleteable?: boolean;
    isRequiredFieldReadonly?: boolean;
    isNameFieldReadonly?: boolean;

    field?: IGenericField;
}

interface ChildNodeProperty {
    type: DataType;
    selfId: string;

    hasSibling: boolean;
    isDeleteable: boolean;
    isRequiredFieldReadonly: boolean;
    isNameFieldReadonly: boolean;

    ref: React.RefObject<ISchemaEditorType>;

    field?: IGenericField;
    schema?: ISchemaType;
}

interface ChildrenNodesProps {
    depth: number;
    schema?: ISchemaType;
}

interface ChildrenNodesState {
    children: Array<ChildNodeProperty>;

    hint?: type_Hints;
}

class ChildrenSchemaEditor extends React.Component<ChildrenNodesProps, ChildrenNodesState> {
    constructor(props: ChildrenNodesProps) {
        super(props);

        let children: ChildNodeProperty[] = [];

        if (props.schema) children = this.getChildrenPropertyFromSchema(props.schema);

        this.state = {
            children,
        };
    }

    get length(): number {
        return this.state.children.length;
    }

    getChildrenPropertyFromSchema(schema: ISchemaType): ChildNodeProperty[] {
        let children: ChildNodeProperty[] = [];

        if (schema.type) {
            if (schema.type === DataType.Array && schema.items) {
                if (schema.items instanceof Array) {
                    children = schema.items.map((s, i) => {
                        return {
                            type: s.type,
                            selfId: i.toString(),

                            hasSibling: true,
                            isDeleteable: i === 0 ? false : true,
                            isRequiredFieldReadonly: true,
                            isNameFieldReadonly: true,

                            ref: React.createRef<ISchemaEditorType>(),

                            field: {
                                type: s.type,
                                name: "items",

                                required: true,
                            },

                            schema: s,
                        };
                    });
                } else {
                    children = [
                        {
                            type: schema.type,
                            selfId: "0",

                            hasSibling: true,
                            isDeleteable: false,
                            isRequiredFieldReadonly: true,
                            isNameFieldReadonly: true,

                            ref: React.createRef<ISchemaEditorType>(),

                            field: {
                                type: schema.type,
                                name: "items",

                                required: true,
                            },

                            schema,
                        },
                    ];
                }
            } else if (schema.type === DataType.Object) {
                children = Object.keys(schema.properties).map((field, i) => {
                    return {
                        type: schema.properties[field].type,
                        selfId: i.toString(),

                        hasSibling: true,
                        isDeleteable: true,
                        isRequiredFieldReadonly: false,
                        isNameFieldReadonly: false,

                        ref: React.createRef<ISchemaEditorType>(),

                        field: {
                            type: schema.properties[field].type,
                            name: field,

                            required: schema.required.find(r => r === field) === undefined ? false : true,
                        },

                        schema: schema.properties[field],
                    };
                });
            }
        }

        return children;
    }

    exportSchema(): IChildrenSchemaType {
        return this.state.children.map(child => {
            const c: SchemaEditor<IGenericSchemaType, IGenericField> = child.ref.current as SchemaEditor<IGenericSchemaType, IGenericField>;
            return {
                name: c.getGeneircField().name,
                value: c.exportSchema(),
                required: c.getGeneircField().required,
            };
        });
    }

    add(selfId?: string, props?: NewChildNodeProps): void {
        const originChildren = this.state.children;
        let currentIndex;

        let p: PartialBy<Required<NewChildNodeProps>, "field"> = {
            isDeleteable: true,
            hasSibling: true,
            isRequiredFieldReadonly: false,
            isNameFieldReadonly: false,
        };

        if (props) {
            p = {
                ...p,
                ...props,
            };
        }

        if (selfId === undefined || selfId === "") {
            // push to the last one
            currentIndex = originChildren.length + 1;
        } else {
            // Add after a node
            currentIndex = originChildren.findIndex(child => child.selfId === selfId);
        }

        originChildren.splice(currentIndex + 1, 0, {
            type: DataType.Object,
            selfId: NextId.next("child").toString(),

            // hasSibling, isDeletable, isRequiredFieldReadonly, isNameFieldReadonly
            ...p,

            ref: React.createRef<ISchemaEditorType>(),
        });

        this.setState({ children: originChildren });
    }

    delete(selfId: string): void {
        const originChildren = this.state.children;
        const currentIndex = originChildren.findIndex(child => child.selfId === selfId);

        originChildren.splice(currentIndex, 1);

        this.setState({ children: originChildren });
    }

    changeType(selfId: string, type: DataType): void {
        this.setState(prevState => {
            const children = prevState.children.map(child => {
                if (child.selfId === selfId) {
                    return {
                        ...child,
                        type,
                    };
                } else {
                    return child;
                }
            });

            return {
                children,
            };
        });
    }

    changeChildName(selfId: string, name: string): void {
        // let checkNameDuplicate = false;
        // for (const child of this.state.children) {
        //     if (child.selfId !== selfId && child.ref.current!.form.name === name) {
        //         checkNameDuplicate = true;
        //         break;
        //     }
        // }
        // if (checkNameDuplicate) {
        //     this.setState({ error: "Find duplicated field name in this layer." });
        // } else {
        //     this.setState({ error: undefined });
        // }
        console.log(selfId, name);
    }

    render(): JSX.Element {
        return (
            <>
                <HintText hint={this.state.hint} />
                {this.state.children.map(child => (
                    <SchemaEditorFactory
                        key={child.selfId}
                        depth={this.props.depth + 1}
                        {...child}
                        delete={this.delete.bind(this, child.selfId)}
                        addSibling={this.add.bind(this, child.selfId)}
                        changeType={this.changeType.bind(this, child.selfId)}
                        changeName={this.changeChildName.bind(this)}
                    />
                ))}
            </>
        );
    }
}

export default ChildrenSchemaEditor;
