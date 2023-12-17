<?php

namespace App\Controller\Admin;

use App\Entity\Comments;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;


class CommentsCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Comments::class;
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
            TextField::new('title', 'Titre'),
            TextField::new('author', 'Auteur'),
            TextEditorField::new('content', 'Contenu'),
            DateTimeField::new('created_at', 'Publié le'),
        ];
    }
}
