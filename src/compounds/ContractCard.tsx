import { ExternalLinkIcon } from "@heroicons/react/solid";
import { useContractSourceQuery } from "lib/etherscan";
import { truncateAddress } from "lib/helpers";
import { useContract } from "lib/hooks";
import { FC } from "react";

type Props = {
  address: string;
};

const ContractCard: FC<Props> = (props) => {
  const { data: contractData } = useContractSourceQuery(props.address);
  const contract = useContract(props.address, contractData?.ABI ?? "");

  return (
    <section className="bg-gray-200 p-4 rounded-2xl grid gap-4 place-items-start">
      <div>
        Contract: {contractData?.ContractName}
        <a
          href={`https://etherscan.io/address/${props.address}`}
          className="flex items-center underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on explorer <ExternalLinkIcon className="h-4" />
        </a>
      </div>

      {contract && (
        <>
          <div>Contract Name: {contractData?.ContractName}</div>
          <div>Contract Name: {contractData?.ContractName}</div>
          <div>Contract Name: {contractData?.ContractName}</div>
        </>
      )}
    </section>
  );
};

export default ContractCard;
