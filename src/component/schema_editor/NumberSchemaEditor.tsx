// I think there is some bugs  in either eslint or react to use forwardref
// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React from "react";
import { Col, Form, Row } from "react-bootstrap";

import NumberSchema from "../../model/schema/NumberSchema";
import { INumberSchemaType } from "../../model/schema/type_schema";
import EditorOptionModal from "../node_component/EditorOptionModal";
import EnumField from "../node_component/EnumField";
import GenericField from "../node_component/GenericField";
import HintText from "../node_component/HintText";
import OptionsButtons from "../node_component/OptionsButtons";
import SpaceFront from "../node_component/SpaceFront";
import { IGenericFieldOptions, IOptionsButtonsAttr } from "../node_component/type_NodeComponent";
import SchemaEditor from "./SchemaEditor";
import { INumberEditorField, ISchemaEditorProps, ISchemaEditorState } from "./type_SchemaEditor";

class NumberSchemaEditor extends SchemaEditor<INumberSchemaType, INumberEditorField> {
    protected optionsButtonsAttr: IOptionsButtonsAttr;
    protected genericFieldOptions: IGenericFieldOptions;
    public schema: NumberSchema;

    protected optionModalRef: React.RefObject<EditorOptionModal>;
    protected genericFieldRef: React.RefObject<GenericField>;

    constructor(props: ISchemaEditorProps<INumberSchemaType>) {
        super(props);

        this.optionModalRef = React.createRef<EditorOptionModal>();
        this.genericFieldRef = React.createRef<GenericField>();

        this.schema = new NumberSchema(props.schema, props.field);

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
        if (this.state.currentField.minimum > this.state.currentField.maximum) this.updateHint("warn", "Min Value > Max Value");
    }

    componentDidUpdate(prevProps: ISchemaEditorProps<INumberSchemaType>, prevState: ISchemaEditorState<INumberEditorField>): void {
        if (
            // NaN === NaN (get false)
            // NaN !== NaN (get true)
            (prevState.currentField.minimum !== this.state.currentField.minimum &&
                !(isNaN(prevState.currentField.minimum) && isNaN(this.state.currentField.minimum))) ||
            (prevState.currentField.maximum !== this.state.currentField.maximum &&
                !(isNaN(prevState.currentField.maximum) && isNaN(this.state.currentField.maximum)))
        ) {
            if (this.state.currentField.maximum < this.state.currentField.minimum) {
                this.updateHint("warn", "Min Value > Max Value");
            } else {
                this.updateHint("warn", undefined);
            }
        }
    }

    exportSchema(): INumberSchemaType {
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
                        <HintText hint={this.state.hint} />

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
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} controlId="MaxValue">
                                            <Form.Label column lg="2">
                                                Max Value
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
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row}>
                                            <Form.Label column lg="2" htmlFor="Default">
                                                Default
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

export default NumberSchemaEditor;
