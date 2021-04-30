const Register = {
    template: `

<div class="container">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card card-register flex-row my-5">
          <div class="card-img-left d-none d-md-flex">

          </div>
          <div class="card-body">
            <h5 class="card-title text-center">Inscrivez-vous afin de ne plus perdre de temps pendant vos courses ! (c'est gratuit)</h5>
            <form class="form-register">
              <div class="form-label-group">
                <input type="text" v-model="registerAccount.pseudo" id="inputUserame" class="form-control" placeholder="Pseudo" required autofocus>
                <label for="inputUserame">Pseudo</label>
              </div>

              <div class="form-label-group">
                <input type="email" v-model="registerAccount.email" id="inputEmail" class="form-control" placeholder="Email" required>
                <label for="inputEmail">Email</label>
              </div>
              
              <hr>

              <div class="form-label-group">
                <input type="password" v-model="registerAccount.password" id="inputPassword" class="form-control" placeholder="Mot de passe" required>
                <label for="inputPassword">Mot de passe</label>
              </div>

              <button v-on:click="postRegister" class="btn btn-lg btn-primary btn-block text-uppercase register">S'inscrire</button>

            </form>
          </div>
        </div>

        <div id="error_msg">
          
        </div>

      </div>

    </div>
  </div>

`,
data() {
    return {
      registerAccount: {
        pseudo: undefined,
        email: undefined,
        password: undefined,
      },
    };
  },
  methods: {
    async postRegister() {
      await fetch("/api/account/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(this.registerAccount),
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
          <strong>Bravo !</strong> Votre compte a bien été créé. Vous allez ête rediriger vers la page connexion dans 5 secondes 
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
          `
          setTimeout(() => {
            this.$router.push("/login");
          }, 1000 * 5);
    
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
};