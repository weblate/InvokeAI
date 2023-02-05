import { emptySplitApi as api } from './emptyApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    listSessions: build.query<ListSessionsApiResponse, ListSessionsApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/sessions/`,
        params: { page: queryArg.page, per_page: queryArg.perPage },
      }),
    }),
    createSession: build.mutation<
      CreateSessionApiResponse,
      CreateSessionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/sessions/`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getSession: build.query<GetSessionApiResponse, GetSessionApiArg>({
      query: (queryArg) => ({ url: `/api/v1/sessions/${queryArg.sessionId}` }),
    }),
    appendInvocation: build.mutation<
      AppendInvocationApiResponse,
      AppendInvocationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/sessions/${queryArg.sessionId}/invocations`,
        method: 'POST',
        body: queryArg.bodyAppendInvocation,
      }),
    }),
    invokeSession: build.mutation<
      InvokeSessionApiResponse,
      InvokeSessionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/sessions/${queryArg.sessionId}/invoke`,
        method: 'PUT',
        params: { all: queryArg.all },
      }),
    }),
    getImage: build.query<GetImageApiResponse, GetImageApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/images/${queryArg.imageType}/${queryArg.imageName}`,
      }),
    }),
    uploadImage: build.mutation<UploadImageApiResponse, UploadImageApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/images/uploads/`,
        method: 'POST',
        body: queryArg.bodyUploadImage,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as invokeApi };
export type ListSessionsApiResponse =
  /** status 200 Successful Response */ PaginatedSession;
export type ListSessionsApiArg = {
  /** The page of results to get */
  page?: number;
  /** The number of results per page */
  perPage?: number;
};
export type CreateSessionApiResponse =
  /** status 200 Successful Response */ InvocationSession;
export type CreateSessionApiArg = {
  body: InvocationGraph;
};
export type GetSessionApiResponse =
  /** status 200 Successful Response */ InvocationSession;
export type GetSessionApiArg = {
  /** The id of the session to get */
  sessionId: string;
};
export type AppendInvocationApiResponse =
  /** status 200 Successful Response */ InvocationSession;
export type AppendInvocationApiArg = {
  /** The id of the sessions to invoke */
  sessionId: string;
  bodyAppendInvocation: BodyAppendInvocation;
};
export type InvokeSessionApiResponse = /** status 200 Successful Response */
  | any
  | /** status 202 The invocation is queued */ undefined;
export type InvokeSessionApiArg = {
  /** The id of the session to invoke */
  sessionId: string;
  /** Whether or not to invoke all remaining invocations */
  all?: boolean;
};
export type GetImageApiResponse = /** status 200 Successful Response */ any;
export type GetImageApiArg = {
  /** The type of image to get */
  imageType: ImageType;
  /** The name of the image to get */
  imageName: string;
};
export type UploadImageApiResponse = /** status 200 Successful Response */
  | any
  | /** status 201 The image was uploaded successfully */ undefined;
export type UploadImageApiArg = {
  bodyUploadImage: BodyUploadImage;
};
export type PaginatedSession = {
  items: string[];
  page: number;
  pages: number;
  per_page: number;
  total: number;
};
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export type ImageType = 'results' | 'intermediates' | 'uploads';
export type LoadImageInvocation = {
  id: string;
  type?: 'load_image';
  image_type: ImageType;
  image_name: string;
  [key: string]: any;
};
export type ImageField = {
  image_type?: string;
  image_name?: string;
};
export type ShowImageInvocation = {
  id: string;
  type?: 'show_image';
  image?: ImageField;
  [key: string]: any;
};
export type CropImageInvocation = {
  id: string;
  type?: 'crop';
  image?: ImageField;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  [key: string]: any;
};
export type PasteImageInvocation = {
  id: string;
  type?: 'paste';
  base_image?: ImageField;
  image?: ImageField;
  mask?: ImageField;
  x?: number;
  y?: number;
  [key: string]: any;
};
export type MaskFromAlphaInvocation = {
  id: string;
  type?: 'tomask';
  image?: ImageField;
  invert?: boolean;
  [key: string]: any;
};
export type BlurInvocation = {
  id: string;
  type?: 'blur';
  image?: ImageField;
  radius?: number;
  blur_type?: 'gaussian' | 'box';
  [key: string]: any;
};
export type LerpInvocation = {
  id: string;
  type?: 'lerp';
  image?: ImageField;
  min?: number;
  max?: number;
  [key: string]: any;
};
export type InverseLerpInvocation = {
  id: string;
  type?: 'ilerp';
  image?: ImageField;
  min?: number;
  max?: number;
  [key: string]: any;
};
export type TextToImageInvocation = {
  id: string;
  type?: 'txt2img';
  prompt?: string;
  seed?: number;
  steps?: number;
  width?: number;
  height?: number;
  cfg_scale?: number;
  sampler_name?:
    | 'ddim'
    | 'plms'
    | 'k_lms'
    | 'k_dpm_2'
    | 'k_dpm_2_a'
    | 'k_euler'
    | 'k_euler_a'
    | 'k_heun';
  seamless?: boolean;
  model?: string;
  progress_images?: boolean;
  [key: string]: any;
};
export type UpscaleInvocation = {
  id: string;
  type?: 'upscale';
  image?: ImageField;
  strength?: number;
  level?: 2 | 4;
  [key: string]: any;
};
export type CvInpaintInvocation = {
  id: string;
  type?: 'cv_inpaint';
  image?: ImageField;
  mask?: ImageField;
  [key: string]: any;
};
export type RestoreFaceInvocation = {
  id: string;
  type?: 'restore_face';
  image?: ImageField;
  strength?: number;
  [key: string]: any;
};
export type ImageToImageInvocation = {
  id: string;
  type?: 'img2img';
  prompt?: string;
  seed?: number;
  steps?: number;
  width?: number;
  height?: number;
  cfg_scale?: number;
  sampler_name?:
    | 'ddim'
    | 'plms'
    | 'k_lms'
    | 'k_dpm_2'
    | 'k_dpm_2_a'
    | 'k_euler'
    | 'k_euler_a'
    | 'k_heun';
  seamless?: boolean;
  model?: string;
  progress_images?: boolean;
  image?: ImageField;
  strength?: number;
  fit?: boolean;
  [key: string]: any;
};
export type InpaintInvocation = {
  id: string;
  type?: 'inpaint';
  prompt?: string;
  seed?: number;
  steps?: number;
  width?: number;
  height?: number;
  cfg_scale?: number;
  sampler_name?:
    | 'ddim'
    | 'plms'
    | 'k_lms'
    | 'k_dpm_2'
    | 'k_dpm_2_a'
    | 'k_euler'
    | 'k_euler_a'
    | 'k_heun';
  seamless?: boolean;
  model?: string;
  progress_images?: boolean;
  image?: ImageField;
  strength?: number;
  fit?: boolean;
  mask?: ImageField;
  inpaint_replace?: number;
  [key: string]: any;
};
export type InvocationFieldLink = {
  from_node_id: string;
  from_field: string;
  to_field: string;
};
export type ImageOutput = {
  type?: 'image';
  image?: ImageField;
};
export type MaskOutput = {
  type?: 'mask';
  mask?: ImageField;
};
export type PromptOutput = {
  type?: 'prompt';
  prompt?: string;
};
export type InvocationHistoryEntry = {
  invocation_id: string;
  invocation:
    | ({
        type: 'load_image';
      } & LoadImageInvocation)
    | ({
        type: 'show_image';
      } & ShowImageInvocation)
    | ({
        type: 'crop';
      } & CropImageInvocation)
    | ({
        type: 'paste';
      } & PasteImageInvocation)
    | ({
        type: 'tomask';
      } & MaskFromAlphaInvocation)
    | ({
        type: 'blur';
      } & BlurInvocation)
    | ({
        type: 'lerp';
      } & LerpInvocation)
    | ({
        type: 'ilerp';
      } & InverseLerpInvocation)
    | ({
        type: 'txt2img';
      } & TextToImageInvocation)
    | ({
        type: 'upscale';
      } & UpscaleInvocation)
    | ({
        type: 'cv_inpaint';
      } & CvInpaintInvocation)
    | ({
        type: 'restore_face';
      } & RestoreFaceInvocation)
    | ({
        type: 'img2img';
      } & ImageToImageInvocation)
    | ({
        type: 'inpaint';
      } & InpaintInvocation);
  outputs:
    | ({
        type: 'image';
      } & ImageOutput)
    | ({
        type: 'mask';
      } & MaskOutput)
    | ({
        type: 'prompt';
      } & PromptOutput);
};
export type InvocationSession = {
  id: string;
  invocations: {
    [key: string]:
      | ({
          type: 'load_image';
        } & LoadImageInvocation)
      | ({
          type: 'show_image';
        } & ShowImageInvocation)
      | ({
          type: 'crop';
        } & CropImageInvocation)
      | ({
          type: 'paste';
        } & PasteImageInvocation)
      | ({
          type: 'tomask';
        } & MaskFromAlphaInvocation)
      | ({
          type: 'blur';
        } & BlurInvocation)
      | ({
          type: 'lerp';
        } & LerpInvocation)
      | ({
          type: 'ilerp';
        } & InverseLerpInvocation)
      | ({
          type: 'txt2img';
        } & TextToImageInvocation)
      | ({
          type: 'upscale';
        } & UpscaleInvocation)
      | ({
          type: 'cv_inpaint';
        } & CvInpaintInvocation)
      | ({
          type: 'restore_face';
        } & RestoreFaceInvocation)
      | ({
          type: 'img2img';
        } & ImageToImageInvocation)
      | ({
          type: 'inpaint';
        } & InpaintInvocation);
  };
  links: {
    [key: string]: InvocationFieldLink[];
  };
  invocation_results: {
    [key: string]: InvocationHistoryEntry;
  };
  history: string[];
};
export type Node = {
  id: string;
  field: string;
};
export type Link = {
  from_node: Node;
  to_node: Node;
};
export type InvocationGraph = {
  nodes: (
    | ({
        type: 'load_image';
      } & LoadImageInvocation)
    | ({
        type: 'show_image';
      } & ShowImageInvocation)
    | ({
        type: 'crop';
      } & CropImageInvocation)
    | ({
        type: 'paste';
      } & PasteImageInvocation)
    | ({
        type: 'tomask';
      } & MaskFromAlphaInvocation)
    | ({
        type: 'blur';
      } & BlurInvocation)
    | ({
        type: 'lerp';
      } & LerpInvocation)
    | ({
        type: 'ilerp';
      } & InverseLerpInvocation)
    | ({
        type: 'txt2img';
      } & TextToImageInvocation)
    | ({
        type: 'upscale';
      } & UpscaleInvocation)
    | ({
        type: 'cv_inpaint';
      } & CvInpaintInvocation)
    | ({
        type: 'restore_face';
      } & RestoreFaceInvocation)
    | ({
        type: 'img2img';
      } & ImageToImageInvocation)
    | ({
        type: 'inpaint';
      } & InpaintInvocation)
  )[];
  links: Link[];
};
export type BodyAppendInvocation = {
  invocation:
    | LoadImageInvocation
    | ShowImageInvocation
    | CropImageInvocation
    | PasteImageInvocation
    | MaskFromAlphaInvocation
    | BlurInvocation
    | LerpInvocation
    | InverseLerpInvocation
    | TextToImageInvocation
    | UpscaleInvocation
    | CvInpaintInvocation
    | RestoreFaceInvocation
    | ImageToImageInvocation
    | InpaintInvocation;
  links?: InvocationFieldLink[];
};
export type BodyUploadImage = {
  file: Blob;
};
export const {
  useListSessionsQuery,
  useCreateSessionMutation,
  useGetSessionQuery,
  useAppendInvocationMutation,
  useInvokeSessionMutation,
  useGetImageQuery,
  useUploadImageMutation,
} = injectedRtkApi;
