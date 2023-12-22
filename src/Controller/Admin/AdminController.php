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
        } else if ($action === 'edit' || $action === 'new') {
            $cookieToken = $request->cookies->get('jaat');
            $referrer = $request->query->get('referrer');

            if ($referrer !== null) {
                $token = base64_decode($this->extractTokenFromReferrer($referrer));
                if ($cookieToken !== $token) {
                    echo "Token invalide, vous n'avez pas les autorisations nécessaires.";
                    die;
                }
            } else if ($referrer === null) {
                echo "Token invalide, vous n'avez pas les autorisations nécessaires.";
                die;
            }
        }

        yield from $this->yieldMenuItem('Produits', 'fas fa-list', Products::class, $encodedRole, $tokenRequest);
        yield from $this->yieldMenuItem('Clients', 'fas fa-list', Customer::class, $encodedRole, $tokenRequest);
        yield from $this->yieldMenuItem('Commentaires', 'fas fa-list', Comments::class, $encodedRole, $tokenRequest);
        yield from $this->yieldMenuItem('Adresses', 'fas fa-list', Addresses::class, $encodedRole, $tokenRequest);
        yield from $this->yieldMenuItem('Commandes', 'fas fa-list', Orders::class, $encodedRole, $tokenRequest);
    }

    private function yieldMenuItem(string $label, string $icon, $entityClass, $encodedRole, $tokenRequest): iterable
    {
        $request = $this->container->get('request_stack')->getCurrentRequest();
        $menu = MenuItem::linkToCrud($label, $icon, $entityClass)
            ->setQueryParameter('rules', $encodedRole)
            ->setQueryParameter('token', $tokenRequest);

        if ($request->query->get('crudAction') === 'edit' || $request->query->get('crudAction')  === 'new') {
            $session = $request->getSession();
            $menu = $menu->setAction('index')->setQueryParameter('rules', base64_encode($session->get('user_role')))->setQueryParameter('token', base64_encode($session->get('jwt_token')));
        }
        yield $menu;
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
