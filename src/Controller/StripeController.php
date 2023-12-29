<?php

namespace App\Controller;

use Stripe\Stripe;
use App\Entity\Orders;
use App\Entity\LineOrders;
use Stripe\Checkout\Session;
use App\Repository\ProductsRepository;
use App\Repository\CustomerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class StripeController extends AbstractController
{
    #[Route('/api/v1/stripe/checkout/{uid}', name: 'app_checkout', methods: ['POST', 'GET'])]
    public function checkout(string $uid, CustomerRepository $customerRepository, Request $request)
    {
        $user = $this->getUser();
        $customer = $customerRepository->findOneByUid($uid);

        if ($user !== null && $user === $customer) {
            $data = json_decode($request->getContent(), true);

            $productData = [];

            foreach ($data as $product) {
                $realPrice = (int)$product['priceUnit'] * 1;

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
                $productData[$product['id']] = $product['item_quantity'];
            }

            $productDataJson = json_encode($productData);

            $tokenProvider = $this->container->get('security.csrf.token_manager');
            $token = $tokenProvider->getToken('stripe_token')->getValue();

            Stripe::setApiKey("sk_test_51LNAhmC17yFFjZeKpt9iZzF7X3zyh8b1nCC8HOnuVDCFL5Fxd08YvUmmw8gOFNaRr6a5LbussyOpWa5o7AFASDst00Mocj7bKg");

            $stripeSession = Session::create([
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => 'http://localhost:8000/checkout_success/' . $token . '/' . $uid . '?productData=' . urlencode($productDataJson),
                'cancel_url' => 'http://localhost:8000/checkout_error',
            ]);

            return new JsonResponse($stripeSession->url);
        } else {
            throw new AccessDeniedException("Vous ne pouvez pas faire ça pour le moment.");
        }
    }

    #[Route('checkout_success/{token}/{uid}', name: 'app_checkout_success', methods: ['GET'])]
    public function checkoutSuccess(string $token, string $uid,  Request $request, ProductsRepository $productRepo,  CustomerRepository $customerRepository, EntityManagerInterface $entityManager, SessionInterface $session): Response
    {
        $productDataJson = $request->query->get('productData');
        $productData = json_decode(urldecode($productDataJson), true);
        $customer = $customerRepository->findOneByUid($uid);

        $products = $productRepo->findBy(['id' => array_keys($productData)]);

        $order = new Orders();
        $order->setName('Facture');
        $order->setCustomer($customer);
        $order->setCreatedAt(new \DateTime());
        $order->setStatus(["En attente"]);

        $totalAmount = 0;

        foreach ($products as $product) {
            $productId = $product->getId();

            $quantityToSubtract = $productData[$productId];
            $currentStock = $product->getStock();

            if ($currentStock >= $quantityToSubtract) {

                $product->setStock($currentStock - $quantityToSubtract);
                $productRepo->save($product, true);

                $lineOrder = new LineOrders();
                $lineOrder->setOrderId($order);
                $lineOrder->setProduct($product);
                $lineOrder->setAmount($product->getPriceUnit());
                $lineOrder->setQuantity($quantityToSubtract);

                $lineAmount = (float)$product->getPriceUnit();
                $totalAmount += $lineAmount * $quantityToSubtract;

                $order->addLineOrder($lineOrder);
            } else {
                return $this->redirectToRoute('app_home');
            }
        }

        $order->setAmount($totalAmount);

        $entityManager->persist($order);
        $entityManager->flush();

        $order->setName('Facture' . ' ' . $order->getId());

        $entityManager->persist($order);
        $entityManager->flush();

        if ($this->isCsrfTokenValid('stripe_token', $token)) {
            $session->set('clean', true);
            return $this->redirectToRoute('app_home');
        }

        $session->set('clean', true);
        return $this->redirectToRoute('app_home');
    }


    #[Route('checkout_error', name: 'app_checkout_error', methods: ['GET'])]
    public function checkoutError(SessionInterface $session): Response
    {
        $session->set('clean', true);

        return $this->redirectToRoute('app_home');
    }
}
