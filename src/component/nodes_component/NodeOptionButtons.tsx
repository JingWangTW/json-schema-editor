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

    private readonly addHtmlDropId = nextId("Add-Dropdown");
    private readonly addToolTipId = nextId("Add-Tooltip")

    clickDelete() {
    }

    dropDownOnToggle(isOpen: boolean,
        event: React.SyntheticEvent<Dropdown>,
        metadata: {
            source: 'select' | 'click' | 'rootClose' | 'keydown'
        }): void {

        if (event)
            event.stopPropagation();
    }

    render() {
        return (
            <div className="node-option-block">
                {
                    this.props.hasChild && this.props.hasSibling &&
                    (
                        <div className="node-option-btn-block">
                            <Dropdown onToggle={this.dropDownOnToggle.bind(this)}>
                                <Dropdown.Toggle as={ToggleAddButton} id={this.addHtmlDropId} />

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#" eventKey="1" onClick={this.props.clickAddSibling}>Add Sibling</Dropdown.Item>
                                    <Dropdown.Item href="#" eventKey="2" onClick={this.props.clickAddChild}>Add Child</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    )

                }
                {
                    (this.props.hasChild !== this.props.hasSibling) &&
                    (
                        <div className="node-option-btn-block" onClick={this.props.hasChild ? this.props.clickAddChild : this.props.clickAddSibling}>
                            <OverlayTrigger
                                trigger={["hover", "focus"]}
                                overlay={<Tooltip id={this.addToolTipId}> Add </Tooltip>}
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
                        <div className="node-option-btn-block" onClick={this.props.clickOption}>
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