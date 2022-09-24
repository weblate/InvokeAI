export enum InputTypes {
  Image = 'IMAGE',
  Text = 'TEXT',
}

export enum OutputTypes {
  Image = 'IMAGE',
  Text = 'TEXT',
}

export enum ModuleTypes {
  Generate = 'GENERATE',
  Upscale = 'UPSCALE',
  FaceCorrection = 'FACE_CORRECTION',
  SimplePrompt = 'SIMPLE_PROMPT',
  InitialImage = 'INITIAL_IMAGE',
}

export enum Connectable {
  Target = 'target',
  Source = 'source',
}

export enum ConnectableType {
  Text = 'text',
  Image = 'image',
}

export declare type PromptItem = {
  prompt: string;
  weight: number;
};

export declare type Prompt = Array<PromptItem>;

export declare type SeedWeightPair = {
  seed: number;
  weight: number;
};

export declare type SeedWeights = Array<SeedWeightPair>;

// export declare type NodeInputName = string;
// export declare type NodeOutputName = string;
// export declare type NodeInputValue = {
//   type: InputTypes;
//   value: any;
// };
// export declare type NodeOutputValue = {
//   type: OutputTypes;
//   value: any;
// };

export declare type ModuleParameterName = string;
export declare type ModuleParameterValue = any;

export declare type ModuleParameterType =
  | 'text'
  | 'textarea'
  | 'slider'
  | 'select'
  | 'toggle'
  | 'number'
  | 'imageUpload'
  | 'image';

export declare type GenericModuleParameter = {
  id: string;
  label: string;
  connectable?: Connectable;
};

// export declare type NodeInputParameter = GenericModuleParameter & {
//   label: string;
//   type: InputTypes;
//   isInput: boolean;
//   value: string;
// };

// export declare type NodeOutputParameter = GenericModuleParameter & {
//   label: string;
//   type: OutputTypes;
//   isOutput: boolean;
//   value: string;
// };

export declare type ImageModuleParameter = GenericModuleParameter & {
  type: 'image';
  value: string;
};

export declare type SliderModuleParameter = GenericModuleParameter & {
  type: 'slider';
  value: number;
  min: number;
  max: number;
  step: number;
  numberInputMax?: number;
  withNumberInput?: boolean;
};

export declare type NumberModuleParameter = GenericModuleParameter & {
  type: 'number';
  value: number;
  min: number;
  max: number;
  step: number;
  withRandomizeButton?: boolean;
  withRandomizeIconButton?: boolean;
  withSteppers?: boolean;
};

export declare type TextareaModuleParameter = GenericModuleParameter & {
  type: 'textarea';
  value: string;
};

export declare type TextModuleParameter = GenericModuleParameter & {
  type: 'text';
  value: string;
};

export declare type SelectModuleParameter = GenericModuleParameter & {
  type: 'select';
  value: string | number;
  options: Array<string | number>;
};

export declare type ToggleModuleParameter = GenericModuleParameter & {
  type: 'toggle';
  value: boolean;
};

export declare type ImageUploadModuleParameter = GenericModuleParameter & {
  type: 'imageUpload';
  value: File | undefined;
};

export declare type ModuleParameter =
  | SliderModuleParameter
  | TextareaModuleParameter
  | TextModuleParameter
  | SelectModuleParameter
  | ToggleModuleParameter
  | NumberModuleParameter
  | ImageUploadModuleParameter
  | ImageModuleParameter;


export declare type Module = {
  moduleType: ModuleTypes;
  // nodeInputs?: Record<string, NodeInput>;
  // nodeOutputs?: Record<string, NodeOutput>;
  moduleName: string;
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
