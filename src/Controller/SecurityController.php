<?php

namespace App\Controller;

use App\Controller\Admin\ProductsCrudController;
use App\Repository\CustomerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class SecurityController extends AbstractController
{

   public function __construct(private TokenStorageInterface $tokenStorage, private JWTTokenManagerInterface $jwtManager)
   {
      $this->tokenStorage = $tokenStorage;
      $this->jwtManager = $jwtManager;
   }

   #[IsGranted('ROLE_SUPER_ADMIN')]
   #[Route('/api/v1/access_admin', name: 'app_access', methods: ['GET'])]
   public function accessBackOffice(Request $request, CustomerRepository $customerRepo, AdminUrlGenerator $adminUrlGenerator): JsonResponse
   {
      $user = $this->getUser();
      $tokenBearer = $request->headers->get('Authorization');

      if (!$tokenBearer && $user !== null) {
         throw new AccessDeniedException("Vous n'avez pas les droits nécesssaires");
      } else {

         $tokenInterface = $this->tokenStorage->getToken();

         try {
            $tokenData = $this->jwtManager->decode($tokenInterface);

            $customer = $customerRepo->findOneBy(["email" => $tokenData["email"]]);
            $role = $customer->getRoles()[0];

            if ($role === "ROLE_SUPER_ADMIN") {

               $url = $adminUrlGenerator->setController(ProductsCrudController::class)
                  ->set('role', base64_encode($role))
                  ->generateUrl();

               $data = [
                  'url' => $url,
               ];
               return new JsonResponse($data, Response::HTTP_OK);
            } else {
               return $this->redirectToRoute('app_home', [], Response::HTTP_UNAUTHORIZED);
            }
         } catch (\Exception $e) {
            throw new AccessDeniedException('Token invalide');
         }
      }
   }

   #[Route('/api/v1/logout', name: 'app_logout', methods: ['GET'])]
   public function logout()
   {
      return $this->redirectToRoute('app_home', [], Response::HTTP_SEE_OTHER);
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
                     'firstname' => $customer->getFirstname(),
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
