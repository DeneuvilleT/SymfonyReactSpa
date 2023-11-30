<?php

namespace App\Controller;

use DateTime;

use App\Entity\Comments;
use App\Repository\CommentsRepository;
use App\Repository\ProductsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Serializer;


#[Route('/api/v1/comments')]
class CommentsController extends AbstractController
{
    #[Route('/', name: 'app_comments_index', methods: ['GET'])]
    public function index(CommentsRepository $commentsRepository): Response
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);

        $comments = $commentsRepository->findAll();

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

        $jsonContent = $serializer->serialize($commentData, 'json');
        return new Response($jsonContent);
    }

    #[Route('/load_comments', name: 'app_comments_user', methods: ['GET', 'POST'])]
    public function getUserComments(Request $request, CommentsRepository $commentsRepository): Response
    {
        if ($this->getUser()) {
            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];

            $serializer = new Serializer($normalizers, $encoders);

            $userId = $request->query->get('userId');

            $comments = $commentsRepository->findBy([
                "customer" => (int) $userId
            ]);

            $commentData = [];

            foreach ($comments as $comment) {
                $commentData[] = [
                    'id' => $comment->getId(),
                    'title' => $comment->getTitle(),
                    'author' => $comment->getAuthor(),
                    'content' => $comment->getContent(),
                    'date' => $comment->getCreatedAt()->format('Y-m-d H:i:s'),
                    'productId' => $comment->getProduct()->getId(),
                    'product' => $comment->getProduct()->getTitle(),
                ];
            }

            $jsonContent = $serializer->serialize($commentData, 'json');
            return new Response($jsonContent);
        }
    }

    #[Route('/comment_post', name: 'app_comments_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, ProductsRepository $productRepo, ValidatorInterface $validator): Response
    {

        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $comment = new Comments();

        $datas = json_decode($request->getContent(), true);
        $product = $productRepo->findOneBy(["id" => $datas['product']]);

        $comment->setTitle($datas['title']);
        $comment->setAuthor($datas['author']);
        $comment->setContent($datas['content']);
        $comment->setCreatedAt(new DateTime());
        $comment->setProduct($product);
        $comment->setCustomer($this->getUser());

        $errors = $validator->validate($comment);

        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }

            $response = [
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $errorMessages,
            ];

            $jsonContent = $serializer->serialize($response, 'json');

            return new JsonResponse($jsonContent, Response::HTTP_UNAUTHORIZED);
        } else {
            $entityManager->persist($comment);
            $entityManager->flush();

            $jsonContent = $serializer->serialize(["Success"], 'json');

            return new JsonResponse($jsonContent, Response::HTTP_OK);
        }
    }

    // #[Route('/{id}', name: 'app_comments_delete', methods: ['POST'])]
    // public function delete(Request $request, Comments $comment, EntityManagerInterface $entityManager): Response
    // {
    //     if ($this->isCsrfTokenValid('delete'.$comment->getId(), $request->request->get('_token'))) {
    //         $entityManager->remove($comment);
    //         $entityManager->flush();
    //     }

    //     return $this->redirectToRoute('app_comments_index', [], Response::HTTP_SEE_OTHER);
    // }
}
