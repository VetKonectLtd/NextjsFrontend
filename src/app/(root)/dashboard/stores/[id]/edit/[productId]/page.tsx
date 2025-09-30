"use client";
import ProductForm from "@/components/shared/ProductForm";
import { useProductService } from "@/services/productService";

const EditProduct=({ params }: { params: { id: string }})=> {
        const { useGetProductById } = useProductService();
        const productData:any = useGetProductById(true, params.id);
        
  return <ProductForm mode="edit" storeId={params.id} product={productData.data?.product} />;
}

export default EditProduct;