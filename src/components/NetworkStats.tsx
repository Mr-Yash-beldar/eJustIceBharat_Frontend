import UploadIcon from '../icons/NetworkStats/UploadIcon';
import DownloadIcon from '../icons/NetworkStats/DownloadIcon';
import RefreshIcon from '../icons/NetworkStats/RefreshIcon';
import RefreshCheck from '../icons/NetworkStats/RefreshCheck';
import { getNetworkStats } from '@videosdk.live/react-sdk'; // Correct import
import WifiOff from '../icons/NetworkStats/WifiOff';
import { useEffect, useState } from 'react';

// Dynamically infer the return type of getNetworkStats
type NetworkStatsType = Awaited<ReturnType<typeof getNetworkStats>>;

interface NetworkStatsProps {}

const NetworkStats: React.FC<NetworkStatsProps> = () => {
  const [error, setError] = useState<string>('no-error-loading');
  const [uploadSpeed, setUploadSpeed] = useState<number | null>(null);
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null);

  useEffect(() => {
    getNetworkStatistics();
  }, []);

  const getNetworkStatistics = async () => {
    setError('no-error-loading');
    try {
      const options = { timeoutDuration: 45000 }; // Set a custom timeout of 45 seconds
      const networkStats: NetworkStatsType = await getNetworkStats(options); // Await the Promise to get data

      if (networkStats) {
        setError('no-error');
        setDownloadSpeed(networkStats.downloadSpeed);
        setUploadSpeed(networkStats.uploadSpeed);
      }
    } catch (ex) {
      if (ex === 'Not able to get NetworkStats due to no Network') {
        setError('no-wifi');
      } else if (ex === 'Not able to get NetworkStats due to timeout') {
        setError('timeout');
      } else {
        console.log('Error in networkStats: ', ex);
      }
    }
  };

  const handleOnClick = () => {
    getNetworkStatistics();
  };

  return (
    <div className="flex flex-row auto-cols-max border border-[#3F4346] divide-x divide-[#3F4346] rounded-md bg-black opacity-80 h-9">
      {error === 'no-error-loading' && (
        <div className="group inline-flex items-center gap-3 text-xs text-customGray-250 ml-3">
          Checking network speeds
          <RefreshCheck />
        </div>
      )}

      {error === 'no-error' && (
        <>
          <div className="group inline-flex items-center gap-2 text-xs text-customGray-250 basis-1/2 w-32">
            <DownloadIcon />
            {downloadSpeed} MBPS
          </div>
          <div className="group inline-flex items-center gap-2 text-xs text-customGray-250 basis-1/2 w-32">
            <UploadIcon />
            {uploadSpeed} MBPS
          </div>
          <div
            className="basis-1/6 flex items-center justify-center"
            onClick={handleOnClick}
          >
            <RefreshIcon />
          </div>
        </>
      )}

      {error === 'no-wifi' && (
        <>
          <div className="group inline-flex items-center gap-3 text-xs text-red-250 p-2">
            <WifiOff />
            You're offline! Check your connection
          </div>
          <div
            className="flex items-center justify-center p-2"
            onClick={handleOnClick}
          >
            <RefreshIcon />
          </div>
        </>
      )}

      {error === 'timeout' && (
        <>
          <div className="group inline-flex items-center gap-3 text-xs text-red-250 p-2">
            Something went wrong! Couldn't load data
          </div>
          <div
            className="flex items-center justify-center p-2"
            onClick={handleOnClick}
          >
            <RefreshIcon />
          </div>
        </>
      )}
    </div>
  );
};

export default NetworkStats;
