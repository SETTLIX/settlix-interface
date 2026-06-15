import { SorobanRpc, Contract, TransactionBuilder, Networks, Operation } from '@stellar/stellar-sdk';

const RPC_URL = process.env.NEXT_PUBLIC_SOROBAN_RPC_URL || 'https://soroban-testnet.stellar.org';
const NETWORK_PASSPHRASE = process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015';

export const server = new SorobanRpc.Server(RPC_URL);

export interface PaymentContractInterface {
  createPayment: (
    customer: string,
    merchant: string,
    amount: bigint,
    token: string,
    reference: string
  ) => Promise<string>;
  getPayment: (paymentId: bigint) => Promise<Payment>;
}

export interface Payment {
  id: bigint;
  merchant: string;
  customer: string;
  amount: bigint;
  token: string;
  status: 'Pending' | 'Completed' | 'Refunded' | 'Failed';
  timestamp: bigint;
  reference: string;
}

export interface Merchant {
  address: string;
  name: string;
  businessId: string;
  settlementAddress: string;
  isActive: boolean;
  registeredAt: bigint;
}

export const getContractClient = (contractId: string) => {
  return new Contract(contractId);
};

export const buildTransaction = async (
  sourceAccount: string,
  operations: Operation[]
) => {
  const account = await server.getAccount(sourceAccount);
  
  const transaction = new TransactionBuilder(account, {
    fee: '100',
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .setTimeout(30)
    .addOperation(...operations)
    .build();
  
  return transaction;
};

export const submitTransaction = async (signedTx: string) => {
  try {
    const result = await server.sendTransaction(signedTx);
    return result;
  } catch (error) {
    console.error('Transaction submission error:', error);
    throw error;
  }
};
