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
  {
    title: "Ofertas especiales",
    text: "Promocion enrrollado de hot dog + un vaso de chicha morada a solo S/ 9.00",
    img: "https://lh3.googleusercontent.com/pw/AP1GczOiYfFos7R6Vv5GNhf22SOYaqSZ4YbNoKQ7G2PLy-wznPRNKEbMD8TnrKzqXj6RkwBnbMb0zdQFDeTInJU8xx7fTihmSdVOq57U5WdRW8YomrNj1vG2RRp4im0VpoK1xfCK1q7QsD1IgCROCAfJvnc9=w1199-h670-s-no-gm?authuser=0",
  },
];

// Datos para los filtros de categoría
const categoryFiltersData = [
  { name: "Sin filtro", image: "img/filtro.png", filter: "all" }, 
  {
    name: "Panes",
    image: "https://img.magnific.com/vector-gratis/icono-comida-panaderia-hogaza-pan-blanco_1951-760.jpg?semt=ais_hybrid&w=740&q=80",
    filter: "panes",
  }, 
  {
    name: "Bocaditos",
    image: "https://img.magnific.com/vector-premium/icono-postre-dulce-plato-ceramica_1310786-33982.jpg?semt=ais_hybrid&w=740&q=80",
    filter: "bocaditos",
  }, 
  {
    name: "Embutidos",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFdjRbW_ZaURUKWM_zNwAEIqZ-e6dhtbkYqy3ld-W1cg&s=10",
    filter: "embutidos",
  },
  {
    name: "Reposteria",
    image: "https://images.emojiterra.com/microsoft/fluent-emoji/15.1/512px/1f370_color.png",
    filter: "reposteria",
  },
  {
    name: "Tortas",
    image: "https://cdn3d.iconscout.com/3d/premium/thumb/torta-de-cumpleanos-3d-icon-png-download-15163386.png",
    filter: "tortas",
  },
  {
    name: "Lacteos",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczNBmlG4HDJbymVcNv5Zu6ZHQgqtK5OEBlpKUrNfX4f92VSxB7iiQyI7nn5bKqPt6rgmMFXOY1ydL0eh0zVFdDaBeSKxIixfjNRNsvxty5BK22zG3fY",
    filter: "lacteos",
  },
  {
    name: "Bebidas",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczOmOgJ2HfLCBrkfSQld6t-KKd55sZicYXzukOZ3w6_vVOevEBacbpSicvONm-AZAoEwZxqJDoDkDbhQOT4B9lWiIfLHrtluY_vebPeDjoCHS0wW-vs",
    filter: "bebidas",
  },
  {
    name: "Conservas",
    image:
      "https://media.istockphoto.com/id/1067347134/es/vector/conjunto-de-alimentos-enlatados.jpg?s=612x612&w=0&k=20&c=mWs0Jobi3oeCo4GHTcRcxrChUFMxJWUTSDYeymB-Ib4=",
    filter: "conservas",
  },
  {
    name: "Higene",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczOe4CQ3wXA38_7EFRSqOSUu4uGBtejngZY5-FuUdBmieK3xWNi94Whpi8lbtL73z8dt-C_iQWvtWJ8-WFc1Kvd1hUfo9NZA3gC_ikjCOcaJ4gey9kM",
    filter: "higene",
  },
];
