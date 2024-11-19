mediaStream.addTrack(webcamStream.track);
return mediaStream;
}
return null;
}, [webcamOn, webcamStream]);

return (
<div
className="relative w-full h-full"
onMouseEnter={() => setMouseOver(true)}
onMouseLeave={() => setMouseOver(false)}
>
{webcamOn && webcamStream ? (
  <ReactPlayer
    className="absolute top-0 left-0 w-full h-full"
    url={webcamMediaStream}
    playing
    playsinline
    muted={isLocal}
    height="100%"
    width="100%"
    style={{ objectFit: "cover" }}
  />
) : (
  <div className="w-full h-full flex items-center justify-center bg-gray-800">
    <p className="text-white text-sm">No Video</p>
  </div>
)}

<audio autoPlay ref={micRef} />

<CornerDisplayName
  participantId={participantId}
  displayName={displayName}
  isPresenting={false} // You can modify this based on your logic
  isLocal={isLocal}
  micOn={micOn}
  mouseOver={mouseOver}
  isActiveSpeaker={isActiveSpeaker}
/>
</div>
);
}
