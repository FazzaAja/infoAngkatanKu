<script setup>
definePageMeta({
  middleware: 'auth'
})
import {mdiTrashCan,mdiEye,mdiDownload} from "@mdi/js";
const berita = ref([]);
const loading = ref(false)
const supabase = useSupabaseClient();
const getBerita = async ()=>{
  loading.value = false
    const { data, error } = await supabase
    .from('berita')
    .select()
    .eq('is_delete', 0)
    .order('id', { ascending: false })
    berita.value = data
    loading.value = true
}
const deleteBerita = async (id)=>{
  if(confirm('Yakin ingin menghapus data?')){

    const { data, error } = await supabase
    .from('berita')
    .update({ is_deleted: 1 })
    .match({ id: id })

  }
  else{
    alert('data tidak jadi dihapus')
    
  }
  getBerita()
}

const downloadImage = (imageUrl) => {
 
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = imageUrl; // Gunakan URL gambar sebagai tautan unduhan
  a.download = "Screenshot from 2023-10-11 20-02-45.png"; // Ganti dengan nama gambar yang sesuai
  document.body.appendChild(a);


  a.click();

  document.body.removeChild(a);
};

onMounted(()=>{
    getBerita()
})

</script>

<template>
  <NuxtLayout name="authenticated">
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Berita" main>
        <NuxtLink to="/admin/berita/tambah" class="rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-950 py-2.5 px-3">Tambah Berita</NuxtLink>
      </SectionTitleLineWithButton>
    
      <CardBox class="mb-6 " has-table>
        <table>
            <thead>

                <tr>
                    <th>No</th>
                    <th>Judul</th>
                    <th>Foto</th>
                    <th>Desc</th>
                    <th>dwonload img</th>
                    <th>action</th>
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
                <tr  v-for="data,i in berita" :key="data.id">

                    <td data-label="no">{{ i+1 }}</td>
                    <td data-label="Judul">{{ data.judul }}</td>
                   
                    <td>
                      <img :src="data.foto" alt="" class="md:w-[200px] md:h-[150px] max-w-full w-full h-[100%]">
                    </td>
                    <td data-label="desc">{{ data.desc }}</td>
                    <td data-label="dwonload">  
                    <a @click="downloadImage(data.foto)">
                      <BaseButton color="danger" :icon="mdiDownload" small />
                    </a>
                  </td>

                    <td class="before:hidden lg:w-1 whitespace-nowrap">
                      <div class="flex md:justify-center gap-3">

                        <NuxtLink :to="`/admin/berita/`+data.id" >
                          <BaseButton
                              color="danger"
                              :icon="mdiEye"
                              small
                              
                              />
                        </NuxtLink>
                          <BaseButtons type="justify-start lg:justify-end" no-wrap>
                              <BaseButton
                              color="danger"
                              :icon="mdiTrashCan"
                              small
                              @click="deleteBerita(data.id)"
                              />
                          </BaseButtons>
                      </div>
                    </td>
                </tr>
            </tbody>
        </table>
      </CardBox>

     
    </SectionMain>
  </NuxtLayout>
</template>