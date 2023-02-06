<script>
	import Edit from './../../lib/diary/Edit.svelte';
	import { UserId } from './../../lib/store.js';
	import { postDiary } from './../../lib/helper/api.js';
	import { onDestroy } from 'svelte';

    const body_min_length = 10;

    let rate = 5;
    let title = "";
    let body = "";
    let author_id = null;

    const unsubscribe = UserId.subscribe( id => author_id = id);
    const submit = async (data) => {
        console.log(data);
        if(body.length < body_min_length){
            alert("日記には10文字以上が必要です。");
            return false;
        }

        const diary_id = await postDiary(author_id, title, body, rate);
        const isSuccess = diary_id != null;
        if(isSuccess){
            document.location.href = `/diary/${diary_id}`;
        }else{
            alert("日記の保存に失敗しました。");
        }
    }

    onDestroy( () => {
        unsubscribe();
    });
</script>

<h3>日記を作成</h3>
<Edit on:submit={submit} bind:rate={rate} bind:title={title} bind:body={body}/>