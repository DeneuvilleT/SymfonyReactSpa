<?php

namespace App\Controller;

use DateTime;

use App\Entity\Addresses;
use App\Form\AddressesType;
use App\Repository\AddressesRepository;
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
use Symfony\Component\Validator\ConstraintViolation;

#[Route('/api/v1/addresses')]
class AddressesController extends AbstractController
{
    #[Route('/', name: 'app_addresses_index', methods: ['GET'])]
    public function index(AddressesRepository $addressesRepository): Response
    {
        return $this->render('addresses/index.html.twig', [
            'addresses' => $addressesRepository->findAll(),
        ]);
    }

    #[Route('/load_addresses', name: 'app_addresses_show', methods: ['GET', 'POST'])]
    public function getUserAddresses(Request $request, AddressesRepository $addressesRepository): Response
    {
        if ($this->getUser()) {
            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];

            $serializer = new Serializer($normalizers, $encoders);

            $userId = $request->query->get('userId');

            $addresses = $addressesRepository->findBy([
                "customer" => (int) $userId
            ]);

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
        }
    }

    #[Route('/new_address', name: 'app_addresses_new', methods: ['GET', 'POST'])]
    public function addNewAddress(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse
    {
        if ($this->getUser() !== null) {

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
            $address->setCustomer($this->getUser());
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
        }
    }


    #[Route('/{id}/edit', name: 'app_addresses_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Addresses $address, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(AddressesType::class, $address);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_addresses_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('addresses/edit.html.twig', [
            'address' => $address,
            'form' => $form,
        ]);
    }

    #[Route('/delete_address/{id}', name: 'app_addresses_delete', methods: ['POST'])]
    public function deleteAddress(Request $request, Addresses $address, EntityManagerInterface $entityManager): Response
    {
        if ($this->getUser() !== null) {
            $entityManager->remove($address);
            $entityManager->flush();
        }

        return new Response(Response::HTTP_OK);
    }
}
