<script setup>
definePageMeta({
  middleware: 'auth'
})

const urlfoto = ref('');

const title = ref('');
const desc = ref('');


const alert = ref(false);
const supabase = useSupabaseClient();

const sendToDiscord = async (message) => {

  const discordWebhookURL = "https://discord.com/api/webhooks/1162793024099725432/O_g8CF_7DH9tjVtWHVL7wzmDDO0_areziesM8LapCC-PYJ3GSh1YtvzM437SrkaPLa0a";

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
  
  const { data, error } = await supabase.from('aktivitas').insert({
    judul: title.value,
    desc: desc.value,
    foto: urlfoto.value,
    is_deleted: 0,
  });

  alert.value = true;

  if (error) {
    console.log(error);
  } else {

    const messageToDiscord = `**${title.value}**\n\n${desc.value}\n\n${urlfoto.value}`;
    sendToDiscord(messageToDiscord);
    navigateTo("/admin/aktivitas");
  }
};


</script>

<template>
  <NuxtLayout name="authenticated">
 
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Tambah Aktivitas"
        main
      >
      </SectionTitleLineWithButton>
      <div class="bg-blue-100 bordeconst kelas = ref('');r-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert" v-if="false"> 
        <p class="font-bold">Tambah Mahasiswa</p>
        <p class="text-sm">Berhasil Menambahkan Mahasiswa</p>
      </div>
      <CardBox>
        <form @submit.prevent="submit">
         
          <FormField label="title">
            <FormControl v-model="title" placeholder="Masukan Judul" :icon="mdiAccount" />
            
          
          </FormField>

          <FormField label="Desc" help="Your Desc ">
          <FormControl
          v-model="desc"
            type="textarea"
            placeholder="Masukan Dekripsi"
          />
        </FormField>
          <FotoActivity v-model:path="urlfoto"  />
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
