import { useEffect, useState } from "react";
import userService, { User } from "../services/userService";
import { CanceledError } from "../services/apiClient";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const { request, cancel } = userService.getAllItems<User>();
    request
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return cancel;
  }, []);

  return { users, error, setUsers, setError };
};

export default useUsers;
