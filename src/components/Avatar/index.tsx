import styles from './index.module.scss';

interface Props {
  src?: string;
}

const Avatar = ({ src }: Props) => {
  const avatar = src ? src : './images/non_avatar.png';

  return (
    <div className={styles.component}>
      <img src={avatar} alt="Аватар" />
    </div>
  );
};

export default Avatar;
