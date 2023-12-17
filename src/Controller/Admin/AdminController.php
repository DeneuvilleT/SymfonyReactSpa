<?php

namespace App\Controller\Admin;

use App\Entity\Comments;
use App\Entity\Customer;
use App\Entity\Products;
use App\Entity\Addresses;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;

class AdminController extends AbstractDashboardController
{
    public function configureDashboard(): Dashboard
    {
        $this->checkUserRole();

        return Dashboard::new()
            ->setTitle('Mes-reves.com');
    }

    public function configureMenuItems(): iterable
    {
        $this->checkUserRole();

        yield MenuItem::linkToDashboard('Tableau de bord', 'fa fa-home');

        yield MenuItem::linkToCrud('Produits', 'fas fa-list', Products::class);
        yield MenuItem::linkToCrud('Clients', 'fas fa-list', Customer::class);
        yield MenuItem::linkToCrud('Commentaires', 'fas fa-list', Comments::class);
        yield MenuItem::linkToCrud('Adresses', 'fas fa-list', Addresses::class);
    }

    private function checkUserRole(): void
    {
        $request = $this->container->get('request_stack')->getCurrentRequest();
        $encodedRole = $request->query->get('role');
        $decodedRole = base64_decode($encodedRole);

        if ($decodedRole !=='ROLE_SUPER_ADMIN') {
            throw $this->createAccessDeniedException('Vous n\'avez pas les droits nécessaires pour accéder à cette page.');
        }
    }
}
