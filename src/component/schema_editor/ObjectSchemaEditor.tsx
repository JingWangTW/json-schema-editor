// I think there is some bugs  in either eslint or react to use forwardref
// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React from "react";
import { Col, Form, Row } from "react-bootstrap";

import ObjectSchema from "../../model/schema/ObjectSchema";
import { IObjectSchemaType } from "../../model/schema/type_schema";
import EditorOptionModal from "../node_component/EditorOptionModal";
import GenericField from "../node_component/GenericField";
import HintText from "../node_component/HintText";
import OptionsButtons from "../node_component/OptionsButtons";
import SpaceFront from "../node_component/SpaceFront";
import { IGenericFieldOptions, IOptionsButtonsAttr } from "../node_component/type_NodeComponent";
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

    constructor(props: ISchemaEditorProps<IObjectSchemaType>) {
        super(props);

        this.optionModalRef = React.createRef<EditorOptionModal>();
        this.genericFieldRef = React.createRef<GenericField>();
        this.childrenRef = React.createRef<ChildrenSchemaEditor>();

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
            this.updateHint("warn", "minProperties > maxProperties");
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
                this.updateHint("warn", "minProperties > maxProperties");
            } else {
                this.updateHint("warn");
            }
        }
    }

    exportSchema(): IObjectSchemaType {
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
                                            <Form.Label column lg="auto" htmlFor="MinProperties">
                                                Min Properties
                                            </Form.Label>
                                            <Col>
                                                <Form.Control
                                                    type="number"
                                                    min="0"
                                                    id="MinProperties"
                                                    value={this.state.currentField.minProperties}
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
                                                    value={this.state.currentField.maxProperties}
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
