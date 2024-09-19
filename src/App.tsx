import { useEffect, useState } from 'react';
import GridItem from './components/GridRow';
import { useGetUserListMutation } from './store/listUsersApi';
import GridHeader from './components/GridHeader';
import DropdownMenu from './components/DropdownMenu';
import { getListFromDataProps } from './interfaces/types';

function App() {
  const [getUserList, { data, isLoading, isError }] = useGetUserListMutation();

  const [dataForRequest, setDataForRequest] = useState<getListFromDataProps>({
    dateStart: '2024-09-13',
    dateEnd: '2024-09-15',
  });

  useEffect(() => {
    getUserList(dataForRequest);
  }, [getUserList, dataForRequest]);

  console.log(data)
  return (
    <div id="page">
      <div className="page-wrapper">
        <div className="page-filters">
          <DropdownMenu
            setDataForRequest={setDataForRequest}
            typeDropdown="typeCalling"
          />
          <DropdownMenu
            setDataForRequest={setDataForRequest}
            typeDropdown="date"
          />
        </div>
        <div className="table">
          {isError && 'Ошибка с загрузкой данных, попробуйте перезагрузить'}
          {isLoading ? (
            'Загрузка ...'
          ) : (
            <div>
              <div>
                <GridHeader setDataForRequest={setDataForRequest} />
                {data?.map((elem: any, key: number, record: string) => (
                  <GridItem key={key} {...elem} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
