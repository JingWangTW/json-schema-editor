import "../../index.css";

import React from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiOutlineSetting } from "react-icons/ai";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";

import { NextId } from "../../model/utility";
import { IOptionsButtonsAttr } from "./type_NodeComponent";

interface INodeOptionsButtonsProps {
    buttonOptions: IOptionsButtonsAttr;

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

function NodeOptionsButtons(props: INodeOptionsButtonsProps): JSX.Element {
    if (props.buttonOptions.hasChild && !props.addChild)
        throw new Error("Bad arguments to create NodeOptionsButtons: Provide buttonOptions.hasChild = true, without addChild()");
    else if (props.buttonOptions.hasSibling && !props.addSibling)
        throw new Error("Bad arguments to create NodeOptionsButtons: Provide buttonOptions.hasSibling = true, without addSibling()");
    else if (props.buttonOptions.isDeleteable && !props.delete)
        throw new Error("Bad arguments to create NodeOptionsButtons: Provide buttonOptions.isDeleteable = true, without delete()");

    const addHtmlDropId = NextId.next("Key").toString();
    const addToolTipId = NextId.next("Key").toString();

    return (
        <div className="node-option-block">
            {props.buttonOptions.hasChild && props.buttonOptions.hasSibling && (
                <div className="node-option-btn-block">
                    <Dropdown>
                        <Dropdown.Toggle as={ToggleAddButton} id={addHtmlDropId} />

                        <Dropdown.Menu>
                            <Dropdown.Item href="#" eventKey="1" onClick={props.addSibling}>
                                Add Sibling
                            </Dropdown.Item>
                            <Dropdown.Item href="#" eventKey="2" onClick={props.addChild}>
                                Add Child
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )}

            {props.buttonOptions.hasChild !== props.buttonOptions.hasSibling && (
                <div className="node-option-btn-block" onClick={props.buttonOptions.hasChild ? props.addChild : props.addSibling}>
                    <OverlayTrigger trigger={["hover", "focus"]} overlay={<Tooltip id={addToolTipId}> Add </Tooltip>}>
                        <span>
                            <FaPlus color="green" />
                        </span>
                    </OverlayTrigger>
                </div>
            )}

            {props.buttonOptions.isDeleteable && (
                <div className="node-option-btn-block" onClick={props.delete}>
                    <OverlayTrigger trigger={["hover", "focus"]} overlay={<Tooltip id="delete-tooltip"> Delete </Tooltip>}>
                        <span>
                            <FaRegTrashAlt color="red" />
                        </span>
                    </OverlayTrigger>
                </div>
            )}

            {props.buttonOptions.isOptionExist && (
                <div className="node-option-btn-block" onClick={props.showOptionModal}>
                    <OverlayTrigger trigger={["hover", "focus"]} overlay={<Tooltip id="option-tooltip"> Option </Tooltip>}>
                        <span>
                            <AiOutlineSetting />
                        </span>
                    </OverlayTrigger>
                </div>
            )}
        </div>
    );
}

export default NodeOptionsButtons;
