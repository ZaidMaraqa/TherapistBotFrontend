import React, { ComponentType, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';

interface WithAuthProps {
  // You can extend this interface with additional props as needed
}

// This function takes a component and returns a new component
function withAuth<T extends WithAuthProps = WithAuthProps>(WrappedComponent: ComponentType<T>) {
  // The returned component
  const WithAuth: React.FC<T> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
      // Check authentication logic (e.g., check if a token exists)
      const token = Cookie.get('token'); // Assuming you store your token in cookies

      if (!token) {
        // If not authenticated, redirect to the login page
        router.push('/login');
      } else {
        setIsAuthenticated(true);
      }
    }, [router]);

    if (!isAuthenticated) {
      // Return nothing or a loader while checking for authentication
      return null;
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
}

export default withAuth;