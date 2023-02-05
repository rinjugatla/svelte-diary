<script>
	import { fetchDiaries } from './../../lib/helper/api.js';
    import { onMount, onDestroy } from 'svelte';
	import { UserId } from './../../lib/store.js';

    let author_id = null;

    const unsubscribe = UserId.subscribe( id => author_id = id);

    let promise;
    onMount ( async () => {
        promise = await fetchDiaries(author_id);
        console.log(promise);
    });

    onDestroy( () => {
        unsubscribe();
    });
</script>

<main>
    <h1>home</h1>
</main>