export const actions = {
  setUser : ({commit},user)=>{
    commit('userStatus',user);
  },
  setToken : ({commit},userToken) => {
    commit("userToken",userToken)
  },
  setUserName : ({commit},userToken) => {
    commit("userName",userToken)
  }
}

