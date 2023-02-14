<script lang="ts">
    import type {PageServerData} from "./$types";

    export let data:PageServerData;
</script>
<div class="scroll">
    <h1 class="text-4xl font-thickest text-orange-800 flex-1">Log of {data.user.name}</h1>

    <div>
        {#each data.logs as log}
            <div>
                {log.createdAt.toLocaleDateString()}
                <p>{log.text}</p>
            </div>
        {/each}
    </div>

    <form action="?/createLog" class="grid grid-cols-2" method="post">
        <input type="text" name="message">
        <button class="cool-button" type="submit">🖋️</button>
    </form>


</div>
<style>

</style>