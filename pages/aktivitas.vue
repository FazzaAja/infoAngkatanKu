<script setup>
// import LayoutGuest from '@/layouts/LayoutGuest.vue'
// ...
</script>

<template>
  <div>
    <!-- <Head>
            <Title>ROAST - Home</Title>
         </Head> -->
         <NuxtLayout>
            <MyNavbar/>

            <section class="pt-16 pb-16">
                <div class="container">
                    <div class="w-full px-4">
                        <div class="max-w-xl mx-auto text-center mb-16">
                            <h2
                                class="font-bold text-3xl text-[#5FBCFF] mb-4 md:text-4xl lg:text-5xl"
                            >
                                Aktivitas
                            </h2>
                            <div
                                class="bg-[#FFC700] h-0.5 my-5 rounded-full"
                            ></div>
                        </div>
                    </div>

                    <div class="w-full px-4 flex flex-wrap justify-center">
                        <div class="mb-12 md:w-1/2 xl:w-1/2">
                            <div
                                class="rounded-md xl:rounded-r-none shadow-md overflow-hidden bg-[#808080E5] h-96 pt-2 px-4"
                            >
                                <div class="text-3xl my-5 basis-1/2">
                                    <p
                                        class="text-[#5FBCFF] font-bold text-2xl pb-2"
                                    >
                                        SISTEM INFORMASI
                                    </p>

                                    <p class="text-lg text-white">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Facilis expedita
                                        nulla, nisi doloremque reprehenderit,
                                    </p>
                                    <div
                                        class="bg-white h-0.5 w-5/6 my-5 rounded-full"
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div class="mb-12 md:w-1/2 xl:w-1/2">
                            <div
                                class="rounded-md xl:rounded-l-none shadow-md overflow-hidden bg-[#5FBCFF] h-96 px-4 py-4"
                            >
                                <div
                                    class="rounded-md shadow-md overflow-hidden h-full w-full"
                                >
                                    <img
                                        src="test.jpg"
                                        alt=""
                                        width="w-13 h-16"
                                    />
                                </div>
                                <h3
                                    class="font-semibold text-xl text-dark mt-5 mb-3 text-center"
                                >
                                    Fazza
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <MyFooter/>
        </NuxtLayout>
  </div>
</template>