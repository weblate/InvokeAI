import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CurrentImageDisplay from '../features/gallery/CurrentImageDisplay';
import ImageGallery from '../features/gallery/ImageGallery';
import ProgressBar from '../features/system/ProgressBar';
import SiteHeader from '../features/system/SiteHeader';
import OptionsAccordion from '../features/options/OptionsAccordion';
import ProcessButtons from '../features/options/ProcessButtons';
import PromptInput from '../features/options/PromptInput';
import LogViewer from '../features/system/LogViewer';
import Loading from '../Loading';
import { useAppDispatch } from './store';
import { requestAllImages, requestSystemConfig } from './socketio/actions';
import Flow from '../features/nodeEditor';
import { ReactFlowProvider } from 'reactflow';
// or if you just want basic styles
import 'reactflow/dist/base.css';

const App = () => {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState<boolean>(false);

  // Load images from the gallery once
  useEffect(() => {
    dispatch(requestAllImages());
    dispatch(requestSystemConfig());
    setIsReady(true);
  }, [dispatch]);

  return isReady ? (
    <ReactFlowProvider>
      <SiteHeader />
      <Flow />
    </ReactFlowProvider>
  ) : (
    <Loading />
  );
};

export default App;
