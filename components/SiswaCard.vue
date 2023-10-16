<script setup>

const supabase = useSupabaseClient()

const siswa = ref();
const $route = useRoute();

const getSinglesiswa = async()=>{
    const {data,error} = await supabase.from("siswa").select().eq('id',$route.params.id)
    siswa.value = data
    if(error){
        console.log(error)
    }
}

onMounted(()=>{
    getSinglesiswa()
})
</script>

<template>
  <CardBox v-for="data in siswa" :key="data.id">
    <BaseLevel type="justify-around lg:justify-center h-full">
      <img :src="data.foto" 
      class=" block h-full min-w-[300px] bg-clip-content  max-w-full bg-gray-100 dark:bg-slate-800 lg:mx-12"
       alt="">
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <div class="flex justify-center md:block">
        
        </div>
        <h1 class="text-2xl">
          Nama, <b>{{ data .nama }}</b
          >
        </h1>
        <p>NPM <b>{{ data.npm }}</b></p>
        <div class="flex justify-center md:block">
          <PillTag :label="`Kelas `+data.kelas" color="info" :icon="mdiCheckDecagram" />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
