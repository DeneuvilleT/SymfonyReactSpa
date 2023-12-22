<?php

namespace App\Controller\Admin;

use App\Entity\Comments;
use App\Entity\Customer;
use App\Entity\Products;
use App\Entity\Addresses;
use App\Entity\Orders;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractDashboardController
{
    #[Route('/admin')]
    public function index(): Response
    {
        return $this->redirectToRoute('app_home', [], Response::HTTP_MOVED_PERMANENTLY);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Mes-reves.com');
    }

    public function configureMenuItems(): iterable
    {
        $request = $this->container->get('request_stack')->getCurrentRequest();

        $encodedRole = $request->query->get('rules');
        $tokenRequest = $request->query->get('token');
        $action = $request->query->get('crudAction');

        if ($action === 'index') {
            $this->checkPermissions();
        } else {

            $cookieToken = $request->cookies->get('jaat');
            $referrer = $request->query->get('referrer');
            $token = base64_decode($this->extractTokenFromReferrer($referrer));

            if ($cookieToken !== $token) {
                echo "Token invalide, vous n'avez pas les autorisations nécessaire.";
                die;
            }
        }

        yield MenuItem::linkToCrud('Produits', 'fas fa-list', Products::class)
            ->setQueryParameter('rules', $encodedRole)
            ->setQueryParameter('token', $tokenRequest);
        yield MenuItem::linkToCrud('Clients', 'fas fa-list', Customer::class)
            ->setQueryParameter('rules', $encodedRole)
            ->setQueryParameter('token', $tokenRequest);
        yield MenuItem::linkToCrud('Commentaires', 'fas fa-list', Comments::class)
            ->setQueryParameter('rules', $encodedRole)
            ->setQueryParameter('token', $tokenRequest);
        yield MenuItem::linkToCrud('Adresses', 'fas fa-list', Addresses::class)
            ->setQueryParameter('rules', $encodedRole)
            ->setQueryParameter('token', $tokenRequest);
        yield MenuItem::linkToCrud('Commandes', 'fas fa-list', Orders::class)
            ->setQueryParameter('rules', $encodedRole)
            ->setQueryParameter('token', $tokenRequest);
    }

    public function checkPermissions(): void
    {
        $request = $this->container->get('request_stack')->getCurrentRequest();
        $session = $request->getSession();

        $encodedRole = $request->query->get('rules');
        $tokenRequest = $request->query->get('token');

        $cookieToken = $request->cookies->get('jaat');

        $decodedRole = base64_decode($encodedRole);
        $decodedToken = base64_decode($tokenRequest);

        $session->set('user_role', $decodedRole);
        $session->set('jwt_token', $decodedToken);

        if ($session->get('user_role') !== 'ROLE_SUPER_ADMIN' || $cookieToken !== $session->get('jwt_token')) {
            echo "Token invalide, vous n'avez pas les autorisations nécessaire.";
            die;
        }
    }

    private function extractTokenFromReferrer(string $referrer): string
    {
        $parsedUrl = parse_url($referrer);
        parse_str($parsedUrl['query'], $queryParameters);

        if (isset($queryParameters['token'])) {
            return $queryParameters['token'];
        }

        echo "Token invalide, vous n'avez pas les autorisations nécessaire.";
        die;
    }
}
