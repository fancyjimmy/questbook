<script lang="ts">

    import type {FormDataAttributes} from "$lib/utils";
    import FormDataInputs from "$lib/component/FormDataInputs.svelte";

    export let formDataAttributes: FormDataAttributes<any>;
    export let exclude: string[] = [];
    export let action: string ;
    export let method = "POST";

    let formBinding;

</script>

<form {action} {method} bind:this={formBinding}>
    <FormDataInputs {exclude} {formDataAttributes}/>

    <slot name="custom"/>
    <slot name="button"/>
</form>




