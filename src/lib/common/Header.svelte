<script>
    import "../../app.postcss";
    import { assets } from "$app/paths";
    import { page } from "$app/stores";
    import { Hamburger } from 'svelte-hamburgers';
    import { fly, scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    import HumidityAlt from "carbon-icons-svelte/lib/HumidityAlt.svelte";

    const MENUS = [
        {href: "/", title: "Root"},
        {href: "/home/", title: "Home"},
        {href: "/about/", title: "About"},
        {href: "/diary/", title: "Diary"},
        {href: "/create/", title: "Create"},
    ]

    let open;
</script>

<header class="bg-primiry-900 flex justify-between items-center">
    <Hamburger bind:open />
    <img src="/image/logo.png" alt="logo" />
    {#if open}
        <nav class="menu">
            <ul>
            {#each MENUS as menu}
                <li>
                    {#if $page.url.pathname === menu.href}
                        <strong>{menu.title}</strong>
                    {:else}
                        <a href={menu.href}>{menu.title}</a>
                    {/if}
                </li>
            {/each}
            </ul>
        </nav>
    {/if}
    <HumidityAlt size={24} class="mr-6"/>
</header>

<style>
    header {
        height: 60px;
        text-align: center;
        max-width: 640px;
        margin: 0 auto;
        background: gray;
    }
    img {
        max-height: 100%;
    }
    /* li {
        display: inline-block;
        list-style: none;
        background-color: lightpink;
        margin-left: 20px;
    } */
    .bar {
        border-style: solid;
        border-color: black;
        border-width: 1px;
        height: 0;
    }
</style>