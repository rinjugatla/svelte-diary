<script>
    import { Range } from 'flowbite-svelte'
    import { Textarea, Label } from 'flowbite-svelte'
    import { Button } from 'flowbite-svelte';

    let rate = 5;
    let body = "";
</script>

<h3>日記を作成</h3>
<form class="p-5">
    <div>
        <p class="mb-4">今日の気分は {rate}点！</p>
        <Range id="rate" min="0" max="10" bind:value={rate} step="1"/>
    </div>
    <div>
        <Label for="body-text" class="mb-4">内容</Label>
        <Textarea id="body-text" placeholder="" rows="10" bind:value={body}/>
    </div>
    <Button>保存</Button>
</form>

<p>CreateDiary</p>
