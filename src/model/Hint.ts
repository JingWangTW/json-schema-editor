export enum Error {
    DUPLICATED_FIELD_NAME = "Find duplicated field name",
    CANT_PARSE_JSON_CONST = "Invalid JSON in const field",
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

class Hint {
    private hint: {
        error: Set<Error>;
        info: Set<Info>;
        warn: Set<Warn>;
    };

    constructor() {
        this.hint = {
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

    add(text: Error | Warn | Info): void {
        if (Hint.isWarnText(text)) {
            this.hint.warn.add(text as Warn);
        } else if (Hint.isInfoText(text)) {
            this.hint.info.add(text as Info);
        } else if (Hint.isErrorText(text)) {
            this.hint.error.add(text as Error);
        }
    }

    remove(text: Error | Warn | Info): void {
        if (Hint.isWarnText(text)) {
            this.hint.warn.delete(text as Warn);
        } else if (Hint.isInfoText(text)) {
            this.hint.info.delete(text as Info);
        } else if (Hint.isErrorText(text)) {
            this.hint.error.delete(text as Error);
        }
    }

    getError(): Error[] {
        return Array.from(this.hint.error);
    }

    getWarn(): Warn[] {
        return Array.from(this.hint.warn);
    }

    getInfo(): Info[] {
        return Array.from(this.hint.info);
    }

    getAll(): { error?: Error[]; warn?: Warn[]; info?: Info[] } {
        return {
            error: this.hint.error.size > 0 ? Array.from(this.hint.error) : undefined,
            warn: this.hint.warn.size > 0 ? Array.from(this.hint.warn) : undefined,
            info: this.hint.info.size > 0 ? Array.from(this.hint.info) : undefined,
        };
    }
}

export default Hint;
