<script lang="ts">
    import type {PageServerData} from "./$types";

    export let data:PageServerData;
</script>
<div class="scroll p-3">
    <h1 class="text-4xl font-thickest text-amber-900 my-3">Log of {data.user.name}</h1>

    <div class="grid gap-2 mb-5">
        {#each data.logs as log}
            <div class="bg-yellow-100 rounded shadow p-2">
                <p>{log.text}</p>
                <p class="text-gray-700 italic">
                {log.createdAt.toLocaleDateString()}
                </p>
            </div>
        {/each}
    </div>

    <form action="?/createLog" class="flex gap-4" method="post">
        <input type="text" name="message" class="flex-1 rounded noOutline px-3">
        <button class="cool-button" type="submit">🖋️</button>
    </form>


</div>
<style>

</style>