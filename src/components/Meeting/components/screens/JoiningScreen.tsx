import React, { useEffect, useRef, useState } from "react";
import { Constants, useMediaDevice } from "@videosdk.live/react-sdk";
import useMediaStream from "../../hooks/useMediaStream";
import useIsMobile from "../../hooks/useIsMobile";
import { useMeetingAppContext } from "../../MeetingAppContextDef";

const JoiningScreen = ({
  micOn,
  webcamOn,
  setMicOn,
  setWebcamOn,
  setCustomAudioStream,
  setCustomVideoStream,
}) => {
  const {
    selectedWebcam,
    selectedMic,
    setSelectedMic,
    setSelectedWebcam,
    setIsCameraPermissionAllowed,
    setIsMicrophonePermissionAllowed,
    isCameraPermissionAllowed,
    isMicrophonePermissionAllowed,
  } = useMeetingAppContext();

  const [devices, setDevices] = useState({ webcams: [], mics: [], speakers: [] });
  const [audioTrack, setAudioTrack] = useState(null);
  const [videoTrack, setVideoTrack] = useState(null);
  const videoPlayerRef = useRef();
  const audioTrackRef = useRef();
  const videoTrackRef = useRef();
  const { getVideoTrack, getAudioTrack } = useMediaStream();
  const { checkPermissions, getCameras, getMicrophones, requestPermission } = useMediaDevice();
  const isMobile = useIsMobile();

  useEffect(() => {
    micOn ? startAudioTrackListener(audioTrack) : stopAudioTrack();
  }, [micOn, audioTrack]);

  useEffect(() => {
    webcamOn ? playVideoTrack(videoTrack) : stopVideoTrack();
  }, [webcamOn, videoTrack]);

  useEffect(() => {
    if (isCameraPermissionAllowed) getCameraDevices();
    if (isMicrophonePermissionAllowed) getAudioDevices();
  }, [isCameraPermissionAllowed, isMicrophonePermissionAllowed]);

  const startAudioTrackListener = (track) => {
    if (track) {
      audioTrackRef.current = track;
      track.addEventListener("mute", () => setMicOn(false));
    }
  };

  const playVideoTrack = (track) => {
    if (videoPlayerRef.current && track) {
      videoPlayerRef.current.srcObject = new MediaStream([track]);
      videoPlayerRef.current.play();
    }
  };

  const stopVideoTrack = () => {
    videoTrackRef.current?.stop();
    if (videoPlayerRef.current) videoPlayerRef.current.srcObject = null;
  };

  const stopAudioTrack = () => {
    audioTrackRef.current?.stop();
  };

  const toggleMic = async () => {
    if (micOn) {
      stopAudioTrack();
      setMicOn(false);
    } else {
      const stream = await getAudioTrack({ micId: selectedMic.id });
      setAudioTrack(stream?.getAudioTracks()[0]);
      setCustomAudioStream(stream);
      setMicOn(true);
    }
  };

  const toggleWebcam = async () => {
    if (webcamOn) {
      stopVideoTrack();
      setWebcamOn(false);
    } else {
      const stream = await getVideoTrack({ webcamId: selectedWebcam.id });
      setVideoTrack(stream?.getVideoTracks()[0]);
      setCustomVideoStream(stream);
      setWebcamOn(true);
    }
  };

  const getCameraDevices = async () => {
    const webcams = await getCameras();
    setDevices((prev) => ({ ...prev, webcams }));
    setSelectedWebcam(webcams[0] || {});
  };

  const getAudioDevices = async () => {
    const mics = await getMicrophones();
    setDevices((prev) => ({ ...prev, mics }));
    setSelectedMic(mics[0] || {});
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800">
      <div className="flex items-center justify-center h-full">
        <div className="relative w-3/4">
          <video
            ref={videoPlayerRef}
            autoPlay
            muted
            playsInline
            className="w-full rounded-lg bg-black"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
            <button onClick={toggleMic} className="p-4 bg-white rounded-full">
              {micOn ? "Mic On" : "Mic Off"}
            </button>
            <button onClick={toggleWebcam} className="p-4 bg-white rounded-full">
              {webcamOn ? "Webcam On" : "Webcam Off"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoiningScreen;
