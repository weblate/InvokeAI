import { NUMPY_RAND_MAX, NUMPY_RAND_MIN } from 'app/constants';
import { OptionsState } from 'features/options/optionsSlice';
import { SystemState } from 'features/system/systemSlice';

import { stringToSeedWeightsArray } from './seedWeightPairs';
import randomInt from './randomInt';
import { InvokeTabName } from 'features/tabs/InvokeTabs';
import {
  CanvasState,
  GenericCanvasState,
  ValidCanvasName,
} from 'features/canvas/canvasSlice';
import generateMask from 'features/canvas/util/generateMask';

export type FrontendToBackendParametersConfig = {
  generationMode: InvokeTabName;
  optionsState: OptionsState;
  canvasState: CanvasState;
  systemState: SystemState;
  imageToProcessUrl?: string;
  maskImageElement?: HTMLImageElement;
};

/**
 * Translates/formats frontend state into parameters suitable
 * for consumption by the API.
 */
export const frontendToBackendParameters = (
  config: FrontendToBackendParametersConfig
): { [key: string]: any } => {
  const {
    generationMode,
    optionsState,
    canvasState,
    systemState,
    imageToProcessUrl,
    maskImageElement,
  } = config;

  const {
    prompt,
    iterations,
    steps,
    cfgScale,
    threshold,
    perlin,
    height,
    width,
    sampler,
    seed,
    seamless,
    hiresFix,
    img2imgStrength,
    initialImage,
    shouldFitToWidthHeight,
    shouldGenerateVariations,
    variationAmount,
    seedWeights,
    shouldRunESRGAN,
    upscalingLevel,
    upscalingStrength,
    shouldRunFacetool,
    facetoolStrength,
    codeformerFidelity,
    facetoolType,
    shouldRandomizeSeed,
  } = optionsState;

  const { shouldDisplayInProgressType, saveIntermediatesInterval } =
    systemState;

  const generationParameters: { [k: string]: any } = {
    prompt,
    iterations:
      shouldRandomizeSeed || shouldGenerateVariations ? iterations : 1,
    steps,
    cfg_scale: cfgScale,
    threshold,
    perlin,
    height,
    width,
    sampler_name: sampler,
    seed,
    progress_images: shouldDisplayInProgressType === 'full-res',
    progress_latents: shouldDisplayInProgressType === 'latents',
    save_intermediates: saveIntermediatesInterval,
  };

  generationParameters.seed = shouldRandomizeSeed
    ? randomInt(NUMPY_RAND_MIN, NUMPY_RAND_MAX)
    : seed;

  // parameters common to txt2img and img2img
  if (['txt2img', 'img2img'].includes(generationMode)) {
    generationParameters.seamless = seamless;
    generationParameters.hires_fix = hiresFix;
  }

  // img2img exclusive parameters
  if (generationMode === 'img2img' && initialImage) {
    generationParameters.init_img =
      typeof initialImage === 'string' ? initialImage : initialImage.url;
    generationParameters.strength = img2imgStrength;
    generationParameters.fit = shouldFitToWidthHeight;
  }

  // inpainting exclusive parameters
  if (
    ['inpainting', 'outpainting'].includes(generationMode) &&
    maskImageElement
  ) {
    const {
      lines,
      boundingBoxCoordinates,
      boundingBoxDimensions,
      inpaintReplace,
      shouldUseInpaintReplace,
    } = canvasState[canvasState.currentCanvas];

    const boundingBox = {
      ...boundingBoxCoordinates,
      ...boundingBoxDimensions,
    };

    generationParameters.init_img = imageToProcessUrl;
    generationParameters.strength = img2imgStrength;
    generationParameters.fit = false;

    const { maskDataURL, isMaskEmpty } = generateMask(
      maskImageElement,
      lines,
      boundingBox
    );

    generationParameters.is_mask_empty = isMaskEmpty;
    console.log(maskDataURL);
    generationParameters.init_mask = maskDataURL.split(
      'data:image/png;base64,'
    )[1];

    if (shouldUseInpaintReplace) {
      generationParameters.inpaint_replace = inpaintReplace;
    }

    generationParameters.bounding_box = boundingBox;

    if (generationMode === 'outpainting') {
      // TODO: The server metadata generation needs to be changed to fix this.
      generationParameters.progress_images = false;

      generationParameters.seam_size = 96;
      generationParameters.seam_blur = 16;
      generationParameters.seam_strength = 0.7;
      generationParameters.seam_steps = 10;
      generationParameters.tile_size = 32;
      generationParameters.force_outpaint = false;
    }
  }

  if (shouldGenerateVariations) {
    generationParameters.variation_amount = variationAmount;
    if (seedWeights) {
      generationParameters.with_variations =
        stringToSeedWeightsArray(seedWeights);
    }
  } else {
    generationParameters.variation_amount = 0;
  }

  let esrganParameters: false | { [k: string]: any } = false;
  let facetoolParameters: false | { [k: string]: any } = false;

  if (shouldRunESRGAN) {
    esrganParameters = {
      level: upscalingLevel,
      strength: upscalingStrength,
    };
  }

  if (shouldRunFacetool) {
    facetoolParameters = {
      type: facetoolType,
      strength: facetoolStrength,
    };
    if (facetoolType === 'codeformer') {
      facetoolParameters.codeformer_fidelity = codeformerFidelity;
    }
  }

  return {
    generationParameters,
    esrganParameters,
    facetoolParameters,
  };
};
