import React, { useState } from 'react';
import DropDown from '../DropDown';
import DropDownSpeaker from '../DropDownSpeaker';
import DropDownCam from '../DropDownCam';
import NetworkStats from '../NetworkStats';
import { MeetingDetailsScreen } from '../MeetingDetailsScreen';
import ConfirmBox from '../ConfirmBox';
import { toast } from 'react-toastify';

interface MeetingProps {
  mics: any[];
  speakers: any[];
  webcams: any[];
  changeMic: (mic: any) => void;
  customAudioStream: any;
  audioTrack: any;
  micOn: boolean;
  didDeviceChange: boolean;
  setDidDeviceChange: React.Dispatch<React.SetStateAction<boolean>>;
  changeWebcam: (webcam: any) => void;
  isMobile: boolean;
  isFirefox: boolean;
  getToken: () => Promise<string>;
  validateMeeting: (data: {
    roomId: string;
    token: string;
  }) => Promise<{ meetingId: string; err: string }>;
  createMeeting: (data: {
    token: string;
  }) => Promise<{ meetingId: string; err: string }>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setMeetingId: React.Dispatch<React.SetStateAction<string>>;
  participantName: string;
  setParticipantName: React.Dispatch<React.SetStateAction<string>>;
  videoTrack: any;
  setVideoTrack: React.Dispatch<React.SetStateAction<any>>;
  onClickStartMeeting: () => void;
  onClickJoin: (id: string) => void;
}

const MeetingComponent: React.FC<MeetingProps> = ({
  mics,
  speakers,
  webcams,
  changeMic,
  customAudioStream,
  audioTrack,
  micOn,
  didDeviceChange,
  setDidDeviceChange,
  changeWebcam,
  isMobile,
  isFirefox,
  getToken,
  validateMeeting,
  createMeeting,
  setToken,
  setMeetingId,
  participantName,
  setParticipantName,
  videoTrack,
  setVideoTrack,
  onClickStartMeeting,
}) => {
  const [dlgMuted, setDlgMuted] = useState(false);
  const [dlgDevices, setDlgDevices] = useState(false);

  return (
    <div className="relative w-full h-full">
      <div className="flex flex-wrap">
        <div className="w-full md:w-7/12 lg:w-8/12 xl:w-9/12">
          <div className="relative w-full h-full">
            <div className="flex items-center justify-center flex-col h-full w-full">
              <div className="relative w-full flex justify-center">
                <div className="absolute top-0 left-0 right-0 bottom-0">
                  <div className="absolute top-10 left-0 right-0">
                    {!isMobile && (
                      <div className="absolute top-2 right-10">
                        <NetworkStats />
                      </div>
                    )}
                    <div className="flex mt-3">
                      {!isFirefox && (
                        <>
                          <DropDown
                            mics={mics}
                            changeMic={changeMic}
                            customAudioStream={customAudioStream}
                            audioTrack={audioTrack}
                            micOn={micOn}
                            didDeviceChange={didDeviceChange}
                            setDidDeviceChange={setDidDeviceChange}
                          />
                          <DropDownSpeaker speakers={speakers} />
                          <DropDownCam
                            changeWebcam={changeWebcam}
                            webcams={webcams}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 2xl:col-span-5 col-span-12 md:relative">
                <div className="flex flex-1 flex-col items-center justify-center xl:m-16 lg:m-6 md:mt-9 lg:mt-14 xl:mt-20 mt-3 md:absolute md:left-0 md:right-0 md:top-0 md:bottom-0">
                  <MeetingDetailsScreen
                    participantName={participantName}
                    setParticipantName={setParticipantName}
                    videoTrack={videoTrack}
                    setVideoTrack={setVideoTrack}
                    onClickStartMeeting={onClickStartMeeting}
                    onClickJoin={async (id) => {
                      const token = await getToken();
                      const { meetingId, err } = await validateMeeting({
                        roomId: id,
                        token,
                      });
                      if (meetingId === id) {
                        setToken(token);
                        setMeetingId(id);
                        onClickStartMeeting();
                      } else {
                        toast(`${err}`, {
                          position: 'bottom-left',
                          autoClose: 4000,
                          hideProgressBar: true,
                          closeButton: false,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: 'light',
                        });
                      }
                    }}
                    _handleOnCreateMeeting={async () => {
                      const token = await getToken();
                      const { meetingId, err } = await createMeeting({ token });

                      if (meetingId) {
                        setToken(token);
                        setMeetingId(meetingId);
                      }
                      return { meetingId: meetingId, err: err };
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmBox
        open={dlgMuted}
        successText="OKAY"
        onSuccess={() => {
          setDlgMuted(false);
        }}
        title="System mic is muted"
        subTitle="Your default microphone is muted, please unmute it or increase audio input volume from system settings."
        onReject={() => {
          setDlgMuted(false); // or handle rejection action here
        }}
      />

      <ConfirmBox
        open={dlgDevices}
        successText="DISMISS"
        onSuccess={() => {
          setDlgDevices(false);
        }}
        title="Mic or webcam not available"
        subTitle="Please connect a mic and webcam to speak and share your video in the meeting. You can also join without them."
        onReject={() => {
          setDlgDevices(false); // or any action you want on rejection
        }}
      />
    </div>
  );
};

export default MeetingComponent;
