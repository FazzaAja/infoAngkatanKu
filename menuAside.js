import {
  mdiAccountCircle,
  mdiMonitor,
  mdiBook,
  mdiHandCoin,
  mdiHistory,
  mdiAccount,
  mdiNewspaper,
  mdiMailbox,
  mdiChartBox,
} from "@mdi/js";

export default [
  {
    to: "/admin",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  {
    label: "Siswa",
    icon: mdiAccountCircle,
    menu: [
      {
        to: "/admin/siswa",
        label: "List Siswa",
      },
      {
        to: "/admin/siswa/tambah",
        label: "Tambah Siswa  ",
      },
    ],
  },
  {
    label: "Ebook",
    icon: mdiBook,
    menu: [
      {
        to: "/admin/ebook",
        label: "List Ebook",
      },
      {
        to: "/admin/ebook/tambah",
        label: "Tambah Ebook  ",
      },
    ],
  },
  {
    to: "/admin/aktivitas",
    label: "Aktivitas",
    icon: mdiHistory,
  },
  {
    to: "/admin/berita",
  label: "Berita",
    icon: mdiNewspaper,
  },
  {
    label: "User",
    icon: mdiAccount,
    menu: [
      {
        to: "/admin/user",
        label: "List User",
      },
      {
        to: "/admin/user/tambah",
        label: "Tamabah User",
      },
    ],
  },
  {
    to: "/admin/masukan",
    label: "Masukan",
    icon: mdiMailbox,
  },
  {
    label: "Data Master",
    icon: mdiChartBox,
    menu: [
      {
        to: "/admin/datamaster/jurusan",
        label: "Jurusan",
      },
      {
        to: "/admin/datamaster/kelas",
        label: "Kelas   ",
      },
    ],
  },
 
  

  
];
