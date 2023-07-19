import { useMemo } from "react";
import { useNetwork } from "wagmi";

function useActiveChain() {
  const { chain } = useNetwork();
  console.log(chain);
  return useMemo(() => {
    return {
      chainId: chain?.id ? chain?.id : 80001,
      name: chain?.name ? chain?.name : "",
    };
  }, [chain]);
}

export default useActiveChain;
