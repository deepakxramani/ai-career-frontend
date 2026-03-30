export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;

  const userData = localStorage.getItem('userDetails');
  if (userData) {
    try {
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData?.token) {
        return parsedUserData.token;
      }
    } catch (error) {
      console.error('Error parsing token from storage:', error);
    }
  }

  return null;
};
