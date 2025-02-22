import type { Stripe } from 'stripe';

type StripeWebhookEventType = Stripe.WebhookEndpointCreateParams.EnabledEvent;

type StripeWebhookEvent<EventType extends StripeWebhookEventType, Payload> = {
  type: EventType;
  data: {
    object: Payload;
  };
};

// prettier-ignore
export type StripeWebhookEvents =
  | StripeWebhookEvent<'*', unknown>
  | StripeWebhookEvent<'customer.created', Stripe.Customer>
  | StripeWebhookEvent<'account.application.authorized', Stripe.Account>
  | StripeWebhookEvent<'account.application.deauthorized', Stripe.Account>
  | StripeWebhookEvent<'account.external_account.created', Stripe.Account>
  | StripeWebhookEvent<'account.external_account.deleted', Stripe.Account>
  | StripeWebhookEvent<'account.external_account.updated', Stripe.Account>
  | StripeWebhookEvent<'account.updated', Stripe.Account>
  | StripeWebhookEvent<'application_fee.created', Stripe.ApplicationFee>
  | StripeWebhookEvent<'application_fee.refund.updated', Stripe.ApplicationFee>
  | StripeWebhookEvent<'application_fee.refunded', Stripe.ApplicationFee>
  | StripeWebhookEvent<'balance.available', Stripe.Balance>
  | StripeWebhookEvent<'billing_portal.configuration.created', Stripe.BillingPortal.Configuration>
  | StripeWebhookEvent<'billing_portal.configuration.updated', Stripe.BillingPortal.Configuration>
  | StripeWebhookEvent<'capability.updated', Stripe.Capability>
  | StripeWebhookEvent<'charge.captured', Stripe.Charge>
  | StripeWebhookEvent<'charge.dispute.closed', Stripe.Charge>
  | StripeWebhookEvent<'charge.dispute.created', Stripe.Charge>
  | StripeWebhookEvent<'charge.dispute.funds_reinstated', Stripe.Charge>
  | StripeWebhookEvent<'charge.dispute.funds_withdrawn', Stripe.Charge>
  | StripeWebhookEvent<'charge.dispute.updated', Stripe.Charge>
  | StripeWebhookEvent<'charge.expired', Stripe.Charge>
  | StripeWebhookEvent<'charge.failed', Stripe.Charge>
  | StripeWebhookEvent<'charge.pending', Stripe.Charge>
  | StripeWebhookEvent<'charge.refund.updated', Stripe.Charge>
  | StripeWebhookEvent<'charge.refunded', Stripe.Charge>
  | StripeWebhookEvent<'charge.succeeded', Stripe.Charge>
  | StripeWebhookEvent<'charge.updated', Stripe.Charge>
  | StripeWebhookEvent<'checkout.session.async_payment_failed', Stripe.Checkout.Session>
  | StripeWebhookEvent<'checkout.session.async_payment_succeeded', Stripe.Checkout.Session>
  | StripeWebhookEvent<'checkout.session.completed', Stripe.Checkout.Session>
  | StripeWebhookEvent<'checkout.session.expired', Stripe.Checkout.Session>
  | StripeWebhookEvent<'coupon.created', Stripe.Coupon>
  | StripeWebhookEvent<'coupon.deleted', Stripe.Coupon>
  | StripeWebhookEvent<'coupon.updated', Stripe.Coupon>
  | StripeWebhookEvent<'credit_note.created', Stripe.CreditNote>
  | StripeWebhookEvent<'credit_note.updated', Stripe.CreditNote>
  | StripeWebhookEvent<'credit_note.voided', Stripe.CreditNote>
  | StripeWebhookEvent<'customer.created', Stripe.Customer>
  | StripeWebhookEvent<'customer.deleted', Stripe.Customer>
  | StripeWebhookEvent<'customer.discount.created', Stripe.Discount>
  | StripeWebhookEvent<'customer.discount.deleted', Stripe.Discount>
  | StripeWebhookEvent<'customer.discount.updated', Stripe.Discount>
  | StripeWebhookEvent<'customer.source.created', Stripe.Source>
  | StripeWebhookEvent<'customer.source.deleted', Stripe.Source>
  | StripeWebhookEvent<'customer.source.expiring', Stripe.Source>
  | StripeWebhookEvent<'customer.source.updated', Stripe.Source>
  | StripeWebhookEvent<'customer.subscription.created', Stripe.Subscription>
  | StripeWebhookEvent<'customer.subscription.deleted', Stripe.Subscription>
  | StripeWebhookEvent<'customer.subscription.pending_update_applied', Stripe.Subscription>
  | StripeWebhookEvent<'customer.subscription.pending_update_expired', Stripe.Subscription>
  | StripeWebhookEvent<'customer.subscription.trial_will_end', Stripe.Subscription>
  | StripeWebhookEvent<'customer.subscription.updated', Stripe.Subscription>
  | StripeWebhookEvent<'customer.tax_id.created', Stripe.TaxId>
  | StripeWebhookEvent<'customer.tax_id.deleted', Stripe.TaxId>
  | StripeWebhookEvent<'customer.tax_id.updated', Stripe.TaxId>
  | StripeWebhookEvent<'customer.updated', Stripe.Customer>
  | StripeWebhookEvent<'file.created', Stripe.File>
  | StripeWebhookEvent<'identity.verification_session.canceled', Stripe.Identity.VerificationSession>
  | StripeWebhookEvent<'identity.verification_session.created', Stripe.Identity.VerificationSession>
  | StripeWebhookEvent<'identity.verification_session.processing', Stripe.Identity.VerificationSession>
  | StripeWebhookEvent<'identity.verification_session.redacted', Stripe.Identity.VerificationSession>
  | StripeWebhookEvent<'identity.verification_session.requires_input', Stripe.Identity.VerificationSession>
  | StripeWebhookEvent<'identity.verification_session.verified', Stripe.Identity.VerificationSession>
  | StripeWebhookEvent<'invoice.created', Stripe.Invoice>
  | StripeWebhookEvent<'invoice.deleted', Stripe.Invoice>
  | StripeWebhookEvent<'invoice.finalization_failed', Stripe.Invoice>
  | StripeWebhookEvent<'invoice.finalized', Stripe.Invoice>
  | StripeWebhookEvent<'invoice.marked_uncollectible', Stripe.Invoice>
  | StripeWebhookEvent<'invoice.paid', Stripe.Invoice>
  | StripeWebhookEvent<'invoice.payment_action_required', Stripe.Invoice>
  | StripeWebhookEvent<'invoice.payment_failed', Stripe.Invoice>
  | StripeWebhookEvent<'invoice.payment_succeeded', Stripe.Invoice>
  | StripeWebhookEvent<'invoice.sent', Stripe.Invoice>
  | StripeWebhookEvent<'invoice.upcoming', Stripe.Invoice>
  | StripeWebhookEvent<'invoice.updated', Stripe.Invoice>
  | StripeWebhookEvent<'invoice.voided', Stripe.Invoice>
  | StripeWebhookEvent<'invoiceitem.created', Stripe.InvoiceItem>
  | StripeWebhookEvent<'invoiceitem.deleted', Stripe.InvoiceItem>
  // | StripeWebhookEvent<'invoiceitem.updated', Stripe.InvoiceItem>
  | StripeWebhookEvent<'issuing_authorization.created', Stripe.Issuing.Authorization>
  | StripeWebhookEvent<'issuing_authorization.request', Stripe.Issuing.Authorization>
  | StripeWebhookEvent<'issuing_authorization.updated', Stripe.Issuing.Authorization>
  | StripeWebhookEvent<'issuing_card.created', Stripe.Issuing.Card>
  | StripeWebhookEvent<'issuing_card.updated', Stripe.Issuing.Card>
  | StripeWebhookEvent<'issuing_cardholder.created', Stripe.Issuing.Cardholder>
  | StripeWebhookEvent<'issuing_cardholder.updated', Stripe.Issuing.Cardholder>
  | StripeWebhookEvent<'issuing_dispute.closed', Stripe.Issuing.Dispute>
  | StripeWebhookEvent<'issuing_dispute.created', Stripe.Issuing.Dispute>
  | StripeWebhookEvent<'issuing_dispute.funds_reinstated', Stripe.Issuing.Dispute>
  | StripeWebhookEvent<'issuing_dispute.submitted', Stripe.Issuing.Dispute>
  | StripeWebhookEvent<'issuing_dispute.updated', Stripe.Issuing.Dispute>
  | StripeWebhookEvent<'issuing_transaction.created', Stripe.Issuing.Transaction>
  | StripeWebhookEvent<'issuing_transaction.updated', Stripe.Issuing.Transaction>
  | StripeWebhookEvent<'mandate.updated', Stripe.Mandate>
  // | StripeWebhookEvent<'order.created', Stripe.Order>
  | StripeWebhookEvent<'payment_intent.amount_capturable_updated', Stripe.PaymentIntent>
  | StripeWebhookEvent<'payment_intent.canceled', Stripe.PaymentIntent>
  | StripeWebhookEvent<'payment_intent.created', Stripe.PaymentIntent>
  | StripeWebhookEvent<'payment_intent.payment_failed', Stripe.PaymentIntent>
  | StripeWebhookEvent<'payment_intent.processing', Stripe.PaymentIntent>
  | StripeWebhookEvent<'payment_intent.requires_action', Stripe.PaymentIntent>
  | StripeWebhookEvent<'payment_intent.succeeded', Stripe.PaymentIntent>
  | StripeWebhookEvent<'payment_method.attached', Stripe.PaymentMethod>
  | StripeWebhookEvent<'payment_method.automatically_updated', Stripe.PaymentMethod>
  | StripeWebhookEvent<'payment_method.detached', Stripe.PaymentMethod>
  | StripeWebhookEvent<'payment_method.updated', Stripe.PaymentMethod>
  | StripeWebhookEvent<'payout.canceled', Stripe.Payout>
  | StripeWebhookEvent<'payout.created', Stripe.Payout>
  | StripeWebhookEvent<'payout.failed', Stripe.Payout>
  | StripeWebhookEvent<'payout.paid', Stripe.Payout>
  | StripeWebhookEvent<'payout.updated', Stripe.Payout>
  | StripeWebhookEvent<'person.created', Stripe.Person>
  | StripeWebhookEvent<'person.deleted', Stripe.Person>
  | StripeWebhookEvent<'person.updated', Stripe.Person>
  | StripeWebhookEvent<'plan.created', Stripe.Plan>
  | StripeWebhookEvent<'plan.deleted', Stripe.Plan>
  | StripeWebhookEvent<'plan.updated', Stripe.Plan>
  | StripeWebhookEvent<'price.created', Stripe.Price>
  | StripeWebhookEvent<'price.deleted', Stripe.Price>
  | StripeWebhookEvent<'price.updated', Stripe.Price>
  | StripeWebhookEvent<'product.created', Stripe.Product>
  | StripeWebhookEvent<'product.deleted', Stripe.Product>
  | StripeWebhookEvent<'product.updated', Stripe.Product>
  | StripeWebhookEvent<'promotion_code.created', Stripe.PromotionCode>
  | StripeWebhookEvent<'promotion_code.updated', Stripe.PromotionCode>
  | StripeWebhookEvent<'quote.accepted', Stripe.Quote>
  | StripeWebhookEvent<'quote.canceled', Stripe.Quote>
  | StripeWebhookEvent<'quote.created', Stripe.Quote>
  | StripeWebhookEvent<'quote.finalized', Stripe.Quote>
  | StripeWebhookEvent<'radar.early_fraud_warning.created', Stripe.Radar.EarlyFraudWarning>
  | StripeWebhookEvent<'radar.early_fraud_warning.updated', Stripe.Radar.EarlyFraudWarning>
  // | StripeWebhookEvent<'recipient.created', Stripe.Customer>
  // | StripeWebhookEvent<'recipient.deleted', Stripe.Customer>
  // | StripeWebhookEvent<'recipient.updated', Stripe.Customer>
  | StripeWebhookEvent<'reporting.report_run.failed', Stripe.Reporting.ReportRun>
  | StripeWebhookEvent<'reporting.report_run.succeeded', Stripe.Reporting.ReportRun>
  | StripeWebhookEvent<'reporting.report_type.updated', Stripe.Reporting.ReportType>
  | StripeWebhookEvent<'review.closed', Stripe.Review>
  | StripeWebhookEvent<'review.opened', Stripe.Review>
  | StripeWebhookEvent<'setup_intent.canceled', Stripe.SetupIntent>
  | StripeWebhookEvent<'setup_intent.created', Stripe.SetupIntent>
  | StripeWebhookEvent<'setup_intent.requires_action', Stripe.SetupIntent>
  | StripeWebhookEvent<'setup_intent.setup_failed', Stripe.SetupIntent>
  | StripeWebhookEvent<'setup_intent.succeeded', Stripe.SetupIntent>
  | StripeWebhookEvent<'sigma.scheduled_query_run.created', Stripe.Sigma.ScheduledQueryRun>
  // | StripeWebhookEvent<'sku.created', Stripe.Sku>
  // | StripeWebhookEvent<'sku.deleted', Stripe.Sku>
  // | StripeWebhookEvent<'sku.updated', Stripe.Sku>
  | StripeWebhookEvent<'source.canceled', Stripe.Source>
  | StripeWebhookEvent<'source.chargeable', Stripe.Source>
  | StripeWebhookEvent<'source.failed', Stripe.Source>
  | StripeWebhookEvent<'source.mandate_notification', Stripe.Source>
  | StripeWebhookEvent<'source.refund_attributes_required', Stripe.Source>
  | StripeWebhookEvent<'source.transaction.created', Stripe.Source>
  | StripeWebhookEvent<'source.transaction.updated', Stripe.Source>
  | StripeWebhookEvent<'subscription_schedule.aborted', Stripe.SubscriptionSchedule>
  | StripeWebhookEvent<'subscription_schedule.canceled', Stripe.SubscriptionSchedule>
  | StripeWebhookEvent<'subscription_schedule.completed', Stripe.SubscriptionSchedule>
  | StripeWebhookEvent<'subscription_schedule.created', Stripe.SubscriptionSchedule>
  | StripeWebhookEvent<'subscription_schedule.expiring', Stripe.SubscriptionSchedule>
  | StripeWebhookEvent<'subscription_schedule.released', Stripe.SubscriptionSchedule>
  | StripeWebhookEvent<'subscription_schedule.updated', Stripe.SubscriptionSchedule>
  | StripeWebhookEvent<'tax_rate.created', Stripe.TaxRate>
  | StripeWebhookEvent<'tax_rate.updated', Stripe.TaxRate>
  | StripeWebhookEvent<'topup.canceled', Stripe.Topup>
  | StripeWebhookEvent<'topup.created', Stripe.Topup>
  | StripeWebhookEvent<'topup.failed', Stripe.Topup>
  | StripeWebhookEvent<'topup.reversed', Stripe.Topup>
  | StripeWebhookEvent<'topup.succeeded', Stripe.Topup>
  | StripeWebhookEvent<'transfer.created', Stripe.Transfer>
  | StripeWebhookEvent<'transfer.reversed', Stripe.Transfer>
  | StripeWebhookEvent<'transfer.updated', Stripe.Transfer>
