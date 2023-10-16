<template>
    <NuxtLayout name="authenticated">
      <SectionMain>
        <SectionTitleLineWithButton :icon="mdiAccount" main  title="kelas" >
            <NuxtLink to="/admin/datamaster/kelas/tambah" class="rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-950 py-2.5 px-3">Tambah kelas</NuxtLink>
    
        </SectionTitleLineWithButton>
      
        <CardBox class="mb-6 md:w-1/2" has-table>
          <table>
              <thead>
  
                  <tr>
                      <th>No</th>
                      <th>Nama kelas</th>                 
                    
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
                  <tr v-for="data,i in kelas" :key="data.id">
  
                      <td data-label="no">{{ i+1 }}</td>
                      <td data-label="nama">{{ data.nama }}</td>                
                                     
  
                      <td class="before:hidden lg:w-1 whitespace-nowrap ">
                        <div class="flex gap-3">
                            <NuxtLink :to="`/admin/datamaster/kelas/`+data.id" >
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
                                @click="deleteKelas(data.id)"
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
  import { mdiTrashCan,mdiEye } from '@mdi/js';
  const supabase = useSupabaseClient()
  const kelas = ref([])
  const loading = ref(false)
  const alert = ref(false)
  const getKelas = async ()=>{
    loading.value = false
    const {data,error} = await supabase.from('kelas').select('*').eq('is_delete',0)
    .order('id', { ascending: false })
    if(error){
      console.log(error)
    }else{
      kelas.value = data
      loading.value = true
    }
  }
  
  const deleteKelas = async(id)=>{
     alert.value = false
    // use confirm dialog
    const confirm = window.confirm('Are you sure?')
    if(confirm){
        const {data,error} = await supabase.from('kelas').update({is_delete:1}).eq('id',id)
      if(error){
        console.log(error)
      }else{
        alert.value = true
        getKelas()
      }
    }
  }
  onMounted(()=>{
    getKelas()
  })
  </script>