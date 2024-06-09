import { auth } from '../firebase';

const register = async (email, password) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const login = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};

export { register, login, logout };
