<template>
    <div>
        <nav
        class="hidden md:flex bg-white fixed w-full md:h-20 lg:h-16 top-0 left-0 shadow z-10 justify-around items-center"
      >
        <img src="/silogo.png" class="w-13 h-13" />
        <ul
          class="flex justify-between active:text-[#63B4FF] md:gap-5 md:text-sm lg:text-md lg:gap-12 cursor-pointer"
        >
        
        <li ><nuxt-link to="/">Beranda</nuxt-link></li>
                <li ><nuxt-link to="/mahasiswa">Mahasiswa</nuxt-link></li>
                <li ><nuxt-link to="/ebook">Ebook</nuxt-link></li>
                <li ><nuxt-link to="/aktivitas">Aktivitas</nuxt-link></li>
                <li ><nuxt-link to="/berita">Berita</nuxt-link></li>
                <li ><nuxt-link to="/masukan">Masukkan</nuxt-link></li>
        </ul>
        <div class="rounded-full focus:outline-none hover:bg-gray-800 bg-[#B4B4B4] md:flex items-center w-24 h-9">
          <button class="rounded-full w-8 h-7 bg-[#FFE500] mx-1"></button>
        </div>
      </nav>

      <!-- Nav Mobile -->
      <nav class="flex justify-around gap-20 items-center fixed bg-white top-0 left-0 w-full h-16 z-40 md:hidden">
        <img src="/silogo.png" class="w-13 h-13" />
        <button class="group">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
            <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
          </svg>
          <div class="absolute my-3 -right-full w-full h-auto bg-white opacity-0 border transform group-focus:right-0 group-focus:opacity-100 transition-all duration-300">
              <ul class="flex flex-col items-center w-full cursor-pointer">
                <li class="my-4"><nuxt-link to="/">Beranda</nuxt-link></li>
                <li class="my-4"><nuxt-link to="/mahasiswa">Mahasiswa</nuxt-link></li>
                <li class="my-4"><nuxt-link to="/ebook">Ebook</nuxt-link></li>
                <li class="my-4"><nuxt-link to="/aktivitas">Aktivitas</nuxt-link></li>
                <li class="my-4"><nuxt-link to="/berita">Berita</nuxt-link></li>
                <li class="my-4"><nuxt-link to="/masukan">Masukkan</nuxt-link></li>
                 <div class="rounded-full focus:outline-none bg-gray-800 bg-[#B4B4B4] w-24 h-10">
                  <button class="rounded-full w-9 h-8 -ml-12 mt-1 bg-[#FFE500]"></button>
                </div>
              </ul>
          </div>
        </button>
      </nav>     
    </div>
</template>
<script>


</script>