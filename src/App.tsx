import { useEffect, useState } from 'react';
import GridItem from './components/GridRow';
import { useGetUserListMutation } from './store/listUsersApi';
import GridHeader from './components/GridHeader';
import DropdownMenu from './components/DropdownMenu';
import { getListFromDataProps } from './interfaces/types';
import { ReactSVG } from 'react-svg';
import { format } from 'date-fns';

function App() {
  const defautdIntervalDates = {
    dateStart: format(new Date(), 'yyyy-MM-dd'),
    dateEnd: format(new Date(), 'yyyy-MM-dd'),
  };
  const [getUserList, { data, isLoading, isError }] = useGetUserListMutation();
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [dataForRequest, setDataForRequest] =
    useState<getListFromDataProps>(defautdIntervalDates);

  useEffect(() => {
    getUserList(dataForRequest);
  }, [getUserList, dataForRequest]);

  const reverseFiltres = () => {
    setDataForRequest(defautdIntervalDates);
    setIsFiltered(false);
  };

  return (
    <div id="page">
      <div className="page-wrapper">
        <div className="page-filters">
          <div>
            <DropdownMenu
              setDataForRequest={setDataForRequest}
              typeDropdown="typeCalling"
              setIsFiltered={setIsFiltered}
              isFiltered={isFiltered}
            />
            {isFiltered && (
              <button onClick={reverseFiltres}>
                Сбросить фильтры <ReactSVG src="./images/cross.svg" />
              </button>
            )}
          </div>

          <DropdownMenu
            setDataForRequest={setDataForRequest}
            typeDropdown="date"
            setIsFiltered={setIsFiltered}
            isFiltered={isFiltered}
          />
        </div>
        <div className="table">
          {isError && 'Ошибка с загрузкой данных, попробуйте перезагрузить'}
          <div>
            <div>
              <GridHeader
                setDataForRequest={setDataForRequest}
                setIsFiltered={setIsFiltered}
                isFiltered={isFiltered}
              />
              {isLoading ? (
                <ReactSVG
                  className="loaderWrapper"
                  src="./images/loader.svg"
                  wrapper="div"
                />
              ) : (
                data?.map((elem: any, key: number, record: string) => (
                  <GridItem key={key} {...elem} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
