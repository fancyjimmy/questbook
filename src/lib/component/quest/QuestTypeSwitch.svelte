<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import ImageSwitch from "$lib/component/quest/ImageSwitch.svelte";
    import {QUEST_TYPES} from "../../constants";

    const dispatch = createEventDispatcher();

    export let withEmpty = false;
    export let index = 0;
    export let questType;


    let questTypeOptions = QUEST_TYPES.map((timing) => {
        return {value: timing, label: timing}
    });

    function forward(event) {
        dispatch('change', event.detail);
    }

</script>

<ImageSwitch on:change={forward}
             bind:value={questType}
             bind:index={index}
             options={questTypeOptions}
             name="questType"
             directory="/quest/type"
             {withEmpty}/>