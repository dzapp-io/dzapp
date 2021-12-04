import { FC, useCallback, useState } from "react";
import { FunctionFragment } from "@ethersproject/abi";
import { InfuraProvider } from "@ethersproject/providers";
import { Networkish } from "@ethersproject/networks";

import { useContractSourceQuery } from "lib/etherscan";
import { useContract } from "lib/hooks";

import TextInput from "components/TextInput";
import Select from "components/Select";
import Button from "components/Button";
type Props = {
  address: string;
  abi?: string;
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

function useInfuraProvider(network?: Networkish) {
  return new InfuraProvider(network, process.env.NEXT_PUBLIC_INFURA_ID);
}

const ContractCard: FC<Props> = (props) => {
  const { data: contractData } = useContractSourceQuery(props.address);
  const infuraProvider = useInfuraProvider();
  const contract = useContract(
    props.address,
    contractData?.ABI ?? "",
    infuraProvider
  );

  const functionEntries = Object.values(contract?.interface?.functions ?? {});

  const [selectedEntry, selectEntry] = useState<FunctionFragment>();

  const [result, setResult] = useState<any[]>();

  const handleRun = useCallback(async () => {
    if (!contract) {
      return;
    }

    if (selectedEntry) {
      setResult(undefined);

      const fn = contract.functions[selectedEntry.name];

      if (fn) {
        const result = await fn();
        setResult(result);
      }
    }
  }, [contract, selectedEntry]);

  return (
    <section className="grid gap-8 rounded-2xl p-2">
      <span className="text-xl">{contractData?.ContractName}</span>
      {contract && (
        <div className="grid gap-4">
          <Select<FunctionFragment>
            label="Functions"
            labelExtractor={(x) => x.name}
            value={selectedEntry}
            onChange={selectEntry}
            items={functionEntries.map((fragment) => ({
              value: fragment,
              label: fragment.name,
            }))}
          />
          {selectedEntry && (
            <div className="w-full bg-gray-800 text-white rounded-2xl overflow-hidden grid gap-4">
              <div className="bottom-auto text-xl text-pink-400 pb-6 border-b-2 border-pink-400 grid gap-4 p-4">
                {selectedEntry.name}
                <div className="text-purple-400 text-base font-mono bg-gray-900 p-4 rounded-xl">
                  {selectedEntry.format("full")}
                </div>
              </div>
              <div className="grid gap-4 text-white text-left p-4">
                {Boolean(selectedEntry.inputs?.length) && (
                  <div className="font-bold">Inputs:</div>
                )}
                {selectedEntry.inputs?.map((x, i) => (
                  <div key={`input-${i}`}>
                    <TextInput
                      label={
                        <>
                          {x.name} (
                          <span className="text-pink-400">
                            {x.type} / {x.baseType}
                          </span>
                          )
                        </>
                      }
                    />
                  </div>
                ))}

                {selectedEntry.payable ? (
                  <Button>Connect</Button>
                ) : (
                  <Button onClick={handleRun}>Run</Button>
                )}

                {result && <div>Output:</div>}

                {result &&
                  result.map((x, i) => <div key={`output-${i}`}>{x}</div>)}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ContractCard;
