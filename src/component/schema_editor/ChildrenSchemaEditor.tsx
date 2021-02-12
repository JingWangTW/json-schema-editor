import React from "react";

import { IChildrenSchemaType, ISchemaType } from "../../model/schema/type_schema";
import { NextId, getOrDefault } from "../../model/utility";
import { DataType, PartialBy } from "../../type";
import HintText from "../node_component/HintText";
import { IGenericField, type_Hints } from "../node_component/type_NodeComponent";
import SchemaEditor from "./SchemaEditor";
import SchemaEditorFactory from "./SchemaEditorFactory";
import { IChildNodeProperty, IChildrenNodesProps, INewChildNodeProps, ISchemaEditorType } from "./type_SchemaEditor";

interface ChildrenNodesState {
    children: Array<IChildNodeProperty>;

    hint?: type_Hints;
}

class ChildrenSchemaEditor extends React.Component<IChildrenNodesProps, ChildrenNodesState> {
    constructor(props: IChildrenNodesProps) {
        super(props);

        const children: IChildNodeProperty[] = getOrDefault(props.childrenProperty, []);

        this.state = {
            children,
        };
    }

    componentDidMount(): void {
        if (this.props.childrenDidUpdate) this.props.childrenDidUpdate(this.state.children);
    }

    componentDidUpdate(): void {
        if (this.props.childrenDidUpdate) this.props.childrenDidUpdate(this.state.children);
    }

    get length(): number {
        return this.state.children.length;
    }

    exportSchema(): IChildrenSchemaType {
        return this.state.children.map(child => {
            const c: SchemaEditor<ISchemaType, IGenericField> = child.ref.current as SchemaEditor<ISchemaType, IGenericField>;
            return {
                name: c.getField().name,
                value: c.exportSchema(),
                required: c.getField().required,
            };
        });
    }

    add(selfId?: string, props?: INewChildNodeProps): void {
        const originChildren = this.state.children;
        let currentIndex;

        let p: PartialBy<Required<INewChildNodeProps>, "field"> = {
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
                        selfId: NextId.next("child").toString(),
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

    changeName(selfId: string, name: string): void {
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
                        changeName={this.changeName.bind(this, child.selfId)}
                    />
                ))}
            </>
        );
    }
}

export default ChildrenSchemaEditor;
