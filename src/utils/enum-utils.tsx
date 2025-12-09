export enum OrderStatusEnum {
  AWAITING_ACCEPTANCE = 'AWAITING_ACCEPTANCE', // Order created, awaiting merchant acceptance
  AWAITING_STOCK = 'AWAITING_STOCK', // Order accepted, awaiting stock or supply
  PROCESSING = 'PROCESSING', // Order in stock, being prepared for delivery
  AWAITING_PICKUP = 'AWAITING_PICKUP', // Order ready, awaiting customer pickup
  ON_HOLD = 'ON_HOLD', // Order on hold by merchant
  DELIVERING = 'DELIVERING', // Order is en route to the customer
  DELIVERED = 'DELIVERED', // Order delivered to the customer
  COMPLETED = 'COMPLETED', // Order fully completed and closed
  CANCELLED = 'CANCELLED', // Order was canceled by customer or merchant
  AWAITING_REFUND = 'AWAITING_REFUND', // Order was canceled, awaiting refund
  REFUNDED = 'REFUNDED', // Order refunded
}
