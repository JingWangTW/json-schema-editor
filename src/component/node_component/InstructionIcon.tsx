import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import { EmptyState } from "../type_component";

interface IInstructionIconProps {
    text: string;
}

class InstructionIcon extends React.Component<IInstructionIconProps, EmptyState> {
    renderText(props: unknown): JSX.Element {
        return (
            <Tooltip id="button-tooltip" {...props}>
                {this.props.text}
            </Tooltip>
        );
    }

    render(): JSX.Element {
        return (
            <OverlayTrigger placement="auto" delay={{ show: 250, hide: 400 }} overlay={this.renderText.bind(this)}>
                <AiOutlineQuestionCircle />
            </OverlayTrigger>
        );
    }
}

export default InstructionIcon;
