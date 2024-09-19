import { Dispatch, SetStateAction } from 'react';
import DropdownMenu from '../DropdownMenu';
import styles from './index.module.scss';
import { getListFromDataProps } from '../../interfaces/types';

interface Props {
  setDataForRequest: Dispatch<SetStateAction<getListFromDataProps>>;
}

const GridHeader = ({ setDataForRequest }: Props) => {
  return (
    <div className={styles.component}>
      <div>Тип</div>
      <DropdownMenu
        title="Время"
        setDataForRequest={setDataForRequest}
        sortBy="date"
      />
      <div>Сотрудник</div>
      <div>Звонок</div>
      <div>Источник</div>
      <div>Оценка</div>
      <DropdownMenu
        title="Длительность"
        setDataForRequest={setDataForRequest}
        sortBy="duration"
      />
    </div>
  );
};

export default GridHeader;
