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
import ChildrenSchemaEditor from "./ChildrenSchemaEditor";
import { IArrayEditorField, ISchemaEditorProps } from "./type_SchemaEditor";

interface IArraySchemaEditorState {
    field: OmitGenericField<IArrayEditorField>;

    hint?: type_Hints;
}

class ArraySchemaEditor extends React.Component<ISchemaEditorProps<IArrayEditorField>, IArraySchemaEditorState> {
    private defaultField: DefaultGenericField & Required<OmitGenericField<IArrayEditorField>>;

    private optionModalRef: React.RefObject<EditorOptionModal>;
    private optionFormRef: React.RefObject<HTMLFormElement>;
    private childrenRef: React.RefObject<ChildrenSchemaEditor>;

    private optionsButtonsAttr: IOptionsButtonsAttr;
    private genericFieldOptions: IGenericFieldOptions;

    constructor(props: ISchemaEditorProps<IArrayEditorField>) {
        super(props);

        // remove field from props
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { field: temp, ...propsRemoveField } = props;

        this.optionModalRef = React.createRef<EditorOptionModal>();
        this.optionFormRef = React.createRef<HTMLFormElement>();
        this.childrenRef = React.createRef<ChildrenSchemaEditor>();

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

        this.defaultField = {
            type: DataType.Array,
            minItems: 0,
            maxItems: 0,
            uniqueItems: false,
            ...props.field,
        };

        this.state = {
            field: this.defaultField,

            ...propsRemoveField,
        };
    }

    componentDidMount(): void {
        this.addChild();
    }

    showOptionModal(): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.optionModalRef.current!.setDisplayOptionModal(true);
    }

    changeType(newType: DataType): void {
        this.props.changeType(this.props.selfId, newType);
    }

    addChild(): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.childrenRef.current!.add("", {
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

    addSibling(): void {
        if (this.props.addSibling) this.props.addSibling();
    }

    delete(): void {
        if (this.props.delete) this.props.delete();
    }

    resetOptionField(): void {
        this.setState({
            field: this.defaultField,
        });
    }

    recordField(fieldName: keyof OmitGenericField<IArrayEditorField>, event: React.ChangeEvent<HTMLInputElement>): void {
        if (fieldName === "minItems" || fieldName === "maxItems") {
            this.setState(prevState => ({
                field: {
                    ...prevState.field,
                    [fieldName]: event.target.value,
                },
            }));
        } else {
            this.setState(prevState => ({
                field: {
                    ...prevState.field,
                    [fieldName]: event.target.checked,
                },
            }));
        }
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
                                        defaultField={this.defaultField}
                                        options={this.genericFieldOptions}
                                        changeType={this.changeType.bind(this)}
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
                                    <Form ref={this.optionFormRef}>
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
                <ChildrenSchemaEditor ref={this.childrenRef} depth={this.props.depth} />
            </div>
        );
    }
}

export default ArraySchemaEditor;
