<script lang="ts">
    import {QUEST_TYPES} from "../../constants";

    let QUEST_TYPE_OPTIONS;

    export let withEmpty = false;
    if (withEmpty) {
        QUEST_TYPE_OPTIONS = [...QUEST_TYPES, ""];
    } else {
        QUEST_TYPE_OPTIONS = [...QUEST_TYPES];
    }

    export let index = 0;
    export let visibility: string = QUEST_TYPE_OPTIONS[index];


    function incrementIndex() {
        index = (index + 1) % QUEST_TYPE_OPTIONS.length;
        visibility = QUEST_TYPE_OPTIONS[index];
    }
</script>

<button on:click|preventDefault={() => {incrementIndex()}}>
    <div class="aspect-square w-10 flex items-center justify-center">
        {#if QUEST_TYPE_OPTIONS[index] !== ""}
            <img src="/quest/type/{QUEST_TYPE_OPTIONS[index]}.png"
                 class="w-full"
                 alt="{QUEST_TYPE_OPTIONS[index]}">
        {/if}
    </div>

    <input type="hidden" name="questType" value="{QUEST_TYPE_OPTIONS[index]}">
</button>
