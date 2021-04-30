const List = {
  template: ` 
    <div class="m-5">
      <h1>Ma liste de courses</h1>
      <router-link class="nav-link add addProduct" to="/add">Ajouter un produit à ma liste</router-link>
      <table class="rounded-t-lg  w-full bg-gray-200 text-gray-800">
        <thead>
            <tr class="text-left border-b-2 border-gray-300">
                <th class="px-4 py-3 w-1/4">Nom produit</th>
                <th class="px-4 py-3 w-1/4">Catégorie</th>
                <th class="px-4 py-3 w-1/4">Quantité</th>
                <th class="px-4 py-3 w-1/4">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="produit in produits" class="bg-gray-100 border-b border-gray-200" v-bind:id="'produit_' + produit.id_produit">
                <td class="px-4 py-3 w-1/4" data-name="name">{{ produit.nom_produit }}</td>
                <td class="px-4 py-3 w-1/4" data-name="category">{{ produit.name_categorie }}</td>
                <td class="px-4 py-3 w-1/4" data-name="quantity">{{ produit.quantité }} </td>
                <td class="px-4 py-3 w-1/4">
                  <button v-on:click="edit(produit.id_produit)" data-name="editButton">
                    <svg  xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button v-on:click="saveEdit(produit.id_produit)" data-name="saveEditButton" class="hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </button>
                  <button v-on:click="deleteProduit(produit.id_produit)" data-name="deleteButton" class="px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </td>
            </tr>
        </tbody>
      </table>

      <div id="error_msg">
          
      </div>

      <router-view></router-view>


    </div>

  `,
  data() {
    return {
      produits: [] 
    };
  },
  methods : {
    async deleteProduit(id_produit) {
      await fetch("/api/products/"+id_produit, {
        method: "DELETE",
      }
      )
      document.location.reload();
    },
    edit(id_produit) {
      const data_names = ['quantity']
      const lineElement = document.querySelector(`#produit_${id_produit}`);
      const editButton = lineElement.querySelector(`button[data-name="editButton"]`)
      const saveEditButton = lineElement.querySelector(`button[data-name="saveEditButton"]`)
      editButton.classList.toggle('hidden');
      saveEditButton.classList.toggle('hidden');
      data_names.forEach(data_name => {
        const element = lineElement.querySelector(`td[data-name="${data_name}"]`)
        element.innerHTML = `<input type="text" value="${element.innerText}" class="w-full px-2 py-1 rounded text-gray-500">`
      }); 
    },
    async saveEdit(id_produit) {
      const lineElement = document.querySelector(`#produit_${id_produit}`);
      const editButton = lineElement.querySelector(`button[data-name="editButton"]`)
      const saveEditButton = lineElement.querySelector(`button[data-name="saveEditButton"]`)
      editButton.classList.toggle('hidden');
      saveEditButton.classList.toggle('hidden');

      /*const nameElement = lineElement.querySelector(`td[data-name="name"]`);
      const nameValue = nameElement.firstChild.value;
      nameElement.innerHTML = nameValue

      const categoryElement = lineElement.querySelector(`td[data-name="category"]`);
      const categoryValue = categoryElement.firstChild.value;
      categoryElement.innerHTML = categoryValue*/

      const quantityElement = lineElement.querySelector(`td[data-name="quantity"]`);
      const quantityValue = quantityElement.firstChild.value;
      quantityElement.innerHTML = quantityValue

      const newValue = {
        quantité: quantityValue
      };
 
      await fetch("/api/products/"+id_produit, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(newValue),
      }
      )
    },
  },
  mounted(){
    console.log(localStorage);
      fetch("/api/products",{
        headers: {
          "x-access-token": localStorage.getItem("user_token"),
        },

       })
      .then(res => {
        if(res.status == 200){
          res.json().then(data => {
            this.produits = data;
          })
        }else{
          localStorage.setItem('error_not_connected', "Vous devez être connecté pour accéder à cette fonctionnalité")
          this.$router.push('/login');
        }
      })
  },
};