import { useQuery } from "@tanstack/react-query";
import { getProductsActions } from "../actions/getProducts.action";
import { useParams, useSearchParams } from "react-router-dom";

export const useProducts = () => {
  const { gender } = useParams();
  const [searchParams] = useSearchParams();
  const limit = searchParams.get("limit") || 9;
  const page = searchParams.get("page") || 1;
  const sizes = searchParams.get("sizes") || "";
  const offset = (Number(page) - 1) * Number(limit);
  const rangePrice = searchParams.get("range") || 'any';
  const query = searchParams.get('query') || '';
  let minPrice = undefined;
  let maxPrice = undefined;

  switch (rangePrice) {
    case "any":
      break;
    case "0-50":
      minPrice = 0;
      maxPrice = 50;
      break;
    case "50-100":
      minPrice = 50;
      maxPrice = 100;
      break;
     case '100-200':
        minPrice = 100;
        maxPrice = 200;
        break;
       case '200+':
        minPrice = 200;
        maxPrice = undefined;
        break;
    default:
      break;
  }

  return useQuery({
    queryKey: ["products", { offset, limit, sizes, gender, minPrice, maxPrice, query }],
    queryFn: () =>
      getProductsActions({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
        sizes: sizes || "",
        gender: gender || "",
        query: query,
        minPrice:minPrice,
        maxPrice: maxPrice
      }),
  });
};
