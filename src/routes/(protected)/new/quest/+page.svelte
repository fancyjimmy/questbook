<script lang="ts">
    import Dialog from '$lib/component/Dialog.svelte';
    import {blurOnEnter} from '$lib/use/effect';
    import QuestVisibilitySwitch from '$lib/component/quest/QuestVisibilitySwitch.svelte';
    import QuestTypeSwitch from '$lib/component/quest/QuestTypeSwitch.svelte';
    import QuestTimingSwitch from '$lib/component/quest/QuestTimingSwitch.svelte';
    import QuestStrictTimeLimitSwitch from '$lib/component/quest/QuestStrictTimeLimitSwitch.svelte';
    import QuestRetakeableSwitch from '$lib/component/quest/QuestRetakeableSwitch.svelte';

    let quest = {
        name: '',
        description: ''
    };

    let taskDialog;

    type Task = {
        name: string;
        description?: string;
    };

    let newTask: Task = {
        name: '',
        description: ''
    };

    let taskList: Task[] = [];

    function addTask() {
        taskList = [...taskList, {...newTask}];
        newTask = {
            name: '',
            description: ''
        };

        console.log(taskList);

        taskDialog.close();
    }

    let retakeAble;
    let strictTimeLimit;
    let questTiming;
    let questVisibility;
    let questType;

    function onQuestTimingChange(value) {
        console.log(value);
    }

    function onQuestTypeChange(value) {
        console.log(value);

    }

    function onQuestVisibilityChange(value) {
        console.log(value);

    }

    function onStrictTimeLimitChange(value) {
        console.log(value);
    }

    function onRetakeAbleChange(value) {
        console.log(value);
    }


    let questTimingDialog;
</script>

<div class="xl:h-full lg:h-full grid grid-cols-1 p-5 lg:grid-cols-2 xl:grid-cols-2">
    <div class="book-left flex flex-col">
        <h1 class="font-thick text-6xl text-amber-900">Quest</h1>
        <div class="flex gap-3 items-center">
            <h2 class="font-thick text-amber-900 align-middle inline-block text-3xl">Name:</h2>
            <p
                    use:blurOnEnter
                    bind:innerHTML={quest.name}
                    contenteditable="true"
                    class="text-3xl"
                    placeholder={quest.name == '' ? 'Name' : undefined}
                    spellcheck="false"
            />
        </div>
        <div class=" grid gap-1 items-center align-middle">
            <div class="flex justify-between">
                <h2 class="font-thick text-amber-900 align-middle inline-block text-3xl">Retakeable</h2>
                <QuestRetakeableSwitch bind:retakeAble withEmpty={false} on:change={onRetakeAbleChange}/>
            </div>
            <div class="flex justify-between">
                <h2 class="font-thick text-amber-900 align-middle  text-3xl">Strict Time Limit</h2>
                <QuestStrictTimeLimitSwitch bind:strictTimeLimit withEmpty={false} on:change={onStrictTimeLimitChange}/>
            </div>
            <div class="flex justify-between">
                <h2 class="font-thick text-amber-900 align-middle inline-block text-3xl">Quest Timing</h2>
                {#if questTiming === "date"}
                    <input type="date"/>
                {:else if questTiming === "time"}
                    <div class="flex flex-1 gap-2 h-full justify-between px-3">
                        <input class="p-1 noOutline border-none rounded shadow w-[20%] h-full" type="number" placeholder="months">
                        <input class="p-1 noOutline border-none rounded shadow w-[20%] h-full" type="number" placeholder="days">
                        <input class="p-1 noOutline border-none rounded shadow w-[20%] h-full" type="number" placeholder="hours">
                        <input class="p-1 noOutline border-none rounded shadow w-[20%] h-full" type="number" placeholder="minutes">
                    </div>
                {/if}
                <QuestTimingSwitch bind:questTiming withEmpty={false} on:change={onQuestTimingChange}/>
            </div>
            <div class="flex justify-between">
                <h2 class="font-thick text-amber-900 align-middle inline-block text-3xl">Type</h2>
                <QuestTypeSwitch bind:questType withEmpty={false} on:change={onQuestTypeChange}/>
            </div>
            <div class="flex justify-between">
                <h2 class="font-thick text-amber-900 align-middle inline-block text-3xl">Visibility</h2>
                <QuestVisibilitySwitch bind:questVisibility withEmpty={false} on:change={onQuestVisibilityChange}/>
            </div>
        </div>
        <div class="flex-1 flex flex-col">
            <h2 class="font-thick text-amber-900 align-middle inline-block text-3xl my-2">Description:</h2>
            <textarea
                    bind:value={quest.description}
                    placeholder="Description"
                    spellcheck="false"
                    style="--scroll-bar-color-primary: #ffde84; --scroll-bar-color-secondary: #ffc029;"
                    maxlength="700"
                    class="h-full flex-1 resize-none w-full rounded shadow-md bg-amber-200 p-2 noOutline min-h-[300px]"
            />
        </div>
    </div>
    <div class="book-right flex flex-col">
        <div class="flex items-center">
            <h1 class="font-thick text-6xl text-amber-900 flex-1">Tasks</h1>
            <button
                    class="text-3xl font-thick text-amber-900"
                    on:click|preventDefault={() => {
					taskDialog.open();
				}}
            >+
            </button>
        </div>
        <div class="flex-1 overflow-y-auto overflow-x-hidden gap-2 flex flex-col">
            {#each taskList as task}
                <div class="flex flex-col shadow rounded card">
                    <h1 class="font-thick">{task.name}</h1>
                    <p>
                        {#if task.description}
                            {task.description}
                        {:else}
                            <span class="italic text-gray-500">No Description</span>
                        {/if}
                    </p>
                </div>
            {/each}
        </div>
        <button
                on:click|preventDefault={() => {
				taskDialog.open();
			}}
                class="font-thick cool-button"
        >Submit
        </button>
    </div>
</div>

<Dialog bind:this={questTimingDialog}>

</Dialog>

<Dialog bind:this={taskDialog} class="extruded relative w-[80vw] max-w-[800px]">
    <h2 class="font-thickest mb-5">New Task</h2>
    <div class="flex flex-row mb-3 gap-3 items-center">
        <p class="italic font-thick text-gray-800">Name:</p>
        <input
                bind:value={newTask.name}
                type="text"
                class="noOutline flex-1"
                placeholder="Name"
                required
        />
    </div>
    <div class="flex">
		<textarea
                bind:value={newTask.description}
                contenteditable="true"
                placeholder="New Task"
                rows="5"
                class="h-auto flex-1 resize-none mr-2"
                required
        />
        <button on:click={addTask} class="cool-button">Add Task</button>
    </div>
</Dialog>

<style>
    .book-right {
        border-image: url('/border/border-book-right.png') 15 fill repeat;
        border-width: 72px;
    }

    .book-left {
        border-image: url('/border/border-book-left.png') 15 fill repeat;
        border-width: 72px;
    }

    .noOutline:focus {
        outline: 0px solid transparent;
    }

    [contenteditable='true']:focus {
        outline: 0px solid transparent;
    }

    .description::placeholder {
        @apply text-gray-500;
    }

    [contenteditable='true']::before {
        content: attr(placeholder);
        display: block;
        font-style: italic;
        color: #aaa;
    }
</style>
