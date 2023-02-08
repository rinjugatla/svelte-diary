<script>
    import { Range, Textarea, Label, Button } from "flowbite-svelte";

    export let rate = 0;
    export let title = "";
    export let body = "";
    export let image = "";
    export let preview;

    const onFileSelect = (e) => {
        let target = e.target.files[0];
        image = target;

        if (!image) {
            preview = null;
            return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(target);
        reader.onload = (e) => {
            preview = e.target.result;
        };
    };
</script>

<form on:submit class="p-5">
    <div>
        <p class="mb-4">今日の気分は {rate}点！</p>
        <Range id="rate" min="0" max="10" bind:value={rate} step="1" />
    </div>
    <div>
        <Label for="title-text" class="mb-4">タイトル</Label>
        <Textarea id="title-text" placeholder="" rows="1" bind:value={title} />
    </div>
    <div>
        <Label for="body-text" class="mb-4">内容</Label>
        <Textarea id="body-text" placeholder="" rows="10" bind:value={body} />
    </div>
    <div>
        <input
            class="mb-4"
            type="file"
            accept="image/*"
            bind:this={image}
            on:change={(e) => onFileSelect(e)}
        />
        {#if preview}
            <img src={preview} alt="image_preview" />
        {/if}
    </div>
    <Button type="submit">保存</Button>
</form>
