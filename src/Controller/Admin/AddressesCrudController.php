<?php

namespace App\Controller\Admin;

use App\Entity\Addresses;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class AddressesCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Addresses::class;
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
        $typeChoices = [
            'Adresse de livraison' => 0,
            'Adresse de facturation' => 1,
        ];

        return [
            TextField::new('alias', 'Alias'),
            TextField::new('address', 'Adresse'),
            TextField::new('city', 'Ville'),
            TextField::new('zip_code', 'Code postal'),
            IntegerField::new('phone', 'Téléphone'),
            ChoiceField::new('type', 'Type')
                ->setChoices($typeChoices)
                ->setCustomOption('choice_label', function ($value, $key, $index) {
                    return $value === 1 ? 'Adresse de facturation' : 'Adresse de livraison';
                }),
            DateTimeField::new('created_at', 'Créée le'),
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
