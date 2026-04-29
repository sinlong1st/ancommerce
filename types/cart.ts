export interface CartItem {
  id: string;
  name: string;
  // Price is stored as a snapshot at time of add.
  // IMPORTANT: Real checkout must recalculate price on the server — never trust this value for payment.
  price: number;
  quantity: number;
}
