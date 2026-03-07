import Grid from "@/components/layout/Grid";
import { ProductCard } from "@/components/organisms/ProductCard";

import useVisibleProducts from "@/hooks/useVisibleProducts";
import { useProductFilter } from "@/context/productFilter/reducer";
import { Product } from "@/services/product.service";

export function ProductGrid({ data }: { data: Product[] }) {
  const [state] = useProductFilter();
  const { visibleProducts } = useVisibleProducts({
    state,
    data,
  });
  return (
    <Grid slot="product">
      {visibleProducts.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </Grid>
  );
}
