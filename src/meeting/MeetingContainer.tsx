import React, { useState, useEffect, useRef, createRef, memo } from 'react';
import {
  Constants,
  useMeeting,
  useParticipant,
  usePubSub,
} from '@videosdk.live/react-sdk';
import { BottomBar } from './components/BottomBar';
import { SidebarContainer } from '../components/sidebarMeeting/SidebarContainer';
import MemorizedParticipantView from './components/ParticipantView';
import { PresenterView } from '../components/PresenterView';
import { nameTructed, trimSnackBarText } from '../utils/helper';
import WaitingToJoinScreen from '../components/screens/WaitingToJoinScreen';
import ConfirmBox from '../components/ConfirmBox';
import useIsMobile from '../hooks/useIsMobile';
import useIsTab from '../hooks/useIsTab';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import { useMeetingAppContext } from '../MeetingAppContextDef';

// Define the types for props
interface MeetingContainerProps {
  onMeetingLeave: () => void;
  setIsMeetingLeft: (left: boolean) => void;
}

export function MeetingContainer({
  onMeetingLeave,
  setIsMeetingLeft,
}: MeetingContainerProps) {
  const { setSelectedMic, setSelectedWebcam, setSelectedSpeaker } =
    useMeetingAppContext();

  const [participantsData, setParticipantsData] = useState<string[]>([]);

  const ParticipantMicStream = memo(
    ({ participantId }: { participantId: string }) => {
      // Individual hook for each participant
      const { micStream } = useParticipant(participantId);

      useEffect(() => {
        if (micStream) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(micStream.track);

          const audioElement = new Audio();
          audioElement.srcObject = mediaStream;
          audioElement.play();
        }
      }, [micStream, participantId]);

      return null;
    },
    [participantsData],
  );

  const { useRaisedHandParticipants } = useMeetingAppContext();
  const bottomBarHeight = 60;

  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [localParticipantAllowedJoin, setLocalParticipantAllowedJoin] =
    useState<boolean | null>(null);
  const [meetingErrorVisible, setMeetingErrorVisible] = useState(false);
  const [meetingError, setMeetingError] = useState<{
    code: number;
    message: string;
  } | null>(null);

  const mMeetingRef = useRef<any>(null);
  const containerRef = createRef<HTMLDivElement>();
  const containerHeightRef = useRef<number>(0);
  const containerWidthRef = useRef<number>(0);

  useEffect(() => {
    containerHeightRef.current = containerHeight;
    containerWidthRef.current = containerWidth;
  }, [containerHeight, containerWidth]);

  const isMobile = useIsMobile();
  const isTab = useIsTab();
  const isLGDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isXLDesktop = useMediaQuery({ minWidth: 1440 });

  const sideBarContainerWidth = isXLDesktop
    ? 400
    : isLGDesktop
    ? 360
    : isTab
    ? 320
    : isMobile
    ? 280
    : 240;

  useEffect(() => {
    containerRef.current?.offsetHeight &&
      setContainerHeight(containerRef.current.offsetHeight);
    containerRef.current?.offsetWidth &&
      setContainerWidth(containerRef.current.offsetWidth);

    window.addEventListener('resize', ({ target }) => {
      containerRef.current?.offsetHeight &&
        setContainerHeight(containerRef.current.offsetHeight);
      containerRef.current?.offsetWidth &&
        setContainerWidth(containerRef.current.offsetWidth);
    });
  }, [containerRef]);

  const { participantRaisedHand } = useRaisedHandParticipants();

  const _handleMeetingLeft = () => {
    setIsMeetingLeft(true);
  };

  const _handleOnRecordingStateChanged = ({ status }: { status: string }) => {
    if (
      status === Constants.recordingEvents.RECORDING_STARTED ||
      status === Constants.recordingEvents.RECORDING_STOPPED
    ) {
      toast(
        `${
          status === Constants.recordingEvents.RECORDING_STARTED
            ? 'Meeting recording is started'
            : 'Meeting recording is stopped.'
        }`,
        {
          position: 'bottom-left',
          autoClose: 4000,
          hideProgressBar: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        },
      );
    }
  };

  function onParticipantJoined(participant: any) {
    // Change quality to low, med or high based on resolution
    participant && participant.setQuality('high');
  }

  function onEntryResponded(participantId: string, name: string) {
    if (mMeetingRef.current?.localParticipant?.id === participantId) {
      if (name === 'allowed') {
        setLocalParticipantAllowedJoin(true);
      } else {
        setLocalParticipantAllowedJoin(false);
        setTimeout(() => {
          _handleMeetingLeft();
        }, 3000);
      }
    }
  }

  function onMeetingJoined() {
    console.log('onMeetingJoined');
  }

  function onMeetingLeft() {
    setSelectedMic({ id: null, label: null });
    setSelectedWebcam({ id: null, label: null });
    setSelectedSpeaker({ id: null, label: null });
    onMeetingLeave();
  }

  const _handleOnError = (data: { code: number; message: string }) => {
    const { code, message } = data;
    console.log('meetingErr', code, message);

    const joiningErrCodes = [
      4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010,
    ];

    const isJoiningError = joiningErrCodes.includes(code);
    const isCriticalError = `${code}`.startsWith('500');

    new Audio(
      isCriticalError
        ? `https://static.videosdk.live/prebuilt/notification_critical_err.mp3`
        : `https://static.videosdk.live/prebuilt/notification_err.mp3`,
    ).play();

    setMeetingErrorVisible(true);
    setMeetingError({
      code,
      message: isJoiningError ? 'Unable to join meeting!' : message,
    });
  };

  const mMeeting = useMeeting({
    onParticipantJoined,
    onEntryResponded,
    onMeetingJoined,
    onMeetingLeft,
    onError: _handleOnError,
    onRecordingStateChanged: _handleOnRecordingStateChanged,
  });

  const isPresenting = mMeeting.presenterId ? true : false;

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const participantIds = Array.from(mMeeting.participants.keys());
      console.log('Debounced participantIds', participantIds);

      setParticipantsData(participantIds);
      console.log('Setting participants');
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [mMeeting.participants]);

  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  usePubSub('RAISE_HAND', {
    onMessageReceived: (data) => {
      const localParticipantId = mMeeting?.localParticipant?.id;
      const { senderId, senderName } = data;
      const isLocal = senderId === localParticipantId;

      new Audio(
        `https://static.videosdk.live/prebuilt/notification.mp3`,
      ).play();

      toast(`${isLocal ? 'You' : nameTructed(senderName, 15)} raised hand 🖐🏼`, {
        position: 'bottom-left',
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      participantRaisedHand(senderId);
    },
  });

  usePubSub('CHAT', {
    onMessageReceived: (data) => {
      const localParticipantId = mMeeting?.localParticipant?.id;
      const { senderId, senderName, message } = data;
      const isLocal = senderId === localParticipantId;

      if (!isLocal) {
        new Audio(
          `https://static.videosdk.live/prebuilt/notification.mp3`,
        ).play();

        toast(
          `${trimSnackBarText(
            `${nameTructed(senderName, 15)} says: ${message}`,
          )}`,
          {
            position: 'bottom-left',
            autoClose: 4000,
            hideProgressBar: true,
            closeButton: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          },
        );
      }
    },
  });

  return (
    <div className="fixed inset-0">
      <div ref={containerRef} className="h-full flex flex-col bg-gray-800">
        {typeof localParticipantAllowedJoin === 'boolean' ? (
          localParticipantAllowedJoin ? (
            <>
              <div className={` flex flex-1 flex-row bg-gray-800 `}>
                <div
                  className={`${
                    isTab || isMobile ? 'w-full' : 'w-3/4'
                  } flex-col`}
                >
                  <div
                    style={{
                      height: `${containerHeight - bottomBarHeight}px`,
                    }}
                    className="overflow-auto pt-4"
                  >
                    {participantsData.map((id, index) => {
                      return (
                        <div key={id}>
                          <ParticipantMicStream participantId={id} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <SidebarConatiner />
              </div>
              <BottomBar />
            </>
          ) : (
            <WaitingToJoinScreen />
          )
        ) : null}
      </div>
      {meetingErrorVisible && meetingError && (
        <ConfirmBox
          title="Error"
          onCancel={() => setMeetingErrorVisible(false)}
          onConfirm={_handleMeetingLeft}
          description={meetingError.message}
          cancelText="Dismiss"
          confirmText="Leave meeting"
        />
      )}
    </div>
  );
}
