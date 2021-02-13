import React from "react";

import Schema from "../../model/schema/Schema";
import { ISchemaType } from "../../model/schema/type_schema";
import EditorOptionModal from "../node_component/EditorOptionModal";
import GenericField from "../node_component/GenericField";
import {
    IGenericField,
    IGenericFieldOptions,
    IOptionsButtonsAttr,
    OmitGenericField,
    type_Hints,
} from "../node_component/type_NodeComponent";
import ChildrenSchemaEditor from "./ChildrenSchemaEditor";
import { ISchemaEditorProps, ISchemaEditorState } from "./type_SchemaEditor";

abstract class SchemaEditor<SchemaType extends ISchemaType, FieldType extends IGenericField> extends React.Component<
    ISchemaEditorProps<SchemaType, FieldType>,
    ISchemaEditorState<FieldType>
> {
    protected abstract optionsButtonsAttr: IOptionsButtonsAttr;
    protected abstract genericFieldOptions: IGenericFieldOptions;
    public abstract schema: Schema<FieldType>;

    // may not have options button in the child class
    protected optionModalRef?: React.RefObject<EditorOptionModal>;

    protected abstract genericFieldRef: React.RefObject<GenericField>;

    // may not have children in the child class
    protected childrenRef?: React.RefObject<ChildrenSchemaEditor>;

    abstract exportSchema(): ISchemaType;

    addChild(): void {
        if (this.childrenRef && this.childrenRef.current) this.childrenRef.current.add();
    }

    addSibling(): void {
        if (this.props.addSibling) this.props.addSibling();
    }

    delete(): void {
        if (this.props.delete) this.props.delete();
    }

    getField(): Required<FieldType> {
        return this.schema.getCurrentField();
    }

    recordField(fieldName: keyof OmitGenericField<FieldType>, changeEvent: React.ChangeEvent<HTMLInputElement>): void {
        const currentField = this.schema.recordField(fieldName, changeEvent);

        this.setState({ currentField });
    }

    showOptionModal(): void {
        if (this.optionModalRef && this.optionModalRef.current) this.optionModalRef.current.setDisplayOptionModal(true);
    }

    clearOptionField(): void {
        const currentField = this.schema.clearOptionField();
        this.setState({ currentField });
    }

    resetOptionField(): void {
        const currentField = this.schema.resetOptionField();
        this.setState({ currentField });
    }

    updateHint(hintType: keyof type_Hints, value?: string): void {
        this.setState(prevState => ({
            hint: {
                ...prevState.hint,
                [hintType]: value,
            },
        }));
    }
}

export default SchemaEditor;
