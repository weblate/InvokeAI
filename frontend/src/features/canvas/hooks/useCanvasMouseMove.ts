import { createSelector } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'app/store';
import { activeTabNameSelector } from 'features/options/optionsSelectors';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import _ from 'lodash';
import { MutableRefObject, useCallback } from 'react';
import {
  // addPointToCurrentEraserLine,
  addPointToCurrentLine,
  currentCanvasSelector,
  GenericCanvasState,
  setCursorPosition,
} from '../canvasSlice';
import getScaledCursorPosition from '../util/getScaledCursorPosition';

const selector = createSelector(
  [activeTabNameSelector, currentCanvasSelector],
  (activeTabName, canvas: GenericCanvasState) => {
    const {
      isMoveStageKeyHeld,
      isTransformingBoundingBox,
      isMovingBoundingBox,
      tool,
      isDrawing,
    } = canvas;
    return {
      isMoveStageKeyHeld,
      isModifyingBoundingBox: isTransformingBoundingBox || isMovingBoundingBox,
      tool,
      isDrawing,
      activeTabName,
    };
  },
  { memoizeOptions: { resultEqualityCheck: _.isEqual } }
);

const useCanvasMouseMove = (
  stageRef: MutableRefObject<Konva.Stage | null>,
  didMouseMoveRef: MutableRefObject<boolean>,
  lastCursorPositionRef: MutableRefObject<Vector2d>
) => {
  const dispatch = useAppDispatch();
  const { isMoveStageKeyHeld, isModifyingBoundingBox, tool, isDrawing } =
    useAppSelector(selector);

  return useCallback(() => {
    if (!stageRef.current) return;

    const scaledCursorPosition = getScaledCursorPosition(stageRef.current);

    if (!scaledCursorPosition) return;

    dispatch(setCursorPosition(scaledCursorPosition));

    lastCursorPositionRef.current = scaledCursorPosition;

    if (!isDrawing || isModifyingBoundingBox || isMoveStageKeyHeld) return;

    didMouseMoveRef.current = true;
    dispatch(
      addPointToCurrentLine([scaledCursorPosition.x, scaledCursorPosition.y])
    );
    // // Extend the current line
    // if (tool === 'imageEraser') {
    //   dispatch(
    //     addPointToCurrentEraserLine([
    //       scaledCursorPosition.x,
    //       scaledCursorPosition.y,
    //     ])
    //   );
    // } else {
    //   dispatch(
    //     addPointToCurrentLine([scaledCursorPosition.x, scaledCursorPosition.y])
    //   );
    // }
  }, [
    didMouseMoveRef,
    dispatch,
    isDrawing,
    isModifyingBoundingBox,
    isMoveStageKeyHeld,
    lastCursorPositionRef,
    stageRef,
  ]);
};

export default useCanvasMouseMove;
