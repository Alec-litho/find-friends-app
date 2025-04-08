import { useMemo, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import SearchBar from "../../components/SearchBar/SearchBar";
import { UserCard } from "../../components/UserCard/UserCard";
import styles from "./UserList.module.scss";
import { User } from "../../types";

const UserList = () => {
  //хук для кеширования запросов
  const { data: users, isLoading, error } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const cities = ["Gwenborough", "Wisokyburgh", "McKenziehaven", "South Elvis", "Roscoeview", "South Christy", "Howemouth", "Aliyaview", "Bartholomebury", "Lebsackbury"];
  //если свойства users, searchTerm, filterCity не изменяются то при повторном рендеренги мы не пересчитываем результат фильтрации
  const filteredUsers = useMemo(() => {
    return users?.filter((user: User) => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = filterCity ? user.address.city === filterCity : true;
      return matchesSearch && matchesCity;
    });
  }, [users, searchTerm, filterCity]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} filterCity={filterCity} onFilterChange={setFilterCity} cities={cities} />

      <div className={styles.grid}>
        {filteredUsers?.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
