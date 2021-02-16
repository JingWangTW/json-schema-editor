// I think there is some bugs  in either eslint or react to use forwardref
// eslint-disable-next-line @typescript-eslint/no-use-before-define
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
import { IGenericFieldOptions, IOptionsButtonsAttr } from "../node_component/type_NodeComponent";
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

    private childrenLength: number;

    constructor(props: ISchemaEditorProps<IArraySchemaType>) {
        super(props);

        this.optionModalRef = React.createRef<EditorOptionModal>();
        this.genericFieldRef = React.createRef<GenericField>();
        this.childrenRef = React.createRef<ChildrenSchemaEditor>();

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
            this.updateHint("warn", "minItems > maxItems");
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
                this.updateHint("warn", "minItems > maxItems");
            } else {
                this.updateHint("warn", undefined);
            }
        }
    }

    childrenDidUpdate(children: IChildProperty[]): void {
        if (this.childrenLength !== children.length) {
            if (children.length > 1) {
                this.updateHint("info", "Ordinal index of each item under Array type is meaningful.");
            } else {
                this.updateHint("info");
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
                                        <Form.Group as={Row}>
                                            <Form.Label column lg="2" htmlFor="MinItems">
                                                Min Items
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
                                        <Form.Group>
                                            <Form.Check type="checkbox" id="uniqueCheckbox">
                                                <Form.Check.Input
                                                    type="checkbox"
                                                    checked={this.state.currentField.uniqueItems}
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
                    isNameUnique={false}
                    childrenProperty={this.schema.childrenProperty}
                    childrenDidUpdate={this.childrenDidUpdate.bind(this)}
                />
            </div>
        );
    }
}

export default ArraySchemaEditor;
