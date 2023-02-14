<script>
	import Textbox from '$lib/component/Textbox.svelte';
	import { invalidateAll } from '$app/navigation';

	let passwordInput;
	export let form;

	let passwordVisible = false;
	export let data;
</script>

<div class="grid grid-cols-1 xl:grid-cols-2 h-full">
	<Textbox>

        <h1 class="text-6xl mb-8 m-3">Account</h1>
		<!-- Kinda sketchy, but for the delayed hook of getting the user -->
		{#if (!data.user || form?.code === 'LOGOUT') && form?.code !== 'LOGIN'}
			<form action="?/login" method="POST" class="grid grid-cols-1">
				<label> Name </label>
				<input type="text" name="username" required />
				<label> Password </label>
                <div class="flex">
                    <input class="flex-1" bind:this={passwordInput} type="password" name="password" required />
                    <button class=""
                            on:click|preventDefault={() => {
						passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
						passwordVisible = !passwordVisible;
					}}
                    >
                        {passwordVisible ? '👁' : '☠'}
                    </button>
                </div>


				<div class="grid grid-cols-2">
					<button class="cool-button m-5" type="submit">Log in</button>
					<button class="cool-button m-5" type="submit" formaction="?/register">Register</button>
				</div>
			</form>
		{:else}
			<form action="?/logout" method="POST">
				<h1 class="mb-4 text-2xl">You are already logged in {data?.user?.name || form?.result?.name || "" }!!!</h1>
				<button class="cool-button" type="submit">Wanna log out? 👀</button>
			</form>
		{/if}
	</Textbox>
	<div class="relative">
		<img
			class="w-[90vh] aspect-square z-[-1] absolute top-0 right-0"
			src="/animations/slime.gif"
			alt="Imagenotloading..."
		/>
		<Textbox><h4>
            {#if passwordVisible}
                👁️👄👁️ I can see your password
            {:else}
                - 👄 -
            {/if}
        </h4></Textbox>
		{#if form?.success}
			<Textbox><h4>{form.result}</h4></Textbox>
		{:else if form?.error}
			<Textbox><h4 class="text-red-500">{form?.error}</h4></Textbox>
		{/if}
	</div>
</div>
