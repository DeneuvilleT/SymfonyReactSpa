<?php

namespace App\Entity;

use App\Repository\CustomerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CustomerRepository::class)]
#[UniqueEntity(fields: ['email'], message: 'Cet email est déjà lié à un compte.')]
class Customer implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[Groups("api")]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups("api")]
    #[ORM\Column(length: 50, unique: true)]
    #[Assert\NotBlank]
    #[Assert\Email(
        message: " L'email {{ value }} n'est pas un email valide.",
    )]
    private ?string $email = null;

    #[Groups("api")]
    #[Assert\NotBlank]
    #[ORM\Column(type: 'json')]
    private array $roles = [];

    #[ORM\Column(length: 255)]
    #[Assert\Regex(
        pattern: '/^(?=(?:[^0-9]*[0-9]){2})(?=.*[!@#$%^&*€()])(?=.*[A-Z]).{8,}$/',
        match: true,
        message: 'Le mot de passe doit contenir au moins deux chiffres, un caractère spécial, une majuscule, et avoir au moins 8 caractères.',
    )]
    private ?string $password = null;

    #[Groups("api")]
    #[ORM\Column(length: 50)]
    #[Assert\Regex(
        pattern: '/\d/',
        match: false,
        message: 'Votre prénom ne peut pas contenir de chiffre.',
    )]
    #[Assert\Length(
        min: 2,
        max: 50,
        minMessage: 'Votre prénom doit contenir au moins {{ limit }} cractéres.',
        maxMessage: 'Votre prénom ne peut pas contenir plus de {{ limit }} cractéres.',
    )]
    #[Assert\NotBlank]
    private ?string $firstName = null;

    #[Groups("api")]
    #[ORM\Column(length: 50)]
    #[Assert\Regex(
        pattern: '/\d/',
        match: false,
        message: 'Votre nom ne peut pas contenir de chiffre.',
    )]
    #[Assert\NotBlank]
    #[Assert\Length(
        min: 2,
        max: 50,
        minMessage: 'Votre nom doit contenir au moiuns {{ limit }} cractéres.',
        maxMessage: 'Votre nom ne peut pas contenir plus de {{ limit }} cractéres.',
    )]
    private ?string $lastName = null;

    #[Groups("api")]
    #[ORM\Column(type: 'integer')]
    #[Assert\NotBlank]
    private ?int $isVerified = 0;

    #[ORM\OneToMany(mappedBy: 'customer', targetEntity: Comments::class)]
    private Collection $comments;

    #[ORM\OneToMany(mappedBy: 'customer', targetEntity: Addresses::class)]
    private Collection $addresses;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->addresses = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstName;
    }

    public function setFirstname(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_CUSTOMER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function isVerified(): int
    {
        return $this->isVerified;
    }

    public function setIsVerified(int $isVerified): static
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    /**
     * @return Collection<int, Comments>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comments $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setCustomer($this);
        }

        return $this;
    }

    public function removeComment(Comments $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getCustomer() === $this) {
                $comment->setCustomer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Addresses>
     */
    public function getAddresses(): Collection
    {
        return $this->addresses;
    }

    public function addAddress(Addresses $address): static
    {
        if (!$this->addresses->contains($address)) {
            $this->addresses->add($address);
            $address->setCustomer($this);
        }

        return $this;
    }

    public function removeAddress(Addresses $address): static
    {
        if ($this->addresses->removeElement($address)) {
            // set the owning side to null (unless already changed)
            if ($address->getCustomer() === $this) {
                $address->setCustomer(null);
            }
        }

        return $this;
    }
}
