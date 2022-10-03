import { Field } from "../types";
import ImageFieldComponent from "./fieldTypes/ImageFieldComponent";
import NumberFieldComponent from "./fieldTypes/NumberFieldComponent";
import SelectFieldComponent from "./fieldTypes/SelectFieldComponent";
import TextareaFieldComponent from "./fieldTypes/TextareaFieldComponent";
import TextFieldComponent from "./fieldTypes/TextFieldComponent";
import ToggleFieldComponent from "./fieldTypes/ToggleFieldComponent";

type InvocationFieldProps = {
  field: Field;
  moduleId: string;
  fieldId: string;
};

const InvocationField = ({
  field,
  moduleId,
  fieldId,
}: InvocationFieldProps) => {
  const { ui_type } = field;

  switch (ui_type) {
    case 'text':
      return (
        <TextFieldComponent
          moduleId={moduleId}
          field={field}
          fieldId={fieldId}
        />
      );
    case 'textarea':
      return (
        <TextareaFieldComponent
          moduleId={moduleId}
          field={field}
          fieldId={fieldId}
        />
      );
    case 'select':
      return (
        <SelectFieldComponent
          moduleId={moduleId}
          field={field}
          fieldId={fieldId}
        />
      );
    case 'number_input':
    case 'slider':
      return (
        <NumberFieldComponent
          moduleId={moduleId}
          field={field}
          fieldId={fieldId}
        />
      );
    case 'toggle':
      return (
        <ToggleFieldComponent
          moduleId={moduleId}
          field={field}
          fieldId={fieldId}
        />
      );
    case 'image':
      return (
        <ImageFieldComponent
          moduleId={moduleId}
          field={field}
          fieldId={fieldId}
        />
      );
    default:
      return <></>;
  }
};

export default InvocationField;
