import React from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";

import ObjectSchema from "../../model/schema/ObjectSchema";
import { IObjectSchemaType } from "../../model/schema/type_schema";
import { KeysMatching } from "../../type";
import CodeField from "../node_component/CodeField";
import EditorOptionModal from "../node_component/EditorOptionModal";
import GenericField from "../node_component/GenericField";
import HintText from "../node_component/HintText";
import InstructionIcon from "../node_component/InstructionIcon";
import OptionsButtons from "../node_component/OptionsButtons";
import SpaceFront from "../node_component/SpaceFront";
import { CodeFieldValue, Hint, IGenericFieldOptions, IOptionsButtonsAttr } from "../node_component/type_NodeComponent";
import ChildrenSchemaEditor from "./ChildrenSchemaEditor";
import SchemaEditor from "./SchemaEditor";
import { IObjectEditorField, ISchemaEditorProps, ISchemaEditorState } from "./type_SchemaEditor";

class ObjectSchemaEditor extends SchemaEditor<IObjectSchemaType, IObjectEditorField> {
    protected optionsButtonsAttr: IOptionsButtonsAttr;
    protected genericFieldOptions: IGenericFieldOptions;
    public schema: ObjectSchema;

    protected optionModalRef: React.RefObject<EditorOptionModal>;
    protected genericFieldRef: React.RefObject<GenericField>;
    protected childrenRef: React.RefObject<ChildrenSchemaEditor>;
    private hintTextRef: React.RefObject<HintText>;

    constructor(props: ISchemaEditorProps<IObjectSchemaType>) {
        super(props);

        this.optionModalRef = React.createRef<EditorOptionModal>();
        this.genericFieldRef = React.createRef<GenericField>();
        this.childrenRef = React.createRef<ChildrenSchemaEditor>();
        this.hintTextRef = React.createRef<HintText>();

        this.schema = new ObjectSchema(props.schema, props.field);

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

        this.state = {
            currentField: this.schema.getDefaultField(),
        };
    }

    componentDidMount(): void {
        if (this.state.currentField.maxProperties < this.state.currentField.minProperties) {
            this.hintTextRef.current?.add(Hint.Warn.MIN_GT_MAX_PROPERTIES);
        }
    }

    componentDidUpdate(prevProps: ISchemaEditorProps<IObjectSchemaType>, prevState: ISchemaEditorState<IObjectEditorField>): void {
        if (
            // NaN === NaN (get false)
            // NaN !== NaN (get true)
            (prevState.currentField.maxProperties !== this.state.currentField.maxProperties &&
                !(isNaN(prevState.currentField.maxProperties) && isNaN(this.state.currentField.maxProperties))) ||
            (prevState.currentField.minProperties !== this.state.currentField.minProperties &&
                !(isNaN(prevState.currentField.minProperties) && isNaN(this.state.currentField.minProperties)))
        ) {
            if (this.state.currentField.maxProperties < this.state.currentField.minProperties) {
                this.hintTextRef.current?.add(Hint.Warn.MIN_GT_MAX_PROPERTIES);
            } else {
                this.hintTextRef.current?.remove(Hint.Warn.MIN_GT_MAX_PROPERTIES);
            }
        }
    }

    exportSchema(): IObjectSchemaType {
        return this.schema.exportSchema(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.childrenRef.current!.exportSchema()
        );
    }

    recordCode(field: KeysMatching<IObjectEditorField, CodeFieldValue>, value: CodeFieldValue): void {
        const currentField = this.schema.recordCode(field, value);

        this.setState({ currentField });

        try {
            if (value.length !== 0) JSON.parse(value);

            switch (field) {
                case "const":
                    this.hintTextRef.current?.remove(Hint.Error.CANT_PARSE_JSON_CONST);
                    break;
                case "default":
                    this.hintTextRef.current?.remove(Hint.Error.CANT_PARSE_JSON_DEFAULT);
                    break;
            }
        } catch (error) {
            switch (field) {
                case "const":
                    this.hintTextRef.current?.add(Hint.Error.CANT_PARSE_JSON_CONST);
                    break;
                case "default":
                    this.hintTextRef.current?.add(Hint.Error.CANT_PARSE_JSON_DEFAULT);
                    break;
            }
        }
    }

    render(): JSX.Element {
        return (
            <div className="my-1">
                <Row>
                    <SpaceFront depth={this.props.depth} />

                    <Col>
                        <HintText ref={this.hintTextRef} />

                        <Form>
                            <Row>
                                <Col lg={11}>
                                    <GenericField
                                        ref={this.genericFieldRef}
                                        schemaType={this.schema}
                                        options={this.genericFieldOptions}
                                        changeType={this.props.changeType}
                                        changeName={this.props.changeName}
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
                                <EditorOptionModal
                                    clearOptionFieldForm={this.clearOptionField.bind(this)}
                                    resetOptionFiledForm={this.resetOptionField.bind(this)}
                                    ref={this.optionModalRef}
                                >
                                    <Form>
                                        <Form.Group as={Row}>
                                            <Form.Label column lg="2" htmlFor="MinProperties">
                                                Min Properties
                                                <InstructionIcon text="The numbers of properties in an object instance should be greater than or equal to this keyword." />
                                            </Form.Label>
                                            <Col className="col-option-form-value">
                                                <Form.Control
                                                    type="number"
                                                    min="0"
                                                    id="MinProperties"
                                                    value={this.state.currentField.minProperties}
                                                    onChange={this.recordField.bind(this, "minProperties")}
                                                />
                                            </Col>
                                            <Form.Label column lg="2" htmlFor="MaxProperties">
                                                Max Properties
                                                <InstructionIcon text="The numbers of properties in an object instance should be less than or equal to this keyword." />
                                            </Form.Label>
                                            <Col className="col-option-form-value">
                                                <Form.Control
                                                    type="number"
                                                    min="0"
                                                    id="MaxProperties"
                                                    value={this.state.currentField.maxProperties}
                                                    onChange={this.recordField.bind(this, "maxProperties")}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label column lg="2" htmlFor="Constant">
                                                Constant
                                                <InstructionIcon text="An object instance would be valid if its value is equal to this keyword." />
                                            </Form.Label>
                                            <Col lg="10">
                                                <InputGroup>
                                                    <CodeField
                                                        title="Object constant"
                                                        value={this.state.currentField.const}
                                                        update={this.recordCode.bind(this, "const")}
                                                    />
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label column lg="2" htmlFor="Default">
                                                Default
                                                <InstructionIcon text="This keyword can be used to supply a default JSON value associated with this object schema" />
                                            </Form.Label>
                                            <Col lg="10">
                                                <InputGroup>
                                                    <CodeField
                                                        title="Object default"
                                                        value={this.state.currentField.default}
                                                        update={this.recordCode.bind(this, "default")}
                                                    />
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </EditorOptionModal>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <ChildrenSchemaEditor
                    ref={this.childrenRef}
                    depth={this.props.depth}
                    isNameUnique={true}
                    childrenProperty={this.schema.childrenProperty}
                />
            </div>
        );
    }
}

export default ObjectSchemaEditor;
