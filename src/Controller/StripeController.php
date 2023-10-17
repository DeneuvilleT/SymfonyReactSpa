<?php

namespace App\Controller;

use Stripe\Stripe;
use Stripe\Checkout\Session;

use App\Entity\Products;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StripeController extends AbstractController
{
    #[Route('/api/stripe/product/{product}', name: 'app_checkout', methods: ['GET'])]
    public function checkout(Products $product): Response
    {
        $tokenProvider = $this->container->get('security.csrf.token_manager');
        $token = $tokenProvider->getToken('stripe_token')->getValue();

        Stripe::setApiKey("sk_test_51LNAhmC17yFFjZeKpt9iZzF7X3zyh8b1nCC8HOnuVDCFL5Fxd08YvUmmw8gOFNaRr6a5LbussyOpWa5o7AFASDst00Mocj7bKg");

        $session = Session::create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => $product->getTitle(),
                        ],
                        // 'unit_amount' => $product->getPriceUnit(),
                        'unit_amount' => 300,
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
            'success_url' => 'http://127.0.0.1:8000/#/checkout_success/' . $token,
            'cancel_url' => 'http://127.0.0.1:8000/#/checkout_error',
        ]);

        return $this->redirect($session->url, 303);
    }

    #[Route('checkout_success/{token}', name: 'app_checkout_success', methods: ['GET'])]
    public function checkoutSuccess(string $token): Response
    {

        if ($this->isCsrfTokenValid('stripe_token', $token)) {
            return $this->render('auction/checkout_success.html.twig');
        }

        return $this->redirectToRoute('app_auction_index');
    }

    #[Route('checkout_error', name: 'app_checkout_error', methods: ['GET'])]
    public function checkoutError(): Response
    {
        return $this->render('auction/checkout_error.html.twig');
    }
}
