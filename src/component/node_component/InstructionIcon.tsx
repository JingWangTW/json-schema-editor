import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import { EmptyState } from "../type_component";

interface IInstructionIconProps {
    text: string;
}

class InstructionIcon extends React.Component<IInstructionIconProps, EmptyState> {
    render(): JSX.Element {
        return (
            <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip">{this.props.text}</Tooltip>}
            >
                <span>
                    <AiOutlineQuestionCircle />
                </span>
            </OverlayTrigger>
        );
    }
}

export default InstructionIcon;
