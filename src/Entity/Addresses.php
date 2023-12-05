<?php

namespace App\Entity;

use App\Repository\AddressesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: AddressesRepository::class)]
class Addresses
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank]
    #[Assert\Length(
        min: 2,
        max: 100,
        minMessage: "L'alias doit contenir au moins de {{ limit }} cractéres.",
        maxMessage: "L'alias ne peut pas contenir plus de {{ limit }} cractéres.",
    )]
    #[ORM\Column(length: 100)]
    private ?string $alias = null;

    #[Assert\NotBlank]
    #[Assert\Length(
        min: 5,
        max: 255,
        minMessage: 'Votre adresse doit contenir au moins de {{ limit }} cractéres.',
        maxMessage: 'Votre adresse ne peut pas contenir plus de {{ limit }} cractéres.',
    )]
    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[Assert\NotBlank]
    #[Assert\Length(
        min: 5,
        max: 100,
        minMessage: 'Le nom de la ville doit contenir au moins de {{ limit }} cractéres.',
        maxMessage: 'Le nom de la ville ne peut pas contenir plus de {{ limit }} cractéres.',
    )]
    #[ORM\Column(length: 100)]
    private ?string $city = null;

    #[Assert\NotBlank]
    #[Assert\Length(
        min: 5,
        max: 25,
        minMessage: 'Le code postal doit contenir au moins de {{ limit }} cractéres.',
        maxMessage: 'Le code postal ne peut pas contenir plus de {{ limit }} cractéres.',
    )]
    #[ORM\Column(length: 25)]
    private ?string $zip_code = null;

    #[Assert\NotBlank]
    #[Assert\Length(
        min: 9,
        max: 25,
        minMessage: 'Le numéro de téléphone doit contenir au moins 10 chiffres.',
        maxMessage: 'Le numéro de téléphone ne peut pas contenir plus de {{ limit }} chiffres.',
    )]
    #[ORM\Column]
    private ?int $phone = null;

    #[ORM\Column]
    private ?bool $type = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'addresses')]
    private ?Customer $customer = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAlias(): ?string
    {
        return $this->alias;
    }

    public function setAlias(string $alias): static
    {
        $this->alias = $alias;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zip_code;
    }

    public function setZipCode(string $zip_code): static
    {
        $this->zip_code = $zip_code;

        return $this;
    }

    public function getPhone(): ?int
    {
        return $this->phone;
    }

    public function setPhone(int $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function isType(): ?bool
    {
        return $this->type;
    }

    public function setType(bool $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): static
    {
        $this->customer = $customer;

        return $this;
    }
}
