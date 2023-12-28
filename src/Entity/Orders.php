<?php

namespace App\Entity;

use App\Repository\OrdersRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: OrdersRepository::class)]
class Orders
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $name = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 20, scale: 6)]
    private ?string $amount = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    private ?Customer $customer = null;

    #[ORM\OneToMany(mappedBy: 'order', targetEntity: LineOrders::class, cascade: ['persist'])]
    private Collection $lineOrders;

    #[Assert\NotBlank]
    #[ORM\Column(type: 'json')]
    private array $status = [];

    public function __construct()
    {
        $this->lineOrders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getAmount(): ?string
    {
        return $this->amount;
    }

    public function setAmount(string $amount): static
    {
        $this->amount = $amount;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): static
    {
        $this->created_at = $created_at;

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

    /**
     * @return Collection<int, LineOrders>
     */
    public function getLineOrders(): Collection
    {
        return $this->lineOrders;
    }

    public function addLineOrder(LineOrders $lineOrder): static
    {
        if (!$this->lineOrders->contains($lineOrder)) {
            $this->lineOrders->add($lineOrder);
            $lineOrder->setOrderId($this);
        }

        return $this;
    }

    public function removeLineOrder(LineOrders $lineOrder): static
    {
        if ($this->lineOrders->removeElement($lineOrder)) {
            // set the owning side to null (unless already changed)
            if ($lineOrder->getOrderId() === $this) {
                $lineOrder->setOrderId(null);
            }
        }

        return $this;
    }

    public function getStatus(): array
    {
        return array_unique($this->status);
    }

    public function setStatus(array $status): static
    {
        $this->status = $status;

        return $this;
    }
}
