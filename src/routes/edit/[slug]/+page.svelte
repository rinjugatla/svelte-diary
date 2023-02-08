<script>
    import Edit from "./../../../lib/diary/Edit.svelte";
    import { onMount, onDestroy } from "svelte";
    import { fetchDiary, updateDiary } from "./../../../lib/helper/api.js";
    import { Spinner } from "flowbite-svelte";
    import { UserId } from "$lib//store.js";
    import { Button } from "flowbite-svelte";
    import dayjs from "dayjs";

    /** @type {import('./$types').PageData} */
    export let data;
    const diary_id = data.diary_id;

    const body_min_length = 10;

    let rate = 5;
    let title = "";
    let body = "";
    let image = null;
    let author_id = null;
    const unsubscribe = UserId.subscribe((id) => (author_id = id));

    let promise = fetchDiary();
    let rating = 1.0;
    onMount(async () => {
        promise = await fetchDiary(author_id, diary_id);
        rate = promise.rate;
        title = promise.title;
        body = promise.body;
    });

    const submit = async (data) => {
        if (body.length < body_min_length) {
            alert("日記には10文字以上が必要です。");
            return false;
        }

        const result = await updateDiary(diary_id, title, body, rate, image);
        if (result) {
            document.location.href = `/diary/${diary_id}`;
        } else {
            alert("日記の保存に失敗しました。");
        }
    };

    onDestroy(() => {
        unsubscribe();
    });
</script>

<h3>日記を編集</h3>

{#await promise}
    <p class="mt-10 flex justify-center"><Spinner color="gray" /></p>
{:then diary}
    {#if diary.can_edit}
        <Edit on:submit={submit} bind:rate bind:title bind:body bind:image />
    {:else}
        <p>作者以外の日記の編集は許可されていません。</p>
    {/if}
{/await}
