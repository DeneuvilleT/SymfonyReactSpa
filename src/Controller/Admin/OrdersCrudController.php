<?php

namespace App\Controller\Admin;

use App\Entity\Orders;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;


class OrdersCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Orders::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setFormThemes(
                [
                    '@A2lixTranslationForm/bootstrap_5_layout.html.twig',
                    '@EasyAdmin/crud/form_theme.html.twig',
                ]
            );
    }

    public function configureFields(string $pageName): iterable
    {
        $status = [
            'IN_WAIT' => 'En attente',
            'CONFIRMED' => 'Confirmée',
            'SENDED' => 'Envoyée',
            'CANCELED' => 'Annulée',
            'REIMBURSED' => 'Remboursée',
        ];

        return [
            TextField::new('name', 'Nom')
                ->setDisabled(true),
            MoneyField::new('amount', 'Montant')
                ->setDisabled(true)
                ->setCurrency('EUR')
                ->setNumDecimals(2),
            DateTimeField::new('created_at', 'Créée le')
                ->setDisabled(true),
            ChoiceField::new('status', 'Statut de la commande')
                ->allowMultipleChoices()
                ->autocomplete()
                ->setChoices(
                    [
                        $status['IN_WAIT'] => 'En attente',
                        $status['CONFIRMED'] => 'Confirmée',
                        $status['SENDED'] => 'Envoyée',
                        $status['CANCELED'] => 'Annulée',
                        $status['REIMBURSED'] => 'Remboursée',
                    ]
                ),
            AssociationField::new('customer', 'Client')
                ->setDisabled(true)
                ->formatValue(function ($value, $entity) {
                    return $value ? $value->getFirstname() . ' ' . $value->getLastname() : '';
                })
                ->setFormTypeOption('choice_label', function ($value, $key, $index) {
                    return $value ? $value->getFirstname() . ' ' . $value->getLastname() : '';
                })
        ];
    }
}
