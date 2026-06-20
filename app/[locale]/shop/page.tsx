import { permanentRedirect } from "next/navigation";

const SHOPIFY_STORE_URL = "https://ybuaa9-ht.myshopify.com/";

export default function ShopPage() {
  permanentRedirect(SHOPIFY_STORE_URL);
}
