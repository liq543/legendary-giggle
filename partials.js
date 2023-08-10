var config = {
  method: 'POST',
  url: http://,
  headers: { 'Content-Type': 'vyj yfj jy' },
  data: 'grant_type=password&username=' + username + '&password=' + password,
};

var userData = {
  isAuthenticated: false,
  username: '',
  bearerToken: '',
  expirationDate: null,
};

function setHttpAuthHeader() {
  $http.defaults.headers.common.Authorization = 'Bearer ' + userData.bearerToken;
}

$http(config)
  .success(function (data) {
      userData.isAuthenticated = true;
      userData.username = data.userName;
      userData.bearerToken = data.access_token;
      $http.defaults.headers.common.Authorization = 'Bearer ' + userData.bearerToken;
      if (typeof successCallback === 'function') {
          successCallback();
      }
  })
  .error(function (data) {
      if (typeof failedCallback === 'function') {
          if (data.error_description) {
              failedCallback(data.error_description);
          } else {
              failedCallback('Unable to contact server; please, try again later.');
          }
      }
  });

<<<<<<< HEAD
  //dsh fiuauhcuahi dvvf 
=======
  //dsh fiuauhcuahi dvvf 
  
>>>>>>> 75f7591397cba1eb851ba44582670e58750616d6
