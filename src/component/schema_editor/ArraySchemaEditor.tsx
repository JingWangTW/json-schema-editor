import React from "react";
import { Col, Form, Row } from "react-bootstrap";

import ArraySchema from "../../model/schema/ArraySchema";
import { IArraySchemaType } from "../../model/schema/type_schema";
import { DataType, KeysMatching } from "../../type";
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
import { IArrayEditorField, IChildProperty, ISchemaEditorProps, ISchemaEditorState } from "./type_SchemaEditor";

class ArraySchemaEditor extends SchemaEditor<IArraySchemaType, IArrayEditorField> {
    protected optionsButtonsAttr: IOptionsButtonsAttr;
    protected genericFieldOptions: IGenericFieldOptions;
    public schema: ArraySchema;

    protected optionModalRef: React.RefObject<EditorOptionModal>;
    protected genericFieldRef: React.RefObject<GenericField>;
    protected childrenRef: React.RefObject<ChildrenSchemaEditor>;
    private hintTextRef: React.RefObject<HintText>;

    private childrenLength: number;

    constructor(props: ISchemaEditorProps<IArraySchemaType>) {
        super(props);

        this.optionModalRef = React.createRef<EditorOptionModal>();
        this.genericFieldRef = React.createRef<GenericField>();
        this.childrenRef = React.createRef<ChildrenSchemaEditor>();
        this.hintTextRef = React.createRef<HintText>();

        this.schema = new ArraySchema(props.schema, props.field);

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

        this.childrenLength = 0;

        this.state = {
            currentField: this.schema.getDefaultField(),
        };
    }

    componentDidMount(): void {
        if (!this.props.schema) this.addChild();
        if (this.state.currentField.maxItems < this.state.currentField.minItems) {
            this.hintTextRef.current?.add(Hint.Warn.MIN_GT_MAX_ITEMS);
        }
    }

    componentDidUpdate(prevProps: ISchemaEditorProps<IArraySchemaType>, prevState: ISchemaEditorState<IArrayEditorField>): void {
        if (
            // NaN === NaN (get false)
            // NaN !== NaN (get true)
            (prevState.currentField.maxItems !== this.state.currentField.maxItems &&
                !(isNaN(prevState.currentField.maxItems) && isNaN(this.state.currentField.maxItems))) ||
            (prevState.currentField.minItems !== this.state.currentField.minItems &&
                !(isNaN(prevState.currentField.minItems) && isNaN(this.state.currentField.minItems)))
        ) {
            if (this.state.currentField.maxItems < this.state.currentField.minItems) {
                this.hintTextRef.current?.add(Hint.Warn.MIN_GT_MAX_ITEMS);
            } else {
                this.hintTextRef.current?.remove(Hint.Warn.MIN_GT_MAX_ITEMS);
            }
        }
    }

    childrenDidUpdate(children: IChildProperty[]): void {
        if (this.childrenLength !== children.length) {
            if (children.length > 1) {
                this.hintTextRef.current?.add(Hint.Info.ARRAY_ITEM_INDEX_MATTER);
            } else {
                this.hintTextRef.current?.remove(Hint.Info.ARRAY_ITEM_INDEX_MATTER);
            }

            this.childrenLength = children.length;
        }
    }

    addChild(): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.childrenRef.current!.add("", {
            type: DataType.Object,
            isDeleteable: true,
            hasSibling: true,
            isRequiredFieldReadonly: true,
            isNameFieldReadonly: true,

            field: {
                name: "items",
                required: true,
            },
        });
    }

    exportSchema(): IArraySchemaType {
        return this.schema.exportSchema(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.childrenRef.current!.exportSchema()
        );
    }

    recordCode(field: KeysMatching<IArrayEditorField, CodeFieldValue>, value: CodeFieldValue): void {
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
                                            <Form.Label column lg="2" htmlFor="MinItems">
                                                Min Items
                                                <InstructionIcon text="The size of the array instance should be greater than or equal to this keyword." />
                                            </Form.Label>
                                            <Col lg="4">
                                                <Form.Control
                                                    type="number"
                                                    min="0"
                                                    id="MinItems"
                                                    value={this.state.currentField.minItems}
                                                    onChange={this.recordField.bind(this, "minItems")}
                                                />
                                            </Col>
                                            <Form.Label column lg="2" htmlFor="MaxItems">
                                                Max Items
                                                <InstructionIcon text="The size of the array instance should be less than or equal to this keyword." />
                                            </Form.Label>
                                            <Col lg="4">
                                                <Form.Control
                                                    type="number"
                                                    min="0"
                                                    id="MaxItems"
                                                    value={this.state.currentField.maxItems}
                                                    onChange={this.recordField.bind(this, "maxItems")}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label column lg="2" htmlFor="Constant">
                                                Constant
                                                <InstructionIcon text="An array instance would be valid if its value is equal to this keyword." />
                                            </Form.Label>
                                            <Col lg="10">
                                                <CodeField
                                                    title="Array constant"
                                                    value={this.state.currentField.const}
                                                    update={this.recordCode.bind(this, "const")}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label column lg="2" htmlFor="Default">
                                                Default
                                                <InstructionIcon text="This keyword can be used to supply a default JSON value associated with this array schema." />
                                            </Form.Label>
                                            <Col lg="10">
                                                <CodeField
                                                    title="Array default"
                                                    value={this.state.currentField.default}
                                                    update={this.recordCode.bind(this, "default")}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Col log="12">
                                                <Form.Check type="checkbox" id="uniqueCheckbox">
                                                    <Form.Check.Input
                                                        type="checkbox"
                                                        checked={this.state.currentField.uniqueItems}
                                                        onChange={this.recordField.bind(this, "uniqueItems")}
                                                    />

                                                    <Form.Check.Label>
                                                        Unique Items
                                                        <InstructionIcon text="If checked, an array instance validates successfully if all of its elements are unique." />
                                                    </Form.Check.Label>
                                                </Form.Check>
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
                    isNameUnique={false}
                    childrenProperty={this.schema.childrenProperty}
                    childrenDidUpdate={this.childrenDidUpdate.bind(this)}
                />
            </div>
        );
    }
}

export default ArraySchemaEditor;
