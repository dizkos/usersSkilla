import styles from './index.module.scss';
import { Howl } from 'howler';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

interface Props {
  record: string;
  onMouseUnderElement: boolean;
}

const Player = ({ record, onMouseUnderElement }: Props) => {
  const linkToFile = useRef<string>();
  const soundRef = useRef<Howl | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [durationAudio, setDurationAudio] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const getAudioFile = async (record: string) => {
    try {
      const response = await axios.post(
        `https://api.skilla.ru/mango/getRecord?record=${record}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          },
          responseType: 'blob',
        }
      );

      if (response.data) {
        linkToFile.current = URL.createObjectURL(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Ошибка с получением аудиофайла:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (onMouseUnderElement) {
      setIsLoading(true);
      debounceTimeout.current = setTimeout(() => {
        getAudioFile(record);
      }, 1000);
    } else {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
        soundRef.current?.stop();
        soundRef.current?.unload();
      }
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      if (linkToFile.current) {
        URL.revokeObjectURL(linkToFile.current);
      }
    };
  }, [soundRef, onMouseUnderElement, record]);

  useEffect(() => {
    if (linkToFile.current) {
      soundRef.current = new Howl({
        src: [linkToFile.current],
        html5: true,
        format: ['mp3'],
        onload: () => {
          const duration = soundRef.current?.duration() || 0;
          setDurationAudio(duration);
        },
      });
    }

    return () => {
      soundRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkToFile.current]);

  const updateProgress = () => {
    if (soundRef.current) {
      const current = soundRef.current.seek();
      setCurrentTime(current);
      requestAnimationFrame(updateProgress);
    }
  };

  const playAudio = () => {
    setIsPlay(true);
    soundRef.current?.play();
    requestAnimationFrame(updateProgress);
  };

  const stopAudio = () => {
    setIsPlay(false);
    soundRef.current?.stop();
  };

  const downloadAudio = () => {
    if (!linkToFile.current) return;
    const element = document.createElement('a');
    element.href = linkToFile.current;
    element.download = 'audio.mp3';
    element.click();
  };

  return (
    <div
      className={classNames(
        styles.component,
        onMouseUnderElement && styles.active
      )}
    >
      {isLoading ? (
        <img src="./images/loader.svg" alt="Loader" />
      ) : (
        <>
          <span>{durationAudio}</span>
          <button
            onClick={playAudio}
            className={classNames(styles.play, isPlay && styles.playActive)}
          >
            <ReactSVG src="./images/play.svg" />
          </button>
          <div className={styles.range}>
            <div style={{width : (currentTime * 100 / durationAudio) || 0}} />
          </div>
          <button className={styles.icon} onClick={downloadAudio}>
            <ReactSVG src="./images/download.svg" />
          </button>
          <button
            className={classNames(
              styles.icon,
              isPlay ? styles.show : styles.hide
            )}
            onClick={stopAudio}
          >
            <ReactSVG src="./images/cross.svg" />
          </button>
        </>
      )}
    </div>
  );
};

export default Player;
