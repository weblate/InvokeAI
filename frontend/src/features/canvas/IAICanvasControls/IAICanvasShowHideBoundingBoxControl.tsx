import { FaVectorSquare } from 'react-icons/fa';
import { RootState, useAppDispatch, useAppSelector } from 'app/store';
import IAIIconButton from 'common/components/IAIIconButton';
import {
  currentCanvasSelector,
  GenericCanvasState,
  setShouldShowBoundingBox,
} from 'features/canvas/canvasSlice';
import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';

const canvasShowHideBoundingBoxControlSelector = createSelector(
  currentCanvasSelector,
  (currentCanvas: GenericCanvasState) => {
    const { shouldShowBoundingBox } = currentCanvas;

    return {
      shouldShowBoundingBox,
    };
  },
  {
    memoizeOptions: {
      resultEqualityCheck: _.isEqual,
    },
  }
);
const IAICanvasShowHideBoundingBoxControl = () => {
  const dispatch = useAppDispatch();
  const { shouldShowBoundingBox } = useAppSelector(
    canvasShowHideBoundingBoxControlSelector
  );

  return (
    <IAIIconButton
      aria-label="Hide Inpainting Box"
      tooltip="Hide Inpainting Box"
      icon={<FaVectorSquare />}
      data-alert={!shouldShowBoundingBox}
      onClick={() => {
        dispatch(setShouldShowBoundingBox(!shouldShowBoundingBox));
      }}
    />
  );
};

export default IAICanvasShowHideBoundingBoxControl;
