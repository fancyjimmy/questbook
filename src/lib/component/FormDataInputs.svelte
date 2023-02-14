<script lang="ts">
	import type { FormDataAttributes } from '$lib/utils';

	export let formDataAttributes: FormDataAttributes<any>;
	export let exclude: string[] = [];
</script>

<div>
	{#each Object.keys(formDataAttributes) as key}
		{#if !exclude.includes(key)}
            <div>
                <label for={key}>{key}</label>
                <input
                        type={formDataAttributes[key]?.type?.inputType || 'text'}
                        name={key}
                        id={key}
                        required={!formDataAttributes[key].optional || false}
                />
            </div>

		{/if}
	{/each}
</div>
