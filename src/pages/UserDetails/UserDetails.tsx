import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styles from "./UserDetails.module.scss";
import { fetchUserById } from "../../api/users";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // кэширование данных
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id!),
    enabled: !!id, //предотвращение запроса при отсутствии id
  });

  const handleGoBack = () => navigate(-1);

  if (isLoading) return <div className={styles.detailContainer}>Loading...</div>;
  if (error) return <div className={styles.detailContainer}>Error: {error.message}</div>;
  if (!user) return <div className={styles.detailContainer}>User not found</div>;

  return (
    <div className={styles.detailContainer}>
      <button className={styles.backButton} onClick={handleGoBack}>
        Back to Users
      </button>

      <h2>{user.name}'s Profile</h2>

      <div className={styles.userInfo}>
        <div className={styles.infoGroup}>
          <h3>Contact Information</h3>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Website:</strong>
            <a href={`http://${user.website}`} target="_blank">
              {user.website}
            </a>
          </p>
        </div>

        <div className={styles.infoGroup}>
          <h3>Address</h3>
          <p>
            <strong>Street:</strong> {user.address.street}
          </p>
          <p>
            <strong>Suite:</strong> {user.address.suite}
          </p>
          <p>
            <strong>City:</strong> {user.address.city}
          </p>
          <p>
            <strong>Zipcode:</strong> {user.address.zipcode}
          </p>
          <p>
            <strong>Coordinates:</strong>
            {user.address.geo.lat}, {user.address.geo.lng}
          </p>
        </div>

        <div className={styles.infoGroup}>
          <h3>Company</h3>
          <p>
            <strong>Name:</strong> {user.company.name}
          </p>
          <p>
            <strong>Catchphrase:</strong> {user.company.catchPhrase}
          </p>
          <p>
            <strong>Business:</strong> {user.company.bs}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
