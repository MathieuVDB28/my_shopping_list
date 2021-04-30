const Categories = {
    template: ` 
      <div class="m-5">
        <h1>Les catégories</h1>
        <router-link class="nav-link add addCategorie" to="/addCategorie">Ajouter une catégorie</router-link>
        <table class="rounded-t-lg  w-full bg-gray-200 text-gray-800">
          <thead>
              <tr class="text-left border-b-2 border-gray-300">
                  <th class="px-4 py-3 w-1/4">N°</th>
                  <th class="px-4 py-3 w-1/4">Catégorie</th>
                  <th class="px-4 py-3 w-1/4">Action</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="categorie in categories" class="bg-gray-100 border-b border-gray-200" v-bind:id="'categorie_' + categorie.categorie">
                  <td class="px-4 py-3 w-1/4" data-name="id">{{ categorie.id_categorie }}</td>
                  <td class="px-4 py-3 w-1/4" data-name="name">{{ categorie.name_categorie }}</td>
                  <td class="px-4 py-3 w-1/4">
                    <button v-on:click="deleteCategorie(categorie.id_categorie)" data-name="deleteButton" class="px-2">
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
        categories: [] 
      };
    },
    methods : {
      async deleteCategorie(id_categorie) {
        await fetch("/api/categories/"+id_categorie, {
          method: "DELETE",
        }
        )
        document.location.reload();
      },
    },
    mounted(){
      console.log(localStorage);
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