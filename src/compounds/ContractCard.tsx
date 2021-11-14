import { useContractSourceQuery } from "lib/etherscan";
import { FC } from "react";

type Props = {
  address: string;
};

const ContractCard: FC<Props> = (props) => {
  const { data: contract } = useContractSourceQuery(props.address);

  return (
    <section className="bg-gray-200 p-4 rounded-2xl">{props.address}</section>
  );
};

export default ContractCard;
