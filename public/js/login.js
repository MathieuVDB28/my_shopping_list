const Login = {
    template: `

<div class="container">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card card-signin flex-row my-5">
          <div class="card-img-left d-none d-md-flex">

          </div>
          <div class="card-body">
            <h5 class="card-title text-center">Connectez-vous pour préparer vos courses</h5>
            <form class="form-signin">
        
              <div class="form-label-group">
                <input type="email" v-model="loginAccount.email" id="inputEmail" class="form-control" placeholder="Email address" required>
                <label for="inputEmail">Email address</label>
              </div>
              
              <hr>

              <div class="form-label-group">
                <input type="password" v-model="loginAccount.password" id="inputPassword" class="form-control" placeholder="Password" required>
                <label for="inputPassword">Password</label>
              </div>

              <button v-on:click="postLogin" class="btn btn-lg btn-primary btn-block text-uppercase">Se connecter</button>

            </form>
          </div>
        </div>
      </div>

      <div id="error_msg">
          
      </div>

    </div>
  </div>

`,
data() {
    return {
      loginAccount: {
        email: undefined,
        password: undefined,
      },
    };
  },
  methods: {
    async postLogin() {
      await fetch("/api/account/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(this.loginAccount),
      }
      )
      .then(res => { 
        if(res.status == 400){
          res.json().then(data => {
            console.log(data.message);
            const error_element = document.querySelector("#error_msg");
            error_element.innerHTML = ` 
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Erreur !</strong> ${data.message}.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
            `
          })
        } else {
          const error_element = document.querySelector("#error_msg");
          error_element.innerHTML = ` 
          <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Bienvenue !</strong> Vous êtes maintenant connecté, vous serez redirigé dans 5s
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
          `
          res.json().then(data=>{
            localStorage.setItem("user_token", data.user_token);
            setTimeout(() => {
            this.$router.push("/list");
          }, 1000 * 5);
          })
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
  mounted(){
    const error = localStorage.getItem('error_not_connected');
    if(error){
      const error_element = document.querySelector("#error_msg");
      error_element.innerHTML = ` 
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Erreur !</strong> ${error}.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
      `
      localStorage.removeItem('error_not_connected');
    }
  }
};