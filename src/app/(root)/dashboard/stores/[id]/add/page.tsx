import ProductForm from "@/components/shared/ProductForm";

export default function NewStorePage({ params }: { params: { id: string } }) {
  console.log("New Store Page params:", params.id);

  return <ProductForm mode="create" storeId={params.id} />;

}