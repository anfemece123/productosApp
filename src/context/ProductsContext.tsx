import { createContext, useEffect, useState } from "react";
import { Producto, ProductsResponse, Categoria } from '../interfaces/appInterfaces';
import cafeApi from "../api/cafeApi";
import { Asset} from "react-native-image-picker";


type ProductsContextProps={
    products: Producto[];
    productsCategory: Producto[];
    isLoading:boolean;
    loadProducts:()=>Promise<void>;
    loadProductsByCategory:(categoryId:string)=>Promise<void>;
    addProduct: (categoryId:string, productName:string)=>Promise<Producto>;
    updateProduct:(categoryId:string, productName:string,productId:string)=>Promise<void>;
    deleteProduct:(id:string)=>Promise<void>;
    loadProductById:(id:string)=>Promise<Producto>;
    uploadImage:(data:any,id:string)=>Promise<void>; // TODO: cambiar ANY
    clearProductsCategory:()=>void;
}


export const ProductsContext= createContext({} as ProductsContextProps)


export const ProductsProvider =({children}:any)=>{
    const [products, setProducts] = useState<Producto[]>([]);
    const [productsCategory, setProductsCategory] = useState<Producto[]>([]);
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
      loadProducts();
    }, [])
    

    const loadProducts=async()=>{
        const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
        setProducts([...resp.data.productos])
        // console.log(resp.data.productos)
    };

    const loadProductsByCategory = async (categoryId:string) => {
        setisLoading(true);

        const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');

        const productCategory = resp.data.productos.filter((pro)=> pro.categoria._id == categoryId)
       
        setProductsCategory([...productCategory]);

        setisLoading(false); 
     
    };

    const clearProductsCategory = ()=> {
        setProductsCategory([])
    }


    const addProduct= async (categoryId:string, productName:string):Promise<Producto>=>{
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

    const uploadImage=async(data:Asset,id:string)=>{

        // TODO : COLOCARLE LOAD A LA PETICION 

        const fileToUpload={
            uri:JSON.parse(JSON.stringify(data.uri)),
            type:JSON.parse(JSON.stringify(data.type)),
            name:JSON.parse(JSON.stringify(data.fileName))
        }

        const formData = new FormData();
        formData.append('archivo',fileToUpload);

        try {
            const resp = await cafeApi.put(`/uploads/productos/${id}`, formData,{
                headers: {"Content-Type": "multipart/form-data"} // * correccion de error network axios
            }) //* form data es la informacion del archivo que se va a enviar por el body de tipo form data en postman 
            console.log(resp);
        } catch (error) {
            console.log(error, 'error en uploadImage')
        }

    }; 

    return(
        <ProductsContext.Provider value={{   
            isLoading, 
            products,
            productsCategory,
            loadProducts,
            loadProductsByCategory,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage,
            clearProductsCategory
        }}>
            {children}
        </ProductsContext.Provider>    )
}