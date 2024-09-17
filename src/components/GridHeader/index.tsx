import styles from './index.module.scss';

const GridHeader = () => {
  return (
    <div className={styles.component}>
      <div>Тип</div>
      <div>Время</div>
      <div>Сотрудник</div>
      <div>Звонок</div>
      <div>Источник</div>
      <div>Оценка</div>
      <div>Длительность</div>
    </div>
  );
};

export default GridHeader;
