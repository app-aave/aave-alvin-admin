import { erc20ABI, useContractRead } from "wagmi";
import useActiveChain from "./useActiveChain";
import { useMemo } from "react";

function useERC20(token: any, args: any) {
  const { chainId } = useActiveChain();
  const { data } = useContractRead({
    address: token,
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
