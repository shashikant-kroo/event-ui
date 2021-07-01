export const microserviceData =  {
  "services": {
    "outboundPaymentService": ["accountService", "paymentAccountService"],
    "accountService": [],
    "paymentAccountService": ["customerService"],
    "customerService": ["paymentAccountService"]
  },
  "resourcesByService": {
    "outboundPaymentService": ["outboundPayment"],
    "accountService": ["prepaidAccount", "randomResource", "paymentAccount"],
    "paymentAccountService": ["paymentAccount"],
    "customerService": ["customer"]
  },
  "eventsByResource": {
    "randomResource": ["randomCreatedEvent", "randomDeletedEvent"],
    "outboundPayment": ["outboundPaymentCreated", "outboundPaymentBlocked",
      "outboundPaymentSucceeded", "outboundPaymentFailed"],
    "paymentAccount": ["paymentAccountCreated", "paymentAccountBlocked"],
    "prepaidAccount": ["prepaidAccountCreated", "prepaidAccountBlocked"]
  }
}