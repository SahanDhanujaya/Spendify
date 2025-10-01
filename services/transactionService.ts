import { db } from "@/firebase";
import { Transactions } from "@/types/transaction";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

const transactionRef = collection(db, "transactions")

export const createTransaction = async (transaction: Transactions) => {
    const docRef = await addDoc(transactionRef, transaction)
    return docRef.id
}

export const getRecentTransactions = async () => {
    const querySnapshot = await getDocs(collection(db, "transactions"));
    return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            title: data.title,
            category: data.category,
            amount: data.amount,
            date: data.date,
            type: data.type,
            description: data.description
        };
    });
}

export const updateTransaction = async (id: string, transaction: Partial<Transactions>) => {
    const docRef = doc(db, "transactions", id);
    await updateDoc(docRef, transaction);
    return id;
}

export const deleteTransaction = async (id: string) => {
    const docRef = doc(db, "transactions", id);
    await deleteDoc(docRef);
    return id;
}