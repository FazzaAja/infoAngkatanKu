<template>
    <div>
        <NuxtLayout name="authenticated">
            <!-- loading timpa all elemet -->
            <div v-if="loading" class="flex justify-center items-center h-screen">
                <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
              

                <CardBox >
                  <div class="bg-white rounded-lg shadow-md p-6">
  
  <div class="grid grid-cols-2 gap-4 mb-6">
    <div class="col-span-2 md:col-span-1">

      <img :src="fotopath" alt="" class="w-full">
    </div>
      <div class="col-span-2 md:col-span-1">
        <h2 class="text-xl font-semibold text-blue-500">Informasi Berita</h2>
        <div class="max-w-full">
            <h3 class="text-gray-800 dark:text-white font-semibold md:text-3xl text-2xl my-2">Nama Berita: <span>{{ title }}</span></h3>
      
            <p class="text-gray-600 dark:text-white font-semibold text-md my-2 max-w-full break-words">
   <span>{{ desc }}</span>
</p></div>
      </div>
  </div>
  
  <!-- Table Grid -->
</div>

  </CardBox>
  <form method="post" @submit.prevent="updateBerita">
        <CardBox>
          <FormField label="New Profile" help="Max 500kb">
            <FotoBerita model:path="fotopath"/>
          </FormField>

          <FormField label="title" help="Masukan Title baru">
            <FormControl
            v-model="title"
              :icon="mdiAccount"
              name="nama"
              required
              autocomplete="nama"
            />
          </FormField>
          <FormField label="desc" help="Masukan desc baru">
            <FormControl
              v-model="desc"
              :icon="mdiMail"
              type="textarea"
              name="desc"
              required
              autocomplete="desc"
            />
          </FormField>
 
            <BaseButtons>
              <button type="submit" class="py-2 px-5 bg-blue-500 rounded-md text-white hover:bg-sky-500">Update</button>

              <BaseButton color="info" label="Kembali" to="/admin/berita" outline />
            </BaseButtons>
         
          </CardBox>
        </form>

        </NuxtLayout>
    </div>
</template>
<script setup>


const supabase = useSupabaseClient()
const $route = useRoute()
const fotopath = ref('')
const desc = ref('')
const title = ref('')
const loading = ref(false)
const getSingleBerita = async()=>{
    const {data,error} = await supabase.from("berita").select().eq('id',$route.params.id)
    
   fotopath.value = data[0].foto
   desc.value = data[0].desc
    title.value = data[0].judul
    if(error){
        console.log(error)
    }
}
const updateBerita = async ()=>{
   
    // validate jika tidak ada foto
    if(fotopath.value){

        const {data,error} = await supabase.from("berita").update({foto:fotopath.value,judul:title.value,desc:desc.value}).eq('id',$route.params.id)
        if(error){
            console.log(error)
        }
        else{
          // redirect back
          navigateTo("/admin/berita")
        }
        
    }
    else{
        const {data,error} = await supabase.from("berita").update({judul:title.value,desc:desc.value}).eq('id',$route.params.id)
        if(error){
            console.log(error)
        }
        else{
          navigateTo("/admin/berita")
        }
      
    }
}

onMounted(()=>{
    getSingleBerita()
})
</script>
