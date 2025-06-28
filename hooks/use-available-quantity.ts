// import { Api } from "@/services/api-client";
// import { useEffect, useState } from "react";

// /** Хук для получения доступного количества товара */
// export const useAvailableQuantity = (productItemId: string) => {
// const [availableProdItemQuantity, setAvailableProdItemQuantity] = useState(0);
//   const [quantLoading, setQuantLoading] = useState(false);
//   const [isQuantError, setIsQuantError] = useState(false);

//     useEffect(() => {
//         async function getItemQuantity() {
//           try {
//             setQuantLoading(true);
//             const data = await Api.productitems.getItem(productItemId);
//             setAvailableProdItemQuantity(data.quantity);
//           } catch (err) {
//             setIsQuantError(true);
//             console.log(err);
//           } finally {
//             setQuantLoading(false);
//           }
//         }
    
//         getItemQuantity();
//       }, []);

//       return { availableProdItemQuantity, quantLoading, isQuantError };
// }