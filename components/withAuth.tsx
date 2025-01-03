// components/withAuth.tsx

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../contexts/AuthContext';

interface WithAuthProps {
  allowedRoles: string[];
}

const withAuth = (WrappedComponent: React.ComponentType, allowedRoles: string[]) => {
  const ComponentWithAuth = (props: any) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/login');
      } else if (!allowedRoles.includes(user.role)) {
        router.push('/unauthorized'); // Optional: Create an unauthorized page
      }
    }, [user, router]);

    if (!user || !allowedRoles.includes(user.role)) {
      return null; // Or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
