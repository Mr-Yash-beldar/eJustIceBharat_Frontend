import React, { useEffect, useRef, useState } from "react";
import animationData from "../../static/animations/join_meeting.json";
import Lottie from "lottie-react";
import useIsTab from "../../hooks/useIsTab";
import useIsMobile from "../../hooks/useIsMobile";

interface WaitingMessage {
  index: number;
  text: string;
}

const WaitingToJoinScreen: React.FC = () => {
  const waitingMessages: WaitingMessage[] = [
    { index: 0, text: "Creating a room for you..." },
    { index: 1, text: "Almost there..." },
  ];
  const [message, setMessage] = useState<WaitingMessage>(waitingMessages[0]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setMessage((prevMessage) =>
        prevMessage.index === waitingMessages.length - 1
          ? prevMessage
          : waitingMessages[prevMessage.index + 1]
      );
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const isTab = useIsTab();
  const isMobile = useIsMobile();

  const animationDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className="bg-gray-800"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div className="flex flex-col">
        <div
          style={{
            height: isTab ? 200 : isMobile ? 200 : 250,
            width: isTab ? 200 : isMobile ? 200 : 250,
          }}
        >
          <Lottie
            loop={animationDefaultOptions.loop}
            autoplay={animationDefaultOptions.autoplay}
            animationData={animationDefaultOptions.animationData}
            rendererSettings={{
              preserveAspectRatio: animationDefaultOptions.rendererSettings.preserveAspectRatio,
            }}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
        <h1 className="text-white text-center font-bold mt-1 text-xl">
          {message.text}
        </h1>
      </div>
    </div>
  );
};

export default WaitingToJoinScreen;
