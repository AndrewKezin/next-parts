export interface PaymentData {
  id: string;
  amount: Amount;
  confirmation: Confirmation;
  metadata: Metadata;
  status: string;
  description: string;
  recipient: Recipient;
  created_at: string;
  test: boolean;
  paid: boolean;
  refundable: boolean;
}

export interface Amount {
  value: string;
  currency: string;
}

export interface Recipient {
  account_id: string;
  gateway_is: string;
}

export interface Confirmation {
  type: string;
  confirmation_url: string;
  return_url: string;
}

export interface Metadata {
  order_id: string | number;
}

export type PaymentCallbackData = {
  type: string;
  event: string;
  object: {
    id: string;
    status: string;
    amount: { value: string; currency: 'RUB' };
    income_amount: { value: string; currency: 'RUB' };
    description: string;
    recipient: { account_id: string; gateway_id: string };
    payment_method: {
      type: string;
      id: string;
      saved: boolean;
      title: string;
    };
    captured_at: string;
    created_at: string;
    test: boolean;
    refunded_amount: { value: string; currency: 'RUB' };
    paid: boolean;
    refundable: true;
    metadata: { order_id: string | number };
    authorization_details: {
      rrn: string;
      auth_code: string;
    };
  };
};