import { db } from "@/firebase";
import { Transactions } from "@/types/transaction";
import { addDoc, collection, getDocs } from "firebase/firestore";

const transactionRef = collection(db, "transactions")

export const createTransaction = async (transaction: Transactions) => {
    const docRef =  await addDoc(transactionRef, transaction)
    return docRef.id
}

export const getRecentTransactions = async () => {
    const querySnapshot = await getDocs(collection(db, "transactions"));
    return querySnapshot.docs.map((doc) => doc.data());
}