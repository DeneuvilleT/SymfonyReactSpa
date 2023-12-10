<?php

namespace App\Controller;

use App\Entity\Customer;
use App\Repository\CustomerRepository;
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
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api/v1/customers')]
class CustomersController extends AbstractController
{
    #[Route('/edit_customer/{id}', name: 'app_customers_edit', methods: ['POST'])]
    public function editCustomer(Customer $customer, Request $request, UserPasswordHasherInterface $userPasswordHasher, CustomerRepository $customerRepo, ValidatorInterface $validator): Response
    {
        $user = $this->getUser();

        if ($user !== null && $customer === $user) {

            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];
            $serializer = new Serializer($normalizers, $encoders);

            $datas = json_decode($request->getContent(), true);

            $customer->setFirstname($datas['firstname']);
            $customer->setLastName($datas['lastname']);
            $customer->setPassword($datas['password']);
            $customer->setEmail($datas['email']);

            $errors = $validator->validate($customer);

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

                $customer->setPassword(
                    $userPasswordHasher->hashPassword(
                        $customer,
                        $datas['password']
                    )
                );

                $customerRepo->save($customer, true);

                $jsonContent = $serializer->serialize(["Success"], 'json');

                return new JsonResponse(Response::HTTP_OK);
            }
        } else {
            throw new AccessDeniedException("Vous ne pouvez pas faire ça pour le moment.");
        }
    }
}
