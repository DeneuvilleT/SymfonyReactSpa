<?php

namespace App\Controller;

use App\Repository\CustomerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class SecurityController extends AbstractController
{
   private $tokenStorage;
   private $jwtManager;

   public function __construct(TokenStorageInterface $tokenStorage, JWTTokenManagerInterface $jwtManager)
   {
      $this->tokenStorage = $tokenStorage;
      $this->jwtManager = $jwtManager;
   }

   #[Route('/api/v1/logout', name: 'app_logout', methods: ['GET'])]
   public function logout(): JsonResponse
   {
      $encoders = [new XmlEncoder(), new JsonEncoder()];
      $normalizers = [new ObjectNormalizer()];
      $serializer = new Serializer($normalizers, $encoders);
      $jsonContent = $serializer->serialize(["Success"], 'json');

      return new JsonResponse($jsonContent);
   }

   #[Route('/api/v1/check_token', name: 'app_token', methods: ['GET'])]
   public function checkToken(Request $request, CustomerRepository $customerRepo): JsonResponse
   {
      $tokenBearer = $request->headers->get('Authorization');

      if (!$tokenBearer) {
         throw new AccessDeniedException("Vous n'avez pas les droits nécesssaires");
      } else {

         $tokenInterface = $this->tokenStorage->getToken();

         try {
            $tokenData = $this->jwtManager->decode($tokenInterface);

            $customer = $customerRepo->findOneBy(["email" => $tokenData["email"]]);

            $token = substr($tokenBearer, 7);

            if ($customer !== null) {
               $data = [
                  'token' => $token,
                  "user" => [
                     'id' => $customer->getId(),
                     'email' => $customer->getEmail(),
                     'password' => $customer->getPassword(),
                     'firsname' => $customer->getFirstname(),
                     'lastname' => $customer->getLastName(),
                     'roles' => $customer->getRoles(),
                  ]
               ];

               return new JsonResponse($data, Response::HTTP_OK);
            } else {
               throw new AccessDeniedException("Adresse mail invalide");
            }
         } catch (\Exception $e) {
            throw new AccessDeniedException('Token invalide');
         }
      }
   }
}
