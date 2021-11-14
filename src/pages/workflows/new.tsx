import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { NextPage } from "next";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import { Contract } from "@ethersproject/contracts";
import { getAddress } from "@ethersproject/address";
import * as zod from "zod";

import MainLayout from "layouts/MainLayout";
import { useContractSourceQuery } from "lib/etherscan";
import { useContract } from "lib/hooks";
import TextInput from "components/TextInput";
import Button from "components/Button";
import TextArea from "components/TextArea";
import ContractCard from "compounds/ContractCard";

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
    abi: zod.string().nonempty("ABI is required."),
  })
  .required();

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

  const contract = useContract(address, contractData?.ABI ?? "");

  useEffect(() => {
    if (contractData?.ABI && !contractData.ABI.includes("verified")) {
      setValue("abi", contractData.ABI);
    }
  }, [contractData, setValue]);

  return (
    <MainLayout title="New Workflow" subTitle="Start connecting dApps">
      <form
        method="post"
        onSubmit={submitHandler}
        className="grid gap-4 w-full"
      >
        <TextInput
          type="search"
          label="Contract Address"
          placeholder="Contract Address"
          errorMessage={errors.address?.message}
          {...register("address")}
        />
        <TextArea
          label="Contract ABI"
          placeholder="Enter ABI"
          errorMessage={errors.abi?.message}
          {...register("abi")}
        />

        {contractData && <ContractCard address={address} />}
        <Button type="submit">Continue</Button>
      </form>
    </MainLayout>
  );
};

export default NewWorkflow;
