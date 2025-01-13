import pequeninImg from '../assets/images/tienda-pequenin.png';
import koalaImg from '../assets/images/tienda-koala.png';
import esperarteImg from '../assets/images/tienda-esperarte.png';
import splashImg from '../assets/images/tienda-splash.png';
import adorableImg from '../assets/images/tienda-adorable.png';
import mammaImg from '../assets/images/tienda-mamma.png';
import belloCottonImg from '../assets/images/tienda-bello-cotton.png';
import soneContigoImg from '../assets/images/tienda-sone-contigo.png';
import wanitosImg from '../assets/images/tienda-wanitos.png';
import babyBirdImg from '../assets/images/tienda-baby-bird.png';
import babyClothe1 from '../assets/images/productos/ropa-bebe1.png';
import babyClothe2 from '../assets/images/productos/ropa-bebe2.png';
import babyClothe3 from '../assets/images/productos/ropa-bebe3.png';
import babyClothe4 from '../assets/images/productos/ropa-bebe4.png';
import babyClothe5 from '../assets/images/productos/ropa-bebe5.png';
import babyClothe6 from '../assets/images/productos/ropa-bebe6.png';
import momProduct1 from '../assets/images/productos/ropa-mama1.png';
import momProduct2 from '../assets/images/productos/ropa-mama2.png';
import momProduct3 from '../assets/images/productos/ropa-mama3.png';
import momProduct4 from '../assets/images/productos/ropa-mama4.png';
import momProduct5 from '../assets/images/productos/ropa-mama5.png';
import momProduct6 from '../assets/images/productos/ropa-mama6.png';
import accesory1 from '../assets/images/productos/accesorio-bebe1.png';
import accesory2 from '../assets/images/productos/accesorio-bebe2.png';
import accesory3 from '../assets/images/productos/accesorio-bebe3.png';
import accesory4 from '../assets/images/productos/accesorio-bebe4.png';
import accesory5 from '../assets/images/productos/accesorio-bebe5.png';
import accesory6 from '../assets/images/productos/accesorio-bebe6.png';
export const carouselResponsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1025 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 468, min: 320 },
      items: 1
    }
  };

export const ciudades = ['La Paz', 'Tarija', 'Sucre', 'Cochabamba','Santa Cruz','Beni', 'Pando','Oruro','Potosí'];

export const colors=[{
  nombre:'rojo',
  color:'red'
},{
  nombre:'negro',
  color:'black'
},{
  nombre:'blanco',
  color:'white'
},{
  nombre:'rosa',
  color:'pink'

},{
  nombre:'azul',
  color:'blue'
},{
  nombre:'plomo',
  color:'gray'
}]

export const Categories=[
  {
      nombre:'Pequeñin',
      img: pequeninImg
  },
  {
      nombre:'Koala',
      img: koalaImg
  },
  {
      nombre:'Esperarte',
      img:esperarteImg
  },
  {
      nombre:'Splash',
      img:splashImg
  },
  {
      nombre:'Adorable',
      img:adorableImg
  },
  {
      nombre:'Mamma',
      img:mammaImg
  },
  {
      nombre:'Bello Cotton',
      img:belloCottonImg
  },
  {
      nombre:'Soñe Contigo',
      img:soneContigoImg
  },
  {
      nombre:'Wanitos',
      img:wanitosImg
  },
  {
      nombre:'Baby Bird',
      img:babyBirdImg
  },
]

export const ProductTypes=[
  {
      tipo:'Ropa de Bebe',
      items:[
          {
              id:'113qwewqwqewq',
              nombre:'Bebe preescolar',
              img:babyClothe1,
              precio:250
          },
          {
              id:'123qwewqwqewq',
              nombre:'Sudadera y trajecito blanco',
              img:babyClothe2,
              precio:300
          },
          {
              id:'133qwewqwqewq',
              nombre:'Trajecito y Manta blanca',
              img:babyClothe3,
              precio:300,
              oferta:200
          },
          {
              id:'143qwewqwqewq',
              nombre:'Sudadera blanca y osito',
              precio:520,
              img:babyClothe4,
              oferta:300
          },
          {
              id:'153qwewqwqewq',
              nombre:'Vestido para niña',
              img:babyClothe5,
              precio:400,
          },
          {
              id:'163qwewqwqewq',
              nombre:'Gorrito y trajecito blanco',
              img:babyClothe6,
              precio:520
          }
      ]
  },
  {
      tipo:'Para Mamás',
      items:[
          {
              id:'213qwewqwqewq',
              nombre:'Blusa floreada celeste',
              img:momProduct1,
              precio:50
          },
          {
              id:'223qwewqwqewq',
              nombre:'Blusa con flores azul',
              img:momProduct2,
              precio:140
          },
          {
              id:'233qwewqwqewq',
              nombre:'Top y pantalon café',
              img:momProduct3,
              precio:300,
              oferta:200
          },
          {
              id:'243qwewqwqewq',
              nombre:'Vestido azul',
              img:momProduct4,
              precio:250,
              oferta:200
          },
          {
              id:'253qwewqwqewq',
              nombre:'Top y calza negra',
              img:momProduct5,
              precio:120,
          },
          {
              id:'263qwewqwqewq',
              nombre:'Vestido Blanco',
              img:momProduct6,
              precio:520
          }
      ]
  },
  {
      tipo:'Accesorios',
      items:[
          {
              id:'313qwewqwqewq',
              nombre:'Mecedora infantil azul',
              img:accesory1,
              precio:50
          },
          {
              id:'323qwewqwqewq',
              nombre:'Cama reposadora blanca',
              img:accesory2,
              precio:10
          },
          {
              id:'333qwewqwqewq',
              nombre:'Reposadora blanca',
              img:accesory3,
              precio:300,
              oferta:200
          },
          {
              id:'343qwewqwqewq',
              nombre:'Silla para comer',
              img:accesory4,
              precio:250,
              oferta:200
          },
          {
              id:'353qwewqwqewq',
              nombre:'Combo de biberon',
              img:accesory5,
              precio:400,
          },
          {
              id:'363qwewqwqewq',
              nombre:'Chupon de osito',
              img:accesory6,
              precio:400,
          },
          
      ]
  },
]


export const Clients=[
  {
      nombre:'Vanessa',
      img:'https://img.freepik.com/foto-gratis/senora-asiatica-joven-hermosa-que-coloca-aislada_171337-8719.jpg?w=1380&t=st=1698821248~exp=1698821848~hmac=59bc9151e16077e68c94639bc1ff9869861da24500e9cb9a8feb87bf14d76d92',
      comment:'¡Increíble experiencia de compra para mi bebé! Encontré una variedad de ropa adorable y funcional. La calidad es excepcional, y la atención al cliente fue fenomenal. ¡Definitivamente mi tienda favorita para vestir a mi pequeño!'
  },
  {
      nombre:'Lucia',
      img:'https://img.freepik.com/foto-gratis/retrato-mujer-adulta-morena-piel-perfecta-concepto-cuidado-piel_144627-47416.jpg?w=1380&t=st=1701469794~exp=1701470394~hmac=5a737f453a14d57187f8728f1d712bfed47ac27507a05031d5c454f87bbd3562',
      comment:'Como madre de gemelos, encontrar ropa de calidad a precios asequibles es crucial. Esta tienda superó mis expectativas. La ropa es duradera, cómoda y adorable. ¡Mis bebés lucen tan adorables que siempre preguntan de dónde es su ropa!'
  },
  {
      nombre:'Adriana',
      img:'https://img.freepik.com/foto-gratis/cierrese-encima-mujer-morena-que-mira-camara-sobre-gris_171337-1000.jpg?w=1380&t=st=1701469879~exp=1701470479~hmac=eb00c4d654d371203796786e5693955a0463999b951ef2eca49c7a4b0c60f823',
      comment:'Esta tienda tiene una gama de ropa moderna y chic para bebés. Me encanta que puedo encontrar conjuntos que sigan las tendencias actuales. La calidad es excelente, y siempre recibo cumplidos cuando visto a mi bebé con sus prendas.'
  },
  {
      nombre:'Sara',
      img:'https://img.freepik.com/foto-gratis/mujer-positiva-sonriendo-modelo-divertido-que-presenta-cerca-pared-rosada-estudio_158538-3433.jpg?w=1060&t=st=1701469931~exp=1701470531~hmac=52a17f6032b78a0350a41f11a81412f2e09a2265605a598f53a7295b4b24be7d',
      comment:'Después de tener tres hijos, he probado muchas marcas, y esta es de lejos la mejor. La ropa es suave, fácil de lavar y mantiene su forma. Además, la selección de productos para bebés es amplia y siempre encuentro lo que necesito.'
  },
 
]

export const Tiendas=[
  {
      name:'Pequeñin'
},{
  name:'Bello Cotton'
},{
  name:'Esperarte'
},
{
  name:'Splash'
},
{
  name:'Adorable'
},
{
  name:'Mamma'
},
{
  name:'Koala'
},
{
  name:'Soñe Contigo'
},
{
  name:'Wanitos'
},
{
  name:'Baby Bird'
},
]

export const tiposRopa=[
  {
      name:'Sudaderas'
  },
  {
      name:'Gorros'
  },
  {
      name:'Vestiditos'
  },
  {
      name:'Trajes Completos'
  },
  {
      name:'Pijamas'
  },
]

export const tiposAccesorios=[
  {
      name:'Carritos de bebé'
  },
  {   
      name:'Sillas para comer'
  },
  {
      name:'Camas Reposadoras'
  },
  {
      name:'Mecedoras'
  }
]