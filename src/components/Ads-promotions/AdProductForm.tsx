"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import PlanSelector, { Plan } from "./PlanSelector";
import { useAuthService } from "@/services/authService";
import { useProductService } from "@/services/productService";
import { useAdsPromotionService } from "@/services/adsPromotionService";
import { usePromotionPlanService } from "@/services/promotionPlanService";
import { Product } from "@/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useHandleError } from "@/lib/hooks/useToastHandlers";

const AdProductForm = (preSelectedId: any) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [factor, setFactor] = useState<number>(1);
  // Terms checkbox state — users must agree before creating a promotion
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const { useCurrentUser } = useAuthService();
  const { useGetProductByUserId } = useProductService();
  const { useInitializePromotion } = useAdsPromotionService();
  const { useGetPromotionPlans } = usePromotionPlanService();
  // show an inline validation message only after the user attempts to submit
  const [showAgreeError, setShowAgreeError] = useState<boolean>(false);

  const handleError = useHandleError();

  const { mutate: createPromotion, isLoading: isCreatingPromotion } =
    useInitializePromotion();
  const { data: user, isLoading: userLoading } = useCurrentUser(true);
  const { data: promotionPlans } = useGetPromotionPlans();

  // Transform API data to match Plan interface
  const transformedPlans: Plan[] =
    (promotionPlans as any)?.plans?.map((plan: any) => ({
      value: plan.id.toString(),
      label: plan.title,
      maxProducts: parseInt(plan.no_of_products, 10),
      basePrice: parseFloat(plan.price),
      duration: parseInt(plan.duration, 10),
      vat: parseFloat(plan.vat),
    })) || [];

  // console.log("Promotion Plans Data:", promotionPlans);

  // Set initial selected plan
  useEffect(() => {
    if (transformedPlans.length > 0 && !selectedPlan) {
      setSelectedPlan(transformedPlans[0].value);
    }
  }, [transformedPlans, selectedPlan]);

  // Extract user_id safely from the response
  const userId = (user as any)?.profile?.user_id;

  const getProduct = useGetProductByUserId(
    !!userId, // Only enable when userId is available
    userId?.toString() || ""
  );

  const ads = Array.isArray(
    (getProduct.data as Record<string, any>)?.products?.data
  )
    ? (getProduct.data as Record<string, any>)?.products?.data
    : [];

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (!getProduct.isLoading && preSelectedId) {
      const found = ads.find((p: Product) => p.id === preSelectedId);
      if (found) {
        setSelectedProduct(found);
        setPreviews(found.images_url.slice(0, 3));
      }
    }
  }, [getProduct.isLoading, preSelectedId, ads]);

  useEffect(() => {
    if (!getProduct.isLoading && preSelectedId) {
      setValue("id", preSelectedId);
    }
  }, [getProduct.isLoading, preSelectedId, setValue]);

  const handleProductChange = (id: string) => {
    const product = ads.find((p: Product) => p.id === id) || null;
    setSelectedProduct(product);
    if (product) {
      setPreviews(product.images_url.slice(0, 3));
    }
  };

  const onSubmit = () => {
    if (!selectedProduct) {
      handleError("Please select a product");
      return;
    }

    // Require terms agreement before submission
    if (!agreeToTerms) {
      setShowAgreeError(true);
      handleError(
        "Please agree to the terms and conditions before proceeding."
      );
      return;
    }

    // Map plan names to promotion_plan_id (you'll need to update these IDs based on your backend)
    const promotionPlanId = parseInt(selectedPlan);

    if (!promotionPlanId) {
      handleError("Please select a valid plan");
      return;
    }

    const payload = {
      product_id: parseInt(selectedProduct.id),
      promotion_plan_id: promotionPlanId,
    };

    // clear previous inline agree-to-terms error and submit
    setShowAgreeError(false);
    createPromotion(payload);
  };

  return (
    <form className="space-y-1 max-w-md mx-auto">
      {/* Select Product */}
      {getProduct.isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading products...</span>
        </div>
      ) : (
        <Controller
          name="id"
          control={control}
          rules={{ required: "Select Product is required" }}
          render={({ field }) => (
            <FormSelect
              label="Select Product"
              focusLabel="Select Product (Required):"
              isRequired
              searchable
              options={ads.map((p: Product) => ({
                value: p.id,
                label: `${p.id} - ${p.product_name}`,
              }))}
              value={field?.value}
              onChange={(value) => {
                field.onChange(value);
                handleProductChange(value);
              }}
            />
          )}
        />
      )}
      {/* Auto-populated fields */}
      {selectedProduct && (
        <div className="space-y-1 mb-8">
          <FormInput
            label="Product Title"
            type="text"
            focusLabel="Product Title:"
            value={selectedProduct.product_name}
            readOnly
          />

          {/* Category */}
          <FormSelect
            label="Product Category"
            focusLabel="Product Category:"
            options={[
              { value: "Pets", label: "Pets" },
              { value: "Birds", label: "Birds" },
              { value: "Accessories", label: "Accessories" },
            ]}
            value={selectedProduct.category}
            onChange={() => {}}
            disabled
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 py-4 px-2">
            {selectedProduct.tags.map((tag: any) => (
              <span
                key={tag.id}
                className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
              >
                {tag.name}
              </span>
            ))}
          </div>

          <FormInput
            label="Location"
            type="text"
            focusLabel="Location:"
            value={selectedProduct.location}
            readOnly
          />

          <FormInput
            label="Price in US Dollars"
            type="number"
            focusLabel="Price:"
            value={selectedProduct.price}
            readOnly
          />

          <FormInput
            label="Available Units"
            type="number"
            focusLabel="Available Units:"
            value={selectedProduct.available_unit}
            readOnly
          />

          {/* Availability toggle */}
          <div className="flex w-11/12 m-auto items-center py-3 justify-between">
            <span className="text-sm font-medium text-gray-700">
              Availability Status -{" "}
              {selectedProduct.availability ? "Open" : "Closed"}
            </span>
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                selectedProduct.availability
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {selectedProduct.availability ? "Open" : "Closed"}
            </span>
          </div>

          {/* Image Previews */}
          {previews.length > 0 && (
            <div className="flex gap-3">
              {previews.map((img, idx) => (
                <div
                  key={idx}
                  className="w-[100px] h-[60px] border rounded-md overflow-hidden flex items-center justify-center"
                >
                  <Image
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    width={100}
                    height={70}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {selectedProduct && (
        <div className="!mt-10 flex gap-2 rounded-lg border-[1.5px] border-[#1D24321F] p-3 shadow-[0px_13px_40px_0px_rgba(27,25,86,0.06)]">
          <div className="flex items-start justify-start gap-3">
            <input
              id="agree-terms-ad"
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="h-4 w-4 border-2 border-[#555555] rounded-sm cursor-pointer checked:bg-[#555555] checked:border-[#555555] accent-white"
            />

            <label
              htmlFor="agree-terms-ad"
              className="text-xs text-gray-500 w-2/3"
            >
              Confirm that you agree to our{" "}
              <Link
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:underline"
              >
                terms and conditions
              </Link>{" "}
              at Vet Konect
            </label>
          </div>
        </div>
      )}
      {showAgreeError && !agreeToTerms && (
        <p className="text-xs text-red-500 ml-auto">
          You must agree to the terms to continue
        </p>
      )}{" "}
      {/* Plan Selector */}
      {selectedProduct && (
        <PlanSelector
          plans={transformedPlans}
          selectedPlan={selectedPlan}
          factor={factor}
          onChange={(plan, factor) => {
            setSelectedPlan(plan);
            setFactor(factor);
          }}
        />
      )}
      {/* Submit Button */}
      {selectedProduct && (
        <div className="pt-4">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isCreatingPromotion || !selectedProduct || !agreeToTerms}
            className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isCreatingPromotion ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Promotion...
              </>
            ) : (
              "Create Promotion"
            )}
          </button>
        </div>
      )}
    </form>
  );
};

export default AdProductForm;
