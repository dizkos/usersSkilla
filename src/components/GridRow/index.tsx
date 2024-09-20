import Avatar from '../Avatar';
import StatusCalling from '../StatusCalling';
import styles from './index.module.scss';
import { StatusCallingProps } from '../../interfaces/types';
import { format } from 'date-fns';
import Player from '../Player';
import { useRef, useState } from 'react';
import { evaluation, source } from '../../data/data';
import Evaluation from '../Evaluation';

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
  record: string;
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
  record,
}: Props) => {
  const [onMouseUnderElement, setOnMouseUnderElement] =
    useState<boolean>(false);

  const randomSource = useRef<number>(
    Math.floor(Math.random() * source.length)
  );

  const randomEvaluation = useRef<number>(
    Math.floor(Math.random() * evaluation.length)
  );

  return (
    <div
      className={styles.component}
      onMouseEnter={() => setOnMouseUnderElement(true)}
      onMouseLeave={() => setOnMouseUnderElement(false)}
    >
      <StatusCalling status={status} in_out={in_out} />
      <div>{format(new Date(date), 'HH:mm')}</div>
      <Avatar src={avatar} />
      <div>{to_number ? to_number : from_number}</div>
      <div>{source[randomSource.current]}</div>
      <Evaluation text={evaluation[randomEvaluation.current]} />
      <div>{time} сек</div>
      {record && (
        <Player record={record} onMouseUnderElement={onMouseUnderElement} />
      )}
    </div>
  );
};

export default GridItem;
