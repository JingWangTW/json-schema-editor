import React from 'react';
import { FaRegTrashAlt, FaPlus } from 'react-icons/fa';
import { AiOutlineSetting } from 'react-icons/ai';
import '../../index.css';
import { OverlayTrigger, Tooltip, Popover, ListGroup } from 'react-bootstrap';

import { NodeOptionButtonsProps } from './interface/SchemaComponentProps';

const popover = (
    <Popover id="popover-basic">
        <ListGroup>
            <ListGroup.Item>Add Sibling</ListGroup.Item>
            <ListGroup.Item>Add Child</ListGroup.Item>
        </ListGroup>
    </Popover>
);

class NodeOptionButtons extends React.Component<NodeOptionButtonsProps, {}> {

    constructor(props: NodeOptionButtonsProps) {
        super(props);
    }

    clickAdd() {
    }

    clickDelete() {
    }

    clickOption() {
    }

    render() {
        return (
            <div className="node-option-block">
                <div className="node-option-btn-block" onClick={this.clickAdd.bind(this)}>
                    <OverlayTrigger
                        trigger="hover"
                        overlay={<Tooltip id="add-tooltip"> Add </Tooltip>}
                    >
                        <span><FaPlus color="green" /></span>
                    </OverlayTrigger>
                </div>
                <div className="node-option-btn-block" onClick={this.clickDelete.bind(this)}>
                    <OverlayTrigger
                        trigger="hover"
                        overlay={<Tooltip id="add-tooltip"> Delete </Tooltip>}
                    >
                        <span><FaRegTrashAlt color="red" /></span>
                    </OverlayTrigger>
                </div>
                <div className="node-option-btn-block" onClick={this.clickOption.bind(this)}>
                    <OverlayTrigger
                        trigger="hover"
                        overlay={<Tooltip id="add-tooltip"> Option </Tooltip>}
                    >
                        <span><AiOutlineSetting /></span>
                    </OverlayTrigger>
                </div>
            </div>
        );
    }
}

export default NodeOptionButtons;