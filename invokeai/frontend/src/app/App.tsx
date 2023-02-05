import ImageUploader from 'common/components/ImageUploader';
import Console from 'features/system/components/Console';
import ProgressBar from 'features/system/components/ProgressBar';
import SiteHeader from 'features/system/components/SiteHeader';
import InvokeTabs from 'features/ui/components/InvokeTabs';
import { keepGUIAlive } from './utils';

import useToastWatcher from 'features/system/hooks/useToastWatcher';

import { Button, Flex, Text } from '@chakra-ui/react';
import FloatingGalleryButton from 'features/ui/components/FloatingGalleryButton';
import FloatingParametersPanelButtons from 'features/ui/components/FloatingParametersPanelButtons';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
  useCreateSessionMutation,
  useInvokeSessionMutation,
} from './invokeApi';

keepGUIAlive();

type GeneratorProgress = {
  session_id: string;
  invocation_id: string;
  step: number;
  percent: number;
};

const socket_url = `ws://${window.location.host}`;
const socket = io(socket_url, {
  path: '/ws/socket.io',
});

const App = () => {
  useToastWatcher();
  const [invocationProgress, setInvocationProgress] = useState<number>();
  const [isGenerating, setIsGenerating] = useState(false);

  const [createSession, createSessionResult] = useCreateSessionMutation();
  const [invokeSession, _invokeSessionResult] = useInvokeSessionMutation();

  const handleCreateSession = async () => {
    const payload = await createSession({
      body: {
        nodes: [
          {
            id: 'a',
            type: 'txt2img',
            prompt: 'pizza',
            steps: 10,
          },
          {
            id: 'b',
            type: 'show_image',
          },
        ],
        links: [
          {
            from_node: { id: 'a', field: 'image' },
            to_node: { id: 'b', field: 'image' },
          },
        ],
      },
    }).unwrap();

    socket.emit('subscribe', { session: payload.id });
    console.log('subscribe', { session: payload.id });
  };

  const handleInvokeSession = async () => {
    if (!createSessionResult.data?.id) return;
    setIsGenerating(true);
    await invokeSession({
      sessionId: createSessionResult.data?.id,
      all: true,
    });
  };

  useEffect(() => {
    socket.removeAllListeners();
    socket.on('generator_progress', (data: GeneratorProgress) => {
      console.log('generator_progress', data);
      setInvocationProgress(data.percent);
    });
    socket.on('invocation_complete', (data) => {
      console.log('invocation_complete', data);
      setIsGenerating(false);
    });
    socket.on('invocation_started', (data) =>
      console.log('invocation_started', data)
    );
    socket.on('session_complete', (data) => {
      console.log('session_complete', data);
      socket.emit('unsubscribe', { session: data.session_id });
      console.log('unsubscribe', { session: data.session_id });
    });

    () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <ImageUploader>
        <ProgressBar />
        <Flex gap={2} p={2} alignItems="center">
          <Button
            onClick={handleCreateSession}
            isDisabled={!!createSessionResult.data?.id}
          >
            Create Session
          </Button>
          <Button
            onClick={handleInvokeSession}
            isDisabled={!createSessionResult.data?.id || isGenerating}
            isLoading={isGenerating}
            loadingText={`Invoking ${
              invocationProgress === undefined
                ? '...'
                : `${Math.round(invocationProgress * 100)}%`
            }`}
          >
            Invoke
          </Button>
          {createSessionResult.data?.id && (
            <Text>Session: {createSessionResult.data?.id}</Text>
          )}
        </Flex>
        <div className="app-content">
          <SiteHeader />
          <InvokeTabs />
        </div>
        <div className="app-console">
          <Console />
        </div>
      </ImageUploader>
      <FloatingParametersPanelButtons />
      <FloatingGalleryButton />
    </div>
  );
};

export default App;
