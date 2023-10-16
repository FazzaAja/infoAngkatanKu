<script setup>
definePageMeta({
  middleware: 'auth'
})
import {mdiTrashCan,mdiEye,mdiDownload} from "@mdi/js";
const ebook = ref([]);
const loading = ref(false)
const supabase = useSupabaseClient();
const getEbook = async ()=>{
  loading.value = false
    const { data, error } = await supabase
    .from('ebook')
    .select()
    .eq('is_deleted', 0)
    .order('id', { ascending: false })
    ebook.value = data
    loading.value = true
}
const deleteEbook = async (id)=>{
  if(confirm('Yakin ingin menghapus data?')){

    const { data, error } = await supabase
    .from('ebook')
    .update({ is_deleted: 1 })
    .match({ id: id })

  }
  else{
    alert('data tidak jadi dihapus')
    
  }
  getEbook()
}
onMounted(()=>{
    getEbook()
})

</script>

<template>
  <NuxtLayout name="authenticated">
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="ebook" main>
        <NuxtLink to="/admin/ebook/tambah" class="rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-950 py-2.5 px-3">Tambah ebook</NuxtLink>
      </SectionTitleLineWithButton>
    
      <CardBox class="mb-6 " has-table>
        <table>
            <thead>

                <tr>
                    <th>No</th>
                    <th>Judul</th>
                    <th>Jurusan</th>
                    <th>Foto</th>
                    <th>Desc</th>
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
                <tr  v-for="data,i in ebook" :key="data.id">

                    <td data-label="no">{{ i+1 }}</td>
                    <td data-label="Judul">{{ data.judul }}</td>
                    <td data-label="Jurusan">{{ data.jurusan }}</td>
                    <td data-label="dwonload file">
                     <!-- button lihat file -->
                      <a :href="data.foto" target="_blank" class="">
                      <!-- icon dwonload -->
                      <BaseButton color="primary" :icon="mdiDownload" small />
                      </a>
                    </td>
                    <td data-label="desc">{{ data.desc }}</td>
                   
                    <td class="before:hidden lg:w-1 whitespace-nowrap">
                      <div class="flex md:justify-center gap-3">

                        <NuxtLink :to="`/admin/ebook/`+data.id" >
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
                              @click="deleteEbook(data.id)"
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