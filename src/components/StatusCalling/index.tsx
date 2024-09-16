import { ReactSVG } from 'react-svg';
import { StatusCallingProps, IconMapType } from '../../interfaces/types';

const StatusCalling = ({ status, in_out }: StatusCallingProps) => {
  const iconMap = {
    '1-Не дозвонился': './images/skipped.svg',
    '1-Дозвонился': './images/incoming.svg',
    '0-Не дозвонился': './images/noncall.svg',
    '0-Дозвонился': './images/incoming.svg',
  };

  const key = `${in_out}-${status}` as keyof IconMapType;
  const icon = iconMap[key];

  return <ReactSVG src={icon} wrapper="div" />;
};

export default StatusCalling;
