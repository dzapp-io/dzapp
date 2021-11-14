import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import { Contract } from "@ethersproject/contracts";
import { getAddress } from "@ethersproject/address";
import * as zod from "zod";

import MainLayout from "layouts/MainLayout";
import { useContractSourceQuery } from "lib/etherscan";
import { useEffect, useRef } from "react";
import TextInput from "components/TextInput";
import Button from "components/Button";
import TextArea from "components/TextArea";

const addressSchema = zod
  .string()
  .nonempty("Address is required.")
  .refine((value) => {
    try {
      return Boolean(getAddress(value));
    } catch (error) {
      return false;
    }
  }, "Invalid address.");

const schema = zod
  .object({
    address: addressSchema,
    abi: zod.string().nonempty("Abi is required."),
  })
  .required();

function useContract(address: string, abi: string) {
  const contractRef = useRef(null);

  useEffect(() => {
    if (!address || !abi) {
      return null;
    } else {
      if (!contractRef.current) {
        contractRef.current = new Contract(address, abi);
      }
    }
  }, [abi, address, contractRef]);

  return contractRef.current;
}

type FormValues = zod.infer<typeof schema>;

const NewWorkflow: NextPage = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const submitHandler = handleSubmit(({ abi, address }) => {
    const contract = new Contract(address, abi.replace(/\s+/g, ""));

    console.log(Object.keys(contract.functions));
  });

  const address = watch("address");

  const { data: contractData } = useContractSourceQuery(address);

  useEffect(() => {
    if (contractData?.ABI && !contractData.ABI.includes("verified")) {
      setValue("abi", contractData.ABI);
    }
  }, [contractData, setValue]);

  return (
    <MainLayout>
      <form
        method="post"
        onSubmit={submitHandler}
        className="grid gap-4 max-w-md w-full"
      >
        <TextInput
          label="Contract Address"
          placeholder="Contract Address"
          {...register("address")}
        />
        {errors.address && (
          <div className="text-red-600">{errors.address.message}</div>
        )}
        <TextArea
          label="Contract ABI"
          placeholder="Enter ABI"
          {...register("abi")}
        />

        {errors.abi && <div className="text-red-600">{errors.abi.message}</div>}
        <Button type="submit">Continue</Button>
        {contractData && (
          <div>
            <ul>
              <li>Contract Name: {contractData.ContractName}</li>
            </ul>
          </div>
        )}
      </form>
    </MainLayout>
  );
};

export default NewWorkflow;
