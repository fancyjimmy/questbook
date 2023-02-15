<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import ImageSwitch from "$lib/component/quest/ImageSwitch.svelte";
    import {QUEST_TIMING} from "../../constants";

    const dispatch = createEventDispatcher();

    export let withEmpty = false;
    export let index = 0;
    export let questTiming;


    let questTimingOptions = QUEST_TIMING.map((timing) => {
        return {value: timing, label: timing}
    });

    function forward(event) {
        dispatch('change', event.detail);
    }

</script>

<ImageSwitch on:change={forward}
             bind:value={questTiming}
             bind:index={index}
             options={questTimingOptions}
             name="questTiming"
             directory="/quest/timing"
             {withEmpty}/>