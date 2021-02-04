/* eslint-disable */
// I think there is some bugs  in either eslint or react to use forwardref
import React from "react";

import { DataType, PartialBy } from "../../type";
import { IGenericField } from "../node_component/type_NodeComponent";
import ArraySchemaEditor from "./ArraySchemaEditor";
import BooleanSchemaEditor from "./BooleanSchemaEditor";
import IntegerSchemaEditor from "./IntegerSchemaEditor";
import NullSchemaEditor from "./NullSchemaEditor";
import NumberSchemaEditor from "./NumberSchemaEditor";
import ObjectSchemaEditor from "./ObjectSchemaEditor";
import StringSchemaEditor from "./StringSchemaEditor";
import {
    IArrayEditorField,
    IBooleanEditorField,
    IEditorNullField,
    IIntegerEditorField,
    INumberEditorField,
    IObjectEditorField,
    ISchemaEditorProps,
    IStringEditorField,
    SchemaEditor,
} from "./type_SchemaEditor";

type FactoryProps = Omit<ISchemaEditorProps<IGenericField>, "field"> & { type: DataType; field?: PartialBy<IGenericField, "type"> };

const SchemaEditorFactory = React.forwardRef<SchemaEditor, FactoryProps>((props, ref) => {
    switch (props.type) {
        case DataType.Array:
            return (
                <ArraySchemaEditor
                    {...{ ...props, field: props.field as IArrayEditorField }}
                    ref={ref as React.RefObject<ArraySchemaEditor>}
                />
            );
        case DataType.Boolean:
            return (
                <BooleanSchemaEditor
                    {...{ ...props, field: props.field as IBooleanEditorField }}
                    ref={ref as React.RefObject<BooleanSchemaEditor>}
                />
            );
        case DataType.Integer:
            return (
                <IntegerSchemaEditor
                    {...{ ...props, field: props.field as IIntegerEditorField }}
                    ref={ref as React.RefObject<IntegerSchemaEditor>}
                />
            );
        case DataType.Number:
            return (
                <NumberSchemaEditor
                    {...{ ...props, field: props.field as INumberEditorField }}
                    ref={ref as React.RefObject<NumberSchemaEditor>}
                />
            );
        case DataType.Null:
            return (
                <NullSchemaEditor
                    {...{ ...props, field: props.field as IEditorNullField }}
                    ref={ref as React.RefObject<NullSchemaEditor>}
                />
            );
        case DataType.Object:
            return (
                <ObjectSchemaEditor
                    {...{ ...props, field: props.field as IObjectEditorField }}
                    ref={ref as React.RefObject<ObjectSchemaEditor>}
                />
            );
        case DataType.String:
            return (
                <StringSchemaEditor
                    {...{ ...props, field: props.field as IStringEditorField }}
                    ref={ref as React.RefObject<StringSchemaEditor>}
                />
            );
    }
});

// make eslint happy
SchemaEditorFactory.displayName = "SchemaEditorFactory";

export default SchemaEditorFactory;
