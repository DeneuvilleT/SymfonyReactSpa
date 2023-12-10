<?php

namespace App\Controller;

use DateTime;

use App\Entity\Comments;
use App\Entity\Customer;
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
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

#[Route('/api/v1/comments')]
class CommentsController extends AbstractController
{
    #[Route('/load_comments/{id}', name: 'app_comments_user', methods: ['GET'])]
    public function getUserComments(Customer $customer): Response
    {
        $user = $this->getUser();

        if ($user !== null && $customer === $user) {
            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];

            $serializer = new Serializer($normalizers, $encoders);

            $comments = $customer->getComments();

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
        } else {
            throw new AccessDeniedException("Vous ne pouvez pas faire ça pour le moment.");
        }
    }

    #[Route('/add_comment/{id}', name: 'app_comments_new', methods: ['POST'])]
    public function addNewComment(Customer $customer, Request $request, EntityManagerInterface $entityManager, ProductsRepository $productRepo, ValidatorInterface $validator): Response
    {
        $user = $this->getUser();

        if ($user !== null && $customer === $user) {

            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];
            $serializer = new Serializer($normalizers, $encoders);

            $comment = new Comments();

            $datas = json_decode($request->getContent(), true);
            $product = $productRepo->findOneBy(["id" => $datas['productId']]);

            $comment->setTitle($datas['title']);
            $comment->setAuthor($datas['author']);
            $comment->setContent($datas['content']);
            $comment->setCreatedAt(new DateTime());
            $comment->setProduct($product);
            $comment->setCustomer($customer);

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

                return new JsonResponse(Response::HTTP_OK);
            }
        } else {
            throw new AccessDeniedException("Vous ne pouvez pas faire ça pour le moment.");
        }
    }

    #[Route('/delete_comment/{id}', name: 'app_comments_delete', methods: ['GET'])]
    public function delete(Comments $comment, EntityManagerInterface $entityManager): Response
    {
        $user = $this->getUser();

        if ($user !== null && $comment->getCustomer() === $user) {
            $entityManager->remove($comment);
            $entityManager->flush();

            return new Response(Response::HTTP_OK);
        } else {
            throw new AccessDeniedException("Vous n'avez pas le droit de supprimer ce commentaire.");
        }
    }
}
