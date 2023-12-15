<?php

namespace App\Controller;

use DateTime;

use App\Entity\Addresses;
use App\Entity\Customer;
use App\Repository\AddressesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Mime\Address;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

#[Route('/api/v1/addresses')]
class AddressesController extends AbstractController
{
    #[Route('/load_addresses/{id}', name: 'app_addresses_show', methods: ['GET', 'POST'])]
    public function getUserAddresses(Customer $customer, Request $request, AddressesRepository $addressesRepository): Response
    {
        $user = $this->getUser();

        if ($user !== null && $user === $customer) {
            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];

            $serializer = new Serializer($normalizers, $encoders);

            $addresses = $customer->getAddresses();

            $addressData = [];

            foreach ($addresses as $address) {
                $addressData[] = [
                    'id' => $address->getId(),
                    'alias' => $address->getAlias(),
                    'address' => $address->getAddress(),
                    'city' => $address->getCity(),
                    'zip_code' => $address->getZipCode(),
                    'phone' => $address->getPhone(),
                    'type' => $address->isType(),
                    'date' => $address->getCreatedAt()->format('Y-m-d H:i:s'),
                ];
            }

            $jsonContent = $serializer->serialize($addressData, 'json');
            return new Response($jsonContent);
        } else {
            throw new AccessDeniedException("Vous ne pouvez pas faire ça pour le moment.");
        }
    }

    #[Route('/new_address/{id}', name: 'app_addresses_new', methods: ['POST'])]
    public function addNewAddress(Customer $customer, Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse
    {
        $user = $this->getUser();

        if ($user !== null && $customer === $user) {

            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];
            $serializer = new Serializer($normalizers, $encoders);

            $datas = json_decode($request->getContent(), true);

            $address = new Addresses();

            $address->setAlias($datas['alias']);
            $address->setAddress($datas['address']);
            $address->setCity($datas['city']);
            $address->setZipCode($datas['zip_code']);

            if (!ctype_digit($datas['phone'])) {
                $errors = new ConstraintViolation(
                    'Le numéro de téléphone ne doit contenir que des chiffres.',
                    null,
                    [],
                    $datas['phone'],
                    'phone',
                    null
                );

                $response = [
                    'status' => 'error',
                    'message' => 'Validation error',
                    'errors' => array($errors->getMessage()),
                ];

                $jsonContent = $serializer->serialize($response, 'json');

                return new JsonResponse($jsonContent, Response::HTTP_UNAUTHORIZED);
            } else {
                $address->setPhone((int)$datas['phone']);
            }

            $address->setType($datas['type']);
            $address->setCustomer($customer);
            $address->setCreatedAt(new DateTime());

            $errors = $validator->validate($address);

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

                $entityManager->persist($address);
                $entityManager->flush();
                $jsonContent = $serializer->serialize(["Success"], 'json');

                return new JsonResponse($jsonContent, Response::HTTP_OK);
            }
        } else {
            throw new AccessDeniedException("Vous ne pouvez pas faire ça pour le moment.");
        }
    }

    #[Route('/delete_address/{id}', name: 'app_addresses_delete', methods: ['GET'])]
    public function deleteAddress(Addresses $address, EntityManagerInterface $entityManager): Response
    {
        $user = $this->getUser();

        if ($user !== null && $address->getCustomer() === $user) {

            $entityManager->remove($address);
            $entityManager->flush();

            return new Response(Response::HTTP_OK);
        } else {
            throw new AccessDeniedException("Vous n'avez pas le droit de supprimer cette adresse.");
        }
    }


    #[Route('/edit_address/{id}/{address}', name: 'app_addresses_edit', methods: ['POST'])]
    public function edit(Customer $customer, Addresses $address, Request $request, AddressesRepository $addressRepo, ValidatorInterface $validator): Response
    {
        $user = $this->getUser();

        if ($user !== null && $customer === $user) {

            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];
            $serializer = new Serializer($normalizers, $encoders);

            $datas = json_decode($request->getContent(), true);

            $address->setAlias($datas['alias']);
            $address->setAddress($datas['address']);
            $address->setCity($datas['city']);
            $address->setZipCode($datas['zip_code']);

            if (!ctype_digit($datas['phone'])) {
                $errors = new ConstraintViolation(
                    'Le numéro de téléphone ne doit contenir que des chiffres.',
                    null,
                    [],
                    $datas['phone'],
                    'phone',
                    null
                );

                $response = [
                    'status' => 'error',
                    'message' => 'Validation error',
                    'errors' => array($errors->getMessage()),
                ];

                $jsonContent = $serializer->serialize($response, 'json');

                return new JsonResponse($jsonContent, Response::HTTP_UNAUTHORIZED);
            } else {
                $address->setPhone((int)$datas['phone']);
            }

            $address->setType((string)$datas['type'] === "1" ? 1 : 0);

            $errors = $validator->validate($address);

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

                $addressRepo->save($address, true);

                $jsonContent = $serializer->serialize(["Success"], 'json');

                return new JsonResponse(Response::HTTP_OK);
            }
        } else {
            throw new AccessDeniedException("Vous ne pouvez pas faire ça pour le moment.");
        }
    }
}
