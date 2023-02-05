<script>
	import { fetchDiaries } from './../../lib/helper/api.js';
    import { onMount, onDestroy } from 'svelte';
	import { UserId } from './../../lib/store.js';
    import StarRating from 'svelte-star-rating';

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

{#await promise}
    <p>Loading</p>
{:then diaries}
    {#each diaries as diary}
         <a href="/diary/{diary.id}" class="flex items-center">
            <aside>
                <p>{diary.created_at}</p>
                image
                <p><StarRating rating={diary.rate / 2 }/></p>
            </aside>
            <p>{diary.body}</p>
         </a>
    {/each}
{/await}