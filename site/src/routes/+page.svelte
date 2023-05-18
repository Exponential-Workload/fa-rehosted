<script lang="ts">
  import { TwitterCardTypes } from '$lib/Meta/MetaTypes';
  import { onMount } from 'svelte';
  import Meta from '../lib/Meta/Meta.svelte';

  import type Highlight from 'svelte-highlight';
  import html from 'svelte-highlight/languages/xml';
  import github from 'svelte-highlight/styles/github';

  let HighlightInstance: typeof Highlight;
  onMount(() => {
    import('svelte-highlight').then((mod) => {
      HighlightInstance = mod.default;
    });
  });
</script>

<svelte:head>
  <Meta
    tags={{
      title: 'FA-Rehosted: FontAwesome without CF',
      description: `FontAwesome is decent, but it could be better if CloudFlare wasn\'t involved.
That's what FA-Rehosted does`,
      image: '/fanocf.png',
      card: TwitterCardTypes.summaryLargeImage,
    }}
  />
  {@html github}
</svelte:head>

<main>
  <h1><i class="fa-solid fa-font-awesome" /> FA-Rehosted</h1>
  <p>
    Free your FontAwesome-based site from unreliability & bottlenecks by using
    FA-Rehosted.
  </p>
  <div
    style="background: #0002;border-radius:8px;backdrop-filter:blur(32px);"
    class="hlc"
  >
    {#if HighlightInstance}
      <svelte:component this={HighlightInstance} language={html} code='<script src="https://fa.astolfo.gay/fa.js" crossorigin="anonymous"></script>' />
    {/if}
  </div>
</main>

<style lang="scss">
  main {
    max-width: 100vw;
    text-align: center;

    h1 {
      margin: 0 0;
    }

    :global(.hlc.hlc) :global(.hljs) {
      max-width: 100vw;
      filter: #{'invert()'} hue-rotate(180deg);
      background: #0000;
    }
  }
</style>
