const addCategorie = {
    template: `

<div class="form_add_categorie">
      <div class="left-part">
        <i class="fas fa-apple-alt"></i>
        <i class="fas fa-cookie-bite"></i>
        <i class="fas fa-paw"></i>
      </div>
      <form>
        <h1>Ajouter une catégorie</h1>
        <div class="info">
          <input type="text" v-model="categorie.name_categorie" name="name_categorie" placeholder="Categorie" required>
        </div>
        <button v-on:click="postCategorie" class="add_categorie">Ajouter</button>

        <div id="error_msg">
          
      </div>
      
      </form>

    </div>

 `,
data() {
    return {
      categorie: {
        name_categorie: undefined,
      },
    };
  },
  methods: {
    async postCategorie(event) {
        event.preventDefault();
        await fetch("/api/categories", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            name_categorie: this.categorie.name_categorie,
          }),
        }
        )
        .then(res => { 
          if(res.status == 201) this.$router.push("/categories");
          else{
            res.json().then(error_data => {
              const error_element = document.querySelector("#error_msg");
              error_element.innerHTML = ` 
              <div class="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Erreur !</strong> ${error_data.message}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
              `
            })
          }
        });
      },
  },
};