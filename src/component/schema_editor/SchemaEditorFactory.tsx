/* eslint-disable */
// I think there is some bugs  in either eslint or react to use forwardref
import React from "react";

import {
    IArraySchemaType,
    IBooleanSchemaType,
    IIntegerSchemaType,
    INullSchemaType,
    INumberSchemaType,
    IObjectSchemaType,
    ISchemaType,
    IStringSchemaType,
} from "../../model/schema/type_schema";
import { DataType } from "../../type";
import { IGenericField } from "../node_component/type_NodeComponent";
import ArraySchemaEditor from "./ArraySchemaEditor";
import BooleanSchemaEditor from "./BooleanSchemaEditor";
import IntegerSchemaEditor from "./IntegerSchemaEditor";
import NullSchemaEditor from "./NullSchemaEditor";
import NumberSchemaEditor from "./NumberSchemaEditor";
import ObjectSchemaEditor from "./ObjectSchemaEditor";
import StringSchemaEditor from "./StringSchemaEditor";
import { ISchemaEditorProps, ISchemaEditorType } from "./type_SchemaEditor";

type FactoryProps = Omit<ISchemaEditorProps<ISchemaType>, "field"> & {
    type: DataType;
    field?: Omit<IGenericField, "type">;
};

const SchemaEditorFactory = React.forwardRef<ISchemaEditorType, FactoryProps>((props, ref) => {
    switch (props.type) {
        case DataType.Array:
            return (
                <ArraySchemaEditor
                    {...{ ...props, field: props.field, schema: props.schema as IArraySchemaType }}
                    ref={ref as React.RefObject<ArraySchemaEditor>}
                />
            );
        case DataType.Boolean:
            return (
                <BooleanSchemaEditor
                    {...{ ...props, field: props.field, schema: props.schema as IBooleanSchemaType }}
                    ref={ref as React.RefObject<BooleanSchemaEditor>}
                />
            );
        case DataType.Integer:
            return (
                <IntegerSchemaEditor
                    {...{ ...props, field: props.field, schema: props.schema as IIntegerSchemaType }}
                    ref={ref as React.RefObject<IntegerSchemaEditor>}
                />
            );
        case DataType.Number:
            return (
                <NumberSchemaEditor
                    {...{ ...props, field: props.field, schema: props.schema as INumberSchemaType }}
                    ref={ref as React.RefObject<NumberSchemaEditor>}
                />
            );
        case DataType.Null:
            return (
                <NullSchemaEditor
                    {...{ ...props, field: props.field, schema: props.schema as INullSchemaType }}
                    ref={ref as React.RefObject<NullSchemaEditor>}
                />
            );
        case DataType.Object:
            return (
                <ObjectSchemaEditor
                    {...{ ...props, field: props.field, schema: props.schema as IObjectSchemaType }}
                    ref={ref as React.RefObject<ObjectSchemaEditor>}
                />
            );
        case DataType.String:
            return (
                <StringSchemaEditor
                    {...{ ...props, field: props.field, schema: props.schema as IStringSchemaType }}
                    ref={ref as React.RefObject<StringSchemaEditor>}
                />
            );
    }
});

// make eslint happy
SchemaEditorFactory.displayName = "SchemaEditorFactory";

export default SchemaEditorFactory;
