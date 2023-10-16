<template>
    <div>
        <NuxtLayout name="authenticated">
            <!-- loading timpa all elemet -->
            <div v-if="loading" class="flex justify-center items-center h-screen">
                <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
              

                <CardBox class="mx-2">
                  <div class="rounded-lg shadow-md p-6">
  
  <div class="grid grid-cols-2 gap-4 mb-6">
    <div class="col-span-2 md:col-span-1">
        <div class="max-w-full mt-10">
            <h2 class="text-xl font-semibold text-blue-500">Informasi ebook
                <!-- san badge -->
                <span class="bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold ml-2">Baru</span>

            </h2>
            <h3 class="text-gray-800 dark:text-white font-semibold md:text-3xl text-2xl my-2">Nama ebook: <span>{{ title }}</span></h3>
      
            <p class="text-gray-600 dark:text-white font-semibold text-md my-2 max-w-full break-words">
   <span>{{ desc }}</span>
</p></div>
    <p class="text-blue-500 font-semibold">dwonload file</p>
        <!-- button dwonload -->
        <a :href="fotopath" target="_blank" class="">
        <!-- icon dwonload -->
        <BaseButton color="primary" :icon="mdiDownload" small />
        </a>
        
    </div>
      <div class="col-span-2 md:col-span-1">
        <form method="post" @submit.prevent="updateEbook">
       
          <FormField label="File Baru" help="Max 500kb">
            <FileBook model:path="fotopath"/>
           
          </FormField>

          <FormField label="Judul dan Jurusan" help="Masukan Title baru">
            <FormControl
            v-model="title"
              :icon="mdiAccount"
              name="nama"
              required
              autocomplete="nama"
            />
            <select v-model="jurusan" placeholder="masukan jurusan" class="block w- text-sm text-gray-900 border border-gray-800 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 p-2 py-3">
              <option value="" disabled>Masukan Jurusan</option>
              <option v-for="j in jurusans" :key="j.id" :value="j.nama">{{j.nama}}</option>
            </select>
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

              <BaseButton color="info" label="Kembali" to="/admin/ebook" outline />
            </BaseButtons>
         
       
        </form>
      </div>
  </div>
  
  <!-- Table Grid -->
</div>

  </CardBox>
 

        </NuxtLayout>
    </div>
</template>
<script setup>
import {mdiDownload} from "@mdi/js"

const supabase = useSupabaseClient()
const $route = useRoute()
const fotopath = ref('')
const desc = ref('')
const title = ref('')
const jurusans = ref([])
const jurusan = ref('')
const loading = ref(false)
const getSingle = async()=>{
    const {data,error} = await supabase.from("ebook").select().eq('id',$route.params.id)
    
   fotopath.value = data[0].foto
   desc.value = data[0].desc
   jurusan.value = data[0].jurusan
    title.value = data[0].judul
    if(error){
        console.log(error)
    }
}

const getJurusan = async ()=>{
  const { data, error } = await supabase.from('jurusan').select('*');
  if (error) {
    console.log(error);
  } else {
    jurusans.value = data;
  }
}


const updateEbook = async ()=>{
   
    // validate jika tidak ada foto
    if(fotopath.value){

        const {data,error} = await supabase.from("ebook").update({foto:fotopath.value,judul:title.value,desc:desc.value,jurusan:jurusan.value}).eq('id',$route.params.id)
        if(error){
            console.log(error)
        }
        else{
          // redirect back
          navigateTo("/admin/ebook")
        }
        
    }
    else{
        const {data,error} = await supabase.from("ebook").update({judul:title.value,desc:desc.value,jurusan:jurusan.value}).eq('id',$route.params.id)
        if(error){
            console.log(error)
        }
        else{
          navigateTo("/admin/ebook")
        }
      
    }
}

onMounted(()=>{
    getSingle()
    getJurusan()
})
</script>
