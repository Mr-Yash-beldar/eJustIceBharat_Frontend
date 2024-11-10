import { useMemo } from 'react';
import { Constants, useMeeting } from '@videosdk.live/react-sdk';

// Type for the return value of the hook (boolean)
const useIsRecording = (): boolean => {
  const { recordingState } = useMeeting();

  const isRecording = useMemo<boolean>(
    () =>
      recordingState === Constants.recordingEvents.RECORDING_STARTED ||
      recordingState === Constants.recordingEvents.RECORDING_STOPPING,
    [recordingState],
  );

  return isRecording;
};

export default useIsRecording;
