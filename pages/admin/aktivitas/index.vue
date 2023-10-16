<script setup>
definePageMeta({
  middleware: 'auth'
})
import {mdiTrashCan,mdiEye} from "@mdi/js";
const aktivitas = ref([]);
const loading = ref(false)
const supabase = useSupabaseClient();
const getaktivitas = async ()=>{
  loading.value = false
    const { data, error } = await supabase
    .from('aktivitas')
    .select()
    .eq('is_deleted', 0)
    .order('id', { ascending: false })
    aktivitas.value = data
    loading.value = true
}
const deleteActvity = async (id)=>{
  if(confirm('Yakin ingin menghapus data?')){

    const { data, error } = await supabase
    .from('aktivitas')
    .update({ is_deleted: 1 })
    .match({ id: id })

  }
  else{
    alert('data tidak jadi dihapus')
    
  }
  getaktivitas()
}
onMounted(()=>{
    getaktivitas()
})

</script>

<template>
  <NuxtLayout name="authenticated">
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="aktivitas" main>
        <NuxtLink to="/admin/aktivitas/tambah" class="rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-950 py-2.5 px-3">Tambah aktivitas</NuxtLink>
      </SectionTitleLineWithButton>
    
      <CardBox class="mb-6 " has-table>
        <table>
            <thead>

                <tr>
                    <th>No</th>
                    <th>Title</th>
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
                <tr  v-for="data,i in aktivitas" :key="data.id">

                    <td data-label="no">{{ i+1 }}</td>
                    <td data-label="Judul">{{ data.judul }}</td>
                   
                    <td>
                      <img :src="data.foto" alt="" class="md:w-[200px] md:h-[150px] max-w-full w-full h-[100%]">
                    </td>
                    <td data-label="desc">{{ data.desc }}</td>
                   
                    <td class="before:hidden lg:w-1 whitespace-nowrap">
                      <div class="flex md:justify-center gap-3">

                        <NuxtLink :to="`/admin/aktivitas/`+data.id" >
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
                              @click="deleteActvity(data.id)"
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