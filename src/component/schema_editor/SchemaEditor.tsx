import React from "react";

import Schema from "../../model/schema/Schema";
import { ISchemaType } from "../../model/schema/type_schema";
import EditorOptionModal from "../node_component/EditorOptionModal";
import GenericField from "../node_component/GeneralField";
import { IGenericField, IGenericFieldOptions, IOptionsButtonsAttr, OmitGenericField } from "../node_component/type_NodeComponent";
import ChildrenSchemaEditor from "./ChildrenSchemaEditor";
import { ISchemaEditorProps, ISchemaEditorState } from "./type_SchemaEditor";

abstract class SchemaEditor<SchemaType extends ISchemaType, FieldType extends IGenericField> extends React.Component<
    ISchemaEditorProps<SchemaType, FieldType>,
    ISchemaEditorState<FieldType>
> {
    protected abstract defaultField: Required<FieldType>;

    protected abstract optionsButtonsAttr: IOptionsButtonsAttr;
    protected abstract genericFieldOptions: IGenericFieldOptions;
    protected abstract schema: Schema;

    // may not have options button in the child class
    protected optionModalRef?: React.RefObject<EditorOptionModal>;

    protected abstract genericFieldRef: React.RefObject<GenericField>;

    // may not have children in the child class
    protected childrenRef?: React.RefObject<ChildrenSchemaEditor>;

    abstract exportSchema(): ISchemaType;

    getGeneircField(): IGenericField {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.genericFieldRef.current!.getFields();
    }

    showOptionModal(): void {
        if (this.optionModalRef && this.optionModalRef.current) this.optionModalRef.current.setDisplayOptionModal(true);
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
