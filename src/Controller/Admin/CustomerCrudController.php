<?php

namespace App\Controller\Admin;

use App\Entity\Customer;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;


class CustomerCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Customer::class;
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
        $roles = [
            'Client' => 'ROLE_CUSTOMER',
            'SuperAdmin' => 'ROLE_SUPER_ADMIN'
        ];

        return [
            TextField::new('firstName', 'Prénom'),
            TextField::new('lastName', 'Nom'),
            EmailField::new('email', 'Email'),
            TextField::new('password', 'Mot de passe'),
            ChoiceField::new('isVerified', "Compté vérifié")->setChoices([
                0 => 0,
                1 => 1,
            ]),
            ChoiceField::new('roles', 'Rôle de l\'utilisateur')
                ->allowMultipleChoices()
                ->autocomplete()
                ->setChoices(
                    [
                        $roles['Client'] => 'ROLE_CUSTOMER',
                        $roles['SuperAdmin'] => 'ROLE_SUPER_ADMIN',
                    ]
                )
        ];
    }
}
