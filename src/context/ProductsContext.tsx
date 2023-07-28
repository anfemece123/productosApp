import { Children, createContext, useEffect, useState } from "react";
import { Producto, ProductsResponse } from "../interfaces/appInterfaces";
import cafeApi from "../api/cafeApi";


type ProductsContextProps={
    products: Producto[];
    loadProducts:()=>Promise<void>;
    addProduct: (categoryId:string, productName:string)=>Promise<void>;
    updateProduct:(categoryId:string, productName:string,productId:string)=>Promise<void>;
    deleteProduct:(id:string)=>Promise<void>;
    loadProductById:(id:string)=>Promise<Producto>;
    uploadImage:(data:any,id:string)=>Promise<void>; // TODO: cambiar ANY


}


export const ProductsContext= createContext({} as ProductsContextProps)


export const ProductsProvider =({children}:any)=>{
    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
      loadProducts();
    
    
    }, [])
    

const addProduct=async (categoryId:string, productName:string)=>{

};
const loadProducts=async()=>{
    const resp = await cafeApi.get<ProductsResponse>('productos?limite=50');
    setProducts([...products, ...resp.data.productos])
    console.log(resp.data.productos)
};
const updateProduct=async(categoryId:string, productName:string,productId:string)=>{

};
const deleteProduct=async(id:string)=>{

};
const loadProductById=async(id:string)=>{
    throw new Error('Not implemented');
};
const uploadImage=async(data:any,id:string)=>{

}; // TODO: cambiar ANY

    return(
        <ProductsContext.Provider value={{    
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage,
        }}>
            {children}
        </ProductsContext.Provider>    )
}