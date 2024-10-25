import { useNavigate } from "react-router-dom";

export default function HomePageWithoutLogin() {
  const navigate = useNavigate();
  return <button onClick={() => navigate("/login")}>Log In </button>;
}
