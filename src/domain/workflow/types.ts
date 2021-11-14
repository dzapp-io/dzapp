export type WorkflowStep<TInput> = {
  name: string;
  description: string;
  input: TInput;
  contractAddress: string;
  contractMethod: string;
};

export type Workflow<TInput, TSteps extends WorkflowStep<any>[]> = {
  name: string;
  description: string;
  input: TInput;
  steps: TSteps;
};
