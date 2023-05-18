<script lang="ts">
  import Fonts from '$lib/NexusFonts/Fonts.svelte';
  import FontsPreloads from '$lib/NexusFonts/FontsPreloads.svelte';
  import Meta from '../lib/Meta/Meta.svelte';
</script>

<svelte:head>
  <Meta
    tags={{
      'theme-color': '#cc3200',
    }}
  />
  <FontsPreloads />
  <Fonts
    fonts={[
      {
        family: 'Cera Pro',
        weight: [400, 500, 600],
      },
    ]}
  />
</svelte:head>

<div id="appRoot">
  <slot />
</div>

<style lang="scss">
  #appRoot {
    // no blinding ppl
    background-color: #1a1a1a;
    background-image: url('/00318.png');
    color: #ffffff;
    // remove ugly default fonts
    font-family: 'Cera Pro', Inter, 'Segoe UI', Tahoma, Geneva, Verdana,
      sans-serif; // Inter is imported in app.html
    // positioning
    position: fixed;
    top: 0;
    left: 0;
    // display control
    width: 100vw;
    height: 100vh;
    // overflow control
    overflow-y: auto;
    overflow-x: hidden;
    // center everything
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    // bg sizing
    background-size: cover;
    background-position: center;
  }
</style>
