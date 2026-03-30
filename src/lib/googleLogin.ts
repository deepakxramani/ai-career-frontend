import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);

  const user = result.user;

  const idToken = await user.getIdToken();

  return {
    name: user.displayName,
    email: user.email,
    token: idToken,
  };
};
