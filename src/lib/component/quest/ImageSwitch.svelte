<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();


    type Option = {
        value: any,
        label: string
    }
    export let withEmpty = false;
    export let index = 0;
    export let options: Option[];
    export let name = '';

    if (options.length === 0) {
        throw new Error('Options must not be empty');
    }

    if (withEmpty) {
        options = [...options, {value: '', label: ''}];
    }
    export let value = options[index];


    export let emptyImage: string | null = "/quest/empty.png";
    export let directory: string | null = null;

    function incrementIndex() {
        index = (index + 1) % options.length;
        value = options[index];
        dispatch('change', value);
    }
</script>

<button on:click|preventDefault={incrementIndex}>
    <div class="aspect-square w-10 flex items-center justify-center">
        {#if !(options[index].value === '' && options[index].label === '')}
            <img src="{directory}/{options[index].label}.png"
                 alt="{options[index].label}"
                 class="w-full">
        {:else if emptyImage}
            <img src="{emptyImage}"
                 alt="Empty"
                 class="w-full">
        {/if}
    </div>

    <input type="hidden" {name} value="{options[index]}">
</button>