<script>
	import { onMount, onDestroy } from 'svelte';
    import { fetchDiary } from './../../../lib/helper/api.js';
    import { Spinner } from 'flowbite-svelte';
    import { UserId } from '$lib//store.js';
    import { Button } from 'flowbite-svelte'
    import StarRating from 'svelte-star-rating';
    import dayjs from 'dayjs';

    /** @type {import('./$types').PageData} */
    export let data;
    const diary_id = data.diary_id;

    let author_id = null;
    const unsubscribe = UserId.subscribe( id => author_id = id);

    let promise = fetchDiary();
    let rating = 1.0;
    onMount( async() => {
        promise = await fetchDiary(diary_id);
    });

    onDestroy( () => {
        unsubscribe();
    });
</script>

{#await promise}
    <p class="mt-10 flex justify-center"><Spinner color="gray" /></p>
{:then diary}
    <!-- なぜかifブロックで囲まないとStarRatingがエラーを吐く -->
    {#if diary}
        <div class="flex">
            <h1>{dayjs(diary.created_at).format("YYYY年MM月DD日")}</h1>
            <p class="rate"><StarRating rating= {diary.rate / 2 }/></p>
        </div>
        
        <p>{diary.title}</p>
        <hr class="mt-3 mb-3">
        <p>{diary.body}</p>

        {#if author_id === diary.author_id}
            <div class="mt-5">
                <Button on:click={() => document.location.href = `/edit/${diary_id}`}>編集</Button>
            </div>
        {/if}
    {/if}
{/await}

<style>
    .rate {
        margin-left: auto;
    }
</style>