import { useState, useEffect } from "react";
import getFirebaseDataQuery from "../query/getFirebaseData";

function useCountry(id) {
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (id) {
      setLoading(true);
      let query = undefined;

      query = getFirebaseDataQuery("Country", id);

      query

        .get()
        .then((doc) => {
          console.log(doc);
          setCountry(doc.data());
        })
        .catch((e) => {
          console.log(e);

          console.log("error while fetching data");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("Id not found");
    }
  }, [setLoading, setCountry]);

  return [country, loading];
}
export default useCountry;
