import React from "react";

import Hint, * as HintTextType from "../../model/Hint";
import Schema from "../../model/schema/Schema";
import { ISchemaType } from "../../model/schema/type_schema";
import { arrayEquals } from "../../model/utility";
import EditorOptionModal from "../node_component/EditorOptionModal";
import GenericField from "../node_component/GenericField";
import { IGenericFieldOptions, IOptionsButtonsAttr, OmitGenericField } from "../node_component/type_NodeComponent";
import ChildrenSchemaEditor from "./ChildrenSchemaEditor";
import { ISchemaEditorField, ISchemaEditorProps, ISchemaEditorState } from "./type_SchemaEditor";

abstract class SchemaEditor<SchemaType extends ISchemaType, FieldType extends ISchemaEditorField> extends React.Component<
    ISchemaEditorProps<SchemaType>,
    ISchemaEditorState<FieldType>
> {
    protected abstract optionsButtonsAttr: IOptionsButtonsAttr;
    protected abstract genericFieldOptions: IGenericFieldOptions;
    public abstract schema: Schema<SchemaType, FieldType>;

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

        if ((text as string) in HintTextType.Warn) {
            if (originAllHint["warn"] !== undefined && !arrayEquals(this.state.hint.getWarn(), originAllHint["warn"])) change = true;
        } else if ((text as string) in HintTextType.Info) {
            if (originAllHint["info"] !== undefined && !arrayEquals(this.state.hint.getInfo(), originAllHint["info"])) change = true;
        } else {
            if (originAllHint["error"] !== undefined && !arrayEquals(this.state.hint.getError(), originAllHint["error"])) change = true;
        }

        if (change) {
            this.setState({ hint: this.state.hint });
        }
    }
}

export default SchemaEditor;
