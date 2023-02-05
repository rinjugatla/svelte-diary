<script>
    import "../../app.postcss";
    import { assets } from "$app/paths";
    
    import { Hamburger } from 'svelte-hamburgers';
	import Menu from './Menu.svelte';
    import HumidityAlt from "carbon-icons-svelte/lib/HumidityAlt.svelte";

    let open;
</script>

<header>
    <div class="bg-primiry-900 flex justify-between items-center">
        <Hamburger bind:open />
        <img src="/image/logo.png" alt="logo" />
        <HumidityAlt size={24} class="mr-6"/>
    </div>
    <Menu bind:open/>
</header>

<style>
    div {
        height: 60px;
        text-align: center;
        max-width: 640px;
        margin: 0 auto;
        background: gray;
    }
    img {
        max-height: 100%;
    }
</style>