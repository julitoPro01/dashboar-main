export type AttributeInputType =
    | "text"
    | "number"
    | "date"
    | "checkbox"
    | "textarea"
    | "select"
    | "multiselect";

export type AttributeValueField =
    | "valueText"
    | "valueNumber"
    | "valueBoolean"
    | "valueDate"
    | "valueOptionIds";

export type AttributeInputConfig = {
    input: AttributeInputType;
    field: AttributeValueField;
};
    