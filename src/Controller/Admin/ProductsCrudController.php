<?php

namespace App\Controller\Admin;

use App\Entity\Products;

use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;

class ProductsCrudController extends AbstractCrudController
{

    public static function getEntityFqcn(): string
    {
        return Products::class;
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
        return [
            TextField::new('title', 'Nom du produit'),
            TextField::new('sku', 'Référence'),
            TextField::new('brand', 'Marque'),
            TextEditorField::new('description_short', 'Description courte'),
            TextEditorField::new('description', 'Description'),
            ImageField::new('cover', 'Image')
                ->setBasePath('uploads/images/')
                ->setUploadDir('public/uploads/images/'),
            NumberField::new('stock', 'Stock'),
            MoneyField::new('price_unit', 'Prix unitaire')
                ->setCurrency('EUR')
                ->setNumDecimals(2)
        ];
    }
}
