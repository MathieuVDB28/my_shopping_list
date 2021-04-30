const Addproduct = {
    template: `

<div class="form_add_product">
      <div class="left-part">
        <i class="fas fa-drumstick-bite"></i>
        <i class="fas fa-shopping-cart"></i>
        <i class="fas fa-wine-bottle"></i>
      </div>
      <form>
        <h1>Ajouter un produit à ma liste de course</h1>
        <div class="info">
        <label>Nom du produit</label>
          <input type="text" v-model="product.nom_produit" name="nom_produit" placeholder="Pâtes" required>
          <label>Catégorie</label>
          <select v-model="product.name_categorie" class="form-control" required>
            <option v-for="categorie in categories">{{ categorie.name_categorie }}</option>
          </select>
          <label>Quantité</label>
          <input type="text" v-model="product.quantité" name="quantité" placeholder="4" required>
        </div>
        <button v-on:click="postProduct" class="add_product">Ajouter</button>

        <div id="error_msg">
          
      </div>
      
      </form>

    </div>

 `,
data() {
    return {
      product: {
        nom_produit: undefined,
        name_categorie: undefined,
        quantité: undefined,
      },
      categories: [],
    };
  },
  methods: {
    async postProduct(event) {
      event.preventDefault();
      const found = this.categories.find((item) => { return item.name_categorie === this.product.name_categorie; });
      console.log(found);
      if(found !=undefined){
        const id_categorie = found.id_categorie;
      await fetch("/api/products", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          nom_produit: this.product.nom_produit,
          id_categorie: id_categorie,
          quantité: this.product.quantité
        }),
      }
      )
      .then(res => { 
        if(res.status == 201) this.$router.push("/list");
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

      } else {
        const error_element = document.querySelector("#error_msg");
            error_element.innerHTML = ` 
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Erreur !</strong> Veuillez selectionnez une catégorie.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
            `
      }
      
    },
  },
  mounted(){
    fetch("/api/categories",{
      headers: {
        "x-access-token": localStorage.getItem("user_token"),
      },

     })
    .then(res => {
      if(res.status == 200){
        res.json().then(data => {
          this.categories = data;
        })
      }else{
        localStorage.setItem('error_not_connected', "Vous devez être connecté pour accéder à cette fonctionnalité")
        this.$router.push('/login');
      }
    })
},
};