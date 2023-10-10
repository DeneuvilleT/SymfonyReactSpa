<?php

namespace App\Controller;

use App\Entity\Products;
use App\Form\ProductsType;
use App\Repository\ProductsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;


#[Route('/api/products')]
class ProductsController extends AbstractController
{
    #[Route('/', name: 'app_products_index', methods: ['GET'])]
    public function index(ProductsRepository $productsRepository)
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);
        
        $products = $productsRepository->findAll();
        $jsonContent = $serializer->serialize($products, 'json');
       return new Response($jsonContent);
    }

    // #[Route('/new', name: 'app_products_new', methods: ['GET', 'POST'])]
    // public function new(Request $request, EntityManagerInterface $entityManager): Response
    // {
    //     $product = new Products();
    //     $form = $this->createForm(ProductsType::class, $product);
    //     $form->handleRequest($request);

    //     if ($form->isSubmitted() && $form->isValid()) {
    //         $entityManager->persist($product);
    //         $entityManager->flush();

    //         return $this->redirectToRoute('app_products_index', [], Response::HTTP_SEE_OTHER);
    //     }

    //     return $this->render('products/new.html.twig', [
    //         'product' => $product,
    //         'form' => $form,
    //     ]);
    // }

    // #[Route('/{id}', name: 'app_products_show', methods: ['GET'])]
    // public function show(Products $product): Response
    // {
    //     return $this->render('products/show.html.twig', [
    //         'product' => $product,
    //     ]);
    // }

    // #[Route('/{id}/edit', name: 'app_products_edit', methods: ['GET', 'POST'])]
    // public function edit(Request $request, Products $product, EntityManagerInterface $entityManager): Response
    // {
    //     $form = $this->createForm(ProductsType::class, $product);
    //     $form->handleRequest($request);

    //     if ($form->isSubmitted() && $form->isValid()) {
    //         $entityManager->flush();

    //         return $this->redirectToRoute('app_products_index', [], Response::HTTP_SEE_OTHER);
    //     }

    //     return $this->render('products/edit.html.twig', [
    //         'product' => $product,
    //         'form' => $form,
    //     ]);
    // }

    // #[Route('/{id}', name: 'app_products_delete', methods: ['POST'])]
    // public function delete(Request $request, Products $product, EntityManagerInterface $entityManager): Response
    // {
    //     if ($this->isCsrfTokenValid('delete'.$product->getId(), $request->request->get('_token'))) {
    //         $entityManager->remove($product);
    //         $entityManager->flush();
    //     }

    //     return $this->redirectToRoute('app_products_index', [], Response::HTTP_SEE_OTHER);
    // }
}
