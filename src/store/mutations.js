
export const  userStatus = (state,user)=>{
  debugger;
    if(user){
      state.currentUser = user;
      state.isLogin = true;
    }else{
      sessionStorage.setItem("currentUser",null);
      sessionStorage.setItem("token","");
      state.currentUser = null;
      state.isLogin = false;
      state.token = "";
    }
  }
export const  userToken = (state,userToken) => {
    if (userToken) {
      state.token = userToken;
    } else {
      state.token = null;
    }
  }
  export const userName = (state,userName) => {
  if (userName) {
    state.userName = userName;
  } else {
    state.userName = null;
  }
}


