import { createSelector } from '@reduxjs/toolkit';
import { GroupConfig } from 'konva/lib/Group';
import _ from 'lodash';
import { Circle, Group } from 'react-konva';
import { RootState, useAppSelector } from 'app/store';
import { currentCanvasSelector, GenericCanvasState } from './canvasSlice';
// import { InpaintingState } from 'features/canvas/canvasSlice';

const canvasBrushPreviewOutlineSelector = createSelector(
  currentCanvasSelector,
  (currentCanvas: GenericCanvasState) => {
    const {
      cursorPosition,
      stageDimensions: { width, height },
      brushSize,
      tool,
      shouldShowBrush,
      isMovingBoundingBox,
      isTransformingBoundingBox,
      stageScale,
    } = currentCanvas;

    return {
      cursorPosition,
      width,
      height,
      brushSize,
      tool,
      strokeWidth: 1 / stageScale, // scale stroke thickness
      radius: 1 / stageScale, // scale stroke thickness
      shouldDrawBrushPreview:
        !(
          isMovingBoundingBox ||
          isTransformingBoundingBox ||
          !cursorPosition
        ) && shouldShowBrush,
    };
  },
  {
    memoizeOptions: {
      resultEqualityCheck: _.isEqual,
    },
  }
);

/**
 * Draws the canvas brush preview outline.
 */
const IAICanvasBrushPreviewOutline = (props: GroupConfig) => {
  const { ...rest } = props;
  const { cursorPosition, width, height, brushSize, strokeWidth, radius } =
    useAppSelector(canvasBrushPreviewOutlineSelector);

  return (
    <Group {...rest}>
      <Circle
        x={cursorPosition ? cursorPosition.x : width / 2}
        y={cursorPosition ? cursorPosition.y : height / 2}
        radius={brushSize / 2}
        stroke={'rgba(0,0,0,1)'}
        strokeWidth={strokeWidth}
        strokeEnabled={true}
        listening={false}
      />
      <Circle
        x={cursorPosition ? cursorPosition.x : width / 2}
        y={cursorPosition ? cursorPosition.y : height / 2}
        radius={radius}
        fill={'rgba(0,0,0,1)'}
        listening={false}
      />
    </Group>
  );
};
export default IAICanvasBrushPreviewOutline;
