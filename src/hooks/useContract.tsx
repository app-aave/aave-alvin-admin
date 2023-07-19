import { useMemo } from "react";
import { erc20ABI, useWalletClient } from "wagmi";
import { Abi, Address } from "viem";
import { getContract } from "wagmi/actions";
import useActiveChain from "./useActiveChain";

function useContract(address: Address, abi?: Abi) {
  const { chainId } = useActiveChain();
  const { data: walletClient }: any = useWalletClient();
  return useMemo(() => {
    if (!address || !abi) return null;
    try {
      return getContract({
        abi,
        address,
        chainId,
        walletClient: walletClient,
      });
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, abi]);
}

const useERC20 = (address: Address) => {
  return useContract(address, erc20ABI);
};
export { useContract, useERC20 };
