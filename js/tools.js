// Configuracion general del negocio. Edita estos valores para personalizar la tienda.
const businessConfig = {
  name: "Panaderia STEFANO",
  logo: "https://www.pngmart.com/files/23/Free-Logos-PNG-Clipart.png",
  headerColor: "#fe723e",
  whatsappNumber: "51931993482",
};

// Datos para el carrusel principal
const allCardsData = [
  {
    title: "Ofertas especiales",
    text: "Promocion empanadas de carne y pollo + vaso de chicha morada a solo S/ 10.00",
    img: "https://lh3.googleusercontent.com/pw/AP1GczNtRr5qkFACECIeBKOyb_9St2jcWhXlnbGhMgfnGufpPaP_Exq3hNonyEUp5bBjrw2hYbtzIY0ZBAft1IIZ2457I7VQxx1m40WS3gnNQ9GgCKodP0wG-yAlUeux5zkMLKsGIQWn3RJKFRoMJ0BLw71R=w1672-h941-s-no-gm?authuser=0",
  },
  {
    title: "Ofertas especiales",
    text: "Promocion empanadas de carne y pollo + vaso de cafe a solo S/ 9.00",
    img:"https://lh3.googleusercontent.com/pw/AP1GczNbwzUTF7T-ikCQEbjVJVQ-BK8y1ksswYkCeyE9ljWlgYoyh8MNpSvco1J_MD5SDUnWpxcrkRvGfa9Xwk57H-3BBgXkmmlJQd5eZU9SxRG3x5SAdwmAxyl0t0zXBU38yd9tO6LjRWwxqIz7yBwUaxrk=w1672-h941-s-no-gm?authuser=0",
  },
  {
    title: "Ofertas especiales",
    text: "Promocion enrrollado + vaso de chicha morada a solo S/ 12.00",
    img: "https://lh3.googleusercontent.com/pw/AP1GczNtRr5qkFACECIeBKOyb_9St2jcWhXlnbGhMgfnGufpPaP_Exq3hNonyEUp5bBjrw2hYbtzIY0ZBAft1IIZ2457I7VQxx1m40WS3gnNQ9GgCKodP0wG-yAlUeux5zkMLKsGIQWn3RJKFRoMJ0BLw71R=w1672-h941-s-no-gm?authuser=0",
  },
];

// Datos para los filtros de categoría
const categoryFiltersData = [
  { name: "Filtrar", image: "img/filtro.png", filter: "all" },
  {
    name: "Abarrotes",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczPCcGwxTMTLH215W75VI1EfbX1GRi39yCdrOu13kH-8LVC5xMMSJr8xoctdHeO-iknds9ZaSgE13QKMVMCVcxHeikhKJFQce6tsWFg8ja6nA1NTUBQ",
    filter: "abarrotes",
  },
  {
    name: "Bebidas",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczOmOgJ2HfLCBrkfSQld6t-KKd55sZicYXzukOZ3w6_vVOevEBacbpSicvONm-AZAoEwZxqJDoDkDbhQOT4B9lWiIfLHrtluY_vebPeDjoCHS0wW-vs",
    filter: "bebidas",
  },
  {
    name: "Carnes",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczNf2b6W70ihHX45v6LgjDvB0iczMuYfdf8D1_q1DYRkdyRh2O9J5b_3weqSHMTj2P0hicCzKpXokf-ZAgzuf5ROna7s9djLHr7WARsCjBkxF9u4KJI",
    filter: "carnes",
  },
  {
    name: "Conservas",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczMU5B6TMQnOkjaRg6FuRxDi7oQC0GDpUuQ3MyBUZVaBSUBoCgOdsLgaINb3Dij8dQgHsSTRVAdNaFqFwriYOUZIYWTxup3ihp7AklcnmITb0ZkkoRA",
    filter: "conservas",
  },
  {
    name: "Escolar",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczMBmVGF7XHsdLDqocGrun2GUa40ix4dYApVhorLFoALc09JAazDjRUba-SJNPM0Rn2JyuyB6EotXrLJ8jCachIAKv447jM7cygeje0k079RZIGICKU",
    filter: "escolar",
  },
  {
    name: "Frutas",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczPHzCVY0p7PtW8qh3UYyIxTrUKyflERoJ_Ysa0sB2lPryxCJwlb2ihdN2O6VXWQwg0mPzucMPiNf53HVAUiGY9gV27BKAI3ng6Ei59lUXaoa09ziAw",
    filter: "frutas",
  },
  {
    name: "Higene",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczOe4CQ3wXA38_7EFRSqOSUu4uGBtejngZY5-FuUdBmieK3xWNi94Whpi8lbtL73z8dt-C_iQWvtWJ8-WFc1Kvd1hUfo9NZA3gC_ikjCOcaJ4gey9kM",
    filter: "higene",
  },
  {
    name: "Hogar",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczOt8rCTqx_RtLv-8XD9ErVG_-EKiPoh-WlyOzu8xwVglDXAAOj3b2Nh97o-CPL2cx4dlxgMk5_M_AhdzUtBiBTzhamrDSkVI6S4jb0UASKSj6dSjEY",
    filter: "hogar",
  },
  {
    name: "Lacteos",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczNBmlG4HDJbymVcNv5Zu6ZHQgqtK5OEBlpKUrNfX4f92VSxB7iiQyI7nn5bKqPt6rgmMFXOY1ydL0eh0zVFdDaBeSKxIixfjNRNsvxty5BK22zG3fY",
    filter: "lacteos",
  },
  {
    name: "Limpieza",
    image:
    "https://lh3.googleusercontent.com/pw/AP1GczNtRr5qkFACECIeBKOyb_9St2jcWhXlnbGhMgfnGufpPaP_Exq3hNonyEUp5bBjrw2hYbtzIY0ZBAft1IIZ2457I7VQxx1m40WS3gnNQ9GgCKodP0wG-yAlUeux5zkMLKsGIQWn3RJKFRoMJ0BLw71R=w1672-h941-s-no-gm?authuser=0",
    filter: "limpieza",
  },
  {
    name: "Verduras",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczPtQFmO0XQv3RPp3RJFkGG3RsKtUh6cc9RpISw87fkYdcjQLM1nA-Yxr6UrnnHhmWZZt6OnqkTDek4Mnzahz8j9P5fuSXgUjFAisolOLNllmtlj2RU",
    filter: "verduras",
  },
  {
    name: "PANES",
    image: "https://cdn-icons-png.flaticon.com/512/12651/12651927.png",
    filter: "panes",
  },
];
