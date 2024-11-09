import { useState, useEffect, useMemo, useRef } from 'react'; // Import useState
import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import ReactPlayer from 'react-player';
import MicOffSmallIcon from '../icons/MicOffSmallIcon';
import ScreenShareIcon from '../icons/ScreenShareIcon';
import SpeakerIcon from '../icons/SpeakerIcon';
import { nameTructed } from '../utils/helper';
import { CornerDisplayName } from './ParticipantView'; // Ensure this component is imported if used later

interface PresenterViewProps {
  height: string | number;
}

export function PresenterView({ height }: PresenterViewProps) {
  const mMeeting = useMeeting();

  const presenterId = mMeeting?.presenterId || ''; // Fallback to empty string if undefined

  const videoPlayer = useRef<ReactPlayer>(null);
  const [mouseOver, setMouseOver] = useState(false); // Define mouseOver state

  const {
    micOn,
    webcamOn,
    isLocal,
    screenShareStream,
    screenShareAudioStream,
    screenShareOn,
    displayName,
    isActiveSpeaker,
  } = useParticipant(presenterId);

  const mediaStream = useMemo(() => {
    if (screenShareOn && screenShareStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(screenShareStream.track);
      return mediaStream;
    }
    return null;
  }, [screenShareStream, screenShareOn]);

  const audioPlayer = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (
      !isLocal &&
      audioPlayer.current &&
      screenShareOn &&
      screenShareAudioStream
    ) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(screenShareAudioStream.track);

      if (audioPlayer.current) {
        audioPlayer.current.srcObject = mediaStream;
        audioPlayer.current.play().catch((err) => {
          if (
            err.message ===
            "play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD"
          ) {
            console.error('Audio play error:', err.message);
          }
        });
      }
    } else {
      if (audioPlayer.current) {
        audioPlayer.current.srcObject = null;
      }
    }
  }, [screenShareAudioStream, screenShareOn, isLocal]);

  return (
    <div
      className={`bg-gray-750 rounded m-2 relative overflow-hidden w-full h-[${height}xl:p-6 lg:p-[52px] md:p-[26px] p-1]`}
      onMouseEnter={() => setMouseOver(true)} // Set mouseOver state to true when mouse enters
      onMouseLeave={() => setMouseOver(false)} // Set mouseOver state to false when mouse leaves
    >
      <audio autoPlay playsInline controls={false} ref={audioPlayer} />
      <div className="video-contain absolute h-full w-full">
        <ReactPlayer
          ref={videoPlayer}
          playsinline
          playIcon={<></>}
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          url={mediaStream || ''}
          height="100%"
          width="100%"
          style={{
            filter: isLocal ? 'blur(1rem)' : undefined,
          }}
          onError={(err) => {
            console.log('Presenter video error:', err);
          }}
        />
        <div
          className="bottom-2 left-2 bg-gray-750 p-2 absolute rounded-md flex items-center justify-center"
          style={{
            transition: 'all 200ms',
            transitionTimingFunction: 'linear',
          }}
        >
          {!micOn ? (
            <MicOffSmallIcon fillcolor="white" />
          ) : micOn && isActiveSpeaker ? (
            <SpeakerIcon />
          ) : (
            <></>
          )}

          <p className="text-sm text-white">
            {isLocal
              ? `You are presenting`
              : `${nameTructed(displayName, 15)} is presenting`}
          </p>
        </div>
        {isLocal ? (
          <>
            <div className="p-10 rounded-2xl flex flex-col items-center justify-center absolute top-1/2 left-1/2 bg-gray-750 transform -translate-x-1/2 -translate-y-1/2">
              <ScreenShareIcon
                style={{ height: 48, width: 48, color: 'white' }}
              />
              <div className="mt-4">
                <p className="text-white text-xl font-semibold">
                  You are presenting to everyone
                </p>
              </div>
              <div className="mt-8">
                <button
                  className="bg-purple-550 text-white px-4 py-2 rounded text-sm text-center font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    mMeeting.toggleScreenShare();
                  }}
                >
                  STOP PRESENTING
                </button>
              </div>
            </div>
            <CornerDisplayName
              {...{
                isLocal,
                displayName,
                micOn,
                webcamOn,
                isPresenting: true,
                participantId: presenterId,
                isActiveSpeaker,
                mouseOver, // Pass the mouseOver state here
              }}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
