<script>
  import "../app.postcss";
  import Header from "$lib/common/Header.svelte";
  import Footer from "$lib/common/Footer.svelte";
</script>

<Header />

<main>
  <slot />
</main>

<Footer />

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 640px;
    margin: 0 auto;
    /* 100vhで画面の縦の長さ、 60px * 2はヘッダー、フッター高さ */
    min-height: calc( 100vh - 60px - 60px );
  }


</style>