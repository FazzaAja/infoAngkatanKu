<script setup>

</script>

<template>
  <div id="body" class="py-28 lg:py-0 lg:mx-0">
    <NuxtLayout>
      <!-- Nav Tablet & PC -->
     <MyNavbar/>

      <!-- Main section -->
      <section class="container columns-1 px-3 mx-2 md:px-24 lg:px-32 lg:mx-0 lg:my-20 lg:py-20">
        <div class="flex flex-col md:flex-nowrap lg:flex-row">
          <div class="text-xl md:text-3xl my-5 lg:basis-1/2">
            <p class="text-[#63B4FF] text-3xl md:text-4xl">Info Anfkatanku</p>
            <p class="text-[#606060]">SMKN 4 Tasikmalaya</p>
            <div class="bg-[#FFC700] h-0.5 w-5/6 my-5 rounded-full"></div>
            <p class="text-sm md:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              expedita nulla, nisi doloremque reprehenderit, sit illo error
              quisquam magnam eveniet consectetur suscipit delectus quo
              repellendus possimus inventore aperiam quaerat non!
            </p>
          </div>
          <img src="@/assets/image/home.png" class="my-20 lg:my-0 lg:basis-1/2" />
        </div>
      </section>

      <!-- Mahasiswa section  style="background-image: url(/a.jpeg)" -->
      <section id="portfolio" class="pt-16 pb-16 bg-[#5FBCFF]">
                <div class="px-10 items-center">
                    <div class="w-full px-4">
                        <div class="max-w-xl mx-auto text-center mb-16">
                            <h2
                                class="font-bold text-3xl text-white mb-4 md:text-4xl lg:text-5xl"
                            >
                                Siswa
                            </h2>
                        </div>
                    </div>

                    <div class="w-full px-4 flex flex-wrap justify-center items-center" v-for="ma in mahasiswa " :key="ma.id">
                        <div class="mb-12 p-4 md:w-1/2 xl:w-1/4" >
                            <div
                                class="rounded-md shadow-md overflow-hidden bg-white h-96 pt-2 px-4"
                            >
                                <div
                                    class="rounded-md shadow-md overflow-hidden h-72 w-full"
                                >
                                    <img
                                        :src="ma.foto"
                                        alt=""
                                        width="w-13 h-16"
                                    />
                                </div>
                                <h3
                                    class="font-semibold text-xl text-dark mt-5 mb-3 text-center"
                                >
                                    {{ ma.nama }} <span class="text-blue-500">{{ ma.jurusan }}</span>
                                </h3>
                            </div>
                        </div>

                      
                       
                       
                    </div>
                </div>
            </section>
            <MyFooter/>
    </NuxtLayout>
  </div>

</template>
<script setup>
const supabase = useSupabaseClient()
const mahasiswa = ref([])
const getMahasiswa = async()=>{
  const {data,error} = await supabase
  .from('mahasiswa')
  .select()
  .eq('is_deleted',0)
  .order('id',{ascending:false})
  mahasiswa.value = data

}
onMounted(()=>{
  getMahasiswa()
})
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap");

#body {
  font-family: "Poppins", sans-serif;
}
</style>
