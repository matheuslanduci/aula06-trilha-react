import { memo, useState } from "react";
import dynamic from "next/dynamic";

import { AddProductToWishlistProps } from "./AddProductToWishlist";

function Loader() {
  return <span>Carregando...</span>;
}

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => import("./AddProductToWishlist").then(mod => mod.AddProductToWishlist),
  {
    loading: Loader
  }
);

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    formattedPrice: string;
  };
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.formattedPrice}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);
