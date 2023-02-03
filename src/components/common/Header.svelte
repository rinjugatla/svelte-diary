<script>
    import { assets } from "$app/paths";
    import { page } from "$app/stores";

    const MENUS = [
        {href: "/", title: "Root"},
        {href: "/home/", title: "Home"},
        {href: "/about/", title: "About"},
        {href: "/diary/", title: "Diary"},
        {href: "/create/", title: "Create"},
    ]
</script>

<header>
    <h1>ヘッダ</h1>
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
</header>

<style>
    .menu {

    }
    li {
        display: inline-block;
        list-style: none;
        background-color: lightpink;
        margin-left: 20px;
    }
</style>