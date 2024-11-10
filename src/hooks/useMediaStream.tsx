import {
  createCameraVideoTrack,
  createMicrophoneAudioTrack,
} from '@videosdk.live/react-sdk';

// Define the expected parameters types for video and audio tracks
interface GetVideoTrackParams {
  webcamId: string;
  encoderConfig?:
    | 'h540p_w960p'
    | 'h90p_w160p'
    | 'h180p_w320p'
    | 'h216p_w384p'
    | 'h360p_w640p'
    | 'h720p_w1280p'
    | 'h1080p_w1920p'
    | 'h1440p_w2560p'
    | 'h2160p_w3840p'
    | 'h120p_w160p'
    | 'h180p_w240p'
    | undefined;
}

interface GetAudioTrackParams {
  micId: string;
}

const useMediaStream = () => {
  // Function to get the video track
  const getVideoTrack = async ({
    webcamId,
    encoderConfig,
  }: GetVideoTrackParams): Promise<MediaStreamTrack | null> => {
    try {
      // Create video track using the SDK method
      const track = await createCameraVideoTrack({
        cameraId: webcamId,
        encoderConfig: encoderConfig || 'h540p_w960p', // default to a valid encoderConfig value
        optimizationMode: 'motion',
        multiStream: false,
      });

      // Log the track to check what it returns
      console.log('Video track:', track);

      // Assuming 'track' returned is of type MediaStreamTrack
      return track as unknown as MediaStreamTrack; // Force cast if necessary
    } catch (error) {
      console.error('Error getting video track:', error);
      return null;
    }
  };

  // Function to get the audio track
  const getAudioTrack = async ({
    micId,
  }: GetAudioTrackParams): Promise<MediaStreamTrack | null> => {
    try {
      // Create audio track using the SDK method
      const track = await createMicrophoneAudioTrack({
        microphoneId: micId,
      });

      // Log the track to check what it returns
      console.log('Audio track:', track);

      // Assuming 'track' returned is of type MediaStreamTrack
      return track as unknown as MediaStreamTrack; // Force cast if necessary
    } catch (error) {
      console.error('Error getting audio track:', error);
      return null;
    }
  };

  return { getVideoTrack, getAudioTrack };
};

export default useMediaStream;
