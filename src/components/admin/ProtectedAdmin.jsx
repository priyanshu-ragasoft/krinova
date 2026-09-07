import { Navigate, useLocation } from 'react-router-dom';
import { isAdminAuthed } from '../../lib/adminAuth';

export default function ProtectedAdmin({ children }) {
  const location = useLocation();
  if (!isAdminAuthed()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
