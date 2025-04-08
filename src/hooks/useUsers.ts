import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/users';

export const useUsers = () => {
  //при повторном вызове хука в других компонентах не делает новый запрос если данные актуальны
  //если данные не используются ни одним компонентом больше 5 минут, они удаляются из кэша
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 минут кеширования
  });
};