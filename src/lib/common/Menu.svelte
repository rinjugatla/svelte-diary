<script>
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
</script>

{#if open}
    <nav class="menu" on:click={() => open = false}>
        {#each MENUS as menu}
            {#if $page.url.pathname === menu.href}
                <strong class="block">{menu.title}</strong>
            {:else}
                <a class="block" href={menu.href}>{menu.title}</a>
            {/if}
        {/each}
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