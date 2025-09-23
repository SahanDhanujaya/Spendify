import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { User } from "../types/user";
import { auth } from "@/firebase";

export const register = (user: User): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, user.email, user.password);
};

export const login = (user: User): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, user.email, user.password);
};

export const logout = (): Promise<void> => {
  return signOut(auth);
};
