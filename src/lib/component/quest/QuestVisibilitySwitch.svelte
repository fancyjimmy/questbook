<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import ImageSwitch from "$lib/component/quest/ImageSwitch.svelte";
    import { QUEST_VISIBILITY} from "../../constants";

    const dispatch = createEventDispatcher();

    export let withEmpty = false;
    export let index = 0;
    export let questVisibility;

    let questVisibilityOptions = QUEST_VISIBILITY.map((timing) => {
        return {value: timing, label: timing}
    });

    function forward(event) {
        dispatch('change', event.detail);
    }

</script>

<ImageSwitch on:change={forward}
             bind:value={questVisibility}
             bind:index={index}
             options={questVisibilityOptions}
             name="questVisibility"
             directory="/quest/visibility"
             {withEmpty}/>