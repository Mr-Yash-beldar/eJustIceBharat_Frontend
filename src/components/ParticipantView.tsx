import { Popover, Transition } from '@headlessui/react';
import { useParticipant } from '@videosdk.live/react-sdk';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
// import { useMediaQuery } from 'react-responsive';
// import useIsMobile from '../hooks/useIsMobile';
// import useIsTab from '../hooks/useIsTab';
//import useWindowSize from '../hooks/useWindowSize';
import MicOffSmallIcon from '../icons/MicOffSmallIcon';
import NetworkIcon from '../icons/NetworkIcon';
import SpeakerIcon from '../icons/SpeakerIcon';
import { getQualityScore, nameTructed } from '../utils/common';

export interface CornerDisplayNameProps {
  participantId: string;
  isPresenting: boolean;
  displayName: string;
  isLocal: boolean;
  micOn: boolean;
  webcamOn: boolean;
  mouseOver: boolean;
  isActiveSpeaker: boolean;
}

export const CornerDisplayName: React.FC<CornerDisplayNameProps> = ({
  participantId,
  isPresenting,
  displayName,
  isLocal,
  micOn,
  mouseOver,
  isActiveSpeaker,
}) => {
  // const isMobile = useIsMobile();
  // const isTab = useIsTab();
  // const isLGDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  // const isXLDesktop = useMediaQuery({ minWidth: 1440 });

  // const { height: windowHeight } = useWindowSize();

  // const [statsBoxHeightRef, setStatsBoxHeightRef] =
  //   useState<HTMLDivElement | null>(null);
  // const [statsBoxWidthRef, setStatsBoxWidthRef] =
  //   useState<HTMLDivElement | null>(null);

  const [coords, setCoords] = useState<{ left?: number; top?: number }>({});

  // const statsBoxHeight = useMemo(
  //   () => statsBoxHeightRef?.offsetHeight,
  //   [statsBoxHeightRef],
  // );

  // const statsBoxWidth = useMemo(
  //   () => statsBoxWidthRef?.offsetWidth,
  //   [statsBoxWidthRef],
  // );

  // const analyzerSize = isXLDesktop
  //   ? 32
  //   : isLGDesktop
  //   ? 28
  //   : isTab
  //   ? 24
  //   : isMobile
  //   ? 20
  //   : 18;

  const show = useMemo(() => mouseOver, [mouseOver]);

  const {
    webcamStream,
    micStream,
    screenShareStream,
    getVideoStats,
    getAudioStats,
    getShareStats,
    getShareAudioStats,
  } = useParticipant(participantId);

  const statsIntervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const [score, setScore] = useState<number>(100);
  const [audioStats, setAudioStats] = useState<any>({});
  const [videoStats, setVideoStats] = useState<any>({});

  const updateStats = async () => {
    let stats: any[] = [];
    let audioStats: any[] = [];
    let videoStats: any[] = [];
    if (isPresenting) {
      stats = await getShareStats();
    } else if (webcamStream) {
      stats = await getVideoStats();
    } else if (micStream) {
      stats = await getAudioStats();
    }

    if (webcamStream || micStream || isPresenting) {
      videoStats = isPresenting ? await getShareStats() : await getVideoStats();
      audioStats = isPresenting
        ? await getShareAudioStats()
        : await getAudioStats();
    }

    const score = stats && stats.length > 0 ? getQualityScore(stats[0]) : 100;

    setScore(score);
    setAudioStats(audioStats);
    setVideoStats(videoStats);
  };

  // const qualityStateArray = [
  //   { label: '', audio: 'Audio', video: 'Video' },
  //   {
  //     label: 'Latency',
  //     audio:
  //       audioStats && audioStats[0]?.rtt ? `${audioStats[0]?.rtt} ms` : '-',
  //     video:
  //       videoStats && videoStats[0]?.rtt ? `${videoStats[0]?.rtt} ms` : '-',
  //   },
  //   {
  //     label: 'Jitter',
  //     audio:
  //       audioStats && audioStats[0]?.jitter
  //         ? `${parseFloat(audioStats[0]?.jitter).toFixed(2)} ms`
  //         : '-',
  //     video:
  //       videoStats && videoStats[0]?.jitter
  //         ? `${parseFloat(videoStats[0]?.jitter).toFixed(2)} ms`
  //         : '-',
  //   },
  //   {
  //     label: 'Packet Loss',
  //     audio:
  //       audioStats[0]?.packetsLost && audioStats[0]?.totalPackets
  //         ? `${parseFloat(
  //             String(
  //               (audioStats[0]?.packetsLost * 100) /
  //                 (audioStats[0]?.totalPackets || 1), // Ensure totalPackets is not zero
  //             ),
  //           ).toFixed(2)}
  //         %`
  //         : '-',
  //     video:
  //       videoStats[0]?.packetsLost && videoStats[0]?.totalPackets
  //         ? `${parseFloat(
  //             (
  //               (videoStats[0]?.packetsLost * 100) /
  //               (videoStats[0]?.totalPackets || 1)
  //             ).toString(),
  //           ).toFixed(2)}
  //         %`
  //         : '-',
  //   },
  //   {
  //     label: 'Bitrate',
  //     audio:
  //       audioStats && audioStats[0]?.bitrate
  //         ? `${parseFloat(audioStats[0]?.bitrate).toFixed(2)} kb/s`
  //         : '-',
  //     video:
  //       videoStats && videoStats[0]?.bitrate
  //         ? `${parseFloat(videoStats[0]?.bitrate).toFixed(2)} kb/s`
  //         : '-',
  //   },
  //   {
  //     label: 'Frame rate',
  //     audio: '-',
  //     video:
  //       videoStats && videoStats[0]?.size?.framerate != null
  //         ? `${videoStats[0]?.size?.framerate}`
  //         : '-',
  //   },
  //   {
  //     label: 'Resolution',
  //     audio: '-',
  //     video:
  //       videoStats && videoStats[0]?.size?.width != null
  //         ? `${videoStats[0]?.size?.width}x${videoStats[0]?.size?.height}`
  //         : '-',
  //   },
  //   {
  //     label: 'Codec',
  //     audio: audioStats && audioStats[0]?.codec ? audioStats[0]?.codec : '-',
  //     video: videoStats && videoStats[0]?.codec ? videoStats[0]?.codec : '-',
  //   },
  //   {
  //     label: 'Cur. Layers',
  //     audio: '-',
  //     video:
  //       videoStats && !isLocal && videoStats[0]?.currentSpatialLayer != null
  //         ? `S:${videoStats[0]?.currentSpatialLayer} T:${videoStats[0]?.currentTemporalLayer}`
  //         : '-',
  //   },
  //   {
  //     label: 'Pref. Layers',
  //     audio: '-',
  //     video:
  //       videoStats && !isLocal && videoStats[0]?.preferredSpatialLayer != null
  //         ? `S:${videoStats[0]?.preferredSpatialLayer} T:${videoStats[0]?.preferredTemporalLayer}`
  //         : '-',
  //   },
  // ];

  useEffect(() => {
    if (webcamStream || micStream || screenShareStream) {
      updateStats();

      if (statsIntervalIdRef.current) {
        clearInterval(statsIntervalIdRef.current);
      }

      statsIntervalIdRef.current = setInterval(updateStats, 500);
    } else {
      if (statsIntervalIdRef.current) {
        clearInterval(statsIntervalIdRef.current);
        statsIntervalIdRef.current = null;
      }
    }

    return () => {
      if (statsIntervalIdRef.current) clearInterval(statsIntervalIdRef.current);
    };
  }, [webcamStream, micStream, screenShareStream]);

  return (
    <>
      <div
        className="absolute bottom-2 left-2 rounded-md flex items-center justify-center p-2"
        style={{
          backgroundColor: '#00000066',
          transition: 'all 200ms',
          transitionTimingFunction: 'linear',
          transform: `scale(${show ? 1 : 0})`,
        }}
      >
        {!micOn && !isPresenting ? (
          <MicOffSmallIcon fillcolor="white" />
        ) : micOn && isActiveSpeaker ? (
          <SpeakerIcon />
        ) : null}
        <p className="text-sm text-white ml-0.5">
          {isPresenting
            ? isLocal
              ? `You are presenting`
              : `${nameTructed(displayName, 15)} is presenting`
            : isLocal
            ? 'You'
            : nameTructed(displayName, 26)}
        </p>
      </div>

      {(webcamStream || micStream || screenShareStream) && (
        <div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="absolute top-2 left-2 rounded-full p-1 flex items-center justify-center bg-gray-750 cursor-pointer"
          >
            <Popover>
              <Popover.Button
                className="text-white text-xs px-2 py-1.5 cursor-pointer"
                onMouseEnter={(e) =>
                  setCoords({ left: e.clientX, top: e.clientY })
                }
                onMouseLeave={() => setCoords({})}
              >
                {score === 100 ? (
                  <NetworkIcon
                    color1="#4CAF50"
                    color2="#388E3C"
                    color3="#1976D2"
                    color4="#0277BD"
                  />
                ) : (
                  <NetworkIcon
                    color1="#FFEB3B"
                    color2="#FF9800"
                    color3="#F44336"
                    color4="#D32F2F"
                  />
                )}
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition duration-75"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel
                  style={{
                    left: coords.left,
                    top: coords.top,
                  }}
                  className="w-auto p-2 rounded-md bg-black bg-opacity-60 text-white text-xs"
                >
                  <div className="space-y-2">
                    <h1 className="font-semibold text-xs">Network Health</h1>
                    <ul>
                      <li>
                        <strong>Audio:</strong> {audioStats?.packetsLost ?? '-'}
                      </li>
                      <li>
                        <strong>Video:</strong> {videoStats?.packetsLost ?? '-'}
                      </li>
                    </ul>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </div>
      )}
    </>
  );
};
