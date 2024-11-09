import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from 'react';

// Define types for the context state and props
interface Device {
  id: string | null;
  label: string | null;
}

interface MeetingAppContextType {
  raisedHandsParticipants: Array<{
    participantId: string;
    raisedHandOn: number;
  }>;
  selectedMic: Device;
  selectedWebcam: Device;
  selectedSpeaker: Device;
  sideBarMode: string | null;
  pipMode: boolean;
  isCameraPermissionAllowed: boolean | null;
  isMicrophonePermissionAllowed: boolean | null;
  setRaisedHandsParticipants: React.Dispatch<
    React.SetStateAction<Array<{ participantId: string; raisedHandOn: number }>>
  >;
  setSelectedMic: React.Dispatch<React.SetStateAction<Device>>;
  setSelectedWebcam: React.Dispatch<React.SetStateAction<Device>>;
  setSelectedSpeaker: React.Dispatch<React.SetStateAction<Device>>;
  setSideBarMode: React.Dispatch<React.SetStateAction<string | null>>;
  setPipMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCameraPermissionAllowed: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  setIsMicrophonePermissionAllowed: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  useRaisedHandParticipants: () => {
    participantRaisedHand: (participantId: string) => void;
  };
}

export const MeetingAppContext = createContext<
  MeetingAppContextType | undefined
>(undefined);

export const useMeetingAppContext = (): MeetingAppContextType => {
  const context = useContext(MeetingAppContext);
  if (!context) {
    throw new Error(
      'useMeetingAppContext must be used within a MeetingAppProvider',
    );
  }
  return context;
};

interface MeetingAppProviderProps {
  children: ReactNode;
}

export const MeetingAppProvider: React.FC<MeetingAppProviderProps> = ({
  children,
}) => {
  const [selectedMic, setSelectedMic] = useState<Device>({
    id: null,
    label: null,
  });
  const [selectedWebcam, setSelectedWebcam] = useState<Device>({
    id: null,
    label: null,
  });
  const [selectedSpeaker, setSelectedSpeaker] = useState<Device>({
    id: null,
    label: null,
  });
  const [isCameraPermissionAllowed, setIsCameraPermissionAllowed] = useState<
    boolean | null
  >(null);
  const [isMicrophonePermissionAllowed, setIsMicrophonePermissionAllowed] =
    useState<boolean | null>(null);
  const [raisedHandsParticipants, setRaisedHandsParticipants] = useState<
    Array<{ participantId: string; raisedHandOn: number }>
  >([]);
  const [sideBarMode, setSideBarMode] = useState<string | null>(null);
  const [pipMode, setPipMode] = useState<boolean>(false);

  const useRaisedHandParticipants = () => {
    const raisedHandsParticipantsRef = useRef<
      Array<{ participantId: string; raisedHandOn: number }>
    >([]);

    const participantRaisedHand = (participantId: string) => {
      const raisedHandsParticipants = [...raisedHandsParticipantsRef.current];
      const newItem = { participantId, raisedHandOn: new Date().getTime() };

      const participantFound = raisedHandsParticipants.findIndex(
        ({ participantId: pID }) => pID === participantId,
      );

      if (participantFound === -1) {
        raisedHandsParticipants.push(newItem);
      } else {
        raisedHandsParticipants[participantFound] = newItem;
      }

      setRaisedHandsParticipants(raisedHandsParticipants);
    };

    useEffect(() => {
      raisedHandsParticipantsRef.current = raisedHandsParticipants;
    }, [raisedHandsParticipants]);

    const _handleRemoveOld = () => {
      const raisedHandsParticipants = [...raisedHandsParticipantsRef.current];
      const now = new Date().getTime();
      const persisted = raisedHandsParticipants.filter(({ raisedHandOn }) => {
        return (
          parseInt(raisedHandOn.toString()) + 15000 > parseInt(now.toString())
        );
      });

      if (raisedHandsParticipants.length !== persisted.length) {
        setRaisedHandsParticipants(persisted);
      }
    };

    useEffect(() => {
      const interval = setInterval(_handleRemoveOld, 1000);
      return () => clearInterval(interval);
    }, []);

    return { participantRaisedHand };
  };

  return (
    <MeetingAppContext.Provider
      value={{
        raisedHandsParticipants,
        selectedMic,
        selectedWebcam,
        selectedSpeaker,
        sideBarMode,
        pipMode,
        isCameraPermissionAllowed,
        isMicrophonePermissionAllowed,
        setRaisedHandsParticipants,
        setSelectedMic,
        setSelectedWebcam,
        setSelectedSpeaker,
        setSideBarMode,
        setPipMode,
        useRaisedHandParticipants,
        setIsCameraPermissionAllowed,
        setIsMicrophonePermissionAllowed,
      }}
    >
      {children}
    </MeetingAppContext.Provider>
  );
};
