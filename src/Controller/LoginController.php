<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class LoginController extends AbstractController
{

    private $csrfTokenManager;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager)
    {
        $this->csrfTokenManager = $csrfTokenManager;
    }

    #[Route('/api/v1/login', name: 'app_login')]
    public function index(AuthenticationUtils $authenticationUtils): JsonResponse
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $error = $authenticationUtils->getLastAuthenticationError();

        if ($error !== null) {
            $jsonContent = $serializer->serialize(["message" => "Accès refusé en raison d'un échec d'authentification"], 'json');
            return new JsonResponse($jsonContent, Response::HTTP_FORBIDDEN);
        } else {
            return new Response(Response::HTTP_OK);
        }
    }

    #[Route("/api/v1/token", name: "get_token")]
    public function getToken(): JsonResponse
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer(null, null, null, null, null, null, ['api'])];
        $serializer = new Serializer($normalizers, $encoders);
    
        $user = $this->getUser();
    
        $context = [
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['comments', 'password'],
        ];
    
        $token = $this->csrfTokenManager->getToken('api_csrf')->getValue();
        $jsonContent = $serializer->serialize(
            [
                'csrf_token' => $token,
                'user' => $user,
            ],
            'json',
            $context
        );
    
        return new JsonResponse($jsonContent, Response::HTTP_OK);
    }
}
