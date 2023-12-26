import { FormEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { getUsers } from "../../api/get";
import { addUser, deleteUser } from "../../api/post";

const UsersList = () => {
  const [name, setName] = useState("");

  const {
    mutate: getUsersData,
    isLoading: getUsersLoading,
    data: usersData,
  } = useMutation({
    mutationFn: () => {
      return getUsers();
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  const { mutate: attemptDeleteUser } = useMutation({
    mutationFn: (userId: number) => {
      return deleteUser(userId);
    },
    onSuccess: () => {
      getUsersData();
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  useEffect(() => {
    getUsersData();
  }, []);

  const { mutate: attemptAddUser, isLoading: addUserLoading } = useMutation({
    mutationFn: () => {
      return addUser(name);
    },
    onSuccess: () => {
      getUsersData();
      setName("");
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!!!name) return;

    attemptAddUser();
  };

  const handleDeleteUser = (userId: number) => {
    attemptDeleteUser(userId);
  };

  if (getUsersLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="page-container">
      <form
        onSubmit={handleSubmit}
        className="flex items-center mb-3 h-[40px] gap-3"
      >
        <input
          className="w-full border p-2 rounded h-full"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e?.target?.value ?? "")}
          placeholder="New user..."
        />
        <button
          type="submit"
          className="text-nowrap min-w-[100px] capitalize bg-slate-500 h-full text-white rounded"
          disabled={addUserLoading}
        >
          {addUserLoading ? "..." : "add"}
        </button>
      </form>

      <div className="grid grid-cols-3 gap-3">
        {usersData?.data?.map((user: { id: number; name: string }) => {
          return (
            <div
              className="user-card flex items-center justify-between"
              key={user.id}
            >
              <p>{user.name}</p>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 h-[30px] w-[30px] rounded-full text-white"
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersList;
