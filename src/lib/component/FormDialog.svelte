<script lang="ts">

    import Dialog from "$lib/component/Dialog.svelte";

    export let action = "";
    export let method = "post";
    export let reset = true;

    let className = "";
    export {className as class};

    export let dialog;
</script>

<Dialog bind:this={dialog} class="{className || ''}">
    <form {action} {method} class="p-4">
        <slot/>

        <div class="grid grid-cols-2" class:grid-cols-3={reset}>
            <button on:click|preventDefault={dialog.closeDialog()} class="text-red-500 font-semibold text-lg">
                Close
            </button>

            {#if reset}
                <button type="reset" class="text-slate-500 font-semibold text-lg">
                    Reset
                </button>
            {/if}

            <button type="submit" class="text-sky-500 font-semibold text-lg">
                Submit
            </button>

        </div>
    </form>
</Dialog>

<style>
    form :global(input[type="text"]) {
        @apply rounded ring-2 ring-slate-500 p-1;
    }
    form :global(input[type="text"]):focus{
        @apply outline-none ring-2 ring-sky-500;
    }

    form {
        max-width: 80vw;
    }
</style>