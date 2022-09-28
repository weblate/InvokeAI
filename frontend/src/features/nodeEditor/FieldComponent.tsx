import ImageFieldComponent from './components/ImageFieldComponent';
// import SliderFieldComponent from './components/NumberFieldComponent';
import NumberFieldComponent from './components/NumberFieldComponent';
import SelectFieldComponent from './components/SelectFieldComponent';
// import SliderFieldComponent from './components/SliderFieldComponent';
import TextareaFieldComponent from './components/TextareaFieldComponent';
import TextFieldComponent from './components/TextFieldComponent';
import ToggleFieldComponent from './components/ToggleFieldComponent';
import { Field } from './types';

type FieldComponentProps = {
  field: Field;
  moduleId: string;
  fieldId: string;
};

const FieldComponent = ({
  field,
  moduleId,
  fieldId,
}: FieldComponentProps) => {
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

export default FieldComponent;
