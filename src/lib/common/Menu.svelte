<script>
    import { onDestroy } from "svelte";
	import { UserId } from './../store.js';
	import { signInWithGoogle, signOutWithGoogle } from './../helper/firebase.js';
    import { fly, scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    import { page } from "$app/stores";

    const MENUS = [
        {href: "/", title: "Root"},
        {href: "/home/", title: "Home"},
        {href: "/about/", title: "About"},
        {href: "/diary/", title: "Diary"},
        {href: "/create/", title: "Create"},
    ]

    export let open;
    let uid;

    const unsubscribe = UserId.subscribe(id => { uid = id; });
    onDestroy (() => { unsubscribe(); });
</script>

{#if open}
    <nav class="menu" transition:fly={{ y: -15, delay: 50 * MENUS.length }} on:click={() => open = false}>
        {#each MENUS as menu, i}
            {#if $page.url.pathname === menu.href}
                <strong class="block" transition:fly={{ y: -15, delay: 50 * i }}>{menu.title}</strong>
            {:else}
                <a class="block" transition:fly={{ y: -15, delay: 50 * i }} href={menu.href}>{menu.title}</a>
            {/if}
        {/each}

        {#if uid}
             <a class="block" href="#" transition:fly={{ y: -15, delay: 50 * MENUS.length }} on:click={signOutWithGoogle}>Logout</a>
        {:else}
             <a class="block" href="#" transition:fly={{ y: -15, delay: 50 * MENUS.length }} on:click={signInWithGoogle}>Login</a>
        {/if}
    </nav>

    <div class="bar" transition:scale={{ duration: 750, easing: quadOut, opacity: 1 }} />
{/if}

<style>
    .menu {
        text-align: center;
        font-size: 1.5em;
        letter-spacing: 0.15em;
        padding-top: 0;
        max-width: 640px;
        color: #eef;
        margin: auto;
        display: block;
        background: gray;
    }
    a {
        cursor: pointer;
        width: max-content;
        margin: 1rem auto;
    }
    a:hover {
        text-decoration: underline;
    }
    .bar {
        border-style: solid;
        border-color: white;
        border-width: 1px;
        height: 0;
    }
</style>