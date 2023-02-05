import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import dayjs from 'dayjs'

export const postDiary = async (author_id = "", body = "", rate = 5) => {
    const docRef = await addDoc(collection(db, "diaries"), {
        author_id: author_id,
        body: body,
        rate: rate,
        image: "",
        created_at: dayjs().format("YYYY/MM/DD HH:mm:ss")
    });
    
    const isSuccess = docRef.id != null;
    return isSuccess;
}
