<script lang="ts">
    import Textbox from "$lib/component/Textbox.svelte";

    export let notenPaare: {name: string, value: number}[]= [
        {
            "name": "AM",
            "value": 3
        },
        {
            name: "DE",
            value: 3
        },
        {
            name: "ENG",
            value: 1
        },
        {
            name: "NVS",
            value: 2
        },
        {
            name: "DBI",
            value: 1
        },
        {
            name: "POS",
            value: 1
        },
        {
            name: "SYP",
            value: 1
        },
        {
            name: "GGP",
            value: 2
        },
        {
            name: "NW",
            value: 1
        },
        {
            name: "ETH",
            value: 1
        }
    ];

</script>

<Textbox>
    <h3 class="text-4xl text-primary-800 mb-3">Notenblatt</h3>
    <ul class="mb-5">
        {#each notenPaare.sort((a, b) => a.value - b.value) as notenpaar}
            <li class="flex justify-between">
                <p>{notenpaar["name"]}</p>
                <p><b class="text-primary-600">{notenpaar["value"]}</b></p>
            </li>
        {/each}
    </ul>
    <p>AVG: <b class="text-primary-800">{(notenPaare.reduce((acc, notenpaar) => notenpaar.value + acc, 0) / notenPaare.length).toFixed(2 )}</b></p>

</Textbox>

