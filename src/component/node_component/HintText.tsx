// I think there is some bugs  in either eslint or react to use forwardref
// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React from "react";

import Hint, * as HintTextType from "../../model/Hint";
import { NextId } from "../../model/utility";
import { EmptyState } from "../type_component";

type IHintTextProps = { hint?: Hint };

class HintText extends React.Component<IHintTextProps, EmptyState> {
    renderHint(): JSX.Element[] {
        const r: JSX.Element[] = [];

        if (this.props.hint) {
            let key: "warn" | "info" | "error";
            const all_hint = this.props.hint.getAll();

            for (key in all_hint) {
                if (all_hint[key] !== undefined) {
                    switch (key) {
                        case "info":
                            r.push(
                                ...(all_hint[key] as HintTextType.Info[]).map(h => {
                                    return (
                                        <span style={{ color: "green" }} key={NextId.next()}>
                                            <b>Hint: </b>
                                            {h}
                                        </span>
                                    );
                                })
                            );

                            break;
                        case "warn":
                            r.push(
                                ...(all_hint[key] as HintTextType.Warn[]).map(h => {
                                    return (
                                        <span style={{ color: "orange" }} key={NextId.next()}>
                                            <b>Warn: </b>
                                            {h}
                                        </span>
                                    );
                                })
                            );
                            r.push(<br />);
                            break;
                        case "error":
                            r.push(
                                ...(all_hint[key] as HintTextType.Error[]).map(h => {
                                    return (
                                        <span style={{ color: "red" }} key={NextId.next()}>
                                            <b>Error: </b>
                                            {h}
                                        </span>
                                    );
                                })
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
