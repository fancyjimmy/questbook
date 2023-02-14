<script lang="ts">
    import {QUEST_VISIBILITY} from "../../constants";

    let QUEST_VISIBILITY_OPTIONS;

    export let withEmpty = false;
    if (withEmpty) {
        QUEST_VISIBILITY_OPTIONS = [...QUEST_VISIBILITY, ""];
    } else {
        QUEST_VISIBILITY_OPTIONS = [...QUEST_VISIBILITY];
    }

    export let index = 0;
    export let questVisibility: string = QUEST_VISIBILITY_OPTIONS[index];


    function incrementIndex() {
        index = (index + 1) % QUEST_VISIBILITY_OPTIONS.length;
        questVisibility = QUEST_VISIBILITY_OPTIONS[index];
    }
</script>

<button on:click|preventDefault={() => {incrementIndex()}}>
    <div class="aspect-square w-8 flex items-center justify-center">
        {#if QUEST_VISIBILITY_OPTIONS[index] !== ""}
            <img src="/quest/visibility/{QUEST_VISIBILITY_OPTIONS[index]}.png"
                 alt="{QUEST_VISIBILITY_OPTIONS[index]}">
        {/if}
    </div>

    <input type="hidden" name="questVisibility" value="{QUEST_VISIBILITY_OPTIONS[index]}">
</button>
