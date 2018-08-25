<template>
    <div class="homeComponent">
    
        <div class="download">
            <div>
                <h3>Download CSV File</h3>
            </div>
            <download-excel class="btn btn-default" :type="'csv'" :data="data" :fields="json_fields" name="filename.csv">
                <div>
                    <v-btn color="success" dark>DOWNLOAD</v-btn>
                </div>
            </download-excel>
        </div>
        <div class="upload">
            <div>
                <div>
                    <h3>Upload CSV File</h3>
                </div>
                <div>
                <v-btn color="info" id="uploadRight" dark><input type="file" ref="file" id="file" v-on:change="handleFile">Upload</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import data from "./../json/data.json";
export default {
  name: "HomeComponent",
  data() {
    return {
      fileinput: "",
      data: data,
      json_fields: {
        Id: "id",
        Variant: "product_details.variant",
        Title: "product_details.title",
        sku: "product_details.sku",
        Cogs: "product_details.cogs",
        Price: "product_details.price",
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ]
    };
  },
  computed: {
    ...mapGetters({
      getData: "getData"
    })
  },
  methods: {
    ...mapActions(["sendData"]),
    csvJSON: function(csv) {
      var lines = csv.split("\n");
      var result = [];
      var headers;
      for (var i = 0; i < lines.length; i++) {
        headers = lines[i].split("\n");
      }
      var cont = 0;
      for (var k = 0; k < lines.length; k++) {
        var obj = {};
        var currentline = lines[k].split("\n");
        for (var j = 0; j < headers.length; j++) {
          obj[cont] = currentline[j];
        }
        cont++;
        result.push(obj);
      }
      this.sendData(result);
      return JSON.stringify(result); //JSON
    },
    handleFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createInput(files[0]);
    },
    createInput(file) {
      var reader = new FileReader();
      reader.onload = e => {
        var texto = e.target.result;
        this.csvJSON(texto);
      };
      reader.readAsText(file);
      this.$router.push("/table");
    }
  }
};
</script>

<style>
a {
  color: white !important;
}
.homeComponent{
    display: flex;
    margin: 0 auto !important;
    width: 60%;
}
#uploadRight{
  margin-top: 15px;
}
</style>
