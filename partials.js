var config = {
  method: 'POST',
  url: http:// ,
  headers: { 'Login': 'register' },
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
              failedCallback('Please, try again later.');
          }
      }
  });

 
[HttpPost]
        public ActionResult LogOn(LogOnModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                if (Membership.ValidateUser(model.UserName, model.Password))
                {
                    FormsAuthentication.SetAuthCookie(model.UserName, model.RememberMe);
                    if (Url.IsLocalUrl(returnUrl) && returnUrl.Length > 1 && returnUrl.StartsWith("/")
                      && !returnUrl.StartsWith("//") && !returnUrl.StartsWith("/\\"))
                    {
                        return JavaScript("location.href ='" + returnUrl + "';");
                    }
                    else
                    {
                        return RedirectToAction("Index", "Home");
                    }
                }
                else
                {
                    ModelState.AddModelError("", "The user name or password provided is incorrect.");
                }
            }

            // If we got this far, something failed, redisplay form
            if (Request.IsAjaxRequest())
            {
                // If an ajax request was made return only the validation errors 
                // instead of the whole page
                return PartialView("LogIn2"); 
            }
            else
            {
                return View();
            }
        }