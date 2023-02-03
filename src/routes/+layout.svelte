<script>
    import Header from '$lib/common/Header.svelte';
	import Footer from '$lib/common/Footer.svelte';
</script>

<Header />

<main>
    <slot />
</main>

<Footer />