import { 
  createCameraVideoTrack, 
  createMicrophoneAudioTrack, 
  LocalVideoTrack, 
  LocalAudioTrack 
} from "@videosdk.live/react-sdk";

interface VideoTrackParams {
  webcamId?: string;
  encoderConfig?: string;
}

interface AudioTrackParams {
  micId?: string;
}

const useMediaStream = () => {

  const getVideoTrack = async ({ webcamId, encoderConfig }: VideoTrackParams): Promise<LocalVideoTrack | null> => {
    try {
      const track = await createCameraVideoTrack({
        cameraId: webcamId,
        encoderConfig: encoderConfig ? encoderConfig : "h540p_w960p",
        optimizationMode: "motion",
        multiStream: false,
      });

      return track;
    } catch (error) {
      return null;
    }
  };

  const getAudioTrack = async ({ micId }: AudioTrackParams): Promise<LocalAudioTrack | null> => {
    try {
      const track = await createMicrophoneAudioTrack({
        microphoneId: micId,
      });
      return track;
    } catch (error) {
      return null;
    }
  };

  return { getVideoTrack, getAudioTrack };
};

export default useMediaStream;
