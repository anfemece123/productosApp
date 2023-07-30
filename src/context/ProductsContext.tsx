import { Children, createContext, useEffect, useState } from "react";
import { Producto, ProductsResponse, Categoria } from '../interfaces/appInterfaces';
import cafeApi from "../api/cafeApi";


type ProductsContextProps={
    products: Producto[];
    loadProducts:()=>Promise<void>;
    addProduct: (categoryId:string, productName:string)=>Promise<Producto>;
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
    

    const loadProducts=async()=>{
        const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
        setProducts([...resp.data.productos])
        // console.log(resp.data.productos)
    };

    const addProduct=async (categoryId:string, productName:string):Promise<Producto>=>{
        // try {
            const resp = await cafeApi.post<Producto>('/productos', {
                nombre: productName,
                categoria:categoryId
            } );//* el segundo argumento en una peticion de axios de post es la data que se le envia al Backend por medio del body
            setProducts([...products,resp.data]);

            return resp.data; // * para que aparescan los botones apenas se guarda 
             
        // } catch (error) {
        //     console.log(error)
        // }

    };

    const updateProduct=async(categoryId:string, productName:string,productId:string)=>{
        try {
            const resp = await cafeApi.put<Producto>(`/productos/${productId}`, {
                nombre: productName,
                categoria:categoryId
            } );//* el segundo argumento en una peticion de axios de post es la data que se le envia al Backend por medio del body
            setProducts(products.map(prod=> {
                return (prod._id===productId) ? resp.data : prod;
            }));
             
        } catch (error) {
            console.log(error)
        }
    };

    const deleteProduct=async(id:string)=>{

    };

    const loadProductById=async(id:string):Promise<Producto>=>{
        const resp = await cafeApi.get<Producto>(`/productos/${id}`);
        return resp.data;
        
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