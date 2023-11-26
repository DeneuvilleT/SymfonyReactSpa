<?php

namespace App\Controller\Admin;

use App\Entity\Comments;
use App\Entity\Customer;
use App\Entity\Products;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;

class AdminController extends AbstractDashboardController
{
    #[Route('/admin_back_office/protected', name: 'app_admin')]
    public function index(): Response
    {
        if ($this->getUser() !== null) {
            $userRoles = $this->getUser()->getRoles();
            if ($userRoles[0] !== "SuperAdmin") {
                return $this->redirect('/');
            } else {
                $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
                return $this->redirect($adminUrlGenerator->setController(ProductsCrudController::class)->generateUrl());
            }
        } else {
            return $this->redirect('/');
        }
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Mes-reves.com');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Tableau de bord', 'fa fa-home');

        yield MenuItem::linkToCrud('Produits', 'fas fa-list', Products::class);
        yield MenuItem::linkToCrud('Clients', 'fas fa-list', Customer::class);
        yield MenuItem::linkToCrud('Commentaires', 'fas fa-list', Comments::class);
    }
}
