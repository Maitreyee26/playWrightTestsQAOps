class APIUtilsEhub{
        constructor(apiContext,loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;

    }
     async getToken(){
          const loginResponse = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
            {
                data:this.loginPayload
            }
          );
          const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(loginResponseJson);
        return token;
    }
    
}

module.exports = {APIUtilsEhub};