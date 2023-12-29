<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;

class ReactController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(SessionInterface $session): Response
    {
        $clean = $session->get('clean');

        if ($clean) {
            $session->remove('clean');
            return $this->render('base.html.twig', [
                'clean' => true
            ]);
        } else {
            return $this->render('base.html.twig', [
                'clean' => false
            ]);
        }
    }
}
