import useAuthStore from "../store/useAuthStore";
import useChatStore from "../store/useChatStore";

const Users = () => {
  const { users, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="space-y-2 mt-4 max-h-screen overflow-y-auto">
      {users.map((user, index) => {
        const isSelectedUser = selectedUser?._id === user?._id;
        const isOnline = onlineUsers.includes(user?._id);
        return (
          <button
            onClick={() => setSelectedUser(user)}
            key={user._id}
            className={`sm:w-full flex gap-x-2 items-center ${
              !selectedUser ? "hover:bg-base-200" : ""
            } p-1 rounded-md transition-colors ${
              isSelectedUser ? "bg-primary text-primary-content" : ""
            }`}
          >
            <div
              className={`avatar placeholder size-10 ${
                isOnline ? "online" : " offline"
              }`}
            >
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  className="object-cover object-center rounded-full"
                />
              ) : (
                <div className="size-10 bg-primary rounded-full text-primary-content font-bold">
                  {user.fullName[0].toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-col items-start hidden sm:flex">
              <p>{user.fullName}</p>
              <p
                className={`text-sm  ${
                  isSelectedUser ? "text-base-primary" : "text-base-content"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default Users;
