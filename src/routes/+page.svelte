<script>
    import { Alert } from 'flowbite-svelte';
    let error = true;
</script>

<main>
    <h1>root</h1>

    <div class="p-8">
        <Alert>
            <span class="font-medium">Info alert!</span> Change a few things up and try submitting again.
        </Alert>
    </div>
    <div class="text-{ error ? 'red' : 'green' }-600">
    hoge
    </div>
</main>