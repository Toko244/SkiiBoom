<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case Card = 'card';
    case PayPal = 'paypal';
    case BankTransfer = 'bank_transfer';
    case OnArrival = 'on_arrival';
}
