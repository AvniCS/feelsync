import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';


const EXPENSES = 'expenses';


export async function getExpenses(){
const snap = await getDocs(collection(db, EXPENSES));
return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
export async function addExpense(payload){
const r = await addDoc(collection(db, EXPENSES), payload);
return { id: r.id, ...payload };
}
export async function deleteExpense(id){
await deleteDoc(doc(db, EXPENSES, id));
}
export async function getSummary(){
const xs = await getExpenses();
const total = xs.reduce((s,x)=>s + Number(x.amount || 0), 0);
const byCategory = xs.reduce((acc,x)=>{ acc[x.category] = (acc[x.category]||0)+Number(x.amount||0); return acc; }, {});
return { total, byCategory };
}