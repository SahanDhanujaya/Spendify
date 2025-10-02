import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { User } from "../types/user";

export const register = (user: User): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, user.email, user.password || "");
};

export const login = (user: User): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, user.email, user.password || "");
};

export const logout = (): Promise<void> => {
  return signOut(auth);
};

export const saveUser = async (user: User) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
      address: data.address,
      occupation: data.occupation,
      monthlyIncome: data.monthlyIncome,
      avatar: data.avatar,
    };
  });
};

const userDocRef = collection(db, "users");
export const getUsers = async () => {
  const docRef = await getDocs(userDocRef);
  return docRef.docs.map((doc) => doc.data());
};

export const updateUser = async (id: string, user: Partial<User>) => {
  const docRef = doc(db, "users", id);
  await updateDoc(docRef, user);
  return id;
};
