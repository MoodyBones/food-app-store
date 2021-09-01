// vstore2 nuxt sni
export const state = () => ({
  fooddata: []
});

// export const getters = {
//   getterValue: state => {
//     return state.value;
//   }
// };

// we are using an action with async logic to call a mutation
// the mutation is the thing that changes the state
export const mutations = {
  updateFoodData: (state, data) => {
    state.fooddata = data;
  }
};

// use actions to do async calls
// actions can't change the state, but they can commit mutations that can change the state
export const actions = {
  async getFoodData({ state, commit }) {
    // to be more efficient return if we already have the data
    if (state.fooddata.length) return;
    try {
      // Nuxt offers a polyfill so that you can use fetch in all browsers and perform well
      await fetch(
        "https://dva9vm8f1h.execute-api.us-east-2.amazonaws.com/production/restaurants",
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.AWS_API_KEY
          }
        }
      )
        // we need to convert the response to json
        .then(response => response.json())
        // then get the data and do things with the data
        .then(data => {
          console.log(data); // test that the data's coming back

          // commit('updateValue', payload)
          commit("updateFoodData", data);
        });
    } catch (error) {
      console.log(error);
    }
  }
};
