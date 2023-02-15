<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import ImageSwitch from "$lib/component/quest/ImageSwitch.svelte";

    const dispatch = createEventDispatcher();

    export let withEmpty = false;
    export let index = 0;
    export let questRetakeAble = false;

    function forward(event) {
        dispatch('change', event.detail);
    }

</script>

<ImageSwitch on:change={forward}
             bind:value={questRetakeAble}
             bind:index={index}
             options={[{value: true, label: 'true'}, {value: false, label: 'false'}]}
             name="questRetakeAble"
             directory="/quest/boolean"
             {withEmpty}/>