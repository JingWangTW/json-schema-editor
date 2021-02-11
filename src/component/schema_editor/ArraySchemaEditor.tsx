import React from "react";
import { Col, Form, Row } from "react-bootstrap";

import ArraySchema from "../../model/schema/ArraySchema";
import { IArraySchemaType } from "../../model/schema/type_schema";
import { DataType } from "../../type";
import EditorOptionModal from "../node_component/EditorOptionModal";
import GenericField from "../node_component/GenericField";
import HintText from "../node_component/HintText";
import OptionsButtons from "../node_component/OptionsButtons";
import SpaceFront from "../node_component/SpaceFront";
import { IGenericField, IGenericFieldOptions, IOptionsButtonsAttr, OmitGenericField } from "../node_component/type_NodeComponent";
import ChildrenSchemaEditor from "./ChildrenSchemaEditor";
import SchemaEditor from "./SchemaEditor";
import { IArrayEditorField, IChildNodeProperty, ISchemaEditorProps, ISchemaEditorState } from "./type_SchemaEditor";

class ArraySchemaEditor extends SchemaEditor<IArraySchemaType, IArrayEditorField> {
    protected defaultField: Required<IGenericField> & Required<IArrayEditorField>;

    protected optionsButtonsAttr: IOptionsButtonsAttr;
    protected genericFieldOptions: IGenericFieldOptions;
    protected schema: ArraySchema;

    protected optionModalRef: React.RefObject<EditorOptionModal>;
    protected genericFieldRef: React.RefObject<GenericField>;
    protected childrenRef: React.RefObject<ChildrenSchemaEditor>;

    private childrenLength: number;

    constructor(props: ISchemaEditorProps<IArraySchemaType, IArrayEditorField>) {
        super(props);

        // remove field from props
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { field: temp, ...propsRemoveField } = props;

        this.optionModalRef = React.createRef<EditorOptionModal>();
        this.genericFieldRef = React.createRef<GenericField>();
        this.childrenRef = React.createRef<ChildrenSchemaEditor>();

        this.schema = new ArraySchema();

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
        this.childrenLength = 0;

        this.state = {
            field: this.defaultField,

            ...propsRemoveField,
        };
    }

    componentDidMount(): void {
        if (!this.props.schema || !this.props.schema.items) this.addChild();
    }

    componentDidUpdate(
        prevProps: ISchemaEditorProps<IArraySchemaType, IArrayEditorField>,
        prevState: ISchemaEditorState<IArrayEditorField>
    ): void {
        if (prevState.field.maxItems !== this.state.field.maxItems || prevState.field.minItems !== this.state.field.minItems) {
            if (this.state.field.maxItems < this.state.field.minItems) {
                this.setState(prevState => ({
                    hint: {
                        ...prevState.hint,
                        error: "minItems > maxItems",
                    },
                }));
            } else {
                this.setState(prevState => ({
                    hint: {
                        ...prevState.hint,
                        error: undefined,
                    },
                }));
            }
        }
    }

    addChild(): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.childrenRef.current!.add("", {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            isDeleteable: this.childrenRef.current!.length >= 1 ? true : false,
            hasSibling: true,
            isRequiredFieldReadonly: true,
            isNameFieldReadonly: true,

            field: {
                type: DataType.Object,
                name: "items",

                required: true,
            },
        });
    }

    recordField(fieldName: keyof OmitGenericField<IArrayEditorField>, event: React.ChangeEvent<HTMLInputElement>): void {
        if (fieldName === "minItems" || fieldName === "maxItems") {
            this.setField(fieldName, parseInt(event.target.value));
        } else {
            this.setField(fieldName, event.target.checked);
        }
    }

    childrenDidUpdate(children: IChildNodeProperty[]): void {
        if (this.childrenLength !== children.length) {
            if (children.length > 1) {
                this.setState(prevState => ({
                    hint: {
                        ...prevState.hint,
                        info: "Ordinal index of each item in Array type is meaningful.",
                    },
                }));
            } else {
                this.setState(prevState => ({
                    hint: {
                        ...prevState.hint,
                        info: undefined,
                    },
                }));
            }

            this.childrenLength = children.length;
        }
    }

    exportSchema(): IArraySchemaType {
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
                                            <Form.Label column lg="2" htmlFor="MinItems">
                                                Min Items
                                            </Form.Label>
                                            <Col lg="4">
                                                <Form.Control
                                                    type="number"
                                                    min="0"
                                                    id="MinItems"
                                                    value={this.state.field.minItems}
                                                    defaultValue={this.state.field.minItems}
                                                    onChange={this.recordField.bind(this, "minItems")}
                                                />
                                            </Col>
                                            <Form.Label column lg="2" htmlFor="MaxItems">
                                                Max Items
                                            </Form.Label>
                                            <Col lg="4">
                                                <Form.Control
                                                    type="number"
                                                    min="0"
                                                    id="MaxItems"
                                                    value={this.state.field.maxItems}
                                                    defaultValue={this.state.field.maxItems}
                                                    onChange={this.recordField.bind(this, "maxItems")}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Check type="checkbox" id="uniqueCheckbox">
                                                <Form.Check.Input
                                                    type="checkbox"
                                                    checked={this.state.field.uniqueItems}
                                                    defaultChecked={this.state.field.uniqueItems}
                                                    onChange={this.recordField.bind(this, "uniqueItems")}
                                                />
                                                <Form.Check.Label>Unique Items</Form.Check.Label>
                                            </Form.Check>
                                        </Form.Group>
                                    </Form>
                                </EditorOptionModal>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
                <ChildrenSchemaEditor
                    ref={this.childrenRef}
                    depth={this.props.depth}
                    schema={this.props.schema}
                    childrenDidUpdate={this.childrenDidUpdate.bind(this)}
                />
            </div>
        );
    }
}

export default ArraySchemaEditor;
