export const microServiceType = {
  ACCOUNT_MICRO_SERVICE : "accountService",
  OUT_BOUND_PAYMENT_SERVICE: "outboundPaymentService",
  PAYMENT_ACCOUNT_SERVICE: "paymentAccountService",
  PREPAID_ACCOUNT_SERVICE: "prepaidAccountService"
}

export const resourceType = {
  accountServiceType : {
    PREPAID_ACCOUNT: "prepaidAccount",
    PAYMENT_ACCOUNT: "paymentAccount",
    RANDOM_RESOURCE: "randomResource"
  },

  outBoundServiceType: {
    OUT_BOUND_PAYMENT: "outboundPayment"
  },

  prepaidAccountType : {
    PREPAID_ACCOUNT: "prepaidAccount"
  }
}
