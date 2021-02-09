import React from "react";

import { DataType } from "../../type";
import EditorOptionModal from "../node_component/EditorOptionModal";
import {
    DefaultGenericField,
    IGenericField,
    IGenericFieldOptions,
    IOptionsButtonsAttr,
    OmitGenericField,
} from "../node_component/type_NodeComponent";
import ChildrenSchemaEditor from "./ChildrenSchemaEditor";
import { ISchemaEditorProps, ISchemaEditorState } from "./type_SchemaEditor";

abstract class SchemaEditor<FieldType extends IGenericField> extends React.Component<
    ISchemaEditorProps<FieldType>,
    ISchemaEditorState<FieldType>
> {
    protected abstract defaultField: DefaultGenericField & Required<OmitGenericField<FieldType>>;
    protected abstract optionsButtonsAttr: IOptionsButtonsAttr;
    protected abstract genericFieldOptions: IGenericFieldOptions;

    // may not have options button in the child class
    protected optionModalRef?: React.RefObject<EditorOptionModal>;

    // may not have children in the child class
    protected childrenRef?: React.RefObject<ChildrenSchemaEditor>;

    showOptionModal(): void {
        if (this.optionModalRef && this.optionModalRef.current) this.optionModalRef.current.setDisplayOptionModal(true);
    }

    changeType(newType: DataType): void {
        this.props.changeType(this.props.selfId, newType);
    }

    addChild(): void {
        if (this.childrenRef && this.childrenRef.current) this.childrenRef.current.add();
    }

    addSibling(): void {
        if (this.props.addSibling) this.props.addSibling();
    }

    delete(): void {
        if (this.props.delete) this.props.delete();
    }

    resetOptionField(): void {
        this.setState({
            field: this.defaultField,
        });
    }

    setField<T>(fieldName: keyof OmitGenericField<FieldType>, value: T): void {
        this.setState(prevState => ({
            field: {
                ...prevState.field,
                [fieldName]: value,
            },
        }));
    }
}

export default SchemaEditor;
