import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BottomBarButtonTypes } from './types'; // Assuming the icon types are defined in this file.
import MeetingIdCopyBTN from './MeetingIdCopyBTN';
import RecordingBTN from './RecordingBTN';
import RaiseHandBTN from './RaiseHandBTN';
import MicBTN from './MicBTN';
import WebCamBTN from './WebCamBTN';
import ScreenShareBTN from './ScreenShareBTN';
import PipBTN from './PipBTN';
import LeaveBTN from './LeaveBTN';
import ChatBTN from './ChatBTN';
import ParticipantsBTN from './ParticipantsBTN';

interface BottomBarProps {
  isMobile: boolean;
  isTab: boolean;
  isDialogOpen: boolean;
  icon: BottomBarButtonTypes;
  tollTipEl?: React.RefObject<HTMLElement>;
}

const BottomBar: React.FC<BottomBarProps> = ({
  isMobile,
  isTab,
  isDialogOpen,
  icon,
  tollTipEl,
}) => {
  return isDialogOpen ? (
    <div className="fixed inset-0 z-50">
      <Transition appear show={isDialogOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => {}}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
              <Dialog.Panel>
                <div className="flex flex-col items-center">
                  <div className="flex flex-row justify-around w-full">
                    {icon === BottomBarButtonTypes.RECORDING ? (
                      <RecordingBTN />
                    ) : icon === BottomBarButtonTypes.RAISE_HAND ? (
                      <RaiseHandBTN isMobile={isMobile} isTab={isTab} />
                    ) : icon === BottomBarButtonTypes.MIC ? (
                      <MicBTN />
                    ) : icon === BottomBarButtonTypes.WEBCAM ? (
                      <WebCamBTN />
                    ) : icon === BottomBarButtonTypes.SCREEN_SHARE ? (
                      <ScreenShareBTN isMobile={isMobile} isTab={isTab} />
                    ) : icon === BottomBarButtonTypes.CHAT ? (
                      <ChatBTN isMobile={isMobile} isTab={isTab} />
                    ) : icon === BottomBarButtonTypes.PARTICIPANTS ? (
                      <ParticipantsBTN isMobile={isMobile} isTab={isTab} />
                    ) : icon === BottomBarButtonTypes.MEETING_ID_COPY ? (
                      <MeetingIdCopyBTN />
                    ) : icon === BottomBarButtonTypes.PIP ? (
                      <PipBTN isMobile={isMobile} isTab={isTab} />
                    ) : null}
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  ) : (
    <div className="md:flex lg:px-2 xl:px-6 pb-2 px-2 hidden">
      <MeetingIdCopyBTN />

      <div className="flex flex-1 items-center justify-center" ref={tollTipEl}>
        <RecordingBTN />
        <RaiseHandBTN isMobile={isMobile} isTab={isTab} />
        <MicBTN />
        <WebCamBTN />
        <ScreenShareBTN isMobile={isMobile} isTab={isTab} />
        <PipBTN isMobile={isMobile} isTab={isTab} />
        <LeaveBTN />
      </div>
      <div className="flex items-center justify-center">
        <ChatBTN isMobile={isMobile} isTab={isTab} />
        <ParticipantsBTN isMobile={isMobile} isTab={isTab} />
      </div>
    </div>
  );
};

export default BottomBar;
