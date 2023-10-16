<script setup>
import { mdiBallotOutline, mdiAccount, mdiGithub } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";




const urlfoto = ref('')

const jurusans = ref([]);
const name = ref('');
const jurusan = ref('');
const kelas = ref('');
const datakelas = ref('');
const alert = ref(false);
const supabase = useSupabaseClient();


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

const sendToDiscord = async (message) => {

  const discordWebhookURL = "https://discord.com/api/webhooks/1162784731843276821/z-hisWYjDeK2ExtfX4kxU9PsZrS6w2snZTuqlh0PE8cf0NZpacZ3mcW6Y0nck6jPxS1S";

  const data = {
    content: message,
  };

  try {
    const response = await fetch(discordWebhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Pesan berhasil dikirim ke Discord");
    } else {
      console.error("Gagal mengirim pesan ke Discord");
    }
  } catch (error) {
    console.error("Gagal mengirim pesan ke Discord:", error);
  }
};

const submit = async () => {
 
  alert.value = false;

  const { data, error } = await supabase.from('siswa').insert({
    nama: name.value,
   jurusan:jurusan.value,
    kelas: kelas.value,
    foto: urlfoto.value,
  });

  alert.value = true;
  
  if (error) {
    console.log(error);
  } else {

    const messageToDiscord = `
      \`\`\` Data Siswa baru ditambahkan:
Nama: ${name.value}
Jurusan: ${jurusan.value}
Kelas: ${kelas.value}
      \`\`\`
      Foto: ${urlfoto.value}
      `;
    sendToDiscord(messageToDiscord);
    navigateTo("/admin/siswa");
  }
};

const reset = async()=>{
  name.value = ''
  jurusan.value = ''
  kelas.value = ''
  urlfoto.value = ''
}

onMounted(()=>{
  getJurusan()
  getKelas()
})
</script>

<template>
  <NuxtLayout name="authenticated">
 
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Tambah siswa"
        main
      >
      </SectionTitleLineWithButton>
      <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert" v-if="false"> 
        <p class="font-bold">Tambah siswa</p>
        <p class="text-sm">Berhasil Menambahkan siswa</p>
      </div>
      <CardBox>
        <form @submit.prevent="submit">
         
          <FormField label="Nama dan Kelas">
            <FormControl v-model="name" placeholder="Masukan Nama" :icon="mdiAccount" />
            <!-- Use a dropdown menu for selecting kelas -->
            <select v-model="kelas" class="block w-full text-sm text-gray-900 border border-gray-800 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 p-2 py-3">
              <option v-for="k in datakelas" :key="k.id" :value="k.nama">{{k.nama}}</option>
            </select>
              
          </FormField>

          <FormField label="Jurusan" help="Masukan Jurusan">
            <select v-model="jurusan" class="block w-full text-sm text-gray-900 border border-gray-800 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 p-2 py-3">
              <option v-for="j in jurusans" :key="j.id" :value="j.nama">{{j.nama}}</option>
            </select>
          </FormField>
          <FotoSiswa v-model:path="urlfoto" />
         
          
          <div class="mt-4">
            <BaseButtons>
              <button type="submit" class="py-2 px-5 bg-blue-500 rounded-md text-white hover:bg-sky-500">Tambah</button>
              <BaseButton @click="reset" color="info" outline label="Reset" />
            </BaseButtons>
          </div>
        </form>
      </CardBox>
    </SectionMain>
  </NuxtLayout>
</template>
