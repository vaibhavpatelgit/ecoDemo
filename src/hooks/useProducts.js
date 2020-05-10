import { useState, useEffect } from "react";
import { firestore } from "firebase/app";
import getFirebaseDataQuery from "../query/getFirebaseData";

function useProducts(limit = 25, category) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    let query = undefined;

    if (category) {
      query = getFirebaseDataQuery("productMaster")
        .where("Category", "==", category)
        .limit(limit);
    } else {
      query = getFirebaseDataQuery("productMaster").limit(limit);
    }
    query

      .get()
      .then((response) => {
        const tempProducts = [];
        for (const doc of response.docs) {
          let data = doc.data();
          data = { ...data, id: doc.id };
          tempProducts.push(data);
        }

        setProducts(tempProducts);
      })
      .catch((e) => {
        console.log("error while fetching data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return [products, loading];
}
export default useProducts;
