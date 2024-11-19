import { useContext, createContext, useState, useEffect, useRef, ReactNode } from "react";

// Define types for the context and states
interface SelectedDevice {
  id: string | null;
  label: string | null;
}

interface RaisedHandParticipant {
  participantId: string;
  raisedHandOn: number;
}

interface MeetingAppContextType {
  raisedHandsParticipants: RaisedHandParticipant[];
  selectedMic: SelectedDevice;
  selectedWebcam: SelectedDevice;
  selectedSpeaker: SelectedDevice;
  sideBarMode: string | null;
  pipMode: boolean;
  isCameraPermissionAllowed: boolean | null;
  isMicrophonePermissionAllowed: boolean | null;
  setRaisedHandsParticipants: React.Dispatch<React.SetStateAction<RaisedHandParticipant[]>>;
  setSelectedMic: React.Dispatch<React.SetStateAction<SelectedDevice>>;
  setSelectedWebcam: React.Dispatch<React.SetStateAction<SelectedDevice>>;
  setSelectedSpeaker: React.Dispatch<React.SetStateAction<SelectedDevice>>;
  setSideBarMode: React.Dispatch<React.SetStateAction<string | null>>;
  setPipMode: React.Dispatch<React.SetStateAction<boolean>>;
  useRaisedHandParticipants: () => { participantRaisedHand: (participantId: string) => void };
  setIsCameraPermissionAllowed: React.Dispatch<React.SetStateAction<boolean | null>>;
  setIsMicrophonePermissionAllowed: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const MeetingAppContext = createContext<MeetingAppContextType | undefined>(undefined);

export const useMeetingAppContext = (): MeetingAppContextType => {
  const context = useContext(MeetingAppContext);
  if (!context) {
    throw new Error("useMeetingAppContext must be used within a MeetingAppProvider");
  }
  return context;
};

interface MeetingAppProviderProps {
  children: ReactNode;
}

export const MeetingAppProvider = ({ children }: MeetingAppProviderProps) => {
  const [selectedMic, setSelectedMic] = useState<SelectedDevice>({ id: null, label: null });
  const [selectedWebcam, setSelectedWebcam] = useState<SelectedDevice>({ id: null, label: null });
  const [selectedSpeaker, setSelectedSpeaker] = useState<SelectedDevice>({ id: null, label: null });
  const [isCameraPermissionAllowed, setIsCameraPermissionAllowed] = useState<boolean | null>(null);
  const [isMicrophonePermissionAllowed, setIsMicrophonePermissionAllowed] = useState<boolean | null>(null);
  const [raisedHandsParticipants, setRaisedHandsParticipants] = useState<RaisedHandParticipant[]>([]);
  const [sideBarMode, setSideBarMode] = useState<string | null>(null);
  const [pipMode, setPipMode] = useState<boolean>(false);

  const useRaisedHandParticipants = () => {
    const raisedHandsParticipantsRef = useRef<RaisedHandParticipant[]>([]);

    const participantRaisedHand = (participantId: string) => {
      const raisedHandsParticipants = [...raisedHandsParticipantsRef.current];

      const newItem: RaisedHandParticipant = { participantId, raisedHandOn: new Date().getTime() };

      const participantFound = raisedHandsParticipants.findIndex(
        ({ participantId: pID }) => pID === participantId
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
        return parseInt(raisedHandOn.toString()) + 15000 > now;
      });

      if (raisedHandsParticipants.length !== persisted.length) {
        setRaisedHandsParticipants(persisted);
      }
    };

    useEffect(() => {
      const interval = setInterval(_handleRemoveOld, 1000);

      return () => {
        clearInterval(interval);
      };
    }, []);

    return { participantRaisedHand };
  };

  return (
    <MeetingAppContext.Provider
      value={{
        // states
        raisedHandsParticipants,
        selectedMic,
        selectedWebcam,
        selectedSpeaker,
        sideBarMode,
        pipMode,
        isCameraPermissionAllowed,
        isMicrophonePermissionAllowed,

        // setters
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
