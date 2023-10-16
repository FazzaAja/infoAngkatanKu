<template>
  <NuxtLayout name="authenticated">
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" main  title="Masukan Form" >
      </SectionTitleLineWithButton>
    
      <CardBox class="mb-6" has-table>
        <table>
            <thead>

                <tr>
                    <th>No</th>
                    <th>Dari</th>                 
                    <th>Pesan</th>
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
                <tr v-for="data,i in masukan" :key="data.id">

                    <td data-label="no">{{ i+1 }}</td>
                    <td data-label="Dari">{{ data.nama }}</td>                
                    <td data-label="Pesan">{{ data.desc }}</td>                 

                    <td class="before:hidden lg:w-1 whitespace-nowrap ">
                      <div class="flex gap-3">
                        <BaseButtons type="justify-start lg:justify-end" no-wrap>
                              <BaseButton
                              color="danger"
                              :icon="mdiTrashCan"
                              small
                              @click="deleteMasukan(data.id)"
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


<script setup>
import { mdiTrashCan } from '@mdi/js';
const supabase = useSupabaseClient()
const masukan = ref([])
const loading = ref(false)
const alert = ref(false)
const getMasukan = async ()=>{
  loading.value = false
  const {data,error} = await supabase.from('masukan').select().eq('is_delete',0)
  if(error){
    console.log(error)
  }else{
    masukan.value = data
    loading.value = true
  }
}

const deleteMasukan = async(id)=>{
   alert.value = false
  // use confirm dialog
  const confirm = window.confirm('Are you sure?')
  if(confirm){
    const {data,error} = await supabase.from('masukan').update({is_delete:1}).eq('id',id)
    if(error){
      console.log(error)
    }else{
      alert.value = true
      getMasukan()
    }
  }
}
onMounted(()=>{
  getMasukan()
})
</script>