<script>
    let dialog;

    let className;

    export {className as class};

    export function open() {
        dialog.showModal();
    }

    export function close(){
        dialog.close();
    }
</script>

<dialog bind:this={dialog} class="{className || ''}">
    <slot/>

    <slot name="closeButton">
        <button on:click|preventDefault={close}>Close</button>
    </slot>
</dialog>


<style>
    textarea {
        @apply resize-none;
    }


    dialog::backdrop {
        @apply backdrop-blur;
    }

    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    input[type="color"]::-webkit-color-swatch {
        border: none;
    }
</style>