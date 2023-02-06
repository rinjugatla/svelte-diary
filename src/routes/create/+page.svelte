<script>
	import { UserId } from './../../lib/store.js';
	import { postDiary } from './../../lib/helper/api.js';
	import { onDestroy } from 'svelte';
    import { Range, Textarea, Label, Button } from 'flowbite-svelte'

    const body_min_length = 10;

    let rate = 5;
    let body = "";
    let author_id = null;

    const unsubscribe = UserId.subscribe( id => author_id = id);
    const submit = async () => {
        if(body.length < body_min_length){
            alert("日記には10文字以上が必要です。");
            return false;
        }

        const result = await postDiary(author_id, title, body, rate);
        if(result){
            alert("日記を保存しました。");
            document.location.href = "/";
        }else{
            alert("日記の保存に失敗しました。");
        }
    }

    onDestroy( () => {
        unsubscribe();
    });
</script>

<h3>日記を作成</h3>
<form on:submit|preventDefault={submit} class="p-5">
    <div>
        <p class="mb-4">今日の気分は {rate}点！</p>
        <Range id="rate" min="0" max="10" bind:value={rate} step="1"/>
    </div>
    <div>
        <Label for="title-text" class="mb-4">タイトル</Label>
        <Textarea id="title-text" placeholder="" rows="1" bind:value={body}/>
    </div>
    <div>
        <Label for="body-text" class="mb-4">内容</Label>
        <Textarea id="body-text" placeholder="" rows="10" bind:value={body}/>
    </div>
    <Button type="submit">保存</Button>
</form>