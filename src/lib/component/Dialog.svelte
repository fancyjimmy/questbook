<script>
    let dialog;

    let className;

    export {className as class};

    export function openDialog() {
        dialog.showModal();
    }

    export function closeDialog(){
        dialog.close();
    }
</script>

<dialog bind:this={dialog} class="{className || ''}">
    <slot></slot>
</dialog>


<style>
    textarea {
        @apply resize-none;
    }


    dialog::backdrop {
        @apply bg-black bg-opacity-50 backdrop-blur;
    }

    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    input[type="color"]::-webkit-color-swatch {
        border: none;
    }
</style>