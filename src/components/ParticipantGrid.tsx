import React, { useMemo } from 'react';
import { useMeetingAppContext } from '../MeetingAppContextDef';
import { CornerDisplayNameProps } from './ParticipantView';

import { CornerDisplayName } from './ParticipantView';
// Define the types for the props of ParticipantGrid and MemoizedParticipant
interface ParticipantGridProps {
  participantIds: string[];
  isPresenting: boolean;
  participants: { [key: string]: CornerDisplayNameProps }; // Assuming this holds all the required participant details
}

// Define the types for the props of MemoizedParticipant
interface MemoizedParticipantProps {
  participantId: string;
  isPresenting: boolean;
  displayName: string;
  isLocal: boolean;
  micOn: boolean;
  mouseOver: boolean;
  isActiveSpeaker: boolean;
  webcamOn: boolean;
}

const MemoizedParticipant = React.memo(
  ({
    participantId,
    isPresenting,
    displayName,
    isLocal,
    micOn,
    mouseOver,
    isActiveSpeaker,
    webcamOn,
  }: MemoizedParticipantProps) => {
    return (
      <CornerDisplayName
        participantId={participantId}
        isPresenting={isPresenting}
        displayName={displayName}
        isLocal={isLocal}
        micOn={micOn}
        mouseOver={mouseOver}
        isActiveSpeaker={isActiveSpeaker}
        webcamOn={webcamOn}
      />
    );
  },
  (
    prevProps: MemoizedParticipantProps,
    nextProps: MemoizedParticipantProps,
  ) => {
    return prevProps.participantId === nextProps.participantId;
  },
);

const ParticipantGrid: React.FC<ParticipantGridProps> = ({
  participantIds,
  isPresenting,
  participants, // Include the participants prop
}) => {
  const { sideBarMode } = useMeetingAppContext();
  const isMobile = window.matchMedia(
    'only screen and (max-width: 768px)',
  ).matches;

  const perRow = useMemo(() => {
    if (isMobile || isPresenting) {
      if (participantIds.length < 4) return 1;
      if (participantIds.length < 9) return 2;
      return 3;
    }
    if (participantIds.length < 5) return 2;
    if (participantIds.length < 7) return 3;
    if (participantIds.length < 9) return 4;
    if (participantIds.length < 10) return 3;
    if (participantIds.length < 11) return 4;
    return 4;
  }, [isMobile, isPresenting, participantIds.length]);

  return (
    <div
      className={`flex flex-col md:flex-row flex-grow m-3 items-center justify-center ${
        participantIds.length < 2 && !sideBarMode && !isPresenting
          ? 'md:px-16 md:py-2'
          : participantIds.length < 3 && !sideBarMode && !isPresenting
          ? 'md:px-16 md:py-8'
          : participantIds.length < 4 && !sideBarMode && !isPresenting
          ? 'md:px-16 md:py-4'
          : participantIds.length > 4 && !sideBarMode && !isPresenting
          ? 'md:px-14'
          : 'md:px-0'
      }`}
    >
      <div className="flex flex-col w-full h-full">
        {Array.from(
          { length: Math.ceil(participantIds.length / perRow) },
          (_, i) => {
            return (
              <div
                key={`participant-${i}`}
                className={`flex flex-1 ${
                  isPresenting
                    ? participantIds.length === 1
                      ? 'justify-start items-start'
                      : 'items-center justify-center'
                    : 'items-center justify-center'
                }`}
              >
                {participantIds
                  .slice(i * perRow, (i + 1) * perRow)
                  .map((participantId) => {
                    const participant = participants[participantId]; // Get participant data
                    return (
                      <div
                        key={`participant_${participantId}`}
                        className={`flex flex-1 ${
                          isPresenting
                            ? participantIds.length === 1
                              ? 'md:h-48 md:w-44 xl:w-52 xl:h-48'
                              : participantIds.length === 2
                              ? 'md:w-44 xl:w-56'
                              : 'md:w-44 xl:w-48'
                            : 'w-full'
                        } items-center justify-center h-full ${
                          participantIds.length === 1
                            ? 'md:max-w-7xl 2xl:max-w-[1480px]'
                            : 'md:max-w-lg 2xl:max-w-2xl'
                        } overflow-clip overflow-hidden p-1`}
                      >
                        <MemoizedParticipant
                          participantId={participantId}
                          isPresenting={isPresenting}
                          displayName={participant.displayName}
                          isLocal={participant.isLocal}
                          micOn={participant.micOn}
                          mouseOver={participant.mouseOver} // Provide mouseOver prop
                          isActiveSpeaker={participant.isActiveSpeaker} // Provide isActiveSpeakers prop
                          webcamOn={participant.webcamOn}
                        />
                      </div>
                    );
                  })}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

// Memoize the ParticipantGrid component with proper typing
export const MemoizedParticipantGrid = React.memo(
  ParticipantGrid,
  (prevProps: ParticipantGridProps, nextProps: ParticipantGridProps) => {
    return (
      JSON.stringify(prevProps.participantIds) ===
        JSON.stringify(nextProps.participantIds) &&
      prevProps.isPresenting === nextProps.isPresenting
    );
  },
);
