<script>
	import { onMount } from 'svelte';
    import { fetchDiary } from './../../../lib/helper/api.js';
    /** @type {import('./$types').PageData} */
    export let data;
    const diary_id = data.diary_id;

    let diary;
    onMount( async() => {
        diary = await fetchDiary(diary_id)
        console.log(diary);
    });
</script>