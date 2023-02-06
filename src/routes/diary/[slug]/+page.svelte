<script>
	import { onMount } from 'svelte';
    import { fetchDiary } from './../../../lib/helper/api.js';
    import { Spinner } from 'flowbite-svelte';
    import StarRating from 'svelte-star-rating';
    import dayjs from 'dayjs';

    /** @type {import('./$types').PageData} */
    export let data;
    const diary_id = data.diary_id;

    let promise = fetchDiary();
    let rating = 1.0;
    onMount( async() => {
        promise = await fetchDiary(diary_id);
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
        <hr>
        <p>{diary.body}</p>
    {/if}
{/await}

<style>
    .rate {
        margin-left: auto;
    }
</style>