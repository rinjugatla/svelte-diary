import { doc, collection, addDoc, updateDoc, query, where, getDoc, getDocs, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import dayjs from 'dayjs'

export const postDiary = async (author_id = "", title = "", body = "", rate = 5) => {
    const docRef = await addDoc(collection(db, "diaries"), {
        author_id: author_id,
        title: title,
        body: body,
        rate: rate,
        image: "",
        created_at: dayjs().format("YYYY/MM/DD HH:mm:ss")
    });

    return docRef.id;
}

export const updateDiary = async (id = "", title = "", body = "", rate = 5) => {
    const washingtonRef = doc(db, "diaries", id);

    const docRef = await updateDoc(washingtonRef, {
        title: title,
        body: body,
        rate: rate
    });

    return true;
}

export const fetchDiaries = async (author_id = "") => {
    const q = query(collection(db, "diaries"), 
                    where("author_id", "==", author_id),
                    orderBy("created_at", "desc"));

    const querySnapshot = await getDocs(q);
    let diaries = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        diaries.push({
            id: doc.id,
            author_id: data.author_id,
            title: data.title,
            body: data.body,
            rate: data.rate,
            image: data.image,
            created_at: data.created_at
        });
    });

    return diaries;
};

export const fetchDiary = async (id = "hoge") => {
    const docRef = doc(db, "diaries", id);
    const docSnap = await getDoc(docRef);
    
    if(!docSnap.exists()){ return false; }
    return docSnap.data();
};