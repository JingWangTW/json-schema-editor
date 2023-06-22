import React from "react";

import { IChildrenSchemaType } from "../../model/schema/type_schema";
import { NextId, getOrDefault } from "../../model/utility";
import { DataType, PartialBy } from "../../type";
import HintText from "../node_component/HintText";
import { Hint } from "../node_component/type_NodeComponent";
import SchemaEditorFactory from "./SchemaEditorFactory";
import { IChildProperty, IChildrenEditorProps, INewChildEditorProps, ISchemaEditorType } from "./type_SchemaEditor";

interface ChildrenNodesState {
    children: Array<IChildProperty>;
}

class ChildrenSchemaEditor extends React.Component<IChildrenEditorProps, ChildrenNodesState> {
    private hintTextRef: React.RefObject<HintText>;

    constructor(props: IChildrenEditorProps) {
        super(props);

        this.hintTextRef = React.createRef<HintText>();

        const children: IChildProperty[] = getOrDefault(props.childrenProperty, []);

        this.state = {
            children,
        };
    }

    componentDidMount(): void {
        if (this.props.childrenDidUpdate) this.props.childrenDidUpdate(this.state.children);
        this.checkDuplicateChildrenName();
    }

    componentDidUpdate(): void {
        if (this.props.childrenDidUpdate) this.props.childrenDidUpdate(this.state.children);
        this.checkDuplicateChildrenName();
    }

    get length(): number {
        return this.state.children.length;
    }

    exportSchema(): IChildrenSchemaType {
        if (this.hintTextRef.current?.get("error").length) throw new Error(JSON.stringify(this.hintTextRef.current?.get("error")));

        return this.state.children.map(child => {
            const c: ISchemaEditorType = child.ref.current as ISchemaEditorType;
            return {
                name: c.getField().name,
                value: c.exportSchema(),
                required: c.getField().required,
            };
        });
    }

    add(selfId?: string, props?: INewChildEditorProps): void {
        const originChildren = this.state.children;
        let currentIndex;

        let p: PartialBy<Required<INewChildEditorProps>, "field"> = {
            type: DataType.Object,
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
            selfId: NextId.next("child").toString(),

            // hasSibling, isDeletable, isRequiredFieldReadonly, isNameFieldReadonly, field
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

    checkDuplicateChildrenName(): void {
        const findDuplicate = this.findNameDuplicate();

        if (findDuplicate) {
            this.hintTextRef.current?.add(Hint.Error.DUPLICATED_FIELD_NAME);
        } else {
            this.hintTextRef.current?.remove(Hint.Error.DUPLICATED_FIELD_NAME);
        }
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

    findNameDuplicate(): boolean {
        if (this.props.isNameUnique) {
            // Since state may not updated alreday, use schema instead.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const nameList = this.state.children.map(child => child.ref.current!.schema.getCurrentField().name);

            return new Set(nameList).size !== nameList.length;
        } else {
            return false;
        }
    }

    render(): JSX.Element {
        return (
            <>
                <HintText ref={this.hintTextRef} />
                {this.state.children.map(child => (
                    <SchemaEditorFactory
                        key={child.selfId}
                        depth={this.props.depth + 1}
                        {...child}
                        delete={this.delete.bind(this, child.selfId)}
                        addSibling={this.add.bind(this, child.selfId)}
                        changeType={this.changeType.bind(this, child.selfId)}
                        changeName={this.checkDuplicateChildrenName.bind(this)}
                    />
                ))}
            </>
        );
    }
}

export default ChildrenSchemaEditor;
