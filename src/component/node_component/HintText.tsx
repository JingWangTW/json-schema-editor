import React from "react";

import { NextId } from "../../model/utility";
import { EmptyProps } from "../type_component";

export enum Error {
    DUPLICATED_FIELD_NAME = "Find duplicated field name",
    CANT_PARSE_JSON_CONST = "Invalid JSON in const field",
    CANT_PARSE_JSON_DEFAULT = "Invalid JSON in default field",
}

export enum Warn {
    MIN_GT_MAX_ITEMS = "Min Items > Max Items",
    MIN_GT_MAX_VALUE = "Min Value > Max Value",
    MIN_GT_MAX_PROPERTIES = "Min Properties > Max Properties",
    MIN_GT_MAX_LENGTH = "Min Length > Max Length",
}

export enum Info {
    ARRAY_ITEM_INDEX_MATTER = "Ordinal index of each item under Array type is meaningful",
}
interface IHintTextState {
    error: Set<Error>;
    info: Set<Info>;
    warn: Set<Warn>;
}

type HintType = keyof IHintTextState;
type HintTextType = Warn | Error | Info;

class HintText extends React.Component<EmptyProps, IHintTextState> {
    constructor(props: EmptyProps) {
        super(props);

        this.state = {
            error: new Set<Error>(),
            info: new Set<Info>(),
            warn: new Set<Warn>(),
        };
    }

    static isWarnText(text: string): text is Warn {
        return Object.values(Warn).includes(text as Warn);
    }

    static isInfoText(text: string): text is Info {
        return Object.values(Info).includes(text as Info);
    }

    static isErrorText(text: string): text is Error {
        return Object.values(Error).includes(text as Error);
    }

    add(text: HintTextType): void {
        if (HintText.isWarnText(text)) {
            if (!this.state["warn"].has(text)) this._addHint("warn", text);
        } else if (HintText.isInfoText(text)) {
            if (!this.state["info"].has(text)) this._addHint("info", text);
        } else if (HintText.isErrorText(text)) {
            if (!this.state["error"].has(text)) this._addHint("error", text);
        }
    }

    remove(text: HintTextType): void {
        if (HintText.isWarnText(text)) {
            if (this.state["warn"].has(text)) this._removeHint("warn", text);
        } else if (HintText.isInfoText(text)) {
            if (this.state["info"].has(text)) this._removeHint("info", text);
        } else if (HintText.isErrorText(text)) {
            if (this.state["error"].has(text)) this._removeHint("error", text);
        }
    }

    get(type: HintType): Warn[] | Error[] | Info[] {
        switch (type) {
            case "warn":
                return Array.from(this.state["warn"]);
            case "error":
                return Array.from(this.state["error"]);
            case "info":
                return Array.from(this.state["info"]);
        }
    }

    private _addHint<T extends HintType>(hintType: T, text: HintTextType): void {
        if (hintType === "warn") this.state["warn"].add(text as Warn);
        else if (hintType === "info") this.state["info"].add(text as Info);
        else if (hintType === "error") this.state["error"].add(text as Error);

        this.setState(this.state);
    }

    private _removeHint<T extends HintTextType>(hintType: HintType, text: T): void {
        if (hintType === "warn") this.state["warn"].delete(text as Warn);
        else if (hintType === "info") this.state["info"].delete(text as Info);
        else if (hintType === "error") this.state["error"].delete(text as Error);

        this.setState(this.state);
    }

    render(): JSX.Element {
        const renderElement: JSX.Element[] = [];
        const colorMapping: Record<HintType, string> = {
            error: "red",
            info: "green",
            warn: "orange",
        };

        let key: HintType;

        for (key in this.state) {
            this.state[key].forEach((text: HintTextType) => {
                renderElement.push(
                    <span style={{ color: colorMapping[key] }} key={NextId.next()}>
                        <b>{`${key.charAt(0).toUpperCase()}${key.substring(1)}`}: </b>
                        {text}
                    </span>
                );
            });
        }

        return <>{renderElement}</>;
    }
}

export default HintText;
