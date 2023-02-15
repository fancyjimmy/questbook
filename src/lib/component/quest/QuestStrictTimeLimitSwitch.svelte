<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import ImageSwitch from "$lib/component/quest/ImageSwitch.svelte";

    const dispatch = createEventDispatcher();

    export let withEmpty = false;
    export let index = 0;
    export let questStrictTimeLimit = false;

    function forward(event) {
        dispatch('change', event.detail);
    }

</script>

<ImageSwitch on:change={forward}
             bind:value={questStrictTimeLimit}
             bind:index={index}
             options={[{value: true, label: 'true'}, {value: false, label: 'false'}]}
             name="questStrictTimeLimit"
             directory="/quest/boolean"
             {withEmpty}/>