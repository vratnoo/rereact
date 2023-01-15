import { Navigate } from "react-router-dom";
const Protected = ({ auth, children }) => {
  if (!auth) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;
