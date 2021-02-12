import React from "react";

import { EmptyState } from "../type_component";
import { type_Hints } from "./type_NodeComponent";

type IHintTextProps = { hint?: type_Hints };

class HintText extends React.Component<IHintTextProps, EmptyState> {
    renderHint(): JSX.Element[] {
        const r: JSX.Element[] = [];

        for (const key in this.props.hint) {
            switch (key) {
                case "info":
                    r.push(<span style={{ color: "green" }}>{this.props.hint[key]}</span>);
                    r.push(<br />);
                    break;
                case "error":
                    r.push(<span style={{ color: "red" }}>{this.props.hint[key]}</span>);
                    r.push(<br />);
                    break;
            }
        }

        return r;
    }

    render(): JSX.Element {
        if (this.props.hint) {
            return <>{this.renderHint()}</>;
        } else {
            return <></>;
        }
    }
}

export default HintText;
