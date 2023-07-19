import { erc20ABI, useContractRead } from "wagmi";
import useActiveChain from "./useActiveChain";
import { useMemo } from "react";

function useERC20(token: string, args: any) {
  const { chainId } = useActiveChain();
  const { data } = useContractRead({
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    abi: erc20ABI,
    functionName: "balanceOf",
    args: args,
    chainId,
  });

  console.log(data);
  return useMemo(() => {
    return {
      data: data ?? 0,
    };
  }, [data]);
}
export default useERC20;
