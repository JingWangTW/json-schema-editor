import React from "react";
import { Col, Form, Row } from "react-bootstrap";

import NullSchema from "../../model/schema/NullSchema";
import { INullSchemaType } from "../../model/schema/type_schema";
import GenericField from "../node_component/GenericField";
import OptionsButtons from "../node_component/OptionsButtons";
import SpaceFront from "../node_component/SpaceFront";
import { IGenericFieldOptions, IOptionsButtonsAttr } from "../node_component/type_NodeComponent";
import SchemaEditor from "./SchemaEditor";
import { INullEditorField, ISchemaEditorProps } from "./type_SchemaEditor";

class NullSchemaEditor extends SchemaEditor<INullSchemaType, INullEditorField> {
    protected optionsButtonsAttr: IOptionsButtonsAttr;
    protected genericFieldOptions: IGenericFieldOptions;
    public schema: NullSchema;

    protected genericFieldRef: React.RefObject<GenericField>;

    constructor(props: ISchemaEditorProps<INullSchemaType>) {
        super(props);

        this.genericFieldRef = React.createRef<GenericField>();

        this.schema = new NullSchema(props.schema, props.field);

        this.optionsButtonsAttr = {
            hasChild: false,
            hasSibling: true,
            isDeleteable: true,
            isOptionExist: false,
            ...props, // override hasSibling, isDeleteable
        };

        this.genericFieldOptions = {
            ...props, // override isRequiredFieldReadonly, isNameFieldReadonly
        };

        this.state = {
            currentField: this.schema.getDefaultField(),
        };
    }

    exportSchema(): INullSchemaType {
        return this.schema.exportSchema();
    }

    render(): JSX.Element {
        return (
            <div className="my-1">
                <Row>
                    <SpaceFront depth={this.props.depth} />

                    <Col>
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
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default NullSchemaEditor;
