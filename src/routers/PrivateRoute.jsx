import { Navigate } from 'react-router-dom';

import { useAuth } from '../context';

const PrivateRouter = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return children;
};

export default PrivateRouter;