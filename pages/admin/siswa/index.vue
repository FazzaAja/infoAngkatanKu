<script setup>

definePageMeta({
  middleware: 'auth'
})

const siswa = ref([]);
const loading = ref(false)
const alert = ref(true)
const supabase = useSupabaseClient();
const getSiswa = async ()=>{
  loading.value = false
  
  alert.value = true
    const { data, error } = await supabase
    .from('siswa')
    .select()
    .order('id', { ascending: true })
    siswa.value = data
    loading.value = true
}

const deleteSiswa = async (id)=>{
  if(confirm('Yakin ingin menghapus data?')){
    alert.value = false
    const { data, error } = await supabase
    .from('siswa')
    .delete()
    .match({ id: id })


    getSiswa()
    alert.value = true
  }
  else{
    alert('data tidak jadi dihapus')
  
  }
}
const filtersiswa = async (e)=>{

  const { data, error } = await supabase
  .from('siswa')
  .select()
  .ilike('nama', '%'+e.target.value+'%')
 
  
  siswa.value = data
  
}
onMounted(()=>{
    getSiswa()
})

</script>

<template>
  <NuxtLayout name="authenticated">
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" main  title="siswa" >
        
        <NuxtLink to="/admin/siswa/tambah" class="rounded-full my-3 bg-slate-900 text-white font-semibold hover:bg-slate-950 py-2.5 px-3 md:text-lg text-md">Tambah</NuxtLink>
      </SectionTitleLineWithButton>
      <!-- alert all section -->
      <div v-if="!alert" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-6">
        <div class="flex items-center justify-center">
          <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    </div>
      <!-- search button -->
      <div class="flex justify-start mt-2 mb-2">
        <div class="flex gap-3">
          <div class="relative">
            <input type="text" @input="filtersiswa" class="rounded-full border border-gray-300 focus:border-transparent focus:ring-2 focus:ring-gray-200 focus:outline-none text-sm text-gray-600 placeholder-gray-400 py-1 px-3 pl-10 block w-full appearance-none leading-normal ds-input" placeholder="Search">
            <div class="absolute top-0 left-0 inline-flex items-center p-2">
              <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>
        </div>
        </div>
        </div>
      <CardBox class="mb-6" has-table>
        <table>
            <thead>

                <tr>
                    <th>No</th>             
                    <th>Nama</th>  
                    <th>jurusan</th>                 
                    <th>Kelas</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody >
                <tr v-if="!loading">
                    <td colspan="6" class="text-center">
                        <div class="flex justify-center items-center">
                            <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    </td>
                </tr>
                <tr v-for="data,i in siswa" :key="data.id">

                    <td data-label="no">{{ i+1 }}</td>
                    <td data-label="nama">{{ data.nama }}</td>                 
                    <td data-label="jurusans">{{ data.jurusan }}</td>         
                    <td data-label="kelas" class="uppercase">{{ data.kelas }}</td>
                    <td class="before:hidden lg:w-1 whitespace-nowrap ">
                      <div class="flex gap-3">

                        <NuxtLink class="py-1 px-1.5 rounded-md border "  :to="`/admin/siswa/`+data.id" >detail</NuxtLink>
                      <button  @click="deleteSiswa(data.id)" class="py-1 px-2 rounded-md border border-rose-600 text-rose-600">delete</button>
                      </div>
                    </td>
                </tr>
            </tbody>
        </table>
      </CardBox>

     
    </SectionMain>
  </NuxtLayout>
</template>