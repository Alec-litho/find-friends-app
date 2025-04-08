import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserCard.module.scss';

interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
}
//если передоваемый обьект не изменился, то компонент не рендерится повторно
export const UserCard = React.memo(({ user }:{user:User}) => {
  return (
    <Link to={`/users/${user.id}`} className={styles.card}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p className={styles.city}>{user.address.city}</p>
    </Link>
  );
});