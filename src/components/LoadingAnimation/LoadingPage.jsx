import useAuth from "../../hooks/useAuth";
import Loading from "./Loading";

export default function LoadingPage() {
  const { loading } = useAuth()
  if(loading) {
    return (<Loading />);
  }
  return;
}