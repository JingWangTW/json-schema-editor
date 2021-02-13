// I think there is some bugs  in either eslint or react to use forwardref
// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React from "react";

import { IChildrenSchemaType, ISchemaType } from "../../model/schema/type_schema";
import { NextId, getOrDefault } from "../../model/utility";
import { DataType, PartialBy } from "../../type";
import HintText from "../node_component/HintText";
import { IGenericField, type_Hints } from "../node_component/type_NodeComponent";
import SchemaEditor from "./SchemaEditor";
import SchemaEditorFactory from "./SchemaEditorFactory";
import { IChildProperty, IChildrenEditorProps, INewChildEditorProps, ISchemaEditorType } from "./type_SchemaEditor";

interface ChildrenNodesState {
    children: Array<IChildProperty>;

    hint?: type_Hints;
}

class ChildrenSchemaEditor extends React.Component<IChildrenEditorProps, ChildrenNodesState> {
    constructor(props: IChildrenEditorProps) {
        super(props);

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
        return this.state.children.map(child => {
            const c: SchemaEditor<ISchemaType, IGenericField> = child.ref.current as SchemaEditor<ISchemaType, IGenericField>;
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
            this.updateHint("error", "Find duplicated field name in this layer.");
        } else {
            this.updateHint("error");
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

    updateHint(hintType: keyof type_Hints, value?: string): void {
        // clear value
        if (value === undefined) {
            if (this.state.hint && this.state.hint[hintType]) {
                this.setState(prevState => ({
                    hint: {
                        ...prevState.hint,
                        [hintType]: value,
                    },
                }));
            }
        } else {
            // set value
            if (!this.state.hint || !this.state.hint[hintType]) {
                this.setState(prevState => ({
                    hint: {
                        ...prevState.hint,
                        [hintType]: value,
                    },
                }));
            }
        }
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
                        changeName={this.checkDuplicateChildrenName.bind(this)}
                    />
                ))}
            </>
        );
    }
}

export default ChildrenSchemaEditor;
