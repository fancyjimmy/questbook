<script lang="ts">

    import Dialog from "$lib/component/Dialog.svelte";
    import {onMount} from "svelte";

    export let data;
    export let form;
    let passwordInput;
    let passwordVisible = false;


    $: isLogin = (!data.user || form?.code === 'LOGOUT') && form?.code !== 'LOGIN';
    $: type = isLogin ? "Login" : "Logout";
    let isLogin;

    let errorDialog;

    onMount(() => {
        if (form) {
            if (form?.success === false) {
                errorDialog.open();
            }
        }
    })


</script>

<Dialog bind:this={errorDialog} class="text-box">
    <h1 class="text-6xl font-thick">Error</h1>
    <p class="text-4xl mb-6">{form?.error}</p>
    <button slot="closeButton" class="cool-button w-full" on:click={() => errorDialog.close()}>Close</button>
</Dialog>

<div class="h-full w-full grid items-center justify-center">

    <div class="text-box m-8 p-8 max-w-[800px] w-[80vw]">
        <h1 class="text-6xl mb-8 font-thickest ">
            {#each type.split("") as char, i}
                <span class="bounce inline-block" style="--delay: {i * 80}ms">{char}</span>
            {/each}
        </h1>
        <!-- Kinda sketchy, but for the delayed hook of getting the user -->
        {#if isLogin}
            <form action="?/login" method="POST" class="grid grid-cols-1">
                <label class="text-5xl font-thick"> Name </label>
                <input type="text" name="username" class="noOutline text-3xl p-3" required/>
                <label class="text-5xl font-thick"> Password </label>
                <div class="flex mb-5 gap-5">
                    <input class="noOutline text-3xl p-3 flex-1" bind:this={passwordInput} type="password"
                           name="password" required/>
                    <button class="w-8"
                            on:click|preventDefault={() => {
						passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
						passwordVisible = !passwordVisible;
					}}
                    >
                        {passwordVisible ? '👀' : '👁️‍🗨️'}
                    </button>
                </div>

                <button class="cool-button" type="submit">Log in</button>
            </form>
        {:else}
            <form action="?/logout" method="POST">
                <h1 class="mb-4 text-4xl">You are already logged in {data?.user?.name || form?.result?.name || "" }
                    !!!</h1>
                <button class="cool-button" type="submit">Wanna log out? 👀</button>
            </form>
        {/if}
    </div>

</div>

<style>


    @keyframes bounce {
        0% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-20px);
        }
        60% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(0);
        }
    }

    .bounce {
        --delay: 0s;
        animation: bounce 1s infinite ease-in-out;
        animation-delay: var(--delay);
    }
</style>