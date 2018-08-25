export default {
  state: {
    data: [],
    val: "",
    json: [],
    emptyCogsArray: [],
    nonEmptyCogsArray: [],
    Cogs: ""
  },
  getters: {
    getEmptyCogArray: state => state.emptyCogsArray,
    getNonEmptyCogArray: state => state.nonEmptyCogsArray
  },
  actions: {
    sendData({ commit }, payload) {
      commit("data", payload);
    },
    sendCog({ commit }, payload) {
      commit("removeFromEmpty", payload);
      commit("updateCogs", "");
    }
  },
  mutations: {
    updateCogs: (state, val) => {
      state.Cogs = val;
    },
    data: (state, val) => {
      state.data = val;
      var keys = [];
      state.data.forEach(function(value, index) {
        state.val = value[index].split(",");
        if (!index) {
          keys = value[index].split(",");
        }
        if (keys) {
          var temp = {};
          keys.forEach((value1, index1) => {
            temp[value1] = state.val[index1];
          });
          state.json.push(temp);
        }
      });
      state.json.forEach(value => {
        if (value.Cogs == "undefined") {
          value['Cogs'] = null;
          state.emptyCogsArray.push(value);
        } else {
          state.nonEmptyCogsArray.push(value);
        }
      });
      state.nonEmptyCogsArray.splice(0, 1);
      state.nonEmptyCogsArray.pop();
    },
    removeFromEmpty: (state, data) => {
      state.emptyCogsArray.forEach((value, index) => {
        if (value.Id == data.Id) {
          state.val = index;
        }
      });
      state.emptyCogsArray.splice(state.val, 1);
      state.nonEmptyCogsArray.push(data);
    }
  }
};
