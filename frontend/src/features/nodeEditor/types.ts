// export declare type PromptItem = {
//   prompt: string;
//   weight: number;
// };

// export declare type Prompt = Array<PromptItem>;

// export declare type SeedWeightPair = {
//   seed: number;
//   weight: number;
// };

// export declare type SeedWeights = Array<SeedWeightPair>;

export declare type UIType =
  | 'text'
  | 'textarea'
  | 'slider'
  | 'select'
  | 'toggle'
  | 'numberInput'
  | 'image';

export declare type DataType = 'string' | 'number' | 'image';

export declare type GenericModuleParameter = {
  id: string;
  label: string;
  connectable?: ['target' | 'source', ...Array<'target' | 'source'>];
  labelPosition?: 'top' | 'right' | 'bottom' | 'left';
  optional?: boolean;
  dependsOn?: string;
};

export declare type ImageModuleParameter = GenericModuleParameter & {
  uiType: 'image';
  dataType: 'image';
  value: string;
};

export declare type SliderModuleParameter = GenericModuleParameter & {
  uiType: 'slider';
  dataType: 'number';
  value: number;
  min: number;
  max: number;
  step: number;
  withNumberInput?: boolean;
  numberInputMin?: number;
  numberInputMax?: number;
  exclusiveMinimum?: boolean;
  exclusiveMaximum?: boolean;
};

export declare type NumberModuleParameter = GenericModuleParameter & {
  uiType: 'numberInput';
  dataType: 'number';
  value: number;
  min: number;
  max: number;
  step: number;
  withRandomizeButton?: boolean;
  withRandomizeIconButton?: boolean;
  withSteppers?: boolean;
  exclusiveMinimum?: boolean;
  exclusiveMaximum?: boolean;
};

export declare type SelectModuleParameter = GenericModuleParameter & {
  uiType: 'select';
  dataType: 'string' | 'number';
  value: string | number;
  options: Array<string | number>;
};

export declare type TextareaModuleParameter = GenericModuleParameter & {
  uiType: 'textarea';
  dataType: 'string';
  value: string;
};

export declare type TextModuleParameter = GenericModuleParameter & {
  uiType: 'text';
  dataType: 'string';
  value: string;
};

export declare type ToggleModuleParameter = GenericModuleParameter & {
  uiType: 'toggle';
  dataType: 'boolean';
  value: boolean;
};

export declare type ModuleParameter =
  | ImageModuleParameter
  | NumberModuleParameter
  | SelectModuleParameter
  | SliderModuleParameter
  | TextareaModuleParameter
  | TextModuleParameter
  | ToggleModuleParameter;

export declare type Module = {
  moduleId: string;
  moduleType: string;
  moduleLabel: string;
  parameters: Record<string, ModuleParameter>;
};

// // Nodes from Kyle's backend for testing, need to output something like this in API call
// {
//     "nodes":[
//         {"id":"1","type":"txt2img","prompt":"A man smiling"},
//         {"id":"2","type":"show_image"},
//         {"id":"3","type":"img2img","prompt":"A man wearing a red hat and smiling","strength":"0.5"},
//         {"id":"4","type":"show_image"},
//         {"id":"5","type":"restore_face","strength":"0.5"},
//         {"id":"6","type":"upscale","level":"2"},
//         {"id":"7","type":"show_image"}
//     ],
//     "links":[
//         {"from_node":{"id":"1","field":"image"},"to_node":{"id":"2","field":"image"}},
//         {"from_node":{"id":"2","field":"image"},"to_node":{"id":"3","field":"image"}},
//         {"from_node":{"id":"3","field":"image"},"to_node":{"id":"4","field":"image"}},
//         {"from_node":{"id":"4","field":"image"},"to_node":{"id":"5","field":"image"}},
//         {"from_node":{"id":"5","field":"image"},"to_node":{"id":"6","field":"image"}},
//         {"from_node":{"id":"6","field":"image"},"to_node":{"id":"7","field":"image"}}
//     ]
// }
