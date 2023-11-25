<?php

namespace App\Controller;

use App\Entity\Comments;
use App\Form\CommentsType;
use App\Repository\CommentsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;


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

    #[Route('/new', name: 'app_comments_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $comment = new Comments();
        $form = $this->createForm(CommentsType::class, $comment);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($comment);
            $entityManager->flush();

            return $this->redirectToRoute('app_comments_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('comments/new.html.twig', [
            'comment' => $comment,
            'form' => $form,
        ]);
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
