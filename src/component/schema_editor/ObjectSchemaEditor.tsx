import React from "react";
import { Col, Form, Row } from "react-bootstrap";

import { DataType } from "../../type";
import EditorOptionModal from "../node_component/EditorOptionModal";
import GenericField from "../node_component/GeneralField";
import HintText from "../node_component/HintText";
import OptionsButtons from "../node_component/OptionsButtons";
import SpaceFront from "../node_component/SpaceFront";
import {
    DefaultGenericField,
    IGenericFieldOptions,
    IOptionsButtonsAttr,
    OmitGenericField,
    type_Hints,
} from "../node_component/type_NodeComponent";
import { IObjectEditorField, ISchemaEditorProps } from "./type_SchemaEditor";

interface IObjectSchemaEditorState {
    field: OmitGenericField<IObjectEditorField>;

    hint?: type_Hints;
}

class ObjectSchemaEditor extends React.Component<ISchemaEditorProps<IObjectEditorField>, IObjectSchemaEditorState> {
    private defaultField: DefaultGenericField & Required<OmitGenericField<IObjectEditorField>>;
    private optionModalRef: React.RefObject<EditorOptionModal>;
    private optionsButtonsAttr: IOptionsButtonsAttr;
    private genericFieldOptions: IGenericFieldOptions;

    constructor(props: ISchemaEditorProps<IObjectEditorField>) {
        super(props);

        const propsRemoveField = { ...props, field: undefined } as Omit<ISchemaEditorProps<IObjectEditorField>, "field">;

        this.optionModalRef = React.createRef<EditorOptionModal>();
        this.optionsButtonsAttr = {
            hasChild: true,
            hasSibling: true,
            isDeleteAble: true,
            isOptionExist: true,
            ...props, // override hasSibling, isDeleteAble
        };

        this.genericFieldOptions = {
            ...props, // override isRequiredFieldReadonly, isNameFieldReadonly
        };

        this.defaultField = {
            type: DataType.Object,
            maxProperties: 0,
            minProperties: 0,
            ...props.field,
        };

        this.state = {
            field: this.defaultField,

            ...propsRemoveField,
        };
    }

    showOptionModal(): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.optionModalRef.current!.setDisplayOptionModal(true);
    }

    nullFunction(): void {
        // to make eslint happy
        console.log("eslint Happy");
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
                                <GenericField defaultField={this.defaultField} options={this.genericFieldOptions} />
                                <OptionsButtons
                                    buttonOptions={this.optionsButtonsAttr}
                                    delete={this.nullFunction.bind(this)}
                                    addChild={this.nullFunction.bind(this)}
                                    addSibling={this.nullFunction.bind(this)}
                                    showOptionModal={this.showOptionModal.bind(this, true)}
                                />
                                <EditorOptionModal resetOptionFiledForm={this.nullFunction} ref={this.optionModalRef}>
                                    <Form.Group as={Row}>
                                        <Form.Label column lg="auto" htmlFor="MinProperties">
                                            Min Properties
                                        </Form.Label>
                                        <Col>
                                            <Form.Control
                                                type="number"
                                                min="0"
                                                id="MinProperties"
                                                defaultValue={this.defaultField.minProperties}
                                                // onChange={this.recordField.bind(this, "minProperties")}
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
                                                defaultValue={this.defaultField.maxProperties}
                                                // onChange={this.recordField.bind(this, "maxProperties")}
                                            />
                                        </Col>
                                    </Form.Group>
                                </EditorOptionModal>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>

                {/* {this.state.hasChild && <ChildrenNodes ref={this.childRef} depth={this.props.depth + 1} />} */}
            </div>
        );
    }
}

export default ObjectSchemaEditor;
