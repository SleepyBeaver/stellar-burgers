import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice'; // Импортируйте экшен

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders: TOrder[] = useAppSelector((state) => state.feed.orders);

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleRefreshFeeds = () => {
    dispatch(fetchFeeds()); // Повторный запрос к API
  };

  return <FeedUI orders={orders} handleGetFeeds={handleRefreshFeeds} />;
};
