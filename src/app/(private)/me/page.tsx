import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Bạn chưa đăng nhập</div>;
  }

  return (
    <div>
      <h1>Thông tin người dùng</h1>
      <p>Tên: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      {/* <p>User ID: {session?.user?.id}</p> */}
      {/* <img src={session?.user?.picture} alt="User Avatar" /> */}
    </div>
  );
}
