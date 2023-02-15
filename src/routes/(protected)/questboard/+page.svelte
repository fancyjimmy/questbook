<script lang="ts">
    import type {PageServerData} from "./$types";
    import Dialog from "$lib/component/Dialog.svelte";
    import FormDataInputs from "$lib/component/FormDataInputs.svelte";
    import {questFormDataAttributes} from "$lib/domain/formDataAttributes/QuestFormData.js";
    import QuestVisibilitySwitch from "$lib/component/quest/QuestVisibilitySwitch.svelte";
    import QuestRetakeableSwitch from "$lib/component/quest/QuestRetakeableSwitch.svelte";
    import QuestStrictTimeLimitSwitch from "$lib/component/quest/QuestStrictTimeLimitSwitch.svelte";
    import QuestTimingSwitch from "$lib/component/quest/QuestTimingSwitch.svelte";
    import QuestTypeSwitch from "$lib/component/quest/QuestTypeSwitch.svelte";


    export let data: PageServerData;

    let title = "QUESTBOARD"
    let dialog;
    export let form;



    let questVisibility: string;
    let strictTimeLimit;
    let retakeAble;
    let questTiming;



</script>

<div class="questboard m-4">
    <h1 class="text-6xl m-3 text-center text-amber-900">{title}</h1>

    <div class="filterbox w-full flex flex-row-reverse gap-3 items-center">
        <QuestRetakeableSwitch bind:retakeAble={retakeAble} withEmpty={true}/>
        <p>Retakeable</p>
        <QuestStrictTimeLimitSwitch bind:strictTimeLimit={strictTimeLimit} withEmpty={true}/>
        <p>Strict Time Limit</p>
        <QuestTimingSwitch bind:questTiming={questTiming}></QuestTimingSwitch>
        <p>Quest Timing</p>
        <QuestTypeSwitch bind:questType={questVisibility} withEmpty={true}/>
        <p>Type</p>
        <QuestVisibilitySwitch bind:questVisibility={questVisibility} withEmpty={true}/>
        <p>Visibility</p>
    </div>

    <div class="innerboard grid gap-3 my-8">
        {#each data.availableQuests as quest}
            <div class="card">{quest.name}</div>
        {/each}
    </div>


    <a href="/new/quest" class="cool-button">New Quest</a>


</div>


<Dialog bind:this={dialog} class="bg-transparent">
    <form action="?/createQuest" method="post" class="scroll w-[80vw] h-[80vh]">
        <FormDataInputs formDataAttributes={questFormDataAttributes}/>
        <div class="flex justify-between">
            <button on:click|preventDefault={() => {dialog.closeDialog()}} class="cool-button">Cancel</button>
            <button type="submit" class="cool-button">Submit</button>
        </div>
    </form>
</Dialog>

<style lang="postcss">


    .title-animation:hover > * {
        --title-animation-delay: calc(var(--i) * 0.05s);
        animation: reset-title-animation 1s ease-in-out;
        display: inline-block;
        animation-delay: var(--title-animation-delay);

        transition-delay: var(--title-animation-delay);
    }
</style>