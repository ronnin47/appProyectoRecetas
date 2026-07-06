import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';






export const AppContext = createContext();

export const AppProvider = ({ children }) => {


const [usuario, setUsuario] = useState('');
 const [recetas, setRecetas] = useState([]);
 const [loading, setLoading] = useState(true);
const [ultimasBusquedas, setUltimasBusquedas] = useState([]);
const [misRecetas, setMisRecetas] = useState([]); 

  const STORAGE_USUARIO = 'usuario';
const STORAGE_KEY = 'recetas';
const STORAGE_MIS_RECETAS = 'mis_recetas';

 const recetasIniciales = [
  {
    id: "1",
    titulo: "Milanesas con puré",
    descripcion: "Clásico argentino fácil y rápido.",
    categoria: "Almuerzo",
    tiempo: 40,
    porciones: 4,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyypdk5AA484UbUq05IwYPR0D4uWbN1AREiq4fvgIEPJ9QCjkl_yIGEumg&s=10",
    ingredientes: [
      "Carne",
      "Huevos",
      "Pan rallado",
      "Papas",
      "Leche"
    ],
    pasos: [
      "Batir los huevos",
      "Empanar la carne",
      "Freír las milanesas",
      "Hacer puré de papas"
    ],
    favorita: false
  },
  {
    id: "2",
    titulo: "Pizza casera",
    descripcion: "Masa casera con salsa y queso derretido.",
    categoria: "Cena",
    tiempo: 60,
    porciones: 2,
    imagen: "https://alicante.com.ar/wp-content/uploads/2023/12/Pizza-1536x1024.jpg",
    ingredientes: [
      "Harina",
      "Agua",
      "Levadura",
      "Salsa de tomate",
      "Queso"
    ],
    pasos: [
      "Preparar la masa",
      "Dejar reposar",
      "Agregar salsa y queso",
      "Hornear"
    ],
    favorita: false
  },
  {
    id: "3",
    titulo: "Ensalada fresca",
    descripcion: "Ligera y saludable para el verano.",
    categoria: "Saludable",
    tiempo: 10,
    porciones: 1,
    imagen: "https://www.recetasnestle.com.ec/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/5f2f77fa17e24ea08abd72b1ebf01b55.png?itok=TrL3CUxF",
    ingredientes: [
      "Lechuga",
      "Tomate",
      "Zanahoria",
      "Aceite de oliva",
      "Sal"
    ],
    pasos: [
      "Lavar verduras",
      "Cortar ingredientes",
      "Mezclar y condimentar"
    ],
    favorita: false
  }
];

const cargarUsuario = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_USUARIO);

    if (data) {
      setUsuario(data);
    } else {
      setUsuario('Usuario');
      await AsyncStorage.setItem(STORAGE_USUARIO, 'Usuario');
    }

  } catch (error) {
    console.log('Error cargando usuario', error);
  }
};


  useEffect(() => {
    cargarRecetas();
    cargarMisRecetas();
      cargarUsuario();

  
//para desarrollo
/*
 const iniciar = async () => {
    // Solo para desarrollo
    await AsyncStorage.clear();
    console.log("Todo el storage fue eliminado.");

    // cargarRecetas();
  };

  iniciar();
  */
  }, []);





useEffect(() => {
  const cargarUltimas = async () => {
    try {
      const data = await AsyncStorage.getItem('ULTIMAS_BUSQUEDAS');

      if (data) {
        setUltimasBusquedas(JSON.parse(data));
      }
    } catch (e) {
      console.log('Error cargando ultimas busquedas', e);
    }
  };

  cargarUltimas();
}, []);

  

  useEffect(() => {
  const guardar = async () => {
    try {
      await AsyncStorage.setItem(
        'ULTIMAS_BUSQUEDAS',
        JSON.stringify(ultimasBusquedas)
      );
    } catch (e) {
      console.log('Error guardando historial', e);
    }
  };

  guardar();
}, [ultimasBusquedas]);
  




const cargarRecetas = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (data) {
      setRecetas(JSON.parse(data));
    } else {
      setRecetas(recetasIniciales);
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(recetasIniciales)
      );
    }

    setLoading(false);

  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

//MIS RECETAS , FUNCIONES PARA AGREGAR, EDITAR Y ELIMINAR RECETAS DEL STORAGE
const cargarMisRecetas = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_MIS_RECETAS);

    if (data) {
      setMisRecetas(JSON.parse(data));
    } else {
      setMisRecetas([]);
    }
  } catch (error) {
    console.log('Error cargando mis recetas', error);
  }
};

const agregarReceta = async (receta) => {
  try {
    const nuevasRecetas = [...misRecetas, receta];

    setMisRecetas(nuevasRecetas);

    await AsyncStorage.setItem(
      STORAGE_MIS_RECETAS,
      JSON.stringify(nuevasRecetas)
    );
  } catch (error) {
    console.log('Error agregando receta', error);
  }
};

const editarReceta = async (recetaEditada) => {
  try {
    const nuevasRecetas = misRecetas.map((receta) =>
      receta.id === recetaEditada.id
        ? recetaEditada
        : receta
    );

    setMisRecetas(nuevasRecetas);

    await AsyncStorage.setItem(
      STORAGE_MIS_RECETAS,
      JSON.stringify(nuevasRecetas)
    );
  } catch (error) {
    console.log('Error editando receta', error);
  }
};

const eliminarReceta = async (id) => {
  try {
    const nuevasRecetas = misRecetas.filter(
      (receta) => receta.id !== id
    );

    setMisRecetas(nuevasRecetas);

    await AsyncStorage.setItem(
      STORAGE_MIS_RECETAS,
      JSON.stringify(nuevasRecetas)
    );
  } catch (error) {
    console.log('Error eliminando receta', error);
  }
};


//para configuracion, borrar todas las recetas del storage
const borrarMisRecetas = async () => {
  try {
    setMisRecetas([]);
    await AsyncStorage.removeItem(STORAGE_MIS_RECETAS);
  } catch (error) {
    console.log('Error borrando mis recetas', error);
  }
};

const limpiarUltimasBusquedas = async () => {
  try {
    setUltimasBusquedas([]);
    await AsyncStorage.removeItem('ULTIMAS_BUSQUEDAS');
  } catch (error) {
    console.log('Error limpiando búsquedas', error);
  }
};

const cambiarUsuario = async (nuevoUsuario) => {
  try {
    setUsuario(nuevoUsuario);

    await AsyncStorage.setItem(
      STORAGE_USUARIO,
      nuevoUsuario
    );

  } catch (error) {
    console.log('Error guardando usuario', error);
  }
};

    return (
            <AppContext.Provider value={{ 
                usuario, 
                setUsuario, 
                cargarUsuario,
                cambiarUsuario,
                recetas, 
                setRecetas, 
                loading, 
                setLoading,
                ultimasBusquedas,
                setUltimasBusquedas,
                misRecetas,
                setMisRecetas,
                agregarReceta,
                editarReceta,
                eliminarReceta,
                cargarMisRecetas,
                borrarMisRecetas,
                limpiarUltimasBusquedas
                }}>

            {children}

            </AppContext.Provider>
    )

};