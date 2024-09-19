import styles from './index.module.scss';
import {
  format,
  subDays,
  addDays,
  startOfWeek,
  startOfMonth,
  startOfYear,
} from 'date-fns';

import { ReactSVG } from 'react-svg';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { getListFromDataProps } from '../../interfaces/types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
import { periods, types } from '../../data/data';

type TypeCall = 0 | 1 | undefined;
type Period = '3days' | 'week' | 'month' | 'year';
interface Props {
  title?: string;
  isDate?: boolean;
  typeDropdown?: 'typeCalling' | 'date';
  setDataForRequest: Dispatch<SetStateAction<getListFromDataProps>>;
  sortBy?: getListFromDataProps['sort_by']
}

const DropdownMenu = ({
  title = 'Все типы',
  setDataForRequest,
  typeDropdown,
  sortBy,
}: Props) => {

  const cn = classNames;
  const menuRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fullData, setFullData] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateChecked, setDateChecked] = useState<Period | null>(null);
  const [type, setType] = useState<string>(title);
  const [dateFormated, setDateFormated] = useState<string>(
    format(new Date(), 'dd.MM')
  );
  
  const dataNow = format(new Date(), 'dd.MM') === dateFormated;

  const handlerClick = () => {
    if (typeDropdown === 'typeCalling' || typeDropdown === 'date') {
      setIsOpen(!isOpen);
    } else if (sortBy) {
      setDataForRequest((data: getListFromDataProps) => ({
        ...data,
        sort_by: sortBy
      }));
    }
  };

  const handleMinusDay = () => {
    if (!setDataForRequest) return;
    const newDate = subDays(fullData, 1);
    setFullData(newDate);
    setDateFormated(format(newDate, 'dd.MM'));
    setDataForRequest((data: getListFromDataProps) => ({
      ...data,
      dateStart: format(newDate, 'yyyy-MM-dd'),
      dateEnd: format(newDate, 'yyyy-MM-dd'),
    }));
    setDateChecked(null);
  };

  const handlePlusDay = () => {
    if (dataNow || !setDataForRequest) return;
    const newDate = addDays(fullData, 1);
    setFullData(newDate);
    setDateFormated(format(newDate, 'dd.MM'));
    setDataForRequest((data: getListFromDataProps) => ({
      ...data,
      dateStart: format(newDate, 'yyyy-MM-dd'),
      dateEnd: format(newDate, 'yyyy-MM-dd'),
    }));
    setDateChecked(null);
  };

  const handleСhangeType = (in_out: TypeCall) => {
    setIsOpen(false);
    setDataForRequest((data: getListFromDataProps) => ({ ...data, in_out }));
    if (in_out === undefined) {
      setType('Все типы');
      return;
    }
    setType(in_out !== undefined && in_out === 0 ? 'Входящие' : 'Исходящие');
  };

  const handleChangePeriod = (period: Period) => {
    const endDate = format(new Date(), 'yyyy-MM-dd');
    setIsOpen(false);
    setStartDate(null);
    setEndDate(null);
    setDateChecked(period);
    switch (period) {
      case '3days':
        const startDate = subDays(new Date(), 3);
        setDataForRequest((data: getListFromDataProps) => ({
          ...data,
          dateStart: format(startDate, 'yyyy-MM-dd'),
          dateEnd: endDate,
        }));
        setDateFormated(
          `${format(startDate, 'dd-MM')} - ${format(new Date(), 'dd-MM')}`
        );
        break;
      case 'week':
        const startDateWeek = startOfWeek(new Date());
        setDataForRequest((data: getListFromDataProps) => ({
          ...data,
          dateStart: format(startDateWeek, 'yyyy-MM-dd'),
          dateEnd: endDate,
        }));
        setDateFormated(
          `${format(startDateWeek, 'dd-MM')} - ${format(new Date(), 'dd-MM')}`
        );
        break;
      case 'month':
        const startDateMonth = startOfMonth(new Date());
        setDataForRequest((data: getListFromDataProps) => ({
          ...data,
          dateStart: format(startDateMonth, 'yyyy-MM-dd'),
          dateEnd: endDate,
        }));
        setDateFormated(
          `${format(startDateMonth, 'dd-MM')} - ${format(new Date(), 'dd-MM')}`
        );
        break;
      case 'year':
        const startDateYear = startOfYear(new Date());
        setDataForRequest((data: getListFromDataProps) => ({
          ...data,
          dateStart: format(startDateYear, 'yyyy-MM-dd'),
          dateEnd: endDate,
        }));
        setDateFormated(
          `${format(startDateYear, 'dd-MM')} - ${format(new Date(), 'dd-MM')}`
        );
        break;
    }
  };

  useEffect(() => {
    if (!startDate || !endDate || !setDataForRequest) return;

    setDataForRequest((data: getListFromDataProps) => ({
      ...data,
      dateStart: format(startDate, 'yyyy-MM-dd'),
      dateEnd: format(endDate, 'yyyy-MM-dd'),
    }));

    const formatStartDate = format(startDate, 'dd-MM');
    const formatEndDate = format(endDate, 'dd-MM');

    setDateFormated(`${formatStartDate} - ${formatEndDate}`);
    setDateChecked(null);
    setIsOpen(false);
  }, [startDate, endDate, setDataForRequest]);

  useEffect(() => {
    const checkingClickByDocument = (event: MouseEvent) => {
      if (
        menuRef.current &&
        isOpen &&
        !menuRef.current.contains(event.target as HTMLUListElement)
      ) {
        setIsOpen(false);
      }
    };
    setTimeout(
      () => document.addEventListener('click', checkingClickByDocument),
      0
    );

    return () => document.removeEventListener('click', checkingClickByDocument);
  }, [menuRef, isOpen]);

  if (typeDropdown === 'date') {
    return (
      <div className={styles.wpapperDropdown}>
        <div className={styles.component}>
          <button className={styles.iconWrapperDate} onClick={handleMinusDay}>
            <ReactSVG src="./images/arrow_left.svg" wrapper="svg" />
          </button>
          <div onClick={handlerClick} className={styles.wpapperDateDropdown}>
            <span className={styles.iconCalendar}>
              <ReactSVG src="./images/icon-calendar.svg" wrapper="svg" />
            </span>
            {dateFormated}
          </div>

          <button
            className={classNames(styles.iconWrapperDate)}
            disabled={dataNow}
            onClick={handlePlusDay}
          >
            <ReactSVG src="./images/arrow_right.svg" wrapper="svg" />
          </button>
        </div>
        {isOpen && (
          <ul className={styles.menuDate} ref={menuRef}>
            {periods.map((elem, index) => (
              <li
                key={index}
                className={dateChecked === elem.period ? styles.active : ''}
                onClick={() => handleChangePeriod(elem.period as Period)}
              >
                {elem.title}
              </li>
            ))}
            <li>
              <div className={styles.checkDateBlock}>
                <div>Указать даты</div>
                <div className={styles.inputsDateWrapper}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd-MM-yyyy"
                    locale={ru}
                    placeholderText="__.__.____"
                    maxDate={endDate ? endDate : undefined}
                  />
                  -
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd-MM-yyyy"
                    locale={ru}
                    placeholderText="__.__.____"
                    minDate={startDate ? startDate : undefined}
                  />
                  <ReactSVG
                    src="./images/icon-calendar.svg"
                    wrapper="span"
                    className={styles.iconCalendar}
                  />
                </div>
              </div>
            </li>
          </ul>
        )}
      </div>
    );
  }

  if (typeDropdown === 'typeCalling') {
    return (
      <div className={styles.wpapperDropdown}>
        <div className={styles.component} onClick={handlerClick}>
          {type}
          <span className={cn(styles.iconwrapperType, isOpen && styles.open)}>
            <ReactSVG src="./images/dropdowarrow.svg" wrapper="svg" />
          </span>
        </div>
        {isOpen && (
          <ul className={styles.menuType} ref={menuRef}>
            {types.map((elem, index) => (
              <li
                key={index}
                className={type === elem.title ? styles.active : ''}
                onClick={() => handleСhangeType(elem.type as TypeCall)}
              >
                {elem.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className={styles.wpapperDropdown}>
      <div className={styles.component} onClick={handlerClick}>
        {title}
        <span className={styles.iconwrapperType}>
          <ReactSVG src="./images/dropdowarrow.svg" wrapper="svg" />
        </span>
      </div>
    </div>
  );
};

export default DropdownMenu;
