<?php

namespace App\Controller;

use App\Repository\ProductsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Doctrine\Common\Collections\Collection;

#[Route('/api/v1/products')]
class ProductsController extends AbstractController
{
    #[Route('/', name: 'app_products_index', methods: ['GET'])]
    public function index(ProductsRepository $productsRepository)
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);

        $products = $productsRepository->findAll();

        $data = [];

        foreach ($products as $product) {
            $productData = [
                'id' => $product->getId(),
                'title' => $product->getTitle(),
                'description' => $product->getDescription(),
                'cover' => $product->getCover(),
                'stock' => $product->getStock(),
                'priceUnit' => $product->getPriceUnit(),
                'brand' => $product->getBrand(),
                'sku' => $product->getSku(),
                'descriptionShort' => $product->getDescriptionShort(),
                'comments' => $this->getCommentsData($product->getComments()),
            ];

            $data[] = $productData;
        }

        $jsonContent = $serializer->serialize($data, 'json');

        return new Response($jsonContent);
    }

    private function getCommentsData(Collection $comments)
    {
        $commentData = [];

        foreach ($comments as $comment) {
            $commentData[] = [
                'id' => $comment->getId(),
                'title' => $comment->getTitle(),
                'author' => $comment->getAuthor(),
                'content' => $comment->getContent(),
                'date' => $comment->getCreatedAt()->format('Y-m-d H:i:s'),
                'customer' => $comment->getCustomer()->getId(),
                'product' => $comment->getProduct()->getId(),
            ];
        }

        return $commentData;
    }
}
