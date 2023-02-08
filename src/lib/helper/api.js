import { doc, collection, addDoc, updateDoc, query, where, getDoc, getDocs, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import dayjs from 'dayjs'

// image: BLOB -> image url
const uploadImage = async (image = null) => {
    if (!image) { return null; }

    let imageUrl = null;
    const ext = image.name.split(".").pop();
    const hashName = Math.random().toString(36).slice(-8);
    const filename = `${hashName}.${ext}`
    console.log(filename);

    const storageRef = ref(storage);
    const uploadRef = ref(storageRef, `/images/${filename}`);
    await uploadBytes(uploadRef, image).then(async (result) => {
        // 表示用のURLの取得
        await getDownloadURL(uploadRef).then((url) => {
            imageUrl = url;
            console.log(`url: ${url}`);
        });
    });

    return imageUrl;
}

export const postDiary = async (author_id = "", title = "", body = "", rate = 5, image = null) => {
    let uploadedImageUrl = await uploadImage(image);

    const docRef = await addDoc(collection(db, "diaries"), {
        author_id: author_id,
        title: title,
        body: body,
        rate: rate,
        image: uploadedImageUrl,
        created_at: dayjs().format("YYYY/MM/DD HH:mm:ss")
    });

    return docRef.id;
}

export const updateDiary = async (id = "", title = "", body = "", rate = 5, image = null) => {
    const diaryRef = doc(db, "diaries", id);
    if (!diaryRef) { return false; }

    let uploadedImageUrl = await uploadImage(image);
    const docRef = await updateDoc(diaryRef, {
        title: title,
        body: body,
        rate: rate,
        image: uploadedImageUrl
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

export const fetchDiary = async (author_id = "", id = "hoge") => {
    const docRef = doc(db, "diaries", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) { return false; }

    const data = docSnap.data();
    const result = {
        id: data.id,
        can_edit: data.author_id === author_id,
        // 例えばここでauthor_idを返すとブラウザの通信ログでidが見える？
        // author_id: author_id,
        title: data.title,
        body: data.body,
        rate: data.rate,
        image: data.image,
        created_at: data.created_at
    };

    return result;
};