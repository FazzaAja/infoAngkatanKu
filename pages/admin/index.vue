<script setup>
definePageMeta({
  middleware: 'auth'
})
import {
  mdiBook,
  mdiChartTimelineVariant,
  mdiTrashCan,
  mdiAccountMultiple,
  mdiMail

} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";

import CardBox from "@/components/CardBox.vue";




const supabase = useSupabaseClient();

const ebook = ref([]);
const chartData = ref([]);
const siswa  = ref([])
const masukan = ref([])
const countSiswa = async ()=>{
  const {data,error} = await supabase.from('siswa').select('id')
  siswa.value = data

}
 const countEbook = async ()=>{
  const {data,error} = await supabase.from('ebook').select('id')
  ebook.value = data
 }

 const countMasukan = async ()=>{
  const {data,error} = await supabase.from("masukan").select('id')
  masukan.value = data
 }


onMounted(()=>{
  countSiswa()
  countEbook()
  countMasukan()
})

</script>

<template >
  <div>

    <NuxtLayout name="authenticated">
      <SectionMain>
        <SectionTitleLineWithButton
          :icon="mdiChartTimelineVariant"
          title="Overview"
          main
        >
        
        </SectionTitleLineWithButton>
  
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget
            trend="12%"
            trend-type="up"
            color="text-emerald-500"
            :icon="mdiAccountMultiple"
            :number="siswa.length"
            label="Siswa"
            class="border border-slate-200"
          />
          <CardBoxWidget
            trend="12%"
            trend-type="down"
            color="text-blue-500"
            :icon="mdiBook"
            :number="ebook.length"
            prefix=""
            label="Ebook"
            class="border border-slate-200"
          />
          <CardBoxWidget
            trend="jumlah masukan"
            trend-type="alert"
            color="text-red-500"
            :icon="mdiMail"
            :number="masukan.length"
           
            label="Masukan"
            class="border border-slate-200"
          />
        </div>
  
    
  
        <CardBox has-table class="md:w-1/2 w-full">
          <table>
            <thead>
              <tr>
                <th >no</th>
                <th >Pembayaran</th>
                <th >Jumlah Uang</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data,i in chartData" :key="i">
                <td data-label="no">{{ i+1 }}</td>
                <td data-label="pembayaran">{{ data.nama_pembayaran }}</td>
                <td data-label="jumlah uang">{{ data.total_bayar }}</td>
              </tr>
            </tbody>
          </table>
        </CardBox>
      </SectionMain>
    </NuxtLayout>
  </div>
</template>