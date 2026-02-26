"use client";
import ProductForm from "@/components/shared/ProductForm";
import { useProductService } from "@/services/productService";

const EditProduct=({ params }: { params: { productId: string }})=> {
        const { useGetProductById } = useProductService();
        const productData:any = useGetProductById(true, params.productId);
        
  return <ProductForm mode="edit" storeId={productData.data?.product.store_id} product={productData.data?.product} />;
}

export default EditProduct;