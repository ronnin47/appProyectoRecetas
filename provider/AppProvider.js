import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';






export const AppContext = createContext();

export const AppProvider = ({ children }) => {


 const [usuario, setUsuario] = useState("activo");
 const [recetas, setRecetas] = useState([]);
 const [loading, setLoading] = useState(true);

  const STORAGE_KEY = 'recetas';


 const recetasIniciales = [
  {
    id: "1",
    titulo: "Milanesas con puré",
    descripcion: "Clásico argentino fácil y rápido.",
    categoria: "Almuerzo",
    tiempo: 40,
    porciones: 4,
    imagen: "https://images.unsplash.com/photo-1604908177522-0405c1d5c0b5",
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
    imagen: "https://images.unsplash.com/photo-1548365328-9f547fb0950f",
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
    imagen: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
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




  useEffect(() => {
    cargarRecetas();
  }, []);

  
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







    return (
            <AppContext.Provider value={{ 
                usuario, 
                setUsuario, 
                recetas, 
                setRecetas, 
                loading, 
                setLoading 
                }}>

            {children}

            </AppContext.Provider>
    )

};