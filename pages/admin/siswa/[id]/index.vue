<script setup>

import {
  mdiAccount,
  mdiMail,


} from "@mdi/js";



const url = ref("https://wsgwhdbimgdepfxktxlo.supabase.co/storage/v1/object/public/siswa/");
const fotopath = ref();
const nama = ref()
const jurusan = ref()
const kelas = ref()
const supabase = useSupabaseClient()
const payment = ref([])
const $route = useRoute()
const loading = ref(false)
const alert = ref(false)
const datakelas = ref([])
const jurusans = ref([])


const updateSiswa = async()=>{
    // validate jika foto kosong jangan update fotonya
   alert.value = false
    if(fotopath.value ){
        const {data,error} = await supabase.from('siswa').update({
            nama: nama.value,
            jurusan: jurusan.value,
            kelas: kelas.value,
        }).eq('id', $route.params.id)
        if(error){
            console.log(error)
        }
        else{
            alert.value = true
            getSingleSiswa()
        }
    }else{

      const {data,error} = await supabase.from('siswa').update({
          nama: nama.value,
          jurusan: jurusan.value,
          kelas: kelas.value,
          foto: url.value + fotopath.value
      }).eq('id', $route.params.id)
      if(error){
          console.log(error)
      }
      else{
          alert.value = true
          getSingleSiswa()
         
      }
    }
    
 
   
}





const getSingleSiswa = async() => {
    const { data, error } = await supabase.from("siswa").select().eq('id', $route.params.id)
    if (data[0]) {
        const siswaData = data[0];
        nama.value = siswaData.nama || '';
        jurusan.value = siswaData.jurusan || '';
        kelas.value = siswaData.kelas || '';
        fotopath.value = siswaData.foto || '';
    }
    if (error) {
        console.log(error)
    }
}
const getJurusan = async ()=>{
  const {data,error} = await supabase.from('jurusan').select()
  if(error){
    console.log(error)
  }else{
    jurusans.value = data
  }
}

const getKelas = async () =>{
  const {data,error} = await supabase.from('kelas').select()
  datakelas.value = data
}
// const getsiswaPayment = async () => {
//   loading.value = false;
//   const { data, error } = await supabase
//     .from("payment")
//     .select("tanggal_bayar,siswa_id(nama,kelas),total_bayar,payment_id(nama_pembayaran)")
//     .eq('siswa_id', $route.params.id);
  
//   if (error) {
//     console.log(error);
//   } else {
//     payment.value = data || []; // Ensure payment is an array
//     loading.value = true;
//   }
// };
// const calculateTotalPaymentPerNamaPembayaran = computed(() => {

//   const totalPerNamaPembayaran = {};

//   for (const data of payment.value) { // Access the array
//     const namaPembayaran = data.payment_id.nama_pembayaran;
//     const total = data.total_bayar;

//     if (!totalPerNamaPembayaran[namaPembayaran]) {
//       totalPerNamaPembayaran[namaPembayaran] = 0;
//     }

//     totalPerNamaPembayaran[namaPembayaran] += total;
//   }

//   return totalPerNamaPembayaran;
// });


onMounted(() => {
  getJurusan()
  getKelas()
    getSingleSiswa()
    // getNamaPembayaran()
})
</script>

<template>
  <NuxtLayout name="authenticated">
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="Profile" main>
       
      </SectionTitleLineWithButton>
        <!--alert  -->
        <NotificationBarInCard v-if="alert" class="mb-6" type="success">
          Data berhasil di update
        </NotificationBarInCard>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        <SiswaCard class="mb-6" />
        <form method="post" @submit.prevent="updateSiswa">
        <CardBox>
          <FormField label="New Profile" help="Max 500kb">
            <FotoSiswa v-model:path="fotopath"/>
          </FormField>

          <FormField label="nama" help="Masukan nama baru">
            <FormControl
            v-model="nama"
              :icon="mdiAccount"
              name="nama"
              required
              autocomplete="nama"
            />
          </FormField>
          <FormField label="jurusan" help="Masukan jurusan baru">
           <!-- select -->
            <select v-model="jurusan" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 p-2">
                <!-- looping the jurusan -->
                <option v-for="j in jurusans" :key="j.id" :value="j.nama">{{j.nama}}</option>
              </select>
          </FormField>
          <select v-model="kelas" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 p-2">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
            </select>

       
            <BaseButtons class="mt-5">
              <button type="submit" class="py-2 px-5 bg-blue-500 rounded-md text-white hover:bg-sky-500">Update</button>

              <BaseButton color="info" label="Back" to="/admin/siswa" outline />
            </BaseButtons>
         
          </CardBox>
        </form>

      
          <BaseDivider />

          
          
        </div>
        

    </SectionMain>
  </NuxtLayout>
</template>