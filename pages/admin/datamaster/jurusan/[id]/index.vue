<script setup>
definePageMeta({
  middleware: 'auth'
})
const nama = ref('');
const alert = ref(false);
const supabase = useSupabaseClient();
const $route = useRoute()

const getJurusan = async ()=> {
    const { data, error } = await supabase
    .from('jurusan')
    .select()
    .eq('id', $route.params.id)
    console.log(data[0].nama)
    nama.value = data[0].nama
}

const submit = async () => {
    alert.value = false;
    
    const { data, error } = await supabase.from('jurusan').update({
        nama: nama.value,
    }).eq('id', $route.params.id);
    
    alert.value = true;
    
    if (error) {
        console.log(error);
    } else {
        navigateTo("/admin/datamaster/jurusan");
    }
};

onMounted(()=>{
    getJurusan();
})
</script>

<template>
  <NuxtLayout name="authenticated">
 
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Tambah Jurusan"
        main
      >
      </SectionTitleLineWithButton>
      <div class="bg-blue-100 bordeconst kelas = ref('');r-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert" v-if="false"> 
        <p class="font-bold">Tambah Jurusan</p>
        <p class="text-sm">Berhasil Menambahkan Jurusan</p>
      </div>
      <CardBox>
       
        <form @submit.prevent="submit">
         
          <FormField label="nama">
            <FormControl v-model="nama" placeholder="Masukan Nama Jurusan" :icon="mdiAccount" />
            
          
          </FormField>

        
          <div class="mt-5">
            <BaseButtons>
              <button type="submit" class="py-2 px-5 bg-blue-500 rounded-md text-white hover:bg-sky-500">Tambah</button>
              <BaseButton type="reset" color="info" outline label="Reset" />
            </BaseButtons>
          </div>
        </form>
      </CardBox>
    </SectionMain>
  </NuxtLayout>
</template>
