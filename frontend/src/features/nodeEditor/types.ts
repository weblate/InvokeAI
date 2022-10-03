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
  | 'number_input'
  | 'image';

export declare type DataType =
  | 'string'
  | 'integer'
  | 'number'
  | 'boolean'
  | 'image';

export declare type BaseField = {
  label: string;
  value: string | number | boolean;
  description: string;
  ui: {
    label_position?: 'top' | 'right' | 'bottom' | 'left';
    optional?: boolean;
    depends_on?: string;
    requires_connection?: boolean;
  };
};

export declare type ImageField = BaseField & {
  type: 'image';
  value?: string;
  ui_type: 'image';
};

export declare type NumberField = BaseField & {
  type: 'integer' | 'number';
  value?: number;
  minimum?: number;
  maximum?: number;
  multiple_of?: number;
  exclusive_minimum?: number;
  exclusive_maximum?: number;
  ui_type: 'number_input' | 'slider';
  ui: {
    with_slider?: boolean;
    with_number_input?: boolean;
    number_input_min?: number;
    number_input_max?: number;
    slider_min?: number;
    slider_max?: number;
    with_randomize_button?: boolean;
    with_randomize_icon_button?: boolean;
    with_steppers?: boolean;
    with_number_display?: boolean;
    with_slider_marks?: boolean | number[];
    with_filled_track?: boolean;
    unit?: string;
  };
};

export declare type SelectField = BaseField & {
  type: 'string' | 'integer' | 'number';
  value?: string | number;
  options: Array<string | number>;
  ui_type: 'select';
};

export declare type TextareaField = BaseField & {
  type: 'string';
  value?: string;
  ui_type: 'textarea';
};

export declare type TextField = BaseField & {
  type: 'string';
  value?: string;
  ui_type: 'text';
};

export declare type ToggleField = BaseField & {
  type: 'boolean';
  value?: boolean;
  ui_type: 'toggle';
};

export declare type Field =
  | ImageField
  | NumberField
  | SelectField
  | TextareaField
  | TextField
  | ToggleField;

export declare type Output = {
  type: DataType;
  label: string;
  ui: {
    next_to?: string;
  };
};

export declare type Invocation = {
  moduleId: string;
  moduleType: string;
  moduleLabel: string;
  fields: Record<string, Field>;
  outputs?: Record<string, Output>;
};

export declare type InvocationNode = {
  id: string;
  type: string;
};

export declare type InvocationLink = {
  from_node: {
    id: string;
    field: string;
  };
  to_node: {
    id: string;
    field: string;
  };
};

export declare type InvocationGraph = {
  nodes: InvocationNode[];
  links: InvocationLink[];
};
