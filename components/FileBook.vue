<!-- components/.vue -->
<template>
    <div>
      <input type="file" @change="uploadFile" accept=".pdf, .docx, .ppt" class="w-full dark:bg-gray-800 py-2 rounded-md border border-gray-900 "/>
    </div>
  </template>
  
  <script setup>
  import { BlobServiceClient } from "@azure/storage-blob";
  
  const urlfile = ref('')
  const dwonload = ref('')
  // props
  const props = defineProps(["path"])  
  const emit = defineEmits(["update:path", "upload"])
     const uploadFile =  async (event) =>{
        const file = event.target.files[0];
      if (file) {
        const connection_string ="BlobEndpoint=https://infoangkatanku.blob.core.windows.net/;QueueEndpoint=https://infoangkatanku.queue.core.windows.net/;FileEndpoint=https://infoangkatanku.file.core.windows.net/;TableEndpoint=https://infoangkatanku.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-10-15T00:02:15Z&st=2023-10-14T16:02:15Z&spr=https,http&sig=WNHC5FemyO8YXvuiuTCG4r4DIzsmCc9sJ0pIgk52uvU%3D"
           const blobServiceClient = BlobServiceClient.fromConnectionString(connection_string);
          
          const containerClient = blobServiceClient.getContainerClient("ebook");
          
          const blockBlobClient = containerClient.getBlockBlobClient(file.name);
       
  
  
          try {
            
            await blockBlobClient.uploadBrowserData(file, { blobHTTPHeaders: { blobContentType: "pdf/docx" } });
      console.log("Image uploaded successfully!");
     
      urlfile.value = blockBlobClient.url;
    const download = containerClient.getBlobClient(file.name).url
    
    console.log(dwonload)
      emit('update:path', urlfile.value)
      emit('upload')
      
  console.log(urlfile.value)
            
          } catch (error) {
            console.error("Failed to upload image:", error);
          }
        }
      }
   
  
  </script>
  