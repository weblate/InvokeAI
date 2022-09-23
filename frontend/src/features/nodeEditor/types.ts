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

export declare type NodeInput = {
  id: string;
  label: string;
  type: InputTypes;
  value: any;
};

export declare type NodeOutput = {
  id: string;
  label: string;
  type: OutputTypes;
  value: any;
};

export declare type ModuleParameterName = string;
export declare type ModuleParameterValue = any;

export declare type ModuleParameterKind =
  | 'text'
  | 'textarea'
  | 'slider'
  | 'select'
  | 'toggle'
  | 'number'
  | 'imageUpload';

export declare type GenericModuleParameter = {
  name: string;
  label?: string;
};

export declare type SliderModuleParameter = GenericModuleParameter & {
  kind: 'slider';
  value: number;
  min: number;
  max: number;
  step: number;
};

export declare type NumberModuleParameter = GenericModuleParameter & {
  kind: 'number';
  value: number;
  min: number;
  max: number;
  step: number;
  withRandomizeButton?: boolean;
  withSteppers?: boolean;
};

export declare type TextareaModuleParameter = GenericModuleParameter & {
  kind: 'textarea';
  value: string;
};

export declare type TextModuleParameter = GenericModuleParameter & {
  kind: 'text';
  value: string;
};

export declare type SelectModuleParameter = GenericModuleParameter & {
  kind: 'select';
  value: string | number;
  options: Array<string | number>;
};

export declare type ToggleModuleParameter = GenericModuleParameter & {
  kind: 'toggle';
  value: boolean;
};

export declare type ImageUploadModuleParameter = GenericModuleParameter & {
  kind: 'imageUpload';
  value: File | undefined;
};

export declare type ModuleParameter =
  | SliderModuleParameter
  | TextareaModuleParameter
  | TextModuleParameter
  | SelectModuleParameter
  | ToggleModuleParameter
  | NumberModuleParameter
  | ImageUploadModuleParameter;

export declare type Module = {
  moduleType: ModuleTypes;
  nodeInputs?: NodeInput[];
  nodeOutputs?: NodeOutput[];
  moduleName: string;
  parameters: ModuleParameter[];
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
