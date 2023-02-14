<script lang="ts">
    import {page, navigating} from "$app/stores";
    import {goto} from "$app/navigation";
    import {redirect} from "@sveltejs/kit";
    import {browser} from "$app/environment";


    function redirectTo(location: string, delay:number){
        let id = setInterval(() => {
            timeLeft = timeLeft - 100;
        }, 100);

        setTimeout( () => {
            clearInterval(id);
            goto(location);
        }, delay);



    }

    let redirected = $page.error?.redirect || false;
    let redirectionTime = 4000;
    let timeLeft = redirectionTime;
    let redirectionUrl = $page?.error?.location;
    if (browser){
        if (redirected && redirectionUrl){
            if (redirectionUrl != null) {
                redirectTo(redirectionUrl!, redirectionTime);
            }
        }
    }


</script>


<h1>{$page.error.display || "Error occured"}</h1>

{#if redirected}
    <p>You will be redirected shortly {timeLeft / 1000}</p>

{/if}
