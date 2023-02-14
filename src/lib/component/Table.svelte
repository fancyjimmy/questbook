<script lang="ts">
    import Dialog from '$lib/component/Dialog.svelte';

    export let attributes: string[] = [];
    export let values: any[] = [];
    export let name = '';
    export let sorting = false;
    export let id = '';

    export let excluded: string[] = [];
    export let showSelection = true;

    let attributeSelectionDialog;
    $: selectedAttributes = attributes.filter((value: string) => !excluded.includes(value));

    function openSelectAttributeDialog() {
        attributeSelectionDialog.openDialog();
    }


    function closeSelectionDialog() {
        attributeSelectionDialog.closeDialog();
    }

    function toggleAttribute(attribute: string) {
        if (excluded.includes(attribute)) {
            excluded = excluded.filter((value) => value != attribute);
        } else {
            excluded = [...excluded, attribute];
        }
    }

    function toString(value): string {
        if (value === undefined || value === null) {
            return "";
        }
        if (value instanceof Date) {
            return value.toLocaleDateString();
        } else if (value instanceof Array){
            return value.map((v) => toString(v)).join(", ");
        } else if (typeof value === "object") {
            return JSON.stringify(value);
        } else {
            return value;
        }

    }
</script>

<div class="relative">
    <div class="absolute top-2 right-2">
        {#if showSelection}
            <button on:click|preventDefault={openSelectAttributeDialog}>⚙️</button>
        {/if}
    </div>

    <div class="overflow-x-auto rounded-lg shadow-xl">
        <table class="table-fixed border-collapse bg-main-500 min-w-full p-2">
            <thead class="bg-main-700 text-white">
            <tr>
                {#each selectedAttributes as key}
                    <th class="p-2">{key}</th>
                {/each}
            </tr>
            </thead>
            <tbody>
            {#each values as obj, i}
                <tr class:even={i % 2 === 0}>
                    {#each selectedAttributes as key}
                        <td class="p-2">{toString(obj[key])}</td>
                    {/each}
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>

<Dialog bind:this={attributeSelectionDialog} class="rounded-xl">
    <div class="flex flex-col items-center">
        <h3 class="text-2xl mx-auto text-black mb-2">Attributes</h3>
        <div class="grid grid-cols-3 gap-2">
            {#each attributes as attribute}
                <button
                        class:active={!excluded.includes(attribute)}
                        class:inactive={excluded.includes(attribute)}
                        class="rounded p-2 duration-100"
                        on:click|preventDefault={toggleAttribute(attribute)}>{attribute}</button
                >
            {/each}
        </div>
        <button
                on:click|preventDefault={closeSelectionDialog}
                class="text-xl text-gray-500 mt-2 font-semibold"
        >Close
        </button>
    </div>
</Dialog>

<style>
    .active {
        @apply bg-emerald-400;
    }

    .inactive {
        @apply bg-gray-300;
    }
    .even {
        @apply bg-main-600;
    }
</style>
