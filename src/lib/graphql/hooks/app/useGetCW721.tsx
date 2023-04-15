import {
   
   QueryCW721AddressText,
   QueryCW721AddressResponse,
   
  } from "./customQueryModule";
  import { ApolloClient, InMemoryCache, QueryResult, useQuery } from "@apollo/client";
  import { useEffect, useMemo, useState } from "react";
  
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  const client = new ApolloClient({ uri: endpoint, cache: new InMemoryCache() });
  
  

const useGetCW721 =  (cw721Address: string) => {
   // console.log('ererererere')
   // console.log(currentIndex)
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);
    
     const [cw721Data, setcw721Data] = useState<any>();

     useEffect(()=>{
        setLoading(true);
        getCW721(cw721Address).then( (result)=>{
            setcw721Data(result);
            console.log('contract set');
            console.log(cw721Address);
        }

        )
        .catch( ()=>{
            setcw721Data(undefined);
            setError('some error');
        }

        )
        .finally(()=>{
            setLoading(false);
            
        }
        )

     }, [cw721Address]
     )
    
     return {
        data:cw721Data,
        error: error,
        loading: loading
     }
    
  };
  


const getCW721 = async (cw721Address: string)=>{

  console.log('internal function')
   const cw721Data = await client.query<QueryCW721AddressResponse>({
    query: QueryCW721AddressText,
    variables:{cw721Address}
   });

   
   console.log('internal function results:');
   console.log(cw721Data);



 return cw721Data?.data.cw721;

}


  
  export default useGetCW721;
  