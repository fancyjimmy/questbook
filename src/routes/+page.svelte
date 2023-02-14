<script>
    import Textbox from "$lib/component/Textbox.svelte";
    import NotenBlatt from "$lib/component/misc/NotenBlatt.svelte";
    import {TITLE} from "$lib/config";

    let title = TITLE;
    export let data;
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<h1 class="text-4xl font-thickest m-4 text-white">Questbook</h1>

<img src="/animations/slime.gif" alt="Slime" class="animation aspect-square w-[80vh] absolute top-5 right-5 z-[-1]">


<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
    <Textbox>Hello this is the beta to the a Questbook application, to keep track of your progress in life.</Textbox>
    <Textbox>Don't be lazy or overthink and write this fucking application</Textbox>
</div>
<NotenBlatt/>

<Textbox>
    <h2 class="text-3xl mb-5 text-primary-700">Vorspiele am Montag von der 1 - 6 Stunde: </h2>
    <h3 class="text-xl mb-3">Dienstag spielen die, die am Montag weitergekommen sind. Bis auf die 5ten, welche so
        mitspielen.</h3>
    <p><b>TODO: </b>Frag AV ob Dienstag von der Früh bis zum Ende frei sein kann.</p>
    <p><b>TODO: </b>Laufer zusammenstellen mit dem Tunierplan und anfrage das Schüler bis zum Schluss bleiben.</p>
    <p><b>X TODO: </b>mit Neulinger reden ob es ein Mikro oder eine Anzeige Tafel gibt, oder Mannschaftsfarben.</p>
    <p><b>TODO: </b>Hammerl und Jäger wegen der Schiedsrichter Position fragen.</p>
    <p><b>X TODO: </b>Fragen ob die 5ten noch einen Plan haben, wegen der Aufstellung</p>
    <p><b>TODO: </b>Schauen ob es</p>
    <p>Sieger Ehrung vom Abteilungsvorstand fragen.</p>
</Textbox>

<style>
    img.animation {
        image-rendering: pixelated;
    }



    .title-animation{
        --title-animation-delay: calc(var(--i) * 0.05s);
        animation: title-animation 1s ease-in-out infinite alternate;
        display: inline-block;
        animation-delay: var(--title-animation-delay);

        transition-delay: var(--title-animation-delay);
    }



</style>