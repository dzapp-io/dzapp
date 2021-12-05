import { FC, useCallback, useState } from "react";
import {
  ErrorFragment,
  EventFragment,
  FunctionFragment,
} from "@ethersproject/abi";
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

  const functions = Object.values(contract?.interface?.functions ?? {});
  const events = Object.values(contract?.interface?.events ?? {});
  const errors = Object.values(contract?.interface?.errors ?? {});

  const [selectedFunction, selectFunction] = useState<FunctionFragment>();
  const [selectedEvent, selectEvent] = useState<EventFragment>();
  const [selectedError, selectError] = useState<ErrorFragment>();

  const [result, setResult] = useState<any[]>();

  const handleRun = useCallback(async () => {
    if (!contract) {
      return;
    }

    if (selectedFunction) {
      setResult(undefined);

      const fn = contract.functions[selectedFunction.name];

      if (fn) {
        const result = await fn();
        setResult(result);
      }
    }
  }, [contract, selectedFunction]);

  return (
    <section className="grid gap-8 rounded-2xl p-2">
      <span className="text-xl">{contractData?.ContractName}</span>
      {contract && (
        <div className="grid gap-4">
          <Select<FunctionFragment>
            label="Functions"
            labelExtractor={(x) => x.name}
            value={selectedFunction}
            onChange={(x) => {
              setResult(undefined);
              selectFunction(x);
            }}
            items={functions.map((fragment) => ({
              value: fragment,
              label: fragment.name,
            }))}
          />
          {events?.length > 0 && (
            <Select<EventFragment>
              label="Events"
              labelExtractor={(x) => x.name}
              value={selectedEvent}
              onChange={selectEvent}
              items={events.map((fragment) => ({
                value: fragment,
                label: fragment.name,
              }))}
            />
          )}
          {errors?.length > 0 && (
            <Select<ErrorFragment>
              label="Errors"
              labelExtractor={(x) => x.name}
              value={selectedError}
              onChange={selectError}
              items={errors.map((fragment) => ({
                value: fragment,
                label: fragment.name,
              }))}
            />
          )}
          {selectedFunction && (
            <div className="w-full bg-gray-800 text-white rounded-2xl overflow-hidden grid gap-4">
              <div className="bottom-auto text-xl text-pink-400 pb-6 border-b-2 border-pink-400 grid gap-4 p-4">
                {selectedFunction.name}
                <div className="text-purple-400 text-base font-mono bg-gray-900 p-4 rounded-xl">
                  {selectedFunction.format("full")}
                </div>
              </div>
              <div className="grid gap-4 text-white text-left p-4">
                {Boolean(selectedFunction.inputs?.length) && (
                  <div className="font-bold">Inputs:</div>
                )}
                {selectedFunction.inputs?.map((x, i) => (
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
                {selectedFunction.payable ? (
                  <Button>Connect</Button>
                ) : (
                  <Button onClick={handleRun}>Run</Button>
                )}

                {result && (
                  <>
                    <div>Result:</div>
                    {result.map((x, i) => (
                      <div key={`output-${i}`}>{JSON.stringify(x)}</div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ContractCard;
