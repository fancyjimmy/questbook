<script lang="ts">
    import {QUEST_VISIBILITY} from "../../constants";

    let QUEST_RETAKEABLE_OPTIONS;

    export let withEmpty = false;
    if (withEmpty) {
        QUEST_RETAKEABLE_OPTIONS = [true, false, ""];
    } else {
        QUEST_RETAKEABLE_OPTIONS = [true, false];
    }

    export let index = 0;
    export let retakeAble: string = QUEST_RETAKEABLE_OPTIONS[index];


    function incrementIndex() {
        index = (index + 1) % QUEST_RETAKEABLE_OPTIONS.length;
        retakeAble = QUEST_RETAKEABLE_OPTIONS[index];
    }
</script>

<button on:click|preventDefault={() => {incrementIndex()}}>
    <div class="aspect-square w-8 flex items-center justify-center">
        {#if QUEST_RETAKEABLE_OPTIONS[index] !== ""}
            <img src="/quest/boolean/{QUEST_RETAKEABLE_OPTIONS[index]}.png"
                 alt="{QUEST_RETAKEABLE_OPTIONS[index]}">
        {/if}
    </div>

    <input type="hidden" name="retakeAble" value="{QUEST_RETAKEABLE_OPTIONS[index]}">
</button>
