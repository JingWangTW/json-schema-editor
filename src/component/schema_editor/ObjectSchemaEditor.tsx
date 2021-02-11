import React from "react";
import { Col, Form, Row } from "react-bootstrap";

import ObjectSchema from "../../model/schema/ObjectSchema";
import { IObjectSchemaType } from "../../model/schema/type_schema";
import EditorOptionModal from "../node_component/EditorOptionModal";
import GenericField from "../node_component/GeneralField";
import HintText from "../node_component/HintText";
import OptionsButtons from "../node_component/OptionsButtons";
import SpaceFront from "../node_component/SpaceFront";
import { IGenericFieldOptions, IOptionsButtonsAttr, OmitGenericField } from "../node_component/type_NodeComponent";
import ChildrenSchemaEditor from "./ChildrenSchemaEditor";
import SchemaEditor from "./SchemaEditor";
import { IObjectEditorField, ISchemaEditorProps } from "./type_SchemaEditor";

class ObjectSchemaEditor extends SchemaEditor<IObjectSchemaType, IObjectEditorField> {
    protected defaultField: Required<IObjectEditorField>;

    protected optionsButtonsAttr: IOptionsButtonsAttr;
    protected genericFieldOptions: IGenericFieldOptions;
    protected schema: ObjectSchema;

    protected optionModalRef: React.RefObject<EditorOptionModal>;
    protected genericFieldRef: React.RefObject<GenericField>;
    protected childrenRef: React.RefObject<ChildrenSchemaEditor>;

    constructor(props: ISchemaEditorProps<IObjectSchemaType, IObjectEditorField>) {
        super(props);

        // remove field from props
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { field: temp, ...propsRemoveField } = props;

        this.optionModalRef = React.createRef<EditorOptionModal>();
        this.genericFieldRef = React.createRef<GenericField>();
        this.childrenRef = React.createRef<ChildrenSchemaEditor>();

        this.schema = new ObjectSchema();

        this.optionsButtonsAttr = {
            hasChild: true,
            hasSibling: true,
            isDeleteable: true,
            isOptionExist: true,
            ...props, // override hasSibling, isDeleteable
        };

        this.genericFieldOptions = {
            ...props, // override isRequiredFieldReadonly, isNameFieldReadonly
        };

        this.defaultField = this.schema.extractFieldFromSchema(props.schema, props.field);

        this.state = {
            field: this.defaultField,

            ...propsRemoveField,
        };
    }

    recordField(fieldName: keyof OmitGenericField<IObjectEditorField>, event: React.ChangeEvent<HTMLInputElement>): void {
        this.setField(fieldName, parseInt(event.target.value));
    }

    exportSchema(): IObjectSchemaType {
        return this.schema.exportSchemaFromField(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            { ...this.state.field, ...this.getGeneircField() },
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.childrenRef.current!.exportSchema()
        );
    }

    render(): JSX.Element {
        return (
            <div className="my-1">
                <Row>
                    <SpaceFront depth={this.props.depth} />

                    <Col>
                        <HintText hint={this.state.hint} />

                        <Form>
                            <Form.Row>
                                <Col lg={11}>
                                    <GenericField
                                        ref={this.genericFieldRef}
                                        defaultField={this.defaultField}
                                        options={this.genericFieldOptions}
                                        changeType={this.props.changeType.bind(this)}
                                    />
                                </Col>
                                <Col lg={1}>
                                    <OptionsButtons
                                        buttonOptions={this.optionsButtonsAttr}
                                        delete={this.delete.bind(this)}
                                        addChild={this.addChild.bind(this)}
                                        addSibling={this.addSibling.bind(this)}
                                        showOptionModal={this.showOptionModal.bind(this, true)}
                                    />
                                </Col>
                                <EditorOptionModal resetOptionFiledForm={this.resetOptionField.bind(this)} ref={this.optionModalRef}>
                                    <Form>
                                        <Form.Group as={Row}>
                                            <Form.Label column lg="auto" htmlFor="MinProperties">
                                                Min Properties
                                            </Form.Label>
                                            <Col>
                                                <Form.Control
                                                    type="number"
                                                    min="0"
                                                    id="MinProperties"
                                                    value={this.state.field.minProperties}
                                                    defaultValue={this.defaultField.minProperties}
                                                    onChange={this.recordField.bind(this, "minProperties")}
                                                />
                                            </Col>
                                            <Form.Label column lg="auto" htmlFor="MaxProperties">
                                                Max Properties
                                            </Form.Label>
                                            <Col>
                                                <Form.Control
                                                    type="number"
                                                    min="0"
                                                    id="MaxProperties"
                                                    value={this.state.field.maxProperties}
                                                    defaultValue={this.defaultField.minProperties}
                                                    onChange={this.recordField.bind(this, "maxProperties")}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </EditorOptionModal>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
                <ChildrenSchemaEditor depth={this.props.depth} ref={this.childrenRef} schema={this.props.schema} />
            </div>
        );
    }
}

export default ObjectSchemaEditor;
