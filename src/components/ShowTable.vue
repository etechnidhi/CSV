<template>
    <div class="showTable">
        <h2 class="text-left">Empty Cogs {{this.CountForEmpty}}</h2>
        <b-list-group id="table" v-for="(keys,index) in getEmptyCogArray" :key="index" class="w-100 p-3">
            <b-list-group-item class="text-left w-">
                <div class="w-75 left">
                    <p>{{keys.Title}}</p>
                    <p>{{keys.Variant}}</p>
                    <p>{{keys.sku}}</p>
                </div>
                <div class="w-25 right">
                    <p>Cogs</p>
                    <v-text-field v-model="keys.Cogs"  @keyup.enter="sendToEmpty(keys)"></v-text-field>
                </div>
            </b-list-group-item>
        </b-list-group>
        <h2 class="text-left">Non Empty Cogs {{this.countForNonEmpty}}</h2>
        <b-list-group id="table" v-for="(val,index) in getNonEmptyCogArray" :key="index+'val'" class="w-100 p-3">
            <b-list-group-item class="text-left">
                <p>{{val.Title}}</p>
                <p>{{val.Variant}}</p>
                <p>{{val.sku}}</p>
            <div class="right">
                <p>{{val.Cogs}}</p>
            </div>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ShowTable",
  data() {
    return {
      countForNonEmpty: "",
      CountForEmpty: ""
    };
  },
  watch: {
    getNonEmptyCogArray: function(val) {
      val.forEach((value, index) => {
        this.countForNonEmpty = index + 1;
      });
    },
    getEmptyCogArray: function(val) {
      val.forEach((value, index) => {
        this.CountForEmpty = index;
      });
    }
  },
  computed: {
    Cogs: {
      get: function() {
        return this.$store.state.store.json.Cogs;
      },
      set: function(val) {
        this.$store.commit("updateCogs", val);
      }
    },
    ...mapGetters({
      getNonEmptyCogArray: "getNonEmptyCogArray",
      getEmptyCogArray: "getEmptyCogArray",
    })
  },
  methods: {
    ...mapActions(["sendCog"]),
    sendToEmpty: function( keys) {
      this.sendCog(keys);
    }
  }
};
</script>

<style>
#table {
  margin: 0 auto !important;
}
</style>
