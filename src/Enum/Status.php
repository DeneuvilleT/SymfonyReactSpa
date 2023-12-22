<?php

namespace App\Enum;

enum Status: string
{
    public const IN_WAIT = 'En attente';
    public const CONFIRMED = 'Confirmée';
    public const SENDED = 'Envoyée';
    public const CANCELED = 'Annulée';
    public const REIMBURSED = 'Remboursée';
}
