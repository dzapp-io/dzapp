import { FC } from "react";

import { useContractSourceQuery } from "lib/etherscan";
import { useContract } from "lib/hooks";

import TextInput from "components/TextInput";

type Props = {
  address: string;
};

function parseMethod(contractMethod: string, sourceCode?: string) {
  const matches = contractMethod.match(/^(\w+)\((.+)?\)$/);

  if (!matches) {
    throw new Error("Invalid argument: contractMethod");
  }

  const name = matches[1];

  if (!sourceCode) {
    const args = matches[2]
      ?.split(",")
      .map((x) => ({ name: "", type: x, isArray: x.endsWith("[]") }));

    return {
      name,
      args,
    };
  }

  const lines = sourceCode
    ?.split("\r\n")
    .map((x) => x.trim())
    .filter(Boolean);

  const methodLine = lines?.find(
    (x) => x.startsWith("function") && x.includes(name)
  );

  const argsRaw = methodLine?.match(/\((.+)\)/);

  console.log({ argsRaw });

  if (argsRaw) {
    const args = argsRaw[1]?.split(",").map((x) => {
      const [type, name] = x.trim().split(" ");

      return {
        name,
        type,
        isArray: type.endsWith("[]"),
      };
    });

    return {
      name,
      args,
    };
  }
}

const ContractCard: FC<Props> = (props) => {
  const { data: contractData } = useContractSourceQuery(props.address);
  const contract = useContract(props.address, contractData?.ABI ?? "");

  return (
    <section>
      <div>Contract: {contractData?.ContractName}</div>
      {contract && (
        <div className="text-left">
          Contract methods:
          {Object.entries(contract.functions)
            .filter(([k]) => k.includes("(") && k.endsWith(")"))
            .map(([key, value], i) => {
              const method = parseMethod(key, contractData?.SourceCode);

              if (!method) {
                return "";
              }

              return (
                <div key={key} className="p-2 w-full">
                  {method.name}:
                  <div className="grid">
                    arguments:
                    <div>
                      {method.args.map((x, i) => (
                        <div key={`arg-${i}`}>
                          <TextInput label={x.name} />
                          name: {x.name ?? "unknown"}; type: {x.type};
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          {Object.entries(contract.filters).map(([key, value], i) => (
            <div key={key} className="flex gap-2 border p-2 w-full">
              {key}: {String(value)}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ContractCard;
