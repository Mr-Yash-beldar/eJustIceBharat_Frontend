import { MeetingProvider } from "@videosdk.live/react-sdk";
import { useEffect, useState } from "react";
import { MeetingAppProvider } from "./MeetingAppContextDef";
import { MeetingContainer } from "./meeting/MeetingContainer";
import { LeaveScreen } from "./components/screens/LeaveScreen";
import { JoiningScreen } from "./components/screens/JoiningScreen";

// Define the types for state variables
interface AppState {
  token: string;
  meetingId: string;
  participantName: string;
  micOn: boolean;
  webcamOn: boolean;
  customAudioStream: MediaStream | null;
  customVideoStream: MediaStream | null;
  isMeetingStarted: boolean;
  isMeetingLeft: boolean;
}

function App() {
  const [token, setToken] = useState<string>("");
  const [meetingId, setMeetingId] = useState<string>("");
  const [participantName, setParticipantName] = useState<string>("");
  const [micOn, setMicOn] = useState<boolean>(false);
  const [webcamOn, setWebcamOn] = useState<boolean>(false);
  const [customAudioStream, setCustomAudioStream] = useState<MediaStream | null>(null);
  const [customVideoStream, setCustomVideoStream] = useState<MediaStream | null>(null);
  const [isMeetingStarted, setMeetingStarted] = useState<boolean>(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState<boolean>(false);

  const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)"
  ).matches;

  useEffect(() => {
    if (isMobile) {
      window.onbeforeunload = () => {
        return "Are you sure you want to exit?";
      };
    }
  }, [isMobile]);

  return (
    <>
      <MeetingAppProvider>
        {isMeetingStarted ? (
          <MeetingProvider
            config={{
              meetingId,
              micEnabled: micOn,
              webcamEnabled: webcamOn,
              name: participantName ? participantName : "TestUser",
              multiStream: true,
              customCameraVideoTrack: customVideoStream,
              customMicrophoneAudioTrack: customAudioStream
            }}
            token={token}
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
          >
            <MeetingContainer
              onMeetingLeave={() => {
                setToken("");
                setMeetingId("");
                setParticipantName("");
                setWebcamOn(false);
                setMicOn(false);
                setMeetingStarted(false);
              }}
              setIsMeetingLeft={setIsMeetingLeft}
            />
          </MeetingProvider>
        ) : isMeetingLeft ? (
          <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
        ) : (
          <JoiningScreen
            participantName={participantName}
            setParticipantName={setParticipantName}
            setMeetingId={setMeetingId}
            setToken={setToken}
            micOn={micOn}
            setMicOn={setMicOn}
            webcamOn={webcamOn}
            setWebcamOn={setWebcamOn}
            customAudioStream={customAudioStream}
            setCustomAudioStream={setCustomAudioStream}
            customVideoStream={customVideoStream}
            setCustomVideoStream={setCustomVideoStream}
            onClickStartMeeting={() => {
              setMeetingStarted(true);
            }}
            startMeeting={isMeetingStarted}
            setIsMeetingLeft={setIsMeetingLeft}
          />
        )}
      </MeetingAppProvider>
    </>
  );
}

export default App;
