import styles from './index.module.scss';
import { Howl } from 'howler';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';

interface Props {
  record: string;
  onMouseUnderElement: boolean;
}

const Player = ({ record, onMouseUnderElement }: Props) => {
  const linkToFile = useRef<string>();
  const soundRef = useRef<Howl | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      });
    }

    return () => {
      soundRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkToFile.current]);

  const playAudio = () => {
    soundRef.current?.play();
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
        <button onClick={playAudio}>Play</button>
      )}
    </div>
  );
};

export default Player;
