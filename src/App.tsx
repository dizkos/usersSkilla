import { useEffect } from 'react';
import GridItem from './components/GridRow';
import { useGetUserListMutation } from './store/listUsersApi';

function App() {
  const [getUserList, { data, isLoading, isError }] = useGetUserListMutation();

  useEffect(() => {
    getUserList({ dateStart: '2024-09-13', dateEnd: '2024-09-15' });
  }, [getUserList]);

  console.log(data);

  return (
    <div id="page">
      <div className="page-wrapper">
        <div className="table">
          {isError && 'Ошибка с загрузкой данных, попробуйте перезагрузить'}
          {isLoading
            ? 'Загрузка ...'
            : data?.map((elem: any, key: number) => (
                <GridItem key={key} {...elem} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
