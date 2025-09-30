import ProductForm from "@/components/shared/ProductForm";

export default function NewStorePage({ params }: { params: { id: string } }) {

  return <ProductForm mode="create" storeId={params.id} />;

}