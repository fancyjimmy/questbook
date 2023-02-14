<script lang="ts">
    import {QUEST_TIMING} from "../../constants";

    let QUEST_TIMING_OPTIONS;

    export let withEmpty = false;
    if (withEmpty) {
        QUEST_TIMING_OPTIONS = [...QUEST_TIMING, ""];
    } else {
        QUEST_TIMING_OPTIONS = [...QUEST_TIMING];
    }

    export let index = 0;
    export let timing: string = QUEST_TIMING_OPTIONS[index];


    function incrementIndex() {
        index = (index + 1) % QUEST_TIMING_OPTIONS.length;
        timing = QUEST_TIMING_OPTIONS[index];
    }
</script>

<button on:click|preventDefault={() => {incrementIndex()}}>
    <div class="aspect-square w-8 flex items-center justify-center">
        {#if QUEST_TIMING_OPTIONS[index] !== ""}
            <img src="/quest/timing/{QUEST_TIMING_OPTIONS[index]}.png"
                 alt="{QUEST_TIMING_OPTIONS[index]}">
        {/if}
    </div>

    <input type="hidden" name="questTiming" value="{QUEST_TIMING_OPTIONS[index]}">
</button>
