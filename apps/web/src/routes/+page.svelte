<script lang="ts">
	import { treaty } from '@elysiajs/eden';
	import type { App } from '@repo/server';

	const app = treaty<App>('http://localhost:3000/', {});

	app.banana.get().then((res) => {
		console.log(res.data);
	});
</script>

<h1>Web</h1>
<button on:click={() => app.banana.get()}>buscar</button>
