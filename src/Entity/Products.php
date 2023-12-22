<?php

namespace App\Entity;

use App\Repository\ProductsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ProductsRepository::class)]
#[UniqueEntity(fields: ['sku'], message: 'Ce produit existe déjà.')]
class Products
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\Length(
        min: 5,
        max: 255,
        minMessage: 'Le titre doit contenir au moins de {{ limit }} cractéres.',
        maxMessage: 'Le titre ne peut pas contenir plus de {{ limit }} cractéres.',
    )]
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[Assert\Length(
        min: 25,
        max: 1000,
        minMessage: 'La déscription doit contenir au moins de {{ limit }} cractéres.',
        maxMessage: 'La déscription ne peut pas contenir plus de {{ limit }} cractéres.',
    )]
    #[ORM\Column(length: 1000)]
    private ?string $description = null;

    #[Assert\Length(
        min: 5,
        max: 1000,
        minMessage: "L'url de l'image doit contenir au moins de {{ limit }} cractéres.",
        maxMessage: "L'url de l'image ne peut pas contenir plus de {{ limit }} cractéres.",
    )]
    #[ORM\Column(length: 1000)]
    private ?string $cover = null;

    #[Assert\Type(
        type: 'integer',
        message: 'La valeur {{ value }} doit être un nombre entier.',
    )]
    #[ORM\Column]
    private ?int $stock = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 20, scale: 6)]
    private ?string $price_unit = null;

    #[Assert\Length(
        min: 5,
        max: 50,
        minMessage: 'La marque doit contenir au moins de {{ limit }} cractéres.',
        maxMessage: 'La marque courte ne peut pas contenir plus de {{ limit }} cractéres.',
    )]
    #[ORM\Column(length: 50)]
    private ?string $brand = null;

    #[Assert\Length(
        min: 3,
        max: 10,
        minMessage: 'La référence doit être au moins de {{ limit }} cractéres.',
        maxMessage: 'La référence ne peut pas contenir plus de {{ limit }} cractéres.',
    )]
    #[ORM\Column(length: 10, unique: true)]
    private ?string $sku = null;

    #[Assert\Length(
        min: 10,
        max: 50,
        minMessage: 'La déscription courte doit contenir au moins de {{ limit }} cractéres.',
        maxMessage: 'La déscription courte ne peut pas contenir plus de {{ limit }} cractéres.',
    )]
    #[ORM\Column(length: 50)]
    private ?string $description_short = null;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: Comments::class)]
    private Collection $comments;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: LineOrders::class)]
    private Collection $lineOrders;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->lineOrders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCover(): ?string
    {
        return $this->cover;
    }

    public function setCover(string $cover): static
    {
        $this->cover = $cover;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): static
    {
        $this->stock = $stock;

        return $this;
    }

    public function getPriceUnit(): ?string
    {
        return $this->price_unit;
    }

    public function setPriceUnit(string $price_unit): static
    {
        $this->price_unit = $price_unit;

        return $this;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(string $brand): static
    {
        $this->brand = $brand;

        return $this;
    }

    public function getSku(): ?string
    {
        return $this->sku;
    }

    public function setSku(string $sku): static
    {
        $this->sku = $sku;

        return $this;
    }

    public function getDescriptionShort(): ?string
    {
        return $this->description_short;
    }

    public function setDescriptionShort(string $description_short): static
    {
        $this->description_short = $description_short;

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
            $comment->setProduct($this);
        }

        return $this;
    }

    public function removeComment(Comments $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getProduct() === $this) {
                $comment->setProduct(null);
            }
        }

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
            $lineOrder->setProduct($this);
        }

        return $this;
    }

    public function removeLineOrder(LineOrders $lineOrder): static
    {
        if ($this->lineOrders->removeElement($lineOrder)) {
            // set the owning side to null (unless already changed)
            if ($lineOrder->getProduct() === $this) {
                $lineOrder->setProduct(null);
            }
        }

        return $this;
    }
}
