<script lang="ts">
    import {QUEST_VISIBILITY} from "../../constants";

    let QUEST_STRICTTIMELIMIT_OPTIONS;

    export let withEmpty = false;
    if (withEmpty) {
        QUEST_STRICTTIMELIMIT_OPTIONS = [true, false, ""];
    } else {
        QUEST_STRICTTIMELIMIT_OPTIONS = [true, false];
    }

    export let index = 0;
    export let strictTimeLimit: boolean = QUEST_STRICTTIMELIMIT_OPTIONS[index];


    function incrementIndex() {
        index = (index + 1) % QUEST_STRICTTIMELIMIT_OPTIONS.length;
        strictTimeLimit = QUEST_STRICTTIMELIMIT_OPTIONS[index];
    }
</script>

<button on:click|preventDefault={() => {incrementIndex()}}>
    <div class="aspect-square w-10 flex items-center justify-center">
        {#if QUEST_STRICTTIMELIMIT_OPTIONS[index] !== ""}
            <img src="/quest/boolean/{QUEST_STRICTTIMELIMIT_OPTIONS[index]}.png"
                 alt="{QUEST_STRICTTIMELIMIT_OPTIONS[index]}"
            class="w-full">
        {/if}
    </div>

    <input type="hidden" name="strictTimeLimit" value="{QUEST_STRICTTIMELIMIT_OPTIONS[index]}">
</button>
