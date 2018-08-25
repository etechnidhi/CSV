<template>
    <div id="table">
        <HomeComponent/>
        <ShowTable/>
    </div>
</template>

<script>
import HomeComponent from "./../components/HomeComponent.vue";
import ShowTable from "./../components/ShowTable.vue";
export default {
  name: "Table",
  components: {
    HomeComponent,
    ShowTable
  }
};
</script>

<style>
</style>
