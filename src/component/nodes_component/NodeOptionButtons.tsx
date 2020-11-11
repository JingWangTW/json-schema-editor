import React from 'react';
import { OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';
import nextId from "react-id-generator";
import { FaRegTrashAlt, FaPlus } from 'react-icons/fa';
import { AiOutlineSetting } from 'react-icons/ai';
import { NodeOptionButtonsProps } from './interface/Props';

import '../../index.css';

interface ToggleAddButtonProps {
    id: string;
    onClick(event: React.MouseEvent<HTMLSpanElement>): void;
}

const ToggleAddButton = React.forwardRef<HTMLSpanElement, ToggleAddButtonProps>((props, ref) => (
    <span
        ref={ref}
        id={props.id}
        onClick={props.onClick}>
        <FaPlus color="green" />
    </span>
));

class NodeOptionButtons extends React.Component<NodeOptionButtonsProps, {}> {

    private readonly addHtmlId = nextId("Add-Button");

    clickDelete() {
    }

    clickOption() {
        this.props.clickOption();
    }

    render() {
        return (
            <div className="node-option-block">
                {
                    this.props.hasChild
                        ?
                        (
                            <div className="node-option-btn-block">
                                <Dropdown>
                                    <Dropdown.Toggle as={ToggleAddButton} id={this.addHtmlId} />

                                    <Dropdown.Menu id={this.addHtmlId}>
                                        <Dropdown.Item eventKey="1">Add Sibling</Dropdown.Item>
                                        <Dropdown.Item eventKey="2">Add Child</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        )
                        :
                        (

                            <div className="node-option-btn-block" onClick={this.props.clickAdd.bind(this)}>
                                <OverlayTrigger
                                    trigger={["hover", "focus"]}
                                    overlay={<Tooltip id="add-tooltip"> Add </Tooltip>}
                                >
                                    <span><FaPlus color="green" /></span>
                                </OverlayTrigger>
                            </div>
                        )

                }

                {
                    this.props.isDeleteAble && (
                        <div className="node-option-btn-block" onClick={this.clickDelete.bind(this)}>
                            <OverlayTrigger
                                trigger={["hover", "focus"]}
                                overlay={<Tooltip id="delete-tooltip"> Delete </Tooltip>}
                            >
                                <span><FaRegTrashAlt color="red" /></span>
                            </OverlayTrigger>
                        </div>
                    )
                }

                {
                    this.props.isOptionExist && (
                        <div className="node-option-btn-block" onClick={this.clickOption.bind(this)}>
                            <OverlayTrigger
                                trigger={["hover", "focus"]}
                                overlay={<Tooltip id="option-tooltip"> Option </Tooltip>}
                            >
                                <span><AiOutlineSetting /></span>
                            </OverlayTrigger>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default NodeOptionButtons;