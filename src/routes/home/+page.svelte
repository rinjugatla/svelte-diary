<script>
	import { fetchDiaries } from './../../lib/helper/api.js';
    import { Spinner } from 'flowbite-svelte';
    import { onMount, onDestroy } from 'svelte';
	import { UserId } from './../../lib/store.js';
    import StarRating from 'svelte-star-rating';
    import dayjs from 'dayjs';

    let author_id = null;

    const unsubscribe = UserId.subscribe( id => author_id = id);

    let promise = fetchDiaries();
    onMount ( async () => {
        promise = await fetchDiaries(author_id);
        console.log(promise);
    });

    onDestroy( () => {
        unsubscribe();
    });
</script>

{#if author_id}
    {#await promise}
        <p class="mt-10 flex justify-center"><Spinner color="gray" /></p>
    {:then diaries}
        {#each diaries as diary}
            <a href="/diary/{diary.id}" class="flex items-center mb-6">
                <aside class="diary-aside">
                    <p class="text-left">{dayjs(diary.created_at).format("YY年MM月DD日")}</p>
                    <img class="diary-image" src="{diary.image.startsWith('http') ? diary.image : '/image/dummy.jpeg'}" alt="">
                    <p><StarRating rating={diary.rate / 2 }/></p>
                </aside>
                <p>{diary.body}</p>
            </a>
        {/each}
    {/await}
{:else}
     <p>ログインしてください</p>
{/if}


<style>
    .diary-aside {
        width: 40%;
        margin-right: 1rem;
    }

    .diary-image {
        width: 100%;
    }
</style>