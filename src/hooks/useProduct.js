import { useState, useEffect } from "react";
import { firestore } from "firebase/app";
import getFirebaseDataQuery from "../query/getFirebaseData";

function useProduct(id) {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (id) {
      setLoading(true);
      let query = undefined;

      query = getFirebaseDataQuery("productMaster", id);

      query

        .get()
        .then((doc) => {
          console.log(doc);
          setProduct(doc.data());
        })
        .catch((e) => {
          console.log(e);

          console.log("error while fetching data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [setLoading, setProduct]);

  return [product, loading];
}
export default useProduct;
