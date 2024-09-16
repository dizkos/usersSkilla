import Avatar from '../Avatar';
import StatusCalling from '../StatusCalling';
import styles from './index.module.scss';
import { StatusCallingProps } from '../../interfaces/types';
import { format } from 'date-fns';

interface Props {
  status: StatusCallingProps['status'];
  in_out: 1 | 0;
  date: string;
  person_avatar: string | undefined;
  line_name: string;
  to_number: string;
  from_number: string;
  time: string;
  errors: string[];
}

const GridItem = ({
  status,
  in_out,
  date,
  person_avatar: avatar,
  line_name,
  to_number,
  from_number,
  time,
  errors,
}: Props) => {
  return (
    <div className={styles.component}>
      <StatusCalling status={status} in_out={in_out} />
      <div>{format(new Date(date), 'HH:mm')}</div>
      <Avatar src={avatar} />
      <div>{to_number ? to_number : from_number}</div>
      <div>{line_name}</div>
      <div>{errors[0]}</div>
      <div>{time} сек</div>
    </div>
  );
};

export default GridItem;
