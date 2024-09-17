import styles from './index.module.scss';

interface Props {
  src?: string;
}

const Avatar = ({ src }: Props) => {
  const avatar = src ? src : './images/non_avatar.png';

  return (
    <div >
      <img src={avatar} alt="Аватар" className={styles.component}/>
    </div>
  );
};

export default Avatar;
