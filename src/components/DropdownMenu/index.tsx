import Avatar from '../Avatar';
import StatusCalling from '../StatusCalling';
import styles from './index.module.scss';
import { StatusCallingProps } from '../../interfaces/types';
import { format } from 'date-fns';
import { ReactSVG } from 'react-svg';
import { useState } from 'react';
import classNames from 'classnames';

interface Props {
  title?: string;
  isDate?: boolean;
}

const DropdownMenu = ({ title = 'Все типы', isDate }: Props) => {
  const cn = classNames;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlerClick = () => {
    setIsOpen(!isOpen);
  };

  if (isDate)
    return (
      <div className={styles.wpapperDropdown}>
        <div className={styles.component}>
          <span className={styles.iconWrapperDate}>
            <ReactSVG src="./images/arrow_left.svg" wrapper="svg" />
          </span>
          <span className={styles.iconCalendar}>
            <ReactSVG src="./images/icon-calendar.svg" wrapper="svg" />
          </span>
          {title}

          <span className={styles.iconWrapperDate}>
            <ReactSVG src="./images/arrow_right.svg" wrapper="svg" />
          </span>
        </div>
        {isOpen && (
          <ul className={styles.menu}>
            <li>Все типы</li>
            <li>Исходящие</li>
            <li>Входящие</li>
          </ul>
        )}
      </div>
    );

  return (
    <div className={styles.wpapperDropdown}>
      <div className={styles.component} onClick={handlerClick}>
        {title}
        <span className={cn(styles.iconwrapperType, isOpen && styles.open)}>
          <ReactSVG src="./images/dropdowarrow.svg" wrapper="svg" />
        </span>
      </div>
      {isOpen && (
        <ul className={styles.menu}>
          <li>Все типы</li>
          <li>Исходящие</li>
          <li>Входящие</li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
