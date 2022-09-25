import ImageParameter from './components/ImageParameter';
import NumberParameter from './components/NumberParameter';
import SelectParameter from './components/SelectParameter';
import SliderParameter from './components/SliderParameter';
import TextareaParameter from './components/TextareaParameter';
import TextParameter from './components/TextParameter';
import ToggleParameter from './components/ToggleParameter';
import { ModuleParameter } from './types';

type ModuleParameterUIComponentProps = {
  parameter: ModuleParameter;
  moduleId: string;
};

const ModuleParameterUIComponent = ({
  parameter,
  moduleId,
}: ModuleParameterUIComponentProps) => {
  const { id, uiType } = parameter;

  switch (uiType) {
    case 'text':
      return (
        <TextParameter key={id} moduleId={moduleId} parameter={parameter} />
      );
    case 'textarea':
      return (
        <TextareaParameter key={id} moduleId={moduleId} parameter={parameter} />
      );
    case 'select':
      return (
        <SelectParameter key={id} moduleId={moduleId} parameter={parameter} />
      );
    case 'slider':
      return (
        <SliderParameter key={id} moduleId={moduleId} parameter={parameter} />
      );
    case 'numberInput':
      return (
        <NumberParameter key={id} moduleId={moduleId} parameter={parameter} />
      );
    case 'toggle':
      return (
        <ToggleParameter key={id} moduleId={moduleId} parameter={parameter} />
      );
    case 'image':
      return (
        <ImageParameter key={id} moduleId={moduleId} parameter={parameter} />
      );
    default:
      return <></>;
  }
};

export default ModuleParameterUIComponent;
