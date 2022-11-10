import { Button, ButtonGroup, Flex } from '@chakra-ui/react';
import { createSelector } from '@reduxjs/toolkit';
import {
  clearMask,
  currentCanvasSelector,
  outpaintingCanvasSelector,
  redo,
  resetCanvas,
  setBrushColor,
  setBrushSize,
  setEraserSize,
  setLayer,
  setMaskColor,
  setShouldAutoSave,
  setShouldDarkenOutsideBoundingBox,
  setShouldShowGrid,
  setShouldShowIntermediates,
  setShouldSnapToGrid,
  setTool,
  undo,
  uploadOutpaintingMergedImage,
} from './canvasSlice';
import { useAppDispatch, useAppSelector } from 'app/store';
import { activeTabNameSelector } from 'features/options/optionsSelectors';
import _ from 'lodash';
import { canvasImageLayerRef } from './IAICanvas';
import IAIIconButton from 'common/components/IAIIconButton';
import {
  FaArrowsAlt,
  FaCopy,
  FaDownload,
  FaEraser,
  FaImage,
  FaLayerGroup,
  FaMask,
  FaPaintBrush,
  FaRedo,
  FaSave,
  FaTrash,
  FaUndo,
  FaUpload,
  FaWrench,
} from 'react-icons/fa';
import IAIPopover from 'common/components/IAIPopover';
import IAICheckbox from 'common/components/IAICheckbox';
import IAIColorPicker from 'common/components/IAIColorPicker';
import { RgbaColorPicker } from 'react-colorful';
import IAISlider from 'common/components/IAISlider';
import IAICanvasMaskColorPicker from './IAICanvasControls/IAICanvasMaskControls/IAICanvasMaskColorPicker';
import IAICanvasUndoButton from './IAICanvasControls/IAICanvasUndoButton';
import IAICanvasRedoButton from './IAICanvasControls/IAICanvasRedoButton';
import IAICanvasSettingsButtonPopover from './IAICanvasSettingsButtonPopover';
import IAICanvasEraserButtonPopover from './IAICanvasEraserButtonPopover';
import IAICanvasBrushButtonPopover from './IAICanvasBrushButtonPopover';
import IAICanvasMaskButtonPopover from './IAICanvasMaskButtonPopover';

export const canvasControlsSelector = createSelector(
  [currentCanvasSelector, outpaintingCanvasSelector, activeTabNameSelector],
  (currentCanvas, outpaintingCanvas, activeTabName) => {
    const {
      layer,
      maskColor,
      brushColor,
      brushSize,
      eraserSize,
      tool,
      shouldDarkenOutsideBoundingBox,
      shouldShowIntermediates,
    } = currentCanvas;

    const { shouldShowGrid, shouldSnapToGrid, shouldAutoSave } =
      outpaintingCanvas;

    return {
      layer,
      tool,
      maskColor,
      brushColor,
      brushSize,
      eraserSize,
      activeTabName,
      shouldShowGrid,
      shouldSnapToGrid,
      shouldAutoSave,
      shouldDarkenOutsideBoundingBox,
      shouldShowIntermediates,
    };
  },
  {
    memoizeOptions: {
      resultEqualityCheck: _.isEqual,
    },
  }
);

const IAICanvasOutpaintingControls = () => {
  const dispatch = useAppDispatch();
  const {
    layer,
    tool,
    maskColor,
    brushColor,
    activeTabName,
    brushSize,
    eraserSize,
    shouldShowIntermediates,
    shouldShowGrid,
    shouldSnapToGrid,
    shouldAutoSave,
    shouldDarkenOutsideBoundingBox,
  } = useAppSelector(canvasControlsSelector);

  return (
    <div className="inpainting-settings">
      <IAICanvasMaskButtonPopover />
      <ButtonGroup isAttached>
        <IAICanvasBrushButtonPopover />
        <IAICanvasEraserButtonPopover />
        <IAIIconButton
          aria-label="Move (M)"
          tooltip="Move (M)"
          icon={<FaArrowsAlt />}
          data-selected={tool === 'move'}
          onClick={() => dispatch(setTool('move'))}
        />
      </ButtonGroup>
      <ButtonGroup isAttached>
        <IAIIconButton
          aria-label="Merge Visible"
          tooltip="Merge Visible"
          icon={<FaLayerGroup />}
          onClick={() => {
            dispatch(uploadOutpaintingMergedImage(canvasImageLayerRef));
          }}
        />
        <IAIIconButton
          aria-label="Save Selection to Gallery"
          tooltip="Save Selection to Gallery"
          icon={<FaSave />}
        />
        <IAIIconButton
          aria-label="Copy Selection"
          tooltip="Copy Selection"
          icon={<FaCopy />}
        />
        <IAIIconButton
          aria-label="Download Selection"
          tooltip="Download Selection"
          icon={<FaDownload />}
        />
      </ButtonGroup>
      <ButtonGroup isAttached>
        <IAICanvasUndoButton />
        <IAICanvasRedoButton />
      </ButtonGroup>
      <ButtonGroup isAttached>
        <IAICanvasSettingsButtonPopover />
      </ButtonGroup>
      <ButtonGroup isAttached>
        <IAIIconButton
          aria-label="Upload"
          tooltip="Upload"
          icon={<FaUpload />}
        />
        <IAIIconButton
          aria-label="Reset Canvas"
          tooltip="Reset Canvas"
          icon={<FaTrash />}
          onClick={() => dispatch(resetCanvas())}
        />
      </ButtonGroup>
    </div>
  );
};

export default IAICanvasOutpaintingControls;
