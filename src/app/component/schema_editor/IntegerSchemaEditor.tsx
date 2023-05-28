import React from "react";
import { Col, Form, Row } from "react-bootstrap";

import IntegerSchema from "../../model/schema/IntegerSchema";
import { IIntegerSchemaType } from "../../model/schema/type_schema";
import EditorOptionModal from "../node_component/EditorOptionModal";
import EnumField from "../node_component/EnumField";
import GenericField from "../node_component/GenericField";
import HintText from "../node_component/HintText";
import InstructionIcon from "../node_component/InstructionIcon";
import OptionsButtons from "../node_component/OptionsButtons";
import SpaceFront from "../node_component/SpaceFront";
import { Hint, IGenericFieldOptions, IOptionsButtonsAttr } from "../node_component/type_NodeComponent";
import SchemaEditor from "./SchemaEditor";
import { IIntegerEditorField, ISchemaEditorProps, ISchemaEditorState } from "./type_SchemaEditor";

class IntegerSchemaEditor extends SchemaEditor<IIntegerSchemaType, IIntegerEditorField> {
    protected optionsButtonsAttr: IOptionsButtonsAttr;
    protected genericFieldOptions: IGenericFieldOptions;
    public schema: IntegerSchema;

    protected optionModalRef: React.RefObject<EditorOptionModal>;
    protected genericFieldRef: React.RefObject<GenericField>;
    private hintTextRef: React.RefObject<HintText>;

    constructor(props: ISchemaEditorProps<IIntegerSchemaType>) {
        super(props);

        this.optionModalRef = React.createRef<EditorOptionModal>();
        this.genericFieldRef = React.createRef<GenericField>();
        this.hintTextRef = React.createRef<HintText>();

        this.schema = new IntegerSchema(props.schema, props.field);

        this.optionsButtonsAttr = {
            hasChild: false,
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
        if (this.state.currentField.minimum > this.state.currentField.maximum) this.hintTextRef.current?.add(Hint.Warn.MIN_GT_MAX_VALUE);
    }

    componentDidUpdate(prevProps: ISchemaEditorProps<IIntegerSchemaType>, prevState: ISchemaEditorState<IIntegerEditorField>): void {
        if (
            // NaN === NaN (get false)
            // NaN !== NaN (get true)
            (prevState.currentField.minimum !== this.state.currentField.minimum &&
                !(isNaN(prevState.currentField.minimum) && isNaN(this.state.currentField.minimum))) ||
            (prevState.currentField.maximum !== this.state.currentField.maximum &&
                !(isNaN(prevState.currentField.maximum) && isNaN(this.state.currentField.maximum)))
        ) {
            if (this.state.currentField.maximum < this.state.currentField.minimum) {
                this.hintTextRef.current?.add(Hint.Warn.MIN_GT_MAX_VALUE);
            } else {
                this.hintTextRef.current?.remove(Hint.Warn.MIN_GT_MAX_VALUE);
            }
        }
    }

    exportSchema(): IIntegerSchemaType {
        return this.schema.exportSchema();
    }

    updateEnum(index?: number, changeEvent?: React.ChangeEvent<HTMLInputElement>): void {
        if (index === undefined && changeEvent === undefined) this.schema.addEnum();
        else if (index !== undefined && changeEvent === undefined) this.schema.deleteEnum(index);
        else if (index !== undefined && changeEvent !== undefined) this.schema.updateEnum(index, changeEvent);

        this.setState({ currentField: this.schema.getCurrentField() });
    }

    render(): JSX.Element {
        return (
            <div className="my-1">
                <Row>
                    <SpaceFront depth={this.props.depth} />

                    <Col>
                        <HintText ref={this.hintTextRef} />

                        <Form>
                            <Form.Row>
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
                                        <Form.Group as={Row} controlId="MinValue">
                                            <Form.Label column lg="2">
                                                Min Value
                                                <InstructionIcon text="An integer instance would be valid if its value is greater than (or exactly equal to) this keyword." />
                                            </Form.Label>
                                            <Col lg="4">
                                                <Form.Control
                                                    type="number"
                                                    value={this.state.currentField.minimum}
                                                    onChange={this.recordField.bind(this, "minimum")}
                                                />
                                            </Col>
                                            <Col lg="6">
                                                <Form.Check
                                                    id="ExclusiveMin"
                                                    inline
                                                    onChange={this.recordField.bind(this, "exclusiveMinimum")}
                                                    checked={this.state.currentField.exclusiveMinimum ? true : false}
                                                    label="Exclusive"
                                                    type="checkbox"
                                                    style={{ height: "100%" }}
                                                />
                                                <InstructionIcon text="If checked, an integer instance would be valid if its value is strictly greater than this keyword." />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="MaxValue">
                                            <Form.Label column lg="2">
                                                Max Value
                                                <InstructionIcon text="An integer instance would be valid if its value is less than (or exactly equal to) this keyword." />
                                            </Form.Label>
                                            <Col lg="4">
                                                <Form.Control
                                                    type="number"
                                                    value={this.state.currentField.maximum}
                                                    onChange={this.recordField.bind(this, "maximum")}
                                                />
                                            </Col>
                                            <Col lg="6">
                                                <Form.Check
                                                    id="ExclusiveMax"
                                                    inline
                                                    onChange={this.recordField.bind(this, "exclusiveMaximum")}
                                                    checked={this.state.currentField.exclusiveMaximum ? true : false}
                                                    label="Exclusive"
                                                    type="checkbox"
                                                    style={{ height: "100%" }}
                                                />
                                                <InstructionIcon text="If checked, aninteger instance would be valid if its value is strictly less than this keyword." />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label column lg="2" htmlFor="Default">
                                                Default
                                                <InstructionIcon text="This keyword can be used to supply a default integer value associated with this integer schema." />
                                            </Form.Label>
                                            <Col lg="4">
                                                <Form.Control
                                                    type="number"
                                                    id="Default"
                                                    value={this.state.currentField.default}
                                                    onChange={this.recordField.bind(this, "default")}
                                                />
                                            </Col>
                                            <Form.Label column lg="2" htmlFor="MultipleOf">
                                                Multiple Of
                                                <InstructionIcon text="An integer instance would be valid if division by this keyword's value result in an integer." />
                                            </Form.Label>
                                            <Col lg="4">
                                                <Form.Control
                                                    type="number"
                                                    id="MultipleOf"
                                                    value={this.state.currentField.multipleOf}
                                                    onChange={this.recordField.bind(this, "multipleOf")}
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label column lg="2" htmlFor="const">
                                                Constant
                                                <InstructionIcon text="An integer instance would be valid if its value is equal to this keyword." />
                                            </Form.Label>
                                            <Col lg="4">
                                                <Form.Control
                                                    type="number"
                                                    id="const"
                                                    placeholder="Restricted Value"
                                                    value={this.state.currentField.const}
                                                    onChange={this.recordField.bind(this, "const")}
                                                />
                                            </Col>
                                        </Form.Group>

                                        <EnumField
                                            width={4}
                                            type="number"
                                            value={this.state.currentField.enum}
                                            add={(): void => this.updateEnum()}
                                            update={this.updateEnum.bind(this)}
                                            delete={(index: number): void => this.updateEnum(index)}
                                        />
                                    </Form>
                                </EditorOptionModal>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default IntegerSchemaEditor;
