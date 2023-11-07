<?php

namespace App\Controller;

use Stripe\Stripe;
use Stripe\Checkout\Session;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StripeController extends AbstractController
{
    #[Route('/api/v1/stripe/checkout', name: 'app_checkout', methods: ['POST', 'GET'])]
    public function checkout(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        /**
         * Envoyer le panier au succés pour retrouver les articles et les retirer
         */

        foreach ($data as $product) {
            $realPrice  = (int)$product['priceUnit'] * 1;

            $lineItems[] = [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $product['title'],
                    ],
                    'unit_amount' => $realPrice,
                ],
                'quantity' => $product['item_quantity'],
            ];
        }

        $tokenProvider = $this->container->get('security.csrf.token_manager');
        $token = $tokenProvider->getToken('stripe_token')->getValue();

        Stripe::setApiKey("sk_test_51LNAhmC17yFFjZeKpt9iZzF7X3zyh8b1nCC8HOnuVDCFL5Fxd08YvUmmw8gOFNaRr6a5LbussyOpWa5o7AFASDst00Mocj7bKg");

        $session = Session::create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => 'http://localhost:8000/checkout_success/' . $token,
            'cancel_url' => 'http://localhost:8000/checkout_error',
        ]);

        return new JsonResponse($session->url);
    }

    #[Route('checkout_success/{token}', name: 'app_checkout_success', methods: ['GET'])]
    public function checkoutSuccess(string $token): Response
    {
        // !!!!!!!!!!!!!!!!!!!!!!!!!!

        /**
         * Retirer la quantité du stock
         */

        if ($this->isCsrfTokenValid('stripe_token', $token)) {
            return $this->render('react/index.html.twig');
        }

        return $this->redirectToRoute('app_home');
    }

    #[Route('checkout_error', name: 'app_checkout_error', methods: ['GET'])]
    public function checkoutError(): Response
    {
        return $this->render('react/index.html.twig');
    }
}
