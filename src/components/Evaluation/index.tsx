import classNames from 'classnames';
import styles from './index.module.scss';
import { EvaluationType } from '../../data/data';

interface Props {
  text: EvaluationType;
}

const Evaluation = ({ text }: Props) => {
  const cn = classNames;

  const classesMap = {
    Отлично: 'excellent',
    Хорошо: 'good',
    Плохо: 'bad',
    'Скрипт не использован': 'text',
  };

  return (
    <div>
      <div className={cn(styles.component, styles[classesMap[text]])}>
        {text}
      </div>
    </div>
  );
};

export default Evaluation;
