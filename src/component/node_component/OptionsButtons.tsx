import "../../index.css";

import React from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiOutlineSetting } from "react-icons/ai";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";

import { NextId } from "../../model/utility";
import { EmptyState } from "../type_component";

interface INodeOptionsButtonsProps {
    buttonOptions: {
        hasChild: boolean;
        hasSibling: boolean;
        isDeleteAble: boolean;
    };

    showOptionModal(): void;

    addChild?(): void;
    addSibling?(): void;
    delete?(): void;
}

interface ToggleAddButtonProps {
    id: string;
    onClick(event: React.MouseEvent<HTMLSpanElement>): void;
}

const ToggleAddButton = React.forwardRef<HTMLSpanElement, ToggleAddButtonProps>((props: ToggleAddButtonProps, ref) => (
    <span ref={ref} id={props.id} onClick={props.onClick}>
        <FaPlus color="green" />
    </span>
));

// to make eslint happy
ToggleAddButton.displayName = "ToggleAddButton";

class NodeOptionsButtons extends React.Component<INodeOptionsButtonsProps, EmptyState> {
    private readonly addHtmlDropId = NextId.next("Key").toString();
    private readonly addToolTipId = NextId.next("Key").toString();

    constructor(props: INodeOptionsButtonsProps) {
        super(props);

        // check props
        if (props.buttonOptions.hasChild && !props.addChild)
            throw new Error("Bad arguments to create NodeOptionsButtons: Provide buttonOptions.hasChild = true, without addChild()");
        else if (props.buttonOptions.hasSibling && !props.addSibling)
            throw new Error("Bad arguments to create NodeOptionsButtons: Provide buttonOptions.hasSibling = true, without addSibling()");
        else if (props.buttonOptions.isDeleteAble && !props.delete)
            throw new Error("Bad arguments to create NodeOptionsButtons: Provide buttonOptions.isDeleteAble = true, without delete()");
    }

    render(): JSX.Element {
        return (
            <div className="node-option-block">
                {this.props.buttonOptions.hasChild && this.props.buttonOptions.hasSibling && (
                    <div className="node-option-btn-block">
                        <Dropdown>
                            <Dropdown.Toggle as={ToggleAddButton} id={this.addHtmlDropId} />

                            <Dropdown.Menu>
                                <Dropdown.Item href="#" eventKey="1" onClick={this.props.addSibling}>
                                    Add Sibling
                                </Dropdown.Item>
                                <Dropdown.Item href="#" eventKey="2" onClick={this.props.addChild}>
                                    Add Child
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )}
                {this.props.buttonOptions.hasChild !== this.props.buttonOptions.hasSibling && (
                    <div
                        className="node-option-btn-block"
                        onClick={this.props.buttonOptions.hasChild ? this.props.addChild : this.props.addSibling}
                    >
                        <OverlayTrigger trigger={["hover", "focus"]} overlay={<Tooltip id={this.addToolTipId}> Add </Tooltip>}>
                            <span>
                                <FaPlus color="green" />
                            </span>
                        </OverlayTrigger>
                    </div>
                )}

                {this.props.buttonOptions.isDeleteAble && (
                    <div className="node-option-btn-block" onClick={this.props.delete}>
                        <OverlayTrigger trigger={["hover", "focus"]} overlay={<Tooltip id="delete-tooltip"> Delete </Tooltip>}>
                            <span>
                                <FaRegTrashAlt color="red" />
                            </span>
                        </OverlayTrigger>
                    </div>
                )}

                <div className="node-option-btn-block" onClick={this.props.showOptionModal.bind(this)}>
                    <OverlayTrigger trigger={["hover", "focus"]} overlay={<Tooltip id="option-tooltip"> Option </Tooltip>}>
                        <span>
                            <AiOutlineSetting />
                        </span>
                    </OverlayTrigger>
                </div>
            </div>
        );
    }
}

export default NodeOptionsButtons;
