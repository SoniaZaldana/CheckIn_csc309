import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const authenticateUser = userData => dispatch => {
  dispatch(clearErrors());

  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to local storage
      const { token } = res.data;

      //Set token  to local storage
      localStorage.setItem("jwtToken", token);
      //Set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);

      //set current user
      dispatch(login(decoded));
    })
    .catch(err => {
      console.log(err);
      return dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      });
    });
};

export const createUser = userData => dispatch => {
    dispatch(clearErrors());
    axios
        .post("/api/users/register", userData)
        .then(data => {
            console.log(data);
            const newUser = {
                username: userData.username,
                password: userData.password,
            }
        })
        .catch(err => {
            console.log(err);
            return dispatch({
                type: "GET_ERRORS",
                payload: err.response.data
            });
        });
}

//Clear errors
export const clearErrors = () => {
  return {
    type: "CLEAR_ERRORS"
  };
};

export const login = decoded => {
  return {
    type: "LOGIN",
    payload: decoded
  };
};

export const newUser = () => {
    return {
        type: "NEW_USER",
    };
};

//log user out
export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem("jwtToken");

  //Remove the auth header for future requests
  setAuthToken(false);
  // Set current user to empty object which will also set isAuthenticated to false
  dispatch(login({}));
  window.location.href = "/login";
};

/*Redux Action to get current user's data */
export const getUserData = () => dispatch => {
  axios
    .get("/api/users/")
    .then(res => {
      const userData = res.data;
      dispatch(setUserData(userData));
    })
    .catch(err => {
      return dispatch({
        type: "GET_ERRORS",
        payload: err
      });
    });
};

export const getFriends = () => dispatch => {
  axios
    .get("/api/friends/")
    .then(res => {
      const friendsData = res.data;
      dispatch(setFriendsData(friendsData));
    })
    .catch(err => {
      return dispatch({
        type: "GET_ERRORS",
        payload: err
      });
    });
};

export const setFriendsData = (friendsData) => {
  return {
    type: "SET_FRIENDS_DATA", 
    payload: friendsData
  }
}

export const setUserData = (userData) => {
  return {
    type: "SET_USER_DATA",
    payload: userData
  };
};

export const logoff = () => {
  return {
    type: "LOGOFF"
  };
};

/* Redux actions to get checkins */

// Get checkins to display in the dashboard
export const getFriendsCheckins = () => dispatch => {
  axios.get("/api/checkins/friends")
    .then(response => {
        const friendsCheckins = response.data
        dispatch(setFriendsCheckins(friendsCheckins))
    })
    .catch(err => {
      return dispatch( {
        type: "GET_ERRORS", 
        payload: err
      })
    })
}

// helper function to set friends checkins
export const setFriendsCheckins = friendsCheckins => {
  return {
    type: "SET_FRIENDS_CHECKINS", 
    payload: friendsCheckins
  }
}

export const addNewCheckin = (action, message, location) => dispatch => {
  axios
    .post('/api/checkins/', {
        action: action, 
        message: message, 
        location: location
    })
    .then(response => {
        const newCheckin = response.data 
       dispatch(setNewCheckin(newCheckin))
    })
    .catch(err => {
      return dispatch( {
        type: "GET_ERRORS", 
        payload: err
      })
    })
}

// helper function to set friends checkins
export const setNewCheckin = newCheckin => {
  return {
    type: "SET_NEW_CHECKIN", 
    payload: newCheckin
  }
}

