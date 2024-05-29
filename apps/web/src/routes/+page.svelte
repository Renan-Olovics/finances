<script lang="ts">
	import { treaty } from '@elysiajs/eden';
	import type { App } from '@repo/server';

	//TODO: Fix: this App being imported as any
	const app = treaty<App>('http://localhost:3000', {});

	const fn = () => {
		app.auth.login
			.post({
				email: 'blabla@gmail.com',
				password: 'qweqweqwe'
			})
			.then((res) => {
				console.log(res.data);
			});
	};
</script>

<h1>Web</h1>
<button on:click={fn}>buscar</button>
