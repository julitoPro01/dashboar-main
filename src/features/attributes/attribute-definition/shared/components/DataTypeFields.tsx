import { ComponentType } from "react";
import { FieldProps } from "./dataType-fields/FieldProps";
import { TextField } from "./dataType-fields/TextField";
import { LongTextField } from "./dataType-fields/LongTextField";
import { NumberField } from "./dataType-fields/NumberField";
import { DecimalField } from "./dataType-fields/DecimalField";
import { DateField } from "./dataType-fields/DateField";
import { BooleanField } from "./dataType-fields/BooleanField";
import { SelectField } from "./dataType-fields/SelectField";
import { MultiSelectField } from "./dataType-fields/MultiSelectField";
import { ColorField } from "./dataType-fields/ColorField";
import { UrlField } from "./dataType-fields/UrlField";
import { EmailField } from "./dataType-fields/EmailField";
import { PhoneField } from "./dataType-fields/PhoneField";
import { JsonField } from "./dataType-fields/JsonField";
import { AttributeDataTypeDb } from "../../types";

export const DataTypeFields = {
    TEXT: TextField,
    LONG_TEXT: LongTextField,
    NUMBER: NumberField,
    DECIMAL: DecimalField,
    DATE: DateField,
    BOOLEAN: BooleanField,
    SELECT: SelectField,
    MULTISELECT: MultiSelectField,
    COLOR: ColorField,
    URL: UrlField,
    EMAIL: EmailField,
    PHONE: PhoneField,
    JSON: JsonField,
} satisfies Record<AttributeDataTypeDb, ComponentType<FieldProps>>;