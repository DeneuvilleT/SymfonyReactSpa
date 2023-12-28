<?php

namespace App\Controller;

use App\Repository\CustomerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Doctrine\Common\Collections\Collection;

#[Route('/api/v1/orders')]
class OrdersController extends AbstractController
{
    #[Route('/load_orders/{uid}', name: 'app_orders_show', methods: ['GET'])]
    public function getUserOrders(string $uid, CustomerRepository $customerRepository): Response
    {
        $user = $this->getUser();
        $customer = $customerRepository->findOneByUid($uid);

        if ($user !== null && $user === $customer) {
            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];

            $serializer = new Serializer($normalizers, $encoders);

            $orders = $customer->getOrders();

            $ordersData = [];

            foreach ($orders as $order) {
                $ordersData[] = [
                    'id' => $order->getId(),
                    'name' => $order->getName(),
                    'amount' => $order->getAmount(),
                    'date' => $order->getCreatedAt()->format('Y-m-d H:i:s'),
                    'line_orders' => $this->getLineOrderData($order->getLineOrders()),
                    'status' => $order->getStatus(),
                ];
            }


            $jsonContent = $serializer->serialize($ordersData, 'json');
            return new Response($jsonContent);
        } else {
            throw new AccessDeniedException("Vous ne pouvez pas faire ça pour le moment.");
        }
    }

    private function getLineOrderData(Collection $lineOrders)
    {
        $lineOrderData = [];

        foreach ($lineOrders as $lineOrder) {

            $lineOrderData[] = [
                'id' => $lineOrder->getId(),
                'amount' => $lineOrder->getAmount(),
                'product' => $lineOrder->getProduct()->getTitle(),
                'quantity' => $lineOrder->getQuantity(),
            ];
        }

        return $lineOrderData;
    }
}
