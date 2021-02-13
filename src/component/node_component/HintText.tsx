import React from "react";

import { EmptyState } from "../type_component";
import { type_Hints } from "./type_NodeComponent";

type IHintTextProps = { hint?: type_Hints };

class HintText extends React.Component<IHintTextProps, EmptyState> {
    renderHint(): JSX.Element[] {
        const r: JSX.Element[] = [];

        if (this.props.hint) {
            let key: keyof type_Hints;

            for (key in this.props.hint) {
                if (this.props.hint[key] !== undefined) {
                    switch (key) {
                        case "info":
                            r.push(
                                <span style={{ color: "green" }}>
                                    <b>Hint: </b>
                                    {this.props.hint[key]}
                                </span>
                            );
                            r.push(<br />);
                            break;
                        case "warn":
                            r.push(
                                <span style={{ color: "orange" }}>
                                    <b>Warning: </b>
                                    {this.props.hint[key]}
                                </span>
                            );
                            r.push(<br />);
                            break;
                        case "error":
                            r.push(
                                <span style={{ color: "red" }}>
                                    <b>{`Error: ${this.props.hint[key]}`}</b>
                                </span>
                            );
                            r.push(<br />);
                            break;
                    }
                }
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
