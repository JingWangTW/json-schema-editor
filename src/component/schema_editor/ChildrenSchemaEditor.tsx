// I think there is some bugs  in either eslint or react to use forwardref
// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React from "react";

import Hint, * as HintTextType from "../../model/Hint";
import { IChildrenSchemaType } from "../../model/schema/type_schema";
import { NextId, arrayEquals, getOrDefault } from "../../model/utility";
import { DataType, PartialBy } from "../../type";
import HintText from "../node_component/HintText";
import SchemaEditorFactory from "./SchemaEditorFactory";
import { IChildProperty, IChildrenEditorProps, INewChildEditorProps, ISchemaEditorType } from "./type_SchemaEditor";

interface ChildrenNodesState {
    children: Array<IChildProperty>;

    hint: Hint;
}

class ChildrenSchemaEditor extends React.Component<IChildrenEditorProps, ChildrenNodesState> {
    constructor(props: IChildrenEditorProps) {
        super(props);

        const children: IChildProperty[] = getOrDefault(props.childrenProperty, []);

        this.state = {
            children,
            hint: new Hint(),
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
        if (this.state.hint.getError().length > 0) throw new Error(JSON.stringify(this.state.hint.getError()));

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
            this.addHint(HintTextType.Error.DUPLICATED_FIELD_NAME);
        } else {
            this.removeHint(HintTextType.Error.DUPLICATED_FIELD_NAME);
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

    addHint(text: HintTextType.Warn | HintTextType.Info | HintTextType.Error): void {
        const originAllHint = this.state.hint.getAll();

        this.state.hint.add(text);

        // to avoid recursively update state
        let change = false;

        if (Hint.isWarnText(text)) {
            if (originAllHint["warn"] === undefined || !arrayEquals(this.state.hint.getWarn(), originAllHint["warn"])) change = true;
        } else if (Hint.isInfoText(text)) {
            if (originAllHint["info"] === undefined || !arrayEquals(this.state.hint.getInfo(), originAllHint["info"])) change = true;
        } else {
            if (originAllHint["error"] === undefined || !arrayEquals(this.state.hint.getError(), originAllHint["error"])) change = true;
        }

        if (change) {
            this.setState({ hint: this.state.hint });
        }
    }

    removeHint(text: HintTextType.Warn | HintTextType.Info | HintTextType.Error): void {
        const originAllHint = this.state.hint.getAll();

        this.state.hint.remove(text);

        // to avoid recursively update state
        let change = false;

        if (Hint.isWarnText(text)) {
            if (originAllHint["warn"] !== undefined && !arrayEquals(this.state.hint.getWarn(), originAllHint["warn"])) change = true;
        } else if (Hint.isInfoText(text)) {
            if (originAllHint["info"] !== undefined && !arrayEquals(this.state.hint.getInfo(), originAllHint["info"])) change = true;
        } else {
            if (originAllHint["error"] !== undefined && !arrayEquals(this.state.hint.getError(), originAllHint["error"])) change = true;
        }

        if (change) {
            this.setState({ hint: this.state.hint });
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
