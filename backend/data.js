import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: "moustachedbird",
            email: "yeu.cl@hotmail.com",
            /*Nunca se guarda texto plano como contraseña, primero se coloca la contraseña
            y luego se coloca un "salt round" que significa la cantidad de veces que el hash se
            va a ejecutar para ecriptar la contraseña, entre mas rounds más dificil será averiguar
            el valor real, pero más lento será (aproximadamente 2^N más lento)
            
            La funcion hash se ejecuta de manera asincrona*, si se pone sync será sincrona*/
            password: bcrypt.hashSync('1234',8),
            isAdmin: true,
        },
        {
            name: "oyuki",
            email: "ejemplo@hotmail.com",
            password: bcrypt.hashSync('1234',8),
            isAdmin: false,
        },
    ],
    products:[
        {
            _id:'1',
            name:'Guía Más: Cívica y Ética 2',
            category:'guia',
            image: '/images/guia1.png',
            price: 180,
            brand: 'Seemargs',
            rating:5,
            numReviews:2,
            description:'Es guía bonita, actualizada para 2021',
            countInStock: 10,
        },
        {
            _id:'2',
            name:'Guía Más: Matemáticas I',
            category:'guia',
            image: '/images/guia2.png',
            price: 220,
            brand: 'EdiQ',
            rating:4.5,
            numReviews:10,
            description:'Es guía bonita, actualizada para 2021',
            countInStock: 0,
        },
        {
            _id:'3',
            name:'Guía Best: Todas las materias',
            category:'guia',
            image: '/images/guia3.png',
            price: 200,
            brand: 'Seemargs',
            rating:2,
            numReviews:25,
            description:'Es guía bonita, actualizada para 2021',
            countInStock: 15,
        },
        {
            _id:'4',
            name:'Guía Más: Geografía',
            category:'guia',
            image: '/images/guia4.png',
            price: 100,
            brand: 'Seemargs-EdiQ',
            rating:5,
            numReviews:100,
            description:'Es guía bonita, actualizada para 2021',
            countInStock: 7,
        },
        {
            _id:'5',
            name:'Guía Más: Español I',
            category:'guia',
            image: '/images/guia5.png',
            price: 130,
            brand: 'Seemargs',
            rating:4.5,
            numReviews:1,
            description:'Es guía bonita, actualizada para 2021',
            countInStock: 4,
        }
    ]
};

export default data;